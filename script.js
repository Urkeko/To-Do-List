const formulariox = document.querySelector("#formulario")

formulariox.addEventListener("submit", validarFormu)

document.addEventListener("DOMContentLoaded", cargarTareas); 

function validarFormu(evento){
    evento.preventDefault();
    const tarea = document.querySelector("#tarea").value;
    
    if (tarea ==="")return;
    

    const lista = document.getElementById("lista");
    
    const nuevaTarea = document.createElement("li");

    const contenedorTarea = document.createElement("div");
    contenedorTarea.classList.add("contenedor-tarea");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-personalizado")

    const tareaTexto = document.createElement("span");
    tareaTexto.classList.add("texto-tarea");
    tareaTexto.textContent = tarea;


    const eliminarBtn = document.createElement("button");
    eliminarBtn.innerHTML = '<span class="material-icons">delete</span>'
    eliminarBtn.classList.add("eliminar-btn")

    contenedorTarea.appendChild(checkbox);
    contenedorTarea.appendChild(tareaTexto);
    contenedorTarea.appendChild(eliminarBtn);

    // Agrega el contenedor de la tarea al elemento li
    nuevaTarea.appendChild(contenedorTarea);



    eliminarBtn.addEventListener("click", ()=>{
        lista.removeChild(nuevaTarea);
        guardarTareas();
    });
    
    

    checkbox.addEventListener("change",()=>{
        if (checkbox.checked){
            nuevaTarea.classList.add("tachado");

        }else {
            nuevaTarea.classList.remove("tachado");
        }
        guardarTareas();
    })


    
    lista.appendChild(nuevaTarea);

    document.querySelector("#tarea").value ="";
    guardarTareas();   
    
}

function guardarTareas(){
    const lista = document.getElementById("lista").children;
    const tareas = [];

    for (let i = 0; i < lista.length; i++){
        const tareaTexto = lista [i].childNodes[1].textContent;
        const completada = lista[i].childNodes[0].checked;

        tareas.push({
            texto:tareaTexto,
            completada: completada
        });
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas(){
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas){
        const tareas = JSON.parse (tareasGuardadas);
        tareas.forEach((tarea)=>{
            const lista = document.getElementById("lista");
            const nuevaTarea = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.completada;

            const eliminarBtn = document.createElement("button");
            eliminarBtn.innerHTML = '<span class="material-icons">delete</span>'
            eliminarBtn.classList.add("eliminar-btn");

            eliminarBtn.addEventListener("click",()=>{
                lista.removeChild(nuevaTarea);
                guardarTareas();
            });

            nuevaTarea.appendChild(checkbox);
            nuevaTarea.appendChild(document.createTextNode(tarea.texto));
            nuevaTarea.appendChild (eliminarBtn);

            checkbox.addEventListener("change", ()=>{
                if (checkbox.checked){
                    nuevaTarea.classList.add("tachada");
                }else {
                    nuevaTarea.classList.remove("tachado");
                }
                guardarTareas();
            });
            if (tarea.completada){
                nuevaTarea.classList.add("tachado");
            }

            lista.appendChild(nuevaTarea);
        });
    }
    
    
}