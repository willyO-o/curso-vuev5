import * as yup from 'yup';

 const contactoValidationSchema = yup.object({
    nombre_completo: yup.string().required('Este campo es requerido').max(200, 'El nombre completo no puede tener más de 200 caracteres'),
    correo: yup.string().email('Ingrese un correo valido').required('Este campo es requerido'),
    mensaje: yup.string().required('Este campo es requerido')
})


export default contactoValidationSchema;