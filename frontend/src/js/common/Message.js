import "./Message.css";
import { BsExclamationCircleFill } from "react-icons/bs";

const Message = ({ level, children }) => {
  const name = level == "info" ? "msg info" : level == "warning" ? "msg warning" : level == "error" ? "msg error" : "msg info";

  return (
    <div className={name}>
      <BsExclamationCircleFill />
      <div>{children}</div>
    </div>
  );
};

export default Message;
