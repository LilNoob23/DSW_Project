import React, { useEffect, useState } from "react";
import "./styles/Inscription.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { API_URL } from "../constants/API_URL";
import ErroMessage from "../components/ErrorMessage";
import { inscription as inscriptionFETCH } from "../utils/inscription";
import { storage } from "../firebase";

export default function Inscription() {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [isWithCertificate, setIsWithCertificate] = useState("");

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
        if (data !== null) return setUser(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const registerOnEvent = (ev) => {
    ev.preventDefault();

    const token = localStorage.getItem("token");
    const inscription = {
      id_evento: params.id,
      id_usuario: user.id,
      certificado: isWithCertificate,
      voucher: file,
    };
    if (!file) {
      inscriptionFETCH(params.id, inscription, token)
        .then((data) => {
          if (data.message === "User Data Imcomplete") return setError(true);
          else return history.push("/dashboard/myevents");
        })
        .catch(() => setError(true));
    } else {
      const stg = storage.ref("/vouchers" + file.name);
      const task = stg.put(file);
      task.on(
        "state_changed",
        function (snapshot) {},
        function (err) {},
        function () {
          task.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              return inscriptionFETCH(
                params.id,
                { ...inscription, voucher: url },
                token
              );
            })
            .then((data) => {
              if (data.message === "User Data Imcomplete")
                return setError(true);
              else return history.push("/dashboard/myevents");
            })
            .catch(() => setError(true));
        }
      );
    }
    setError(false);
  };
  return (
    <div className="inscription-container">
      <h2 className="inscription__title">Eventos/Incripción</h2>
      <div className="inscription__arrowbutton-container">
        <Link to="/dashboard/events" className="inscription__arrowbutton">
          <ArrowLeftIcon className="icon-arrowleft" />
        </Link>
      </div>
      <main>
        <div
          className="inscription__header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Inscripción al Evento</h3>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/dashboard/profile"
          >
            Actualizar datos
          </Link>
        </div>
        {error && (
          <ErroMessage
            setError={setError}
            message="Actualiza tus datos en la pestaña 'Mi Perfil'"
          />
        )}
        <form method="POST" className="inscription__form">
          <div className="inscription__form-left">
            <label className="inscription__label">
              <span>Nombres</span>
              <input type="text" value={user?.nombre} disabled />
            </label>
            <label className="inscription__label">
              <span>Apellidos</span>
              <input type="text" value={user?.apellidos} disabled />
            </label>
            <label className="inscription__label">
              <span>Correo</span>
              <input type="email" value={user?.email} disabled />
            </label>

            <label className="inscription__label">
              <span>Teléfono</span>
              <input type="text" value={user?.celular} disabled />
            </label>
            <label className="inscription__label">
              <span>Sexo</span>
              <input type="text" value={user?.sexo} disabled />
            </label>
          </div>
          <div className="inscription__form-right">
            <label className="inscription__label">
              <span>Ocupación</span>
              <input type="text" value={user?.ocupacion} disabled />
            </label>
            <label className="inscription__label">
              <span>Edad</span>
              <input type="number" min="1" value={user?.celular} disabled />
            </label>
            <label className="inscription__label">
              <span>Certificado</span>
              <select
                name="certificate"
                onChange={({ target }) => {
                  if (target.value == "1") {
                    setIsWithCertificate(true);
                  } else {
                    setIsWithCertificate(false);
                  }
                }}
              >
                <option value="">-- Seleccione --</option>
                <option value="0">No</option>
                <option value="1">Sí</option>
              </select>
            </label>
            <label className="inscription__label voucher-container">
              <span>Voucher</span>
              <input
                className="voucher"
                type="file"
                disabled={!isWithCertificate}
                onChange={(ev) => setFile(ev.target.files[0])}
              />
            </label>

            <div className="inscription__buttons">
              <button onClick={registerOnEvent}>Inscribirse</button>
              <button onClick={() => history.push("/dashboard/events")}>
                Descartar
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
