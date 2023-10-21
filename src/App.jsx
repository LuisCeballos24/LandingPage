import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { Banner } from './components/Banner.jsx'
import { AcercaDeMi } from './components/AcercaDeMi.jsx'
import { Propuestas } from './components/Propuestas.jsx'
import { Media } from './components/Media.jsx'
import { Suscribete } from './components/Suscribete.jsx'
import { Footer } from './components/Footer.jsx'
import AOS from 'aos';

import 'aos/dist/aos.css';

export function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <AcercaDeMi />
      <Propuestas />
      <Media />
      <Suscribete />
      <Footer />
    </>
  )
}
