import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import jsonRedesSociales from '../json/RedesSociales.json';
import { HashLink } from 'react-router-hash-link';

export function Suscribete() {
  const { register, handleSubmit, reset } = useForm();

  const enviarDatosAGoogleSheets = async (data) => {
    const SPREADSHEET_ID = 'tu-id-de-hoja-de-google-sheets';
    const CLIENT_ID = 'tu-client-id'; // Esto es seguro solo en el lado del cliente

    try {
      const response = await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Hoja1!A1:append?valueInputOption=USER_ENTERED`,
        {
          values: [Object.values(data)],
        },
        {
          params: { key: CLIENT_ID },
        }
      );

      console.log('Datos enviados a Google Sheets:', response);
    } catch (error) {
      console.error('Error al enviar datos a Google Sheets:', error);
    }
  };

  const onSubmit = (data) => {
    enviarDatosAGoogleSheets(data);
    reset(); // Limpia el formulario después de enviar
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