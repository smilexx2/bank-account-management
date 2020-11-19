import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Account {
  id: number;
  name: string;
  type: string;
  pending: boolean;
}

type AccountState = {
  accounts: Account[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: AccountState = {
  accounts: [],
  status: "idle",
  error: undefined,
};

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const { data } = await axios.get("/accounts");
    return data as Account;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.accounts = state.accounts.concat(action.payload);
    });
    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default accountSlice.reducer;
