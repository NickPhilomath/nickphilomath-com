import { useContext } from "react";
import MessageContext from "./context/MessageProvider";

const useMessage = () => {
  return useContext(MessageContext);
};

export default useMessage;
