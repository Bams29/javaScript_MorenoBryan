const fs = require('fs/promises');

function cargarDatos() {
    try {
        const data = fs.readFileSync("estudiantes.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        } else {
            throw error;
        }
    }
}

function cargarDatos2() {
    try {
        const data = fs.readFileSync("clases.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        } else {
            throw error;
        }
    }
}

function cargarGrupos() {
    try {
        const data = fs.readFileSync("grupos.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return {};
        } else {
            throw error;
        }
    }
}

function guardarDatos(datos) {
    fs.writeFileSync("estudiantes.json", JSON.stringify(datos, null, 2), "utf-8");
}

const fs = require('fs');

function guardarDatos2(datos) {
    fs.writeFileSync("clases.json", JSON.stringify(datos, null, 2), "utf-8");
}

function guardarGrupos(grupos) {
    fs.writeFileSync("grupos.json", JSON.stringify(grupos, null, 2), "utf-8");
}

function agregarEstudiante() {
    const nuevoEstudiante = {
        "Ti": prompt("Ingrese el número de Identificación del estudiante: "),
        "nombres": prompt("Ingrese el nombre del estudiante: "),
        "apellidos": prompt("Ingrese los apellidos del estudiante: "),
        "direccion": prompt("Ingrese la dirección del estudiante: "),
        "acudiente": prompt("Ingrese el nombre del acudiente: "),
        "telefono_celular": prompt("Ingrese el teléfono celular del estudiante: "),
        "telefono_fijo": prompt("Ingrese el teléfono fijo del estudiante: "),
        "estado": prompt("Ingrese el estado del estudiante: "),
        "riesgo": prompt("Ingrese el riesgo del estudiante: "),
        "mo1": "",
        "mo2": "",
        "mo3": "",
        "mo4": "",
        "mo5": ""
    };
    const estudiantes = cargarDatos();
    estudiantes.push(nuevoEstudiante);
    guardarDatos(estudiantes);
    console.log(`Nuevo estudiante agregado con TI ${nuevoEstudiante['Ti']}.`);
}
function editarEstudiante(TiEstudiante, nuevaInformacion) {
    let estudiantes = cargarDatos();
    for (let estudiante of estudiantes) {
        if (estudiante["Ti"] === TiEstudiante) {
            Object.assign(estudiante, nuevaInformacion);
            guardarDatos(estudiantes);
            console.log(`Información del estudiante con TI ${TiEstudiante} actualizada correctamente.`);
            return;
        }
    }
    console.log(`Estudiante con TI ${TiEstudiante} no encontrado.`);
}

function eliminarEstudiante(TiEstudiante) {
    let estudiantes = cargarDatos();
    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i]["Ti"] === TiEstudiante) {
            estudiantes.splice(i, 1);
            guardarDatos(estudiantes);
            console.log(`Estudiante con TI ${TiEstudiante} eliminado correctamente.`);
            return;
        }
    }
    console.log(`Estudiante con TI ${TiEstudiante} no encontrado.`);
}

function editarClase(nClase, nuevaInformacion) {
    let clases = cargarDatos2();
    for (let clase of clases["clases"]) {
        if (clase["nb"] === nClase) {
            Object.assign(clase, nuevaInformacion);
            guardarDatos2(clases);
            console.log(`Información de la clase ${nClase} actualizada correctamente.`);
            return;
        }
    }
    console.log(`Clase ${nClase} no encontrada.`);
}
function agregarRuta() {
    const nuevaRuta = prompt("Ingrese la nueva ruta de estudio: ");
    let clases = cargarDatos2();
    let rutas = clases["rutas"] || [];
    rutas.push(nuevaRuta);
    clases["rutas"] = rutas;
    guardarDatos2(clases);
    console.log("Nueva ruta agregada exitosamente.");
}

