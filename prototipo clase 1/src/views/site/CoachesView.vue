<template>
  <div class="coaches-view">
    <!-- Header -->
    <section
      class="hero-background text-white text-center py-20 min-h-[50vh] flex items-center justify-center"
    >
      <div>
        <h1 class="text-4xl font-bold">Nuestros Entrenadores</h1>
        <p class="mt-2 text-white">Conoce a nuestro equipo de entrenadores profesionales</p>
      </div>
    </section>

    <!-- Filtros -->
    <div class="w-full flex justify-center my-8">
      <div
        class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[320px] border border-purple-200"
      >
        <h2 class="text-2xl font-bold text-purple-400 mb-4">Filtrar Entrenadores</h2>
        <div v-if="!selectedFilter" class="flex gap-3 flex-wrap justify-center">
          <input
            class="btn bg-purple-400 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Todos"
            @change="resetFilters"
          />
          <input
            class="btn bg-purple-500 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Especialidad"
            @change="selectedFilter = 'Especialidad'"
          />
          <input
            class="btn bg-purple-600 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Experiencia"
            @change="selectedFilter = 'Experiencia'"
          />
          <input
            class="btn bg-purple-700 text-white border-none"
            type="radio"
            name="filters"
            aria-label="Nombre"
            @change="selectedFilter = 'Nombre'"
          />
        </div>
        <div v-else class="flex flex-col gap-3 items-center w-full">
          <template v-if="selectedFilter === 'Especialidad'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-purple-400 text-white border-none"
                type="radio"
                name="especialidadOptions"
                aria-label="Cardio"
                @change="filtrarPorEspecialidad('Cardio')"
              />
              <input
                class="btn bg-purple-500 text-white border-none"
                type="radio"
                name="especialidadOptions"
                aria-label="Fuerza"
                @change="filtrarPorEspecialidad('Fuerza')"
              />
              <input
                class="btn bg-purple-600 text-white border-none"
                type="radio"
                name="especialidadOptions"
                aria-label="Funcional"
                @change="filtrarPorEspecialidad('Funcional')"
              />
              <input
                class="btn bg-purple-700 text-white border-none"
                type="radio"
                name="especialidadOptions"
                aria-label="Relajación"
                @change="filtrarPorEspecialidad('Relajación')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Experiencia'">
            <div class="flex gap-2 flex-wrap justify-center w-full">
              <input
                class="btn bg-purple-400 text-white border-none"
                type="radio"
                name="experienciaOptions"
                aria-label="Junior (1-3 años)"
                @change="filtrarPorExperiencia('junior')"
              />
              <input
                class="btn bg-purple-500 text-white border-none"
                type="radio"
                name="experienciaOptions"
                aria-label="Intermedio (4-7 años)"
                @change="filtrarPorExperiencia('intermedio')"
              />
              <input
                class="btn bg-purple-600 text-white border-none"
                type="radio"
                name="experienciaOptions"
                aria-label="Senior (8+ años)"
                @change="filtrarPorExperiencia('senior')"
              />
            </div>
          </template>

          <template v-else-if="selectedFilter === 'Nombre'">
            <div class="w-full">
              <input
                v-model="filtros.nombre"
                type="text"
                placeholder="Escribe el nombre del entrenador..."
                class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </template>

          <div class="flex gap-2 mt-4">
            <button
              class="btn bg-purple-200 text-purple-700 border-none"
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

    <!-- Entrenadores -->
    <section class="py-10">
      <div class="container mx-auto">
        <!-- Mensaje cuando no hay entrenadores disponibles -->
        <div
          v-if="entrenadores.length === 0"
          class="text-center py-16 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl mx-4"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <Users :size="48" class="text-purple-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No hay entrenadores disponibles</h3>
            <p class="text-gray-600 mb-6">
              Actualmente no tenemos entrenadores registrados. Estamos buscando los mejores
              profesionales para acompañarte en tu journey fitness.
            </p>
            <p class="text-sm text-gray-500">¡Pronto tendremos un equipo increíble esperándote!</p>
          </div>
        </div>

        <!-- Grid de entrenadores cuando hay datos -->
        <div
          v-else-if="entrenadoresFiltrados.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="entrenador in entrenadoresFiltrados"
            :key="entrenador.id"
            class="bg-purple-50 shadow-lg rounded-[1rem] overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <!-- Imagen vertical -->
            <div
              class="h-100 bg-cover bg-center relative"
              :style="`background-image: url(${entrenador.imagen})`"
            >
              <span
                class="inline-flex items-center bg-purple-400 px-2 py-1 text-xs font-medium text-white ring-1 ring-purple-700/10 ring-inset absolute top-2 right-2 rounded-full"
              >
                {{ entrenador.especialidad }}
              </span>
            </div>

            <div class="p-4">
              <h3 class="text-dark-blue-color font-bold text-2xl">{{ entrenador.nombre }}</h3>
              <p class="text-purple-400 mb-2 font-bold">
                <Star class="inline-block text-purple-400" /> {{ entrenador.especialidad }}
              </p>
              <p class="text-sm text-dark-blue-color mb-3">{{ entrenador.descripcion }}</p>

              <div class="mt-4 text-sm text-dark-blue-color space-y-2">
                <!-- Años de experiencia -->
                <div class="flex items-center gap-2">
                  <Calendar class="inline-block text-purple-400" />
                  <span>{{ entrenador.experiencia }} años de experiencia</span>
                </div>

                <!-- Clases activas -->
                <div class="flex items-center gap-2">
                  <Users class="inline-block text-purple-400" />
                  <span>{{ entrenador.clasesActivas?.length || 0 }} clases activas</span>
                </div>
              </div>

              <!-- Lista de clases activas -->
              <div v-if="entrenador.clasesActivas?.length > 0" class="mt-4">
                <h4 class="text-sm font-semibold text-dark-blue-color mb-2">Clases que imparte:</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="clase in entrenador.clasesActivas"
                    :key="clase"
                    class="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                  >
                    {{ clase }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados con los filtros aplicados -->
        <div
          v-else
          class="text-center py-16 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl mx-4"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Users :size="48" class="text-gray-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No se encontraron entrenadores</h3>
            <p class="text-gray-600 mb-6">
              No hay entrenadores que coincidan con los filtros aplicados. Intenta ajustar los
              criterios de búsqueda.
            </p>
            <button
              @click="resetFilters"
              class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Star, Calendar, Users } from 'lucide-vue-next'

