import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import { useDispatch } from "react-redux";

const appReducer = combineReducers({
  account: accountReducer,
  transaction: transactionReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    // check for action type
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
