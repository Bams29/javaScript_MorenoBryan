function fetchSuperHero(){
    let xhr = new XMLHttpRequest();
    let heroID = document.getElementById('heroId').value;
    console.log(heroID);
    let url = `https://swapi.py4e.com/api/people/${heroID}/`;
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


function displayHero(data){
    let heroInfo = document.getElementById('superHeroInfo')
    if(data.response === "error"){
        heroInfo.innerHTML=`<p>Error:${data.error}</p>`
    }else{
        heroInfo.innerHTML=`
        <p>Name: ${data.name}</p>
        <p>Height: ${data.height}
        <p>Mass: ${data.mass}
        <p>Hair color: ${data.hair_color}
        <p>Skin color: ${data.skin_color}
        <p>Eye color: ${data.eye_color}
        <p>Birth year: ${data.birth_year}
        <p>Gender: ${data.gender}
        <p>Homeworld: ${data.homeworld}
        <p>Films: ${data.films}
        <p>Species: ${data.species}
        <p>Vehicles: ${data.vehicles}
        <p>Starships: ${data.starships}
        <p>Created: ${data.created}
        <p>Edited: ${data.edited}
        <p>url: ${data.url}
        `
    }
    
}