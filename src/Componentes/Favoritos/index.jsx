import './style.css';

function Favoritos({ favoritos }) {
  return (
    <>
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <ul>
          {favoritos.map((persona) => (
            <li key={persona.uid}>
              {persona.nombre}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Favoritos;
