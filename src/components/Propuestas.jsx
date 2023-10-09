import React from 'react'
import jsonPropuestas from '../json/Propuestas.json'

export function Propuestas() {


  return (
    // Propuestas
    <div className="propuestas" id="propuestas">
        <h2>Propuestas</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime recusandae unde fuga, iusto repellendus sit earum vitae accusantium labore optio quae aliquid, in, sapiente porro!</p>
        <div className="cards">
            { jsonPropuestas.map(item => (
                <div className="card" key={'propuesta'+item.id}>
                    <section>
                        <img src={'http://localhost:5173/src/img/' + item.img} alt="" />
                    </section>
                    <h3>{item.title}</h3>
                    <p>{item.info}</p>
                </div>
            )) }
        </div>
    </div>
  )
}