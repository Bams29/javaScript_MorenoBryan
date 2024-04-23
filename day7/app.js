function fetchSuperHero(){
    let xhr = new XMLHttpRequest();
    let heroID = document.getElementById('heroId').value;
    console.log(heroID);
    let apiKey = "487f7b22f68312d2c1bbc93b1aea445b";
    let url = `https://superheroapi.com/api.php/${apiKey}/${heroID}`;
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            displayHero(response);
        }else if(this.readyState ===4){
            console.log('Error', this.statusText);
        }
    };
    xhr.send();
}


function displayHero(data) {
    let heroInfo = document.getElementById('superHeroInfo');
    let infoSelector = document.getElementById('infoSelector');
    let selectedInfo = infoSelector.value;

    if (data.response == "error") {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        let infoToShow = data[selectedInfo];

        if (selectedInfo === "powerstats" || selectedInfo === "appearance" || selectedInfo === "biography" || selectedInfo === "work" || selectedInfo === "connections") {
            heroInfo.innerHTML = `<p>${selectedInfo}:</p><ul>`;
            // Iterar sobre las propiedades del objeto y mostrarlas como lista
            Object.keys(infoToShow).forEach(prop => {
                heroInfo.innerHTML += `<li>${prop}: ${infoToShow[prop]}</li>`;
            });
            heroInfo.innerHTML += `</ul>`;
        } else if (selectedInfo === "image") {
            // Mostrar solo la URL de la imagen
            heroInfo.innerHTML = `<p>${selectedInfo}: <img src="${infoToShow.url}" alt="Imagen del héroe"></p>`;
        } else {
            // Mostrar la información como texto
            heroInfo.innerHTML = `<p>${selectedInfo}: ${infoToShow}</p>`;
        }
    }
}
