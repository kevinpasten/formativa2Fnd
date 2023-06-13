//github
const libros = [];
const prestamos = [];

class Libro{
    constructor(isbn, nombre, stock){
        this.isbn = isbn
        this.nombre = nombre
        this.stock = stock
    }
}

class Prestamo{
    constructor(isbn, nombre, rut, nombrePersona){
        this.isbn = isbn
        this.nombre = nombre
        this.rut = rut
        this.nombrePersona = nombrePersona
    }
}


const agregarLibro = (Libro) => libros.push(Libro)
const agregarPrestamo = (Prestamo) => prestamos.push(Prestamo)

const cargarTablaLibros = () => {
    const tabla = document.querySelector('#tablaLibros');
    tabla.innerHTML = ''
    libros.forEach(l => {
        const tr = document.createElement('tr')
        const fila = `<td>${l.isbn}</td>
                      <td>${l.nombre}</td>
                      <td>${l.stock}</td>`
        tr.innerHTML = fila;
        tabla.appendChild(tr);
    })
}

const cargarTablaPrestamo = () => {
    const tabla = document.querySelector('#tablaPrestamo');
    tabla.innerHTML = ''
    prestamos.forEach(p => {
        const tr = document.createElement('tr')
        const fila = `<td>${p.isbn}</td>
                      <td>${p.nombre}</td>
                      <td>${p.rut}</td>
                      <td>${p.nombrePersona}</td>`
        tr.innerHTML = fila;
        tabla.appendChild(tr);
    })
}

const buscarLibro = (isbn) => {
    const lista = libros.filter(l => {if(isbn === l.isbn) return l});
    return lista[0];
}
    
    /* let objeto = null;
    libros.forEach(l => {
        if(l.isbn === isbn){
            objeto = l;
            return l;
        }
    })
    return objeto; */

const button = document.querySelector('#btnRegistrarLibro');
const btnLimpiar = document.querySelector('#btnCancelarProducto');
const inpIsbn = document.querySelector('#isbnLibro');
const inpNombre = document.querySelector('#nombreLibro');
const inpStock = document.querySelector('#stockLibro');

btnLimpiar.addEventListener('click', () => {
    inpIsbn.value = '';
    inpNombre.value = '';
    inpStock.value = '';
});

button.addEventListener('click', () => {
    const isbn = inpIsbn.value
    const nombre = inpNombre.value
    const stock = inpStock.value

    l = new Libro(isbn, nombre, stock);

    agregarLibro(l);
    cargarTablaLibros();
})

const btnBuscar = document.querySelector('#btnBuscar');
const btnBorrar = document.querySelector('#btnBorrar');
const btnPrestamo = document.querySelector('#btnPrestamo');
const inptBuscar = document.querySelector('#isbnBuscar');
const searchNombre = document.querySelector('#buscarNombre');
const searchStock = document.querySelector('#buscarStock');
const buscarRut = document.querySelector('#rutPrestamo');
const nombrePersona = document.querySelector('#nombrePrestamo');

btnBorrar.addEventListener('click', () => {
    buscarRut.value = '';
    nombrePersona.value = '';
});

btnBuscar.addEventListener('click', () => {
    const codigo = inptBuscar.value;
    const resultado = buscarLibro(codigo);

    searchNombre.value = resultado.nombre
    searchStock.value = resultado.stock

    if(inptBuscar.value == ''){
        searchNombre.value = '';
        searchStock.value = '';
    }
})

btnPrestamo.addEventListener('click', () => {
    const codigo = inptBuscar.value
    const nombre = searchNombre.value
    const rut = buscarRut.value
    const personaNombre = nombrePersona.value

    const p = new Prestamo(codigo, nombre, rut, personaNombre)
    agregarPrestamo(p);
    cargarTablaPrestamo();
})


