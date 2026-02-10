<script setup>
import Carrusel from '@/components/Carrusel.vue';
import { getProductoId } from '@/services/productoService.js';
import { useRoute } from 'vue-router';
import { convertiraArreglo } from '@/helpers/textoHelper'
import useCarritoStore from '@/modules/public/stores/carritoStore.js';

import { onMounted, ref } from 'vue';

const carritoStore = useCarritoStore()

const datosProducto = ref({
    imagen: '',
    id: '',
})
const cantidad = ref(1)

const route = useRoute();

console.log("datos del route:", route.params.id);

const listarProducto = async () => {

    const resultado = await getProductoId(route.params.id)
    datosProducto.value = resultado
    console.log("datos del producto:", datosProducto.value);
}

const incrementar = () => {
    if (cantidad.value < datosProducto.value.stock)
        cantidad.value++
}

const decrementar = () => {
    if (cantidad.value > 1) cantidad.value--
}

onMounted(() => {
    listarProducto()
})




</script>

<template>
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">

        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-4">Especificaciones</h2>
                <div class="row align-items-center">

                    <div class="col-md-5">
                        <Carrusel :imagenes="convertiraArreglo(datosProducto.imagen)" />
                    </div>
                    <div class="col-md-7">

                        <div class="card shadow-lg ">
                            <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">Oferta</span>
                            <div class="card-header  pt-4 pb-3">
                                <h2 class="font-weight-bold mt-2">
                                    {{ datosProducto.titulo }}
                                </h2>
                                <h5 class="font-weight-bold mt-2">
                                    Precio:
                                    <small class="text-lg mb-auto">Bs.</small>{{ datosProducto.precio }}
                                </h5>
                            </div>
                            <div class="card-body text-lg-start text-center pt-0">
                                <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                    <i class="fas fa-minus my-auto"></i>
                                    <span class="ps-3 font-weight-bold"> Stock: {{ datosProducto.stock }}
                                        Unidades</span>
                                </div>



                                <div class=" row d-flex  p-2">

                                    <div class="d-flex justify-content-center py-0 px-2 col-auto m-0">
                                        <i class="fas fa-minus my-auto cursor-pointer" @click="decrementar"></i>
                                        <div class="input-group input-group-dynamic ">
                                            <input type="number" class="form-control my-0" v-model="cantidad">
                                        </div>
                                        <i class="fas fa-plus my-auto cursor-pointer" @click="incrementar"></i>
                                    </div>
                                    <button
                                        :class="carritoStore.getProductoId(datosProducto.id).cantidad < datosProducto.stock ? '' : 'disabled'"
                                        @click="carritoStore.agregarProducto(datosProducto, cantidad)"
                                        class="btn btn-info btn-sm mb-0 col-auto w-50">
                                        <i class="fas fa-shopping-cart me-2"></i>
                                        Añadir al carrito
                                    </button>


                                </div>

                                <RouterLink :to="{name: 'Carrito'}" class="btn btn-icon bg-gradient-dark d-lg-block mt-3 mb-0">
                                    <i class="fas fa-credit-card"></i>
                                    Comprar ahora

                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="font-weight-bold mt-2">
                                    Descripción
                                </h2>
                            </div>
                            <div class="card-body">
                                {{ datosProducto.descripcion }}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>


    </div>

</template>