import React from "react";
import MuiContainer from "@material-ui/core/Container";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid";
import styled from "styled-components";
import MuiTypography from "@material-ui/core/Typography";
import MuiButton from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const TextField = styled(MuiTextField)`
  width: 100%;
`;

const Button = styled(MuiButton)`
  width: 100%;
`;

const Login: React.FunctionComponent<{
  login: (email: string, password: string) => void;
}> = ({ login }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ username, password }) => {
      login(username, password);
    },
    validationSchema: LoginSchema,
  });
  return (
    <MuiContainer maxWidth="xs">
      <MuiTypography variant="h1" gutterBottom>
        My Account
      </MuiTypography>
      <form onSubmit={formik.handleSubmit}>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={12}>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.username}
              error={!!formik.errors.username}
              helperText={formik.errors.username}
            />
          </MuiGrid>
          <MuiGrid item xs={12}>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
            />
          </MuiGrid>
          <MuiGrid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Login
            </Button>
          </MuiGrid>
        </MuiGrid>
      </form>
    </MuiContainer>
  );
};

export default Login;
