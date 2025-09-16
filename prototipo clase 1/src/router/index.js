import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Agregar scrollBehavior
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (navegación con botones del navegador)
    if (savedPosition) {
      return savedPosition
    }
    // Si hay un hash en la URL (enlaces con #)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Por defecto, ir al inicio de la página
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/site/HomeView.vue'),
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('../views/site/ClassesView.vue'),
    },
    {
      path: '/training',
      name: 'training',
      component: () => import('../views/site/TrainingView.vue'),
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: () => import('../views/site/CoachesView.vue'),
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../views/site/PlansView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/site/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/site/RegisterView.vue'),
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: () => import('../views/user/ProfileView.vue'),
      meta: { requiresAuth: true, requiresUser: true }, // Ruta protegida solo para usuarios regulares (no admin)
    },
    {
      path: '/user/classes',
      name: 'user-classes',
      component: () => import('../views/user/ClassesView.vue'),
      meta: { requiresAuth: true, requiresUser: true }, // Ruta protegida solo para usuarios regulares (no admin)
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/classes',
      name: 'admin-classes',
      component: () => import('../views/admin/ClassesView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // Ruta protegida y solo para administradores
    },
    {
      path: '/admin/coaches',
      name: 'admin-coaches',
      component: () => import('../views/admin/CoachesView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/members',
      name: 'admin-members',
      component: () => import('../views/admin/MembersView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/inventory',
      name: 'admin-inventory',
      component: () => import('../views/admin/EquipmentView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/payouts',
      name: 'admin-payouts',
      component: () => import('../views/admin/PayoutsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/plans',
      name: 'admin-plans',
      component: () => import('../views/admin/PlansView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    // Ruta 404 - debe ir al final para capturar todas las rutas no encontradas
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404/404View.vue'),
    },
  ],
})

// Guard global para proteger rutas
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Inicializar autenticación en cada navegación
  auth.initializeAuth()

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Verificar si la ruta requiere rol de admin
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    next({ name: 'home' }) // Redirigir a home si no es admin
    return
  }

  // Verificar si la ruta requiere ser usuario regular (no admin)
  if (to.meta.requiresUser && auth.isAdmin) {
    next({ name: 'admin-dashboard' }) // Redirigir a dashboard admin si es admin
    return
  }

  // Si el usuario ya está logueado y trata de ir a login o register, redirigir
  if (auth.isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    if (auth.isAdmin) {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'user-profile' })
    }
    return
  }

  next()
})

export default router
