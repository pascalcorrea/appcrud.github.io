let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarTarea(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click', (evento) => actualizarTarea(evento))

let nombre = document.getElementById('nombre-tarea')
let responsable = document.getElementById('responsable')
let descripcion = document.getElementById('descripcion')

let contenedor = document.getElementById('tareas')

let tareas = []

function agregarTarea(e) {
  e.preventDefault()

  const tarea = {
    nombre: nombre.value, 
    responsable: responsable.value,
    descripcion: descripcion.value
  }

  tareas.push(tarea)
  guardarEnLS()
  mostrarTareas()
  limpiarInput()
}

function limpiarInput() {
  nombre.value = ''
  responsable.value = ''
  descripcion.value = ''
}

function editarTarea(boton, nombreTarea) {
  botonAgregar.style.display = 'none'
  botonActualizar.style.display = 'block'

  let tareaEnEdicion = tareas.find((tarea) => tarea.nombre === nombreTarea)

  nombre.value = tareaEnEdicion.nombre
  responsable.value = tareaEnEdicion.responsable
  descripcion.value = tareaEnEdicion.descripcion
  nombre.setAttribute('disabled', true)
}

function eliminarTarea(boton, nombre) {
  boton.parentElement.parentElement.remove()
  tareas = tareas.filter((tarea) => tarea.nombre !== nombre)
  guardarEnLS()
}

function leerTareas() {
  let tareasEnLS = window.localStorage.getItem('tareas')

  tareas = JSON.parse(tareasEnLS) || []
  mostrarTareas()
}

function mostrarTareas() {
  contenedor.innerHTML = ''
  tareas.forEach((tarea) => {
    contenedor.innerHTML += `
            <article>
                <div class="text-crud">
                    <p>${tarea.nombre}</p>
                    <p>${tarea.responsable}</p>
                    <p>${tarea.descripcion}</p>
                </div>
                <div class="button-container">
                    <button class="button-crud" onclick="editarTarea(this, '${tarea.nombre}' )">Editar</button>
                    <button class="button-crud" onclick="eliminarTarea(this, '${tarea.nombre}' )">Borrar</button>
                </div>
            </article>
      `
  })
}

function guardarEnLS() {
  let arrayConvertidoAString = JSON.stringify(tareas)
  window.localStorage.setItem('tareas', arrayConvertidoAString)
}

function actualizarTarea(evento) {
  evento.preventDefault()
  let nombreTarea = nombre.value
  let nuevoResponsable = responsable.value
  let nuevaDescripcion = descripcion.value

  tareas = tareas.map((tarea) => {
    if (tarea.nombre === nombreTarea) {
      return {
        nombre: nombreTarea,
        responsable: nuevoResponsable,
        descripcion: nuevaDescripcion
      }
    } else {
      return tarea
    }
  })

  limpiarInput()

  botonAgregar.style.display = 'block'
  botonActualizar.style.display = 'none'
  nombre.removeAttribute('disabled')
  guardarEnLS()
  mostrarTareas()
}

leerTareas()