<script setup>

import '@/assets/js/material-dashboard.js'
import Sidebar from '@/modules/admin/components/layouts/Sidebar.vue'
import Cabecera from '@/modules/admin/components/layouts/Cabecera.vue'
import Footer from '@/modules/admin/components/layouts/Footer.vue'
import Configuracion from '@/modules/admin/components/layouts/Configuracion.vue'

</script>
<template>

    <Sidebar />

    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        
        <!-- Navbar -->

        <Cabecera />
        <!-- End Navbar -->
        <div class="container-fluid py-2">

            <RouterView />

            <Footer />

        </div>
    </main>

    <Configuracion />



</template>