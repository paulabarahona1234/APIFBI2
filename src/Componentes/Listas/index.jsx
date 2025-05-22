import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Íconos de corazón para favoritos
import Filtro from '../Filtro';

import './style.css';

function Listas({ favoritos, setFavoritos }) {
    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await fetch("https://api.fbi.gov/wanted/v1/list");
                const json = await res.json();
                
                let lista = json.items;

                if (tipoSeleccionado !== 'All') {
                    lista = lista.filter(item => 
                        item.field_offices && item.field_offices.some(oficina => 
                            oficina.toLowerCase() === tipoSeleccionado.toLowerCase()
                        )
                    );
                }

                setData(lista);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        obtenerDatos();
    }, [tipoSeleccionado]);

    const handleTipoChange = (tipo) => {
        setTipoSeleccionado(tipo);
    };

    const toggleFavorito = (persona) => {
        const esFavorito = favoritos.some(p => p.uid === persona.uid);
        if (esFavorito) {
            setFavoritos(favoritos.filter(p => p.uid !== persona.uid));
        } else {
            setFavoritos([...favoritos, { uid: persona.uid, nombre: persona.title }]);
        }
    };

    let resultados = data;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
        resultados = data.filter(persona =>
            persona.title.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    if (!isNaN(busqueda)) {
        resultados = data.filter(persona =>
            persona.uid.includes(busqueda)
        );
    }

    return (
        <>
            <input
                type="text"
                placeholder="Buscar criminales"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="c-buscador"
            />
            <Filtro onTipoChange={handleTipoChange} />
            <section className='c-lista'>
                {resultados.map((persona) => (
                    <div 
                        className='c-lista-pokemon' 
                        key={persona.uid}
                    >
                        <p>ID: {persona.uid}</p>
                        <img 
                            src={persona.images?.[0]?.thumb || 'https://via.placeholder.com/100'} 
                            alt={`Persona ${persona.title}`} 
                            width='auto' 
                            height='100' 
                            loading='lazy'
                            onClick={() => navigate(`/Wanted/${persona.uid}`)}
                            style={{cursor: 'pointer'}}
                        />
                        <p onClick={() => navigate(`/Wanted/${persona.uid}`)} style={{cursor: 'pointer'}}>{persona.title}</p>
                        <button 
                            onClick={() => toggleFavorito(persona)} 
                            aria-label="Agregar o quitar de favoritos"
                        >
                            {favoritos.some(p => p.uid === persona.uid) ? <FaHeart color="red"/> : <FaRegHeart />}
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Listas;
