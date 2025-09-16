<template>
  <div class="plans-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Planes</h1>
            <p class="mt-2 text-gray-600">Administra los planes de membresía del gimnasio</p>
          </div>
          <button
            @click="abrirModalPlan()"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus :size="20" class="mr-2" />
            Nuevo Plan
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

          <!-- Filtro por precio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Plan</label>
            <select
              v-model="filtros.tipo"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="gratuito">Gratuitos</option>
              <option value="pago">De pago</option>
            </select>
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
              <option value="destacado">Destacado</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <!-- Filtro por precio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Precio máximo</label>
            <input
              v-model.number="filtros.precioMax"
              type="number"
              min="0"
              placeholder="Ej: 100"
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

      <!-- Tabla de planes -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
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
                  Precio
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ventajas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Suscriptores
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="plan in planesFiltrados" :key="plan.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-0">
                      <div class="text-sm font-medium text-gray-900">{{ plan.nombre }}</div>
                      <div class="text-sm text-gray-500">{{ plan.descripcion }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getEstadoClass(plan.estado)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ getEstadoTexto(plan.estado) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ plan.precio === 0 ? 'Gratuito' : `$${plan.precio}` }}
                  </div>
                  <div class="text-sm text-gray-500">por {{ plan.duracion }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ plan.ventajas ? plan.ventajas.length : 0 }} beneficios
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ plan.desventajas ? plan.desventajas.length : 0 }} limitaciones
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ contarSuscriptores(plan.nombre) }} usuarios
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="abrirModalPlan(plan)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                      title="Editar plan"
                    >
                      <Edit :size="18" />
                    </button>
                    <button
                      @click="confirmarEliminar(plan)"
                      class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                      title="Eliminar plan"
                      :disabled="plan.nombre === 'Plan Básico'"
                      :class="{ 'opacity-50 cursor-not-allowed': plan.nombre === 'Plan Básico' }"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="planesFiltrados.length === 0" class="text-center py-12">
            <div class="text-gray-500">
              <CreditCard size="48" class="mx-auto mb-4 opacity-50" />
              <p class="text-lg font-medium">No se encontraron planes</p>
              <p class="text-sm">Prueba ajustando los filtros o agrega un nuevo plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar plan -->
    <div
      v-if="showModalPlan"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModalPlan"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ planEditando ? 'Editar Plan' : 'Nuevo Plan' }}
          </h3>
          <button
            @click="cerrarModalPlan"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarPlan" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre del plan *
              </label>
              <input
                v-model="formularioPlan.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.nombre }"
                placeholder="Ej: Plan Premium"
              />
              <p v-if="errores.nombre" class="mt-1 text-sm text-red-600">{{ errores.nombre }}</p>
            </div>

            <!-- Precio -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
              <input
                v-model.number="formularioPlan.precio"
                type="number"
                min="0"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.precio }"
                placeholder="0 para gratuito"
              />
              <p v-if="errores.precio" class="mt-1 text-sm text-red-600">{{ errores.precio }}</p>
            </div>

            <!-- Duración -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duración *</label>
              <select
                v-model="formularioPlan.duracion"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.duracion }"
              >
                <option value="">Seleccionar duración</option>
                <option value="día">Día</option>
                <option value="semana">Semana</option>
                <option value="mes">Mes</option>
                <option value="año">Año</option>
              </select>
              <p v-if="errores.duracion" class="mt-1 text-sm text-red-600">
                {{ errores.duracion }}
              </p>
            </div>

            <!-- Estado -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
              <select
                v-model="formularioPlan.estado"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-500': errores.estado }"
              >
                <option value="">Seleccionar estado</option>
                <option value="activo">Activo</option>
                <option value="destacado">Destacado</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <p v-if="errores.estado" class="mt-1 text-sm text-red-600">{{ errores.estado }}</p>
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <textarea
              v-model="formularioPlan.descripcion"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errores.descripcion }"
              placeholder="Describe el plan y sus características principales..."
            ></textarea>
            <p v-if="errores.descripcion" class="mt-1 text-sm text-red-600">
              {{ errores.descripcion }}
            </p>
          </div>

          <!-- Ventajas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ventajas del plan</label>
            <div class="space-y-2">
              <div
                v-for="(ventaja, index) in formularioPlan.ventajas"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  v-model="formularioPlan.ventajas[index]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe una ventaja del plan"
                />
                <button
                  type="button"
                  @click="eliminarVentaja(index)"
                  class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                >
                  <X :size="16" />
                </button>
              </div>
              <button
                type="button"
                @click="agregarVentaja"
                class="inline-flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus :size="16" class="mr-1" />
                Agregar ventaja
              </button>
            </div>
          </div>

          <!-- Desventajas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Limitaciones del plan
            </label>
            <div class="space-y-2">
              <div
                v-for="(desventaja, index) in formularioPlan.desventajas"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  v-model="formularioPlan.desventajas[index]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe una limitación del plan"
                />
                <button
                  type="button"
                  @click="eliminarDesventaja(index)"
                  class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                >
                  <X :size="16" />
                </button>
              </div>
              <button
                type="button"
                @click="agregarDesventaja"
                class="inline-flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus :size="16" class="mr-1" />
                Agregar limitación
              </button>
            </div>
          </div>

          <!-- Botones del formulario -->
          <div class="flex gap-3 pt-6 border-t">
            <button
              type="button"
              @click="cerrarModalPlan"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="guardandoPlan"
              class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {{ guardandoPlan ? 'Guardando...' : planEditando ? 'Actualizar' : 'Crear' }}
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
          ¿Estás seguro de que deseas eliminar el plan
          <strong>"{{ planSeleccionado?.nombre }}"</strong>? <br /><br />
          <span class="text-sm text-red-600">
            Los {{ contarSuscriptores(planSeleccionado?.nombre) }} usuarios con este plan perderán
            su suscripción.
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
            @click="confirmarEliminarPlan"
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
import { Plus, Edit, Trash2, X, AlertTriangle, CreditCard } from 'lucide-vue-next'
import { useAlert } from '@/composables/useGym'
import GlobalAlert from '@/components/common/GlobalAlert.vue'

