<template>
  <div class="payouts-admin-view min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Solicitudes de Pago</h1>
            <p class="mt-2 text-gray-600">
              Revisa y gestiona las solicitudes de cambio de plan enviadas por los usuarios
            </p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Estadísticas rápidas -->
            <div class="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">
                  {{ solicitudesPendientes }} pendientes
                </span>
              </div>
            </div>
            <div class="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">
                  {{ solicitudesAprobadas }} aprobadas
                </span>
              </div>
            </div>
            <div class="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">
                  {{ solicitudesRechazadas }} rechazadas
                </span>
              </div>
            </div>
            <button
              @click="cargarSolicitudes"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw :size="20" class="mr-2" />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <!-- Filtro por estado -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              v-model="filtros.estado"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobado">Aprobados</option>
              <option value="rechazado">Rechazados</option>
            </select>
          </div>

          <!-- Filtro por plan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Plan Solicitado</label>
            <select
              v-model="filtros.plan"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los planes</option>
              <option value="Plan Premium">Plan Premium</option>
              <option value="Plan Elite">Plan Elite</option>
            </select>
          </div>

          <!-- Búsqueda por usuario -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input
              v-model="filtros.usuario"
              type="text"
              placeholder="Buscar por nombre o email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Limpiar filtros -->
          <div class="flex items-end">
            <button
              @click="limpiarFiltros"
              class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de solicitudes -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Solicitudes de Pago ({{ solicitudesFiltradas.length }})
          </h3>
        </div>

        <!-- Tabla -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Plan Solicitado
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Plan Actual
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Comprobante
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="solicitudesFiltradas.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <FileX :size="64" class="mx-auto mb-4 text-gray-300" />
                  <p class="text-lg font-medium">No hay solicitudes</p>
                  <p class="text-sm">
                    Las solicitudes de pago aparecerán aquí cuando los usuarios las envíen
                  </p>
                </td>
              </tr>
              <tr
                v-for="solicitud in solicitudesFiltradas"
                :key="solicitud.id"
                class="hover:bg-gray-50"
              >
                <!-- Usuario -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"
                    >
                      <User :size="20" class="text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        {{ solicitud.usuario?.nombre || 'Sin nombre' }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ solicitud.usuario?.email || 'Sin email' }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Plan Solicitado -->
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ solicitud.planSolicitado?.nombre || 'N/A' }}
                    </p>
                    <p class="text-sm text-gray-500">
                      ${{ solicitud.planSolicitado?.precio || 0 }}/mes
                    </p>
                  </div>
                </td>

                <!-- Plan Actual -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ solicitud.usuario?.planActual || 'Sin plan' }}
                  </span>
                </td>

                <!-- Fecha -->
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ formatearFecha(solicitud.fechaSolicitud) }}
                </td>

                <!-- Estado -->
                <td class="px-6 py-4">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getEstadoClass(solicitud.estado)"
                  >
                    {{ solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1) }}
                  </span>
                </td>

                <!-- Comprobante -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <FileText :size="16" class="text-gray-400" />
                    <span class="text-sm text-gray-600">{{
                      solicitud.comprobante?.nombre || 'Sin archivo'
                    }}</span>
                  </div>
                </td>

                <!-- Acciones -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="verDetalles(solicitud)"
                      class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye :size="16" />
                    </button>
                    <button
                      v-if="solicitud.comprobante?.contenido"
                      @click="descargarComprobante(solicitud)"
                      class="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Descargar comprobante"
                    >
                      <Download :size="16" />
                    </button>
                    <button
                      v-if="solicitud.estado === 'pendiente'"
                      @click="aprobarSolicitud(solicitud)"
                      class="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      title="Aprobar"
                    >
                      <Check :size="16" />
                    </button>
                    <button
                      v-if="solicitud.estado === 'pendiente'"
                      @click="rechazarSolicitud(solicitud)"
                      class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Rechazar"
                    >
                      <X :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal de detalles -->
      <div
        v-if="mostrarModalDetalles"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="cerrarModalDetalles"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div
          class="relative bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
          @click.stop
        >
          <!-- Modal de detalles -->
          <div
            v-if="mostrarModalDetalles"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click="cerrarModalDetalles"
          >
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div
              class="relative bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
              @click.stop
            >
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-semibold text-gray-900">Detalles de Solicitud</h3>
                <button
                  @click="cerrarModalDetalles"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X :size="24" />
                </button>
              </div>

              <div v-if="solicitudSeleccionada" class="space-y-6">
                <!-- Información del usuario -->
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Información del Usuario</h4>
                  <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                    <p>
                      <span class="font-medium text-gray-700">Nombre:</span>
                      <span class="ml-2">{{ solicitudSeleccionada.usuario?.nombre }}</span>
                    </p>
                    <p>
                      <span class="font-medium text-gray-700">Email:</span>
                      <span class="ml-2">{{ solicitudSeleccionada.usuario?.email }}</span>
                    </p>
                    <p>
                      <span class="font-medium text-gray-700">Teléfono:</span>
                      <span class="ml-2">{{
                        solicitudSeleccionada.usuario?.telefono || 'No especificado'
                      }}</span>
                    </p>
                    <p>
                      <span class="font-medium text-gray-700">Plan Actual:</span>
                      <span
                        class="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                      >
                        {{ solicitudSeleccionada.usuario?.planActual }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Plan solicitado -->
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Plan Solicitado</h4>
                  <div class="bg-blue-50 rounded-lg p-4">
                    <p>
                      <span class="font-medium text-gray-700">Plan:</span>
                      <span class="ml-2 text-blue-900 font-semibold">{{
                        solicitudSeleccionada.planSolicitado?.nombre
                      }}</span>
                    </p>
                    <p>
                      <span class="font-medium text-gray-700">Precio:</span>
                      <span class="ml-2 text-green-600 font-semibold"
                        >${{ solicitudSeleccionada.planSolicitado?.precio }}/mes</span
                      >
                    </p>
                  </div>
                </div>

                <!-- Comprobante -->
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Comprobante de Pago</h4>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                      <div class="space-y-2">
                        <p>
                          <span class="font-medium text-gray-700">Archivo:</span>
                          <span class="ml-2">{{ solicitudSeleccionada.comprobante?.nombre }}</span>
                        </p>
                        <p>
                          <span class="font-medium text-gray-700">Tipo:</span>
                          <span class="ml-2">{{ solicitudSeleccionada.comprobante?.tipo }}</span>
                        </p>
                        <p>
                          <span class="font-medium text-gray-700">Tamaño:</span>
                          <span class="ml-2">{{
                            formatearTamaño(solicitudSeleccionada.comprobante?.tamaño)
                          }}</span>
                        </p>
                      </div>
                      <button
                        @click="descargarComprobante(solicitudSeleccionada)"
                        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download :size="16" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Comentarios -->
                <div v-if="solicitudSeleccionada.comentarios">
                  <h4 class="font-medium text-gray-900 mb-3">Comentarios del Usuario</h4>
                  <div class="bg-yellow-50 rounded-lg p-4">
                    <p class="text-gray-800">{{ solicitudSeleccionada.comentarios }}</p>
                  </div>
                </div>

                <!-- Estado y observaciones -->
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Estado y Observaciones</h4>
                  <div class="bg-gray-50 rounded-lg p-4 space-y-4">
                    <p class="flex items-center">
                      <span class="font-medium text-gray-700">Estado:</span>
                      <span
                        class="ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                        :class="getEstadoClass(solicitudSeleccionada.estado)"
                      >
                        {{
                          solicitudSeleccionada.estado.charAt(0).toUpperCase() +
                          solicitudSeleccionada.estado.slice(1)
                        }}
                      </span>
                    </p>

                    <div v-if="solicitudSeleccionada.estado === 'pendiente'">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Observaciones (opcional)
                      </label>
                      <textarea
                        v-model="observaciones"
                        rows="3"
                        placeholder="Agregar observaciones para el usuario..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>

                    <p v-else-if="solicitudSeleccionada.observaciones" class="mt-3">
                      <span class="font-medium text-gray-700">Observaciones:</span>
                      <span class="ml-2 text-gray-800">{{
                        solicitudSeleccionada.observaciones
                      }}</span>
                    </p>
                  </div>
                </div>

                <!-- Acciones -->
                <div
                  v-if="solicitudSeleccionada.estado === 'pendiente'"
                  class="flex gap-3 pt-4 border-t"
                >
                  <button
                    @click="abrirConfirmacionAprobacion"
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check :size="16" />
                    Aprobar Solicitud
                  </button>
                  <button
                    @click="abrirConfirmacionRechazo"
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X :size="16" />
                    Rechazar Solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal de confirmación para aprobar -->
          <div
            v-if="mostrarConfirmacionAprobacion"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click="cerrarConfirmacionAprobacion"
          >
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div
              class="relative bg-white rounded-lg p-6 max-w-md w-full shadow-2xl transform transition-all"
              @click.stop
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
                >
                  <Check :size="20" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Confirmar aprobación</h3>
              </div>

              <p class="text-gray-600 mb-6">
                ¿Estás seguro de que deseas aprobar la solicitud de
                <strong>"{{ solicitudSeleccionada?.planSolicitado?.nombre }}"</strong>
                de <strong>{{ solicitudSeleccionada?.usuario?.nombre }}</strong
                >? <br /><br />
                <span class="text-sm text-green-600">
                  El plan del usuario será actualizado automáticamente.
                </span>
              </p>

              <div class="flex gap-3">
                <button
                  @click="cerrarConfirmacionAprobacion"
                  class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="confirmarAprobacion"
                  class="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sí, aprobar
                </button>
              </div>
            </div>
          </div>

          <!-- Modal de confirmación para rechazar -->
          <div
            v-if="mostrarConfirmacionRechazo"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click="cerrarConfirmacionRechazo"
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
                  <X :size="20" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Confirmar rechazo</h3>
              </div>

              <p class="text-gray-600 mb-4">
                ¿Estás seguro de que deseas rechazar la solicitud de
                <strong>"{{ solicitudSeleccionada?.planSolicitado?.nombre }}"</strong>
                de <strong>{{ solicitudSeleccionada?.usuario?.nombre }}</strong
                >?
              </p>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Motivo del rechazo (opcional)
                </label>
                <textarea
                  v-model="observaciones"
                  rows="3"
                  placeholder="Explica el motivo del rechazo..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>

              <div class="flex gap-3">
                <button
                  @click="cerrarConfirmacionRechazo"
                  class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="confirmarRechazo"
                  class="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sí, rechazar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Componente global de alertas -->
        <GlobalAlert />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RefreshCw, Eye, Check, X, FileText, Download, User, FileX } from 'lucide-vue-next'
