import axiosInstance from "@/services/axiosInstance";


export const getCategorias = async (parametros={}) =>{

    const respuesta = await axiosInstance.get('/categorias',{
        params:parametros
    })

    return respuesta.data
}