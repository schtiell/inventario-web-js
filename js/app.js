
// Importación de módulos
import { obtenerInventario,
    agregarProducto,
    eliminarProducto,
    actualizarStock,
    filtrarProductos 
} from "./inventario.js";


import { letraCapital, 
    validarProducto, 
    productoExiste,
    formatoMoneda 
} from "./utils.js";



//Almacenando en variables elementos html del DOM 
const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");
const inputBuscar = document.querySelector("#buscar");



// Renderizado de elementos del DOM
const renderInventario = ( lista = obtenerInventario( ) ) => {

    contenedor.innerHTML = "";

    lista.forEach( ( { id, nombre, precio, stock, categoria } ) => { 
        
        const div = document.createElement( "div" );

        div.classList.add( "producto" );

        div.innerHTML = `
            <strong>${ nombre }</strong>
            <p>Precio: ${ formatoMoneda( precio ) }</p>
            <p>Stock: ${ stock }</p>
            <p>Categoria: ${ categoria }</p>

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

            eliminarProducto( id );
            renderInventario( );
        });


        //Control de evento click en el boton sumar
        btnSumar.addEventListener( "click", ( ) => {

            actualizarStock( id, 1 );
            renderInventario( );

        });


        //Control de evento click en el boton restart
        btnRestar.addEventListener( "click", ( ) => {
           
            actualizarStock( id, -1);
            renderInventario( );
        });
    });

    actualizarEstadisticas( );
};




//Agregar nuevos productos al inventario
btnAgregar.addEventListener( "click", ( ) => {


    //Obteniendo valores de los campos
    const nombre = letraCapital( document.querySelector("#nombre").value );
    const precio = Number( document.querySelector("#precio").value );
    const stock = Number( document.querySelector("#stock").value );
    const categoria = letraCapital( document.querySelector("#categoria").value );


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



const actualizarEstadisticas = ( ) => {

    const inventario = obtenerInventario();

    const totalProductos = inventario.length;

    const valorInventario = inventario.reduce( ( acc, { precio, stock } ) => 
            acc + ( precio * stock )
        ,0
    )

    const valorFormateado = formatoMoneda( valorInventario );

    document.querySelector( "#totalProductos" )
        .textContent = totalProductos;

    document.querySelector( "#valorInventario" )
        .textContent = `${ valorFormateado }`;
    
};

//Invocación a la función de renderizado de la app
renderInventario( );


