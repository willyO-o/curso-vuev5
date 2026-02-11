<script setup>

import Navegacion from '@/modules/public/components/layouts/Navegacion.vue'
import Cabecera from '@/modules/public/components/layouts/Cabecera.vue'
import PiePagina from '@/modules/public/components/layouts/PiePagina.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.name)
</script>

<template>


    <!-- Navbar Transparent -->
    <Navegacion />
    <!-- End Navbar -->
    <!-- -------- START HEADER 7 w/ text and video ------- -->
    <Cabecera v-if="route.name == 'Base' || route.name == 'Inicio'" />


    <!-- contenido -->

    <RouterView />

    <!-- fin contenido -->


    <PiePagina />



</template>