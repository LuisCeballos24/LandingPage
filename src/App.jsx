import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Inicio } from './pages/Inicio.jsx'
import { Login } from './pages/Login.jsx'
import AOS from 'aos';

import 'aos/dist/aos.css';

export function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Routes>
      <Route path='*' element={<Inicio />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  )
}
