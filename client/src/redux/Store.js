import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    usersInfo: userSlice,
    cartInfo: cartSlice,
  },
});

export default store;
