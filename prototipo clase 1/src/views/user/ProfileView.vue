<template>
  <div class="profile-view min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Header del perfil -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-6">
          <!-- Avatar del usuario -->
          <div
            class="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg"
          >
            {{ iniciales }}
          </div>

          <!-- Información básica -->
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900">
              {{ usuarioActual?.nombreCompleto || usuarioActual?.nombre || 'Usuario' }}
            </h1>
            <p class="text-lg text-gray-600 mt-1">
              {{ usuarioActual?.correo || usuarioActual?.email }}
            </p>
            <div class="flex items-center gap-4 mt-3">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Miembro Activo
              </span>
              <span class="text-sm text-gray-500"> Desde {{ fechaRegistro }} </span>
            </div>
          </div>

          <!-- Botón de cambiar contraseña -->
          <button
            @click="mostrarCambiarPassword = true"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Key :size="16" />
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Columna Principal -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Plan Actual -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                <CreditCard :size="24" />
                Plan Actual
              </h2>
            </div>

            <div class="p-6">
              <div v-if="planActual" class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900">{{ planActual.nombre }}</h3>
                    <p class="text-gray-600">{{ planActual.descripcion }}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-bold text-blue-600">${{ planActual.precio }}</div>
                    <div class="text-sm text-gray-500">por mes</div>
                  </div>
                </div>

                <div class="border-t pt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Beneficios incluidos:</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div
                      v-for="ventaja in planActual.ventajas"
                      :key="ventaja"
                      class="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Check :size="16" class="text-green-500" />
                      {{ ventaja }}
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div class="flex items-center gap-2 text-green-800">
                    <CheckCircle :size="16" />
                    <span class="font-medium">Estado: Activo</span>
                  </div>
                  <p class="text-sm text-green-700 mt-1">
                    Tu plan está activo y todos los beneficios están disponibles.
                  </p>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <AlertCircle :size="48" class="mx-auto mb-4 text-gray-300" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Sin plan activo</h3>
                <p class="text-gray-500 mb-4">No tienes un plan de membresía activo actualmente.</p>
                <router-link
                  to="/plans"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Planes Disponibles
                </router-link>
              </div>
            </div>
          </div>

          <!-- Máquinas Favoritas -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Heart :size="24" class="text-red-500" />
                Máquinas Favoritas
              </h2>
            </div>

            <div class="p-6">
              <div v-if="maquinasFavoritas.length > 0" class="space-y-6">
                <!-- Grid de máquinas -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="maquina in maquinasPaginadas"
                    :key="maquina.id"
                    class="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <img
                      :src="maquina.imagen"
                      :alt="maquina.nombre"
                      class="w-16 h-16 rounded-lg object-cover"
                    />
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900">{{ maquina.nombre }}</h3>
                      <p class="text-sm text-gray-600">{{ maquina.categoria }}</p>
                      <div class="flex items-center justify-end mt-2">
                        <button
                          @click="eliminarDeFavoritos(maquina)"
                          class="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          title="Eliminar de favoritos"
                        >
                          <HeartOff :size="14" />
                          <span class="text-xs">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Paginación -->
                <Pagination
                  :current-page="currentPageMaquinas"
                  :total-items="totalMaquinas"
                  :page-size="pageSizeMaquinas"
                  items-label="máquinas"
                  @update:current-page="goToPageMaquinas"
                  @update:page-size="updatePageSizeMaquinas"
                />
              </div>

              <div v-else class="text-center py-8">
                <Heart :size="48" class="mx-auto mb-4 text-gray-300" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Sin máquinas favoritas</h3>
                <p class="text-gray-500 mb-4">Aún no has marcado ninguna máquina como favorita.</p>
                <router-link
                  to="/training"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explorar Máquinas
                </router-link>
              </div>
            </div>
          </div>

          <!-- Solicitudes y Mensajes -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare :size="24" class="text-purple-500" />
                Solicitudes y Mensajes
              </h2>

              <!-- Botones de acción -->
              <div v-if="notificaciones.length > 0" class="flex items-center gap-2">
                <button
                  @click="marcarTodasComoLeidas"
                  class="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Marcar como leídas
                </button>
                <button
                  @click="confirmarLimpiarMensajes"
                  class="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Limpiar mensajes
                </button>
              </div>
            </div>

            <div class="p-6">
              <div v-if="notificaciones.length > 0" class="space-y-6">
                <!-- Lista de notificaciones -->
                <div class="space-y-4">
                  <div
                    v-for="notificacion in notificacionesPaginadas"
                    :key="notificacion.id"
                    class="flex items-start gap-4 p-4 rounded-lg border border-gray-200 relative"
                    :class="[
                      getNotificationStyle(notificacion.tipo),
                      { 'opacity-60': notificacion.leida },
                    ]"
                  >
                    <!-- Badge de no leído -->
                    <div
                      v-if="!notificacion.leida"
                      class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    ></div>

                    <div class="flex-shrink-0 mt-1">
                      <component
                        :is="getNotificationIcon(notificacion.tipo)"
                        :size="20"
                        :class="getNotificationIconColor(notificacion.tipo)"
                      />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900">
                        {{ notificacion.titulo || getTipoTexto(notificacion.tipo) }}
                      </h3>
                      <p class="text-gray-600 mt-1">{{ notificacion.mensaje }}</p>
                      <div class="flex items-center justify-between mt-3">
                        <span class="text-sm text-gray-500">{{
                          formatearFecha(notificacion.fecha)
                        }}</span>
                        <div class="flex items-center gap-2">
                          <button
                            v-if="!notificacion.leida"
                            @click="marcarComoLeida(notificacion)"
                            class="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Marcar como leída
                          </button>
                          <button
                            @click="eliminarNotificacion(notificacion.id)"
                            class="text-xs text-red-600 hover:text-red-800 font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Paginación -->
                <Pagination
                  :current-page="currentPageNotificaciones"
                  :total-items="totalNotificaciones"
                  :page-size="pageSizeNotificaciones"
                  items-label="mensajes"
                  @update:current-page="goToPageNotificaciones"
                  @update:page-size="updatePageSizeNotificaciones"
                />
              </div>

              <div v-else class="text-center py-8">
                <MessageSquare :size="48" class="mx-auto mb-4 text-gray-300" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Sin notificaciones</h3>
                <p class="text-gray-500">No tienes solicitudes o mensajes pendientes.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Estadísticas Rápidas -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 :size="20" />
              Estadísticas
            </h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Clases inscritas</span>
                <span class="font-semibold text-blue-600">{{ totalClasesInscritas }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Máquinas favoritas</span>
                <span class="font-semibold text-red-600">{{ maquinasFavoritas.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Notificaciones sin leer</span>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-purple-600">{{ notificacionesNoLeidas }}</span>
                  <div
                    v-if="notificacionesNoLeidas > 0"
                    class="w-2 h-2 bg-red-500 rounded-full"
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Días como miembro</span>
                <span class="font-semibold text-green-600">{{ diasComoMiembro }}</span>
              </div>
            </div>
          </div>

          <!-- Información de Contacto -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User :size="20" />
              Información Personal
            </h3>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <p class="text-gray-900">
                  {{ usuarioActual?.nombreCompleto || usuarioActual?.nombre || 'No especificado' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p class="text-gray-900">
                  {{ usuarioActual?.correo || usuarioActual?.email || 'No especificado' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
                <p class="text-gray-900">{{ usuarioActual?.cedula || 'No especificado' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuario</label>
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ usuarioActual?.tipo || 'Usuario' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Acciones Rápidas -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings :size="20" />
              Acciones Rápidas
            </h3>

            <div class="space-y-3">
              <router-link
                to="/user/classes"
                class="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Calendar :size="16" class="text-blue-500" />
                <span class="text-gray-700">Ver mis clases</span>
              </router-link>

              <router-link
                to="/classes"
                class="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Plus :size="16" class="text-green-500" />
                <span class="text-gray-700">Inscribirse a clases</span>
              </router-link>

              <router-link
                to="/plans"
                class="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <CreditCard :size="16" class="text-purple-500" />
                <span class="text-gray-700">Cambiar plan</span>
              </router-link>

              <button
                @click="cerrarSesion"
                class="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut :size="16" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para cambiar contraseña -->
    <div
      v-if="mostrarCambiarPassword"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModalPassword"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Cambiar Contraseña</h3>
          <button
            @click="cerrarModalPassword"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="cambiarPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
            <input
              v-model="formPassword.actual"
              type="password"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              :class="{ 'border-red-500': passwordErrors.actual }"
              placeholder="Ingresa tu contraseña actual"
            />
            <p v-if="passwordErrors.actual" class="text-red-500 text-xs mt-1">
              {{ passwordErrors.actual }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
            <input
              v-model="formPassword.nueva"
              type="password"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              :class="{ 'border-red-500': passwordErrors.nueva }"
              placeholder="Ingresa tu nueva contraseña"
            />
            <p v-if="passwordErrors.nueva" class="text-red-500 text-xs mt-1">
              {{ passwordErrors.nueva }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Confirmar Nueva Contraseña</label
            >
            <input
              v-model="formPassword.confirmar"
              type="password"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              :class="{ 'border-red-500': passwordErrors.confirmar }"
              placeholder="Confirma tu nueva contraseña"
            />
            <p v-if="passwordErrors.confirmar" class="text-red-500 text-xs mt-1">
              {{ passwordErrors.confirmar }}
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="cerrarModalPassword"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="cargandoPassword"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ cargandoPassword ? 'Guardando...' : 'Cambiar Contraseña' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Componente de alertas -->
    <GlobalAlert />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Key,
  CreditCard,
  Heart,
  HeartOff,
  MessageSquare,
  BarChart3,
  Settings,
  Calendar,
  Plus,
  LogOut,
  Check,
  CheckCircle,
  AlertCircle,
  X,
  Bell,
  DollarSign,
  Clock,
  Info,
} from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'
import { obtenerDatosLS, guardarDatosLS, useAlert } from '@/composables/useGym'
import { usePagination } from '@/composables/usePagination'
import GlobalAlert from '@/components/common/GlobalAlert.vue'
import Pagination from '@/components/common/Pagination.vue'

// Composables
const authStore = useAuthStore()
const router = useRouter()
const { mostrarAlert } = useAlert()

// Estados reactivos
const mostrarCambiarPassword = ref(false)
const cargandoPassword = ref(false)
const formPassword = ref({
  actual: '',
  nueva: '',
  confirmar: '',
})
const passwordErrors = ref({
  actual: '',
  nueva: '',
  confirmar: '',
})

// Datos del usuario
const maquinasFavoritas = ref([])
const notificaciones = ref([])
const planActual = ref(null)

// Paginación para máquinas favoritas y notificaciones
const {
  currentPage: currentPageMaquinas,
  pageSize: pageSizeMaquinas,
  paginatedItems: maquinasPaginadas,
  totalItems: totalMaquinas,
  goToPage: goToPageMaquinas,
  updatePageSize: updatePageSizeMaquinas,
} = usePagination(maquinasFavoritas, 4)

const {
  currentPage: currentPageNotificaciones,
  pageSize: pageSizeNotificaciones,
  paginatedItems: notificacionesPaginadas,
  totalItems: totalNotificaciones,
  goToPage: goToPageNotificaciones,
  updatePageSize: updatePageSizeNotificaciones,
} = usePagination(notificaciones, 3)

// Computed properties
const usuarioActual = computed(() => authStore.currentUser)

const iniciales = computed(() => {
  const nombreCompleto = usuarioActual.value?.nombreCompleto || usuarioActual.value?.nombre
  if (!nombreCompleto) return 'U'
  return nombreCompleto
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

const fechaRegistro = computed(() => {
  if (!usuarioActual.value?.fechaRegistro) return 'Fecha no disponible'
  return new Date(usuarioActual.value.fechaRegistro).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
  })
})

const diasComoMiembro = computed(() => {
  if (!usuarioActual.value?.fechaRegistro) return 0
  const fechaInicio = new Date(usuarioActual.value.fechaRegistro)
  const fechaActual = new Date()
  const diferencia = fechaActual - fechaInicio
  return Math.floor(diferencia / (1000 * 60 * 60 * 24))
})

const totalClasesInscritas = computed(() => {
  const clases = obtenerDatosLS('gym_clases', [])
  const userId =
    usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo
  if (!userId) return 0

  return clases.filter(
    (clase) =>
      clase.inscritos?.includes(userId) ||
      clase.inscritos?.includes(usuarioActual.value?.id) ||
      clase.inscritos?.includes(usuarioActual.value?.email) ||
      clase.inscritos?.includes(usuarioActual.value?.correo),
  ).length
})

const notificacionesNoLeidas = computed(() => {
  return notificaciones.value.filter((notif) => !notif.leida).length
})

// Métodos
function cargarDatosUsuario() {
  // Cargar máquinas favoritas
  const maquinas = obtenerDatosLS('gym_maquinas', [])
  const userId =
    usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

  if (userId) {
    maquinasFavoritas.value = maquinas.filter(
      (maquina) =>
        maquina.favoritos?.includes(userId) ||
        maquina.favoritos?.includes(usuarioActual.value?.id) ||
        maquina.favoritos?.includes(usuarioActual.value?.email) ||
        maquina.favoritos?.includes(usuarioActual.value?.correo),
    )
  }

  // Cargar notificaciones
  const todasNotificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])
  const notificacionesUsuario = todasNotificaciones.filter(
    (notif) =>
      notif.usuarioId === userId ||
      notif.usuarioId === usuarioActual.value?.id ||
      notif.usuarioId === usuarioActual.value?.email ||
      notif.usuarioId === usuarioActual.value?.correo,
  )

  // Ordenar notificaciones por fecha descendente (más recientes primero)
  notificaciones.value = notificacionesUsuario.sort((a, b) => {
    // Función helper para convertir fecha a timestamp
    const parsearFecha = (fecha) => {
      if (!fecha) return 0

      if (typeof fecha === 'number') return fecha

      if (typeof fecha === 'string') {
        // Formato específico: "27/7/2025, 6:50:20 p. m."
        if (fecha.includes('/') && fecha.includes(',')) {
          const partes = fecha.split(', ')
          if (partes.length === 2) {
            const fechaParte = partes[0] // "27/7/2025"
            const horaParte = partes[1] // "6:50:20 p. m."

            const [dia, mes, año] = fechaParte.split('/').map(Number)

            let horaTexto = horaParte.replace(' p. m.', '').replace(' a. m.', '')
            const [hora, minuto, segundo] = horaTexto.split(':').map(Number)
            const esPM = horaParte.includes('p. m.')

            let hora24 = hora
            if (esPM && hora !== 12) {
              hora24 += 12
            } else if (!esPM && hora === 12) {
              hora24 = 0
            }

            return new Date(año, mes - 1, dia, hora24, minuto, segundo).getTime()
          }
        }
        // Fallback para otros formatos
        return new Date(fecha).getTime()
      }

      return 0
    }

    const fechaA = parsearFecha(a.fecha || a.fechaCreacion)
    const fechaB = parsearFecha(b.fecha || b.fechaCreacion)

    // Ordenar descendente (más recientes primero)
    return fechaB - fechaA
  })

  // Cargar plan actual
  cargarPlanActual()
}

function cargarPlanActual() {
  const planes = obtenerDatosLS('gym_planes', [])
  const usuarios = obtenerDatosLS('gym_usuarios', [])
  const userId =
    usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

  // Buscar el usuario en la lista de usuarios
  const usuario = usuarios.find(
    (u) =>
      u.id === userId ||
      u.email === userId ||
      u.correo === userId ||
      u.id === usuarioActual.value?.id ||
      u.email === usuarioActual.value?.email ||
      u.correo === usuarioActual.value?.correo,
  )

  let planNombre = null

  // Buscar el plan actual del usuario (puede estar en diferentes propiedades)
  if (usuario) {
    planNombre = usuario.plan || usuario.planActivo || usuarioActual.value?.plan
  } else {
    // Si no encuentra el usuario en localStorage, usar el del store
    planNombre = usuarioActual.value?.plan
  }

  if (planNombre) {
    // Buscar el plan por nombre
    planActual.value = planes.find((p) => p.nombre === planNombre)
  }

  // Si no se encuentra el plan o no tiene plan asignado, buscar el plan gratuito por defecto
  if (!planActual.value) {
    planActual.value = planes.find(
      (p) => p.nombre?.toLowerCase().includes('básico') || p.precio === 0,
    )
  }
}

// Funciones para manejar máquinas favoritas
function eliminarDeFavoritos(maquina) {
  if (!confirm(`¿Estás seguro de que deseas eliminar "${maquina.nombre}" de tus favoritos?`)) {
    return
  }

  try {
    const maquinas = obtenerDatosLS('gym_maquinas', [])
    const userId =
      usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

    // Encontrar la máquina y eliminar el usuario de favoritos
    const maquinaIndex = maquinas.findIndex((m) => m.id === maquina.id)
    if (maquinaIndex !== -1) {
      const maquinaData = maquinas[maquinaIndex]
      if (!maquinaData.favoritos) {
        maquinaData.favoritos = []
      }

      // Eliminar todas las posibles variantes del userId
      maquinaData.favoritos = maquinaData.favoritos.filter(
        (id) =>
          id !== userId &&
          id !== usuarioActual.value?.id &&
          id !== usuarioActual.value?.email &&
          id !== usuarioActual.value?.correo,
      )

      maquinas[maquinaIndex] = maquinaData
      guardarDatosLS('gym_maquinas', maquinas)

      // Recargar las máquinas favoritas
      cargarDatosUsuario()

      mostrarAlert('Máquina eliminada de favoritos exitosamente', 'success')
    }
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error)
    mostrarAlert('Error al eliminar la máquina de favoritos', 'error')
  }
}

// Funciones para manejar notificaciones
function getTipoTexto(tipo) {
  const textos = {
    solicitud: 'Solicitud',
    pago: 'Pago',
    plan: 'Plan',
    general: 'Mensaje',
    recordatorio: 'Recordatorio',
    aprobacion: 'Aprobación',
    info: 'Información',
  }
  return textos[tipo] || 'Notificación'
}

function marcarComoLeida(notificacion) {
  try {
    const todasNotificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])
    const index = todasNotificaciones.findIndex((n) => n.id === notificacion.id)

    if (index !== -1) {
      todasNotificaciones[index].leida = true
      guardarDatosLS('gym_notificaciones_usuario', todasNotificaciones)

      // Actualizar la notificación local
      const localIndex = notificaciones.value.findIndex((n) => n.id === notificacion.id)
      if (localIndex !== -1) {
        notificaciones.value[localIndex].leida = true
      }

      mostrarAlert('Mensaje marcado como leído exitosamente', 'success')
    }
  } catch (error) {
    console.error('Error al marcar como leída:', error)
    mostrarAlert('Error al marcar el mensaje', 'error')
  }
}

function marcarTodasComoLeidas() {
  try {
    const todasNotificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])
    const userId =
      usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

    let actualizadas = 0
    todasNotificaciones.forEach((notificacion) => {
      if (
        (notificacion.usuarioId === userId ||
          notificacion.usuarioId === usuarioActual.value?.id ||
          notificacion.usuarioId === usuarioActual.value?.email ||
          notificacion.usuarioId === usuarioActual.value?.correo) &&
        !notificacion.leida
      ) {
        notificacion.leida = true
        actualizadas++
      }
    })

    if (actualizadas > 0) {
      guardarDatosLS('gym_notificaciones_usuario', todasNotificaciones)

      // Actualizar notificaciones locales
      notificaciones.value.forEach((notif) => {
        notif.leida = true
      })

      mostrarAlert(`${actualizadas} mensajes marcados como leídos exitosamente`, 'success')
    } else {
      mostrarAlert('No hay mensajes sin leer', 'info')
    }
  } catch (error) {
    console.error('Error al marcar todas como leídas:', error)
    mostrarAlert('Error al marcar los mensajes', 'error')
  }
}

function eliminarNotificacion(notificacionId) {
  if (!confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
    return
  }

  try {
    const todasNotificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])
    const notificacionesFiltradas = todasNotificaciones.filter((n) => n.id !== notificacionId)

    guardarDatosLS('gym_notificaciones_usuario', notificacionesFiltradas)

    // Actualizar notificaciones locales
    const index = notificaciones.value.findIndex((n) => n.id === notificacionId)
    if (index !== -1) {
      notificaciones.value.splice(index, 1)
    }

    mostrarAlert('Mensaje eliminado exitosamente', 'success')
  } catch (error) {
    console.error('Error al eliminar notificación:', error)
    mostrarAlert('Error al eliminar el mensaje', 'error')
  }
}

function confirmarLimpiarMensajes() {
  if (
    !confirm(
      '¿Estás seguro de que deseas eliminar TODOS los mensajes? Esta acción no se puede deshacer.',
    )
  ) {
    return
  }

  limpiarTodasLasNotificaciones()
}

function limpiarTodasLasNotificaciones() {
  try {
    const todasNotificaciones = obtenerDatosLS('gym_notificaciones_usuario', [])
    const userId =
      usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

    // Contar mensajes del usuario antes de eliminar
    const mensajesUsuario = todasNotificaciones.filter(
      (notificacion) =>
        notificacion.usuarioId === userId ||
        notificacion.usuarioId === usuarioActual.value?.id ||
        notificacion.usuarioId === usuarioActual.value?.email ||
        notificacion.usuarioId === usuarioActual.value?.correo,
    )

    const totalEliminados = mensajesUsuario.length

    if (totalEliminados === 0) {
      mostrarAlert('No hay mensajes para eliminar', 'info')
      return
    }

    // Filtrar para mantener solo las notificaciones de otros usuarios
    const notificacionesOtrosUsuarios = todasNotificaciones.filter(
      (notificacion) =>
        notificacion.usuarioId !== userId &&
        notificacion.usuarioId !== usuarioActual.value?.id &&
        notificacion.usuarioId !== usuarioActual.value?.email &&
        notificacion.usuarioId !== usuarioActual.value?.correo,
    )

    guardarDatosLS('gym_notificaciones_usuario', notificacionesOtrosUsuarios)

    // Limpiar notificaciones locales
    notificaciones.value = []

    mostrarAlert(`${totalEliminados} mensajes eliminados exitosamente`, 'success')
  } catch (error) {
    console.error('Error al limpiar notificaciones:', error)
    mostrarAlert('Error al limpiar los mensajes', 'error')
  }
}

function getNotificationIcon(tipo) {
  const iconos = {
    solicitud: Bell,
    pago: DollarSign,
    plan: CreditCard,
    general: Info,
    recordatorio: Clock,
  }
  return iconos[tipo] || Info
}

function getNotificationIconColor(tipo) {
  const colores = {
    solicitud: 'text-blue-500',
    pago: 'text-green-500',
    plan: 'text-purple-500',
    general: 'text-gray-500',
    recordatorio: 'text-yellow-500',
  }
  return colores[tipo] || 'text-gray-500'
}

function getNotificationStyle(tipo) {
  const estilos = {
    solicitud: 'border-blue-200 bg-blue-50',
    pago: 'border-green-200 bg-green-50',
    plan: 'border-purple-200 bg-purple-50',
    general: 'border-gray-200 bg-gray-50',
    recordatorio: 'border-yellow-200 bg-yellow-50',
  }
  return estilos[tipo] || 'border-gray-200 bg-gray-50'
}

function formatearFecha(fecha) {
  if (!fecha) return 'Fecha no disponible'

  try {
    let fechaObj

    // Si es un timestamp (número)
    if (typeof fecha === 'number') {
      fechaObj = new Date(fecha)
    }
    // Si es un string
    else if (typeof fecha === 'string') {
      // Formato específico de localStorage: "27/7/2025, 6:50:20 p. m."
      if (fecha.includes('/') && fecha.includes(',')) {
        // Parsear manualmente el formato específico
        const partes = fecha.split(', ')
        if (partes.length === 2) {
          const fechaParte = partes[0] // "27/7/2025"
          const horaParte = partes[1] // "6:50:20 p. m."

          // Parsear fecha DD/M/YYYY
          const [dia, mes, año] = fechaParte.split('/').map(Number)

          // Parsear hora
          let horaTexto = horaParte.replace(' p. m.', '').replace(' a. m.', '')
          const [hora, minuto, segundo] = horaTexto.split(':').map(Number)
          const esPM = horaParte.includes('p. m.')

          // Ajustar hora para formato 24h
          let hora24 = hora
          if (esPM && hora !== 12) {
            hora24 += 12
          } else if (!esPM && hora === 12) {
            hora24 = 0
          }

          fechaObj = new Date(año, mes - 1, dia, hora24, minuto, segundo)
        }
      }
      // Formato ISO string (formato de PayoutsView)
      else if (fecha.includes('T') && fecha.includes('Z')) {
        fechaObj = new Date(fecha)
      }
      // Intentar parseado directo para otros formatos
      else {
        fechaObj = new Date(fecha)
      }
    }
    // Si ya es un objeto Date
    else if (fecha instanceof Date) {
      fechaObj = fecha
    }

    // Verificar si la fecha es válida
    if (!fechaObj || isNaN(fechaObj.getTime())) {
      console.warn('Fecha inválida:', fecha)
      return `Fecha: ${fecha}` // Mostrar la fecha original si no se puede parsear
    }

    // Formatear con mejor legibilidad
    const ahora = new Date()
    const diferencia = ahora - fechaObj
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
    const minutos = Math.floor(diferencia / (1000 * 60))

    // Si es muy reciente (menos de 1 hora)
    if (minutos < 60 && minutos >= 0) {
      if (minutos < 1) return 'Hace un momento'
      return `Hace ${minutos} minuto${minutos !== 1 ? 's' : ''}`
    }

    // Si es del mismo día
    if (fechaObj.toDateString() === ahora.toDateString()) {
      return fechaObj.toLocaleTimeString('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    // Si es de ayer
    const ayer = new Date(ahora)
    ayer.setDate(ayer.getDate() - 1)
    if (fechaObj.toDateString() === ayer.toDateString()) {
      return `Ayer ${fechaObj.toLocaleTimeString('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    }

    // Si es de esta semana (menos de 7 días)
    if (dias < 7 && dias > 0) {
      return fechaObj.toLocaleDateString('es-EC', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    // Para fechas más antiguas o futuras
    return fechaObj.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (error) {
    console.error('Error al formatear fecha:', error, 'Fecha original:', fecha)
    return `Fecha: ${fecha}` // Mostrar la fecha original en caso de error
  }
}

function limpiarErroresPassword() {
  passwordErrors.value = {
    actual: '',
    nueva: '',
    confirmar: '',
  }
}

function validarPassword() {
  limpiarErroresPassword()
  let esValido = true

  // Validar contraseña actual
  if (!formPassword.value.actual) {
    passwordErrors.value.actual = 'La contraseña actual es requerida'
    esValido = false
  }

  // Validar nueva contraseña
  if (!formPassword.value.nueva) {
    passwordErrors.value.nueva = 'La nueva contraseña es requerida'
    esValido = false
  } else if (formPassword.value.nueva.length < 8) {
    passwordErrors.value.nueva = 'La contraseña debe tener al menos 8 caracteres'
    esValido = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formPassword.value.nueva)) {
    passwordErrors.value.nueva =
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    esValido = false
  }

  // Validar confirmación
  if (!formPassword.value.confirmar) {
    passwordErrors.value.confirmar = 'Confirma tu nueva contraseña'
    esValido = false
  } else if (formPassword.value.nueva !== formPassword.value.confirmar) {
    passwordErrors.value.confirmar = 'Las contraseñas no coinciden'
    esValido = false
  }

  return esValido
}

async function cambiarPassword() {
  if (!validarPassword()) {
    return
  }

  cargandoPassword.value = true

  try {
    // Verificar contraseña actual
    if (formPassword.value.actual !== usuarioActual.value?.password) {
      passwordErrors.value.actual = 'La contraseña actual es incorrecta'
      return
    }

    // Actualizar contraseña en localStorage
    const usuarios = obtenerDatosLS('gym_usuarios', [])
    const userId =
      usuarioActual.value?.id || usuarioActual.value?.email || usuarioActual.value?.correo

    const usuarioIndex = usuarios.findIndex(
      (u) =>
        u.id === userId ||
        u.email === userId ||
        u.correo === userId ||
        u.id === usuarioActual.value?.id ||
        u.email === usuarioActual.value?.email ||
        u.correo === usuarioActual.value?.correo,
    )

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].password = formPassword.value.nueva
      guardarDatosLS('gym_usuarios', usuarios)

      // Actualizar también el auth store
      authStore.updateUser({ password: formPassword.value.nueva })

      mostrarAlert('Contraseña actualizada exitosamente', 'success')
      cerrarModalPassword()
    } else {
      passwordErrors.value.actual = 'Error al encontrar el usuario'
    }
  } catch (error) {
    console.error('Error cambiando contraseña:', error)
    passwordErrors.value.actual = 'Error al cambiar la contraseña'
  } finally {
    cargandoPassword.value = false
  }
}

function cerrarModalPassword() {
  mostrarCambiarPassword.value = false
  formPassword.value = {
    actual: '',
    nueva: '',
    confirmar: '',
  }
  limpiarErroresPassword()
}

function cerrarSesion() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    authStore.logout()
    router.push('/login')
    mostrarAlert('Sesión cerrada exitosamente', 'info')
  }
}

// Watchers para reactividad
watch(
  () => usuarioActual.value?.plan,
  () => {
    cargarPlanActual()
  },
  { immediate: false },
)

// Watcher para detectar cambios en localStorage
watch(
  () => localStorage.getItem('gym_usuarios'),
  () => {
    cargarPlanActual()
  },
)

// Lifecycle
onMounted(() => {
  authStore.initializeAuth()
  cargarDatosUsuario()

  // Agregar event listener para cambios en localStorage desde otras pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'gym_usuarios' || e.key === 'user') {
      authStore.initializeAuth()
      cargarDatosUsuario()
    }
  })

  // Agregar listener para cuando la página se vuelve visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      authStore.initializeAuth()
      cargarDatosUsuario()
    }
  })

  // Agregar listener para el evento focus de la ventana
  window.addEventListener('focus', () => {
    authStore.initializeAuth()
    cargarDatosUsuario()
  })
})

// Detectar cuando la vista se activa (regresa de otra ruta)
onActivated(() => {
  authStore.initializeAuth()
  cargarDatosUsuario()
})
</script>

<style scoped>
.profile-view {
  font-family: 'Inter', sans-serif;
}

/* Animaciones suaves */
.transition-all {
  transition: all 0.3s ease;
}

/* Efectos hover personalizados */
.hover\:shadow-lg:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Gradientes personalizados */
.bg-gradient-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
