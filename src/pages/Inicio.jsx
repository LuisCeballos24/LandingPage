import React from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { Banner } from '../components/Banner.jsx'
import { AcercaDeMi } from '../components/AcercaDeMi.jsx'
import { Propuestas } from '../components/Propuestas.jsx'
import { Media } from '../components/Media.jsx'
import { Suscribete } from '../components/Suscribete.jsx'
import { Footer } from '../components/Footer.jsx'

export const Inicio = () => {
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