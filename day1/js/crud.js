let ListaEmpleados = [];

const objEmpleado = {
    id: "",
    nombre: "",
    puesto: ""
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreInput.value.trim() === "" || puestoInput.value.trim() === ""){
        alert("Todos los campos son obligatorios.");
        return;
    }

    if(editando){
        editarEmpleado();
        editando = false
    } else{
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

    }

    agregarEmpleado();
}


function agregarEmpleado() {
    ListaEmpleados.push({...objEmpleado})
}

