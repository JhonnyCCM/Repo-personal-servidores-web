<template>
  <div class="members-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Miembros</h1>
            <p class="mt-2 text-gray-600">Administra los miembros del gimnasio</p>
          </div>
          <button
            @click="abrirModalMiembro()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus :size="20" class="mr-2" />
            Nuevo Miembro
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

          <!-- Filtro por correo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Correo</label>
            <input
              v-model="filtros.correo"
              type="text"
              placeholder="Buscar por correo..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Filtro por estado -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              v-model="filtros.estado"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>

          <!-- Filtro por plan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Plan</label>
            <select
              v-model="filtros.plan"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los planes</option>
              <option v-for="plan in planesDisponibles" :key="plan.id" :value="plan.nombre">
                {{ plan.nombre }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botones de acción para filtros -->
        <div class="flex justify-end mt-4 space-x-2">
          <button
            @click="limpiarFiltros"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Tabla de miembros -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Lista de Miembros ({{ miembrosFiltrados.length }})
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Miembro
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contacto
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Plan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Registro
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="miembro in miembrosFiltrados" :key="miembro.id" class="hover:bg-gray-50">
                <!-- Info del miembro -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold bg-blue-500"
                      >
                        {{ miembro.nombreCompleto.charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ miembro.nombreCompleto }}
                      </div>
                      <div class="text-sm text-gray-500">ID: {{ miembro.id }}</div>
                    </div>
                  </div>
                </td>

                <!-- Contacto -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ miembro.correo }}</div>
                  <div class="text-sm text-gray-500">{{ miembro.cedula || 'N/A' }}</div>
                </td>

                <!-- Plan -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    v-if="miembro.plan || miembro.planActual"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {{ miembro.plan || miembro.planActual || 'Sin plan' }}
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    Sin plan
                  </span>
                </td>

                <!-- Estado -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getEstadoClass(miembro.estado)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ miembro.estado }}
                  </span>
                </td>

                <!-- Fecha de registro -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatearFecha(miembro.fechaRegistro) }}
                </td>

                <!-- Acciones -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="abrirModalMiembro(miembro)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Editar miembro"
                    >
                      <Edit :size="16" />
                    </button>
                    <button
                      @click="confirmarEliminacion(miembro)"
                      class="text-red-600 hover:text-red-900 p-1 rounded"
                      title="Eliminar miembro"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Mensaje cuando no hay miembros -->
              <tr v-if="miembrosFiltrados.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <Users :size="48" class="text-gray-300 mb-4" />
                    <p class="text-lg font-medium">No se encontraron miembros</p>
                    <p class="text-sm">Intenta ajustar los filtros o agrega un nuevo miembro</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para crear/editar miembro -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModal"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header del modal -->
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ miembroEditando ? 'Editar Miembro' : 'Nuevo Miembro' }}
            </h2>
            <button @click="cerrarModal" class="text-gray-400 hover:text-gray-600 p-1">
              <X :size="20" />
            </button>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="guardarMiembro" class="space-y-4">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input
                v-model="formularioMiembro.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nombre }"
                placeholder="Ej: Juan"
              />
              <p v-if="errores.nombre" class="mt-1 text-sm text-red-600">{{ errores.nombre }}</p>
            </div>

            <!-- Apellido -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
              <input
                v-model="formularioMiembro.apellido"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.apellido }"
                placeholder="Ej: Pérez"
              />
              <p v-if="errores.apellido" class="mt-1 text-sm text-red-600">
                {{ errores.apellido }}
              </p>
            </div>

            <!-- Correo electrónico -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                v-model="formularioMiembro.correo"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.correo }"
                placeholder="ejemplo@correo.com"
              />
              <p v-if="errores.correo" class="mt-1 text-sm text-red-600">{{ errores.correo }}</p>
            </div>

            <!-- Contraseña (solo para nuevos miembros) -->
            <div v-if="!miembroEditando">
              <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña *</label>
              <input
                v-model="formularioMiembro.password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.password }"
                placeholder="••••••••"
              />
              <p v-if="errores.password" class="mt-1 text-sm text-red-600">
                {{ errores.password }}
              </p>
            </div>

            <!-- Plan de Membresía -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Plan de Membresía</label>
              <select
                v-model="formularioMiembro.plan"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sin plan asignado</option>
                <option v-for="plan in planesDisponibles" :key="plan.id" :value="plan.nombre">
                  {{ plan.nombre }}
                  <span v-if="plan.precio === 0"> - GRATIS</span>
                  <span v-else> - ${{ plan.precio }}</span>
                </option>
              </select>
            </div>

            <!-- Estado -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                v-model="formularioMiembro.estado"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>

            <!-- Fecha de vencimiento (solo para miembros con plan de pago) -->
            <div v-if="formularioMiembro.plan && planSeleccionado && planSeleccionado.precio > 0">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento del Plan
              </label>
              <input
                v-model="formularioMiembro.fechaVencimiento"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Botones del modal -->
            <div class="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                @click="cerrarModal"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="guardando"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {{ guardando ? 'Guardando...' : miembroEditando ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
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
            ¿Estás seguro de que deseas eliminar al miembro
            <strong>{{ miembroAEliminar?.nombreCompleto }}</strong
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
              @click="eliminarMiembro"
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
import { useAlert, loadUsersFromStorage, updateUsersLocalStorage } from '@/composables/useGym'