// Composables
const { mostrarAlert } = useAlert()

// Estados reactivos
const filtros = ref({
  nombre: '',
  tipo: '',
  estado: '',
  precioMax: null,
})

const showConfirmModal = ref(false)
const showModalPlan = ref(false)
const planSeleccionado = ref(null)
const planEditando = ref(null)
const guardandoPlan = ref(false)

const formularioPlan = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  duracion: 'mes',
  estado: 'activo',
  ventajas: [''],
  desventajas: [''],
})

const errores = ref({})

// Datos de planes (se carga desde localStorage)
const planes = ref([])
const usuarios = ref([])

// Cargar planes desde localStorage
onMounted(() => {
  cargarPlanes()
  cargarUsuarios()
})

// Computed para filtrar planes
const planesFiltrados = computed(() => {
  return planes.value.filter((p) => {
    const nombreMatch =
      !filtros.value.nombre || p.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())

    const tipoMatch =
      !filtros.value.tipo ||
      (filtros.value.tipo === 'gratuito' && p.precio === 0) ||
      (filtros.value.tipo === 'pago' && p.precio > 0)

    const estadoMatch = !filtros.value.estado || p.estado === filtros.value.estado

    const precioMatch = !filtros.value.precioMax || p.precio <= filtros.value.precioMax

    return nombreMatch && tipoMatch && estadoMatch && precioMatch
  })
})

// Métodos
function cargarPlanes() {
  const planesStorage = JSON.parse(localStorage.getItem('gym_planes') || '[]')
  planes.value = planesStorage
}

function cargarUsuarios() {
  const usuariosStorage = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
  usuarios.value = usuariosStorage
}

function resetFilters() {
  filtros.value = {
    nombre: '',
    tipo: '',
    estado: '',
    precioMax: null,
  }
}

function getEstadoClass(estado) {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-800'
    case 'destacado':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactivo':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getEstadoTexto(estado) {
  switch (estado) {
    case 'activo':
      return 'Activo'
    case 'destacado':
      return 'Destacado'
    case 'inactivo':
      return 'Inactivo'
    default:
      return 'Desconocido'
  }
}

function contarSuscriptores(nombrePlan) {
  return usuarios.value.filter((usuario) => usuario.plan === nombrePlan).length
}

// Función para abrir modal de plan (crear o editar)
function abrirModalPlan(plan = null) {
  planEditando.value = plan

  if (plan) {
    // Modo edición - llenar formulario con datos existentes
    formularioPlan.value = {
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      precio: plan.precio,
      duracion: plan.duracion,
      estado: plan.estado,
      ventajas: plan.ventajas ? [...plan.ventajas] : [''],
      desventajas: plan.desventajas ? [...plan.desventajas] : [''],
    }
  } else {
    // Modo creación - limpiar formulario
    formularioPlan.value = {
      nombre: '',
      descripcion: '',
      precio: 0,
      duracion: 'mes',
      estado: 'activo',
      ventajas: [''],
      desventajas: [''],
    }
  }

  errores.value = {}
  showModalPlan.value = true
}

// Función para cerrar modal de plan
function cerrarModalPlan() {
  showModalPlan.value = false
  planEditando.value = null
  errores.value = {}
}

