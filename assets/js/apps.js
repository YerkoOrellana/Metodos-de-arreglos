let totalTareas = 0;
let tareasRealizadas = 0;
let idCounter = 1;

// Selección de elementos del DOM
const input = document.getElementById('agregartarea');
const btnAgregar = document.getElementById('botonagregar');
const totalElement = document.getElementById('total-tareas');
const realizadasElement = document.getElementById('tareas-realizadas');
const tareasContainer = document.getElementById('tareas-container');

// Array de tareas iniciales
const tareasIniciales = [
    { id: 1, texto: 'Desayunar' },
    { id: 2, texto: 'Almorzar' },
    { id: 3, texto: 'Cenar' }
];

// Función para inicializar las tareas
function inicializarTareas() {
    tareasIniciales.forEach(tarea => {
        // Crear el contenedor de la tarea inicial
        const tareaItem = document.createElement('div');
        tareaItem.classList.add('tarea-item');
        tareaItem.innerHTML = `
            <span>${tarea.id}</span>
            <span class="tarea-texto">${tarea.texto}</span>
            <div class="controls">
                <input type="checkbox" class="form-check-input">
                <button class="btn btn-danger btn-sm">❌</button>
            </div>
        `;

        // Añadir la tarea al contenedor
        tareasContainer.appendChild(tareaItem);

        // Actualizar el ID del próximo elemento
        idCounter = Math.max(idCounter, tarea.id + 1);
    });

    // Actualizar los contadores iniciales
    totalTareas = tareasIniciales.length;
    actualizarContadores();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const tareaTexto = input.value.trim();

    if (tareaTexto !== "") {
        const tareaID = idCounter++; // Usa idCounter antes de incrementar

        // Crear el contenedor de la nueva tarea
        const tareaItem = document.createElement('div');
        tareaItem.classList.add('tarea-item');
        tareaItem.innerHTML = `
            <span>${tareaID}</span>
            <span class="tarea-texto">${tareaTexto}</span>
            <div class="controls">
                <input type="checkbox" class="form-check-input">
                <button class="btn btn-danger btn-sm">❌</button>
            </div>
        `;

        // Añadir la tarea al contenedor
        tareasContainer.appendChild(tareaItem);

        totalTareas++;
        actualizarContadores();

        input.value = ""; // Limpiar el input
    }
}

// Función para actualizar los contadores
function actualizarContadores() {
    totalElement.textContent = totalTareas;
    realizadasElement.textContent = tareasRealizadas;
}

// Delegación de eventos
tareasContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
        eliminarTarea(event);
    } else if (event.target.type === 'checkbox') {
        actualizarRealizadas(event);
    }
});

// Función para actualizar el número de tareas realizadas
function actualizarRealizadas(event) {
    if (event.target.checked) {
        tareasRealizadas++;
    } else {
        tareasRealizadas--;
    }
    actualizarContadores();
}

// Función para eliminar una tarea
function eliminarTarea(event) {
    const tareaElement = event.target.closest('.tarea-item');

    if (tareaElement.querySelector('input[type="checkbox"]').checked) {
        tareasRealizadas--;
    }

    tareasContainer.removeChild(tareaElement);

    totalTareas--;
    actualizarContadores();
}

// Evento de click para agregar tareas
btnAgregar.addEventListener('click', agregarTarea);

// Evento de teclado para agregar tareas con "Enter"
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// Inicializar las tareas al cargar la página
window.addEventListener('DOMContentLoaded', inicializarTareas);
