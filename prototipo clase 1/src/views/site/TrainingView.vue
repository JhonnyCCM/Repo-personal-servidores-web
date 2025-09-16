<template>
  <div class="machines-view">
    <!-- Header -->
    <section
      class="hero-background text-white text-center py-20 min-h-[50vh] flex items-center justify-center"
    >
      <div>
        <h1 class="text-4xl font-bold">Nuestras Máquinas</h1>
        <p class="mt-2 text-white">Explora las máquinas disponibles para tu entrenamiento</p>
      </div>
    </section>

    <!-- Filtros -->
    <div class="w-full flex justify-center my-8">
      <div
        class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[320px] border border-green-400"
      >
        <h2 class="text-2xl font-bold text-green-400 mb-4">Filtrar Máquinas</h2>
        <div v-if="!selectedFilter" class="flex gap-3 flex-wrap justify-center">
          <input
            class="btn bg-green-400 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Todas"
            @change="resetFilters"
          />
          <input
            class="btn bg-green-600 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Tipo"
            @change="selectedFilter = 'Tipo'"
          />
          <input
            class="btn bg-green-700 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Zona"
            @change="selectedFilter = 'Zona'"
          />
          <input
            class="btn bg-green-800 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Disponibilidad"
            @change="selectedFilter = 'Disponibilidad'"
          />
          <input
            class="btn bg-green-900 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Nombre"
            @change="selectedFilter = 'Nombre'"
          />
        </div>
        <div v-else class="flex flex-col gap-3 items-center w-full">
          <template v-if="selectedFilter === 'Tipo'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-green-400 text-white border-none"
                type="radio"
                name="typeOptions"
                aria-label="Cardio"
                @change="filtrarPorTipo('Cardio')"
              />
              <input
                class="btn bg-green-400 text-white border-none"
                type="radio"
                name="typeOptions"
                aria-label="Fuerza"
                @change="filtrarPorTipo('Fuerza')"
              />
              <input
                class="btn bg-green-600 text-white border-none"
                type="radio"
                name="typeOptions"
                aria-label="Funcional"
                @change="filtrarPorTipo('Funcional')"
              />
              <input
                class="btn bg-green-700 text-white border-none"
                type="radio"
                name="typeOptions"
                aria-label="Flexibilidad"
                @change="filtrarPorTipo('Flexibilidad')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Zona'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-green-400 text-white border-none"
                type="radio"
                name="zoneOptions"
                aria-label="Sala Principal"
                @change="filtrarPorZona('Sala Principal')"
              />
              <input
                class="btn bg-green-400 text-white border-none"
                type="radio"
                name="zoneOptions"
                aria-label="Área Cardio"
                @change="filtrarPorZona('Área Cardio')"
              />
              <input
                class="btn bg-green-600 text-white border-none"
                type="radio"
                name="zoneOptions"
                aria-label="Zona Funcional"
                @change="filtrarPorZona('Zona Funcional')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Disponibilidad'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-green-400 text-white border-none"
                type="radio"
                name="availabilityOptions"
                aria-label="Disponible"
                @change="filtrarPorDisponibilidad('Disponible')"
              />
              <input
                class="btn bg-gray-400 text-white border-none"
                type="radio"
                name="availabilityOptions"
                aria-label="Ocupada"
                @change="filtrarPorDisponibilidad('Ocupada')"
              />
              <input
                class="btn bg-yellow-400 text-white border-none"
                type="radio"
                name="availabilityOptions"
                aria-label="Mantenimiento"
                @change="filtrarPorDisponibilidad('Mantenimiento')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Nombre'">
            <div class="w-full">
              <input
                v-model="filtros.nombre"
                type="text"
                placeholder="Escribe el nombre de la máquina..."
                class="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </template>

          <div class="flex gap-2 mt-4">
            <button
              class="btn bg-green-200 text-green-700 border-none"
              type="button"
              aria-label="volver"
              @click="selectedFilter = null"
            >
              Volver
            </button>
            <button
              class="btn bg-red-200 text-red-700 border-none"
              type="button"
              aria-label="limpiar filtros"
              @click="resetFilters"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Máquinas -->
    <section class="py-10">
      <div class="container mx-auto">
        <!-- Mensaje cuando no hay máquinas disponibles -->
        <div
          v-if="maquinas.length === 0"
          class="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl mx-4"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <Heart :size="48" class="text-green-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No hay máquinas disponibles</h3>
            <p class="text-gray-600 mb-6">
              Actualmente no tenemos equipos registrados. Estamos trabajando para equipar nuestro
              gimnasio con la mejor tecnología de entrenamiento.
            </p>
            <p class="text-sm text-gray-500">
              ¡Pronto tendremos equipos de última generación para ti!
            </p>
          </div>
        </div>

        <!-- Grid de máquinas cuando hay datos -->
        <div
          v-else-if="maquinasFiltradas.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="maquina in maquinasFiltradas"
            :key="maquina.id"
            class="bg-green-50 shadow-lg rounded-[1rem] overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <!-- Imagen con fondo y etiqueta -->
            <div
              class="h-48 bg-cover bg-center relative"
              :style="`background-image: url(${maquina.imagen})`"
            >
              <span
                class="inline-flex items-center bg-green-400 px-2 py-1 text-xs font-medium text-white ring-1 ring-green-700/10 ring-inset absolute top-2 right-2 rounded-full"
                >{{ maquina.tipo }}</span
              >
              <!-- Botón de favorito -->
              <button
                @click="toggleFavorito(maquina)"
                class="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
                :class="{ 'bg-red-50': esFavorito(maquina) }"
                :title="esFavorito(maquina) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
              >
                <Heart
                  :class="esFavorito(maquina) ? 'text-red-500 fill-red-500' : 'text-gray-400'"
                  :size="20"
                />
              </button>
            </div>

            <div class="p-4">
              <h3 class="text-dark-blue-color font-bold text-2xl">{{ maquina.nombre }}</h3>
              <p class="text-green-400 mb-2 font-bold">
                <MapPinned class="inline-block text-green-400" /> Zona: {{ maquina.zona }}
              </p>
              <p class="text-sm text-dark-blue-color">{{ maquina.descripcion }}</p>

              <div class="mt-4 flex items-center justify-between">
                <span
                  class="badge rounded-full"
                  :class="disponibilidadColor(maquina.disponibilidad)"
                >
                  {{ maquina.disponibilidad }}
                </span>
                <div class="flex items-center gap-2 ml-4 text-dark-blue-color">
                  <Heart class="inline-block text-green-400 fill-current" />
                  <span>{{ maquina.favoritos?.length || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados después del filtro -->
        <div
          v-else-if="maquinas.length > 0 && maquinasFiltradas.length === 0"
          class="text-center py-12"
        >
          <div class="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
            <Search class="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold text-dark-blue-color mb-2">Sin resultados</h3>
            <p class="text-gray-600 mb-4">
              No se encontraron máquinas que coincidan con tu búsqueda
            </p>
            <button
              @click="resetFilters"
              class="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Alert personalizado con blur -->
    <div
      v-if="showAlert"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="cerrarAlert"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-xl p-6 mx-4 max-w-md w-full shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="{
              'bg-green-100 text-green-600': alertType === 'success',
              'bg-red-100 text-red-600': alertType === 'error',
              'bg-blue-100 text-blue-600': alertType === 'info',
            }"
          >
            <svg
              v-if="alertType === 'success'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else-if="alertType === 'error'"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-800 font-medium">{{ alertMessage }}</p>
          </div>
          <button @click="cerrarAlert" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { MapPinned, Heart, Search } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Watcher para reaccionar a cambios en el estado de login
watch(
  () => auth.isLoggedIn,
  (newValue) => {
    if (!newValue) {
      // Si el usuario cierra sesión, forzar actualización de la vista
      // para que los favoritos desaparezcan
      maquinas.value = [...maquinas.value]
    }
  },
)

const selectedFilter = ref(null)
const filtros = ref({ tipo: '', zona: '', disponibilidad: '', nombre: '' })

// Variables para el sistema de alertas
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success') // success, error, info

const maquinas = ref([])

// Cargar máquinas desde localStorage al montar el componente
onMounted(() => {
  const storedMaquinas = localStorage.getItem('gym_maquinas')
  if (storedMaquinas) {
    maquinas.value = JSON.parse(storedMaquinas)
    // Migrar datos antiguos si no tienen la propiedad favoritos
    maquinas.value.forEach((maquina) => {
      if (!maquina.favoritos) {
        maquina.favoritos = []
      }
    })
    updateLocalStorage()
  } else {
    // Inicializar con array vacío si no hay datos
    maquinas.value = []
  }
})

const maquinasFiltradas = computed(() => {
  return maquinas.value.filter((m) => {
    const tipoMatch = !filtros.value.tipo || m.tipo === filtros.value.tipo
    const zonaMatch = !filtros.value.zona || m.zona === filtros.value.zona
    const dispMatch =
      !filtros.value.disponibilidad || m.disponibilidad === filtros.value.disponibilidad
    const nombreMatch =
      !filtros.value.nombre || m.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())
    return tipoMatch && zonaMatch && dispMatch && nombreMatch
  })
})

