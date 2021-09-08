import { API_URL } from "../constants/API_URL";

export const updateuser = (id, data, token) => {
  console.log(data);
  return fetch(`${API_URL}/dashboard/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
};
