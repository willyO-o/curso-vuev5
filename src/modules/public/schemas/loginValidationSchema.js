import * as yup from 'yup';


const loginValidationSchema = yup.object({
    email: yup.string().email('Ingrese un correo valido').required('Este campo es requerido'),
    password: yup.string().required("Este campo es requerido")
})


export default loginValidationSchema