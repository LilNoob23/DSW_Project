import { useEffect, useState } from "react";
import { API_URL } from "../constants/API_URL";
import { Link, useLocation } from "react-router-dom";
import "./styles/Events.css";
import "./styles/Home.css";
import ImgEvent from "../images/eventbg.jpg";
import removeDuplicated from "../utils/removeDuplicated";

function Events() {
  const location = useLocation();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataFilter2, setDataFilter2] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/dashboard/events`, {
      method: "GET",
      mode: "cors",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeaturedEvents(data.featured_events);
        setNearbyEvents(data.nearby_events);
        const data1 = [...data.featured_events];
        const data2 = data1.concat(data.nearby_events);
        const dataFiltered = removeDuplicated(data2, "id");
        setDataFilter(dataFiltered);
        setDataFilter2(dataFiltered);
      })
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    setDataFilter(
      dataFilter2?.filter((item) =>
        item.titulo.toLowerCase().includes(search.toLowerCase())
      )
    );
    return () => setDataFilter([]);
  }, [search]);

  return (
    <div className="events_container">
      <h2 className="eventos_title">Eventos</h2>
      <main className="main_content">
        <div className="first_container">
          <div className="form_content">
            <form class="form" action="">
              <div class="inputWithIcon">
                <input
                  class="input_text"
                  type="text"
                  onChange={(ev) => setSearch(ev.target.value)}
                  placeholder="Encuentra eventos"
                />
                <i class="fas fa-search"></i>
              </div>
            </form>
          </div>
        </div>
        {search === "" ? (
          <>
            {" "}
            <div className="second_container">
              <div className="second_title">
                <h2>Eventos Destacados</h2>
              </div>

              <div className="cardsevent_container">
                {featuredEvents?.length > 0 &&
                  featuredEvents.map((event) => (
                    <div className="single_card" key={event.id}>
                      <div className="img_container">
                        <img
                          className="img_event"
                          src={!event?.logo ? ImgEvent : event.logo}
                          alt=""
                        />
                        <div className="icon_i">
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                      <p className="event_title">
                        <a
                          class="button_details"
                          href="/dashboard/events/details"
                        >
                          {event?.titulo}
                        </a>
                      </p>
                      <div className="date_content">
                        <i class="far fa-calendar"></i>
                        <div className="fecha">
                          <p>
                            <span style={{ fontSize: 14 }}>
                              {event?.fecha_inicio}
                            </span>
                            <span style={{ fontSize: 14 }}>
                              / {event?.hora_inicio}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="last_content">
                        <div className="pricechild">
                          <p className="price">Precio:</p>
                          <p className="amount">
                            <b>
                              {!event?.precio_inscripcion ? (
                                "Gratis"
                              ) : (
                                <span>S/ {event?.precio_inscripcion}</span>
                              )}
                            </b>
                          </p>
                        </div>

                        <Link
                          class="button_price"
                          to={
                            location.pathname === "/dashboard/events"
                              ? `/dashboard/events/details/${event?.id}`
                              : `/details/${event?.id}`
                          }
                        >
                          Asistir
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="third_container">
              <div className="second_title">
                <h2>Eventos Recientes</h2>
              </div>

              <div className="cardsevent_container">
                {nearbyEvents?.length > 0 &&
                  nearbyEvents.map((event) => (
                    <div key={event.id} className="single_card">
                      <div className="img_container">
                        <img
                          className="img_event"
                          src={!event?.logo ? ImgEvent : event?.logo}
                          alt=""
                        />
                      </div>
                      <p className="event_title">
                        <a
                          class="button_details"
                          href="/dashboard/events/details"
                        >
                          {event?.titulo}
                        </a>
                      </p>
                      <div className="date_content">
                        <i class="far fa-calendar"></i>
                        <div className="fecha">
                          <p>
                            <span style={{ fontSize: 14 }}>
                              {event?.fecha_inicio}
                            </span>
                            <span style={{ fontSize: 14 }}>
                              / {event?.hora_inicio}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="last_content">
                        <div className="pricechild">
                          <p className="price">Precio:</p>
                          <p className="amount">
                            <b>
                              {!event?.precio_inscripcion ? (
                                "Gratis"
                              ) : (
                                <span>S/ {event?.precio_inscripcion}</span>
                              )}
                            </b>
                          </p>
                        </div>

                        <Link
                          class="button_price"
                          to={
                            location.pathname === "/dashboard/events"
                              ? `/dashboard/events/details/${event?.id}`
                              : `/details/${event?.id}`
                          }
                        >
                          Asistir
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="third_container">
              <div className="second_title">
                <h2>Eventos encontrados</h2>
              </div>

              <div className="cardsevent_container">
                {dataFilter?.length > 0 &&
                  dataFilter.map((event, i) => (
                    <div key={i} className="single_card">
                      <div className="img_container">
                        <img
                          className="img_event"
                          src={!event?.logo ? ImgEvent : event?.logo}
                          alt=""
                        />
                      </div>
                      <p className="event_title">
                        <a
                          class="button_details"
                          href="/dashboard/events/details"
                        >
                          {event?.titulo}
                        </a>
                      </p>
                      <div className="date_content">
                        <i class="far fa-calendar"></i>
                        <div className="fecha">
                          <p>
                            <span style={{ fontSize: 14 }}>
                              {event?.fecha_inicio}
                            </span>
                            <span style={{ fontSize: 14 }}>
                              / {event?.hora_inicio}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="last_content">
                        <div className="pricechild">
                          <p className="price">Precio:</p>
                          <p className="amount">
                            <b>
                              {!event?.precio_inscripcion ? (
                                "Gratis"
                              ) : (
                                <span>S/ {event?.precio_inscripcion}</span>
                              )}
                            </b>
                          </p>
                        </div>

                        <Link
                          class="button_price"
                          to={
                            location.pathname === "/dashboard/events"
                              ? `/dashboard/events/details/${event.id}`
                              : `/details/${event.id}`
                          }
                        >
                          Asistir
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Events;
