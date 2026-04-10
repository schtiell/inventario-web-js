
// Importación de módulos
import { obtenerInventario,
    agregarProducto,
    eliminarProducto,
    actualizarStock,
    filtrarProductos 
} from "./inventario.js";


import { letraCapital, 
    validarProducto, 
    productoExiste 
} from "./utils.js";



//Almacenando en variables elementos html del DOM 
const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");
const inputBuscar = document.querySelector("#buscar");



// Renderizado de elementos del DOM
const renderInventario = ( lista = obtenerInventario( ) ) => {

    contenedor.innerHTML = "";

    lista.forEach( producto => { 
        
        const div = document.createElement( "div" );

        div.classList.add( "producto" );

        div.innerHTML = `
            <strong>${ producto.nombre }</strong>
            <p>Precio: $${ producto.precio }</p>
            <p>Stock: ${ producto.stock }</p>
            <p>Categoria: ${ producto.categoria }</p>

            <button class="sumar"> + </button>
            <button class="restar"> - </button>
            <button class="eliminar"> Eliminar </button>
        `;

        contenedor.appendChild( div );

        const btnEliminar = div.querySelector( ".eliminar" );
        const btnSumar = div.querySelector( ".sumar" );
        const btnRestar = div. querySelector( ".restar" );


        //Control de evento click en el boton eliminar
        btnEliminar.addEventListener( "click", ( ) => { 

            //console.log( "Eliminar", producto.id );

            eliminarProducto(producto.id);
            renderInventario( );
        });


        //Control de evento click en el boton sumar
        btnSumar.addEventListener( "click", ( ) => {

            //console.log( "Sumar", producto.id );

            actualizarStock( producto.id, 1 );
            console.log( obtenerInventario() ); 
            renderInventario( );

        });


        //Control de evento click en el boton restart
        btnRestar.addEventListener( "click", ( ) => {

            //console.log( "Restar", producto.id );
            
            actualizarStock( producto.id, -1);
            renderInventario( );
        });
    });
};




//Agregar nuevos productos al inventario
btnAgregar.addEventListener( "click", ( ) => {


    //Obteniendo valores de los campos
    const nombre = letraCapital( document.querySelector( "#nombre" ).value );
    const precio = Number( document.querySelector( "#precio" ).value );
    const stock = Number( document.querySelector( "#stock" ).value );
    const categoria = letraCapital( document.querySelector( "#categoria" ).value );


    //Creación del objeto con los datos ingresados
    const nuevoProducto = {
        id: Date.now(),
        nombre, 
        precio,
        stock,
        categoria
    };


    //Validaciones para nulos, numericos y negativos
    const error = validarProducto( nuevoProducto );

    if ( error ){

        alert( error );
        //Significa que detiene el agregar el producto, el renderizado de la app, corta el flujo del proyecto
        return;
    }


    //Validación del nuevo producto para comprobar existencia en inventario
    const existente = productoExiste( obtenerInventario( ), nombre );


    if ( existente ) {

        actualizarStock( existente.id, stock );

    } else {

        agregarProducto( nuevoProducto );
    }
    

    renderInventario( );

});


//Funcion para controlar el evento de ingresar texto en el input de busqueda
inputBuscar.addEventListener( "input", e => {

    const texto = e.target.value;
        
    //console.log("Buscando", texto);
    
    const filtrados = filtrarProductos( texto );
    
    renderInventario( filtrados );

});

//Invocación a la función de renderizado de la app
renderInventario( );


