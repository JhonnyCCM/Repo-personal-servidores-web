<template>
  <div class="classes-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Clases</h1>
            <p class="mt-2 text-gray-600">Administra las clases del gimnasio</p>
          </div>
          <button
            @click="abrirModalClase()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus :size="20" class="mr-2" />
            Nueva Clase
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

          <!-- Filtro por categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              v-model="filtros.categoria"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las categorías</option>
              <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>
          </div>

          <!-- Filtro por nivel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
            <select
              v-model="filtros.nivel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los niveles</option>
              <option v-for="nivel in niveles" :key="nivel" :value="nivel">
                {{ nivel }}
              </option>
            </select>
          </div>

          <!-- Filtro por entrenador -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Entrenador</label>
            <input
              v-model="filtros.entrenador"
              type="text"
              placeholder="Buscar entrenador..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button
            @click="resetFilters"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Tabla de clases -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Clase
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Entrenador
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Categoría/Nivel
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Horario
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cupos
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lugar
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estadísticas
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="clase in clasesFiltradas" :key="clase.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img
                        class="h-12 w-12 rounded-lg object-cover"
                        :src="clase.imagen"
                        :alt="clase.nombre"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ clase.nombre }}</div>
                      <div class="text-sm text-gray-500">{{ clase.duracion }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      v-if="getEntrenadorData(clase.entrenador)?.imagen"
                      class="flex-shrink-0 h-8 w-8 mr-3"
                    >
                      <img
                        class="h-8 w-8 rounded-full object-cover"
                        :src="getEntrenadorData(clase.entrenador).imagen"
                        :alt="clase.entrenador"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="text-sm text-gray-900">{{ clase.entrenador }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col gap-1">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ clase.categoria }}
                    </span>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getNivelColor(clase.nivel)"
                    >
                      {{ clase.nivel }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ clase.dias }}</div>
                  <div class="text-sm text-gray-500">{{ clase.horaInicio }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm" :class="getCuposClass(clase)">
                    {{ getCuposDisponibles(clase) }}/{{ clase.cuposTotal }}
                  </div>
                  <div class="text-xs text-gray-500">disponibles</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ clase.lugar }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3 text-sm">
                    <div class="flex items-center gap-1">
                      <Users :size="16" class="text-blue-500" />
                      <span>{{ clase.inscritos?.length || 0 }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Heart :size="16" class="text-red-500" />
                      <span>{{ clase.favoritos?.length || 0 }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="abrirModalClase(clase)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                      title="Editar clase"
                    >
                      <Edit :size="18" />
                    </button>
                    <button
                      @click="confirmarEliminar(clase)"
                      class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                      title="Eliminar clase"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="clasesFiltradas.length === 0" class="text-center py-12">
            <div class="text-gray-500">
              <Calendar size="48" class="mx-auto mb-4 opacity-50" />
              <p class="text-lg font-medium">No se encontraron clases</p>
              <p class="text-sm">Prueba ajustando los filtros o agrega una nueva clase</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar clase -->
    <div
      v-if="showModalClase"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModalClase"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ claseEditando ? 'Editar Clase' : 'Nueva Clase' }}
          </h3>
          <button
            @click="cerrarModalClase"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarClase" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la clase *
              </label>
              <input
                v-model="formularioClase.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nombre }"
                placeholder="Ej: Yoga Matutino"
              />
              <p v-if="errores.nombre" class="mt-1 text-sm text-red-600">{{ errores.nombre }}</p>
            </div>

            <!-- Entrenador -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Entrenador *</label>
              <select
                v-model="formularioClase.entrenador"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.entrenador }"
              >
                <option value="">Seleccionar entrenador</option>
                <option
                  v-for="entrenador in entrenadores"
                  :key="entrenador.id"
                  :value="entrenador.nombre"
                >
                  {{ entrenador.nombre }} - {{ entrenador.especialidad }}
                </option>
              </select>
              <p v-if="errores.entrenador" class="mt-1 text-sm text-red-600">
                {{ errores.entrenador }}
              </p>
            </div>

            <!-- Categoría -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
              <select
                v-model="formularioClase.categoria"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.categoria }"
              >
                <option value="">Seleccionar categoría</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                  {{ categoria }}
                </option>
              </select>
              <p v-if="errores.categoria" class="mt-1 text-sm text-red-600">
                {{ errores.categoria }}
              </p>
            </div>

            <!-- Nivel -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nivel *</label>
              <select
                v-model="formularioClase.nivel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nivel }"
              >
                <option value="">Seleccionar nivel</option>
                <option v-for="nivel in niveles" :key="nivel" :value="nivel">
                  {{ nivel }}
                </option>
              </select>
              <p v-if="errores.nivel" class="mt-1 text-sm text-red-600">{{ errores.nivel }}</p>
            </div>

            <!-- Días -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Días de la semana *</label
              >
              <input
                v-model="formularioClase.dias"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.dias }"
                placeholder="Ej: Lun, Mié, Vie"
              />
              <p v-if="errores.dias" class="mt-1 text-sm text-red-600">{{ errores.dias }}</p>
            </div>

            <!-- Hora -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hora de inicio *</label>
              <input
                v-model="formularioClase.horaInicio"
                type="time"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.horaInicio }"
              />
              <p v-if="errores.horaInicio" class="mt-1 text-sm text-red-600">
                {{ errores.horaInicio }}
              </p>
            </div>

            <!-- Duración -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duración *</label>
              <input
                v-model="formularioClase.duracion"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.duracion }"
                placeholder="Ej: 50 min"
              />
              <p v-if="errores.duracion" class="mt-1 text-sm text-red-600">
                {{ errores.duracion }}
              </p>
            </div>

            <!-- Cupos totales -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cupos totales *</label>
              <input
                v-model.number="formularioClase.cuposTotal"
                type="number"
                min="1"
                max="100"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.cuposTotal }"
                placeholder="Ej: 20"
              />
              <p v-if="errores.cuposTotal" class="mt-1 text-sm text-red-600">
                {{ errores.cuposTotal }}
              </p>
            </div>

            <!-- Lugar -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Lugar *</label>
              <input
                v-model="formularioClase.lugar"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.lugar }"
                placeholder="Ej: Sala de Yoga"
              />
              <p v-if="errores.lugar" class="mt-1 text-sm text-red-600">{{ errores.lugar }}</p>
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <textarea
              v-model="formularioClase.descripcion"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errores.descripcion }"
              placeholder="Describe la clase, sus objetivos y características..."
            ></textarea>
            <p v-if="errores.descripcion" class="mt-1 text-sm text-red-600">
              {{ errores.descripcion }}
            </p>
          </div>

          <!-- Upload de imagen -->
          <div>
            <ImageUpload
              v-model="formularioClase.imagen"
              label="Imagen de la clase"
              :required="true"
              :error="errores.imagen"
            />
          </div>

          <!-- Botones del formulario -->
          <div class="flex gap-3 pt-6 border-t">
            <button
              type="button"
              @click="cerrarModalClase"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="guardandoClase"
              class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {{ guardandoClase ? 'Guardando...' : claseEditando ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarConfirmModal"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-lg p-6 max-w-md w-full shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
          >
            <AlertTriangle :size="20" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
        </div>

        <p class="text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar la clase
          <strong>"{{ claseSeleccionada?.nombre }}"</strong>? <br /><br />
          <span class="text-sm text-red-600">
            Los {{ claseSeleccionada?.inscritos?.length || 0 }} usuarios inscritos perderán su
            inscripción.
          </span>
        </p>

        <div class="flex gap-3">
          <button
            @click="cerrarConfirmModal"
            class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmarEliminarClase"
            class="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Componente global de alertas -->
    <GlobalAlert />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, Users, Heart, Calendar, X, AlertTriangle } from 'lucide-vue-next'
import {
  useAlert,
  updateClassesLocalStorage,
  loadClassesFromStorage,
  getCuposDisponibles,
  getCuposClass,
  getNivelColor,
} from '@/composables/useGym'
import ImageUpload from '@/components/common/ImageUpload.vue'
import GlobalAlert from '@/components/common/GlobalAlert.vue'

// Composables
const { mostrarAlert } = useAlert()

// Datos estáticos
const categorias = ['Cardio', 'Fuerza', 'Funcional', 'Acuático', 'Relajación']
const niveles = ['Principiante', 'Intermedio', 'Avanzado']

// Estados reactivos
const entrenadores = ref([])
const filtros = ref({
  nombre: '',
  categoria: '',
  nivel: '',
  entrenador: '',
})

const showConfirmModal = ref(false)
const showModalClase = ref(false)
const claseSeleccionada = ref(null)
const claseEditando = ref(null)
const guardandoClase = ref(false)

const formularioClase = ref({
  nombre: '',
  categoria: '',
  entrenador: '',
  descripcion: '',
  dias: '',
  horaInicio: '',
  duracion: '',
  cuposTotal: 20,
  lugar: '',
  nivel: '',
  imagen: '',
})

const errores = ref({})

// Datos de clases (se carga desde localStorage)
const clases = ref([])

// Cargar clases desde localStorage o usar datos por defecto
onMounted(() => {
  cargarEntrenadores()
  const clasesGuardadas = loadClassesFromStorage()
  if (clasesGuardadas && clasesGuardadas.length > 0) {
    clases.value = clasesGuardadas
    // Migrar datos antiguos si no tienen las propiedades necesarias
    clases.value.forEach((clase) => {
      if (!clase.inscritos) clase.inscritos = []
      if (!clase.favoritos) clase.favoritos = []
    })
    updateClassesLocalStorage(clases.value)
  } else {
    // Inicializar con array vacío
    clases.value = []
    updateClassesLocalStorage(clases.value)
  }
})

// Computed para filtrar clases
const clasesFiltradas = computed(() => {
  return clases.value.filter((c) => {
    const nombreMatch =
      !filtros.value.nombre || c.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())
    const catMatch = !filtros.value.categoria || c.categoria === filtros.value.categoria
    const nivMatch = !filtros.value.nivel || c.nivel === filtros.value.nivel
    const entrenadorMatch =
      !filtros.value.entrenador ||
      c.entrenador.toLowerCase().includes(filtros.value.entrenador.toLowerCase())
    return nombreMatch && catMatch && nivMatch && entrenadorMatch
  })
})

