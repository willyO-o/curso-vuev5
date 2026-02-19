<script setup>

import { ref, onMounted } from 'vue'
import { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '@/services/categoriaService'
import Swal from 'sweetalert2'
import Paginacion from '@/components/Paginacion.vue'


const listadoCategorias = ref([])

const parametros = ref({
    limit: 10,
    page: 1,
})

const datosCategoria = ref({
    categoria: "",
    estado: "activo"
})

const idCategoriaEditar = ref(null)

const totalCategorias = ref(0)


const listarCategorias = async (nroPagina = 1) => {

    parametros.value.page = nroPagina
    const resultado = await getCategorias(parametros.value)

    listadoCategorias.value = resultado.data

    totalCategorias.value = resultado.total

}


const guardarCategoria = async () => {


    if (idCategoriaEditar.value) {

        await actualizarCategoria(idCategoriaEditar.value, datosCategoria.value)
    } else {
        await crearCategoria(datosCategoria.value)
    }

    Swal.fire("Exitoso!", "categoria guardada correctamente", "success")
    listarCategorias()

    datosCategoria.value = {
        categoria: "",
        estado: "activo"
    }

    idCategoriaEditar.value = null

}

const editar = categoria => {

    datosCategoria.value.categoria = categoria.categoria
    datosCategoria.value.estado = categoria.estado

    idCategoriaEditar.value = categoria.id
}

const eliminar = id => {


    Swal.fire({
        title: "Esta usted seguro?",
        text: "Esta accion es irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarCategoria(id)
                .then(() => {
                    listarCategorias()
                    Swal.fire("Exitoso!", "categoria eliminada correctamente", "success")


                })
        }
    });





}

onMounted(() => {

    listarCategorias()
})



</script>

<template>

    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div
                        class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                        <h6 class="text-white text-capitalize ps-3">Listado de Categorias</h6>
                        <button class="btn  btn-primary me-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fas fa-plus"></i> Nueva Categoria
                        </button>
                    </div>
                </div>
                <div class="card-body px-0 pb-2">
                    <div class="table-responsive p-0">

                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Nombre Categoria</th>

                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        estado</th>

                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(categoria, indice) in listadoCategorias" :key="categoria.id">
                                    <td class="text-center">
                                        {{ indice + 1 }}
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">

                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ categoria.categoria }}</h6>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="align-middle text-center text-sm">
                                        <span
                                            :class="{ 'bg-gradient-success': categoria.estado == 'activo', 'bg-gradient-danger': categoria.estado == 'inactivo' }"
                                            class="badge badge-sm ">
                                            {{ categoria.estado }}
                                        </span>
                                    </td>

                                    <td class="align-middle">

                                        <a @click="editar(categoria)" href="javascript:;"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar categoria" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            <i class="fas fa-pencil"></i>
                                        </a>
                                        <a @click="eliminar(categoria.id)" href="javascript:;"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Eliminar categoria">
                                            <i class="fas fa-trash"></i>
                                        </a>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Paginacion :total="totalCategorias" :paginaActual="parametros.page"
                            :porPagina="parametros.limit" @cambiarPagina="listarCategorias" />

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form @submit.prevent="guardarCategoria">

                    <div class="modal-header">
                        <h5 class="modal-title font-weight-normal" id="exampleModalLabel">Detalles del Producto</h5>
                        <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body ">
                        <div class="">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-label">Nombre Categoria</label>

                                    <div class="input-group input-group-outline ">
                                        <input required type="text" class="form-control"
                                            v-model="datosCategoria.categoria">
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-6 my-3">
                                    <label class="form-label">Estado</label>

                                    <div class="input-group input-group-outline is-valid ">
                                        <select name="estado" id="estado" class="form-control" required
                                            v-model="datosCategoria.estado">
                                            <option value="activo">Activo</option>
                                            <option value="inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn bg-gradient-primary">
                            Guardar Cambios
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>

</template>