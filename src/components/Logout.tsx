import React from "react";
import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

const Button = styled(MuiButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Logout: React.FunctionComponent<{ logout: () => void }> = ({
  logout,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={logout}
      disableElevation
    >
      Logout
    </Button>
  );
};

export default Logout;
