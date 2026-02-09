<script setup>
import Carrusel from '@/components/Carrusel.vue';
import { getProductoId } from '@/services/productoService.js';
import { useRoute }  from 'vue-router';
import {convertiraArreglo} from '@/helpers/textoHelper'

import { onMounted , ref} from 'vue';

const datosProducto = ref({
    imagen: ''
})
const route = useRoute();

console.log("datos del route:",route.params.id);

const listarProducto = async () =>{

    const resultado = await getProductoId(route.params.id)
    datosProducto.value = resultado
    console.log("datos del producto:",datosProducto.value);
}


onMounted (() =>{
    listarProducto()
})


 

</script>

<template>
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">

        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-4">Especificaciones</h2>
                <div class="row align-items-center">

                    <div class="col-6">
                        <Carrusel  :imagenes="convertiraArreglo(datosProducto.imagen)"/>
                    </div>
                    <div class="col-6">

                    </div>


                </div>
            </div>
        </section>


    </div>

</template>