import React from "react";
import MuiContainer from "@material-ui/core/Container";
import MuiFab from "@material-ui/core/Fab";
import MuiList from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiPaper from "@material-ui/core/Paper";
import MuiDialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { fetchAccounts } from "./accountSlice";
import AccountForm from "./AccountForm";

const Paper = styled(MuiPaper)`
  width: 100%;
`;

const AddButton = styled(MuiFab)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const Account: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [isAccountFormOpen, setAccountFormOpen] = React.useState(false);
  const status = useSelector((state: RootState) => state.account.status);
  const accounts = useSelector((state: RootState) => state.account.accounts);

  React.useEffect(() => {
    if (status.accounts === "idle") dispatch(fetchAccounts());
  }, [status, dispatch]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    console.log({ index });
    setSelectedIndex(index);
  };

  const handleAddButtonClick = () => {
    setAccountFormOpen(true);
  };

  return (
    <>
      <MuiContainer maxWidth="xs">
        <Paper>
          <MuiList>
            {accounts.map((account, index) => (
              <MuiListItem
                button
                onClick={(event) => handleListItemClick(event, index)}
                key={account.id}
              >
                <MuiListItemText
                  primary={account.name}
                  secondary={account.type}
                />
                {account.pending && (
                  <MuiListItemSecondaryAction>
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

export default Account;
