
// Importación de módulos
import { obtenerInventario,
    agregarProducto,
    eliminarProducto,
    actualizarStock 
} from "./inventario.js";

import { letraCapital } from "./utils.js";



const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");



const renderInventario = ( ) => {

    contenedor.innerHTML = "";

    obtenerInventario().forEach( producto => { 
        
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


        btnEliminar.addEventListener( "click", ( ) => { 

            console.log( "Eliminar", producto.id );

            eliminarProducto(producto.id);
            renderInventario( );
        });


        btnSumar.addEventListener( "click", ( ) => {

            console.log( "Sumar", producto.id );

            actualizarStock( producto.id, 1 );
            console.log( obtenerInventario() ); 
            renderInventario( );

        });


        btnRestar.addEventListener( "click", ( ) => {

            console.log( "Restar", producto.id );
            
            actualizarStock( producto.id, -1);
            renderInventario( );
        });
    });
};


btnAgregar.addEventListener( "click", ( ) => {

    const nombre = letraCapital( document.querySelector( "#nombre" ).value );
    const precio = Number( document.querySelector( "#precio" ).value );
    const stock = Number( document.querySelector( "#stock" ).value );
    const categoria = letraCapital( document.querySelector( "#categoria" ).value );

    const nuevoProducto = {
        id: Date.now(),
        nombre, 
        precio,
        stock,
        categoria
    };

    agregarProducto( nuevoProducto );
    
    renderInventario( );
});

renderInventario( );