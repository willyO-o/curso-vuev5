import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/modules/public/views/PublicLayout.vue'),
      children: [
        {
          path: '',
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
      ]
    },

    {
      path: '/admin',
      component: () => import('@/modules/admin/views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        const refreshToken = localStorage.getItem('refreshToken')
        const informacionUsuario = localStorage.getItem('informacionUsuario')
        if (refreshToken && informacionUsuario) {
          next()
        } else {
          next('/login')
        }
      },

      children: [
        {
          path: '/',
          name: 'Panel',
          component: () => import('@/modules/admin/views/PanelView.vue')
        },
        {
          path: 'productos',
          name: 'Productos',
          component: () => import('@/modules/admin/views/ProductosView.vue')
        },
        {
          path: 'productos/crear',
          name: 'CrearProducto',
          component: () => import('@/modules/admin/views/ProductoFormView.vue')
        },
        {
          path: 'productos/editar/:id',
          name: 'EditarProducto',
          component: () => import('@/modules/admin/views/ProductoFormView.vue')
        },
        {
          path: 'categorias',
          name: 'Categorias',
          component: () => import('@/modules/admin/views/CategoriasView.vue')
        },
        {
          path: 'usuarios',
          name: 'Usuarios',
          component: () => import('@/modules/admin/views/UsuariosView.vue')
        },


      ],
    }

  ],
})

export default router
