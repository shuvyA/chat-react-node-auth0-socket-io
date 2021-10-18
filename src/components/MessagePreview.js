import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import styled from "@emotion/styled";

const MessagePreview = ({ isMyMessage, user, message }) => {
  const { id, textMessage, messageAdminOnly, time, name, userId } = message;

  return (
    <Container key={id} isMyMessage={isMyMessage}>
      <Message
        messageUserId={userId}
        user={user}
        isMyMessage={isMyMessage}
        messageAdminOnly={messageAdminOnly}
      >
        <TimeAndName>
          <Typography variant="caption">{name}</Typography>

          <Typography variant="caption">
            {format(time, "pp MM/dd/yyyy")}
          </Typography>
        </TimeAndName>

        <Typography variant="body1">{textMessage}</Typography>
        {messageAdminOnly && <OnlyAdmin>Only admin sees</OnlyAdmin>}
      </Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.isMyMessage ? "flex-start" : "flex-end"};
`;
const Message = styled.div`
  width: fit-content;
  text-align: left;
  background-color: ${(props) =>
    props.isMyMessage ? "rgb(237, 247, 237)" : "rgb(229, 246, 253)"};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 6px 16px;
  color: rgb(30, 70, 32);
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  border: ${(props) => (props.messageAdminOnly ? "2px solid black" : "none")};
`;

const OnlyAdmin = styled.span`
  position: absolute;
  bottom: -12px;
  left: 10px;
  font-size: 9px;
`;
const TimeAndName = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  gap: 200px;
  align-items: center;
  width: 100%;
`;

MessagePreview.propTypes = {
  isMyMessage: PropTypes.bool,
  message: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    textMessage: PropTypes.string,
    messageAdminOnly: PropTypes.bool,
    time: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default MessagePreview;
