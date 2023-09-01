import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chatdata, setChatdata] = useState([]);

  const fetchChatData = async () => {
    try {
      const response = await axios.get("/api/chat");
      // Assuming the response data is an array, set it to the state
      setChatdata(response.data);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    fetchChatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {chatdata.map((chat, index) => (
        <h1 key={index}>
          {chat.chatName} 
        </h1>
      ))}
    </div>
  );
};

export default ChatPage;
