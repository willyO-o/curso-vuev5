import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(configuracion => {

    const token = localStorage.getItem('accessToken')
    if (token) {
        configuracion.headers.Authorization = "Bearer " + token
    }

    return configuracion
})

axiosInstance.interceptors.response.use(
    respuesta => respuesta,
    async error => {

        const solicitudOriginal = error.config

        if (error.response.status == 401 && !solicitudOriginal._repetido) {
            solicitudOriginal._repetido = true

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                const respuesta = await axios.post('/auth/refresh', {
                    refresh_token: refreshToken
                }, {
                    baseURL: import.meta.env.VITE_API_URL,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const nuevoAccessToken = respuesta.data.access_token.token

                localStorage.setItem('accessToken', nuevoAccessToken)

                solicitudOriginal.headers.Authorization = "Bearer " + nuevoAccessToken

                return axiosInstance(solicitudOriginal)

            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('informacionUsuario')

                window.location.href = '/login'

            }


        }
        return Promise.reject(error)
    }
)




export default axiosInstance;