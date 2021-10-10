import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// const messages = [
//   {
//     textMessage: "2372sdfhjh r h hj j",
//     timeStamp: 23243,
//     userId: "userId",
//     id: "eqwesdsdf",
//   },
//   {
//     textMessage: "2372sdfhjh gds h hj j",
//     timeStamp: 23247,
//     userId: "userId",
//     id: "312231312",
//   },
//   {
//     textMessage: "2372sdfdfdfdfhjh fdhfjdhsf h hj j",
//     timeStamp: 23249,
//     userId: "userId",
//     id: "okjoks",
//   },
//   {
//     textMessage: "2372sddasdsadfhjh fdhfjdhsf h hj j",
//     timeStamp: 232410,
//     userId: "userId",
//     id: "9ikdjewu",
//   },
// ];

const ChatRoom = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080");
    socketRef.current.on("message", ({ name, message }) => {
      setChatMessages([
        ...chatMessages,
        { name: name, textMessage: message, id: uuidv4() },
      ]);
    });
    return () => socketRef.current.disconnect();
  }, [chatMessages]);

  const send = (message) => {
    const name = "Sason";
    socketRef.current.emit("message", { name, message });
  };

  return (
    <div>
      <h2>ChatRoom</h2>
      <Messages messages={chatMessages} />
      <NewMessage onSendMessage={send} />
    </div>
  );
};

export default ChatRoom;