import { useAlert, obtenerDatosLS, guardarDatosLS } from '@/composables/useGym'
import GlobalAlert from '@/components/common/GlobalAlert.vue'

// Composables
const { mostrarAlert } = useAlert()

// Estados reactivos
const solicitudes = ref([])
const mostrarModalDetalles = ref(false)
const mostrarConfirmacionAprobacion = ref(false)
const mostrarConfirmacionRechazo = ref(false)
const solicitudSeleccionada = ref(null)
const observaciones = ref('')

// Filtros
const filtros = ref({
  estado: '',
  plan: '',
  usuario: '',
})

// Computed properties
const solicitudesFiltradas = computed(() => {
  let filtradas = solicitudes.value

  if (filtros.value.estado) {
    filtradas = filtradas.filter((s) => s.estado === filtros.value.estado)
  }

  if (filtros.value.plan) {
    filtradas = filtradas.filter((s) => s.planSolicitado?.nombre === filtros.value.plan)
  }

  if (filtros.value.usuario) {
    const busqueda = filtros.value.usuario.toLowerCase()
    filtradas = filtradas.filter(
      (s) =>
        s.usuario?.nombre?.toLowerCase().includes(busqueda) ||
        s.usuario?.email?.toLowerCase().includes(busqueda),
    )
  }

  return filtradas
})

