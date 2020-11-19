import React from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Account from "./features/account/Account";
import useAuth from "./hooks/useAuth";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { accessToken, login, logout } = useAuth();

  return (
    <>
      <Container>
        {!accessToken && <Login login={login} />}
        {accessToken && <Account />}
      </Container>
      {accessToken && <Logout logout={logout} />}
    </>
  );
}

export default App;
