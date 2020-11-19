import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("accessToken")
  );

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/login", {
      email,
      password,
    });

    if (data.accessToken) {
      sessionStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
    }
  };
  const register = () => {
    // axios.post("/register", {
    //   email: "user@example.com",
    //   password: "user",
    // });
  };
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return { accessToken, login, register, logout };
};

export default useAuth;
