<script setup>

import { defineProps } from 'vue';
import { truncarTexto, primeraImagen } from '@/helpers/textoHelper'

import useCarritoStore from '@/modules/public/stores/carritoStore'

const carritoStore = useCarritoStore()


const props = defineProps({
    producto: {
        type: Object,
        required: true
    }
})



</script>

<template>

    <div class="col-lg-4  mt-lg-0 mt-4">
        <div class="card">
            <div class="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a class="d-block blur-shadow-image">
                    <img :src="primeraImagen(producto.imagen)" alt="img-colored-shadow"
                        class="img-fluid w-100 border-radius-lg">
                </a>
                <span class="position-absolute top-0 end-0 badge bg-gradient-dark">{{ producto.categoria }}</span>
            </div>
            <div class="card-body text-center">
                <h5 class="font-weight-normal">
                    <RouterLink :to="{ name: 'DetalleProducto', params: { id: producto.id } }">{{ producto.titulo }}
                    </RouterLink>
                </h5>
                <h6>{{ producto.precio }} Bs.</h6>
                <p class="mb-0">
                    {{ truncarTexto(producto.descripcion) }}
                </p>
                <button v-if="carritoStore.getProductoId(producto.id).cantidad < producto.stock"
                    @click="carritoStore.agregarProducto(producto)" type="button"
                    class="btn bg-gradient-info btn-sm mb-0 mt-3">
                    Añadir al carrito
                </button>

                <button v-else disabled="true" class="btn bg-gradient-info btn-sm mb-0 mt-3">
                    Sin stock
                </button>
            </div>
        </div>
    </div>


</template>