// Funciones para manejar ventajas
function agregarVentaja() {
  formularioPlan.value.ventajas.push('')
}

function eliminarVentaja(index) {
  if (formularioPlan.value.ventajas.length > 1) {
    formularioPlan.value.ventajas.splice(index, 1)
  }
}

// Funciones para manejar desventajas
function agregarDesventaja() {
  formularioPlan.value.desventajas.push('')
}

function eliminarDesventaja(index) {
  if (formularioPlan.value.desventajas.length > 1) {
    formularioPlan.value.desventajas.splice(index, 1)
  }
}

// Función para validar formulario
function validarFormulario() {
  errores.value = {}

  if (!formularioPlan.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es requerido'
  }

  if (formularioPlan.value.precio < 0) {
    errores.value.precio = 'El precio no puede ser negativo'
  }

  if (!formularioPlan.value.duracion) {
    errores.value.duracion = 'La duración es requerida'
  }

  if (!formularioPlan.value.estado) {
    errores.value.estado = 'El estado es requerido'
  }

  if (!formularioPlan.value.descripcion.trim()) {
    errores.value.descripcion = 'La descripción es requerida'
  }

  // Validar que al menos haya una ventaja no vacía
  const ventajasValidas = formularioPlan.value.ventajas.filter((v) => v.trim())
  if (ventajasValidas.length === 0) {
    errores.value.ventajas = 'Debe haber al menos una ventaja'
  }

  return Object.keys(errores.value).length === 0
}

// Función para guardar plan (crear o actualizar)
function guardarPlan() {
  if (!validarFormulario()) {
    mostrarAlert('Por favor corrige los errores en el formulario', 'error')
    return
  }

  guardandoPlan.value = true

  // Simular un pequeño delay para mostrar el estado de guardando
  setTimeout(() => {
    try {
      // Limpiar ventajas y desventajas vacías
      const ventajasLimpias = formularioPlan.value.ventajas.filter((v) => v.trim())
      const desventajasLimpias = formularioPlan.value.desventajas.filter((d) => d.trim())

      const planData = {
        ...formularioPlan.value,
        ventajas: ventajasLimpias,
        desventajas: desventajasLimpias,
        esGratuito: formularioPlan.value.precio === 0,
      }

      if (planEditando.value) {
        // Modo edición - actualizar plan existente
        const index = planes.value.findIndex((p) => p.id === planEditando.value.id)
        if (index !== -1) {
          planes.value[index] = {
            ...planEditando.value,
            ...planData,
          }
          localStorage.setItem('gym_planes', JSON.stringify(planes.value))
          mostrarAlert('Plan actualizado exitosamente', 'success')
        }
      } else {
        // Modo creación - agregar nuevo plan
        const nuevoPlan = {
          id: Date.now(), // Simple ID generator
          ...planData,
        }
        planes.value.push(nuevoPlan)
        localStorage.setItem('gym_planes', JSON.stringify(planes.value))
        mostrarAlert('Plan creado exitosamente', 'success')
      }

      cerrarModalPlan()
    } catch (error) {
      mostrarAlert('Error al guardar el plan', 'error')
      console.error('Error al guardar plan:', error)
    } finally {
      guardandoPlan.value = false
    }
  }, 500)
}

// Función para confirmar eliminación
function confirmarEliminar(plan) {
  if (plan.nombre === 'Plan Básico') {
    mostrarAlert('No se puede eliminar el Plan Básico', 'error')
    return
  }
  planSeleccionado.value = plan
  showConfirmModal.value = true
}

// Función para cerrar modal de confirmación
function cerrarConfirmModal() {
  showConfirmModal.value = false
  planSeleccionado.value = null
}

// Función para confirmar eliminación de plan
function confirmarEliminarPlan() {
  if (planSeleccionado.value) {
    const index = planes.value.findIndex((p) => p.id === planSeleccionado.value.id)
    if (index !== -1) {
      // Cambiar usuarios con este plan al Plan Básico
      const usuariosAfectados = usuarios.value.filter(
        (u) => u.plan === planSeleccionado.value.nombre,
      )
      usuariosAfectados.forEach((usuario) => {
        usuario.plan = 'Plan Básico'
      })

      if (usuariosAfectados.length > 0) {
        localStorage.setItem('gym_usuarios', JSON.stringify(usuarios.value))
      }

      planes.value.splice(index, 1)
      localStorage.setItem('gym_planes', JSON.stringify(planes.value))
      mostrarAlert(`Plan "${planSeleccionado.value.nombre}" eliminado exitosamente`, 'success')

      // Recargar usuarios para actualizar contador
      cargarUsuarios()
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
