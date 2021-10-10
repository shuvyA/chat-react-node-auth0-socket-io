import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import styled from "@emotion/styled";

const NewMessage = ({ onSendMessage }) => {
  const [value, setValue] = useState(null);
  // const [isDisable, setIsDisable] = useState(true);

  const sendMessage = () => {
    if (value) {
      // setIsDisable(true);
      onSendMessage(value);
      setValue("");
    }
  };

  return (
    <Container>
      <TextField
        id="outlined-basic"
        fullWidth
        label="Write message..."
        placeholder="Write message..."
        variant="outlined"
        value={value || ""}
        onChange={(event) => setValue(event.target.value)}
      />
      <ButtonStyled variant="contained" onClick={sendMessage}>
        Send
      </ButtonStyled>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;
const ButtonStyled = styled(Button)`
  margin-left: 20px;
  padding: 0px 20px;
  //width: 100%;
  //margin-top: 20px;
  //display: flex;
`;

export default NewMessage;
