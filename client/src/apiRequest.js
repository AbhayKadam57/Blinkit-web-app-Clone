import axios from "axios";
import jwt_decode from "jwt-decode";

export const publicRequest = axios.create({
  baseURL: "http://localhost:5500/api",
});

export const userRequest = axios.create({
  baseURL: "http://localhost:5500/api",
});

const NewRefershTokenGenrate = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  let refreshToken = localStorage.getItem("refreshToken");
  try {
    const res = await publicRequest.post(`/user/refreshToken`, {
      token: refreshToken,
    });

    const NewAccessToken = res.data.NewAccessToken;

    const NewRefreshToken = res.data.NewRefreshToken;

    localStorage.setItem("accessToken", NewAccessToken);

    localStorage.setItem("refreshToken", NewRefreshToken);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

userRequest.interceptors.request.use(
  async (config) => {
    try {
      let date = new Date();
      let accessToken = localStorage.getItem("accessToken");

      let decodeedToken = jwt_decode(accessToken);

      if (decodeedToken.exp * 1000 < date.getTime()) {
        const data = await NewRefershTokenGenrate();

        console.log(data);

        config.headers["authorization"] = `Bearer ${data.NewAccessToken}`;
      } else {
        config.headers["authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    } catch (e) {
      console.log(e);
    }
  },
  (error) => {
    return new Promise.reject(error);
  }
);
