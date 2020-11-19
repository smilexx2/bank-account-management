import React from "react";
import MuiContainer from "@material-ui/core/Container";
import MuiDialog from "@material-ui/core/Dialog";
import MuiFab from "@material-ui/core/Fab";
import MuiList from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiPaper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import AccountForm from "./AccountForm";
import { fetchAccounts, selectAccount, Account } from "./accountSlice";

const Paper = styled(MuiPaper)`
  width: 100%;
`;

const AddButton = styled(MuiFab)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const Accounts: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isAccountFormOpen, setAccountFormOpen] = React.useState(false);
  const status = useSelector((state: RootState) => state.account.status);
  const accounts = useSelector((state: RootState) => state.account.accounts);

  React.useEffect(() => {
    if (status.accounts === "idle") dispatch(fetchAccounts());
  }, [status, dispatch]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    account: Account
  ) => {
    dispatch(selectAccount(account));
  };

  const handleAddButtonClick = () => {
    setAccountFormOpen(true);
  };

  return (
    <>
      <MuiContainer maxWidth="xs">
        <Paper>
          <MuiList>
            {accounts.map((account) => (
              <MuiListItem
                button
                onClick={(event) => handleListItemClick(event, account)}
                key={account.id}
                disabled={account.pending}
              >
                <MuiListItemText
                  primary={account.name}
                  secondary={account.type}
                />
                {account.pending && (
                  <MuiListItemSecondaryAction style={{ opacity: "0.5" }}>
                    Pending
                  </MuiListItemSecondaryAction>
                )}
              </MuiListItem>
            ))}
          </MuiList>
        </Paper>
        {}
      </MuiContainer>
      <AddButton
        color="secondary"
        variant="extended"
        onClick={handleAddButtonClick}
      >
        <AddIcon />
        New Account
      </AddButton>
      <MuiDialog fullScreen open={isAccountFormOpen}>
        <AccountForm setAccountFormOpen={setAccountFormOpen} />
      </MuiDialog>
    </>
  );
};

export default Accounts;
