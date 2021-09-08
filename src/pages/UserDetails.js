import React, { useEffect, useRef, useState } from "react";
import "./styles/UserDetails.css";
import { UserIcon, PencilAltIcon, UploadIcon } from "@heroicons/react/solid";

import { updateuser } from "../utils/updateuser";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants/API_URL";
import { storage } from "../firebase";

export default function UserDetails() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    celular: 0,
    edad: 0,
    sexo: "",
    ocupacion: "",
    foto: "",
  });
  const sexoRef = useRef();
  const history = useHistory();

  const [file, setFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);

  const handleUploadImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    const image = e.target.files[0];
    if (e.target.files) {
      if (
        image.type === "image/png" ||
        image.type === "image/jpeg" ||
        image.type === "image/jpg"
      ) {
        const file = new FileReader();
        file.readAsDataURL(image);
        file.onload = (ev) => {
          setImageUploaded({ name: image.name, data: ev.target.result });
        };
      }
    }
  };

  const updateProfile = (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem("token");
    if (!file) {
      const data = { ...user, sexo: sexoRef.current.value, foto: null };
      updateuser(user.id, data, token)
        .then(() => history.push("/dashboard/events"))
        .catch((err) => console.error(err.message));
    } else {
      const stg = storage.ref("/profiles" + file.name);
      const task = stg.put(file);
      task.on(
        "state_changed",
        function (snapshot) {},
        function (err) {},
        function () {
          console.log("Subido");
          task.snapshot.ref.getDownloadURL().then((url) => {
            const data = { ...user, sexo: sexoRef.current.value, foto: url };
            updateuser(user.id, data, token)
              .then(() => history.push("/dashboard/events"))
              .catch((err) => console.error(err.message));
          });
        }
      );
    }
  };

  const removeImage = () => {
    setFile(null);
    setImageUploaded(null);
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
      .then(({ data }) => {
        if (data) return setUser(data);
        history.push("/login");
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="Perfil-Container">
      <h2 className="Path">Mi Perfil</h2>
      <form className="ContainerForm">
        <div className="ContainerFormLeft">
          {!user?.foto ? (
            <>
              <div className="Image-User">
                {!imageUploaded ? (
                  <UserIcon className="user-icon" />
                ) : (
                  <img className="user-icon" src={imageUploaded.data} alt="" />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label className="ContainerFormLeft__button">
                  <span>Subir imagen</span>
                  <input type="file" onChange={handleUploadImage} multiple />
                </label>
                {imageUploaded && (
                  <button
                    style={{ background: "white", color: "red" }}
                    onClick={removeImage}
                  >
                    Remover imagen
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="Image-User">
              <img className="user-icon" src={user?.foto} alt="" />
            </div>
          )}
        </div>

        <div className="ContainerFormRight">
          <div className="ContainerFormRight__header">
            <h3 className="Subtitle--modify">Detalles del Usuario</h3>
            <button
              className="ContainerFormRight__header__button"
              onClick={(e) => {
                e.preventDefault();
                setEdit((edit) => !edit);
              }}
            >
              <PencilAltIcon className="pencil-icon" />
            </button>
          </div>

          <label className="ContainerFormRight__label" htmlFor="name">
            <span>Nombres Completos</span>
            <input
              id="name"
              type="text"
              disabled={!edit}
              name="nombre"
              value={user?.nombre}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>
          <label className="ContainerFormRight__label" htmlFor="lastname">
            <span>Apellidos completos</span>
            <input
              id="lastname"
              type="text"
              name="apellidos"
              disabled={!edit}
              value={user?.apellidos}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>

          <label className="ContainerFormRight__label" htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              type="email"
              disabled
              name="email"
              value={user?.email}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>

          <label className="ContainerFormRight__label" htmlFor="phone">
            <span>Teléfono</span>
            <input
              id="phone"
              type="text"
              name="celular"
              disabled={!edit}
              value={user?.celular}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>

          <label className="ContainerFormRight__label" htmlFor="age">
            <span>Edad</span>
            <input
              id="age"
              type="number"
              min="1"
              name="edad"
              disabled={!edit}
              value={user?.edad}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>

          <label className="ContainerFormRight__label" htmlFor="sex">
            <span>Sexo</span>
            <select id="sex" disabled={!edit} ref={sexoRef}>
              <option value="">-- Seleccione --</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>

          <label className="ContainerFormRight__label" htmlFor="job">
            <span>Ocupación</span>
            <input
              id="job"
              type="text"
              name="ocupacion"
              disabled={!edit}
              value={user?.ocupacion}
              onChange={({ target }) =>
                setUser({ ...user, [target.name]: target.value })
              }
            />
          </label>
        </div>
        {edit ? (
          <div className="ContainerButtons">
            <button
              className="ContainerForm__button"
              onClick={(e) => {
                e.preventDefault();
                setEdit((edit) => !edit);
              }}
            >
              Cancelar
            </button>
            <button className="ContainerForm__button" onClick={updateProfile}>
              Guardar
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
