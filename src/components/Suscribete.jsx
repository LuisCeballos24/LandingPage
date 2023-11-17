import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../utils/firebase'; // Ajusta la ruta según sea necesario
import { HashLink } from 'react-router-hash-link';

export function Suscribete() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [jsonRedesSociales, setJsonRedesSociales] = useState(null);
  const alerta = document.getElementById("alerta")
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
      // Cargar el archivo JSON utilizando una solicitud HTTP (fetch)
      fetch('/json/RedesSociales.json')
      .then((response) => response.json())
      .then((data) => setJsonRedesSociales(data))
      .catch((error) => console.error('Error al cargar el JSON:', error));
  }, []);

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 6000);
  };

  const onSubmit = async (data) => {
    try {
      // Almacena en la base de datos de Firebase
      await db.collection('users').add({
        ...data,
      });

      showAlert('¡¡Excelente!! Muchas gracias por darnos su confianza!', 'success');

      // Limpiar el formulario después del éxito
      reset();
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      showAlert('Opss, ha ocurrido un Error. Disculpe, utilice esta funcionalidad más tarde.', 'error');
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
        Súmate
      </h2>
      <div className="infoSuscribete">
        <form onSubmit={handleSubmit(onSubmit)} data-aos="zoom-in-right" data-aos-duration="1000">
          <h3>Construyamos juntos una Asamblea Independiente. Déjanos tus datos.</h3>
          <section>
            <label htmlFor="name">
              Nombre <span className='requerido'>*</span><br />
              <input type="text" {...register('name')} placeholder="Su Nombre" required={true}/>
            </label>
            <label htmlFor="secondName">
              Segundo Nombre<br />
              <input type="text" {...register('secondName')} placeholder="Su segundo Nombre"/>
            </label>
            <label htmlFor="lastName">
              Apellido <span className='requerido'>*</span><br />
              <input type="text" {...register('lastName')} placeholder="Su Apellido" required={true}/>
            </label>
          </section>
          <section>
            <label htmlFor="secondLastName">
              Segundo Apellido <span className='requerido'>*</span><br />
              <input type="text" {...register('secondLastName')} placeholder="Su segundo Apellido" required={true}/>
            </label>
            <label htmlFor="email">
              Correo <span className='requerido'>*</span><br />
              <input type="email" {...register('email')} placeholder="suemail@gmail.com" required={true}/>
            </label>
            <label htmlFor="number">
              Teléfono <span className='requerido'>*</span><br />
              <input type="text" {...register('number')} placeholder="+507 0000-0000" required={true}/>
            </label>
          </section>
          <label htmlFor="mensaje">
            Mensaje 
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