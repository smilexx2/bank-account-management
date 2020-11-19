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
  status: { [key: string]: "idle" | "loading" | "succeeded" | "failed" };
  error: { [key: string]: string | undefined };
};

const initialState: AccountState = {
  accounts: [],
  status: { accounts: "idle", addNewAccount: "idle" },
  error: { accounts: undefined, addNewAccount: undefined },
};

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const { data } = await axios.get("/accounts");
    return data as Account[];
  }
);

export const addNewAccount = createAsyncThunk<
  Account,
  { name: string; type: string }
>("accounts/addNewAccounts", async (account, thunkApi) => {
  let response;
  try {
    response = await axios.post("accounts", { pending: true, ...account });
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }

  return response.data as Account;
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state, action) => {
      state.status.accounts = "loading";
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.status.accounts = "succeeded";
      // Add any fetched posts to the array
      state.accounts = state.accounts.concat(action.payload);
    });
    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.status.accounts = "failed";
      state.error.accounts = action.error.message;
    });
    builder.addCase(addNewAccount.fulfilled, (state, action) => {
      state.status.addNewAccount = "succeeded";
      state.accounts = state.accounts.concat(action.payload);
    });
    builder.addCase(addNewAccount.rejected, (state, action) => {
      state.status.addNewAccount = "failed";
      state.error.addNewAccount = action.error.message;
    });
  },
});

export default accountSlice.reducer;
