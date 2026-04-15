

// Formato a letra capital para datos insertados
export const letraCapital = cadena =>
    !cadena
        ? ""
        : cadena.charAt( 0 ).toUpperCase( ) + cadena.slice( 1 );

        

//Validaciones para datos numericos, nulos y negativos
export const validarProducto = producto => {

    //Destructuración del objeto
    const { nombre, precio, stock, categoria } = producto;


    if ( !nombre || !categoria ){
        return "El nombre y la categoria de los productos son obligatorios";
    }

    if ( precio <= 0 || isNaN( precio ) ){
        return "El precio es invalido";
    }

    if ( stock <= 0 || isNaN( stock ) ){
        return "Stock invalido, debe registrar al menos 1 producto";
    }

    return null;
}


//Validación para producto existente en inventario
export const productoExiste = ( inventario, nombre ) =>

    inventario.find( 

        producto => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

//Formato de peso Méxicano
export const formatoMoneda = moneda => {
return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    }).format( moneda );
}

//
export const limpiarFormulario = () => {

    document.querySelector("#nombre").value = "";
    document.querySelector("#precio").value = "";
    document.querySelector("#stock").value = "";
    document.querySelector("#categoria").value = "";
    
}