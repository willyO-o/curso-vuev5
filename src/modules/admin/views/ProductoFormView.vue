<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getCategorias } from '@/services/categoriaService'
import { crearProducto, getProductoId, actualizarProducto } from '@/services/productoService'
import productoValidationSchema from '@/modules/admin/schemas/productoValidationSchema'
import { Form, Field, ErrorMessage } from 'vee-validate'

import { useRouter, useRoute } from 'vue-router'

import Swal from 'sweetalert2'


const listadoCategorias = ref([])

const listadoImagenes = ref([])

const urlImagen = ref("")

const router = useRouter()
const route = useRoute()

const datosProducto = reactive({
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: 0,
    stock: 1,
    categoria_id: 0
})

const cargarCategorias = async () => {
    const resultado = await getCategorias()
    listadoCategorias.value = resultado.data
}

const agregarImagen = () => {
    if (urlImagen.value.trim() == "") return

    listadoImagenes.value.push(urlImagen.value)
    urlImagen.value = ""

}

const quitarImagen = (indice) => {
    listadoImagenes.value.splice(indice, 1)
}


const guardarProducto = async () => {

    datosProducto.imagen = JSON.stringify(listadoImagenes.value)


    let resultado = null

    if (route.params.id) {
        resultado = await actualizarProducto(route.params.id, datosProducto)

    } else {
        resultado = await crearProducto(datosProducto)
    }

    console.log(resultado)

    Swal.fire({
        icon: 'success',
        title: 'Existoso!!',
        text: resultado.message || 'El producto ha sido registrado correctamente',
    })

    setTimeout(() => {
        router.push({ name: 'Productos' })
    }, 2000)


}

const obtenerProducto = async id => {

    const resultado = await getProductoId(id)

    datosProducto.titulo = resultado.titulo
    datosProducto.descripcion = resultado.descripcion
    datosProducto.precio = resultado.precio
    datosProducto.stock = resultado.stock
    datosProducto.categoria_id = resultado.categoria_id

    listadoImagenes.value = JSON.parse(resultado.imagen)


}


onMounted(() => {

    cargarCategorias()

    if (route.params.id) {
        obtenerProducto(route.params.id)
    }
})


</script>

<template>

    <div class="card">
        <div class="card-body">
            <h2>Crear Producto</h2>
            <Form :validation-schema="productoValidationSchema" @submit="guardarProducto">
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Titulo</label>
                        <div class="input-group input-group-outline ">
                            <Field type="text" class="form-control" name="titulo" v-model="datosProducto.titulo" />
                        </div>
                        <ErrorMessage name="titulo" class="text-danger small" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <div class="input-group input-group-outline ">
                            <Field as="select" name="categoria_id" id="" class="form-control"
                                v-model="datosProducto.categoria_id">
                                <option :value="0">Seleccione</option>
                                <option v-for="item in listadoCategorias" :key="item.id" :value="item.id">{{
                                    item.categoria }}</option>
                            </Field>
                        </div>
                        <ErrorMessage name="categoria_id" class="text-danger small" />

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Precio (Bs.)</label>
                        <div class="input-group input-group-outline is-valid ">
                            <Field type="number" class="form-control" name="precio" v-model="datosProducto.precio" />
                        </div>
                        <ErrorMessage name="precio" class="text-danger small" />

                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Stock</label>
                        <div class="input-group input-group-outline is-invalid ">
                            <Field type="number" class="form-control" name="stock" v-model="datosProducto.stock" />
                        </div>
                        <ErrorMessage name="stock" class="text-danger small" />

                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="form-label">Descripcion</label>
                        <div class="input-group input-group-outline is-invalid ">
                            <textarea name="descripcion" id="descripcion" class="form-control" rows="3"
                                v-model="datosProducto.descripcion"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="form-label">Imagen</label>
                        <div class="input-group input-group-outline  ">
                            <input v-model="urlImagen" type="text" class="form-control py-0" name="url"
                                placeholder="url de la Imagen">
                            <button type="button" :class="{ 'disabled': urlImagen.length < 1 }"
                                class="btn btn-primary btn-sm ms-2 mb-0" @click="agregarImagen">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <div class="row p-3">


                            <div v-for="(img, index) in listadoImagenes" :key="index"
                                class="col-xl-2 col-md-3 mb-xl-0 mb-4">

                                <div class="card bg-dark text-white border-0">
                                    <img class="card-img" :src="img" alt="Card image">
                                    <span @click="quitarImagen(index)"
                                        class="text-danger cursor-pointer position-absolute top-0 end-0 me-2 mt-2">
                                        <i class="fas fa-trash "></i>
                                    </span>
                                </div>
                                <!-- <div class="card card-blog card-plain">
                                    <div class="card-header p-0 m-2">
                                        <a class="d-block shadow-xl border-radius-xl">
                                            <img  alt="img-blur-shadow"
                                                class="img-fluid shadow border-radius-lg">
                                        </a>
                                    </div>

                                </div> -->
                            </div>

                            <div v-if="listadoImagenes.length == 0" class="p-5">
                                <h5 class="text-center text-danger">Sin imagenes Agregadas</h5>
                                <p class="text-center text-danger">por favor agregue al menos una imagen</p>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button :class="listadoImagenes.length < 1 ? 'disabled' : ''" class=" btn btn-primary "
                            type="submit">
                            <i class="fas fa-save"></i>
                            Guardar
                        </button>
                    </div>
                </div>

            </Form>
        </div>
    </div>


</template>