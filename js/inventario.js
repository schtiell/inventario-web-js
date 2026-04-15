
import {
    guardar,
    leer
} from "./storage.js";


export let inventario = leer( "inventario" ) || [
    {
        id: 1,
        nombre: "Laptop",
        precio: 15000,
        stock: 5,
        categoria: "Tecnologia"
    }
];

/* Arreglo de objetos con los detalles de cada producto

let inventario = [

    {
        id: 1,
        nombre: "Laptop",
        precio: 15000,
        stock: 5, 
        categoria: "Tecnologia"
    }
];
*/


//Obtener inventario
export const obtenerInventario = ( ) => inventario;



// Agregar producto al inventario
export const agregarProducto = producto => {

    inventario = [ ...inventario, producto ];
    guardar( "inventario", inventario );
}




//Eliminar Producto
export const eliminarProducto = id => {

    inventario = inventario.filter( producto => producto.id !== id );

    guardar( "inventario", inventario ); 
}


//Editar producto
export const editarProducto = ( id, datos ) => {

    inventario = inventario.map( producto => 
        producto.id === id  
            ? { ...producto, ...datos }
            : producto
    );

    guardar( "inventario", inventario );

    return inventario;
};


// Funcion para actualizar el stock
export const actualizarStock = ( id, cantidad ) => {

    //console.log( "Actualizar stock: ", id );

    inventario = inventario.map( producto => {

        if( producto.id === id ){

            return {
                ...producto,
                stock: Number( producto.stock ) + cantidad
            };
        }
        return producto;
    });

    guardar( "inventario", inventario );

    return inventario;
}



//Función para realizar filtrado de productos por nombre
export const filtrarProductos = texto => {

    const inventario = obtenerInventario();

    if ( !texto ) return inventario;

    return obtenerInventario().filter( producto =>

        producto.nombre
            .toLowerCase()
            .trim()
            .includes(texto.toLowerCase().trim())
    );
}