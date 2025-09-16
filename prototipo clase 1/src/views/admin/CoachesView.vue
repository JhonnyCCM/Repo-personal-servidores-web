<template>
  <div class="coaches-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Entrenadores</h1>
            <p class="mt-2 text-gray-600">Administra los entrenadores del gimnasio</p>
          </div>
          <button
            @click="abrirModalEntrenador()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus :size="20" class="mr-2" />
            Nuevo Entrenador
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Filtro por nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              v-model="filtros.nombre"
              type="text"
              placeholder="Buscar por nombre..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Filtro por especialidad -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
            <select
              v-model="filtros.especialidad"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las especialidades</option>
              <option
                v-for="especialidad in especialidades"
                :key="especialidad"
                :value="especialidad"
              >
                {{ especialidad }}
              </option>
            </select>
          </div>

          <!-- Filtro por experiencia -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Experiencia</label>
            <select
              v-model="filtros.experiencia"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los niveles</option>
              <option value="junior">Junior (1-3 años)</option>
              <option value="intermedio">Intermedio (4-7 años)</option>
              <option value="senior">Senior (8+ años)</option>
            </select>
          </div>

          <!-- Filtro por clases activas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Clases Activas</label>
            <input
              v-model="filtros.clasesActivas"
              type="number"
              min="0"
              placeholder="Mínimo de clases..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button
            @click="limpiarFiltros"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Tabla de entrenadores -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Entrenador
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Especialidad
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Experiencia
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Clases Activas
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="entrenador in entrenadoresFiltrados"
                :key="entrenador.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img
                        class="h-12 w-12 rounded-lg object-cover"
                        :src="entrenador.imagen"
                        :alt="entrenador.nombre"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ entrenador.nombre }}</div>
                      <div class="text-sm text-gray-500">
                        {{ getExperienciaTexto(entrenador.experiencia) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getEspecialidadClass(entrenador.especialidad)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ entrenador.especialidad }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ entrenador.experiencia }} años</div>
                  <div class="text-sm text-gray-500">
                    {{ getNivelExperiencia(entrenador.experiencia) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ entrenador.clasesActivas ? entrenador.clasesActivas.length : 0 }} clases
                  </div>
                  <div
                    v-if="entrenador.clasesActivas && entrenador.clasesActivas.length > 0"
                    class="text-sm text-gray-500"
                  >
                    {{ entrenador.clasesActivas.slice(0, 2).join(', ') }}
                    <span v-if="entrenador.clasesActivas.length > 2">...</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="abrirModalEntrenador(entrenador)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                      title="Editar entrenador"
                    >
                      <Edit :size="18" />
                    </button>
                    <button
                      @click="confirmarEliminar(entrenador)"
                      class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                      title="Eliminar entrenador"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="entrenadoresFiltrados.length === 0" class="text-center py-12">
            <div class="text-gray-500">
              <Users size="48" class="mx-auto mb-4 opacity-50" />
              <p class="text-lg font-medium">No se encontraron entrenadores</p>
              <p class="text-sm">Prueba ajustando los filtros o agrega un nuevo entrenador</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar entrenador -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModal"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            {{ entrenadorEditando ? 'Editar Entrenador' : 'Nuevo Entrenador' }}
          </h3>
          <button @click="cerrarModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarEntrenador" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre del entrenador *
              </label>
              <input
                v-model="formularioEntrenador.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nombre }"
                placeholder="Ej: Ana López"
              />
              <p v-if="errores.nombre" class="mt-1 text-sm text-red-600">{{ errores.nombre }}</p>
            </div>

            <!-- Especialidad -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad *</label>
              <select
                v-model="formularioEntrenador.especialidad"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.especialidad }"
              >
                <option value="">Seleccionar especialidad</option>
                <option
                  v-for="especialidad in especialidades"
                  :key="especialidad"
                  :value="especialidad"
                >
                  {{ especialidad }}
                </option>
              </select>
              <p v-if="errores.especialidad" class="mt-1 text-sm text-red-600">
                {{ errores.especialidad }}
              </p>
            </div>

            <!-- Experiencia -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Años de experiencia *
              </label>
              <input
                v-model.number="formularioEntrenador.experiencia"
                type="number"
                min="1"
                max="50"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.experiencia }"
                placeholder="Ej: 8"
              />
              <p v-if="errores.experiencia" class="mt-1 text-sm text-red-600">
                {{ errores.experiencia }}
              </p>
            </div>

            <!-- Clases activas -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Clases que imparte</label>
              <div class="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                <div
                  v-for="clase in clasesDisponibles"
                  :key="clase.nombre"
                  class="flex items-center"
                >
                  <input
                    :id="`clase-${clase.id}`"
                    v-model="formularioEntrenador.clasesActivas"
                    :value="clase.nombre"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label :for="`clase-${clase.id}`" class="ml-2 text-sm text-gray-700">
                    {{ clase.nombre }}
                  </label>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Selecciona las clases que este entrenador puede impartir
              </p>
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <textarea
              v-model="formularioEntrenador.descripcion"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errores.descripcion }"
              placeholder="Describe la experiencia, certificaciones y especialidades del entrenador..."
            ></textarea>
            <p v-if="errores.descripcion" class="mt-1 text-sm text-red-600">
              {{ errores.descripcion }}
            </p>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Imagen del entrenador</label
            >
            <ImageUpload
              v-model="formularioEntrenador.imagen"
              :preview="previsualizacionImagen"
              @update:preview="previsualizacionImagen = $event"
              placeholder="Seleccionar imagen del entrenador"
            />
          </div>

          <!-- Vista previa de la imagen -->
          <div v-if="previsualizacionImagen" class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Vista previa</label>
            <div class="flex items-center space-x-4">
              <img
                :src="previsualizacionImagen"
                alt="Vista previa"
                class="h-20 w-20 object-cover rounded-lg border border-gray-200"
              />
              <div class="text-sm text-gray-600">
                <p>Imagen seleccionada correctamente</p>
                <p class="text-xs">Se mostrará en la lista de entrenadores</p>
              </div>
            </div>
          </div>

          <!-- Botones del modal -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              @click="cerrarModal"
              class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="guardando"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ guardando ? 'Guardando...' : entrenadorEditando ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación para eliminación -->
    <div
      v-if="mostrarModalEliminacion"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cancelarEliminacion"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
            >
              <AlertTriangle :size="20" class="text-red-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
            </div>
          </div>
          <p class="text-gray-600 mb-6">
            ¿Estás seguro de que deseas eliminar al entrenador
            <strong>{{ entrenadorAEliminar?.nombre }}</strong
            >? Esta acción no se puede deshacer y puede afectar las clases asignadas.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="cancelarEliminacion"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="eliminarEntrenador"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, X, Users, AlertTriangle } from 'lucide-vue-next'
