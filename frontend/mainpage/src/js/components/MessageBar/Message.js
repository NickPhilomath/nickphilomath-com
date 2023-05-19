import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const Message = ({ message }) => {
  const [visible, setVisible] = useState(message.visible);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      message.visible = false;
    }, 7000);
  }, []);

  return visible ? (
    <p className={"message " + message.type}>
      {message.content}
      <ImCross
        onClick={() => {
          setVisible(false);
        }}
      />
    </p>
  ) : (
    <></>
  );
};

export default Message;
