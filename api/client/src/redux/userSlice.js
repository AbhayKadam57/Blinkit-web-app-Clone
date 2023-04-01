import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: false,
    loading: false,
    registerMessage: null,
    LoginMessage: null,
  },
  reducers: {
    RegisterUserStart: (state, action) => {
      state.loading = true;
    },
    RegisterUserSuccessFull: (state, action) => {
      state.loading = false;
      state.registerMessage = action.payload;
    },
    RegisterUserFailed: (state, action) => {
      state.loading = false;
      state.registerMessage = action.payload;
    },
    LoginUserStart: (state, action) => {
      state.loading = true;
    },
    LoginUserSuccessFull: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    LoginUserFailed: (state, action) => {
      state.loading = false;
      state.LoginMessage = action.payload;
    },
  },
});

export const {
  RegisterUserStart,
  RegisterUserSuccessFull,
  RegisterUserFailed,
  LoginUserStart,
  LoginUserSuccessFull,
  LoginUserFailed,
} = UserSlice.actions;

export default UserSlice.reducer;
