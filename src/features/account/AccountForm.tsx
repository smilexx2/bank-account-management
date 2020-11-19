import React from "react";
import MuiButton from "@material-ui/core/Button";
import MuiContainer from "@material-ui/core/Container";
import MuiGrid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MuiTextField from "@material-ui/core/TextField";
import MuiTypography from "@material-ui/core/Typography";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useAppDispatch } from "../../app/store";
import { addNewAccount } from "./accountSlice";

const AccountSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z0-9]+$/i, "alpha numeric only")
    .required("Required"),
  type: Yup.string().required("Required"),
});

const accountTypes = [
  {
    value: "everyday",
    label: "Everyday",
  },
  {
    value: "savings",
    label: "Savings",
  },
];

const TextField = styled(MuiTextField)`
  width: 100%;
`;

const Container = styled(MuiContainer)`
  margin-top: 68px;
`;

const Button = styled(MuiButton)`
  width: 100%;
`;

const AccountForm: React.FunctionComponent<{
  setAccountFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAccountFormOpen }) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    onSubmit: async (account) => {
      const resultAction = await dispatch(addNewAccount(account));

      if (addNewAccount.fulfilled.match(resultAction)) {
        unwrapResult(resultAction);
        setAccountFormOpen(false);
      }
    },
    validationSchema: AccountSchema,
  });

  const handleCancelButtonClick = () => {
    setAccountFormOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <MuiTypography variant="h2" gutterBottom>
        Create New Account
      </MuiTypography>
      <form onSubmit={formik.handleSubmit}>
        <MuiGrid container spacing={6}>
          <MuiGrid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Account Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={!!formik.errors.name}
              helperText={formik.errors.name}
            />
          </MuiGrid>
          <MuiGrid item xs={12}>
            <TextField
              id="type"
              name="type"
              select
              label="Account Type"
              onChange={formik.handleChange}
              value={formik.values.type}
              error={!!formik.errors.type}
              helperText={formik.errors.type}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiGrid container spacing={2}>
              <MuiGrid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                >
                  Create
                </Button>
              </MuiGrid>
              <MuiGrid item xs={12}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleCancelButtonClick}
                >
                  Cancel
                </Button>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </form>
    </Container>
  );
};

export default AccountForm;
