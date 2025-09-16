<template>
  <div class="plans-view">
    <!-- Header -->
    <section
      class="hero-background text-gray-800 text-center py-20 min-h-[30vh] bg-gray-50 flex items-center justify-center"
    >
      <div>
        <h1
          class="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Planes de Membresía
        </h1>
        <p class="mt-4 text-lg text-white max-w-2xl mx-auto">
          Elige el plan perfecto para tu estilo de vida y comienza tu transformación fitness hoy
          mismo
        </p>
      </div>
    </section>

    <!-- Planes -->
    <section class="py-10 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div
            v-for="plan in planes"
            :key="plan.id"
            class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-300 relative group"
            :class="{
              'border-blue-400 ring-2 ring-blue-100 shadow-blue-100': plan.estado === 'destacado',
              'opacity-75': auth.isLoggedIn && tienePlanActual(plan),
            }"
          >
            <!-- Badge destacado -->
            <div
              v-if="plan.estado === 'destacado'"
              class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-10"
            >
              Más Popular
            </div>

            <!-- Badge plan actual mejorado -->
            <div
              v-if="auth.isLoggedIn && tienePlanActual(plan)"
              class="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 flex items-center gap-1 border-2 border-white animate-pulse"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              ACTIVO
            </div>
            <div class="flex flex-col gap-4 flex-grow">
              <!-- Nombre y descripción -->
              <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ plan.nombre }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ plan.descripcion }}</p>
              </div>

              <!-- Precio -->
              <div class="text-center py-4">
                <div class="flex items-center justify-center gap-2">
                  <span
                    v-if="plan.precio === 0"
                    class="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    GRATIS
                  </span>
                  <template v-else>
                    <span
                      class="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      ${{ plan.precio }}
                    </span>
                    <span class="text-gray-600 font-medium">/ {{ plan.duracion }}</span>
                  </template>
                </div>
              </div>

              <!-- Ventajas -->
              <div class="flex-grow">
                <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Incluye:
                </h4>
                <ul class="space-y-2 mb-4">
                  <li
                    v-for="ventaja in plan.ventajas"
                    :key="ventaja"
                    class="flex items-center gap-2 text-gray-700"
                  >
                    <svg
                      class="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>{{ ventaja }}</span>
                  </li>
                </ul>

                <!-- Desventajas -->
                <div v-if="plan.desventajas && plan.desventajas.length > 0" class="mb-4">
                  <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Limitaciones:
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="desventaja in plan.desventajas"
                      :key="desventaja"
                      class="flex items-center gap-2 text-gray-600"
                    >
                      <svg
                        class="w-4 h-4 text-red-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>{{ desventaja }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Botón de suscripción -->
              <button
                @click="iniciarSuscripcion(plan)"
                class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                :class="
                  auth.isLoggedIn && tienePlanActual(plan)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75'
                    : plan.estado === 'destacado'
                      ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600'
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg'
                "
                :disabled="auth.isLoggedIn && tienePlanActual(plan)"
              >
                <svg
                  v-if="auth.isLoggedIn && tienePlanActual(plan)"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span v-if="auth.isLoggedIn && tienePlanActual(plan)">Plan Activo</span>
                <span v-else-if="plan.precio === 0">
                  <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Activar Plan Gratuito
                </span>
                <span v-else>
                  <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Suscribirse Ahora
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de pago -->
    <div
      v-if="showPaymentModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarModal"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h3
            class="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Suscripción {{ planSeleccionado?.nombre }}
          </h3>
          <button @click="cerrarModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="procesarPago" class="space-y-6">
          <!-- Información del plan -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-semibold text-gray-800 mb-2">Resumen del Plan</h4>
            <div class="flex justify-between items-center">
              <span class="text-gray-600"> {{ planSeleccionado?.nombre }}</span>
              <span class="font-bold text-gray-800">
                ${{ planSeleccionado?.precio }} / {{ planSeleccionado?.duracion }}</span
              >
            </div>
          </div>

          <!-- Información de pago -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-800">Información de Depósito</h4>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-blue-800 font-medium mb-2">Datos para Depósito/Transferencia:</p>
              <div class="space-y-1 text-sm text-blue-700">
                <p><strong>Banco:</strong> Banco Nacional</p>
                <p><strong>Cuenta:</strong> 1234-5678-9012-3456</p>
                <p><strong>Titular:</strong> Gimnasio Universitario</p>
                <p><strong>Monto:</strong> $ {{ planSeleccionado?.precio }}</p>
              </div>
            </div>
          </div>

          <!-- Subir factura -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Subir Comprobante de Pago *
            </label>
            <input
              ref="fileInput"
              type="file"
              accept="image/*,.pdf"
              required
              @change="handleFileUpload"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <p class="text-xs text-gray-500">Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</p>
          </div>

          <!-- Información adicional -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"> Comentarios adicionales </label>
            <textarea
              v-model="comentarios"
              rows="3"
              placeholder="Información adicional sobre el pago..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Botones -->
          <div class="flex gap-3">
            <button
              type="button"
              @click="cerrarModal"
              class="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="!archivoSeleccionado"
              class="flex-1 py-3 px-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Estados reactivos
