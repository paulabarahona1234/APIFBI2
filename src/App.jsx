import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import Aleatorios from './Componentes/Aleatorios'
import Capturados from './Componentes/Capturados'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Wanted from './Componentes/Wanted'
import Usuarios from './Componentes/Usuarios'
import Menu from './Componentes/Menu'
import Login from './Componentes/Login'
import Registro from './Componentes/Registro'

import './App.css'

// Componente para rutas protegidas
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  return loggedIn ? children : <Navigate to="/Login" />
}

function App() {
  const [favoritos, setFavoritos] = useState([])

  return (
    <Router>
      <Menu />
      <Routes>
        <Route
          path="/Aleatorios"
          element={
            <PrivateRoute>
              <Aleatorios />
            </PrivateRoute>
          }
        />
        <Route
          path="/Capturados"
          element={
            <PrivateRoute>
              <Capturados />
            </PrivateRoute>
          }
        />
        <Route
          path="/Favoritos"
          element={
            <PrivateRoute>
              <Favoritos favoritos={favoritos} />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Listas favoritos={favoritos} setFavoritos={setFavoritos} />
            </PrivateRoute>
          }
        />
        <Route
          path="/Wanted/:id"
          element={
            <PrivateRoute>
              <Wanted favoritos={favoritos} setFavoritos={setFavoritos} />
            </PrivateRoute>
          }
        />
        <Route
          path="/Usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />
        {/* Rutas públicas */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
    </Router>
  )
}

export default App;
