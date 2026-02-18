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

export const crearProducto = async (producto) =>{

    const respuesta = await axiosInstance.post('/productos', producto)

    return respuesta.data
}

export const actualizarProducto = async (id, producto)=>{

    const respuesta = await axiosInstance.put('/productos/'+id , producto)

    return respuesta.data
}


export const eliminarProducto = async id => {

    const respuesta = await axiosInstance.delete('/productos/'+ id)

    return respuesta.data
}

