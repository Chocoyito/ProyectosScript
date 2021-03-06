"use strict";
// Variables
const carrito = document.querySelector(`#carrito`);
const contenedorCarrito = document.querySelector(`#lista-carrito tbody`);
const limpiarCarrito = document.querySelector(`#vaciar-carrito`);
const listaCursos = document.querySelector(`#lista-cursos`);
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "agregar al carrito".
    listaCursos.addEventListener(`click`, agregarCurso);
    // Elimina cursos del carrito.
    carrito.addEventListener(`click`, eliminarCurso);
    // Vaciar todo el carro
    limpiarCarrito.addEventListener(`click`, () => // Para funciones cortas como estas, mejor crearlas anonimas.
     {
        articulosCarrito = []; // Reiniciamos el arreglo.
        limpiarHTML(); // Eliminamos todo el HTML.
    });
}
// Funciones.
function agregarCurso(event) {
    event.preventDefault();
    if (event.target.classList.contains(`agregar-carrito`)) {
        const cursoSeleccionado = event.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
// Elimina un curso del carrito.
function eliminarCurso(event) {
    // console.log(e.target.classList);
    if (event.target.classList.contains(`borrar-curso`)) {
        const cursoId = event.target.getAttribute(`data-id`);
        // Elimina del arreglo articulosCarrito por el data-id.
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML.
    }
}
// Lee el contenido del HTML al que le dimos clic y extrae la informacion del curso.
function leerDatosCurso(cursoSeleccionado) {
    // console.log(cursoSeleccionado);
    // Creando un objeto con el contenido del curso actual.
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector(`img`).src,
        titulo: cursoSeleccionado.querySelector(`h4`).textContent,
        precio: cursoSeleccionado.querySelector(`.precio span`).textContent,
        id: cursoSeleccionado.querySelector(`a`).getAttribute(`data-id`),
        cantidad: 1,
    };
    // Revisa si un elemento ya existe en el carrito.
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad.
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            }
            else {
                return curso; // Retorna los objetos que no son duplicados.
            }
        });
        articulosCarrito = [...cursos];
    }
    else {
        // Agregear elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // console.log(articulosCarrito);
    carritoHTML();
}
// Muestra el carrito de compras en el HTML.
function carritoHTML() {
    // Limpiar el HTML.
    limpiarHTML();
    // Recorre el carrito y general el HTML.
    articulosCarrito.forEach(carritoCursos => {
        // Destructure.
        const { imagen, titulo, precio, cantidad, id } = carritoCursos;
        const row = document.createElement(`tr`);
        row.innerHTML =
            `
            <td>
                <img src="${imagen}" width="110px">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        // Agregar el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    });
}
// Eliminar los cursos del tbody.
function limpiarHTML() {
    // Forma lenta.
    // contenedorCarrito.innerHTML = null;
    // Forma rapida y eficiente.
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
