
// Importación de módulos
import { obtenerInventario,
    agregarProducto,
    eliminarProducto,
    actualizarStock,
    filtrarProductos, 
    editarProducto
} from "./inventario.js";


import { letraCapital, 
    validarProducto, 
    productoExiste,
    formatoMoneda,
    limpiarFormulario 
} from "./utils.js";


// 
let editandoId = null;


//Almacenando en variables elementos html del DOM 
const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");
const inputBuscar = document.querySelector("#buscar");
const selectCategoria = document.querySelector("#filtroCategoria");


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
            <button class="editar"> Editar </button>
            <button class="eliminar"> Eliminar </button>
        `;

        contenedor.appendChild( div );

        const btnEliminar = div.querySelector( ".eliminar" );
        const btnSumar = div.querySelector( ".sumar" );
        const btnRestar = div. querySelector( ".restar" );
        const btnEditar = div.querySelector(".editar");


        //Control de evento click en el boton sumar
        btnSumar.addEventListener( "click", ( ) => {

            actualizarStock( id, 1 );
            renderInventario( );

        });

        //Control de evento click en el boton restar
        btnRestar.addEventListener( "click", ( ) => {
           
            actualizarStock( id, -1);
            renderInventario( );
        });

        //Control de evento click en el boton editar
        btnEditar.addEventListener( "click", () =>{

            document.querySelector( "#nombre" ).value = nombre;
            document.querySelector( "#precio" ).value = precio;
            document.querySelector( "#stock" ).value = stock;
            document.querySelector( "#categoria" ).value = categoria;

            editandoId = id;
        });

        //Control de evento click en el boton eliminar
        btnEliminar.addEventListener( "click", ( ) => { 

            const confirmar = confirm( `Eliminar producto "${ nombre }"?`);

            if ( confirmar ){

                eliminarProducto( id );
                renderInventario( );
            }
        });
    });

    actualizarEstadisticas( );
    renderCategorias();
    limpiarFormulario();
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
        id: editandoId ?? Date.now(),
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


    // Validar si se trata de una edición del producto
    if ( editandoId ){
        
        editarProducto( editandoId, nuevoProducto );
        editandoId = null;

    } else {

        //Validación del nuevo producto para comprobar existencia en inventario
        const existente = productoExiste( obtenerInventario( ), nombre );

        if ( existente ) {;

            actualizarStock( existente.id, stock );

        } else {

            agregarProducto( nuevoProducto );
        }
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

//Funcion para el control del evento change ejecutado por el elemento select html
selectCategoria.addEventListener("change", e => {

    const categoria = e.target.value;

    console.log("Categoria seleccionada:", categoria);

    const filtrados = filtrarPorCategoria( categoria );

    renderInventario( filtrados );
});



//Función para obtener los diferentes productos, y el valor del inventario actual
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


//Función para obtener las diferentes categorias de los productos
const obtenerCategorias = ( ) => {

    const inventario = obtenerInventario();

    const categorias = inventario.map( producto => producto.categoria );

    const categoriasUnicas = [...new Set( categorias ) ];

    return categoriasUnicas;

};


//Construcción dinámica de las opciones del elemento select con las categorias de los productos
const renderCategorias = ( ) => {

    const select = document.querySelector( "#filtroCategoria" );

    const categorias = obtenerCategorias();

    select.innerHTML = `
        <option value="">Todas las categorias</option>
    `;

    categorias.forEach( categoria => {

        const option = document.createElement( "option" );

        option.value = categoria;

        option.textContent = categoria;

        select.appendChild( option );
    });
};


const filtrarPorCategoria = categoria => {

    const inventario = obtenerInventario();

    if  ( !categoria ) 
        return inventario;

    return inventario.filter(
        producto => producto.categoria === categoria
    );
};




//Invocación a la función de renderizado de la app
renderInventario( );


