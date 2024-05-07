function fetchStarWars() {
    const starId = document.getElementById('starId').value;
    fetch(`https://swapi.py4e.com/api/people/${starId}`)
        .then(response => response.json())
        .then(data => {
            const starWarInfo = document.getElementById('starWarInfo');
            starWarInfo.innerHTML = `
            <table class="table table-striped">
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>${data.height}</td>
                    </tr>
                    <tr>
                        <td>Mass</td>
                        <td>${data.mass}</td>
                    </tr>
                    <tr>
                        <td>Hair color</td>
                        <td>${data.hair_color}</td>
                    </tr>
                    <tr>
                        <td>Skin color</td>
                        <td>${data.skin_color}</td>
                    </tr>
                    <tr>
                        <td>Eye color</td>
                        <td>${data.eye_color}</td>
                    </tr>
                    <tr>
                        <td>Birth year</td>
                        <td>${data.birth_year}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>${data.gender}</td>
                    </tr>
                    <tr>
                        <td>Homeworld</td>
                        <td id="homeworldInfo"></td>
                    </tr>
                    <tr>
                        <td>Films</td>
                        <td id="filmsInfo"></td>
                    </tr>
                    <tr>
                        <td>Specie</td>
                        <td id="speciesInfo"></td>
                    </tr>
                    <tr>
                        <td>Vehicles</td>
                        <td id="vehiclesInfo"></td>
                    </tr>
                    <tr>
                        <td>StarShip</td>
                        <td id="starshipsInfo"></td>
                    </tr>
                    <tr>
                        <td>Created</td>
                        <td>${data.created}</td>
                    </tr>
                    <tr>
                        <td>Edited</td>
                        <td>${data.edited}</td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td>${data.url}</td>
                    </tr>
                </tbody>
            </table>`;

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
                    <p>created: ${homeworldData.created}</p>
                    <p>Edited: ${homeworldData.edited}</p>
                    <p>url: ${homeworldData.url}</p>

                `;
                // Agrega la información del planeta al div homeworldInfo
                homeworldInfo.innerHTML = planetInfo;
        
                // Obten los nombres de los residentes
                const residentPromises = homeworldData.residents.map(residentURL =>
                    fetch(residentURL).then(response => response.json())
                );
        
                // Espera a que todas las solicitudes de residentes se completen
                Promise.all(residentPromises)
                    .then(residentDataArray => {
                        // Crea una lista de nombres de residentes
                        const residentNames = residentDataArray.map(resident => `<li>${resident.name}</li>`);
        
                        // Agrega los nombres de los residentes al elemento homeworldInfo
                        homeworldInfo.innerHTML += `<p>Residents:</p><ul>${residentNames.join('')}</ul>`;
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de los residentes:', error);
                    });

                    const filmsPromises = homeworldData.films.map(filmsURL =>
                        fetch(filmsURL).then(response => response.json())
                    );
            
                    // Espera a que todas las solicitudes de residentes se completen
                    Promise.all(filmsPromises)
    .then(filmsDataArray => {
        // Crea una lista de títulos de películas
        const filmsTitles = filmsDataArray.map(film => `<li>${film.title}</li>`);

        // Agrega los títulos de películas al elemento homeworldInfo
        homeworldInfo.innerHTML += `<p>Films:</p><ul>${filmsTitles.join('')}</ul>`;
    })
    .catch(error => {
        console.error('Error al obtener datos de las películas:', error);
    });

            })
            .catch(error => {
                console.error('Error al obtener datos del planeta:', error);
            });
        

                //especie DATA
                fetch(data.species)
    .then(response => response.json())
    .then(speciesData => {
        const speciesInfo = document.getElementById('speciesInfo');
        // Construye la información de la especie
        const specieInfo = `
            <p>Name: ${speciesData.name}</p>
            <p>Classification: ${speciesData.classification}</p>
            <p>Designation: ${speciesData.designation}</p>
            <p>Average Height: ${speciesData.average_height}</p>
            <p>Skin Colors: ${speciesData.skin_colors}</p>
            <p>Hair Colors: ${speciesData.hair_colors}</p>
            <p>Eye Colors: ${speciesData.eye_colors}</p>
            <p>Average Lifespan: ${speciesData.average_lifespan}</p>
            <p>Language: ${speciesData.language}</p>
        `;
        // Agrega la información de la especie al div speciesInfo
        speciesInfo.innerHTML = specieInfo;

        // Obtén las promesas de las películas
        const filmsPromises = speciesData.films.map(filmURL =>
            fetch(filmURL).then(response => response.json())
        );

        // Espera a que todas las solicitudes de películas se completen
        Promise.all(filmsPromises)
            .then(filmsDataArray => {
                // Crea una lista de títulos de películas
                const filmsTitles = filmsDataArray.map(film => `<li>${film.title}</li>`);

                // Agrega los títulos de películas al elemento speciesInfo
                speciesInfo.innerHTML += `<p>Films:</p><ul>${filmsTitles.join('')}</ul>`;
            })
            .catch(error => {
                console.error('Error al obtener datos de las películas:', error);
            });

            const peoplePromises = speciesData.people.map(peopleURL =>
                fetch(peopleURL).then(response => response.json())
            );
    
            // Espera a que todas las solicitudes de personas se completen
            Promise.all(peoplePromises)
                .then(peopleDataArray => {
                    // Crea una lista de nombres de personas
                    const peopleNames = peopleDataArray.map(people => `<li>${people.name}</li>`);
    
                    // Agrega los nombres de las personas al elemento homeworldInfo
                    speciesInfo.innerHTML += `<p>People:</p><ul>${peopleNames.join('')}</ul>`;
                })
                .catch(error => {
                    console.error('Error al obtener datos de las personas:', error);
                });
    })
    .catch(error => {
        console.error('Error al obtener datos de la especie:', error);
    });


                //DATA film
                fetch(data.films[0])
    .then(response => response.json())
    .then(filmData => {
        const filmsInfo = document.getElementById('filmsInfo');
        // Construye la información de la película
        const filmInfo = `
            <p>Titulo: ${filmData.title}</p>
            <p>Episodio: ${filmData.episode_id}</p>
            <p>Texto de inicio: ${filmData.opening_crawl}</p>
            
        `;
        // Agrega la información de la película al div filmsInfo
        filmsInfo.innerHTML = filmInfo;

        // Obtén las promesas de los personajes asociados a la película
        const charactersPromises = filmData.characters.map(characterURL =>
            fetch(characterURL).then(response => response.json())
        );

        // Espera a que todas las solicitudes de personajes se completen
        Promise.all(charactersPromises)
            .then(charactersDataArray => {
                // Crea una lista de nombres de personajes
                const charactersNames = charactersDataArray.map(character => `<li>${character.name}</li>`);

                // Agrega los nombres de personajes al elemento filmsInfo
                filmsInfo.innerHTML += `<p>Characters:</p><ul>${charactersNames.join('')}</ul>`;
            })
            .catch(error => {
                console.error('Error al obtener datos de los personajes:', error);
            });
    })
    .catch(error => {
        console.error('Error al obtener datos de la película:', error);
    });

                //VEHICLE DATA
                fetch(data.vehicles[0])
    .then(response => response.json())
    .then(vehiclesData => {
        const vehiclesInfo = document.getElementById('vehiclesInfo');
        // Construye la información del vehículo
        const vehicleInfo = `
            <p>Name: ${vehiclesData.name}</p>
            <p>Model: ${vehiclesData.model}</p>
            <p>Manufacturer: ${vehiclesData.manufacturer}</p>
            <p>Cost in credits: ${vehiclesData.cost_in_credits}</p>
            <p>Length: ${vehiclesData.length}</p>
            <p>Max Atmosphering Speed: ${vehiclesData.max_atmosphering_speed}</p>
            <p>created: ${vehiclesData.created}</p>
            <p>Edited: ${vehiclesData.edited}</p>
            <p>url: ${vehiclesData .url}</p>
        `;
        // Agrega la información del vehículo al div vehiclesInfo
        vehiclesInfo.innerHTML = vehicleInfo;

        // Obtén las promesas de los pilotos asociados al vehículo
        const pilotsPromises = vehiclesData.pilots.map(pilotURL =>
            fetch(pilotURL).then(response => response.json())
        );

        // Espera a que todas las solicitudes de pilotos se completen
        Promise.all(pilotsPromises)
            .then(pilotsDataArray => {
                // Crea una lista de nombres de pilotos
                const pilotsNames = pilotsDataArray.map(pilot => `<li>${pilot.name}</li>`);

                // Agrega los nombres de los pilotos al elemento vehiclesInfo
                vehiclesInfo.innerHTML += `<p>Pilots:</p><ul>${pilotsNames.join('')}</ul>`;
            })
            .catch(error => {
                console.error('Error al obtener datos de los pilotos:', error);
            });

        // Obtén las promesas de las películas asociadas al vehículo
        const filmsPromises = vehiclesData.films.map(filmURL =>
            fetch(filmURL).then(response => response.json())
        );

        // Espera a que todas las solicitudes de películas se completen
        Promise.all(filmsPromises)
            .then(filmsDataArray => {
                // Crea una lista de títulos de películas
                const filmsTitles = filmsDataArray.map(film => `<li>${film.title}</li>`);

                // Agrega los títulos de películas al elemento vehiclesInfo
                vehiclesInfo.innerHTML += `<p>Films:</p><ul>${filmsTitles.join('')}</ul>`;
            })
            .catch(error => {
                console.error('Error al obtener datos de las películas:', error);
            });
    })
    .catch(error => {
        console.error('Error al obtener datos del vehículo:', error);
    });



                //STARSHIP
                fetch(data.starships[0])
    .then(response => response.json())
    .then(starshipsData => {
        const starshipsInfo = document.getElementById('starshipsInfo');
        // Construye la información de la nave espacial
        const starshipInfo = `
            <p>Name: ${starshipsData.name}</p>
            <p>Model: ${starshipsData.model}</p>
            <p>Manufacturer: ${starshipsData.manufacturer}</p>
            <p>Cost in credits: ${starshipsData.cost_in_credits}</p>
            <p>Length: ${starshipsData.length}</p>
            <p>Max Atmosphering Speed: ${starshipsData.max_atmosphering_speed}</p>
            <p>Crew: ${starshipsData.crew}</p>
            <p>Passengers: ${starshipsData.passengers}</p>
            <p>Cargo Capacity: ${starshipsData.cargo_capacity}</p>
            <p>Consumables: ${starshipsData.consumables}</p>
            <p>Hyperdrive Rating: ${starshipsData.hyperdrive_rating}</p>
            <p>MGLT: ${starshipsData.MGLT}</p>
            <p>Starship Class: ${starshipsData.starship_class}</p>
            <p>created: ${starshipsData.created}</p>
            <p>Edited: ${starshipsData.edited}</p>
            <p>url: ${starshipsData.url}</p>
        `;
        // Agrega la información de la nave espacial al div starshipsInfo
        starshipsInfo.innerHTML = starshipInfo;

        // Obtén las promesas de los pilotos asociados a la nave espacial
        const pilotsPromises = starshipsData.pilots.map(pilotURL =>
            fetch(pilotURL).then(response => response.json())
        );

        // Espera a que todas las solicitudes de pilotos se completen
        Promise.all(pilotsPromises)
            .then(pilotsDataArray => {
                // Crea una lista de nombres de pilotos
                const pilotsNames = pilotsDataArray.map(pilot => `<li>${pilot.name}</li>`);

                // Agrega los nombres de los pilotos al elemento starshipsInfo
                starshipsInfo.innerHTML += `<p>Pilots:</p><ul>${pilotsNames.join('')}</ul>`;
            })
            .catch(error => {
                console.error('Error al obtener datos de los pilotos:', error);
            });

            const filmsPromises = starshipsData.films.map(filmURL =>
                fetch(filmURL).then(response => response.json())
            );
    
            // Espera a que todas las solicitudes de películas se completen
            Promise.all(filmsPromises)
                .then(filmsDataArray => {
                    // Crea una lista de títulos de películas
                    const filmsTitles = filmsDataArray.map(film => `<li>${film.title}</li>`);
    
                    // Agrega los títulos de películas al elemento starshipsInfo
                    starshipsInfo.innerHTML += `<p>Films:</p><ul>${filmsTitles.join('')}</ul>`;
                })
                .catch(error => {
                    console.error('Error al obtener datos de las películas:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener datos de la nave espacial:', error);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos de la nave espacial:', error);
    });

    
}