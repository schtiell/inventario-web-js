

import { inventario, agregarProducto } from "./inventario.js";

const contenedor = document.querySelector("#inventario");
const btnAgregar = document.querySelector("#agregar");

const renderInventario = ( ) => {

    contenedor.innerHTML = " ";

    inventario.forEach( producto => { 
        
        const div = document.createElement( "div" );

        div.classList.add( "producto" );

        div.innerHTML = `
            <strong>${ producto.nombre }</strong>
            <p>Precio: $${ producto.precio }</p>
            <p>Stock: ${ producto.stock }</p>
            <p>Categoria: ${ producto.categoria }</p>
        `;

        contenedor.appendChild( div );
    });
};

btnAgregar.addEventListener( "click", ( ) => {

    const nombre = document.querySelector( "#nombre" ).value;
    const precio = document.querySelector( "#precio" ).value;
    const stock = document.querySelector( "#stock" ).value;
    const categoria = document.querySelector( "#categoria" ).value;

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