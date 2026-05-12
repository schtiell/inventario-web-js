
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


//Variable para controlar si se agrega producto nuevo o se actualiza
let editandoId = null;

//variable y constante para la paginación de productos
let paginaActual = 1;
const productosPorPagina = 5;


//Almacenando en variables elementos html del DOM 
const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");
const inputBuscar = document.querySelector("#buscar");
const selectCategoria = document.querySelector("#filtroCategoria");
const selectOrdenar = document.querySelector("#ordenar");


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
            filtrarInventario();

        });

        //Control de evento click en el boton restar
        btnRestar.addEventListener( "click", ( ) => {
           
            actualizarStock( id, -1);
            filtrarInventario();
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
                filtrarInventario();
            }
        });
    });

    actualizarEstadisticas();
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

        if ( existente ) {

            actualizarStock( existente.id, stock );

        } else {

            agregarProducto( nuevoProducto );
        }
    } 
    
    filtrarInventario();

});


//Funcion para controlar el evento de ingresar texto en el input de busqueda
inputBuscar.addEventListener( "input", ( ) => {

    paginaActual = 1;
    filtrarInventario();

});

//Funcion para el control del evento change ejecutado por el elemento select html
selectCategoria.addEventListener("change", ( ) => {

    paginaActual = 1;
    filtrarInventario();

});

//Funcion para el control del evento change ejecutado por el elemento select html
selectOrdenar.addEventListener( "change", () => {

    paginaActual = 1;
    filtrarInventario();
});


//Render de paginación
const renderPaginacion = total => {


    console.log("Total productos:", total);

    const totalPaginas =  Math.ceil( total / productosPorPagina );

    const contenedor = document.querySelector( "#paginacion" );

    contenedor.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {

        const btn = document.createElement( "button" );

        btn.textContent = i;
        
        if ( i === paginaActual ){

            btn.classList.add( "activa" );
        }

        btn.addEventListener( "click", () => {

            console.log("Cambiando la página:", i);

            paginaActual = i;

            filtrarInventario();
        })

        contenedor.appendChild( btn );
    }
};


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

//Funcion para realizar filtrado por producto y categoria
const filtrarInventario = ( ) => {

    const texto = inputBuscar.value.toLowerCase();
    const categoria = selectCategoria.value;

    const inventario = obtenerInventario();

    const filtrados = inventario.filter( producto => {

        const coincideTexto = producto.nombre
            .toLowerCase()
            .includes( texto );

        const coincideCategoria = 
            categoria === "" || 
            producto.categoria === categoria;

        return coincideTexto && coincideCategoria;

    });

    const ordenados = ordernarInventario( filtrados );

    const totalPaginas = Math.ceil( ordenados.length / productosPorPagina );

    if ( paginaActual > totalPaginas ) { 
        
        paginaActual = totalPaginas || 1;
    }

    renderPaginacion( ordenados.length );

    const paginados = paginar( ordenados );

    renderInventario( paginados );
};


const ordernarInventario = ( lista ) => {

    const orden = selectOrdenar.value;

    if ( !orden )
        return lista;

    return [...lista ].sort( ( a, b ) => {

        switch ( orden ) {

            case "nombre-asc":
                return a.nombre.localeCompare( b.nombre );

            case "nombre-desc":
                return b.nombre.localeCompare( a.nombre );
            
            case "precio-asc":
                return a.precio - b.precio;

            case "precio-desc":
                return b.precio - a.precio;

            default:
            return 0;
        }
    });
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


const paginar = lista => {

    const inicio = ( paginaActual -1 ) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    return lista.slice( inicio, fin );
};

//Invocación a la función de renderizado de la app
filtrarInventario();
renderCategorias();

