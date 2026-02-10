import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base',
      component: () => import('@/modules/public/views/InicioView.vue'),
    },
    {
      path: '/inicio',
      name: 'Inicio',
      component: () => import('@/modules/public/views/InicioView.vue'),
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: () => import('@/modules/public/views/ContactoView.vue'),
    },
    {
      path: '/tienda',
      name: 'Tienda',
      component: () => import('@/modules/public/views/TiendaView.vue'),
    },
    {
      path: '/detalle-producto/:id',
      name: 'DetalleProducto',
      component: () => import('@/modules/public/views/DetalleProductoView.vue'),
    },
    {
      path: '/carrito',
      name: 'Carrito',
      component: () => import('@/modules/public/views/CarritoView.vue'),

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/modules/public/views/LoginView.vue'),
    }
  ],
})

export default router
