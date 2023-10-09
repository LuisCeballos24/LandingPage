import React from 'react'
import jsonFotos from '../json/Fotos.json'
import jsonVideos from '../json/Videos.json'
import fondoBanner from '/src/img/fondos/fondo_banner.jpg'

export function Media() {
  return (
    // Media
    <div className="media" id="media">
        <h2>Media</h2>
        <div className="medias">
            { jsonFotos.map( item => (
                <div className="foto" key={'foto'+item.id}>
                    <img src={fondoBanner} alt="" />
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.info}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="medias">
            { jsonVideos.map( item => (
                <div className="video" key={'video'+item.id}>
                    <img src={fondoBanner} alt="" />
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.info}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}