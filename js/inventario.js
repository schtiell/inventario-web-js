
let inventario = [

    {
        id: 1,
        nombre: "Laptop",
        precio: 15000,
        stock: 5, 
        categoria: "Tecnologia"
    }
];

//Obtener inventario
export const obtenerInventario = ( ) => inventario;


// Agregar producto al inventario
export const agregarProducto = producto => inventario = [ ...inventario, producto ];


//Eliminar Producto
export const eliminarProducto = id => {

    console.log( "Eliminar desde el inventario: ", id );

    inventario = inventario.filter( producto => producto.id !== id );

    return inventario;
}


// Funcion para actualizar el stock
export const actualizarStock = ( id, cantidad ) => {

    console.log( "Actualizar stock: ", id );

    /*console.log( "ANTES: ", inventario );

    inventario.forEach( producto => {

        if ( producto.id === id ) {

            producto.stock += cantidad;
        }
    });
    */

    inventario = inventario.map( producto => {

        if( producto.id === id ){

            return {
                ...producto,
                stock: Number( producto.stock ) + cantidad
            };
        }

        return producto;
    });

    console.log( "DESPUES: ", inventario );
}