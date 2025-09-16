<template>
  <div class="classes-view">
    <!-- Header -->
    <section
      class="hero-background text-white text-center py-20 min-h-[50vh] flex items-center justify-center"
    >
      <div>
        <h1 class="text-4xl font-bold">Nuestras Clases</h1>
        <p class="mt-2 text-white">
          Descubre la variedad de clases que tenemos disponibles para ti
        </p>
      </div>
    </section>

    <!-- Filtros -->
    <div class="w-full flex justify-center my-8">
      <div
        class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[320px] border border-blue-200"
      >
        <h2 class="text-2xl font-bold text-blue-400 mb-4">Filtrar Clases</h2>
        <div v-if="!selectedFilter" class="flex gap-3 flex-wrap justify-center">
          <input
            class="btn bg-blue-400 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Todas"
            @change="resetFilters"
          />
          <input
            class="btn bg-blue-500 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Categorías"
            @change="selectedFilter = 'Categorías'"
          />
          <input
            class="btn bg-blue-600 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Niveles"
            @change="selectedFilter = 'Niveles'"
          />
          <input
            class="btn bg-blue-700 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Horarios"
            @change="selectedFilter = 'Horarios'"
          />
          <input
            class="btn bg-blue-800 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Nombre"
            @change="selectedFilter = 'Nombre'"
          />
        </div>
        <div v-else class="flex flex-col gap-3 items-center w-full">
          <template v-if="selectedFilter === 'Categorías'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-blue-400 text-white border-none"
                type="radio"
                name="categoryOptions"
                aria-label="Cardio"
                @change="filtrarPorCategoria('Cardio')"
              />
              <input
                class="btn bg-blue-500 text-white border-none"
                type="radio"
                name="categoryOptions"
                aria-label="Fuerza"
                @change="filtrarPorCategoria('Fuerza')"
              />
              <input
                class="btn bg-blue-600 text-white border-none"
                type="radio"
                name="categoryOptions"
                aria-label="Funcional"
                @change="filtrarPorCategoria('Funcional')"
              />
              <input
                class="btn bg-blue-700 text-white border-none"
                type="radio"
                name="categoryOptions"
                aria-label="Acuático"
                @change="filtrarPorCategoria('Acuático')"
              />
              <input
                class="btn bg-blue-800 text-white border-none"
                type="radio"
                name="categoryOptions"
                aria-label="Relajación"
                @change="filtrarPorCategoria('Relajación')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Niveles'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-blue-500 text-white border-none"
                type="radio"
                name="nivelOptions"
                aria-label="Principiante"
                @change="filtrarPorNivel('Principiante')"
              />
              <input
                class="btn bg-blue-600 text-white border-none"
                type="radio"
                name="nivelOptions"
                aria-label="Intermedio"
                @change="filtrarPorNivel('Intermedio')"
              />
              <input
                class="btn bg-blue-700 text-white border-none"
                type="radio"
                name="nivelOptions"
                aria-label="Avanzado"
                @change="filtrarPorNivel('Avanzado')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Horarios'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-blue-400 text-white border-none"
                type="radio"
                name="calendaryOptions"
                aria-label="Mañana"
                @change="filtrarPorHorario('Mañana')"
              />
              <input
                class="btn bg-blue-600 text-white border-none"
                type="radio"
                name="calendaryOptions"
                aria-label="Tarde"
                @change="filtrarPorHorario('Tarde')"
              />
              <input
                class="btn bg-blue-800 text-white border-none"
                type="radio"
                name="calendaryOptions"
                aria-label="Noche"
                @change="filtrarPorHorario('Noche')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Nombre'">
            <div class="w-full">
              <input
                v-model="filtros.nombre"
                type="text"
                placeholder="Escribe el nombre de la clase..."
                class="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </template>

          <div class="flex gap-2 mt-4">
            <button
              class="btn bg-blue-200 text-blue-700 border-none"
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

    <!-- Clases -->
    <section class="py-10">
      <div class="container mx-auto">
        <!-- Mensaje cuando no hay clases disponibles -->
        <div
          v-if="clases.length === 0"
          class="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mx-4"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <Calendar :size="48" class="text-blue-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No hay clases disponibles</h3>
            <p class="text-gray-600 mb-6">
              Actualmente no tenemos clases programadas. Nuestro equipo está trabajando para
              ofrecerte las mejores opciones de entrenamiento.
            </p>
            <p class="text-sm text-gray-500">
              ¡Vuelve pronto para descubrir nuevas clases emocionantes!
            </p>
          </div>
        </div>

        <!-- Grid de clases cuando hay datos -->
        <div
          v-else-if="clasesFiltradas.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="clase in clasesFiltradas"
            :key="clase.id"
            class="bg-blue-50 shadow-lg rounded-[1rem] overflow-hidden hover:-translate-y-3 transition-transform duration-300"
          >
            <!-- Imagen con fondo y etiqueta -->
            <div
              class="h-48 bg-cover bg-center relative"
              :style="`background-image: url(${clase.imagen})`"
            >
              <span
                class="inline-flex items-center bg-blue-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-blue-700/10 ring-inset absolute top-2 right-2 rounded-full"
                >{{ clase.categoria }}</span
              >
              <!-- Botón de favorito -->
              <button
                @click="toggleFavorito(clase)"
                class="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
                :class="{ 'bg-red-50': esFavorito(clase) }"
                :title="esFavorito(clase) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
              >
                <Heart
                  :class="esFavorito(clase) ? 'text-red-500 fill-red-500' : 'text-gray-400'"
                  :size="20"
                />
              </button>
            </div>

            <div class="p-4">
              <h3 class="text-dark-blue-color font-bold text-2xl">{{ clase.nombre }}</h3>
              <p class="text-blue-500 mb-2 font-bold">
                <User class="inline-block text-blue-500" /> {{ clase.entrenador }}
              </p>
              <p class="text-sm text-dark-blue-color">{{ clase.descripcion }}</p>

              <div class="mt-4 text-sm text-dark-blue-color space-y-1">
                <div class="flex items-center gap-2">
                  <Calendar class="inline-block text-blue-500" /> <span>{{ clase.dias }}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <Clock class="inline-block text-blue-500" /> <span>{{ clase.horaInicio }}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <Hourglass class="inline-block text-blue-500" /> <span>{{ clase.duracion }}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <Users class="inline-block text-blue-500" />
                  <span :class="getCuposClass(clase)"
                    >{{ getCuposDisponibles(clase) }}/{{ clase.cuposTotal }} disponibles</span
                  >
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <MapPin class="inline-block text-blue-500" /> <span>{{ clase.lugar }}</span>
                </div>
              </div>

              <div class="mt-3 flex items-center justify-between">
                <span class="badge rounded-full" :class="nivelColor(clase.nivel)">
                  {{ clase.nivel }}
                </span>
                <div class="flex items-center gap-2 text-dark-blue-color">
                  <Heart class="inline-block text-red-500 fill-current" />
                  <span>{{ clase.favoritos?.length || 0 }} </span>
                </div>
              </div>

              <div class="mt-4 space-y-2">
                <button
                  @click="toggleInscripcion(clase)"
                  :disabled="getCuposDisponibles(clase) === 0 && !estaInscrito(clase)"
                  class="btn border-none shadow-none w-full text-center"
                  :class="getButtonClass(clase)"
                >
                  {{ getButtonText(clase) }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados con los filtros aplicados -->
        <div
          v-else
          class="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl mx-4"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Calendar :size="48" class="text-gray-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No se encontraron clases</h3>
            <p class="text-gray-600 mb-6">
              No hay clases que coincidan con los filtros aplicados. Intenta ajustar los criterios
              de búsqueda.
            </p>
            <button
              @click="resetFilters"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de confirmación para retirarse -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarConfirmModal"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Confirmar retiro</h3>
            <p class="text-sm text-gray-500">Esta acción no se puede deshacer</p>
          </div>
        </div>

        <p class="text-gray-700 mb-6">
          ¿Estás seguro de que deseas retirarte de la clase
          <strong>"{{ claseSeleccionada?.nombre }}"</strong>?
        </p>

        <div class="flex gap-3">
          <button
            @click="cerrarConfirmModal"
            class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmarRetiro"
            class="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sí, retirarme
          </button>
        </div>
      </div>
    </div>

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
import { ref, computed, onMounted } from 'vue'
import { User, Calendar, Hourglass, Users, MapPin, Clock, Heart } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const selectedFilter = ref(null)
const filtros = ref({ categoria: '', nivel: '', horario: '', nombre: '' })
const showConfirmModal = ref(false)
const claseSeleccionada = ref(null)

const clases = ref([])
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success') // success, error, info

// Cargar clases desde localStorage al montar el componente
onMounted(() => {
  const storedClases = localStorage.getItem('gym_clases')
  if (storedClases) {
    clases.value = JSON.parse(storedClases)
    // Migrar datos antiguos si no tienen las propiedades necesarias
    clases.value.forEach((clase) => {
      if (!clase.inscritos) clase.inscritos = []
      if (!clase.favoritos) clase.favoritos = []
    })
    updateLocalStorage()
  } else {
    // Inicializar con array vacío si no hay datos
    clases.value = []
  }
})

const clasesFiltradas = computed(() => {
  return clases.value.filter((c) => {
    const nombreMatch =
      !filtros.value.nombre || c.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())
    const catMatch = !filtros.value.categoria || c.categoria === filtros.value.categoria
    const nivMatch = !filtros.value.nivel || c.nivel === filtros.value.nivel
    const horMatch =
      !filtros.value.horario ||
      (filtros.value.horario === 'Mañana' && parseInt(c.horaInicio.split(':')[0]) < 12) ||
      (filtros.value.horario === 'Tarde' &&
        parseInt(c.horaInicio.split(':')[0]) >= 12 &&
        parseInt(c.horaInicio.split(':')[0]) < 18) ||
      (filtros.value.horario === 'Noche' && parseInt(c.horaInicio.split(':')[0]) >= 18)
    return nombreMatch && catMatch && nivMatch && horMatch
  })
})

