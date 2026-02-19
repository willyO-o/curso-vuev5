import axiosInstance from "@/services/axiosInstance";

export const login = async (datos)=> {

    const respuesta = await axiosInstance.post('/auth/login',datos)

    return respuesta.data
}

export const getUsuario = async () => {

    const respuesta = await axiosInstance.get('/auth/me')

    return respuesta.data

}

export const logout = async () =>{

    const refreshToken = localStorage.getItem('refreshToken')

    const respuesta = await axiosInstance.post('/auth/logout', {
        refresh_token: refreshToken
    })

    return respuesta.data

}
