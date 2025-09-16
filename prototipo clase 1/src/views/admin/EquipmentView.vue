<template>
  <div class="equipment-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Equipos</h1>
            <p class="mt-2 text-gray-600">Administra los equipos del gimnasio</p>
          </div>
          <button
            @click="abrirModalEquipo()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus :size="20" class="mr-2" />
            Nuevo Equipo
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

          <!-- Filtro por tipo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              v-model="filtros.tipo"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option v-for="tipo in tiposEquipo" :key="tipo" :value="tipo">
                {{ tipo }}
              </option>
            </select>
          </div>

          <!-- Filtro por disponibilidad -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Disponibilidad</label>
            <select
              v-model="filtros.disponibilidad"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las disponibilidades</option>
              <option value="Disponible">Disponible</option>
              <option value="Ocupada">Ocupada</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <!-- Filtro por zona -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Zona</label>
            <input
              v-model="filtros.zona"
              type="text"
              placeholder="Buscar por zona..."
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

      <!-- Tabla de equipos -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Equipo
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Zona
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Disponibilidad
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Favoritos
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="equipo in equiposFiltrados" :key="equipo.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img
                        class="h-12 w-12 rounded-lg object-cover"
                        :src="equipo.imagen"
                        :alt="equipo.nombre"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ equipo.nombre }}</div>
                      <div class="text-sm text-gray-500">{{ equipo.descripcion || 'N/A' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ equipo.tipo }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ equipo.zona || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getDisponibilidadClass(equipo.disponibilidad)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ equipo.disponibilidad }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ equipo.favoritos ? equipo.favoritos.length : 0 }} usuarios
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="abrirModalEquipo(equipo)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                      title="Editar equipo"
                    >
                      <Edit :size="18" />
                    </button>
                    <button
                      @click="confirmarEliminar(equipo)"
                      class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                      title="Eliminar equipo"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="equiposFiltrados.length === 0" class="text-center py-12">
            <div class="text-gray-500">
              <Settings size="48" class="mx-auto mb-4 opacity-50" />
              <p class="text-lg font-medium">No se encontraron equipos</p>
              <p class="text-sm">Prueba ajustando los filtros o agrega un nuevo equipo</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar equipo -->
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
            {{ equipoEditando ? 'Editar Equipo' : 'Nuevo Equipo' }}
          </h3>
          <button @click="cerrarModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarEquipo" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre del equipo *
              </label>
              <input
                v-model="formularioEquipo.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nombre }"
                placeholder="Ej: Caminadora Pro"
              />
              <p v-if="errores.nombre" class="mt-1 text-sm text-red-600">{{ errores.nombre }}</p>
            </div>

            <!-- Tipo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
              <select
                v-model="formularioEquipo.tipo"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.tipo }"
              >
                <option value="">Seleccionar tipo</option>
                <option v-for="tipo in tiposEquipo" :key="tipo" :value="tipo">
                  {{ tipo }}
                </option>
              </select>
              <p v-if="errores.tipo" class="mt-1 text-sm text-red-600">{{ errores.tipo }}</p>
            </div>

            <!-- Zona -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Zona *</label>
              <input
                v-model="formularioEquipo.zona"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.zona }"
                placeholder="Ej: Área Cardio, Sala Principal"
              />
              <p v-if="errores.zona" class="mt-1 text-sm text-red-600">{{ errores.zona }}</p>
            </div>

            <!-- Disponibilidad -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Disponibilidad *</label>
              <select
                v-model="formularioEquipo.disponibilidad"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.disponibilidad }"
              >
                <option value="">Seleccionar disponibilidad</option>
                <option value="Disponible">Disponible</option>
                <option value="Ocupada">Ocupada</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
              <p v-if="errores.disponibilidad" class="mt-1 text-sm text-red-600">
                {{ errores.disponibilidad }}
              </p>
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              v-model="formularioEquipo.descripcion"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción del equipo, especificaciones, etc."
            ></textarea>
          </div>

          <!-- Imagen -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen del equipo</label>
            <ImageUpload
              v-model="formularioEquipo.imagen"
              :preview="previsualizacionImagen"
              @update:preview="previsualizacionImagen = $event"
              placeholder="Seleccionar imagen del equipo"
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
                <p class="text-xs">Se mostrará en la lista de equipos</p>
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
              {{ guardando ? 'Guardando...' : equipoEditando ? 'Actualizar' : 'Crear' }}
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
            ¿Estás seguro de que deseas eliminar el equipo
            <strong>{{ equipoAEliminar?.nombre }}</strong
            >? Esta acción no se puede deshacer.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="cancelarEliminacion"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="eliminarEquipo"
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
import { Plus, Edit, Trash2, X, Settings, AlertTriangle } from 'lucide-vue-next'
import ImageUpload from '@/components/common/ImageUpload.vue'
import { useAlert } from '@/composables/useGym'

// Composables
const { mostrarAlert } = useAlert()

// Estados reactivos
const equipos = ref([])
const mostrarModal = ref(false)
const mostrarModalEliminacion = ref(false)
const equipoEditando = ref(null)
const equipoAEliminar = ref(null)
const guardando = ref(false)
const previsualizacionImagen = ref('')

// Filtros
const filtros = ref({
  nombre: '',
  tipo: '',
  disponibilidad: '',
  zona: '',
})

// Formulario del equipo
const formularioEquipo = ref({
  nombre: '',
  tipo: '',
  zona: '',
  disponibilidad: 'Disponible',
  descripcion: '',
  imagen: '',
})

// Errores de validación
const errores = ref({})

