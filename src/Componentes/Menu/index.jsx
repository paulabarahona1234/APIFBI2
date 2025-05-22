import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Menu() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    navigate('/Login');
  };

  return (
    <nav className="c-menu">
      <Link to="/">Lista</Link>
      <Link to="/capturados">Capturados</Link>
      <Link to="/aleatorios">Aleatorio</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/favoritos">Favoritos</Link>
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}

export default Menu;
