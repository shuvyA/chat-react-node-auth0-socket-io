import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import ChatRoom from "../components/ChatRoom";
import Header from "../components/Header";
import { getIsAdminUser } from "../services/chat.service";
import { ACCESS_TOKEN } from "../constants/chat.constants";

const Home = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const initialToken = localStorage.getItem(ACCESS_TOKEN) || null;

  const [token, setToken] = useState(initialToken);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getToken() {
      if (isAuthenticated) {
        const newToken = await getAccessTokenSilently();
        setToken(newToken);
        localStorage.setItem(ACCESS_TOKEN, newToken);
      }
      if (!isAuthenticated) {
        localStorage.setItem(ACCESS_TOKEN, null);
        setToken(null);
      }
    }
    getToken();
  }, [token, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const getIsUserAdmin = async () => {
      try {
        const response = await getIsAdminUser(token);
        console.log({ response });
        if (response?.data) {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };
    if (isAuthenticated && token) {
      getIsUserAdmin();
    }
  }, [token, isAdmin, isAuthenticated]);

  return (
    <Container>
      <Header setToken={setToken} isAdmin={isAdmin} />
      {isAuthenticated && <ChatRoom isAdmin={isAdmin} token={token} />}
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 10px);
  border-radius: 20px;
  border: 1px solid darkgrey;
  margin: 5px auto;
  max-width: 1100px;
`;

export default Home;
