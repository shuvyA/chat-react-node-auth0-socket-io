import React from "react";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";

const Messages = ({ messages }) => {
  if (!messages) {
    return <div> Please write a first message the chat is emptyt </div>;
  }

  // textMessage: "2372sdfhjh r h hj j",
  //   timeStamp: 23243,
  //   userId: "userId",
  //   id: "eqwesdsdf",
  // message.ownedByCurrentUser ? "my-message" : "received-message"
  return (
    <Container>
      <h1>Messages</h1>
      {messages &&
        messages.map(({ id, textMessage }) => (
          <div key={id}>
            <AlertStyled severity="success" icon={false}>
              {textMessage}
            </AlertStyled>
          </div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 20px auto;
  height: 450px;
  overflow: auto;
  //padding: 30px;
  //display: flex;
  //margin-left: 12px;
`;

const AlertStyled = styled(Alert)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default Messages;
