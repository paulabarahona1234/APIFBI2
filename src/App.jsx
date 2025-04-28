import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Aleatorios from './Componentes/Aleatorios'
import Capturados from './Componentes/Capturados'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Wanted from './Componentes/Wanted'
import Usuarios from './Componentes/Usuarios'
import Menu from './Componentes/Menu'

import './App.css'

function App() {
  const [favoritos, setFavoritos] = useState([]);

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/Aleatorios" element={<Aleatorios />} />
        <Route path="/Capturados" element={<Capturados />} />
        <Route path="/Favoritos" element={<Favoritos favoritos={favoritos} />} />
        <Route path="/" element={<Listas />} />
        <Route path="/Wanted/:id" element={<Wanted favoritos={favoritos} setFavoritos={setFavoritos} />} />
        <Route path="/Usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  )
}

export default App

