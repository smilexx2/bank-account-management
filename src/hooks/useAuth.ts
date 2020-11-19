import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(undefined);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/login", {
      email,
      password,
    });

    if (data.accessToken) {
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
    setAccessToken(undefined);
  };

  return { accessToken, login, register, logout };
};

export default useAuth;
