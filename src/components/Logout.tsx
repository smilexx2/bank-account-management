import React from "react";
import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Button = styled(MuiButton)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Logout: React.FunctionComponent<{ logout: () => void }> = ({
  logout,
}) => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      disableElevation
    >
      Logout
    </Button>
  );
};

export default Logout;
