import { useEffect, useState } from "react";
import "./styles/Myevents.css";
import "./styles/Home.css";
import ImgEvent from "../images/eventbg.jpg";
import { API_URL } from "../constants/API_URL";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Myevents() {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboard/myevents`, {
      method: "GET",
      mode: "cors",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === null) return history.push("/login");
        setLoading(false);
        setEvents(data.nearby_events);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="myevents_container">
      <h2 className="eventos_title">Mis Eventos</h2>
      <main className="main_content">
        <div className="first_container">
          <div className="form_content"></div>
        </div>

        <div className="third_container">
          <div className="second_title">
            <h2>Eventos</h2>
          </div>

          <div className="cardsevent_container myevents">
            {loading ? (
              <p>Cargando...</p>
            ) : events?.length > 0 ? (
              events?.map((event, i) => (
                <div key={i} className="single_card">
                  <div className="img_container">
                    <img className="img_event" src={ImgEvent} alt="" />
                  </div>
                  <p className="event_title">{event.titulo}</p>
                  <div className="date_content">
                    <i class="far fa-calendar"></i>
                    <div className="fecha">
                      <p>
                        <span>{event?.fecha_inicio}</span>
                        <span>/ {event?.hora_inicio}</span>
                      </p>
                    </div>
                  </div>
                  <div className="last_content">
                    <div className="pricechild">
                      <p className="price">Precio:</p>
                      <p className="amount">
                        {!event?.precio_inscripcion ? (
                          "Gratis"
                        ) : (
                          <span>S/ {event?.precio_inscripcion}</span>
                        )}
                      </p>
                    </div>

                    <Link
                      class="button_price"
                      to={`/dashboard/myevents/details/${event.id}`}
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h2>No te has registrado a ningun evento</h2>
                <Link to="/dashboard/events">Ver eventos </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Myevents;
