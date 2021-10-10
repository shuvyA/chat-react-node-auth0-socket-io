import React from "react";
import ChatRoom from "../components/ChatRoom";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import header from "../assets/header.png";

const Home = () => {
  return (
    <Container>
      <Header />
      <h1>Chat</h1>
      <Card variant="outlined">
        <ChatRoom />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid darkgrey;
  margin: 20px auto;
  max-width: 1100px;
`;

const Header = styled.div`
  height: 240px;
  background-image: url(${header});
  background-size: cover;
  border-radius: 20px 20px 0px 0px;
  background-repeat: no-repeat;
`;

export default Home;
