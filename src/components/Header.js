import React from "react";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

import "./styles/Header.css";

function Header({ signOut, user }) {
  return (
    <div className="header">
      <FiUser className="icon user" />
      <p className="username">{user ? user.nombre : "Username"}</p>
      <FiLogOut className="icon signOut" onClick={signOut} />
    </div>
  );
}

export default Header;
