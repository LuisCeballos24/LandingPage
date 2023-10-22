import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../utils/firebase'; // Ajusta la ruta según sea necesario
import { HashLink } from 'react-router-hash-link';

export function Suscribete() {
  const alerta = document.getElementById("alerta")
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);

  const [jsonRedesSociales, setJsonRedesSociales] = useState(null);

  useEffect(() => {
      // Cargar el archivo JSON utilizando una solicitud HTTP (fetch)
      fetch('/json/RedesSociales.json')
      .then((response) => response.json())
      .then((data) => setJsonRedesSociales(data))
      .catch((error) => console.error('Error al cargar el JSON:', error));
  }, []);

  const onSubmit = async (data) => {
    try {
      // Almacena en la base de datos de Firebase
      await db.collection('users').add({
        ...data,
      })
      .then(res => {
        alerta.innerHTML = "<strong>¡¡Excelente!!</strong> <br/> Muchas gracias por darnos su confianza!"
        alerta.classList.add("alertaSuccess");
        console.log(res);
      
      }).catch(err => {
        alerta.innerHTML = `<strong>Opss, ha ocurrido un Error</strong> <br/> Disculpe, utilice esta funcionalidad más tarde.`
        alerta.classList.add("alertaError");

      }).finally(() => {
        alerta.classList.add("mostrarAlerta");
        alerta.style.display = "block";

        setTimeout(() => {
          alerta.classList.remove("mostrarAlerta", "alertaSuccess")
          alerta.style.display = "none";
        }, 6000);

      })


      // Limpiar el formulario después del éxito
      reset();
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };


  if (jsonRedesSociales === null) {
    return <div>Cargando...</div>;
  }

  // Realizar map solo si los datos están disponibles
  const redesSociales = jsonRedesSociales.map((item, index) => (
      // Renderiza tus elementos aquí
      <section key={'redesSociales' + item.id}>
        <HashLink to={item.url} target="_blank">
          <img src={'/img/' + item.img} alt={item.title} />
        </HashLink>
        <p>{item.account}</p>
      </section>
  ));

  return (
    <div className="suscribete" id="suscribete">
      <div id="alerta">¡¡Excelente!! <br/> Muchas gracias por darnos su confianza!</div>
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
              {redesSociales}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}