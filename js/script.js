//github
/**
 * Funciones para el formulario
 */
const validarIsbn = (isbn) => {
    let respuesta = false;
    biblioteca.forEach( l => {
        if(l.isbn === isbn){
            respuesta = true;
            return respuesta;
        }
    });
    return respuesta;
}

const pintarInputs = (nombre, color, mensaje)=>{
    const elemento = document.querySelector(nombre);
    elemento.classList.add(color);
    elemento.textContent = mensaje;

    setTimeout(()=>{
        elemento.classList.remove(color);
        elemento.textContent = '';
    }, 3000);
}

const validarStock = (isbn) => {
    let respuesta = false;
    biblioteca.forEach(l => {
        if(isbn === l.isbn){
            if(l.stock > 0){
                l.stock--;
                respuesta = true;
                return respuesta;
            }else{
                return respuesta;
            }
        }
    });
    return respuesta;
}

const cargarTablaLibro = () => {
    const tabla = document.querySelector('#tablaLibros');
    tabla.innerHTML = '';
    biblioteca.forEach( l => {
        const tr = document.createElement('tr');
        const fila = `<td>${l.isbn}</td>
                      <td>${l.nombre}</td>
                      <td>${l.stock}</td>`
        tr.innerHTML = fila;
        tabla.appendChild(tr);
    })
}

const cargarTablaPrestamos = () => {
    const tabla = document.querySelector('#tablaPrestamo');
    tabla.innerHTML = '';
    prestamos.forEach( p => {
        const tr = document.createElement('tr');
        const fila = `<td>${p.isbn}</td>
                      <td>${p.nombre}</td>
                      <td>${p.stock}</td>
                      <td>${p.rut}</td>
                      <td>${p.nombrePersona}</td>`
        tr.innerHTML = fila;
        tabla.appendChild(tr);
    });
}
/** 
*   Clases para trabajar objetos del formulario
*/
class Libro{
    constructor(isbn, nombre, stock){
        this.isbn = isbn;
        this.nombre = nombre;
        this.stock = stock;
    }
}

class Prestamo{
    constructor(isbn, nombre, stock, rut, nombrePersona){
        this.isbn = isbn;
        this.nombre = nombre;
        this.stock = stock;
        this.rut = rut;
        this.nombrePersona = nombrePersona;
    }
}
/**
 * Listas para datos
 */
const biblioteca = [];
const prestamos = [];

/**
 * Elementos del formulario crear libro
 */
const crearLibro = document.querySelector('#btnRegistrarLibro');
const inptNombre = document.querySelector('#nombreLibro');
const inptIsbn = document.querySelector('#isbnLibro');
const inptStock = document.querySelector('#stockLibro');

/**
 * Elementos formulario crear Prestamo
 */
const buscarLibro = document.querySelector('#btnBuscar')
const inptbIsbn = document.querySelector('#isbnBuscar')
const inptbNombre = document.querySelector('#buscarNombre')
const inptbStock = document.querySelector('#buscarStock')
const inptRut = document.querySelector('#rutPrestamo')
const inptNombrePersona = document.querySelector('#nombrePrestamo')
const crearPrestamo = document.querySelector('#btnPrestamo')


/**
 * Eventos para crear libros
 */

inptIsbn.addEventListener('blur', () =>{
    const isbn = inptIsbn.value;

    if(validarIsbn(isbn)){
       pintarInputs("#helpisbn", "is-danger", "ISBN ya existe");
        
    }else{
        pintarInputs("#helpisbn", "is-success", "ISBN valido");
    }
})

crearLibro.addEventListener('click', () => {
    const nombre = inptNombre.value;
    const isbn = inptIsbn.value;
    const stock = inptStock.value;

    if(nombre.trim() === ""){
        pintarInputs("#helpisbn", "is-success", "Campos vacios");
    }else{

        const l = new Libro(isbn, nombre, stock);
    
        if(!validarIsbn(isbn)){
            biblioteca.push(l);
            alert("Libro agregado")
            cargarTablaLibro();
        }else{
            alert("ISBN ya existe")
        }
    }
});

/**
 * Eventos para crear prestamo
 */
buscarLibro.addEventListener('click', ()=>{
    const isbn = inptIsbn.value
    biblioteca.forEach(l => {
        if(isbn === l.isbn){
            inptbNombre.value = l.nombre;
            inptbStock.value = l.stock;
            return;
        }
    });
});

crearPrestamo.addEventListener('click', () => {
    const isbn = inptbIsbn.value;
    const nombre = inptbNombre.value;
    const stock = inptbStock.value;
    const rut = inptRut.value;
    const nombrePersona = inptNombrePersona.value;

    //creando objeto prestamo
    const p = new Prestamo(isbn, nombre, stock, rut, nombrePersona);

    if(validarStock(isbn)){
        prestamos.push(p);
        cargarTablaPrestamos();
        cargarTablaLibro();
        alert("Prestamo creado con éxito");  
    }else{
        alert("No se puede realizar prestamo");
    }
});