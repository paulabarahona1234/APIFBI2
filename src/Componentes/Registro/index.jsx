import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardar usuario en localStorage
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Usuario registrado exitosamente");
    navigate("/login");  // Llevar a login luego de registrarse
  };

  return (
    <div className="form-container">
      <h2>Registrar Usuario</h2>
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;

