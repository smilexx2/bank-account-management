import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import MuiContainer from "@material-ui/core/Container";
import MuiPaper from "@material-ui/core/Paper";
import styled from "styled-components";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "./accountSlice";
import { RootState } from "../../app/store";

const Paper = styled(MuiPaper)`
  width: 100%;
`;

const Account: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const status = useSelector((state: RootState) => state.account.status);
  const accounts = useSelector((state: RootState) => state.account.accounts);

  React.useEffect(() => {
    if (status === "idle") dispatch(fetchAccounts());
  }, [status, dispatch]);

  const handleListItemClick = (
    event: React.MouseEvent<any, MouseEvent>,
    index: number
  ) => {
    console.log({ index });
    setSelectedIndex(index);
  };

  return (
    <MuiContainer maxWidth="xs">
      <Grid container>
        <Paper>
          <List>
            {accounts.map((account, index) => (
              <ListItem
                button
                onClick={(event) => handleListItemClick(event, index)}
                key={account.id}
              >
                <ListItemText primary={account.name} secondary={account.type} />
                {account.pending && (
                  <ListItemSecondaryAction>Pending</ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </MuiContainer>
  );
};

export default Account;
