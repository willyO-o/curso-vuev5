import { defineStore } from 'pinia';
import { ref , computed } from 'vue';

const useCarritoStore = defineStore('carrito', () => {
    const items = ref([]);

    const agregarProducto = (producto, cantidad = 1) => {

        const productoExistente = items.value.find(item => item.id == producto.id);

        if (productoExistente) {
            productoExistente.cantidad += cantidad
        } else {
            items.value.push({
                ...producto,
                cantidad: cantidad
            })
        }

    }


    const eliminarProducto = idProducto => {

        items.value = items.value.filter(item => item.id !== idProducto)

    }

    const total = computed(() =>{

        // let sumatoria = 0;
        // for  (const item of items.value) {
        //     sumatoria+= item.precio*item.cantidad
        // }
        // return sumatoria;

        return items.value.reduce((sumatoria, item)=> sumatoria + item.precio*item.cantidad , 0)

    })
    


    return {
        items,
        agregarProducto,
        eliminarProducto,
        total
    }


}, {
    persist: {
        storage: localStorage,
    }
})



export default useCarritoStore;