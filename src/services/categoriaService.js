import axiosInstance from "@/services/axiosInstance";


export const getCategorias = async (parametros={}) =>{

    const respuesta = await axiosInstance.get('/categorias',{
        params:parametros
    })

    return respuesta.data
}

export const crearCategoria = async categoria =>{
    const respuesta = await axiosInstance.post('/categorias', categoria)
    return respuesta.data
}

export const actualizarCategoria = async (id, categoria)=> {
    const respuesta = await axiosInstance.put('/categorias/'+ id, categoria)

    return respuesta.data
}

export const eliminarCategoria = async id =>{

    const respuesta = await axiosInstance.delete('/categorias/'+id)

    return respuesta.data

}

