<script setup>
import useCarritoStore from '@/modules/public/stores/carritoStore';

import { primeraImagen } from '@/helpers/textoHelper';


const carritoStore = useCarritoStore()

const decrementar = (item) => {

    if (item.cantidad > 1) {
        item.cantidad--;
    }


}


</script>

<template>

    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6 mt-5">

        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-4">Detalles del Carrito</h2>
                <div class="row">
                    <div class="col-md-8">

                        <div class="card">
                            <div class="table-responsive">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Producto</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Precio (Bs.)</th>
                                            <th
                                                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Cantidad</th>
                                            <th
                                                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Su-Total
                                            </th>
                                            <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="item in carritoStore.items" :key="item.id">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img :src="primeraImagen(item.imagen)" class=" avatar-sm me-3">
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-xs">{{ item.titulo }}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0">
                                                    {{ item.precio }}
                                                </p>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                <div class="d-flex justify-content-center py-0 px-2 col-auto m-0 w-50">
                                                    <i class="fas fa-minus my-auto cursor-pointer"
                                                        @click="decrementar(item)"></i>
                                                    <div class="input-group input-group-dynamic ">
                                                        <input type="number" readonly=""
                                                            class="form-control text-center my-0"
                                                            v-model="item.cantidad">
                                                    </div>
                                                    <i class="fas fa-plus my-auto cursor-pointer"
                                                        @click="carritoStore.agregarProducto(item, 1)"></i>
                                                </div>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-normal">
                                                    {{ (item.precio * item.cantidad).toFixed(2) }}
                                                </span>
                                            </td>
                                            <td class="align-middle">
                                                <a href="javascript:;" @click="carritoStore.eliminarProducto(item.id)"
                                                    class="text-danger font-weight-normal text-xs" data-toggle="tooltip"
                                                    data-original-title="Edit user">
                                                    <i class="fas fa-trash"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr v-if="carritoStore.items.length == 0">
                                            <td colspan="100%">
                                                <h5 class="text-center p-5">No tienes productos en el carrito</h5>
                                            </td>

                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="card shadow-lg ">
                            <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">Resumen</span>
                            <div class="card-header text-center  pt-4 pb-3">
                                <h2 class="font-weight-bold mt-2">
                                    TOTAL A PAGAR:
                                </h2>
                                <h4 class="font-weight-bold mt-2">
                                    {{ carritoStore.total.toFixed(2) }} Bs.
                                </h4>
                            </div>
                            <div class="card-body text-lg-start text-center pt-0">

                                <div class=" row d-flex  p-2">

                                </div>

                                <a href="javascript:;" class="btn btn-icon bg-gradient-dark d-lg-block mt-3 mb-0">
                                    <i class="fas fa-credit-card"></i>
                                    Pagar

                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>

    </div>


</template>