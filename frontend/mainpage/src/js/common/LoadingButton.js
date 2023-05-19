import loading from "../images/loading2.gif";
import "./LoadingButton.css";

const LoadingButton = ({ className }) => {
  return (
    <button className={"loadingButton " + className}>
      <img src={loading} alt="loading" />
    </button>
  );
};

export default LoadingButton;