// Métodos
function cargarEntrenadores() {
  const entrenadoresStorage = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')
  entrenadores.value = entrenadoresStorage
}

function actualizarClasesEntrenador() {
  const entrenadoresStorage = JSON.parse(localStorage.getItem('gym_entrenadores') || '[]')

  // Actualizar las clases activas de cada entrenador basado en las clases existentes
  entrenadoresStorage.forEach((entrenador) => {
    const clasesDelEntrenador = clases.value
      .filter((clase) => clase.entrenador === entrenador.nombre)
      .map((clase) => clase.nombre)

    entrenador.clasesActivas = clasesDelEntrenador
  })

  localStorage.setItem('gym_entrenadores', JSON.stringify(entrenadoresStorage))
  entrenadores.value = entrenadoresStorage
}

function resetFilters() {
  filtros.value = {
    nombre: '',
    categoria: '',
    nivel: '',
    entrenador: '',
  }
}

// Función para obtener datos del entrenador
function getEntrenadorData(nombreEntrenador) {
  return entrenadores.value.find((e) => e.nombre === nombreEntrenador)
}

// Función para manejar errores de imagen
function handleImageError(event) {
  event.target.src = '/img/banner/gym1.jpeg' // Imagen de fallback
}

// Función para abrir modal de clase (crear o editar)
function abrirModalClase(clase = null) {
  claseEditando.value = clase

  if (clase) {
    // Modo edición - llenar formulario con datos existentes
    formularioClase.value = {
      nombre: clase.nombre,
      categoria: clase.categoria,
      entrenador: clase.entrenador,
      descripcion: clase.descripcion,
      dias: clase.dias,
      horaInicio: clase.horaInicio,
      duracion: clase.duracion,
      cuposTotal: clase.cuposTotal,
      lugar: clase.lugar,
      nivel: clase.nivel,
      imagen: clase.imagen,
    }
  } else {
    // Modo creación - limpiar formulario
    formularioClase.value = {
      nombre: '',
      categoria: '',
      entrenador: '',
      descripcion: '',
      dias: '',
      horaInicio: '',
      duracion: '',
      cuposTotal: 20,
      lugar: '',
      nivel: '',
      imagen: '',
    }
  }

  errores.value = {}
  showModalClase.value = true
}

