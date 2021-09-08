import React from "react";
import RightHome from "../images/right_home.png";
import "./styles/FooterHome.css";

function FooterHome() {
  return (
    <div>
      <footer>
            <div className="footer_content">
                <div className="footer_cotainer">
                    <div className="left_content">

                        <div className="left_title">
                            <p>¿Tienes alguna duda?</p>
                        </div>

                        <div className="left_text">
                            <p>
                                Si necesitas ayuda, puedes contactarnos en cualquiera de
                                nuestras redes sociales
                            </p>

                        </div>

                        <div className="left_social">
                            <div className="bglink">
                                <a href="https://www.google.com.pe/" target="_blank" rel="noreferrer" className="social_link">
                                    <i class="fab fa-facebook-square"></i>
                                </a>
                            </div>
                            
                            <div className="bglink">
                                <a href="https://www.google.com.pe/" target="_blank" rel="noreferrer" className="social_link">
                                    <i class="fab fa-twitter-square"></i>
                                </a>
                            </div>

                            <div className="bglink">
                                <a href="https://www.google.com.pe/" target="_blank" rel="noreferrer" className="social_link">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </div>

                            <div className="bglink">
                                <a href="https://www.google.com.pe/" target="_blank" rel="noreferrer" className="social_link">
                                    <i class="fab fa-whatsapp-square"></i>
                                </a>
                            </div>

                        </div>

                        

                    </div>

                    <div className="right_content">
                        <img src={RightHome} alt="" />
                    </div>
                </div>

                <hr />

                <div className="copy">
                    <div className="text_copy text_left">
                        Copyright © 2021 - Grupo 1 IHC
                    </div>
                    <div className="text_copy text_right">
                        <a className="a_left" href="https://www.google.com.pe/" target="_blank" rel="noreferrer">Aviso Legal</a>
                        <div className="rayita">|</div>
                        <a className="a_right" href="https://www.google.com.pe/" target="_blank" rel="noreferrer">Política de Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default FooterHome;
