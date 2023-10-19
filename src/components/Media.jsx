import React from 'react'
import jsonFotos from '../json/Fotos.json'
import jsonVideos from '../json/Videos.json'
import fondoBanner from '/src/img/fondos/fondo_banner.jpg'

export function Media() {

    function extractVideoIdFromShortUrl(url) {
        const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    }

  return (
    // Media
    <div className="media" id="media">
        <h2>Media</h2>
        <div className="medias">
            { jsonFotos.map( item => (
                <div className="foto" key={'foto'+item.id}>
                    <img src={'http://localhost:5173/src/img/fotos/'+item.img} alt={item.title} />
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
                    <iframe src={'https://www.youtube.com/embed/'+extractVideoIdFromShortUrl(item.url)} frameBorder="0" allowFullScreen target='_blank'></iframe>
                    <div>
                        <h4>{item.title}</h4>
                        <p>{item.info}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}