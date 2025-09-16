<script setup>
import { useAuthStore } from '@/stores/auth'
import {
  User,
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  CreditCard,
  Package,
  DollarSign,
  BookOpen,
  UserCircle,
  LogOut,
} from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const auth = useAuthStore()
const isScrolled = ref(false)

onMounted(() => {
  // Asegura que se recargue el estado por si la app se reinicia
  auth.isLoggedIn = !!localStorage.getItem('token')

  // Agregar listener para el scroll
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // Limpiar el listener cuando se desmonte el componente
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  // Cambiar estado cuando el scroll sea mayor a 50px
  isScrolled.value = window.scrollY > 50
}

function cerrarSesion() {
  auth.logout()
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{
      'backdrop-blur-md bg-dark-blue-color/90 shadow-lg': isScrolled,
      'bg-dark-blue-color': !isScrolled,
    }"
  >
    <div class="navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><router-link to="/" class="font-bold">Inicio</router-link></li>
            <li><router-link to="/classes" class="font-bold">Clases</router-link></li>
            <li><router-link to="/training" class="font-bold">Entrenar</router-link></li>
            <li><router-link to="/coaches" class="font-bold">Entrenadores</router-link></li>
            <li><router-link to="/plans" class="font-bold">Planes</router-link></li>
          </ul>
        </div>
        <router-link to="/" class="btn bg-transparent border-none shadow-none">
          <img class="logo h-20 w-auto" src="/img/logo/logo.png" alt="Logo" />
        </router-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><router-link to="/" class="font-bold">Inicio</router-link></li>
          <li><router-link to="/training" class="font-bold">Entrenar</router-link></li>
          <li><router-link to="/classes" class="font-bold">Clases</router-link></li>
          <li><router-link to="/coaches" class="font-bold">Entrenadores</router-link></li>
          <li><router-link to="/plans" class="font-bold">Planes</router-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <!-- Mostrar botón si NO está logueado -->
        <router-link
          v-if="!auth.isLoggedIn"
          to="/login"
          class="btn rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold hover:from-green-500 hover:to-blue-600 border-none shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Iniciar Sesión
        </router-link>

        <!-- Mostrar ícono si está logueado -->
        <div v-else class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar bg-transparent border-none"
          >
            <div class="w-10 rounded-full">
              <User class="w-10 h-10 text-white" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-dark-blue-color"
          >
            <!-- Enlaces específicos para admin -->
            <template v-if="auth.isAdmin">
              <li>
                <router-link
                  to="/admin/dashboard"
                  class="font-bold flex items-center gap-2 text-white hover:text-blue-300"
                >
                  <LayoutDashboard class="w-4 h-4" />
                  Dashboard Admin
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/classes"
                  class="font-bold flex items-center gap-2 text-white hover:text-green-300"
                >
                  <Calendar class="w-4 h-4" />
                  Gestionar Clases
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/members"
                  class="font-bold flex items-center gap-2 text-white hover:text-purple-300"
                >
                  <Users class="w-4 h-4" />
                  Gestionar Miembros
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/coaches"
                  class="font-bold flex items-center gap-2 text-white hover:text-yellow-300"
                >
                  <UserCheck class="w-4 h-4" />
                  Gestionar Entrenadores</router-link
                >
              </li>
              <li>
                <router-link
                  to="/admin/plans"
                  class="font-bold flex items-center gap-2 text-white hover:text-pink-300"
                >
                  <CreditCard class="w-4 h-4" />
                  Gestionar Planes
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/inventory"
                  class="font-bold flex items-center gap-2 text-white hover:text-red-300"
                >
                  <Package class="w-4 h-4" />
                  Gestionar Inventario</router-link
                >
              </li>
              <li>
                <router-link
                  to="/admin/payouts"
                  class="font-bold flex items-center gap-2 text-white hover:text-indigo-300"
                >
                  <DollarSign class="w-4 h-4" />
                  Gestionar Pagos
                </router-link>
              </li>
              <div
                class="divider m-2"
                style="background: linear-gradient(90deg, #4ade80, #60a5fa, #c084fc); height: 2px"
              ></div>
            </template>
            <!-- Enlaces solo para usuarios regulares (no admin) -->
            <template v-else>
              <li>
                <router-link
                  to="/user/classes"
                  class="font-bold flex items-center gap-2 text-white hover:text-green-300"
                >
                  <BookOpen class="w-4 h-4" />
                  Mis Clases
                </router-link>
              </li>
              <li>
                <router-link
                  to="/user/profile"
                  class="font-bold flex items-center gap-2 text-white hover:text-blue-300"
                >
                  <UserCircle class="w-4 h-4" />
                  Perfil
                </router-link>
              </li>
              <div
                class="divider m-2"
                style="background: linear-gradient(90deg, #4ade80, #60a5fa, #c084fc); height: 2px"
              ></div>
            </template>
            <!-- Enlaces comunes para todos los usuarios autenticados -->
            <li>
              <a
                @click="cerrarSesion"
                class="font-bold flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer"
              >
                <LogOut class="w-4 h-4" />
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Cambia el color de las letras de los enlaces activos */
li > .router-link-exact-active {
  background: linear-gradient(90deg, #4ade80, #60a5fa, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Hace el fondo transparente al hacer hover en los enlaces */
.menu li > a:hover {
  background-color: transparent !important;
}
</style>
