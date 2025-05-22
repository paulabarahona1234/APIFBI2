import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Registro() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleRegistro = () => {
    localStorage.setItem('user', user);
    localStorage.setItem('pass', pass);
    alert('Usuario registrado');
    navigate('/Login');
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <input placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={handleRegistro}>Registrar</button>
    </div>
  );
}

export default Registro;