function modificarClase() {
    let clases = cargarDatos2();
    console.log("Seleccione la clase que desea modificar:");
    for (let clase of clases["clases"]) {
        console.log(`Clase ${clase['nb']}: Duración - ${clase['duracion']}`);
    }
    const claseSeleccionada = parseInt(prompt("Ingrese el número de la clase que desea modificar: "));

    const nuevoProfesor = prompt("Ingrese el nombre del nuevo profesor: ");
    const nuevoAula = prompt("Ingrese el nombre de la nueva aula: ");
    const nuevaRuta = prompt("Ingrese la nueva ruta de estudio: ");

    for (let clase of clases["clases"]) {
        if (clase["nb"] === claseSeleccionada) {
            clase["profesor"] = nuevoProfesor;
            clase["aula"] = nuevoAula;
            clase["ruta"] = nuevaRuta;
            break;
        }
    }

    guardarDatos2(clases);
    console.log(`Clase ${claseSeleccionada} modificada exitosamente.`);
}
function listarClases() {
    let clases = cargarDatos2();
    let profesores = clases["profesores"];

    console.log("Listado de clases:");
    for (let clase of clases["clases"]) {
        console.log(`Clase ${clase['nb']}:`);
        console.log(`  Duración: ${clase['duracion']}`);
        if (clase['profesor'] !== 'sin especificar') {
            let profesor = profesores.find(p => p['nombre'] === clase['profesor']);
            profesor = profesor ? profesor['nombre'] : 'Desconocido';
            console.log(`  Profesor: ${profesor}`);
        } else {
            console.log("  Profesor: sin especificar");
        }
        console.log(`  Aula/s: ${clase['aula/s']}`);
        console.log();
    }
}

function listarEstudiantesInscritos() {
    let estudiantes = cargarDatos();
    let inscritos = estudiantes.filter(estudiante => estudiante["estado"].toLowerCase() === "inscrito");

    if (inscritos.length === 0) {
        console.log("No hay estudiantes inscritos.");
        return;
    }

    console.log("Listado de estudiantes inscritos:");
    for (let estudiante of inscritos) {
        console.log(`TI: ${estudiante['Ti']}, Nombre: ${estudiante['nombres']}`);
    }
}
function listarEstudiantesAprobados() {
    let estudiantes = cargarDatos();
    let aprobados = estudiantes.filter(estudiante => estudiante["estado"].toLowerCase() === "aprobado");

    if (aprobados.length === 0) {
        console.log("No hay estudiantes aprobados.");
        return;
    }

    console.log("Listado de estudiantes aprobados:");
    for (let estudiante of aprobados) {
        console.log(`TI: ${estudiante['Ti']}, Nombre: ${estudiante['nombres']}`);
    }
}

function listarEstudiantesReprobados() {
    let estudiantes = cargarDatos();
    let reprobados = estudiantes.filter(estudiante => estudiante["estado"].toLowerCase() === "no aprobado");

    if (reprobados.length === 0) {
        console.log("No hay estudiantes reprobados.");
        return;
    }

    console.log("Listado de estudiantes reprobados:");
    for (let estudiante of reprobados) {
        console.log(`TI: ${estudiante['Ti']}, Nombre: ${estudiante['nombres']}`);
    }
}
function agregarNotasPromedio(TiEstudiante) {
    let estudiantes = cargarDatos();

    for (let estudiante of estudiantes) {
        if (estudiante["Ti"] === TiEstudiante) {
            let notaTeoria = parseFloat(prompt("Ingrese la nota teórica: "));
            let notaPractica = parseFloat(prompt("Ingrese la nota práctica: "));

            let promedio = (notaTeoria + notaPractica) / 2;
            console.log(`El promedio es: ${promedio}`);

            if (promedio >= 60) {
                estudiante["estado"] = "Aprobado";
            } else {
                estudiante["estado"] = "No aprobado";
            }

            guardarDatos(estudiantes);
            console.log(`Estado actualizado a: ${estudiante['estado']}`);
            return;
        }
    }
    console.log(`Estudiante con TI ${TiEstudiante} no encontrado.`);
}

