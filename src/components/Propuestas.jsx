import React from 'react'
import jsonPropuestas from '../json/Propuestas.json'

export function Propuestas() {


  return (
    // Propuestas
    <div className="propuestas" id="propuestas">
        <h2 data-aos="fade-down" data-aos-duration="1000">Propuestas</h2>
        <p>
            Nuestra visión en el corto plazo busca establecer claridad en los objetivos nacionales para abordar temas cruciales como el costo de la vida, el desempleo, la inseguridad, la salud, la minería, los ingresos tributarios, la migración, la gestión de residuos, la inversión nacional y extranjera, la gestión medio ambiental, el sistema de justicia, la institucionalidad, el turismo, entre otros.
        </p>
        <div className="cards">
            { jsonPropuestas.map(item => (
                <div className="card" key={'propuesta'+item.id} data-aos={ item.id == 1 ? "flip-right" : item.id == 2 ? "flip-up" : "flip-left"} data-aos-duration="1500">
                    <section>
                        <img src={'http://localhost:3000/src/img/' + item.img} alt="" />
                    </section>
                    <h3>{item.title}</h3>
                    <p>{item.info}</p>
                </div>
            )) }
        </div>
    </div>
  )
}