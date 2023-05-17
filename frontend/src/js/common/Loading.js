import loading from "../images/loading.svg";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading" width={100} />
    </div>
  );
};

export default Loading;
