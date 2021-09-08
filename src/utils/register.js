import { API_URL } from "../constants/API_URL";

export const register = ({ name, lastname, email, password }) => {
  const data = {
    nombre: name,
    apellidos: lastname,
    email,
    password,
  };
  const URL = `${API_URL}/auth/signup`;
  return fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