function agregarEstudianteAGrupo() {
    let grupos = cargarGrupos();

    console.log("Grupos disponibles:");
    for (let grupo in grupos) {
        console.log(`${grupo}: Clase ${grupos[grupo]['clase']}`);
    }

    let grupoElegido = prompt("Seleccione el grupo al que desea agregar estudiantes: ");

    if (!grupos.hasOwnProperty(grupoElegido)) {
        console.log("Grupo no válido.");
        return;
    }

    let cantidadEstudiantes = parseInt(prompt("Ingrese la cantidad de estudiantes que desea agregar: "));

    for (let i = 0; i < cantidadEstudiantes; i++) {
        let nuevoEstudiante = {
            "Ti": prompt("Ingrese el número de identificación del estudiante: "),
            "nombres": prompt("Ingrese el nombre del estudiante: "),
            "apellidos": prompt("Ingrese los apellidos del estudiante: "),
            "direccion": prompt("Ingrese la dirección del estudiante: "),
            "acudiente": prompt("Ingrese el nombre del acudiente: "),
            "telefono_celular": prompt("Ingrese el teléfono celular del estudiante: "),
            "telefono_fijo": prompt("Ingrese el teléfono fijo del estudiante: "),
            "estado": prompt("Ingrese el estado del estudiante: "),
            "riesgo": prompt("Ingrese el riesgo del estudiante: ")
        };
        grupos[grupoElegido]["Campers"].push(nuevoEstudiante);
    }

    guardarGrupos(grupos);
    console.log(`Estudiantes agregados al grupo ${grupoElegido} correctamente.`);
}
function matricularEstudiantes() {
    let estudiantes = cargarDatos();

    let aprobados = estudiantes.filter(estudiante => estudiante["estado"].toLowerCase() === "aprobado");

    if (aprobados.length === 0) {
        console.log("No hay estudiantes aprobados para matricular.");
        return;
    }

    console.log("Estudiantes Aprobados:");
    for (let i = 0; i < aprobados.length; i++) {
        console.log(`${i + 1}. TI: ${aprobados[i]['Ti']}, Nombre: ${aprobados[i]['nombres']}`);
    }

    while (true) {
        let opcion = prompt("Ingrese el número del estudiante que desea matricular.");

        try {
            opcion = parseInt(opcion);
            if (!isNaN(opcion) && opcion >= 1 && opcion <= aprobados.length) {
                let estudianteElegido = aprobados[opcion - 1];
                let grupos = cargarGrupos();

                console.log("Grupos disponibles:");
                for (let grupo in grupos) {
                    console.log(`${grupo}: Clase ${grupos[grupo]['clase'][0]}`);
                }

                let grupoElegido = prompt("Seleccione el grupo al que desea matricular al estudiante: ");

                if (!grupos.hasOwnProperty(grupoElegido)) {
                    console.log("Grupo no válido.");
                    return;
                }

                grupos[grupoElegido]["Campers"].push(estudianteElegido);
                console.log(`Estudiante ${estudianteElegido['nombres']} matriculado en el grupo ${grupoElegido} correctamente.`);

                guardarGrupos(grupos);
                return;
            } else {
                console.log("Opción fuera de rango o inválida.");
            }
        } catch (error) {
            console.log("Por favor, ingrese un número válido.");
        }
    }
}

