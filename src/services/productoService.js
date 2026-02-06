import axiosInstance from '@/services/axiosInstance'


const getProductos = async (parametros={}) =>{

    const respuesta = await axiosInstance.get('/productos',{
        params:parametros
    })
    return respuesta.data

}

export {
    getProductos
}