import React from 'react'
import { HashLink } from "react-router-hash-link";
import { Hambuerguesa } from './Hamburguesa.jsx'

export function Navbar() {
  const handleBurger = () => {
    document.getElementById("btnBurger").classList.toggle("active");
  };
  
  return (
    // <Barra de navegación 
    <div className="navbar">
        <HashLink smooth="true"className="navbar-logo" to="#banner" data-aos="fade-right" data-aos-duration="1000">Daniel Lombana</HashLink>
        <div className="navbar-links">
            <HashLink smooth="true"className="navbar-link" to="#acercaDeMi">Perfil</HashLink>
            <HashLink smooth="true"className="navbar-link" to="#propuestas">Propuestas</HashLink>
            <HashLink smooth="true"className="navbar-link" to="#media">Medios</HashLink>
            <HashLink smooth="true"className="navbar-link" to="#suscribete">Súmate</HashLink>
        </div>
        <Hambuerguesa />
    </div>
  )
}
