import React, { useState, useEffect } from "react";
import "./styles/MyRequestsDetails.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";

export default function MyRequestsDetails() {
  const params = useParams();
  const history = useHistory();
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboard/myrequests/details/${params.id}`, {
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

  return (
    <div className="requests-details-container">
      <h2 className="requests-details__title">
        Mis Solicitudes/<span>Detalles</span>
      </h2>
      <div className="requests-details__button-container">
        <Link to="/dashboard/myrequests" className="requests-details__button">
          <ArrowLeftIcon className="icon-arrowleft" />
        </Link>
      </div>
      <div className="requests-details__grid">
        <label className="requests-details__item">
          <span>Nro Expediente: </span>
          <input type="text" disabled value={request?.codigo} />
        </label>

        <label className="requests-details__item">
          <span>Fecha de Registro:</span>
          <input type="text" disabled value={request?.fecha_envio} />
        </label>

        <label className="requests-details__item">
          <span>Nombre:</span>
          <input type="text" disabled value={request?.nombre_coordinador} />
        </label>

        <label className="requests-details__item">
          <span>Estado:</span>
          <input type="text" disabled />
        </label>

        <label className="requests-details__item">
          <span>Organizador:</span>
          <input type="text" disabled value={request?.tipo_coordinador} />
        </label>

        <label className="requests-details__item">
          <span>Grupo:</span>
          <input type="text" disabled />
        </label>

        <label className="requests-details__item">
          <span>Hora de Inicio:</span>
          <input type="text" disabled value={request?.hora_inicio} />
        </label>

        <label className="requests-details__item">
          <span>Fecha de Inicio:</span>
          <input type="text" disabled value={request?.fecha_inicio} />
        </label>

        <label className="requests-details__item">
          <span>Fecha de Fin:</span>
          <input type="text" disabled value={request?.fecha_fin} />
        </label>

        <label className="requests-details__item">
          <span>Tipo de Evento:</span>
          <input type="text" disabled value={request?.tipo_evento} />
        </label>

        <label className="requests-details__item">
          <span>Descripcion:</span>
          <textarea
            name="description"
            maxLength="200"
            rows="8"
            disabled
            value={request?.descripcion}
          ></textarea>
        </label>

        <label className="requests-details__item">
          <span>Fotos:</span>
          <img className="request-img" src={request?.logo} alt="Fotos" />
        </label>

        <label className="requests-details__item">
          <span>Inscripción:</span>
          <input type="text" disabled value={request?.tipo_inscripcion} />
        </label>

        <label className="requests-details__item">
          <span>Certificado:</span>
          <input type="text" disabled value={request?.tipo_certificado} />
        </label>

        <label className="requests-details__item">
          <span>Ambiente:</span>
          <input type="text" disabled value={request?.tipo_ambiente} />
        </label>

        <label className="requests-details__item">
          <span>N° Participantes:</span>
          <input type="text" disabled value={request?.participantes} />
        </label>

        <label className="requests-details__item">
          <span>Observaciones:</span>
          <textarea
            value={request?.observaciones}
            name="description"
            maxLength="200"
            rows="8"
            disabled
          ></textarea>
        </label>

        <label className="requests-details__item">
          <span>Duración:</span>
          <input type="text" disabled value={request?.duracion} />
        </label>

        <label className="requests-details__item">
          <span>Campus</span>
          <input type="text" disabled />
        </label>
      </div>
    </div>
  );
}
