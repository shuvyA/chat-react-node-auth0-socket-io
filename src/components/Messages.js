import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import MessagePreview from "./MessagePreview";
import { MEDIA_QUERY_MOBILE } from "../constants/chat.constants";

const Messages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  if (messages?.length === 0) {
    return (
      <Container> Please write a first message the chat is empty </Container>
    );
  }

  return (
    <Container>
      {messages &&
        messages.map((message) => {
          const isMyMessage = message.userId === user?.sub;
          return (
            <MessagePreview
              key={message.id}
              message={message}
              isMyMessage={isMyMessage}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 540px);
  height: 100%;
  max-height: 240px;
  overflow: auto;
  padding: 20px;

  @media (max-width: ${MEDIA_QUERY_MOBILE}px) {
    min-height: calc(100vh - 440px);
  }
`;

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
      textMessage: PropTypes.string,
      messageAdminOnly: PropTypes.bool,
      time: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    family_name: PropTypes.string,
    given_name: PropTypes.string,
    locale: PropTypes.string,
    name: PropTypes.string,
    nickname: PropTypes.string,
    picture: PropTypes.string,
    sub: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

export default Messages;
