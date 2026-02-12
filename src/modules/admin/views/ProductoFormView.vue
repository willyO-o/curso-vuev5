<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getCategorias } from '@/services/categoriaService'

const listadoCategorias = ref([])

const listadoImagenes = ref([])

const urlImagen = ref("")

const datosProducto = reactive({
    titulo: "iPhone 13",
    descripcion: "Nuevo iPhone 13",
    imagen: "[\"https://cdnx.jumpseller.com/kadrihel1/image/39075964/resize/635/635?1693415938\",\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_U-mBlGNXylsj4G7Ryqd_m_l_P_OHIhUzb4UE5vF8JZ_X12lHvOpDNP88m7pTsqrzpw&usqp=CAU\"]",
    precio: 999.99,
    stock: 100,
    categoria_id: ""
})

const cargarCategorias = async () => {
    const resultado = await getCategorias()
    listadoCategorias.value = resultado.data
}

const agregarImagen = () => {
    if (urlImagen.value.trim() == "") return

    listadoImagenes.value.push(urlImagen.value)
    urlImagen.value = ""

}

const quitarImagen = (indice) => {
    listadoImagenes.value.splice(indice, 1)
}


onMounted(() => {
    cargarCategorias()
})


</script>

<template>

    <div class="card">
        <div class="card-body">
            <h2>Crear Producto</h2>
            <form>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Titulo</label>
                        <div class="input-group input-group-outline ">
                            <input type="text" class="form-control" name="titulo" v-model="datosProducto.titulo">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <div class="input-group input-group-outline ">
                            <select name="categoria_id" id="" class="form-control" v-model="datosProducto.categoria_id">
                                <option value="">Seleccione</option>
                                <option v-for="item in listadoCategorias" :key="item.id" :value="item.id">{{
                                    item.categoria }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Precio (Bs.)</label>
                        <div class="input-group input-group-outline is-valid ">
                            <input type="number" class="form-control" name="precio" v-model="datosProducto.precio">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Stock</label>
                        <div class="input-group input-group-outline is-invalid ">
                            <input type="number" class="form-control" name="stock" v-model="datosProducto.stock">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="form-label">Descripcion</label>
                        <div class="input-group input-group-outline is-invalid ">
                            <textarea name="descripcion" id="descripcion" class="form-control" rows="3"
                                v-model="datosProducto.descripcion"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="form-label">Imagen</label>
                        <div class="input-group input-group-outline  ">
                            <input v-model="urlImagen" type="text" class="form-control py-0" name="url"
                                placeholder="url de la Imagen">
                            <button  type="button"  :class="{ 'disabled': urlImagen.length < 1 }"
                                class="btn btn-primary btn-sm ms-2 mb-0" @click="agregarImagen">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <div class="row p-3">


                            <div v-for="(img, index) in listadoImagenes" :key="index"
                                class="col-xl-2 col-md-3 mb-xl-0 mb-4">

                                <div class="card bg-dark text-white border-0">
                                    <img class="card-img" :src="img" alt="Card image">
                                    <span 
                                        @click="quitarImagen(index)"
                                    class="text-danger cursor-pointer position-absolute top-0 end-0 me-2 mt-2">
                                        <i class="fas fa-trash "></i>
                                    </span>
                                </div>
                                <!-- <div class="card card-blog card-plain">
                                    <div class="card-header p-0 m-2">
                                        <a class="d-block shadow-xl border-radius-xl">
                                            <img  alt="img-blur-shadow"
                                                class="img-fluid shadow border-radius-lg">
                                        </a>
                                    </div>

                                </div> -->
                            </div>

                            <div 
                                v-if="listadoImagenes.length == 0"
                                class="p-5">
                                <h5 class="text-center text-danger">Sin imagenes Agregadas</h5>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button class=" btn btn-primary " type="submit">
                            <i class="fas fa-save"></i>
                            Guardar
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div>


</template>