// Función para cerrar modal de clase
function cerrarModalClase() {
  showModalClase.value = false
  claseEditando.value = null
  errores.value = {}
}

// Función para validar formulario
function validarFormulario() {
  errores.value = {}

  if (!formularioClase.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es requerido'
  }

  if (!formularioClase.value.entrenador.trim()) {
    errores.value.entrenador = 'El entrenador es requerido'
  }

  if (!formularioClase.value.categoria) {
    errores.value.categoria = 'La categoría es requerida'
  }

  if (!formularioClase.value.nivel) {
    errores.value.nivel = 'El nivel es requerido'
  }

  if (!formularioClase.value.dias.trim()) {
    errores.value.dias = 'Los días son requeridos'
  }

  if (!formularioClase.value.horaInicio) {
    errores.value.horaInicio = 'La hora de inicio es requerida'
  }

  if (!formularioClase.value.duracion.trim()) {
    errores.value.duracion = 'La duración es requerida'
  }

  if (!formularioClase.value.cuposTotal || formularioClase.value.cuposTotal < 1) {
    errores.value.cuposTotal = 'Los cupos totales deben ser mayor a 0'
  }

  if (!formularioClase.value.lugar.trim()) {
    errores.value.lugar = 'El lugar es requerido'
  }

  if (!formularioClase.value.imagen) {
    errores.value.imagen = 'La imagen es requerida'
  }

  if (!formularioClase.value.descripcion.trim()) {
    errores.value.descripcion = 'La descripción es requerida'
  }

  return Object.keys(errores.value).length === 0
}

