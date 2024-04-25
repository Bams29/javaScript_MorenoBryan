function fetchStarWars() {
    const starId = document.getElementById('starId').value;
    fetch(`https://swapi.py4e.com/api/people/${starId}`)
        .then(response => response.json())
        .then(data => {
            const starWarInfo = document.getElementById('starWarInfo');
            starWarInfo.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">${data.name}</h2>
                        <p class="card-text">Height: ${data.height}</p>
                        <p class="card-text">Hair_color: ${data['hair_color']}</p>
                        <p class="card-text">Skin_color: ${data['skin_color']}</p>
                        <p class="card-text">Eye_color: ${data['eye_color']}</p>
                        <p class="card-text">Birth_year: ${data['birth_year']}</p>
                        <p class="card-text">Gender: ${data.gender}</p>
                        <p class="card-text">Homeworld:</p>
                        <div id="homeworldInfo"></div>
                        <p class="card-text">Films:</p>
                        <div id="filmsInfo"></div> 
                        <p class="card-text">Species:</p>
                        <div id="speciesInfo"></div>
                        <p class="card-text">Vehicles:</p>
                        <div id="vehiclesInfo"></div>
                        <p class="card-text">Starships: ${data.starships}</p>
                        <p class="card-text">Created: ${data.created}</p>
                        <p class="card-text">Edited: ${data.edited}</p>
                        <p class="card-text">Url: ${data['url']}</p>
                    </div>
                </div>`;

            // Realiza una solicitud al planeta (homeworld)
            fetch(data.homeworld)
                .then(response => response.json())
                .then(homeworldData => {
                    const homeworldInfo = document.getElementById('homeworldInfo');
                    // Construye la información del planeta
                    const planetInfo = `
                        <p>Name: ${homeworldData.name}</p>
                        <p>Rotation Period: ${homeworldData.rotation_period}</p>
                        <p>Orbital Period: ${homeworldData.orbital_period}</p>
                        <p>Diameter: ${homeworldData.diameter}</p>
                        <p>Climate: ${homeworldData.climate}</p>
                        <p>Gravity: ${homeworldData.gravity}</p>
                        <p>Terrain: ${homeworldData.terrain}</p>
                        <p>Surface Water: ${homeworldData.surface_water}</p>
                        <p>Population: ${homeworldData.population}</p>
                    `;
                    // Agrega la información del planeta al div homeworldInfo
                    homeworldInfo.innerHTML = planetInfo;
                })
                .catch(error => {
                    console.error('Error al obtener datos de peliculas:', error);
                });
                //especie DATA
                fetch(data.species)
                .then(response => response.json())
                .then(speciesData => {
                    const speciesInfo = document.getElementById('speciesInfo');
                    // Construye la información de la raza
                    const specieInfo = `
                        <p>Name: ${speciesData.name}</p>
                        <p>classification: ${speciesData.classification}</p>
                        <p>Desgnation: ${speciesData.designation}</p>
                        <p>Altura promedio: ${speciesData.average_height}</p>
                        <p>Colores de piel: ${speciesData.skin_colors}</p>
                        <p>Colores de pelo: ${speciesData.hair_colors}</p>
                        <p>Color de ojos: ${speciesData.eye_colors}</p>
                        <p>Promedio de vida: ${speciesData.average_lifespan}</p>
                        <p>Planeta de origen: ${speciesData.homeworld}</p>
                        <p>Lenguaje: ${speciesData.language}</p>
                    `;
                    // Agrega la información del planeta al div speciesinfo
                    speciesInfo.innerHTML = specieInfo;
                })
                .catch(error => {
                    console.error('Error al obtener datos de especies:', error);
                });

                //DATA film
                fetch(data.films[0])
                .then(response => response.json())
                .then(filmData => {
                    const filmsInfo = document.getElementById('filmsInfo');
                    // Construye la información de la raza
                    const filmInfo = `
                        <p>Titulo: ${filmData.title}</p>
                        <p>Episodio: ${filmData.episode_id}</p>
                        <p>Texto de inicio: ${filmData.opening_crawl}</p>
                    
                    `;
                    // Agrega la información del planeta al div speciesinfo
                    filmsInfo.innerHTML = filmInfo;
                })
                .catch(error => {
                    console.error('Error al obtener datos de especies:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener datos del personaje:', error);
        });
}