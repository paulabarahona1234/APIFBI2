import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = localStorage.getItem('user');
    const savedPass = localStorage.getItem('pass');

    if (user === savedUser && pass === savedPass) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar sesión</h2>
      <input placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
