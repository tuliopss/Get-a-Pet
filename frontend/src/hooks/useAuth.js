import api from "../utils/api";

import { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import useFlashMessage from "./useFlashMessages";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

  const register = async (user) => {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      console.log(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  return { register };
}
