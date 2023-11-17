import React, { useEffect, useState } from 'react'

export function Propuestas() {

    const [jsonPropuestas, setJsonPropuestas] = useState(null);

    useEffect(() => {
        // Cargar el archivo JSON utilizando una solicitud HTTP (fetch)
        fetch('/json/Propuestas.json')
        .then((response) => response.json())
        .then((data) => setJsonPropuestas(data))
        .catch((error) => console.error('Error al cargar el JSON:', error));
    }, []);

    const colocarAnimacion = (id) => {
        switch (id) {
          case 1:
          case 4:
          case 7:
            return 'flip-right';
          case 2:
          case 5:
          case 8:
            return 'flip-up';
          case 3:
          case 6:
          case 9:
            return 'flip-left';
        }

        return 'flip-up'
      };

    if (jsonPropuestas === null) {
        return <div>Cargando...</div>;
      }
    
      // Realizar map solo si los datos están disponibles
      const propuestas = jsonPropuestas.map((item) => (
          // Renderiza tus elementos aquí
            <div className="card" key={'propuesta'+item.id} data-aos={ colocarAnimacion(item.id) } data-aos-duration="1500">
                <section>
                    <img src={'/img/' + item.img} alt="" />
                </section>
                <h3>{item.title}</h3>
                <p>{item.info}</p>
            </div>
      ));

  return (
    // Propuestas
    <div className="propuestas" id="propuestas">
        <h2 data-aos="fade-down" data-aos-duration="1000">Propuestas</h2>
        <p>
            Nuestra visión en el corto plazo busca establecer claridad en los objetivos nacionales para abordar temas cruciales como el costo de la vida, el desempleo, la inseguridad, la salud, la minería, los ingresos tributarios, la migración, la gestión de residuos, la inversión nacional y extranjera, la gestión medio ambiental, el sistema de justicia, la institucionalidad, el turismo, entre otros.
        </p>
        <div className="cards">
            { propuestas }
        </div>
    </div>
  )
}