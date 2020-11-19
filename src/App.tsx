import React from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Accounts from "./features/account/Accounts";
import Transactionss from "./features/transaction/Transactions";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { accessToken, login, logout } = useAuth();
  const selectedAccount = useSelector(
    (state: RootState) => state.account.selectedAccount
  );
  return (
    <>
      <Container>
        {!accessToken && <Login login={login} />}
        {accessToken && !selectedAccount && <Accounts />}
        {accessToken && selectedAccount && <Transactionss />}
      </Container>
      {accessToken && <Logout logout={logout} />}
    </>
  );
}

export default App;
