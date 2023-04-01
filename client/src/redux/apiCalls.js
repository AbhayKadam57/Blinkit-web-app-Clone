import { publicRequest } from "../apiRequest";
import {
  LoginUserFailed,
  LoginUserStart,
  LoginUserSuccessFull,
  RegisterUserFailed,
  RegisterUserStart,
  RegisterUserSuccessFull,
} from "./userSlice";

export const RegisterUser = async (dispatch, user) => {
  dispatch(RegisterUserStart());
  try {
    await publicRequest.post("/user/register", user);

    dispatch(
      RegisterUserSuccessFull("User Register Successfully... Now Login")
    );
  } catch (e) {
    console.log(e);

    if (e.response.statusText === "Unauthorized") {
      dispatch(
        RegisterUserFailed(
          "Username is Already exist... Please choose another username"
        )
      );
    } else {
      dispatch(RegisterUserFailed("Register is unsucessful..."));
    }
  }
};

export const LoginUser = async (dispatch, user) => {
  dispatch(LoginUserStart());

  try {
    const { data } = await publicRequest.post("/user/login", user);

    const { accessToken, refreshToken, ...other } = data;

    localStorage.setItem("user", JSON.stringify({ ...other }));

    localStorage.setItem("accessToken", accessToken);

    localStorage.setItem("refreshToken", refreshToken);

    dispatch(LoginUserSuccessFull({ ...other }));
    window.location.reload(true);
  } catch (e) {
    console.log(e);

    dispatch(LoginUserFailed(e.response.data));
  }
};
