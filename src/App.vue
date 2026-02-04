<script setup>

import Navegacion from '@/modules/public/components/layouts/Navegacion.vue'
import Cabecera from '@/modules/public/components/layouts/Cabecera.vue'
import PiePagina from '@/modules/public/components/layouts/PiePagina.vue'


</script>

<template>
  
  
  <!-- Navbar Transparent -->
  <Navegacion />
  <!-- End Navbar -->
  <!-- -------- START HEADER 7 w/ text and video ------- -->
  <Cabecera />


  <!-- contenido -->

  <RouterView />

  <!-- fin contenido -->


  <PiePagina />



</template>

<style scoped></style>
