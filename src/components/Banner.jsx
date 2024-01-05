import React from 'react'
import { HashLink } from 'react-router-hash-link'

export function Banner() {

  return (
    // Banner
    <div className="banner" id="banner">
        <div className="banner-content">
            <div className="banner-text">
                <div className="banner-title" data-aos="fade-down" data-aos-duration="1000">Daniel Lombana</div>
                <div className="banner-subtitle">Candidato Independiente a Diputado</div>
                <div className="banner-subtitle"><b>San Francisco - Juan Díaz - Don Bosco -
                    Parque Lefevre - Río Abajo<br /><br /><span style={{"color": "black", "fontStyle": "oblique"}}>Circuito 8-4</span></b></div>
                
                <HashLink smooth="true" to="#acercaDeMi"><button className="hire-button" >Conóceme</button></HashLink>
            </div>
            <div className="banner-image" data-aos="zoom-in-down" data-aos-duration="1000">
                <img src={'/img/fotos/_W7A5985.png'} alt="" />
                <img src={'/img/fondos/Screenshot 2023-09-25 230513.png'} alt="" />
            </div>
        </div>
    </div>
  )
}