// Composables
const { mostrarAlert } = useAlert()

// Estados reactivos
const miembros = ref([])
const planesDisponibles = ref([])
const mostrarModal = ref(false)
const mostrarModalEliminacion = ref(false)
const miembroEditando = ref(null)
const miembroAEliminar = ref(null)
const guardando = ref(false)

// Filtros
const filtros = ref({
  nombre: '',
  correo: '',
  estado: '',
  plan: '',
})

// Formulario del miembro
const formularioMiembro = ref({
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  estado: 'activo',
  plan: '',
  fechaVencimiento: '',
})

// Errores de validación
const errores = ref({})

// Computed para plan seleccionado
const planSeleccionado = computed(() => {
  if (!formularioMiembro.value.plan) return null
  return planesDisponibles.value.find((p) => p.nombre === formularioMiembro.value.plan)
})

// Computed
const miembrosFiltrados = computed(() => {
  return miembros.value.filter((miembro) => {
    const cumpleNombre =
      !filtros.value.nombre ||
      miembro.nombreCompleto.toLowerCase().includes(filtros.value.nombre.toLowerCase())

    const cumpleCorreo =
      !filtros.value.correo ||
      miembro.correo.toLowerCase().includes(filtros.value.correo.toLowerCase())

    const cumpleEstado = !filtros.value.estado || miembro.estado === filtros.value.estado

    // Actualizar para que funcione con ambos campos de plan
    const planMiembro = miembro.plan || miembro.planActual || ''
    const cumplePlan = !filtros.value.plan || planMiembro === filtros.value.plan

    return cumpleNombre && cumpleCorreo && cumpleEstado && cumplePlan
  })
})

// Métodos
const cargarMiembros = () => {
  const usuarios = loadUsersFromStorage()
  // Filtrar solo usuarios que no sean administradores
  miembros.value = usuarios.filter((usuario) => usuario.rol !== 'admin')
}

const cargarPlanes = () => {
  const planes = JSON.parse(localStorage.getItem('gym_planes') || '[]')
  // Cargar todos los planes disponibles, no solo los activos
  planesDisponibles.value = planes
}

const abrirModalMiembro = (miembro = null) => {
  miembroEditando.value = miembro

  if (miembro) {
    formularioMiembro.value = {
      nombre: miembro.nombre || '',
      apellido: miembro.apellido || '',
      correo: miembro.correo || '',
      password: '', // No mostramos la contraseña actual
      estado: miembro.estado || 'activo',
      plan: miembro.plan || miembro.planActual || '',
      fechaVencimiento: miembro.fechaVencimiento || '',
    }
  } else {
    formularioMiembro.value = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      estado: 'activo',
      plan: '',
      fechaVencimiento: '',
    }
  }

  errores.value = {}
  mostrarModal.value = true
}

const cerrarModal = () => {
  mostrarModal.value = false
  miembroEditando.value = null
  errores.value = {}
}

