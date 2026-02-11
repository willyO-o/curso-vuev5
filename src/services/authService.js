import axiosInstance from "@/services/axiosInstance";

export const login = async (datos)=> {

    const respuesta = await axiosInstance.post('/auth/login',datos)

    return respuesta.data
}

export const getUsuario = async () => {

    const respuesta = await axiosInstance.get('/auth/me')

    return respuesta.data

}
