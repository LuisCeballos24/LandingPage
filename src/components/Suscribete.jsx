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
      console.log('Datos enviados al servidor:', data);
      const response = await axios.post('http://localhost:3001/store-data', { data });
      console.log('Respuesta del servidor:', response.data);
      reset();
    } catch (error) {
      // Manejo de errores
    }
  };

  const onGenerateExcel = async () => {
    try {
      // Realizar una solicitud GET para obtener el archivo Excel
      window.open('http://localhost:3001/generate-excel', '_blank');
    } catch (error) {
      // Manejo de errores
    }
  };

  return (
    <div className="suscribete" id="suscribete">
      <h2>Suscríbete</h2>
      <div className="infoSuscribete">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button onClick={onGenerateExcel}>Generar Excel</button>
        </form>
        <section>
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