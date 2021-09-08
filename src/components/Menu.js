import React, { useEffect } from "react";
import "./styles/Menu.css";
import logo from "../images/logo 2.png";

import { FaUserAlt, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { RiCalendarCheckFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";
function Menu({ toggleShow, setToggleShow, user }) {
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className={toggleShow ? "sidebar open" : "sidebar"}>
      <div className="logo-details">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className={toggleShow ? "logo" : "logo hidden"}
          />
        </Link>
        <i
          className="bx bx-menu"
          id="btn"
          onClick={() => setToggleShow(!toggleShow)}
        ></i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to={`/dashboard/profile`}>
            <i>
              <FaUserAlt />
            </i>
            <span className="links_name">Mi perfil</span>
          </Link>
          <span className="tooltip">Mi perfil</span>
        </li>
        {user?.tipo_usuario !== "S" ? (
          <>
            {" "}
            <li>
              <Link to="/dashboard/events">
                <i>
                  <FaCalendarAlt />
                </i>
                <span className="links_name">Eventos</span>
              </Link>
              <span className="tooltip">Eventos</span>
            </li>
            <li>
              <Link to="/dashboard/myevents">
                <i>
                  <RiCalendarCheckFill />
                </i>
                <span className="links_name">Mis eventos</span>
              </Link>
              <span className="tooltip">Mis eventos</span>
            </li>
            <li>
              <Link to="/dashboard/eventregister">
                <i>
                  <FaEdit />
                </i>
                <span className="links_name">Registrar eventos</span>
              </Link>
              <span className="tooltip">Registrar eventos</span>
            </li>
            <li>
              <Link to="/dashboard/myrequests">
                <i>
                  <IoDocumentText />
                </i>
                <span className="links_name">Mis solicitudes</span>
              </Link>
              <span className="tooltip">Mis solicitudes</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard/requestslist">
                <i>
                  <IoDocumentText />
                </i>
                <span className="links_name">Solicitudes</span>
              </Link>
              <span className="tooltip">Solicitudes</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Menu;
