import axiosInstance from "@/services/axiosInstance";

export const registrarMensajeContacto = async (datos ) =>{

    const respuesta = await axiosInstance.post('/contactos',datos)

    return respuesta.data

}