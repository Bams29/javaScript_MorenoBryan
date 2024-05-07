const image = document.querySelector('#image');
const firstName = document.querySelector('#firstName');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const dob = document.querySelector('#dob');
const address = document.querySelector('#address');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');

const crearUsuario = async () => {
    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();
    const datos = results[0];

    image.src = datos.picture.large;
    firstName.textContent = datos.name.first;
    nombre.textContent = datos.name.first;
    email.textContent = datos.email;
    dob.textContent = datos.dob.date;
    address.textContent = datos.location.street.name + ', ' + datos.location.city + ', ' + datos.location.country;
    phone.textContent = datos.phone;
    password.textContent = datos.login.password;
}

document.addEventListener('DOMContentLoaded', crearUsuario);

//*soy estupido*//

