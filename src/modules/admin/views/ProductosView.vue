<script setup>
import { ref, onMounted } from 'vue'
import { getProductos, eliminarProducto, getProductoId } from '@/services/productoService'
import { primeraImagen } from '@/helpers/textoHelper'
import Paginacion from '@/components/Paginacion.vue'
import Swal from 'sweetalert2'
import Carrusel from '@/components/Carrusel.vue'
import { convertiraArreglo } from '@/helpers/textoHelper'

const listadoProductos = ref([])
const parametros = ref({
    limit: 10,
    page: 1,
    search: ''
})
const totalProductos = ref(0)
const detallesProducto = ref({})


const listarProductos = async (nroPagina = 1) => {

    parametros.value.page = nroPagina


    const resultado = await getProductos(parametros.value)

    listadoProductos.value = resultado.data

    totalProductos.value = resultado.total
    console.log(resultado)

}



const eliminar = id => {

    Swal.fire({
        title: "Esta usted Seguro?",
        text: "Desea eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {

            eliminarProducto(id)
                .then(() => {
                    listarProductos()

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Producto eliminado correctamente"
                    });
                })

        }
    });


}


const verDetalles = async id => {

    const resultado = await getProductoId(id)

    detallesProducto.value = resultado
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
                    <div
                        class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between align-items-center">
                        <h6 class="text-white text-capitalize ps-3">Listado de Productos</h6>
                        <RouterLink :to="{ name: 'CrearProducto' }" class="btn  btn-primary me-3 ">
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
                                        <a @click="verDetalles(producto.id)" href="javascript:;"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Ver producto " data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <RouterLink :to="{ name: 'EditarProducto', params: { id: producto.id } }"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar producto">
                                            <i class="fas fa-pencil"></i>
                                        </RouterLink>
                                        <a @click="eliminar(producto.id)" href="javascript:;"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Eliminar producto">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Paginacion :total="totalProductos" :paginaActual="parametros.page"
                            :porPagina="parametros.limit" @cambiarPagina="listarProductos" />

                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-normal" id="exampleModalLabel">Detalles del Producto</h5>
                    <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <div class="card shadow-lg">

                        <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">Oferta</span>



                        <div class="card-header text-center pt-4 pb-3">
                            <h2 class="font-weight-bold mt-2">
                                {{ detallesProducto.titulo }}
                            </h2>
                            <h3 class="font-weight-bold mt-2">
                                <small class="text-lg mb-auto">Bs</small>{{ detallesProducto.precio }}
                            </h3>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <Carrusel :imagenes="convertiraArreglo(detallesProducto.imagen)" />

                            </div>
                        </div>
                        <div class="card-body text-lg-start text-center pt-0">
                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <i class="material-symbols-rounded my-auto">done</i>
                                <span class="ps-3">
                                    {{ detallesProducto.descripcion }}
                                </span>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <i class="material-symbols-rounded my-auto">done</i>
                                <span class="ps-3">{{ detallesProducto.categoria }}</span>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <i class="material-symbols-rounded my-auto">done</i>
                                <span class="ps-3">{{ detallesProducto.stock }} unidades disponibles</span>
                            </div>

                       
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</template>