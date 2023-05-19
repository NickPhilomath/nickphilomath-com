import useMessage from "../../hooks/useMessage";
import Message from "./Message";
import "./MessageBar.css";

const MessageBar = () => {
  const { messages } = useMessage();

  return (
    <div className="message-bar">
      {messages.map((msg, index) => {
        return <Message message={msg} key={index} />;
      })}
    </div>
  );
};

export default MessageBar;
