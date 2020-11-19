import React from "react";
import MuiContainer from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import MuiTextField from "@material-ui/core/TextField";
import MuiGrid from "@material-ui/core/Grid";
import MuiButton from "@material-ui/core/Button";
import MuiTypography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useFormik } from "formik";
import { addNewAccount } from "./accountSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/store";

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
  margin-top: 60px;
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