const solicitudesPendientes = computed(() => {
  return solicitudes.value.filter((s) => s.estado === 'pendiente').length
})

const solicitudesAprobadas = computed(() => {
  return solicitudes.value.filter((s) => s.estado === 'aprobado').length
})

const solicitudesRechazadas = computed(() => {
  return solicitudes.value.filter((s) => s.estado === 'rechazado').length
})

// Métodos
function cargarSolicitudes() {
  const solicitudesStorage = obtenerDatosLS('gym_solicitudes_pago', [])
  const usuarios = obtenerDatosLS('gym_usuarios', [])

  // Actualizar información de usuarios en las solicitudes
  const solicitudesActualizadas = solicitudesStorage.map((solicitud) => {
    const usuarioActualizado = usuarios.find((u) => u.id === solicitud.usuarioId)

    if (usuarioActualizado) {
      const solicitudActualizada = {
        ...solicitud,
        usuario: {
          ...solicitud.usuario,
          nombre:
            usuarioActualizado.nombreCompleto ||
            usuarioActualizado.nombre ||
            solicitud.usuario?.nombre,
          email: usuarioActualizado.email || usuarioActualizado.correo || solicitud.usuario?.email,
          telefono: usuarioActualizado.telefono || solicitud.usuario?.telefono,
          planActual: usuarioActualizado.plan || solicitud.usuario?.planActual || 'Sin plan',
        },
      }
      return solicitudActualizada
    }
    return solicitud
  })

  solicitudes.value = solicitudesActualizadas.sort(
    (a, b) => new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud),
  )
}