const validarFormulario = () => {
  errores.value = {}

  // Validar nombre
  if (!formularioMiembro.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es obligatorio'
  }

  // Validar apellido
  if (!formularioMiembro.value.apellido.trim()) {
    errores.value.apellido = 'El apellido es obligatorio'
  }

  // Validar correo
  if (!formularioMiembro.value.correo.trim()) {
    errores.value.correo = 'El correo electrónico es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formularioMiembro.value.correo)) {
    errores.value.correo = 'El formato del correo no es válido'
  } else {
    // Verificar si el correo ya existe (solo para nuevos usuarios o si cambió el correo)
    const usuarios = loadUsersFromStorage()
    const correoExiste = usuarios.some(
      (u) =>
        u.correo === formularioMiembro.value.correo &&
        (!miembroEditando.value || u.id !== miembroEditando.value.id),
    )
    if (correoExiste) {
      errores.value.correo = 'Este correo ya está registrado'
    }
  }

  // Validar rol - no requerido ya que siempre será 'user'
  // Ya no es necesario validar el rol

  // Validar contraseña (solo para nuevos miembros)
  if (!miembroEditando.value && !formularioMiembro.value.password.trim()) {
    errores.value.password = 'La contraseña es obligatoria'
  } else if (!miembroEditando.value && formularioMiembro.value.password.length < 6) {
    errores.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  return Object.keys(errores.value).length === 0
}

const guardarMiembro = async () => {
  if (!validarFormulario()) return

  guardando.value = true

  try {
    const usuarios = loadUsersFromStorage()

    if (miembroEditando.value) {
      // Actualizar miembro existente
      const index = usuarios.findIndex((u) => u.id === miembroEditando.value.id)
      if (index !== -1) {
        const nombreCompleto = `${formularioMiembro.value.nombre.trim()} ${formularioMiembro.value.apellido.trim()}`
        const planSeleccionado = formularioMiembro.value.plan || 'Plan Básico'

        // Buscar el ID del plan seleccionado
        const planEncontrado = planesDisponibles.value.find((p) => p.nombre === planSeleccionado)

        usuarios[index] = {
          ...usuarios[index],
          nombre: formularioMiembro.value.nombre.trim(),
          apellido: formularioMiembro.value.apellido.trim(),
          nombreCompleto,
          correo: formularioMiembro.value.correo.trim(),
          estado: formularioMiembro.value.estado,
          plan: planSeleccionado,
          planActual: planSeleccionado,
          planActivo: planEncontrado ? planEncontrado.id : null,
          fechaVencimiento: formularioMiembro.value.fechaVencimiento || null,
          fechaActualizacionPlan: new Date().toISOString(),
        }
        // No actualizar password si está vacío
        if (formularioMiembro.value.password) {
          usuarios[index].password = formularioMiembro.value.password
        }
      }
      mostrarAlert('Miembro actualizado exitosamente', 'success')
    } else {
      // Crear nuevo miembro
      const nombreCompleto = `${formularioMiembro.value.nombre.trim()} ${formularioMiembro.value.apellido.trim()}`
      const planSeleccionado = formularioMiembro.value.plan || 'Plan Básico'

      // Buscar el ID del plan seleccionado
      const planEncontrado = planesDisponibles.value.find((p) => p.nombre === planSeleccionado)

      const nuevoMiembro = {
        id: Date.now().toString(),
        nombre: formularioMiembro.value.nombre.trim(),
        apellido: formularioMiembro.value.apellido.trim(),
        nombreCompleto,
        correo: formularioMiembro.value.correo.trim(),
        password: formularioMiembro.value.password,
        rol: 'user', // Siempre será usuario
        estado: formularioMiembro.value.estado,
        fechaRegistro: new Date().toISOString(),
        tipo: 'estudiante',
        cedula: formularioMiembro.value.correo.includes('@uleam.edu.ec')
          ? formularioMiembro.value.correo.slice(1, 11)
          : null,
        plan: planSeleccionado,
        planActual: planSeleccionado,
        planActivo: planEncontrado ? planEncontrado.id : null,
        fechaVencimiento: formularioMiembro.value.fechaVencimiento || null,
        fechaActualizacionPlan: new Date().toISOString(),
      }
      usuarios.push(nuevoMiembro)
      mostrarAlert('Miembro creado exitosamente', 'success')
    }

    updateUsersLocalStorage(usuarios)
    cargarMiembros()
    cerrarModal()
  } catch {
    mostrarAlert('Error al guardar el miembro', 'error')
  } finally {
    guardando.value = false
  }
}

const confirmarEliminacion = (miembro) => {
  miembroAEliminar.value = miembro
  mostrarModalEliminacion.value = true
}

const cancelarEliminacion = () => {
  miembroAEliminar.value = null
  mostrarModalEliminacion.value = false
}

const eliminarMiembro = () => {
  try {
    const usuarios = loadUsersFromStorage()
    const usuariosFiltrados = usuarios.filter((u) => u.id !== miembroAEliminar.value.id)

    updateUsersLocalStorage(usuariosFiltrados)
    cargarMiembros()

    mostrarAlert('Miembro eliminado exitosamente', 'success')
    cancelarEliminacion()
  } catch {
    mostrarAlert('Error al eliminar el miembro', 'error')
  }
}

const limpiarFiltros = () => {
  filtros.value = {
    nombre: '',
    correo: '',
    estado: '',
    plan: '',
  }
}

const getEstadoClass = (estado) => {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-800'
    case 'inactivo':
      return 'bg-gray-100 text-gray-800'
    case 'suspendido':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Lifecycle
onMounted(() => {
  cargarMiembros()
  cargarPlanes()
})
</script>
