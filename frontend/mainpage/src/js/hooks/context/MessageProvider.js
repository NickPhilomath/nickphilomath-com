import { createContext, useState, useEffect } from "react";

const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const createMessage = (msg) => {
    setMessages([...messages, {...msg, visible: true}]);
  };

  return <MessageContext.Provider value={{ messages, setMessages, createMessage }}>{children}</MessageContext.Provider>;
};

export default MessageContext;
