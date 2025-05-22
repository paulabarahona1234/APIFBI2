import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular usuario registrado guardado en localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/");  // Redirige a lista u otra ruta protegida
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
