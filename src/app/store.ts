import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
