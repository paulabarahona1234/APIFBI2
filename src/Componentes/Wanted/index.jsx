import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

function Wanted({ favoritos, setFavoritos }) {
  const { id } = useParams();
  const [dataFBI, setDataFBI] = useState(null);

  const esFavorito = favoritos.some(p => p.uid === id);

  useEffect(() => {
    fetch(`https://api.fbi.gov/wanted/v1/list`)
      .then(response => response.json())
      .then(responseData => {
        const encontrado = responseData.items.find(item => item.uid === id);
        setDataFBI(encontrado || {});
      })
      .catch(error => console.error("Error:", error));
  }, [id]);

  const toggleFavorito = () => {
    if (!dataFBI) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.uid !== dataFBI.uid));
    } else {
      setFavoritos([...favoritos, { uid: dataFBI.uid, nombre: dataFBI.title }]);
    }
  };

  if (!dataFBI) return <p>Cargando...</p>;

  return (
    <>
      <div>
        <img 
          src={dataFBI.images?.[0]?.original || 'https://via.placeholder.com/200'} 
          alt={dataFBI.title} 
          width="200"
        />

        <p><strong>Nombre:</strong> {dataFBI.title}</p>
        <p><strong>Delitos:</strong> {dataFBI.description}</p>
        <p><strong>Ubicación:</strong> {dataFBI.field_offices?.join(', ')}</p>

        <button onClick={toggleFavorito}>
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>

      <h1>{dataFBI.title}</h1>
    </>
  )
}

export default Wanted;
