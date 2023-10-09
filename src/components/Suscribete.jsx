import React from 'react'
import jsonRedesSociales from '../json/RedesSociales.json'
import { HashLink } from 'react-router-hash-link'

export function Suscribete() {
  return (
    <div className="suscribete" id="suscribete">
        <h2>Suscríbete</h2>
        <div className="infoSuscribete">
            <form action="" method="POSt">
                <h3>Envíame un Mensaje por Correo!</h3>
                <section>
                    <label htmlFor="email">
                        Email:<br />
                        <input type="email" name="email" id="email" placeholder="suemail@gmail.com" />
                    </label>
                    <label htmlFor="name">
                        Nombre:<br />
                        <input type="tel" name="name" id="name" placeholder="Su Nombre" />
                    </label>
                </section>
                <label htmlFor="mensaje">
                    Mensaje:
                    <textarea name="mensaje" id="mensaje" cols="30" rows="7" placeholder="Redacte su mensaje"></textarea>
                </label>
                <input type="submit" value="Enviar" />
            </form>
            <section>
                <h3>Sígueme en mis Redes Sociales</h3>
                <div className="social">
                    <div className='divSocial'>
                       { jsonRedesSociales.map( item => (
                            <section key={'redesSociales'+item.id}>
                                <HashLink to={item.url} target="_blank">
                                <img src={'http://localhost:5173/src/img/'+item.img} alt={item.title} /></HashLink>
                                <p>{item.account}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}