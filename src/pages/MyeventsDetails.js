import "./styles/MyeventsDetails.css";
import "./styles/HomeDetails.css";
import ImgEvent from "../images/eventbg.jpg";
import ImgCoordi from "../images/imagecoordi.png";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/API_URL";
import { useHistory, useParams } from "react-router";

function MyeventsDetails() {
  const history = useHistory();
  const params = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return history.push("/login");
    fetch(`${API_URL}/dashboard/myevents/details/${params.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data === null) return history.push("/login");
        console.log(data.request[0]);
        setEvent(data.request[0]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div className="myeventsdetails_container">
      <h2 className="eventsdetails__title">
        Mis Eventos/<span>{event?.titulo}/Detalle</span>
      </h2>
      <main>
        <div className="first_container">
          <div className="img_event">
            <img
              src={!event?.logo_evento ? ImgEvent : event?.logo_evento}
              alt=""
              className="img"
            />
          </div>
          <div className="event_details">
            <div className="detail">
              <p className="title">Título del evento</p>
              <p className="contents">{event?.titulo}</p>
            </div>
            <div className="detail">
              <p className="title">Fecha del evento</p>
              <p className="contents">{event?.fecha_inicio}</p>
            </div>
            <div className="detail">
              <p className="title">Hora de inicio</p>
              <p className="contents">{event?.hora_inicio}</p>
            </div>
            <div className="detail">
              <p className="title">Número de participantes</p>
              <p className="contents">{event?.participantes}</p>
            </div>
          </div>
        </div>

        <div className="second_container">
          <div className="entradas">
            <p class="title_entradas">Entradas</p>
            <div className="entradas_price">
              <div className="pricechild">
                <p className="price">Precio:</p>
                <p className="amount">
                  <b>
                    {" "}
                    {!event?.precio_inscripcion ? (
                      "Gratis"
                    ) : (
                      <span>S/ {event?.precio_inscripcion}</span>
                    )}
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div className="certificado">
            <p className="title_certificado">Certificado</p>
            <div className="certificado_price">
              <p className="cer_category">{event?.tipo_certificado}</p>
            </div>
          </div>
        </div>

        <div className="third_container">
          <div className="third_title">Más información</div>
          <div className="info_details">
            <div className="info_text">
              <p className="text">{event?.descripcion_evento}</p>
            </div>
            <div className="info_img">
              <img src={ImgCoordi} alt="" className="image_info" />
              <p className="name_coordi">{event?.nombre_coordinador}</p>
            </div>
          </div>
        </div>

        {/* <div className="fourth_container">
          <div className="fourth_title">Galería</div>
          <div className="galery_content">
            <div className="sigle_photo">
              <img src={ImgEvent} alt="" className="galery_photo" />
            </div>
            <div className="sigle_photo">
              <img src={ImgEvent} alt="" className="galery_photo" />
            </div>
            <div className="sigle_photo">
              <img src={ImgEvent} alt="" className="galery_photo" />
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default MyeventsDetails;
