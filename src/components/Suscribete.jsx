import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../utils/firebase'; // Ajusta la ruta según sea necesario
import jsonRedesSociales from '../json/RedesSociales.json';
import { HashLink } from 'react-router-hash-link';

export function Suscribete() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Almacena en la base de datos de Firebase
      await db.collection('users').add({
        ...data,
      });
      // Limpiar el formulario después del éxito
      reset();
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="suscribete" id="suscribete">
      <h2 data-aos="fade-down" data-aos-duration="1000">
        Suscríbete
      </h2>
      <div className="infoSuscribete">
        <form onSubmit={handleSubmit(onSubmit)} data-aos="zoom-in-right" data-aos-duration="1000">
          <h3>Envíame un Mensaje por Correo!</h3>
          <section>
            <label htmlFor="email">
              Correo:<br />
              <input type="email" {...register('email')} placeholder="suemail@gmail.com" />
            </label>
            <label htmlFor="number">
              Teléfono:<br />
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
                    <img src={'http://localhost:3000/src/img/' + item.img} alt={item.title} />
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