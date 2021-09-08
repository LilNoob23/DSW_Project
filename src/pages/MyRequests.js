import React, { useEffect, useState } from "react";
import Request from "../components/Request";
import { useHistory } from "react-router-dom";
import "./styles/MyRequests.css";

import {
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";

function MyRequests() {
  const history = useHistory();
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboard/myrequests`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) return setRequests(data.data);
        // history.push("/login");
      })
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    setDataFilter(
      requests?.filter((item) => item.codigo.includes(String(search)))
    );

    return () => setDataFilter([]);
  }, [search, requests]);

  useEffect(() => {
    console.log(dataFilter);
  }, [dataFilter]);

  return (
    <div className="requests-container">
      <h2 className="requests__title">Mis Solicitudes</h2>
      <p className="resquests__description">
        En esta sección se especifican sus solicitudes que han sido registradas
        en el Sistema de Gestión de Eventos Académicos de la FISI. Puede
        verificar su estado y al dar click sobre alguno, podrá verlo con mayor
        detalle, además de las observaciones hechas por el personal encargado.
      </p>
      <main>
        <div className="requests__search-container">
          <div className="requests__search">
            <SearchIcon className="icon-search" />
            <input
              type="text"
              placeholder="Nro Expediente"
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
        </div>
        <div className="requests__header">
          <p>
            Nro Expediente
            <button className="requests__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p>
            Nombre
            <button className="requests__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p>
            Fecha de Envio
            <button className="requests__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p className="myrequest__state">Estado</p>
        </div>
        <div className="myrequest__list">
          {dataFilter.length > 0 &&
            dataFilter.map((request) => (
              <Request key={request.id} {...request} />
            ))}
        </div>
      </main>
    </div>
  );
}

export default MyRequests;
