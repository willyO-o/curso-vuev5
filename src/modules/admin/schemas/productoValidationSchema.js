import * as yup from 'yup'

const productoValidationSchema  =  yup.object({
    titulo: yup.string().required('El título es obligatorio').min(3, 'El título debe tener al menos 3 caracteres'),
    precio: yup.number().required('El precio es obligatorio').min(0, 'El precio debe ser un número positivo'),
    stock: yup.number().required('El stock es obligatorio').min(0, 'El stock debe ser un número positivo'),
    categoria_id: yup.number().required('Seleccione una categoría').min(1, 'Seleccione una categoría válida'),
})

export default productoValidationSchema