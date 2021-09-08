import { API_URL } from "../constants/API_URL";

export const inscription = (id, data, token) => {
  return fetch(`${API_URL}/dashboard/events/inscription/${id}`, {
    method: "POST",
    mode: "cors",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data);
};
