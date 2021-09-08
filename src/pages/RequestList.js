import React, { useEffect, useState } from "react";
import Request from "../components/Request";
import "./styles/RequestList.css";

import {
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";
import { useHistory } from "react-router";

export default function RequestList() {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDataFilter(
      requests?.filter((item) => item.codigo.includes(String(search)))
    );
    return () => setDataFilter([]);
  }, [search, requests]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboardAdmin/myrequests`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) return setRequests(data.data);
        history.push("/login");
      });
  }, []);
  return (
    <div className="request-list-container">
      <h2 className="request-list__title">Lista de Solicitudes</h2>
      <main>
        <div className="request-list__search-container">
          <div className="request-list__search">
            <SearchIcon className="icon-search" />
            <input
              type="text"
              placeholder="Nro Expediente"
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
        </div>
        <div className="request-list__header">
          <p>
            Nro Expediente
            <button className="request-list__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p>
            Título del Evento
            <button className="request-list__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p>
            Fecha de Solicitud
            <button className="request-list__button">
              <ChevronUpIcon className="icon" />
              <ChevronDownIcon className="icon" />
            </button>
          </p>
          <p>Solicitud</p>
        </div>
        <div className="request-list__list">
          {dataFilter.length > 0 ? (
            dataFilter.map((request) => (
              <Request key={request.id} adm={true} {...request} />
            ))
          ) : (
            <p>No hay solicitudes</p>
          )}
        </div>
      </main>
    </div>
  );
}
