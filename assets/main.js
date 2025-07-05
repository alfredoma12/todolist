let tareas = [
  { id: 161, descripcion: "tarea1", completado: false },
  { id: 602, descripcion: "tarea2", completado: false },
  { id: 243, descripcion: "tarea3", completado: false }
];

function agregarTarea() {
  const input = document.getElementById("nuevaTareaInput");
  const descripcion = input.value.trim();
  if (descripcion === "") return;

  const nuevaTarea = {
    id: Date.now(),
    descripcion,
    completado: false
  };

  tareas.push(nuevaTarea);
  input.value = "";
  renderizarTareas();
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderizarTareas();
}

function cambiarEstado(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) tarea.completado = !tarea.completado;
  renderizarTareas();
}

function renderizarTareas() {
  const cuerpo = document.getElementById("listaTareas");
  cuerpo.innerHTML = "";

  tareas.forEach(tarea => {
    const fila = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = tarea.id;
    fila.appendChild(tdId);

    const tdDescripcion = document.createElement("td");
    tdDescripcion.textContent = tarea.descripcion;
    if (tarea.completado) tdDescripcion.classList.add("completada");
    fila.appendChild(tdDescripcion);

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completado;
    checkbox.onclick = () => cambiarEstado(tarea.id);
    tdCheck.appendChild(checkbox);
    fila.appendChild(tdCheck);

    const tdEliminar = document.createElement("td");
    tdEliminar.innerHTML = `<span class="btn" onclick="eliminarTarea(${tarea.id})">❌</span>`;
    fila.appendChild(tdEliminar);

    cuerpo.appendChild(fila);
  });

  document.getElementById("totalTareas").textContent = tareas.length;
  document.getElementById("tareasRealizadas").textContent = tareas.filter(t => t.completado).length;
}

renderizarTareas();
