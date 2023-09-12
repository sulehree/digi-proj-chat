import React from "react";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div>
      <h1>{console.log(user?.name) }Chats</h1>
    </div>
  );
};

export default ChatPage;
