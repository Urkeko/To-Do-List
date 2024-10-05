document.addEventListener("DOMContentLoaded", cargarTareas); 

const formulario = document.querySelector("#formulario");
formulario.addEventListener("submit", validarFormu);

function validarFormu(evento) {
    evento.preventDefault(); 

    const tareaInput = document.querySelector("#tarea");
    const tarea = tareaInput.value.trim(); 

    if (tarea === "") return; 

    agregarTareaDOM(tarea, false);

    guardarTareas();

    tareaInput.value = "";
}

function agregarTareaDOM(tareaTexto, completada) {
    const lista = document.getElementById("lista");
    const nuevaTarea = document.createElement("li");

    const contenedorTarea = document.createElement("div");
    contenedorTarea.classList.add("contenedor-tarea");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completada;
    checkbox.classList.add("checkbox-personalizado");

    const tareaSpan = document.createElement("span");
    tareaSpan.classList.add("texto-tarea");
    tareaSpan.textContent = tareaTexto;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.innerHTML = '<span class="material-icons">delete</span>';
    eliminarBtn.classList.add("eliminar-btn");

    eliminarBtn.addEventListener("click", () => {
        lista.removeChild(nuevaTarea);
        guardarTareas();
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            nuevaTarea.classList.add("tachado");
        } else {
            nuevaTarea.classList.remove("tachado");
        }
        guardarTareas();
    });

    if (completada) {
        nuevaTarea.classList.add("tachado");
    }

    contenedorTarea.appendChild(checkbox);
    contenedorTarea.appendChild(tareaSpan);
    contenedorTarea.appendChild(eliminarBtn);

    nuevaTarea.appendChild(contenedorTarea);

    lista.appendChild(nuevaTarea);
}

function guardarTareas() {
    const lista = document.getElementById("lista").children;
    const tareas = [];

    for (let i = 0; i < lista.length; i++) {
        const tareaTexto = lista[i].querySelector(".texto-tarea").textContent;
        const completada = lista[i].querySelector(".checkbox-personalizado").checked;

        tareas.push({
            texto: tareaTexto,
            completada: completada
        });
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas");

    if (tareasGuardadas) {
        const tareas = JSON.parse(tareasGuardadas);

        tareas.forEach((tarea) => {
            agregarTareaDOM(tarea.texto, tarea.completada);
        });
    }
}
