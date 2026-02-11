<script setup>
import { onMounted, ref } from 'vue';
import { getProductos } from '@/services/productoService'
import { getCategorias } from '@/services/categoriaService'
import TarjetaProducto from '@/modules/public/components/TarjetaProducto.vue'
import Paginacion from '@/components/Paginacion.vue'


const listadoProductos = ref([]);
const listadoCategorias = ref([])

const cargando = ref(false);

const parametros = ref({
    limit: 6,
    page: 1,
    search: '',
    categoria_id: ""
})

const totalProductos = ref(0);

const listarCategorias = async () => {


    const categorias = await getCategorias()

    listadoCategorias.value = categorias.data

}


const listarProductos = async (nuevoNroPagina = 1) => {

    listadoProductos.value = [];
    cargando.value = true;
    parametros.value.page = nuevoNroPagina

    const resultado = await getProductos(parametros.value);

    listadoProductos.value = resultado.data;
    totalProductos.value = resultado.total
    cargando.value = false;
}

const realizarBusqueda = () => {

    if (parametros.value.search.length > 2 || parametros.value.search.length == 0) {
        listarProductos();
    }

}


onMounted(() => {

    listarProductos();
    listarCategorias()

})

</script>

<template>
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6 mt-5 pt-7">

        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-4">Productos destacados</h2>
                <div class="row justify-content-between mb-4">
                    <div class="col-auto">
                        <div class="input-group input-group-outline my-3">
                            <input type="search" @input="realizarBusqueda()" v-model="parametros.search"
                                class="form-control" placeholder="Buscar">
                        </div>

                    </div>

                    <div class="col-auto">
                        <div class="input-group input-group-outline my-3">
                            <select 
                                @change="listarProductos()"
                            v-model="parametros.categoria_id" class="form-control">
                                <option value="">Seleccione </option>
                                <option 
                                    v-for="categoria in listadoCategorias" :key="categoria.id"
                                :value="categoria.id">{{ categoria.categoria }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center">

                    <TarjetaProducto v-for="producto in listadoProductos" :key="producto.id" :producto="producto" />

                    <div v-if="listadoProductos.length == 0 && !cargando" class="col-12 p-5">
                        <h5 class="text-center">No se encontraron resultados.</h5>
                    </div>

                    <div v-if="cargando" class="col-12 d-flex justify-content-center">
                        <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>

                <div v-if="listadoProductos.length > 0" class="mt-3">
                    <Paginacion :total="totalProductos" :paginaActual="parametros.page" :porPagina="parametros.limit"
                        @cambiarPagina="listarProductos" />
                </div>

            </div>
        </section>

    </div>

</template>