function limpiarFiltros() {
  filtros.value = {
    estado: '',
    plan: '',
    usuario: '',
  }
}

function getEstadoClass(estado) {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'aprobado':
      return 'bg-green-100 text-green-800'
    case 'rechazado':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatearFecha(fecha) {
  if (!fecha) return 'N/A'
  try {
    // Si la fecha es un timestamp
    if (typeof fecha === 'number') {
      return new Date(fecha).toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    // Si la fecha es un string
    const fechaObj = new Date(fecha)
    if (isNaN(fechaObj.getTime())) {
      return fecha // Retorna la fecha original si no es válida
    }

    return fechaObj.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (error) {
    console.error('Error formateando fecha:', error)
    return fecha
  }
}

function formatearTamaño(bytes) {
  if (!bytes) return 'N/A'
  const kb = bytes / 1024
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`
  }
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

function descargarComprobante(solicitud) {
  if (!solicitud.comprobante?.contenido) {
    console.error('No hay contenido de archivo disponible para la solicitud:', solicitud.id)
    mostrarAlert('No hay archivo disponible para descargar', 'error')
    return
  }

  try {
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement('a')
    link.href = solicitud.comprobante.contenido
    link.download = solicitud.comprobante.nombre || 'comprobante.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    mostrarAlert('Archivo descargado exitosamente', 'success')
  } catch (error) {
    console.error('Error al descargar archivo:', error)
    mostrarAlert('Error al descargar el archivo', 'error')
  }
}

function verDetalles(solicitud) {
  solicitudSeleccionada.value = solicitud
  observaciones.value = solicitud.observaciones || ''
  mostrarModalDetalles.value = true
}

function cerrarModalDetalles() {
  mostrarModalDetalles.value = false
  solicitudSeleccionada.value = null
  observaciones.value = ''
}

function abrirConfirmacionAprobacion() {
  mostrarConfirmacionAprobacion.value = true
}

function cerrarConfirmacionAprobacion() {
  mostrarConfirmacionAprobacion.value = false
}

function abrirConfirmacionRechazo() {
  mostrarConfirmacionRechazo.value = true
}

function cerrarConfirmacionRechazo() {
  mostrarConfirmacionRechazo.value = false
}

function aprobarSolicitud(solicitud) {
  solicitudSeleccionada.value = solicitud
  observaciones.value = ''
  confirmarAprobacion()
}

function rechazarSolicitud(solicitud) {
  solicitudSeleccionada.value = solicitud
  observaciones.value = ''
  confirmarRechazo()
}

function confirmarAprobacion() {
  if (!solicitudSeleccionada.value) return

  // Actualizar el estado de la solicitud
  const solicitudIndex = solicitudes.value.findIndex((s) => s.id === solicitudSeleccionada.value.id)
  if (solicitudIndex !== -1) {
    solicitudes.value[solicitudIndex].estado = 'aprobado'
    solicitudes.value[solicitudIndex].observaciones =
      observaciones.value || 'Solicitud aprobada correctamente'
    solicitudes.value[solicitudIndex].fechaAprobacion = new Date().toISOString()

    // Actualizar el plan activo del usuario PRIMERO
    const planNombre = solicitudSeleccionada.value.planSolicitado?.nombre
    const usuarioId =
      solicitudSeleccionada.value.usuarioId ||
      solicitudSeleccionada.value.usuario?.id ||
      solicitudSeleccionada.value.usuario?.email ||
      solicitudSeleccionada.value.usuario?.correo

    if (planNombre && usuarioId) {
      actualizarPlanUsuario(usuarioId, planNombre)
    } else {
      mostrarAlert('Error: Faltan datos para actualizar el plan del usuario', 'error')
      return
    }

    // Guardar solicitudes en localStorage
    guardarDatosLS('gym_solicitudes_pago', solicitudes.value)

    // Crear notificación para el usuario
    crearNotificacionUsuario(
      usuarioId,
      'pago',
      `Tu solicitud de ${planNombre} ha sido aprobada. ¡Disfruta de tu nuevo plan!`,
      solicitudSeleccionada.value.id,
    )

    // Recargar las solicitudes para reflejar los cambios
    setTimeout(() => {
      cargarSolicitudes()
    }, 500)

    mostrarAlert('Solicitud aprobada exitosamente y plan del usuario actualizado', 'success')
    cerrarConfirmacionAprobacion()
    cerrarModalDetalles()
  } else {
    console.error('❌ No se encontró la solicitud para actualizar')
    mostrarAlert('Error: No se pudo encontrar la solicitud', 'error')
  }
}

function confirmarRechazo() {
  if (!solicitudSeleccionada.value) return

  // Actualizar el estado de la solicitud
  const solicitudIndex = solicitudes.value.findIndex((s) => s.id === solicitudSeleccionada.value.id)
  if (solicitudIndex !== -1) {
    solicitudes.value[solicitudIndex].estado = 'rechazado'
    solicitudes.value[solicitudIndex].observaciones = observaciones.value || 'Solicitud rechazada'
    solicitudes.value[solicitudIndex].fechaRechazo = new Date().toISOString()

    // Guardar en localStorage
    guardarDatosLS('gym_solicitudes_pago', solicitudes.value)

    // Crear notificación para el usuario
    const usuarioId =
      solicitudSeleccionada.value.usuarioId ||
      solicitudSeleccionada.value.usuario?.id ||
      solicitudSeleccionada.value.usuario?.email ||
      solicitudSeleccionada.value.usuario?.correo

    crearNotificacionUsuario(
      usuarioId,
      'rechazo',
      `Tu solicitud de ${solicitudSeleccionada.value.planSolicitado?.nombre} ha sido rechazada. ${observaciones.value ? 'Motivo: ' + observaciones.value : 'Revisa las observaciones del administrador.'}`,
      solicitudSeleccionada.value.id,
    )

    // Recargar las solicitudes para reflejar los cambios
    setTimeout(() => {
      cargarSolicitudes()
    }, 500)

    mostrarAlert('Solicitud rechazada', 'warning')
    cerrarConfirmacionRechazo()
    cerrarModalDetalles()
  } else {
    console.error('❌ No se encontró la solicitud para rechazar')
    mostrarAlert('Error: No se pudo encontrar la solicitud', 'error')
  }
}

function actualizarPlanUsuario(usuarioId, nuevoPlan) {
  try {
    // Obtener usuarios de localStorage
    const usuarios = obtenerDatosLS('gym_usuarios', [])

    // Obtener planes para conseguir el ID del plan
    const planes = obtenerDatosLS('gym_planes', [])
    const planEncontrado = planes.find((p) => p.nombre === nuevoPlan)

    if (!planEncontrado) {
      console.error('Plan no encontrado:', nuevoPlan)
      mostrarAlert('Error: Plan no encontrado en el sistema', 'error')
      return
    }

    // Buscar y actualizar el usuario (considerando diferentes identificadores)
    const usuarioIndex = usuarios.findIndex(
      (u) => u.id === usuarioId || u.email === usuarioId || u.correo === usuarioId,
    )

    if (usuarioIndex !== -1) {
      // Actualizar TODOS los campos relacionados con el plan del usuario
      usuarios[usuarioIndex].planActivo = planEncontrado.id
      usuarios[usuarioIndex].planActual = nuevoPlan
      usuarios[usuarioIndex].plan = nuevoPlan // Para compatibilidad con MembersView
      usuarios[usuarioIndex].fechaActualizacionPlan = new Date().toISOString()

      // Guardar usuarios actualizados
      guardarDatosLS('gym_usuarios', usuarios)
    } else {
      console.error('❌ Usuario no encontrado para actualizar plan:', usuarioId)
      mostrarAlert('Error: Usuario no encontrado para actualizar el plan', 'error')
    }
  } catch (error) {
    console.error('❌ Error al actualizar plan del usuario:', error)
    mostrarAlert('Error al actualizar el plan del usuario', 'error')
  }
}

function crearNotificacionUsuario(usuarioId, tipo, mensaje, solicitudId) {
  try {
    const notificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])

    const nuevaNotificacion = {
      id: Date.now().toString(),
      usuarioId: usuarioId,
      tipo: tipo,
      titulo:
        tipo === 'pago'
          ? 'Solicitud de Plan Aprobada'
          : tipo === 'rechazo'
            ? 'Solicitud de Plan Rechazada'
            : 'Notificación del Sistema',
      mensaje: mensaje,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      leida: false,
      solicitudId: solicitudId,
    }

    notificaciones.push(nuevaNotificacion)
    guardarDatosLS('gym_notificaciones_usuario', notificaciones)
  } catch (error) {
    console.error('❌ Error al crear notificación:', error)
  }
}

// Lifecycle
onMounted(() => {
  cargarSolicitudes()
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.table-hover tr:hover {
  background-color: #f9fafb;
}
</style>