// Función para guardar clase (crear o actualizar)
function guardarClase() {
  if (!validarFormulario()) {
    mostrarAlert('Por favor corrige los errores en el formulario', 'error')
    return
  }

  guardandoClase.value = true

  // Simular un pequeño delay para mostrar el estado de guardando
  setTimeout(() => {
    try {
      if (claseEditando.value) {
        // Modo edición - actualizar clase existente
        const index = clases.value.findIndex((c) => c.id === claseEditando.value.id)
        if (index !== -1) {
          // Mantener datos como inscritos y favoritos
          const claseActualizada = {
            ...claseEditando.value,
            ...formularioClase.value,
            // Asegurar que los cupos no sean menores a los inscritos actuales
            cuposTotal: Math.max(
              formularioClase.value.cuposTotal,
              claseEditando.value.inscritos?.length || 0,
            ),
          }
          clases.value[index] = claseActualizada
          updateClassesLocalStorage(clases.value)

          // Actualizar las clases del entrenador
          actualizarClasesEntrenador()

          mostrarAlert('Clase actualizada exitosamente', 'success')
        }
      } else {
        // Modo creación - agregar nueva clase
        const nuevaClase = {
          id: Date.now(), // Simple ID generator
          ...formularioClase.value,
          inscritos: [],
          favoritos: [],
        }
        clases.value.push(nuevaClase)
        updateClassesLocalStorage(clases.value)

        // Actualizar las clases del entrenador
        actualizarClasesEntrenador()

        mostrarAlert('Clase creada exitosamente', 'success')
      }

      cerrarModalClase()
    } catch (error) {
      mostrarAlert('Error al guardar la clase', 'error')
      console.error('Error al guardar clase:', error)
    } finally {
      guardandoClase.value = false
    }
  }, 500)
}

// Función para confirmar eliminación
function confirmarEliminar(clase) {
  claseSeleccionada.value = clase
  showConfirmModal.value = true
}

// Función para cerrar modal de confirmación
function cerrarConfirmModal() {
  showConfirmModal.value = false
  claseSeleccionada.value = null
}

// Función para confirmar eliminación de clase
function confirmarEliminarClase() {
  if (claseSeleccionada.value) {
    const index = clases.value.findIndex((c) => c.id === claseSeleccionada.value.id)
    if (index !== -1) {
      clases.value.splice(index, 1)
      updateClassesLocalStorage(clases.value)

      // Actualizar las clases del entrenador
      actualizarClasesEntrenador()

      mostrarAlert(`Clase "${claseSeleccionada.value.nombre}" eliminada exitosamente`, 'success')
    }
  }
  cerrarConfirmModal()
}
</script>

<style scoped>
/* Estilos personalizados para la vista de admin */

/* Animaciones para los modales */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.transform.transition-all {
  animation: fadeIn 0.3s ease-out;
}
</style>
