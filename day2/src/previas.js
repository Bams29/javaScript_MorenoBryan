// Función para cargar datos de estudiantes desde un archivo JSON en el servidor
async function cargarEstudiantes() {
    try {
        const response = await fetch('/Users/user/Documents/javaScript_MorenoBryan/day2/json');
        return await response.json();
    } catch (error) {
        console.error('Error al cargar datos de estudiantes:', error);
        return [];
    }
}

// Función para buscar un estudiante en la lista de estudiantes
function buscarEstudiante(estudiantes, nombre) {
    return estudiantes.find(estudiante => estudiante.nombres === nombre);
}

// Función para guardar las notas en un archivo JSON en el servidor
async function guardarNotas(notas) {
    try {
        let datos;
        const response = await fetch('notas.json');
        if (response.ok) {
            datos = await response.json();
        } else {
            datos = [];
        }

        // Código para agregar notas al objeto 'datos'

        const responseGuardar = await fetch('notas.json', {
            method: 'PUT', // O 'POST' si prefieres crear un nuevo archivo cada vez
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (responseGuardar.ok) {
            console.log('Notas guardadas exitosamente.');
        } else {
            console.error('Error al guardar notas:', responseGuardar.statusText);
        }
    } catch (error) {
        console.error('Error al guardar notas:', error);
    }
}

// Función para ingresar las notas y calcular promedio de un módulo
function ingresarNotasModulo(nombreModulo) {
    console.log(`Ingrese las notas para el módulo ${nombreModulo}:`);
    const nota1 = parseFloat(prompt("Ingrese la primera nota: "));
    const nota2 = parseFloat(prompt("Ingrese la segunda nota: "));
    const nota3 = parseFloat(prompt("Ingrese la tercera nota: "));

    const promedio = (nota1 + nota2 + nota3) / 3;

    const resultado = promedio >= 60 ? "aprobado" : "reprobado";
    const rendimiento = promedio > 60 ? "alto" : "bajo";

    const rutaEstudio = prompt("Ingrese la ruta de estudio: ");

    return { nota1, nota2, nota3, promedio, resultado, rendimiento, rutaEstudio };
}

// Función principal
async function main() {
    const estudiantes = await cargarEstudiantes();

    const nombreEstudiante = prompt("Ingrese el nombre del estudiante a buscar: ");
    const estudiante = buscarEstudiante(estudiantes, nombreEstudiante);

    if (estudiante) {
        const modulos = ["Modulo 1", "Modulo 2", "Modulo 3", "Modulo 4", "Modulo 5"];

        console.log("Módulos disponibles:");
        modulos.forEach((modulo, index) => console.log(`${index + 1}. ${modulo}`));

        const opcionModulo = parseInt(prompt("Seleccione el módulo (1-5): "));
        if (isNaN(opcionModulo) || opcionModulo < 1 || opcionModulo > 5) {
            console.log("Opción inválida. Saliendo del programa.");
            return;
        }

        const nombreModuloElegido = modulos[opcionModulo - 1];
        const notasModulo = ingresarNotasModulo(nombreModuloElegido);
        notasModulo.nombre_estudiante = nombreEstudiante;
        notasModulo.nombre_modulo = nombreModuloElegido;

        await guardarNotas(notasModulo);

        console.log("Notas del módulo guardadas exitosamente.");
    } else {
        console.log("Estudiante no encontrado.");
    }
}

main();
