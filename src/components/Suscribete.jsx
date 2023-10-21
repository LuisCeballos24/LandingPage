// Suscribete.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import jsonRedesSociales from '../json/RedesSociales.json';

export function Suscribete() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Datos enviados al servidor:', data);  // Agregar este log
      const response = await axios.post('http://localhost:3001/google-sheets', { data }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // Añade otras cabeceras según sea necesario
      },
    });
      console.log('Respuesta del servidor:', response.data);
      reset();
    } catch (error) {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado diferente de 2xx
        console.error('Error de respuesta del servidor:', error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió ninguna respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };
  return (
    <div className="suscribete" id="suscribete">
      <h2 data-aos="fade-down" data-aos-duration="1000">Suscríbete</h2>
      <div className="infoSuscribete">
        <form onSubmit={handleSubmit(onSubmit)} data-aos="zoom-in-right" data-aos-duration="1000">
          <h3>Envíame un Mensaje por Correo!</h3>
          <section>
            <label htmlFor="email">
              Correo:<br />
              <input type="email" {...register('email')} placeholder="suemail@gmail.com" />
            </label>
            <label htmlFor="number">
              Número:<br />
              <input type="text" {...register('number')} placeholder="+507 0000-0000" />
            </label>
            <label htmlFor="name">
              Nombre:<br />
              <input type="text" {...register('name')} placeholder="Su Nombre" />
            </label>
          </section>
          <label htmlFor="mensaje">
            Mensaje:
            <textarea {...register('mensaje')} cols="30" rows="7" placeholder="Redacte su mensaje"></textarea>
          </label>
          <input type="submit" value="Enviar" />
        </form>
        <section data-aos="zoom-in-left" data-aos-duration="1000">
          <h3>Sígueme en mis Redes Sociales</h3>
          <div className="social">
            <div className="divSocial">
              {jsonRedesSociales.map((item) => (
                <section key={'redesSociales' + item.id}>
                  <HashLink to={item.url} target="_blank">
                    <img src={'http://localhost:5173/src/img/' + item.img} alt={item.title} />
                  </HashLink>
                  <p>{item.account}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}