function filtrarPorTipo(tipo) {
  filtros.value = { tipo, zona: '', disponibilidad: '' }
}

function filtrarPorZona(zona) {
  filtros.value = { tipo: '', zona, disponibilidad: '' }
}

function filtrarPorDisponibilidad(disponibilidad) {
  filtros.value = { tipo: '', zona: '', disponibilidad }
}

function resetFilters() {
  filtros.value = { tipo: '', zona: '', disponibilidad: '' }
  selectedFilter.value = null
}

// Función para actualizar localStorage cuando se modifiquen las máquinas
function updateLocalStorage() {
  localStorage.setItem('gym_maquinas', JSON.stringify(maquinas.value))
}

// Función para mostrar alert personalizado
function mostrarAlert(mensaje, tipo = 'success') {
  alertMessage.value = mensaje
  alertType.value = tipo
  showAlert.value = true

  // Auto cerrar después de 3 segundos
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

// Función para cerrar alert
function cerrarAlert() {
  showAlert.value = false
}

// Función para obtener el ID del usuario actual de manera consistente
function getCurrentUserId() {
  if (!auth.isLoggedIn || !auth.currentUser) return null
  // Usar el email del usuario como ID único y consistente
  return auth.currentUser.email || auth.currentUser.id || null
}

// Función para agregar/quitar de favoritos
function toggleFavorito(maquina) {
  if (!auth.isLoggedIn) {
    mostrarAlert('Debes iniciar sesión para agregar favoritos', 'error')
    return
  }

  const userId = getCurrentUserId()
  if (!userId) {
    mostrarAlert('Error: No se pudo identificar al usuario', 'error')
    return
  }

  if (!maquina.favoritos) {
    maquina.favoritos = []
  }

  const index = maquina.favoritos.indexOf(userId)
  if (index === -1) {
    // Agregar a favoritos
    maquina.favoritos.push(userId)
    mostrarAlert(`"${maquina.nombre}" agregada a tus máquinas favoritas`, 'success')
  } else {
    // Quitar de favoritos
    maquina.favoritos.splice(index, 1)
    mostrarAlert(`"${maquina.nombre}" eliminada de tus máquinas favoritas`, 'info')
  }

  updateLocalStorage()
}

// Función para verificar si está en favoritos del usuario actual
function esFavorito(maquina) {
  if (!auth.isLoggedIn || !maquina.favoritos) return false
  const userId = getCurrentUserId()
  if (!userId) return false
  return maquina.favoritos.includes(userId)
}

function disponibilidadColor(disponibilidad) {
  return disponibilidad === 'Disponible'
    ? 'badge-success'
    : disponibilidad === 'Ocupada'
      ? 'badge-warning'
      : disponibilidad === 'Mantenimiento'
        ? 'badge-error'
        : 'badge-primary'
}
</script>

<style scoped>
.hero-background {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/banner2.png');
  background-repeat: no-repeat;
}
</style>