function matricularEstudiantes() {
    let estudiantes = cargarDatos();

    let aprobados = estudiantes.filter(estudiante => estudiante["estado"].toLowerCase() === "aprobado");

    if (aprobados.length === 0) {
        console.log("No hay estudiantes aprobados para matricular.");
        return;
    }

    console.log("Estudiantes Aprobados:");
    for (let i = 0; i < aprobados.length; i++) {
        console.log(`${i + 1}. TI: ${aprobados[i]['Ti']}, Nombre: ${aprobados[i]['nombres']}`);
    }

    while (true) {
        let opcion = prompt("Ingrese el número del estudiante que desea matricular.");

        try {
            opcion = parseInt(opcion);
            if (!isNaN(opcion) && opcion >= 1 && opcion <= aprobados.length) {
                let estudianteElegido = aprobados[opcion - 1];
                let grupos = cargarGrupos();

                console.log("Grupos disponibles:");
                for (let grupo in grupos) {
                    console.log(`${grupo}: Clase ${grupos[grupo]['clase'][0]}`);
                }

                let grupoElegido = prompt("Seleccione el grupo al que desea matricular al estudiante: ");

                if (!grupos.hasOwnProperty(grupoElegido)) {
                    console.log("Grupo no válido.");
                    return;
                }
                grupos[grupoElegido]["Campers"].push(estudianteElegido);
                console.log(`Estudiante ${estudianteElegido['nombres']} matriculado en el grupo ${grupoElegido} correctamente.`);

                guardarGrupos(grupos);
                return;
            } else {
                console.log("Opción fuera de rango o inválida.");
            }
        } catch (error) {
            console.log("Por favor, ingrese un número válido.");
        }
    }
}

function asignarProfesorAClase() {
    let clases = cargarDatos2();

    console.log("Clases disponibles:");
    for (let i = 0; i < clases["clases"].length; i++) {
        console.log(`Clase ${clases["clases"][i]['nb']}: Duración - ${clases["clases"][i]['duracion']}`);
    }

    while (true) {
        let opcionClase = prompt("Ingrese el número de la clase a la que desea asignar un profesor: ");

        try {
            opcionClase = parseInt(opcionClase);
            if (!isNaN(opcionClase) && opcionClase >= 1 && opcionClase <= clases["clases"].length) {
                let claseElegida = clases["clases"][opcionClase - 1];
                break;
            } else {
                console.log("Opción fuera de rango.");
            }
        } catch (error) {
            console.log("Por favor, ingrese un número válido.");
        }
    }

    console.log("\nProfesores disponibles:");
    for (let i = 0; i < clases["profesores"].length; i++) {
        console.log(`${i + 1}. ${clases["profesores"][i]['nombre']} - Rutas: ${clases["profesores"][i]['rutas'].join(', ')}`);
    }

    while (true) {
        let opcionProfesor = prompt("Ingrese el número del profesor que desea asignar a la clase: ");

        try {
            opcionProfesor = parseInt(opcionProfesor);
            if (!isNaN(opcionProfesor) && opcionProfesor >= 1 && opcionProfesor <= clases["profesores"].length) {
                let profesorElegido = clases["profesores"][opcionProfesor - 1];
                break;
            } else {
                console.log("Opción fuera de rango.");
            }
        } catch (error) {
            console.log("Por favor, ingrese un número válido.");
        }
    }

    console.log("\nRutas disponibles:");
    for (let i = 0; i < clases["rutas"].length; i++) {
        console.log(`${i + 1}. ${clases["rutas"][i]}`);
    }

    while (true) {
        let opcionRuta = prompt("Ingrese el número de la ruta que desea asignar al profesor para esta clase: ");

        try {
            opcionRuta = parseInt(opcionRuta);
            if (!isNaN(opcionRuta) && opcionRuta >= 1 && opcionRuta <= clases["rutas"].length) {
                let rutaElegida = clases["rutas"][opcionRuta - 1];
                break;
            } else {
                console.log("Opción fuera de rango.");
            }
        } catch (error) {
            console.log("Por favor, ingrese un número válido.");
        }
    }

    guardarDatos2(clases);
    console.log(`Profesor ${profesorElegido['nombre']} asignado a la clase ${claseElegida['nb']} en el aula ${claseElegida['aula/s']} con la ruta ${rutaElegida} correctamente.`);
}
function listarProfesores() {
    let clases = cargarDatos2();
    console.log("\nProfesores disponibles:");
    for (let i = 0; i < clases["profesores"].length; i++) {
        console.log(`${i + 1}. ${clases["profesores"][i]['nombre']} - Rutas: ${clases["profesores"][i]['rutas'].join(', ')}`);
    }
}

