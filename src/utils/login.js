import { API_URL } from "../constants/API_URL";

export const login = (email, password) => {
  const data = {
    email,
    password,
  };
  const URL = `${API_URL}/auth/login`;
  return fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
