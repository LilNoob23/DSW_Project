import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Header from "./Header";
import "./styles/Layout.css";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants/API_URL";

export default function Layout({ children }) {
  const history = useHistory();
  const [toggleShow, setToggleShow] = useState(true);
  const [user, setUser] = useState(null);
  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboard/profile`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.data) return history.push("/login");
        setUser({
          nombre: `${data.data.nombre} ${data.data.apellidos}`,
          tipo_usuario: data.data.tipo_usuario,
        });
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="Container-Layout">
      <Menu
        toggleShow={toggleShow}
        setToggleShow={setToggleShow}
        signOut={signOut}
        user={user}
      />
      <section className="home-section">
        <div style={{ borderBottom: "1px solid gray" }}>
          <Header signOut={signOut} user={user} />
        </div>
        <div className="content">{children}</div>
      </section>
    </div>
  );
}
