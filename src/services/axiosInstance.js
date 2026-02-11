import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(configuracion => {

    const token = localStorage.getItem('accessToken')
    if(token){
        configuracion.headers.Authorization = "Bearer "+ token
    }

    return configuracion
})


export default axiosInstance;