import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

export const Hambuerguesa = () => {

    const [mostrarElemento, setMostrarElemento] = useState(true);

    const toggleElemento = () => {
        setMostrarElemento(!mostrarElemento);
    };

    const handleBurger = () => {
        // toggleElemento()
        document.getElementById("btnBurger").classList.toggle("active");
        document.getElementById("slideBurger").classList.toggle("hideBurger");
    };

    return (
        <div className="Burger">
        <div id="btnBurger" onClick={handleBurger}></div>
        <div id={mostrarElemento ? 'slideBurger' : 'slideBurgerOculto'} className="hideBurger">
            <HashLink smooth to="#acercaDeMi" className='underline'><h3>Acerca de Mí</h3></HashLink>
            <HashLink smooth to="#propuestas" className='underline'><h3>Propuestas</h3></HashLink>
            <HashLink smooth to="#media" className='underline'><h3>Medias</h3></HashLink>
            <HashLink smooth to="#suscribete" className='underline'><h3>Contactos</h3></HashLink>
        </div>
        </div>
    );
};