import ImageUpload from '@/components/common/ImageUpload.vue'
import { useAlert } from '@/composables/useGym'

// Composables
const { mostrarAlert } = useAlert()

// Estados reactivos
const entrenadores = ref([])
const clasesDisponibles = ref([])
const mostrarModal = ref(false)
const mostrarModalEliminacion = ref(false)
const entrenadorEditando = ref(null)
const entrenadorAEliminar = ref(null)
const guardando = ref(false)
const previsualizacionImagen = ref('')

// Filtros
const filtros = ref({
  nombre: '',
  especialidad: '',
  experiencia: '',
  clasesActivas: '',
})

// Formulario del entrenador
const formularioEntrenador = ref({
  nombre: '',
  especialidad: '',
  descripcion: '',
  experiencia: 1,
  imagen: '',
  clasesActivas: [],
})

// Errores de validación
const errores = ref({})

// Especialidades disponibles
const especialidades = ref(['Cardio', 'Fuerza', 'Funcional', 'Relajación'])

// Computed
const entrenadoresFiltrados = computed(() => {
  return entrenadores.value.filter((entrenador) => {
    const cumpleNombre =
      !filtros.value.nombre ||
      entrenador.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())

    const cumpleEspecialidad =
      !filtros.value.especialidad || entrenador.especialidad === filtros.value.especialidad

    const cumpleExperiencia =
      !filtros.value.experiencia ||
      (filtros.value.experiencia === 'junior' &&
        entrenador.experiencia >= 1 &&
        entrenador.experiencia <= 3) ||
      (filtros.value.experiencia === 'intermedio' &&
        entrenador.experiencia >= 4 &&
        entrenador.experiencia <= 7) ||
      (filtros.value.experiencia === 'senior' && entrenador.experiencia >= 8)

    const cumpleClasesActivas =
      !filtros.value.clasesActivas ||
      (entrenador.clasesActivas &&
        entrenador.clasesActivas.length >= parseInt(filtros.value.clasesActivas))

    return cumpleNombre && cumpleEspecialidad && cumpleExperiencia && cumpleClasesActivas
  })
})

// Métodos
const cargarEntrenadores = () => {
  const entrenadoresStorage = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')

  // Cargar entrenadores desde localStorage
  entrenadores.value = entrenadoresStorage
}

const cargarClases = () => {
  const clasesStorage = JSON.parse(localStorage.getItem('gym_clases') || '[]')
  clasesDisponibles.value = clasesStorage
}