function listarEstudiantesBajoRendimiento() {
    try {
        let datosNotas = require("./notas.json");
        console.log("\nEstudiantes con bajo rendimiento:");
        for (let estudiante of datosNotas) {
            for (let modulo of estudiante["modulos"] || []) {
                for (let nota of modulo["notas"] || []) {
                    if (nota["rendimiento"] === "bajo") {
                        console.log(`Estudiante: ${estudiante['nombre']}, Módulo: ${modulo['nombre_modulo']}, Rendimiento: Bajo`);
                    }
                }
            }
        }
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.log("Archivo 'notas.json' no encontrado.");
        } else {
            console.log(`Error al cargar y procesar datos: ${error}`);
        }
    }
}

function listarEstudiantesMismaRuta() {
    try {
        let datosClases = require("./clases.json");
        let datosNotas = require("./notas.json");

        console.log("Clases disponibles:");
        for (let i = 0; i < datosClases["clases"].length; i++) {
            console.log(`${datosClases["clases"][i]['nb']}. Profesor: ${datosClases["clases"][i]['profesor']} - Duración: ${datosClases["clases"][i]['duracion']} - Ruta: ${datosClases["clases"][i]['ruta'].join(', ')}`);
        }

        while (true) {
            let opcionClase = prompt("Ingrese el número de la clase que desea consultar: ");

            try {
                opcionClase = parseInt(opcionClase);
                if (!isNaN(opcionClase) && opcionClase >= 1 && opcionClase <= datosClases["clases"].length) {
                    let claseElegida = datosClases["clases"][opcionClase - 1];
                    break;
                } else {
                    console.log("Opción fuera de rango.");
                }
            } catch (error) {
                console.log("Por favor, ingrese un número válido.");
            }
        }

        let profesorClase = datosClases["profesores"].find(profesor => profesor["nombre"] === claseElegida["profesor"]);

        if (profesorClase) {
            let rutaProfesor = profesorClase["ruta_asignada"].toLowerCase();

            console.log(`\nEstudiantes con la misma ruta que el profesor ${profesorClase['nombre']} (Clase ${opcionClase}):`);
            for (let estudiante of datosNotas) {
                for (let modulo of estudiante["modulos"] || []) {
                    for (let nota of modulo["notas"] || []) {
                        let rutaEstudio = nota["ruta_estudio"] || "";
                        let nombreModulo = nota["nombre_modulo"] || "";
                        if (claseElegida["ruta"].includes(nombreModulo) && rutaEstudio.toLowerCase() === rutaProfesor) {
                            console.log(`Estudiante: ${estudiante['nombre']}, Ruta de Estudio: ${rutaEstudio}, Módulo: ${nombreModulo}`);
                        }
                    }
                }
            }
        } else {
            console.log("Error: No se encontró el profesor asignado a la clase.");
        }
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.log("Archivos 'clases.json' o 'notas.json' no encontrados.");
        } else {
            console.log(`Error al cargar y procesar datos: ${error}`);
        }
    }
}
function menuPrincipal() {
    console.log("\n--- Menú Principal ---");
    console.log("1. Iniciar Sesión como Coordinador");
    console.log("2. Iniciar Sesión como Trainer");
    console.log("3. Iniciar Sesión como Camper");
    console.log("4. Reportes");
    console.log("5. Salir del programa");
}
function menuCoordinador() {
    console.log("\n--- Menú Coordinador ---");
    console.log("1. Agregar nuevo estudiante");
    console.log("2. Editar información de un estudiante");
    console.log("3. Eliminar estudiante");
    console.log("4. Modificar información de una clase");
    console.log("5. Agregar notas y actualizar estado del estudiante");
    console.log("6. Agregar nueva ruta de estudio");
    console.log("7. Listar estudiantes inscritos");
    console.log("8. Listar estudiantes aprobados");
    console.log("9. Listar estudiantes reprobados");
    console.log("10. Listar todas las clases");
    console.log("11. Agregar estudiantes a un grupo");
    console.log("12. Matricular estudiante");
    console.log("13. Asignar trainer");
    console.log("14. Salir del programa");
}
function menuTrainer() {
    console.log("\n--- Menú Trainer ---");
    console.log("1. Listar todas las clases");
    console.log("2. Ingresar notas estudiantes inscritos");
    console.log("3. Salir del programa");
}

