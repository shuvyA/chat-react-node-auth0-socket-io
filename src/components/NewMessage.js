import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NewMessage = ({ onSendMessage }) => {
  const [value, setValue] = useState(null);

  const sendMessage = () => {
    if (value) {
      onSendMessage(value);
      setValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (value && event.keyCode === 13) {
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
        onKeyDown={handleKeyDown}
        onChange={(event) => setValue(event.target.value)}
      />

      <ButtonStyled variant="contained" onClick={sendMessage}>
        Send
      </ButtonStyled>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px auto;
  display: flex;
  padding: 20px;
`;

const ButtonStyled = styled(Button)`
  margin-left: 20px;
  padding: 0px 20px;
`;

NewMessage.propTypes = {
  onSendMessage: PropTypes.func,
};

export default NewMessage;
