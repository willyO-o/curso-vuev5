<script setup>
import { ref, onMounted } from 'vue'
import { getProductos } from '@/services/productoService'
import { primeraImagen } from '@/helpers/textoHelper'
import Paginacion from '@/components/Paginacion.vue'


const listadoProductos = ref([])
const parametros = ref({
    limit: 10,
    page: 1,
    search: ''
})
const totalProductos = ref(0)


const listarProductos = async (nroPagina=1) => {

    parametros.value.page = nroPagina


    const resultado = await getProductos(parametros.value)

    listadoProductos.value = resultado.data

    totalProductos.value = resultado.total
    console.log(resultado)

}

onMounted(() => {
    listarProductos()
})







</script>

<template>

    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                        <h6 class="text-white text-capitalize ps-3">Listado de Productos</h6>
                        <RouterLink  :to="{name: 'CrearProducto'}" class="btn  btn-primary me-3 ">
                            <i class="fas fa-plus"></i> Nuevo Producto
                        </RouterLink>
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
                                        Producto</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Precio</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Stock</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Categoria</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(producto, indice) in listadoProductos" :key="producto.id">
                                    <td class="text-center">
                                        {{ indice + 1 }}
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="primeraImagen(producto.imagen)"
                                                    class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ producto.titulo }}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">{{ producto.precio }}</p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span
                                            :class="{ 'bg-gradient-success': producto.stock > 3, 'bg-gradient-danger': producto.stock <= 3 }"
                                            class="badge badge-sm ">
                                            {{ producto.stock }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{ producto.categoria
                                            }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Ver producto">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <RouterLink :to="{ name: 'EditarProducto', params: { id: producto.id } }"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar producto">
                                            <i class="fas fa-pencil"></i>
                                        </RouterLink>
                                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Eliminar producto">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Paginacion 
                        :total="totalProductos"
                        :paginaActual="parametros.page"
                        :porPagina="parametros.limit"
                          @cambiarPagina="listarProductos" 
                        />

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>