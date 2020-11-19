import React from "react";
import MuiButton from "@material-ui/core/Button";
import { ColDef, DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { selectAccount } from "../account/accountSlice";
import { fetchTransactions, reset } from "./transactionSlice";
import GlobalError from "../../components/GlobalError";

const Container = styled.div`
  align-self: stretch;
  width: 100%;
  margin-top: 68px;
`;

const Button = styled(MuiButton)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const Transaction: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: RootState) => state.transaction.status);
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions
  );
  const selectedAccount = useSelector(
    (state: RootState) => state.account.selectedAccount
  );

  React.useEffect(() => {
    if (status === "idle" && selectedAccount) {
      dispatch(fetchTransactions(selectedAccount.id));
    }
  }, [status, dispatch, selectedAccount]);

  const columns: ColDef[] = [
    { field: "date", headerName: "Date", type: "date", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "detail", headerName: "Detail", width: 300 },
    { field: "deposit", headerName: "Deposit", width: 200 },
    { field: "withdrawals", headerName: "Withdrawals", width: 200 },
    { field: "balance", headerName: "Balance", width: 200 },
  ];

  const handleButtonClick = () => {
    dispatch(reset());
    dispatch(selectAccount(undefined));
  };

  return (
    <>
      {status === "failed" && <GlobalError />}
      {status === "succeeded" && (
        <Container>
          <DataGrid rows={transactions} columns={columns} />
        </Container>
      )}
      <Button variant="contained" onClick={handleButtonClick} disableElevation>
        Back
      </Button>
    </>
  );
};

export default Transaction;