const abrirModalEntrenador = (entrenador = null) => {
  entrenadorEditando.value = entrenador

  if (entrenador) {
    formularioEntrenador.value = {
      nombre: entrenador.nombre || '',
      especialidad: entrenador.especialidad || '',
      descripcion: entrenador.descripcion || '',
      experiencia: entrenador.experiencia || 1,
      imagen: entrenador.imagen || '',
      clasesActivas: entrenador.clasesActivas ? [...entrenador.clasesActivas] : [],
    }
    previsualizacionImagen.value = entrenador.imagen || ''
  } else {
    formularioEntrenador.value = {
      nombre: '',
      especialidad: '',
      descripcion: '',
      experiencia: 1,
      imagen: '',
      clasesActivas: [],
    }
    previsualizacionImagen.value = ''
  }

  errores.value = {}
  mostrarModal.value = true
}

const cerrarModal = () => {
  mostrarModal.value = false
  entrenadorEditando.value = null
  previsualizacionImagen.value = ''
  errores.value = {}
}

const validarFormulario = () => {
  errores.value = {}

  // Validar nombre
  if (!formularioEntrenador.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es obligatorio'
  }

  // Validar especialidad
  if (!formularioEntrenador.value.especialidad) {
    errores.value.especialidad = 'La especialidad es obligatoria'
  }

  // Validar descripción
  if (!formularioEntrenador.value.descripcion.trim()) {
    errores.value.descripcion = 'La descripción es obligatoria'
  } else if (formularioEntrenador.value.descripcion.length < 20) {
    errores.value.descripcion = 'La descripción debe tener al menos 20 caracteres'
  }

  // Validar experiencia
  if (!formularioEntrenador.value.experiencia || formularioEntrenador.value.experiencia < 1) {
    errores.value.experiencia = 'La experiencia debe ser al menos 1 año'
  } else if (formularioEntrenador.value.experiencia > 50) {
    errores.value.experiencia = 'La experiencia no puede ser mayor a 50 años'
  }

  return Object.keys(errores.value).length === 0
}

const guardarEntrenador = async () => {
  if (!validarFormulario()) return

  guardando.value = true

  try {
    const entrenadoresStorage = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')

    if (entrenadorEditando.value) {
      // Actualizar entrenador existente
      const index = entrenadoresStorage.findIndex((e) => e.id === entrenadorEditando.value.id)
      if (index !== -1) {
        entrenadoresStorage[index] = {
          ...entrenadoresStorage[index],
          ...formularioEntrenador.value,
        }
      }
      mostrarAlert('Entrenador actualizado exitosamente', 'success')
    } else {
      // Crear nuevo entrenador
      const nuevoEntrenador = {
        id: Date.now(),
        ...formularioEntrenador.value,
      }
      entrenadoresStorage.push(nuevoEntrenador)
      mostrarAlert('Entrenador creado exitosamente', 'success')
    }

    localStorage.setItem('gym_entrenadores', JSON.stringify(entrenadoresStorage))
    cargarEntrenadores()
    cerrarModal()
  } catch {
    mostrarAlert('Error al guardar el entrenador', 'error')
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = (entrenador) => {
  entrenadorAEliminar.value = entrenador
  mostrarModalEliminacion.value = true
}

const cancelarEliminacion = () => {
  entrenadorAEliminar.value = null
  mostrarModalEliminacion.value = false
}

const eliminarEntrenador = () => {
  try {
    const entrenadoresStorage = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')
    const entrenadoresFiltrados = entrenadoresStorage.filter(
      (e) => e.id !== entrenadorAEliminar.value.id,
    )

    localStorage.setItem('gym_entrenadores', JSON.stringify(entrenadoresFiltrados))
    cargarEntrenadores()

    mostrarAlert('Entrenador eliminado exitosamente', 'success')
    cancelarEliminacion()
  } catch {
    mostrarAlert('Error al eliminar el entrenador', 'error')
  }
}

const limpiarFiltros = () => {
  filtros.value = {
    nombre: '',
    especialidad: '',
    experiencia: '',
    clasesActivas: '',
  }
}

const getEspecialidadClass = (especialidad) => {
  switch (especialidad) {
    case 'Cardio':
      return 'bg-red-100 text-red-800'
    case 'Fuerza':
      return 'bg-blue-100 text-blue-800'
    case 'Funcional':
      return 'bg-green-100 text-green-800'
    case 'Relajación':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getExperienciaTexto = (experiencia) => {
  if (experiencia >= 1 && experiencia <= 3) return 'Junior'
  if (experiencia >= 4 && experiencia <= 7) return 'Intermedio'
  if (experiencia >= 8) return 'Senior'
  return 'N/A'
}

const getNivelExperiencia = (experiencia) => {
  if (experiencia >= 1 && experiencia <= 3) return 'Junior'
  if (experiencia >= 4 && experiencia <= 7) return 'Intermedio'
  if (experiencia >= 8) return 'Senior'
  return 'N/A'
}

const handleImageError = (event) => {
  event.target.src = '/img/coaches_icon/default.jpg'
}

// Lifecycle
onMounted(() => {
  cargarEntrenadores()
  cargarClases()
})
</script>