function filtrarPorCategoria(categoria) {
  filtros.value = { categoria, nivel: '', horario: '' }
}

function filtrarPorNivel(nivel) {
  filtros.value = { categoria: '', nivel, horario: '' }
}

function filtrarPorHorario(horario) {
  filtros.value = { categoria: '', nivel: '', horario }
}

function resetFilters() {
  filtros.value = { categoria: '', nivel: '', horario: '', nombre: '' }
  selectedFilter.value = null
}

// Función para actualizar localStorage cuando se modifiquen las clases
function updateLocalStorage() {
  localStorage.setItem('gym_clases', JSON.stringify(clases.value))
}

// Función para obtener clase de color según disponibilidad de cupos
function getCuposClass(clase) {
  const disponibles = getCuposDisponibles(clase)
  const porcentajeDisponible = (disponibles / clase.cuposTotal) * 100
  if (disponibles === 0) return 'text-red-600 font-bold'
  if (porcentajeDisponible <= 20) return 'text-orange-600 font-bold'
  return 'text-green-600 font-bold'
}

// Función para obtener cupos disponibles
function getCuposDisponibles(clase) {
  return clase.cuposTotal - (clase.inscritos?.length || 0)
}

// Función para verificar si el usuario está inscrito
function estaInscrito(clase) {
  if (!auth.isLoggedIn || !clase.inscritos) return false
  const userId = auth.currentUser?.email || auth.currentUser?.id
  if (!userId) return false
  return clase.inscritos.includes(userId)
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

// Función para obtener texto del botón
function getButtonText(clase) {
  if (!auth.isLoggedIn) return 'Iniciar Sesión'
  if (estaInscrito(clase)) return 'Retirarse de la Clase'
  if (getCuposDisponibles(clase) === 0) return 'Cupos Agotados'
  return 'Inscribirse'
}

// Función para obtener clase CSS del botón
function getButtonClass(clase) {
  if (!auth.isLoggedIn) return 'bg-gray-500'
  if (estaInscrito(clase)) return 'bg-red-500 hover:bg-red-600'
  if (getCuposDisponibles(clase) === 0) return 'bg-gray-400 cursor-not-allowed'
  return 'bg-blue-400 hover:bg-blue-500'
}

// Función principal para manejar inscripción/desinscripción
function toggleInscripcion(clase) {
  if (!auth.isLoggedIn) {
    mostrarAlert('Debes iniciar sesión para inscribirte a las clases', 'error')
    return
  }

  const userId = auth.currentUser?.email || auth.currentUser?.id
  if (!userId) {
    mostrarAlert('Error: No se pudo identificar al usuario', 'error')
    return
  }

  if (!clase.inscritos) clase.inscritos = []

  if (estaInscrito(clase)) {
    // Mostrar modal de confirmación para retirarse
    claseSeleccionada.value = clase
    showConfirmModal.value = true
  } else {
    // Inscribir usuario directamente
    if (getCuposDisponibles(clase) > 0) {
      clase.inscritos.push(userId)
      updateLocalStorage()
      mostrarAlert(`¡Te has inscrito exitosamente a "${clase.nombre}"!`, 'success')
      // Forzar actualización de la vista
      clases.value = [...clases.value]
    } else {
      mostrarAlert('No hay cupos disponibles para esta clase', 'error')
    }
  }
}

// Función para confirmar el retiro de la clase
function confirmarRetiro() {
  const userId = auth.currentUser?.email || auth.currentUser?.id
  const clase = claseSeleccionada.value

  if (clase && clase.inscritos && userId) {
    const index = clase.inscritos.indexOf(userId)
    if (index !== -1) {
      clase.inscritos.splice(index, 1)
      updateLocalStorage()
      mostrarAlert(`Te has retirado de la clase "${clase.nombre}"`, 'info')
      // Forzar actualización de la vista
      clases.value = [...clases.value]
    }
  }

  cerrarConfirmModal()
}

// Función para cerrar el modal de confirmación
function cerrarConfirmModal() {
  showConfirmModal.value = false
  claseSeleccionada.value = null
}

// Función para agregar/quitar de favoritos
function toggleFavorito(clase) {
  if (!auth.isLoggedIn) {
    mostrarAlert('Debes iniciar sesión para agregar clases favoritas', 'error')
    return
  }

  const userId = auth.currentUser?.email || auth.currentUser?.id
  if (!userId) {
    mostrarAlert('Error: No se pudo identificar al usuario', 'error')
    return
  }

  if (!clase.favoritos) {
    clase.favoritos = []
  }

  const index = clase.favoritos.indexOf(userId)
  if (index === -1) {
    // Agregar a favoritos
    clase.favoritos.push(userId)
    updateLocalStorage()
    mostrarAlert(`"${clase.nombre}" agregada a tus clases favoritas`, 'success')
  } else {
    // Quitar de favoritos
    clase.favoritos.splice(index, 1)
    updateLocalStorage()
    mostrarAlert(`"${clase.nombre}" eliminada de tus clases favoritas`, 'info')
  }

  // Forzar actualización de la vista
  clases.value = [...clases.value]
}

// Función para verificar si está en favoritos del usuario actual
function esFavorito(clase) {
  if (!auth.isLoggedIn || !clase.favoritos) return false
  const userId = auth.currentUser?.email || auth.currentUser?.id
  if (!userId) return false
  return clase.favoritos.includes(userId)
}

// Función anterior - remover para limpiar warnings
// function inscribirseClase(clase) {
//   toggleInscripcion(clase)
// }

function nivelColor(nivel) {
  return nivel === 'Principiante'
    ? 'badge-success'
    : nivel === 'Intermedio'
      ? 'badge-warning'
      : nivel === 'Avanzado'
        ? 'badge-error'
        : 'badge-primary'
}
</script>

<style scoped>
.hero-background {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/banner4.png');
  background-repeat: no-repeat;
}
</style>
