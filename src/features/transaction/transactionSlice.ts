import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction {
  id: number;
  date: Date;
  type: string;
  detail: string;
  deposit?: string;
  withdrawals?: string;
  balance: string;
  accountId: number;
}

type TransactionState = {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: TransactionState = {
  transactions: [],
  status: "idle",
  error: undefined,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (accountId: number) => {
    const { data } = await axios.get(`/accounts/${accountId}/transactions`);
    return data as Transaction[];
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.transactions = state.transactions.concat(action.payload);
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

const { actions, reducer } = transactionSlice;

export const { reset } = actions;

export default reducer;