const filtros = ref({ nombre: '', especialidad: '', experiencia: '' })
const selectedFilter = ref(null)
const entrenadores = ref([])

// Cargar entrenadores desde localStorage al montar el componente
onMounted(() => {
  const storedEntrenadores = localStorage.getItem('gym_entrenadores')
  if (storedEntrenadores) {
    entrenadores.value = JSON.parse(storedEntrenadores)
    // Migrar datos antiguos si no tienen las nuevas propiedades
    entrenadores.value.forEach((entrenador) => {
      if (!entrenador.favoritos) entrenador.favoritos = []
      if (!entrenador.clasesActivas) entrenador.clasesActivas = []
    })
    updateLocalStorage()
  } else {
    // Inicializar con array vacío si no hay datos
    entrenadores.value = []
  }
})

const entrenadoresFiltrados = computed(() => {
  return entrenadores.value.filter((e) => {
    const nombreMatch =
      !filtros.value.nombre || e.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())

    const especialidadMatch =
      !filtros.value.especialidad || e.especialidad === filtros.value.especialidad

    const experienciaMatch =
      !filtros.value.experiencia ||
      (filtros.value.experiencia === 'junior' && e.experiencia >= 1 && e.experiencia <= 3) ||
      (filtros.value.experiencia === 'intermedio' && e.experiencia >= 4 && e.experiencia <= 7) ||
      (filtros.value.experiencia === 'senior' && e.experiencia >= 8)

    return nombreMatch && especialidadMatch && experienciaMatch
  })
})

function resetFilters() {
  filtros.value = { nombre: '', especialidad: '', experiencia: '' }
  selectedFilter.value = null
}

function filtrarPorEspecialidad(especialidad) {
  filtros.value.especialidad = especialidad === filtros.value.especialidad ? '' : especialidad
}

function filtrarPorExperiencia(nivel) {
  filtros.value.experiencia = nivel === filtros.value.experiencia ? '' : nivel
}

// Función para actualizar localStorage
function updateLocalStorage() {
  localStorage.setItem('gym_entrenadores', JSON.stringify(entrenadores.value))
}
</script>

<style scoped>
.hero-background {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/banner5.png');
  background-repeat: no-repeat;
}
</style>