const planes = ref([])
const showPaymentModal = ref(false)
const planSeleccionado = ref(null)
const archivoSeleccionado = ref(null)
const comentarios = ref('')
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// Datos por defecto de los planes
const planesDefault = [
  {
    id: 1,
    nombre: 'Plan Básico',
    descripcion: 'Perfecto para comenzar tu journey fitness con acceso completo al gimnasio.',
    precio: 0,
    duracion: 'mes',
    ventajas: [
      'Acceso completo al gimnasio',
      'Uso de todas las máquinas',
      'Área de pesas libres',
      'Vestuarios y duchas',
      'Estacionamiento gratuito',
    ],
    desventajas: [
      'Sin clases grupales',
      'Sin entrenador personal',
      'Horario limitado los fines de semana',
    ],
    estado: 'activo',
    esGratuito: true,
  },
  {
    id: 2,
    nombre: 'Plan Premium',
    descripcion: 'La opción más popular con beneficios adicionales para maximizar tus resultados.',
    precio: 45,
    duracion: 'mes',
    ventajas: [
      'Todo lo del Plan Básico',
      'Clases grupales ilimitadas',
      '2 sesiones de entrenador personal',
      'Acceso 24/7',
      'Área VIP con equipos especializados',
      'Análisis corporal mensual',
      'Bebidas energéticas gratis',
    ],
    desventajas: ['Costo más elevado', 'Requiere reserva previa para algunas áreas'],
    estado: 'destacado',
  },
  {
    id: 3,
    nombre: 'Plan Elite',
    descripcion: 'La experiencia completa para atletas serios y entusiastas del fitness.',
    precio: 75,
    duracion: 'mes',
    ventajas: [
      'Todo lo del Plan Premium',
      'Entrenador personal ilimitado',
      'Plan nutricional personalizado',
      'Acceso a piscina y spa',
      'Casillero personalizado',
      'Toallas incluidas',
      'Suplementos deportivos con descuento',
      'Invitado gratis 2 veces por mes',
    ],
    desventajas: ['Precio más alto', 'Disponibilidad limitada'],
    estado: 'activo',
  },
]

// Cargar planes desde localStorage al montar el componente
onMounted(() => {
  const storedPlanes = localStorage.getItem('gym_planes')
  if (storedPlanes) {
    planes.value = JSON.parse(storedPlanes)
  } else {
    planes.value = planesDefault
    localStorage.setItem('gym_planes', JSON.stringify(planesDefault))
  }
})

// Función para iniciar el proceso de suscripción
function iniciarSuscripcion(plan) {
  if (!auth.isLoggedIn) {
    mostrarAlert('Debes iniciar sesión para suscribirte a un plan', 'error')
    return
  }

  // Verificar si ya tiene este plan
  if (tienePlanActual(plan)) {
    mostrarAlert('Ya tienes este plan activo', 'info')
    return
  }

  // Si es un plan gratuito, activarlo inmediatamente
  if (plan.precio === 0) {
    activarPlanGratuito(plan)
    return
  }

  // Para planes de pago, abrir el modal
  planSeleccionado.value = plan
  showPaymentModal.value = true
}

// Función para verificar si el usuario tiene el plan actual
function tienePlanActual(plan) {
  if (!auth.currentUser) return false

  // Priorizar planActivo (ID del plan) como fuente de verdad
  if (auth.currentUser.planActivo) {
    return auth.currentUser.planActivo === plan.id
  }

  // Si no hay planActivo, usar planActual o plan como fallback
  const planUsuario = auth.currentUser.planActual || auth.currentUser.plan
  return planUsuario === plan.nombre
}

