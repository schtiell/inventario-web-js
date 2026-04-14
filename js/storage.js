

//Función para guardar los datos en formato JSON
export const guardar = ( clave, datos ) => {

    localStorage.setItem(
        clave,
        JSON.stringify( datos )
    );
};


//Función para leer los datos almacenado localmente
export const leer = clave => {

    const datos = localStorage.getItem( clave );
    
    return datos ? JSON.parse( datos ) : [ ];
};