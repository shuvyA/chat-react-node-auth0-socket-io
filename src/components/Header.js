import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import header from "../assets/header.png";
import ProfileMenu from "./ProfileMenu";
import { ACCESS_TOKEN, MEDIA_QUERY_MOBILE } from "../constants/chat.constants";

const Header = ({ setToken, isAdmin }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const userStatus = () => {
    if (isAuthenticated) {
      return (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </Button>
        </>
      );
    }

    return (
      <Button
        variant="contained"
        onClick={() => {
          localStorage.setItem(ACCESS_TOKEN, null);
          setToken(null);
          loginWithRedirect();
        }}
      >
        Log In
      </Button>
    );
  };

  return (
    <Container>
      <IMAGE />
      <TitleAndLogin>
        <Typography variant="h4" gutterBottom component="div">
          Chat with us!
        </Typography>

        <ProfileAndLogin>
          <ProfileMenu isAdmin={isAdmin} isAuthenticated={isAuthenticated} />

          <div>{userStatus()}</div>
        </ProfileAndLogin>
      </TitleAndLogin>
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid darkgrey;
  height: 300px;

  @media (max-width: ${MEDIA_QUERY_MOBILE}px) {
    height: 200px;
  }
`;
const IMAGE = styled.div`
  height: 220px;
  background-image: url(${header});
  background-size: cover;
  border-radius: 20px 20px 0px 0px;
  background-repeat: no-repeat;

  @media (max-width: ${MEDIA_QUERY_MOBILE}px) {
    height: 120px;
  }
`;
const TitleAndLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const ProfileAndLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

Header.propTypes = {
  isAdmin: PropTypes.bool,
  setToken: PropTypes.func,
};

export default Header;
