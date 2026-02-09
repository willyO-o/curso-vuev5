<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    imagenes: {
        type: Array,
        required: true,
        default: () => []
    }
})

</script>

<template>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
            <div v-for="(imagen, index) in imagenes" :key="index" :class="index == 0 ? 'active' : ''"
                class="carousel-item">
                <img class="d-block w-100" :src="imagen" alt="First slide">
            </div>

        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span class="sr-only">Next</span>

            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
    </div>
</template>