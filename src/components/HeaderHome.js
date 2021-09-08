import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo 2.png";
import "./styles/HeaderHome.css";
import { API_URL } from "../constants/API_URL";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
function HeaderHome() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/dashboard/profile`, {
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) return setUser(data.data.email);
        })
        .catch((err) => console.error(err.message));
    }
  }, []);
  return (
    <div>
      <nav class="nav_container">
        <div class="nav_logo">
          <img src={logo} alt="" class="logo_img" />
        </div>
        <Link to="/dashboard/profile">Ir al dashboard</Link>
        <div class="nav_links">
          {!user ? (
            <Link class="btn_link" to="/login">
              Iniciar Sesión
            </Link>
          ) : (
            <div className="usernameactive">
              <FiUser className="icon user" />
              <p className="username">{user}</p>
              <FiLogOut className="icon signOut" onClick={signOut} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default HeaderHome;
