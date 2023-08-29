import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessages";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;

      setAuthenticated(true);
    }
  }, []);

  const register = async (user) => {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };
  const login = async (user) => {
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };
  const authUser = async (data) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  };

  const logout = async () => {
    const msgText = "Logout realizado com sucesso! Volte em breve!";
    const msgType = "success";

    setAuthenticated(false);

    localStorage.removeItem("token");

    api.defaults.headers.authorization = undefined;

    navigate("/");

    setFlashMessage(msgText, msgType);
  };

  return { authenticated, register, logout, login };
}
