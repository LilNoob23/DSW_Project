import React from "react";
import "./styles/Request.css";
import { Link } from "react-router-dom";

import { CalendarIcon, DocumentTextIcon } from "@heroicons/react/solid";

export default function Request({
  adm,
  codigo,
  estado,
  fecha_envio,
  id,
  titulo,
}) {
  return (
    <div className="request-container">
      <p className="request__exp">{codigo}</p>
      <p className="request__title">{titulo}</p>
      <p className="request__date">
        <CalendarIcon className="calendar-icon" />
        {fecha_envio}
      </p>

      <Link
        to={
          adm
            ? `/dashboard/requestslist/details/${id}`
            : `/dashboard/myrequests/details/${id}`
        }
      >
        {adm && <DocumentTextIcon width="20" color="var(--black)" />}
        {estado === 0 && <p className="request__state">Rechazado</p>}
        {estado === 1 && <p className="request__state">Aceptado</p>}
        {estado === 2 && <p className="request__state">Pendiente</p>}
      </Link>
    </div>
  );
}
