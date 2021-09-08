import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../images/Logo_desc.png";
import ErrorMessage from "../components/ErrorMessage";
import { login as loginFETCH } from "../utils/login";
import { API_URL } from "../constants/API_URL";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/dashboard/profile`, {
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          console.log(data);
          if (data) return history.push("/dashboard/profile");
        })
        .catch((err) => console.error(err.message));
    }
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const login = async (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError(false);
    loginFETCH(email, password)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data != null) {
          localStorage.setItem("token", data.data);
          history.push("/dashboard/profile");
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.error(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login__image">
        <img
          src="https://wpuploads-lamp-s-1vcpu-1gb-nyc1-01.nyc3.cdn.digitaloceanspaces.com/adtk/2013/01/CONFERENCIA-MARTA-CALAD-3.jpg"
          alt="bg"
        />
      </div>
      <div className="login__right">
        <div className="login__logo">
          <Link to="/">
            {" "}
            <img src={logo} alt="" width="250" />
          </Link>
        </div>
        <div className="login__form">
          <form onSubmit={login}>
            <h1>Iniciar sesión</h1>
            {error && (
              <ErrorMessage
                setError={setError}
                message="Credenciales incorrectas"
              />
            )}
            <div className="input">
              <input
                type="email"
                placeholder="Ingresa tu email"
                ref={emailRef}
              />
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                ref={passwordRef}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  cursor="pointer"
                  color="gray"
                  onClick={toggleShowPassword}
                />
              ) : (
                <AiFillEye
                  cursor="pointer"
                  color="gray"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
            <button
              className={loading && "disable"}
              disabled={loading ? true : false}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="login__create">
            <span>¿Todavia no tienes una cuenta?</span>
            <Link to="/register">Crea una ahora</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
