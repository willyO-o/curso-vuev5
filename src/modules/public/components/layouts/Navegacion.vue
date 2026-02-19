<script setup>
import { primeraImagen } from '@/helpers/textoHelper';
import useCarritoStore from '@/modules/public/stores/carritoStore'
import {ref} from 'vue'

const carritoStore = useCarritoStore()


const estaAutenticado = ref(localStorage.getItem('informacionUsuario'))

</script>

<template>

    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <nav
                    class="navbar navbar-expand-lg  blur border-radius-lg mt-4 top-0 z-index-3 shadow position-absolute my-3 p-2 start-0 end-0 mx-4">
                    <div class="container">
                        <RouterLink class="navbar-brand  text-dark " :to="{ name: 'Base' }" rel="tooltip"
                            title="Designed and Coded by Creative Tim" data-placement="bottom">
                            Mi Tienda
                        </RouterLink>
                        <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon mt-2">
                                <span class="navbar-toggler-bar bar1"></span>
                                <span class="navbar-toggler-bar bar2"></span>
                                <span class="navbar-toggler-bar bar3"></span>
                            </span>
                        </button>
                        <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0 ms-lg-12 ps-lg-5" id="navigation">
                            <ul class="navbar-nav navbar-nav-hover ms-auto">
                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Inicio' }">
                                        <i class="fas fa-home me-1"></i>
                                        <p class="d-inline text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="Star us on Github">Inicio</p>
                                    </RouterLink>
                                </li>
                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Tienda' }">
                                        <i class="fas fa-store me-1"></i>
                                        <p class="d-inline text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="Star us on Github">Tienda</p>
                                    </RouterLink>
                                </li>
                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Contacto' }">
                                        <i class="fas fa-envelope me-1"></i>
                                        <p class="d-inline text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="Star us on Github">Contacto</p>
                                    </RouterLink>
                                </li>

                                <li class="nav-item dropdown dropdown-hover mx-2">
                                    <a class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                                        id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-cart-shopping"></i>
                                        <img src="/assets/img/down-arrow-white.svg" alt="down-arrow"
                                            class="arrow ms-2 d-lg-block d-none">
                                        <img src="/assets/img/down-arrow-dark.svg" alt="down-arrow"
                                            class="arrow ms-2 d-lg-none d-block">
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-animation dropdown-menu-end dropdown-md dropdown-md-responsive mt-0 mt-lg-3 p-3 border-radius-lg"
                                        aria-labelledby="dropdownMenuDocs">
                                        <div class="d-none d-lg-block">
                                            <ul v-if="carritoStore.items.length > 0" class="list-group">

                                                <li v-for="item in carritoStore.items" :key="item.id"
                                                    class="nav-item list-group-item border-0 p-0">

                                                    <a class="dropdown-item py-2 ps-3 border-radius-md">
                                                        <div class="d-flex px-2">
                                                            <div>
                                                                <img :src="primeraImagen(item.imagen)"
                                                                    class="avatar avatar-sm  me-2">
                                                            </div>
                                                            <div class="my-auto">
                                                                <h6 class="mb-0 text-xs">
                                                                    {{ item.titulo }}
                                                                </h6>
                                                                <p class="small">
                                                                    {{ item.cantidad }} x {{ item.precio }} Bs.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span @click="carritoStore.eliminarProducto(item.id)"
                                                            class="position-absolute top-0 end-0 text-danger me-1 mt-1 small p-1  ">
                                                            <i class="fas fa-trash"></i>
                                                        </span>
                                                    </a>
                                                </li>

                                            </ul>
                                            <div v-if="carritoStore.items.length > 0">
                                                <h5>Total Bs.: {{ carritoStore.total }}</h5>
                                            </div>
                                            <div v-else>
                                                <h6 class="text-center"> No tienes Productos en tu carrito</h6>
                                            </div>
                                        </div>
                                        <div class="row d-lg-none">
                                            <div class="col-md-12 g-0">
                                                <a class="dropdown-item py-2 ps-3 border-radius-md"
                                                    href="/pages/about-us.html">
                                                    <h6
                                                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                        Getting Started</h6>
                                                    <span class="text-sm">All about overview, quick start, license and
                                                        contents</span>
                                                </a>
                                                <a class="dropdown-item py-2 ps-3 border-radius-md"
                                                    href="/pages/about-us.html">
                                                    <h6
                                                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                        Foundation</h6>
                                                    <span class="text-sm">See our colors, icons and typography</span>
                                                </a>
                                                <a class="dropdown-item py-2 ps-3 border-radius-md"
                                                    href="/pages/about-us.html">
                                                    <h6
                                                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                        Components</h6>
                                                    <span class="text-sm">Explore our collection of fully designed
                                                        components</span>
                                                </a>
                                                <a class="dropdown-item py-2 ps-3 border-radius-md"
                                                    href="/pages/about-us.html">
                                                    <h6
                                                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                        Plugins</h6>
                                                    <span class="text-sm">Check how you can integrate our plugins</span>
                                                </a>
                                                <a class="dropdown-item py-2 ps-3 border-radius-md"
                                                    href="/pages/about-us.html">
                                                    <h6
                                                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                        Utility Classes</h6>
                                                    <span class="text-sm">For those who want flexibility, use our
                                                        utility
                                                        classes</span>
                                                </a>
                                            </div>
                                        </div>
                                    </ul>
                                </li>

                                <li class="nav-item my-auto ms-3 ms-lg-0">
                                    <RouterLink v-if="!estaAutenticado"
                                        :to="{ name: 'Login' }"
                                        class="btn btn-sm  text-white bg-dark  mb-0 me-1 mt-2 mt-md-0">Login
                                    </RouterLink>
                                    <RouterLink v-else :to="{ name: 'Panel' }"
                                        class="btn btn-sm  text-white bg-dark  mb-0 me-1 mt-2 mt-md-0">Administración
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>


</template>