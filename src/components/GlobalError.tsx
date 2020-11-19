import React from "react";
import MuiTypography from "@material-ui/core/Typography";
import MuiContainer from "@material-ui/core/Container";

const GlobalError = () => {
  return (
    <MuiContainer maxWidth="xs">
      <MuiTypography variant="h1" gutterBottom>
        Oops!
      </MuiTypography>
      <MuiTypography variant="h3">Something went wrong</MuiTypography>
    </MuiContainer>
  );
};

export default GlobalError;
