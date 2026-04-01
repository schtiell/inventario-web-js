
export let inventario = [

    {
        id: 1,
        nombre: "Laptop",
        precio: 15000,
        stock: 5, 
        categoria: "Tecnologia"
    }
];

export const agregarProducto = producto => inventario = [ ...inventario, producto ];