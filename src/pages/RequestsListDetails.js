import React, { useEffect, useState } from "react";
import "./styles/RequestsListDetails.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";

export default function RequestsListDetails() {
  const params = useParams();
  const history = useHistory();
  const [observation, setObservation] = useState(" ");
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboardadmin/myrequests/details/${params.id}`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) return setRequest(data.data[0]);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const acceptRequest = () => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(
      `${API_URL}/dashboardadmin/myrequests/details/approved/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ observaciones: observation }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return history.push("/dashboard/requestslist");
      })
      .catch((err) => console.error(err.message));
  };
  const refuseRequest = () => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(
      `${API_URL}/dashboardadmin/myrequests/details/dismissed/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ observaciones: observation }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return history.push("/dashboard/requestslist");
      })
      .catch((err) => console.error(err.message));
  };
  return (
    <div className="requests-list-details-container">
      <h2 className="requests-list-details__title">
        Lista de Solicitudes/<span>Detalles</span>
      </h2>
      <div className="requests-list-details__button-container">
        <Link
          to="/dashboard/requestslist"
          className="requests-list-details__button"
        >
          <ArrowLeftIcon className="icon-arrowleft" />
        </Link>
      </div>
      <div className="requests-list-details__grid">
        <label className="requests-list-details__item">
          <span>Nro Expediente: </span>
          <input type="text" disabled value={request?.codigo} />
        </label>

        <label className="requests-list-details__item">
          <span>Fecha de Registro:</span>
          <input type="text" disabled value={request?.fecha_envio} />
        </label>

        <label className="requests-list-details__item">
          <span>Título de evento:</span>
          <input type="text" disabled value={request?.titulo} />
        </label>

        <label className="requests-list-details__item">
          <span>Tipo organizador:</span>
          <input type="text" disabled value={request?.tipo_coordinador} />
        </label>

        <label className="requests-list-details__item">
          <span>Organizador:</span>
          <input type="text" disabled value={request?.nombre_coordinador} />
        </label>

        <label className="requests-list-details__item">
          <span>Hora de Inicio:</span>
          <input type="text" disabled value={request?.hora_inicio} />
        </label>

        <label className="requests-list-details__item">
          <span>Fecha de Inicio:</span>
          <input type="text" disabled value={request?.fecha_inicio} />
        </label>

        <label className="requests-list-details__item">
          <span>Fecha de Fin:</span>
          <input type="text" disabled value={request?.fecha_fin} />
        </label>

        <label className="requests-list-details__item">
          <span>Tipo de Evento:</span>
          <input type="text" disabled value={request?.tipo_evento} />
        </label>

        <label className="requests-list-details__item">
          <span>Descripcion:</span>
          <textarea
            name="description"
            maxLength="200"
            rows="8"
            disabled
            value={request?.descripcion}
          ></textarea>
        </label>

        <label className="requests-list-details__item">
          <span>Fotos:</span>
          <img src={request?.logo} className="photorequest" alt="Fotos" />
        </label>

        <label className="requests-list-details__item">
          <span>Inscripción:</span>
          <input type="text" disabled value={request?.tipo_inscripcion} />
        </label>

        <label className="requests-list-details__item">
          <span>Certificado:</span>
          <input type="text" disabled value={request?.tipo_certificado} />
        </label>

        <label className="requests-list-details__item">
          <span>Ambiente:</span>
          <input type="text" disabled value={request?.tipo_ambiente} />
        </label>

        <label className="requests-list-details__item">
          <span>N° Participantes:</span>
          <input type="text" disabled value={request?.participantes} />
        </label>

        <label className="requests-list-details__item">
          <span>Observaciones:</span>
          <textarea
            name="description"
            onChange={(ev) => setObservation(ev.target.value)}
            maxLength="200"
            rows="8"
          ></textarea>
        </label>

        <label className="requests-list-details__item">
          <span>Duración:</span>
          <input type="text" disabled value={request?.duracion} />
        </label>
      </div>
      <div className="requests-list-details__buttons">
        <button onClick={acceptRequest}>Aceptar</button>
        <button onClick={refuseRequest}>Rechazar</button>
      </div>
    </div>
  );
}