// Tipos de equipos disponibles
const tiposEquipo = ref(['Cardio', 'Fuerza', 'Funcional', 'Flexibilidad'])

// Computed
const equiposFiltrados = computed(() => {
  return equipos.value.filter((equipo) => {
    const cumpleNombre =
      !filtros.value.nombre ||
      equipo.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())

    const cumpleTipo = !filtros.value.tipo || equipo.tipo === filtros.value.tipo

    const cumpleDisponibilidad =
      !filtros.value.disponibilidad || equipo.disponibilidad === filtros.value.disponibilidad

    const cumpleZona =
      !filtros.value.zona ||
      (equipo.zona && equipo.zona.toLowerCase().includes(filtros.value.zona.toLowerCase()))

    return cumpleNombre && cumpleTipo && cumpleDisponibilidad && cumpleZona
  })
})

// Métodos
const cargarEquipos = () => {
  const equiposStorage = JSON.parse(localStorage.getItem('gym_maquinas') || '[]')

  // Cargar equipos desde localStorage
  equipos.value = equiposStorage

  // Extraer tipos únicos de los equipos existentes y combinar con los predefinidos
  const tiposExistentes = [...new Set(equipos.value.map((equipo) => equipo.tipo).filter(Boolean))]
  const tiposPredefinidos = ['Cardio', 'Fuerza', 'Funcional', 'Flexibilidad']
  const todosLosTipos = [...new Set([...tiposPredefinidos, ...tiposExistentes])]
  tiposEquipo.value = todosLosTipos.sort()
}

const abrirModalEquipo = (equipo = null) => {
  equipoEditando.value = equipo

  if (equipo) {
    formularioEquipo.value = {
      nombre: equipo.nombre || '',
      tipo: equipo.tipo || '',
      zona: equipo.zona || '',
      disponibilidad: equipo.disponibilidad || 'Disponible',
      descripcion: equipo.descripcion || '',
      imagen: equipo.imagen || '',
    }
    previsualizacionImagen.value = equipo.imagen || ''
  } else {
    formularioEquipo.value = {
      nombre: '',
      tipo: '',
      zona: '',
      disponibilidad: 'Disponible',
      descripcion: '',
      imagen: '',
    }
    previsualizacionImagen.value = ''
  }

  errores.value = {}
  mostrarModal.value = true
}

const cerrarModal = () => {
  mostrarModal.value = false
  equipoEditando.value = null
  previsualizacionImagen.value = ''
  errores.value = {}
}

const validarFormulario = () => {
  errores.value = {}

  // Validar nombre
  if (!formularioEquipo.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es obligatorio'
  }

  // Validar tipo
  if (!formularioEquipo.value.tipo) {
    errores.value.tipo = 'El tipo es obligatorio'
  }

  // Validar zona
  if (!formularioEquipo.value.zona.trim()) {
    errores.value.zona = 'La zona es obligatoria'
  }

  // Validar disponibilidad
  if (!formularioEquipo.value.disponibilidad) {
    errores.value.disponibilidad = 'La disponibilidad es obligatoria'
  }

  return Object.keys(errores.value).length === 0
}

const guardarEquipo = async () => {
  if (!validarFormulario()) return

  guardando.value = true

  try {
    const equiposStorage = JSON.parse(localStorage.getItem('gym_maquinas') || '[]')

    if (equipoEditando.value) {
      // Actualizar equipo existente
      const index = equiposStorage.findIndex((e) => e.id === equipoEditando.value.id)
      if (index !== -1) {
        equiposStorage[index] = {
          ...equiposStorage[index],
          ...formularioEquipo.value,
          favoritos: equiposStorage[index].favoritos || [], // Preservar favoritos
        }
      }
      mostrarAlert('Equipo actualizado exitosamente', 'success')
    } else {
      // Crear nuevo equipo
      const nuevoEquipo = {
        id: Date.now(),
        ...formularioEquipo.value,
        favoritos: [], // Inicializar array de favoritos vacío
      }
      equiposStorage.push(nuevoEquipo)
      mostrarAlert('Equipo creado exitosamente', 'success')
    }

    localStorage.setItem('gym_maquinas', JSON.stringify(equiposStorage))
    cargarEquipos()
    cerrarModal()
  } catch {
    mostrarAlert('Error al guardar el equipo', 'error')
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = (equipo) => {
  equipoAEliminar.value = equipo
  mostrarModalEliminacion.value = true
}

const cancelarEliminacion = () => {
  equipoAEliminar.value = null
  mostrarModalEliminacion.value = false
}

const eliminarEquipo = () => {
  try {
    const equiposStorage = JSON.parse(localStorage.getItem('gym_maquinas') || '[]')
    const equiposFiltrados = equiposStorage.filter((e) => e.id !== equipoAEliminar.value.id)

    localStorage.setItem('gym_maquinas', JSON.stringify(equiposFiltrados))
    cargarEquipos()

    mostrarAlert('Equipo eliminado exitosamente', 'success')
    cancelarEliminacion()
  } catch {
    mostrarAlert('Error al eliminar el equipo', 'error')
  }
}

const limpiarFiltros = () => {
  filtros.value = {
    nombre: '',
    tipo: '',
    disponibilidad: '',
    zona: '',
  }
}

const getDisponibilidadClass = (disponibilidad) => {
  switch (disponibilidad) {
    case 'Disponible':
      return 'bg-green-100 text-green-800'
    case 'Ocupada':
      return 'bg-yellow-100 text-yellow-800'
    case 'Mantenimiento':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleImageError = (event) => {
  event.target.src = '/img/training_icon/default.jpg'
}

// Lifecycle
onMounted(() => {
  cargarEquipos()
})
</script>
