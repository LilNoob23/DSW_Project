import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/Logo_desc.png";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import "./styles/Register.css";
import { register as registerFETCH } from "../utils/register.js";
import ErroMessage from "../components/ErrorMessage";
import { API_URL } from "../constants/API_URL";
const regularExpression = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
          if (data) return history.push("/dashboard/profile");
        })
        .catch((err) => console.error(err.message));
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setError(false);
    setLoading(true);
    registerFETCH(data)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        history.push("/login");
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="register">
      <div className="register__image">
        <img
          src="https://wpuploads-lamp-s-1vcpu-1gb-nyc1-01.nyc3.cdn.digitaloceanspaces.com/adtk/2013/01/CONFERENCIA-MARTA-CALAD-3.jpg"
          alt="bg"
        />
      </div>
      <div className="register__right">
        <div className="register__logo">
          <img src={logo} alt="" width="250" />
        </div>
        <div className="register__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Registrate</h1>
            {error && (
              <ErroMessage
                setError={setError}
                message="El correo ya esta en uso"
              />
            )}
            <div className="register__row">
              <div className="register__inputwrapper">
                <div>
                  <AiOutlineUser width="25" height="25" color="gray" />
                  <input
                    type="text"
                    placeholder="Nombres completos"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Ingrese nombres válidos",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <span className="messageerror">{errors.name.message}</span>
                )}
              </div>
              <div className="register__inputwrapper">
                <div>
                  <div></div>
                  <input
                    type="text"
                    placeholder="Apellidos completos"
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "Ingrese apellidos válidos",
                      },
                    })}
                  />
                </div>
                {errors.lastname && (
                  <span className="messageerror">
                    {errors.lastname.message}
                  </span>
                )}
              </div>
            </div>
            <div className="register__inputwrapper">
              <div>
                <AiFillEyeInvisible width="25" height="25" color="gray" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  {...register("email", {
                    pattern: {
                      value: regularExpression,
                      message: "Formato de correo inválido",
                    },
                    required: {
                      value: true,
                      message: "Ingrese un correo válido",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="messageerror">{errors.email.message}</span>
              )}
            </div>
            <div className="register__row">
              <div className="register__inputwrapper">
                <div>
                  <RiLockPasswordLine width="25" height="25" color="gray" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener como minimo 8 caracteres",
                      },
                      required: {
                        value: true,
                        message: "Ingrese una contraseña válida",
                      },
                    })}
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      width="25"
                      height="25"
                      color="gray"
                      cursor="pointer"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <AiFillEye
                      width="25"
                      height="25"
                      color="gray"
                      cursor="pointer"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
                {errors.password && (
                  <span className="messageerror">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="register__inputwrapper">
                <div>
                  <BsCheck width="25" height="25" color="gray" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirme su contraseña"
                    {...register("passwordConfirmation", {
                      validate: (value) =>
                        value === passwordRef.current ||
                        "Las contraseñas no coinciden",
                    })}
                  />
                </div>
                {errors.passwordConfirmation && (
                  <span className="messageerror">
                    {errors.passwordConfirmation.message}
                  </span>
                )}
              </div>
            </div>

            <button
              className={loading && "disable"}
              disabled={loading ? true : false}
            >
              {loading ? "Cargando..." : "Registrate"}
            </button>
            <div className="register__signin">
              <Link to="/login">
                ¿Ya tienes una cuenta? <strong>Inicia sesión aqui</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
