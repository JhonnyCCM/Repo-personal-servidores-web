<template>
  <div class="dashboard-admin min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p class="mt-2 text-gray-600">Bienvenido, {{ auth.currentUser?.nombreCompleto }}</p>
      </div>

      <!-- Tarjetas de estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <!-- Total de clases -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Calendar class="h-6 w-6 text-blue-500" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Clases</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalClases }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Total de usuarios -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Users class="h-6 w-6 text-green-500" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalUsuarios }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Total entrenadores -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <UserCheck class="h-6 w-6 text-purple-500" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Entrenadores</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalEntrenadores }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Total planes -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CreditCard class="h-6 w-6 text-yellow-500" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Planes</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalPlanes }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Total equipos -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Dumbbell class="h-6 w-6 text-red-500" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Equipos</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalEquipos }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Gestión de clases -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white"
                >
                  <Calendar class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Gestionar Clases</h3>
                <p class="text-sm text-gray-500">Crear, editar y eliminar clases del gimnasio</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/classes"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Administrar
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gestión de miembros -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white"
                >
                  <Users class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Gestionar Miembros</h3>
                <p class="text-sm text-gray-500">Administrar usuarios y membresías</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/members"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                Administrar
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gestión de entrenadores -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white"
                >
                  <UserCheck class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Gestionar Entrenadores</h3>
                <p class="text-sm text-gray-500">Administrar staff y entrenadores</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/coaches"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Administrar
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gestión de planes -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-600 text-white"
                >
                  <CreditCard class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Gestionar Planes</h3>
                <p class="text-sm text-gray-500">Administrar planes de membresía</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/plans"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200"
              >
                Administrar
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gestión de pagos -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white"
                >
                  <DollarSign class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Solicitudes de Pago</h3>
                <p class="text-sm text-gray-500">Revisar y aprobar pagos pendientes</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/payouts"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                <span class="mr-2">Revisar</span>
                <span
                  v-if="stats.solicitudesPendientes > 0"
                  class="bg-red-500 text-white text-xs rounded-full px-2 py-1"
                >
                  {{ stats.solicitudesPendientes }}
                </span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Gestión de equipos -->
        <div
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white"
                >
                  <Dumbbell class="h-6 w-6" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Inventario de Equipos</h3>
                <p class="text-sm text-gray-500">Gestionar máquinas y equipamiento</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/admin/inventory"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Administrar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Calendar, Users, UserCheck, CreditCard, DollarSign, Dumbbell } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Estados reactivos
const clases = ref([])
const usuarios = ref([])
const entrenadores = ref([])
const planes = ref([])
const equipos = ref([])
const solicitudesPago = ref([])

// Computed para estadísticas
const stats = computed(() => {
  const totalInscripciones = clases.value.reduce((total, clase) => {
    return total + (clase.inscritos?.length || 0)
  }, 0)

  const solicitudesPendientes = solicitudesPago.value.filter(
    (solicitud) => solicitud.estado === 'pendiente',
  ).length

  return {
    totalClases: clases.value.length,
    totalUsuarios: usuarios.value.filter((u) => u.rol !== 'admin').length,
    totalEntrenadores: entrenadores.value.length,
    totalPlanes: planes.value.length,
    totalEquipos: equipos.value.length,
    totalInscripciones,
    solicitudesPendientes,
  }
})

// Cargar datos del localStorage
const loadStats = () => {
  clases.value = JSON.parse(localStorage.getItem('gym_clases') || '[]')
  usuarios.value = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
  entrenadores.value = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')
  planes.value = JSON.parse(localStorage.getItem('gym_planes') || '[]')
  equipos.value = JSON.parse(localStorage.getItem('gym_maquinas') || '[]')
  solicitudesPago.value = JSON.parse(localStorage.getItem('gym_solicitudes_pago') || '[]')
}

// Cargar datos al montar
// Inicializar usuario admin por defecto
onMounted(() => {
  // Crear usuario admin por defecto si no existe
  const usuariosExistentes = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')

  if (!usuariosExistentes.some((user) => user.rol === 'admin')) {
    const defaultAdmin = {
      id: 'admin-default',
      correo: 'admin@uleam.edu.ec',
      password: 'admin123',
      nombreCompleto: 'Administrador del Sistema',
      rol: 'admin',
      estado: 'activo',
      fechaRegistro: new Date().toISOString(),
    }

    usuariosExistentes.push(defaultAdmin)
    localStorage.setItem('gym_usuarios', JSON.stringify(usuariosExistentes))
  }

  loadStats()
})
</script>

<style scoped>
.dashboard-admin {
  font-family: 'Inter', sans-serif;
}
</style>
