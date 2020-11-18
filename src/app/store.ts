import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";

const store = configureStore({
  reducer: {
    videoCall: accountReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
