

// Formato a letra capital

export const letraCapital = cadena =>
    !cadena
        ? ""
        : cadena.charAt( 0 ).toUpperCase( ) + cadena.slice( 1 );