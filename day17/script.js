class RandomUserCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <link rel="stylesheet" href="./index.css">
            <div class="card bg-light mb-6" style="max-width: 32em;">
                <div class="contenedor">
                    <img id="image" src="" alt="imagen">
                    <h2>Hi my mane is <span id="firstName"></span></h2>
                    <div class="datos">
                        <p>Name: <span id="nombre"></span></p>
                        <p>Email: <span id="email"></span></p>
                        <p>Birthday: <span id="dob"></span></p>
                        <p>Address: <span id="address"></span></p>
                        <p>Phone Number: <span id="phone"></span></p>
                        <p>Password: <span id="password"></span></p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('random-user-card', RandomUserCard);



const crearUsuario = async () => {
    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();
    const datos = results[0];

    const shadowRoot = document.querySelector('random-user-card').shadowRoot;

    shadowRoot.querySelector('#image').src = datos.picture.large;
    shadowRoot.querySelector('#firstName').textContent = datos.name.first;
    shadowRoot.querySelector('#nombre').textContent = datos.name.first;
    shadowRoot.querySelector('#email').textContent = datos.email;
    shadowRoot.querySelector('#dob').textContent = datos.dob.date;
    shadowRoot.querySelector('#address').textContent = datos.location.street.name + ', ' + datos.location.city + ', ' + datos.location.country;
    shadowRoot.querySelector('#phone').textContent = datos.phone;
    shadowRoot.querySelector('#password').textContent = datos.login.password;
}

document.addEventListener('DOMContentLoaded', crearUsuario);
