<script setup>
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
    total: {
        type: Number,
        required: true
    },
    paginaActual: {
        type: Number,
        required: true
    },
    porPagina: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['cambiarPagina'])

const cantidadPaginas = computed(() => {

    return Math.ceil(props.total / props.porPagina)

})





</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center pagination-secondary">
            
            <li 
            class="page-item "
            :class="paginaActual == 1 ? 'disabled': ''"
            >
                <a 
                    @click="$emit('cambiarPagina', paginaActual - 1)"
                class="page-link" href="javascript:;" tabindex="-1">
                    <i class="fa fa-angle-left"></i>
                </a>
            </li>


            <li v-for="nroPagina in cantidadPaginas" :key="nroPagina" class="page-item"
                :class="nroPagina == paginaActual ? 'active disabled' : ''">
                <a class="page-link" @click="$emit('cambiarPagina', nroPagina)"
                    :class="nroPagina == paginaActual ? 'text-white' : ''" href="javascript:;">{{ nroPagina }}</a>
            </li>

            <li class="page-item"
            :class="paginaActual == cantidadPaginas ? 'disabled' : ''">
                <a 
                @click="$emit('cambiarPagina', paginaActual + 1)"
                class="page-link" href="javascript:;">
                    <i class="fa fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </nav>

</template>