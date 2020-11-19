import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("accessToken")
  );
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email: string, password: string) => {
    let response;
    try {
      response = await axios.post("/login", {
        email,
        password,
      });
    } catch (err) {
      enqueueSnackbar("Login failed", { variant: "error" });
      return;
    }

    const accessToken: string = response?.data?.accessToken;
    if (!accessToken) {
      enqueueSnackbar("Login failed", { variant: "error" });
      return;
    }

    sessionStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  };
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return { accessToken, login, logout };
};

export default useAuth;
