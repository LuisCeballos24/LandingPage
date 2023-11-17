import React, { useEffect, useState } from 'react'

export function Media() {

    const [jsonFotos, setJsonFotos] = useState(null);
    const [jsonVideos, setJsonVideos] = useState(null);

    useEffect(() => {
        // Cargar el archivo JSON utilizando una solicitud HTTP (fetch)
        fetch('/json/Fotos.json')
          .then((response) => response.json())
          .then((data) => setJsonFotos(data))
          .catch((error) => console.error('Error al cargar el JSON:', error));

        // Cargar el archivo JSON utilizando una solicitud HTTP (fetch)
        fetch('/json/Videos.json')
        .then((response) => response.json())
        .then((data) => setJsonVideos(data))
        .catch((error) => console.error('Error al cargar el JSON:', error));
    }, []);

      // Verificar si los datos están disponibles antes de realizar el map
    if (jsonFotos === null) {
        return <div>Cargando...</div>;
    }
    if (jsonVideos === null) {
        return <div>Cargando...</div>;
    }

    // Realizar map solo si los datos están disponibles
    const fotos = jsonFotos.map((item, index) => (
        // Renderiza tus elementos aquí
        <div className="foto" key={'foto'+item.id} data-aos="fade-up" data-aos-duration={1000}>
            <img src={'/img/fotos/'+item.img} alt={item.title} />
            <div>
                <h4>{item.title}</h4>
                <p>{item.info}</p>
            </div>
        </div>
    ));
    const videos = jsonVideos.map((item, index) => (
        // Renderiza tus elementos aquí
        <div className="video" key={'video'+item.id} data-aos="fade-up" data-aos-duration={1000}>
            <iframe src={'https://www.youtube.com/embed/'+extractVideoIdFromShortUrl(item.url)} frameBorder="0" allowFullScreen target='_blank'></iframe>
            <div>
                <h4>{item.title}</h4>
                <p>{item.info}</p>
            </div>
        </div>
    ));

    function extractVideoIdFromShortUrl(url) {
        const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    }


  return (
    // Media
    <div className="media" id="media">
        <h2 data-aos="fade-down" data-aos-duration="1000">Medios</h2>
        <div className="medias">
            {fotos}
        </div>
        <div className="medias">
            {videos}
        </div>
    </div>
  )
}