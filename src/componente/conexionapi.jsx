import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './style.css'
function ConexionApi() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Realiza una petición HTTP GET inicial para obtener todos los personajes
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        console.log(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Función para hacer una petición HTTP GET a la API para obtener un personaje en específico
  const fetchSelectedCharacter = characterId => {
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(response => {
        setSelectedCharacter(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };



  // Función para filtrar los personajes según el valor del campo de búsqueda
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>

      <input
        style={{ width: "18rem", margin: "2% 0% 2% 37%" }}
        type="text"
        className='form-control'
        placeholder="Buscar personaje"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Input para buscar personajes */}

      {/* Sección para mostrar información del personaje seleccionado */}
      {selectedCharacter && (
        <div className='card' style={{ width: "18rem", marginLeft:"37%"}}>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <div className='card-body'>
            <h2 className='card-title'>{selectedCharacter.name}</h2>
            <p className='card-text'>{selectedCharacter.species}</p>
            <p className='card-text'>{selectedCharacter.origin.name}</p>
            {/*Sección para el boton de refrescar la pagina para que muestre 
          todo los personjaes de vuelta*/}
            <Button variant="outline-primary" onClick={() => window.location.reload()}>
              Listado Personajes
            </Button>{' '}
          </div>
        </div>
      )}
      <div className='cajasupergrande'>
        {/* Lista de personajes que coinciden con la búsqueda */}
        {!selectedCharacter && filteredCharacters.map(character => (

          <div className='card cajagrande' style={{ width: "18rem", marginBottom: "3%" }} key={character.id}>
            <img className='card-img-top' src={character.image} alt="" />
            <div className='card-body'>
              <h2 className='card-title'>{character.name}</h2>

              <button className='btn btn-primary' onClick={() => fetchSelectedCharacter(character.id)}>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConexionApi;