
    // Cargar los datos del archivo JSON
    fetch('estudiantes.json')
    .then(response => response.json())
    .then(data => {
      // Manipular los datos como desees
      console.log(data); // Muestra los datos cargados del archivo JSON en la consola
    
      // Por ejemplo, agregar un nuevo estudiante
      const nuevoEstudiante = {
        Ti: '12345',
        nombres: 'Juan',
        apellidos: 'Pérez',
        direccion: 'Calle 123',
        acudiente: 'María',
        telefono_celular: '123456789',
        telefono_fijo: '987654321',
        estado: 'Activo',
        riesgo: 'Bajo',
        mo1: 'Nota 1',
        mo2: 'Nota 2',
        mo3: 'Nota 3',
        mo4: 'Nota 4',
        mo5: 'Nota 5',
      };
    
      data.push(nuevoEstudiante); // Agregar el nuevo estudiante al array de estudiantes
    
      // Guardar los datos actualizados en el archivo JSON
      guardarEstudiantes(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos del archivo JSON:', error);
    });
    
    // Función para guardar los datos en el archivo JSON
    function guardarEstudiantes(estudiantes) {
    fetch('./estudiantes.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(estudiantes)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar los datos de los estudiantes.');
      }
      return response.text();
    })
    .then(message => {
      console.log(message); // Muestra un mensaje de éxito en la consola
    })
    .catch(error => {
      console.error('Error al guardar los datos de los estudiantes:', error);
    });
    }
    
    
    
    // Objeto JSON para almacenar estudiantes
    let estudiantes = [];
    
    function iniciarSesion() {
        const tarjetaIdentidad = document.getElementById('tarjeta-identidad').value;
        const rol = document.getElementById('rol').value;
      
        // Validar credenciales (puedes cambiar esta lógica)
        if (tarjetaIdentidad && rol) {
          mostrarMenu(rol);
        } else {
          alert('Por favor, ingrese la tarjeta de identidad y seleccione un rol.');
        }
    }
    
    function mostrarMenu(rol) {
      const menuDiv = document.getElementById('menu');
      const welcomeMessage = document.getElementById('welcome-message');
      const optionsList = document.getElementById('options-list');
    
      welcomeMessage.textContent = `Bienvenido, ${rol}.`;
    
      // Define las opciones de menú dependiendo del rol
      let menuOptions = [];
      if (rol === 'coordinador') {
        menuOptions = [
          'Agregar nuevo estudiante',
          'Editar información de un estudiante',
          'Eliminar estudiante',
          'Modificar información de una clase',
          'Agregar notas y actualizar estado del estudiante',
          'Agregar nueva ruta de estudio',
          'Listar estudiantes inscritos',
          'Listar estudiantes aprobados',
          'Listar estudiantes reprobados',
          'Listar todas las clases', 
          'Agregar estudiantes a un grupo',
          'Matricular estudiante',
          'Asignar trainer',
          'Reportes',
          'Salir del programa'
        ];
      } else if (rol === 'trainer') {
        menuOptions = [
          'Listar todas las clases',
          'Ingresar notas estudiantes inscritos',
          'Reportes',
          'Salir del programa'
        ];
      }
    
      // Crear las opciones de menú como elementos de lista
      optionsList.innerHTML = '';
      menuOptions.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${option}`;
        optionsList.appendChild(li);
      });
    
      // Mostrar el menú
      menuDiv.style.display = 'block';
    
      // Agregar eventos a las opciones de menú
      optionsList.querySelectorAll('li').forEach((li, index) => {
        li.addEventListener('click', () => {
          if (rol === 'coordinador') {
            switch (index) {
              case menuOptions.indexOf('Agregar nuevo estudiante'):
                mostrarFormularioAgregarEstudiante();
                break;
              case menuOptions.indexOf('Editar información de un estudiante'):
                mostrarFormularioEditarEstudiante();
                break;
              case menuOptions.indexOf('Eliminar estudiante'):
                mostrarFormularioEliminarEstudiante();
                break;
                case menuOptions.indexOf('Modificar informacion de una clase'): // Opción "Modificar información de una clase"
                mostrarFormularioModificarClase();
                break;
                alert('Opción no válida.');
                break;
              case menuOptions.indexOf('Agregar notas y actualizar estado del estudiante'):
                mostrarFormularioNotas();
                break;
              case menuOptions.indexOf('Agregar nueva ruta de estudio'):
                mostrarFormularioNuevaRutaEstudio();
              case menuOptions.indexOf('Reportes'):
                mostrarReportes();
                break;
              case menuOptions.indexOf('Salir del programa'):
                ocultarMenuMostrarLoginForm();
                break;
              default:
                ejecutarOpcion(rol, index + 1);
                break;
            }
          } else if (rol === 'trainer' && index === menuOptions.indexOf('Reportes')) {
            mostrarReportesTrainer();
          } else if (rol === 'trainer' && index === menuOptions.indexOf('Salir del programa')) {
            ocultarMenuMostrarLoginForm();
          } else {
            ejecutarOpcion(rol, index + 1);
          }
        });
      });
    }
    
    function ocultarMenuMostrarLoginForm() {
      const menuDiv = document.getElementById('menu');
      const loginFormDiv = document.getElementById('login-form');
    
      menuDiv.style.display = 'none';
      loginFormDiv.style.display = 'block';
    }
    
    function guardarEstudiantes(estudiantes) {
      fetch('./estudiantes.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiantes)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar los datos de los estudiantes.');
        }
        return response.text();
      })
      .then(message => {
        alert(message);
      })
      .catch(error => {
        console.error('Error al guardar los datos de los estudiantes:', error);
        alert('Error al guardar los datos de los estudiantes. Consulta la consola para obtener más detalles.');
      });
    }
    
    function mostrarFormularioAgregarEstudiante() {
      const formulario = `
        <h2>Agregar Nuevo Estudiante</h2>
        <label for="ti">TI:</label>
        <input type="text" id="ti"><br>
        <label for="nombres">Nombres:</label>
        <input type="text" id="nombres"><br>
        <label for="apellidos">Apellidos:</label>
        <input type="text" id="apellidos"><br>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion"><br>
        <label for="acudiente">Acudiente:</label>
        <input type="text" id="acudiente"><br>
        <label for="telefono_celular">Teléfono Celular:</label>
        <input type="text" id="telefono_celular"><br>
        <label for="telefono_fijo">Teléfono Fijo:</label>
        <input type="text" id="telefono_fijo"><br>
        <label for="estado">Estado:</label>
        <input type="text" id="estado"><br>
        <label for="riesgo">Riesgo:</label>
        <input type="text" id="riesgo"><br>
        <label for="mo1">Mo1:</label>
        <input type="text" id="mo1"><br>
        <label for="mo2">Mo2:</label>
        <input type="text" id="mo2"><br>
        <label for="mo3">Mo3:</label>
        <input type="text" id="mo3"><br>
        <label for="mo4">Mo4:</label>
        <input type="text" id="mo4"><br>
        <label for="mo5">Mo5:</label>
        <input type="text" id="mo5"><br>
        <button onclick="agregarEstudiante()">Agregar Estudiante</button>
        <button onclick="regresarAlMenu()">Regresar al Menú</button>
      `;
    
      document.getElementById('options-list').innerHTML = formulario;
    }
    
    function mostrarFormularioEditarEstudiante() {
      const formulario = `
        <h2>Editar Información de Estudiante</h2>
        <label for="editar-ti">TI del Estudiante a Editar:</label>
        <input type="text" id="editar-ti"><br>
        <button onclick="mostrarInformacionEstudiante()">Mostrar Información del Estudiante</button>
        <div id="informacion-estudiante" style="display: none;">
          <h3>Información del Estudiante</h3>
          <label for="edit-nombres">Nombres:</label>
          <input type="text" id="edit-nombres"><br>
          <label for="edit-apellidos">Apellidos:</label>
          <input type="text" id="edit-apellidos"><br>
          <label for="edit-direccion">Dirección:</label>
          <input type="text" id="edit-direccion"><br>
          <label for="edit-acudiente">Acudiente:</label>
          <input type="text" id="edit-acudiente"><br>
          <label for="edit-telefono_celular">Teléfono Celular:</label>
          <input type="text" id="edit-telefono_celular"><br>
          <label for="edit-telefono_fijo">Teléfono Fijo:</label>
          <input type="text" id="edit-telefono_fijo"><br>
          <label for="edit-estado">Estado:</label>
          <input type="text" id="edit-estado"><br>
          <label for="edit-riesgo">Riesgo:</label>
          <input type="text" id="edit-riesgo"><br>
          <label for="edit-mo1">Mo1:</label>
          <input type="text" id="edit-mo1"><br>
          <label for="edit-mo2">Mo2:</label>
          <input type="text" id="edit-mo2"><br>
          <label for="edit-mo3">Mo3:</label>
          <input type="text" id="edit-mo3"><br>
          <label for="edit-mo4">Mo4:</label>
          <input type="text" id="edit-mo4"><br>
          <label for="edit-mo5">Mo5:</label>
          <input type="text" id="edit-mo5"><br>
          <button onclick="guardarInformacionEstudiante()">Guardar Cambios</button>
          <button onclick="limpiarFormulario()">Limpiar</button>
        </div>
        <button onclick="regresarAlMenu()">Regresar al Menú</button>
      `;
    
      document.getElementById('options-list').innerHTML = formulario;
    }
    
    function mostrarInformacionEstudiante() {
      const tiEstudiante = document.getElementById('editar-ti').value;
      const estudiante = estudiantes.find(est => est.Ti === tiEstudiante);
      if (estudiante) {
        document.getElementById('edit-nombres').value = estudiante.nombres;
        document.getElementById('edit-apellidos').value = estudiante.apellidos;
        document.getElementById('edit-direccion').value = estudiante.direccion;
        document.getElementById('edit-acudiente').value = estudiante.acudiente;
        document.getElementById('edit-telefono_celular').value = estudiante.telefono_celular;
        document.getElementById('edit-telefono_fijo').value = estudiante.telefono_fijo;
        document.getElementById('edit-estado').value = estudiante.estado;
        document.getElementById('edit-riesgo').value = estudiante.riesgo;
        document.getElementById('edit-mo1').value = estudiante.mo1;
        document.getElementById('edit-mo2').value = estudiante.mo2;
        document.getElementById('edit-mo3').value = estudiante.mo3;
        document.getElementById('edit-mo4').value = estudiante.mo4;
        document.getElementById('edit-mo5').value = estudiante.mo5;
        document.getElementById('informacion-estudiante').style.display = 'block';
      } else {
        alert('No se encontró ningún estudiante con el TI especificado.');
      }
    }
    
    function guardarInformacionEstudiante() {
      const tiEstudiante = document.getElementById('editar-ti').value;
      const indice = estudiantes.findIndex(est => est.Ti === tiEstudiante);
      if (indice !== -1) {
        estudiantes[indice].nombres = document.getElementById('edit-nombres').value;
        estudiantes[indice].apellidos = document.getElementById('edit-apellidos').value;
        estudiantes[indice].direccion = document.getElementById('edit-direccion').value;
        estudiantes[indice].acudiente = document.getElementById('edit-acudiente').value;
        estudiantes[indice].telefono_celular = document.getElementById('edit-telefono_celular').value;
        estudiantes[indice].telefono_fijo = document.getElementById('edit-telefono_fijo').value;
        estudiantes[indice].estado = document.getElementById('edit-estado').value;
        estudiantes[indice].riesgo = document.getElementById('edit-riesgo').value;
        estudiantes[indice].mo1 = document.getElementById('edit-mo1').value;
        estudiantes[indice].mo2 = document.getElementById('edit-mo2').value;
        estudiantes[indice].mo3 = document.getElementById('edit-mo3').value;
        estudiantes[indice].mo4 = document.getElementById('edit-mo4').value;
        estudiantes[indice].mo5 = document.getElementById('edit-mo5').value;
        guardarEstudiantes(estudiantes);
        alert('Información del estudiante actualizada correctamente.');
        limpiarFormulario();
      } else {
        alert('No se encontró ningún estudiante con el TI especificado.');
      }
    }
    
    function limpiarFormulario() {
      document.getElementById('edit-nombres').value = '';
      document.getElementById('edit-apellidos').value = '';
      document.getElementById('edit-direccion').value = '';
      document.getElementById('edit-acudiente').value = '';
      document.getElementById('edit-telefono_celular').value = '';
      document.getElementById('edit-telefono_fijo').value = '';
      document.getElementById('edit-estado').value = '';
      document.getElementById('edit-riesgo').value = '';
      document.getElementById('edit-mo1').value = '';
      document.getElementById('edit-mo2').value = '';
      document.getElementById('edit-mo3').value = '';
      document.getElementById('edit-mo4').value = '';
      document.getElementById('edit-mo5').value = '';
    }
    
    function mostrarFormularioEliminarEstudiante() {
      const formulario = `
        <h2>Eliminar Estudiante</h2>
        <label for="eliminar-ti">TI del Estudiante a Eliminar:</label>
        <input type="text" id="eliminar-ti"><br>
        <button onclick="eliminarEstudiante()">Eliminar Estudiante</button>
        <button onclick="regresarAlMenu()">Regresar al Menú</button>
      `;
    
      document.getElementById('options-list').innerHTML = formulario;
    }
    
    function agregarEstudiante() {
      const nuevoEstudiante = {
        Ti: document.getElementById('ti').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        direccion: document.getElementById('direccion').value,
        acudiente: document.getElementById('acudiente').value,
        telefono_celular: document.getElementById('telefono_celular').value,
        telefono_fijo: document.getElementById('telefono_fijo').value,
        estado: document.getElementById('estado').value,
        riesgo: document.getElementById('riesgo').value,
        mo1: document.getElementById('mo1').value,
        mo2: document.getElementById('mo2').value,
        mo3: document.getElementById('mo3').value,
        mo4: document.getElementById('mo4').value,
        mo5: document.getElementById('mo5').value,
      };
    
      estudiantes.push(nuevoEstudiante);
      guardarEstudiantes(estudiantes); // Guardar estudiantes en el archivo JSON
      alert('Estudiante agregado correctamente.');
    }
    
    function eliminarEstudiante() {
      const tiEliminar = document.getElementById('eliminar-ti').value;
    
      const indice = estudiantes.findIndex(estudiante => estudiante.Ti === tiEliminar);
    
      if (indice !== -1) {
        estudiantes.splice(indice, 1);
        guardarEstudiantes(estudiantes);
        alert('Estudiante eliminado correctamente.');
      } else {
        alert('No se encontró ningún estudiante con el TI especificado.');
      }
    }
    
    function regresarAlMenu() {
      const menuDiv = document.getElementById('menu');
      const optionsList = document.getElementById('options-list');
    
      mostrarMenu('coordinador');
    }
    
    function ejecutarOpcion(rol, opcionSeleccionada) {
        if (rol === 'coordinador') {
          switch (opcionSeleccionada) {
            case 4: // Opción "Modificar información de una clase"
              mostrarFormularioModificarClase();
              break;
            default:
              alert('Opción no válida.');
              break;
          }
        }
      }
      
      function mostrarFormularioModificarClase() {
        const formulario = `
          <h2>Modificar Información de una Clase</h2>
          <label for="numero-clase">Número de Clase:</label>
          <input type="number" id="numero-clase" min="1" max="10"><br>
          <button onclick="modificarInformacionClase()">Seleccionar Clase</button>
          <button onclick="regresarAlMenu()">Cancelar</button>
        `;
      
        document.getElementById('options-list').innerHTML = formulario;
      }
      
      function modificarInformacionClase() {
        const numeroClase = document.getElementById('numero-clase').value;
      
        // Aquí puedes agregar la lógica para modificar la información de la clase con el número seleccionado
        alert(`Seleccionaste la clase número ${numeroClase}. Función de modificar información de clase aún no implementada.`);
      }
      
      function mostrarFormularioNotas() {
        const formulario = `
          <h2>Agregar Notas y Actualizar Estado del Estudiante</h2>
          <label for="nombre-estudiante">Nombre del Estudiante:</label>
          <input type="text" id="nombre-estudiante"><br>
          <button onclick="mostrarNotasEstudiante()">Buscar Estudiante</button>
          <button onclick="regresarAlMenu()">Cancelar</button>
        `;
      
        document.getElementById('options-list').innerHTML = formulario;
      }
      
      function mostrarNotasEstudiante() {
        const nombreEstudiante = document.getElementById('nombre-estudiante').value;
      
        // Cargar los datos del archivo JSON de notas
        fetch('notas.json')
          .then(response => response.json())
          .then(notas => {
            const estudianteNotas = notas.find(estudiante => estudiante.nombre === nombreEstudiante);
      
            if (estudianteNotas) {
              const formularioNotas = `
                <h3>Notas de ${nombreEstudiante}</h3>
                <p>Nota 1: ${estudianteNotas.nota1}</p>
                <p>Nota 2: ${estudianteNotas.nota2}</p>
                <p>Nota 3: ${estudianteNotas.nota3}</p>
                <p>Nota 4: ${estudianteNotas.nota4}</p>
                <p>Nota 5: ${estudianteNotas.nota5}</p>
                <label for="nueva-nota">Nueva Nota:</label>
                <input type="text" id="nueva-nota"><br>
                <button onclick="actualizarNotasEstudiante('${nombreEstudiante}')">Actualizar Notas</button>
              `;
      
              document.getElementById('options-list').innerHTML = formularioNotas;
            } else {
              alert('No se encontraron notas para el estudiante especificado.');
            }
          })
          .catch(error => {
            console.error('Error al cargar los datos del archivo JSON de notas:', error);
            alert('Error al cargar los datos del archivo JSON de notas. Consulta la consola para obtener más detalles.');
          });
      }
      
      function actualizarNotasEstudiante(nombreEstudiante) {
        const nuevaNota = document.getElementById('nueva-nota').value;
      
        // Aquí puedes agregar la lógica para actualizar las notas del estudiante en el archivo JSON
      
        alert(`Notas actualizadas para ${nombreEstudiante}.`);
        regresarAlMenu();
      }
      
      
      
    function mostrarFormularioNuevaRutaEstudio() {
        const formulario = `
          <h2>Agregar Nueva Ruta de Estudio</h2>
          <label for="nombre-ruta">Nombre de la Ruta:</label>
          <input type="text" id="nombre-ruta"><br>
          <button onclick="agregarNuevaRutaEstudio()">Agregar Ruta de Estudio</button>
          <button onclick="regresarAlMenu()">Regresar al Menú</button>
        `;
      
        document.getElementById('options-list').innerHTML = formulario;
      }
      
      function agregarNuevaRutaEstudio() {
        const nombreRuta = document.getElementById('nombre-ruta').value;
        if (nombreRuta) {
          // Aquí puedes agregar lógica para guardar la nueva ruta de estudio
          alert(`Se agregó la nueva ruta de estudio: ${nombreRuta}`);
        } else {
          alert('Por favor, ingrese el nombre de la ruta de estudio.');
        }
      }