import { TOKEN_URL, DEFAULT_PAGE } from "../constants/constants";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import JWTDecoder from "../functions/JWTDecoder";
import useRequest from "../hooks/useRequest";
import useAuth from "../hooks/useAuth";
import Input from "../common/Input";
import LoadingButton from "../common/LoadingButton";
import Message from "../common/Message";
import "./Login.css";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { errMsg, errors, post, isLoading } = useRequest(TOKEN_URL);
  const from = location.state?.from?.pathname || DEFAULT_PAGE;

  const [log, setLog] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      newLog[input.name] = !newLog[input.name];
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await post(log);
    const accessToken = data.access;
    const refreshToken = data.refresh;
    const payload = JWTDecoder(accessToken);
    const roles = [payload.role];
    setAuth({ ...log, roles, accessToken });
    window.localStorage.setItem("auth", JSON.stringify({ username: log.username, roles, accessToken, refreshToken }));
    setLog({
      username: "",
      password: "",
    });
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="SignIn-header">Sign in</div>
        <Input name="username" type="text" value={log.username} label="Username" onChange={handleChange} error={errors.username} />
        <Input name="password" type="password" value={log.password} label="Password" onChange={handleChange} error={errors.password} />
        {errMsg && <Message level={"error"}>{errMsg}</Message>}
        {isLoading ? <LoadingButton /> : <button>Log in</button>}
      </form>
    </div>
  );
};

export default Login;
