import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import NewMessage from "./NewMessage";
import Switch from "@mui/material/Switch";
import Messages from "./Messages";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BASE_API_URL } from "../constants/chat.constants";

const ChatRoom = ({ token, isAdmin }) => {
  const socketRef = useRef();
  const [chatMessages, setChatMessages] = useState([]);
  const [messageAdminOnly, setMessageAdminOnly] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    socketRef.current = io.connect(BASE_API_URL);

    socketRef.current.on(
      "message",
      ({ name, message, time, isAdmin, messageAdminOnly, userId }) => {
        setChatMessages([
          ...chatMessages,
          {
            name: name,
            textMessage: message,
            id: uuidv4(),
            time: time,
            isAdmin,
            messageAdminOnly,
            userId,
          },
        ]);
      }
    );

    if (isAdmin) {
      socketRef.current.on(
        "adminOnly",
        ({ name, message, time, isAdmin, messageAdminOnly, userId }) => {
          setChatMessages([
            ...chatMessages,
            {
              name: name,
              textMessage: message,
              id: uuidv4(),
              time: time,
              isAdmin,
              messageAdminOnly,
              userId,
            },
          ]);
        }
      );
    }

    return () => socketRef.current.disconnect();
  }, [chatMessages, isAdmin]);

  const submitMessage = (message) => {
    const { name, sub } = user;
    const time = Date.now();
    socketRef.current.emit("message", {
      token,
      name,
      message,
      time,
      isAdmin,
      messageAdminOnly,
      userId: sub,
    });
  };

  const onChangeMessageAdmin = (event) => {
    setMessageAdminOnly(event.target.checked);
  };

  return (
    <div>
      <Messages user={user} messages={chatMessages} />
      {isAdmin && (
        <AdminOnly>
          <FormControlLabel
            control={<Switch onChange={onChangeMessageAdmin} />}
            label="Message to admin only"
          />
        </AdminOnly>
      )}
      <NewMessage onSendMessage={submitMessage} />
    </div>
  );
};

const AdminOnly = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

ChatRoom.propTypes = {
  token: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default ChatRoom;