// Función para activar un plan gratuito
function activarPlanGratuito(plan) {
  try {
    // Actualizar el usuario actual con el nuevo plan
    const usuarioActualizado = {
      ...auth.currentUser,
      plan: plan.nombre,
      planActual: plan.nombre,
      planActivo: plan.id,
      fechaVencimiento: null, // Los planes gratuitos no tienen vencimiento
      fechaActualizacionPlan: new Date().toISOString(),
    }

    // Actualizar en el store de auth
    auth.updateUser(usuarioActualizado)

    // Actualizar en localStorage de usuarios
    const usuarios = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
    const indexUsuario = usuarios.findIndex((u) => u.id === auth.currentUser.id)
    if (indexUsuario !== -1) {
      usuarios[indexUsuario] = usuarioActualizado
      localStorage.setItem('gym_usuarios', JSON.stringify(usuarios))
    }

    mostrarAlert(`¡Plan ${plan.nombre} activado exitosamente!`, 'success')
  } catch {
    mostrarAlert('Error al activar el plan. Inténtalo de nuevo.', 'error')
  }
}

// Función para manejar la subida de archivos
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Validar tamaño del archivo (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      mostrarAlert('El archivo no puede superar los 5MB', 'error')
      event.target.value = ''
      return
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      mostrarAlert('Solo se aceptan archivos JPG, PNG o PDF', 'error')
      event.target.value = ''
      return
    }

    // En una implementación real, aquí se subiría el archivo al servidor
    // Para esta demo, convertimos el archivo a base64 para simularlo
    const reader = new FileReader()
    reader.onload = function (e) {
      archivoSeleccionado.value = {
        file: file,
        nombre: file.name,
        tipo: file.type,
        tamaño: file.size,
        contenido: e.target.result, // Base64 del archivo
      }
    }
    reader.readAsDataURL(file)
  }
}

// Función para procesar el pago
function procesarPago() {
  if (!archivoSeleccionado.value) {
    mostrarAlert('Debes subir un comprobante de pago', 'error')
    return
  }

  const usuario = auth.currentUser
  const plan = planSeleccionado.value

  // Simular procesamiento del pago
  const solicitudPago = {
    id: Date.now().toString(),
    usuarioId: usuario?.id || `user_${Date.now()}`,
    usuario: {
      nombre: usuario?.nombre || usuario?.nombreCompleto || usuario?.email || 'Usuario',
      email: usuario?.email || usuario?.correo || '',
      telefono: usuario?.telefono || 'No especificado',
      planActual: usuario?.plan || 'Plan Básico',
    },
    planSolicitado: {
      id: plan.id,
      nombre: plan.nombre,
      precio: plan.precio,
      duracion: plan.duracion,
    },
    comprobante: {
      nombre: archivoSeleccionado.value.nombre,
      tipo: archivoSeleccionado.value.tipo,
      tamaño: archivoSeleccionado.value.tamaño,
      contenido: archivoSeleccionado.value.contenido,
    },
    comentarios: comentarios.value,
    fechaSolicitud: new Date().toLocaleString('es-EC'),
    estado: 'pendiente', // pendiente, aprobado, rechazado
    observaciones: '',
  }

  // Guardar la solicitud en localStorage para que el admin la pueda revisar
  const solicitudesExistentes = JSON.parse(localStorage.getItem('gym_solicitudes_pago') || '[]')
  solicitudesExistentes.push(solicitudPago)
  localStorage.setItem('gym_solicitudes_pago', JSON.stringify(solicitudesExistentes))

  // Cerrar modal y mostrar mensaje de éxito
  cerrarModal()
  mostrarAlert(
    `Solicitud enviada exitosamente. Tu solicitud será revisada en las próximas 24 horas.`,
    'success',
  )
}

// Función para cerrar el modal
function cerrarModal() {
  showPaymentModal.value = false
  planSeleccionado.value = null
  archivoSeleccionado.value = null
  comentarios.value = ''

  // Limpiar el input de archivo
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.value = ''
  }
}

// Función para mostrar alert personalizado
function mostrarAlert(mensaje, tipo = 'success') {
  alertMessage.value = mensaje
  alertType.value = tipo
  showAlert.value = true

  setTimeout(() => {
    showAlert.value = false
  }, 4000)
}

// Función para cerrar alert
function cerrarAlert() {
  showAlert.value = false
}
</script>

<style scoped>
/* Animaciones personalizadas */
.plans-view {
  min-height: 100vh;
}

/* Efectos hover para las tarjetas */
.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Gradiente de texto personalizado */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Estilos para el modal */
.max-h-\[90vh\] {
  max-height: 90vh;
}

/* Animaciones del modal */
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

.hero-background {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/banner3.png');
  background-repeat: no-repeat;
}
</style>
