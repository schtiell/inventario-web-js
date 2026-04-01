
export let inventario = [

    {
        id: 1,
        nombre: "Laptop",
        precio: 15000,
        stock: 5, 
        categoria: "Tecnologia"
    }
];

//
export const agregarProducto = producto => inventario = [ ...inventario, producto ];


// Funcion para actualizar el stock
export const actualizarStock = ( id, cantidad ) => {

    inventario = inventario.map( producto => { 

        if ( producto === id ){ 

            return {
                ...producto,
                stock: producto.stock + cantidad
            };
        }

        return producto;
    });
}

// Eliminar 