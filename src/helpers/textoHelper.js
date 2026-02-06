

export const truncarTexto = (texto, limite = 50) => {

    if (texto.length <= limite)
        return texto + '...';

    return texto.substring(0, limite) + '...';
}


export const convertiraArreglo = (texto) => {

    if (!texto)
        return [];

    return JSON.parse(texto);

}

export const primeraImagen = texto => {

    const arreglo = convertiraArreglo(texto);

    return arreglo[0] || '';

}