function menuCamper() {
    console.log("\n--- Acceso denegado ---");
    console.log("Los campers no tienen acceso a este sistema.");
}

function reportes() {
    console.log("\n--- Reportes ---");
    console.log("1. Listado de estudiantes inscritos.");
    console.log("2. Campers aprobaron examen inicial.");
    console.log("3. Trainers trabajando actualmente.");
    console.log("4. Campers con bajo rendimiento.");
    console.log("5. Campers y Trainers que se encuentran en la misma ruta.");
    console.log("6. Mostrar Campers que aprobaron y reprobaron.");
    console.log("7. Salir del programa.");
}

function iniciarSesionCoordinador() {
    while (true) {
        menuCoordinador();
        let opcion = prompt("\nSeleccione una opción (1-14): ");

        if (opcion === "1") {
            agregarEstudiante();
        } else if (opcion === "2") {
            let TiEstudiante = prompt("Ingrese el TI del estudiante que desea editar: ");
            let nuevaInformacion = {
                nombres: prompt("Ingrese el nuevo nombre del estudiante: "),
                apellidos: prompt("Ingrese los nuevos apellidos del estudiante: "),
                direccion: prompt("Ingrese la nueva dirección del estudiante: "),
                acudiente: prompt("Ingrese el nuevo nombre del acudiente: "),
                telefono_celular: prompt("Ingrese el nuevo teléfono celular del estudiante: "),
                telefono_fijo: prompt("Ingrese el nuevo teléfono fijo del estudiante: "),
                estado: prompt("Ingrese el nuevo estado del estudiante: "),
                riesgo: prompt("Ingrese el nuevo riesgo del estudiante: ")
            };
            editarEstudiante(TiEstudiante, nuevaInformacion);
        } else if (opcion === "3") {
            let TiEstudiante = prompt("Ingrese el TI del estudiante que desea eliminar: ");
            eliminarEstudiante(TiEstudiante);
        } else if (opcion === "4") {
            modificarClase();
        } else if (opcion === "5") {
            listarEstudiantesInscritos();
            let TiEstudiante = prompt("Ingrese el TI del estudiante al que desea agregar notas: ");
            agregarNotasPromedio(TiEstudiante);
        } else if (opcion === "6") {
            agregarRuta();
        } else if (opcion === "7") {
            listarEstudiantesInscritos();
        } else if (opcion === "8") {
            listarEstudiantesAprobados();
        } else if (opcion === "9") {
            listarEstudiantesReprobados();
        } else if (opcion === "10") {
            listarClases();
        } else if (opcion === "11") {
            agregarEstudianteAGrupo();
        } else if (opcion === "12") {
            matricularEstudiantes();
        } else if (opcion === "13") {
            asignarProfesorAClase();
        } else if (opcion === "14") {
            console.log("Saliendo del programa.");
            break;
        } else {
            console.log("Opción no válida. Por favor, ingrese una opción válida (1-14).");
        }
    }
}
function iniciarSesionTrainer() {
    while (true) {
        menuTrainer();
        let opcion = prompt("\nSeleccione una opción (1-3): ");

        if (opcion === "1") {
            listarClases();
        } else if (opcion === "2") {
            listarEstudiantesInscritos();
            let TiEstudiante = prompt("Ingrese el TI del estudiante al que desea agregar notas: ");
            agregarNotasPromedio(TiEstudiante);
        } else if (opcion === "3") {
            console.log("Saliendo del programa.");
            break;
        } else {
            console.log("Opción no válida. Por favor, ingrese una opción válida (1-3).");
        }
    }
}
