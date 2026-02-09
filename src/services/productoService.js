import axiosInstance from '@/services/axiosInstance'


export const getProductos = async (parametros={}) =>{

    const respuesta = await axiosInstance.get('/productos',{
        params:parametros
    })
    return respuesta.data

}

export const getProductoId = async (id) =>{

    const respuesta = await axiosInstance.get('/productos/'+id)

    return respuesta.data

}


