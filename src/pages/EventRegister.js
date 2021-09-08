import React, { useState, useEffect } from "react";
import "./styles/EventRegister.css";
import { PlusIcon } from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";
import { useHistory } from "react-router";
import { storage } from "../firebase";
function EventRegister() {
  const [isGroup, setIsGroup] = useState(false);
  const [nombre_coordinador, setNombre_coordinador] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [inscription, setInscription] = useState("");
  const [isWithCertificate, setIsWithCertificate] = useState("");
  const [certificate, setCertificate] = useState("");
  const history = useHistory();
  const [event, setEvent] = useState({
    titulo: "",
    tipo_coordinador: "",
    nombre_coordinador: "",
    fecha_inicio: "",
    fecha_fin: "",
    tipo_evento: "",
    hora_inicio: "",
    duracion: "",
    tipo_inscripcion: "",
    precio_inscripcion: "",
    tipo_certificado: "",
    precio_certificado: "",
    descripcion: "",
    tipo_ambiente: "",
    participantes: 100,
  });
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const handleUploadImage = (e) => {
    const img = e.target.files[0];
    setImage(e.target.files[0]);
    if (e.target.files) {
      if (
        img.type === "image/png" ||
        img.type === "image/jpeg" ||
        img.type === "image/jpg"
      ) {
        const file = new FileReader();
        file.readAsDataURL(img);
        file.onload = (ev) => {
          setImageUploaded({ name: img.name, data: ev.target.result });
        };
      }
    }
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
        if (!data) return history.push("/login");
      })
      .catch((err) => console.error(err.message));
  }, []);

  const removeImage = () => {
    setImage(null);
    setImageUploaded(null);
  };

  const registerEvent = (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem("token");
    const stg = storage.ref("/events" + image.name);
    const task = stg.put(image);
    task.on(
      "state_changed",
      function (snapshot) {},
      function (err) {},
      function () {
        console.log("Subido");
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            const data = {
              ...event,
              nombre_coordinador,
              precio_certificado: certificate,
              precio_inscripcion: inscription,
              logo: url,
            };
            return fetch(`${API_URL}/dashboard/events/register`, {
              method: "POST",
              mode: "cors",
              headers: {
                token: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          })
          .then((res) => res.json())
          .then((data) => {
            history.push("/dashboard/events");
            console.log(data);
          })
          .catch((err) => console.error(err.message));
      }
    );
  };

  return (
    <div className="EventRegister-Container">
      <h2 className="Path">Registrar Evento</h2>
      <form className="Container-Form">
        <h3 className="Subtitle">Información del Evento</h3>
        <div className="Container-Form-Left">
          <label className="Container-Form__label">Título del Evento</label>
          <input
            className="Container-Form__input"
            type="text"
            name="titulo"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />

          <label className="Container-Form__label">Organizador</label>
          <select
            className="Container-Form__input"
            // value={isGroup}
            name="tipo_coordinador"
            onChange={({ target }) => {
              console.log(target.value);
              if (target.value == 1) {
                setIsGroup(true);
              } else {
                setIsGroup(false);
                setNombre_coordinador("");
              }
              setEvent({ ...event, [target.name]: target.value });
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="0">Individual</option>
            <option value="1">Grupo</option>
          </select>
          <input
            className="Container-Form__input"
            type="text"
            value={nombre_coordinador}
            disabled={!isGroup}
            name="nombre_coordinador"
            onChange={({ target }) => setNombre_coordinador(target.value)}
          />

          <label className="Container-Form__label modify">
            Fecha de Inicio
          </label>
          <label className="Container-Form__label modify">Fecha de Fin</label>

          <input
            className="Container-Form__input modify"
            type="date"
            name="fecha_inicio"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />
          <input
            className="Container-Form__input modify"
            type="date"
            name="fecha_fin"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />

          <label className="Container-Form__label">Tipo de Evento</label>
          <select
            className="Container-Form__input"
            name="tipo_evento"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          >
            <option value="">-- Seleccione --</option>
            <option value="E001">Taller</option>
            <option value="E002">Curso</option>
            <option value="E003">Conferencia</option>
            <option value="E004">Congreso</option>
            <option value="E005">Seminario</option>
          </select>

          <label className="Container-Form__label modify">Hora de Inicio</label>
          <label className="Container-Form__label modify">Duración</label>

          <input
            className="Container-Form__input modify"
            type="time"
            name="hora_inicio"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />
          <input
            className="Container-Form__input modify"
            type="number"
            min="1"
            max="12"
            name="duracion"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />

          <label className="Container-Form__label modify">Inscripción</label>
          <label className="Container-Form__label modify">Costo (S/ )</label>

          <select
            className="Container-Form__input modify"
            // value={inscription}
            name="tipo_inscripcion"
            onChange={({ target }) => {
              if (target.value === "Pago") {
                setIsPaid(true);
              } else {
                setIsPaid(false);
                setInscription(false);
              }
              setEvent({ ...event, [target.name]: target.value });
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Pago">Pago</option>
          </select>
          <input
            disabled={!isPaid}
            className="Container-Form__input modify"
            type="number"
            value={inscription}
            min="1"
            name="precio_inscripcion"
            onChange={({ target }) => setInscription(target.value)}
          />

          <label className="Container-Form__label modify">Certificado</label>
          <label className="Container-Form__label modify">Precio (S/)</label>

          <select
            className="Container-Form__input modify"
            // value={certificate}
            name="tipo_certificado"
            onChange={({ target }) => {
              if (target.value == "1") {
                setIsWithCertificate(true);
              } else {
                setIsWithCertificate(false);
                setCertificate("");
              }
              setEvent({ ...event, [target.name]: target.value });
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="0">Gratuito</option>
            <option value="1">Pago</option>
            <option value="2">No aplica</option>
          </select>
          <input
            disabled={!isWithCertificate}
            className="Container-Form__input modify"
            type="number"
            value={certificate}
            min="1"
            name="precio_certificado"
            onChange={({ target }) => setCertificate(target.value)}
          />

          <label className="Container-Form__label">Ambiente</label>
          <select
            className="Container-Form__input"
            name="tipo_ambiente"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          >
            <option value="">-- Seleccione --</option>
            <option value="A001">Auditorio</option>
            <option value="A002">Aula Magna</option>
            <option value="A003">Aula</option>
            <option value="A004">Laboratorio</option>
            <option value="A005">Exteriores</option>
          </select>
        </div>

        <div className="Container-Form-Right">
          <p className="Container-Form__label">Imagen del Evento</p>
          {!imageUploaded ? (
            <>
              <label
                htmlFor="imagen-referencial"
                className="Container-Form__label--file"
              >
                <PlusIcon className="icon-plus" />
              </label>
              <input
                id="imagen-referencial"
                className="Container-Form__input--file"
                type="file"
                onChange={handleUploadImage}
              />
            </>
          ) : (
            <>
              <img
                className="Container-Form__label--file"
                src={imageUploaded.data}
                alt=""
              />
              <button
                onClick={removeImage}
                style={{
                  margin: 0,
                  padding: 10,
                  background: "white",
                  color: "red",
                }}
              >
                Remover imagen
              </button>
            </>
          )}

          <label className="Container-Form__label">Descripción</label>
          <textarea
            className="Container-Form__input description"
            maxLength="200"
            rows="8"
            name="descripcion"
            onChange={({ target }) =>
              setEvent({ ...event, [target.name]: target.value })
            }
          />
        </div>
        <div className="Container-Buttons">
          <button className="Container-Form__button">Cancelar</button>
          <button className="Container-Form__button" onClick={registerEvent}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventRegister;
