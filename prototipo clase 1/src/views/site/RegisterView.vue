<template>
  <div
    class="register-view min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center py-12 px-4"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header con progreso -->
      <div class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-6 text-white">
        <div class="text-center mb-4">
          <h1 class="text-2xl font-bold">Registro de Usuario</h1>
          <p class="text-white/80 text-sm">Gimnasio Universitario ULEAM</p>
        </div>

        <!-- Indicador de pasos -->
        <div class="flex justify-center items-center space-x-2">
          <div v-for="step in 3" :key="step" class="flex items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
              :class="currentStep >= step ? 'bg-white text-blue-600' : 'bg-white/30 text-white/70'"
            >
              {{ step }}
            </div>
            <div
              v-if="step < 3"
              class="w-8 h-1 mx-2 rounded transition-all duration-300"
              :class="currentStep > step ? 'bg-white' : 'bg-white/30'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Paso 1: Información Personal -->
          <div v-if="currentStep === 1" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                v-model="form.nombre"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                :class="{ 'border-red-500': errors.nombre }"
                placeholder="Ingresa tu nombre"
              />
              <p v-if="errors.nombre" class="text-red-500 text-xs">{{ errors.nombre }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Apellido</label>
              <input
                v-model="form.apellido"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                :class="{ 'border-red-500': errors.apellido }"
                placeholder="Ingresa tu apellido"
              />
              <p v-if="errors.apellido" class="text-red-500 text-xs">{{ errors.apellido }}</p>
            </div>
          </div>

          <!-- Paso 2: Correo Electrónico -->
          <div v-if="currentStep === 2" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Correo Institucional</h2>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Correo Electrónico
                <span class="text-xs text-gray-500">(Formato: e1234567890@uleam.edu.ec)</span>
              </label>
              <input
                v-model="form.correo"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                :class="{ 'border-red-500': errors.correo }"
                placeholder="e1234567890@uleam.edu.ec"
              />
              <p v-if="errors.correo" class="text-red-500 text-xs">{{ errors.correo }}</p>

              <!-- Ayuda visual para el formato -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <div class="font-medium text-blue-800 mb-1">Formato requerido:</div>
                <div class="text-blue-700">
                  <span class="font-mono bg-blue-100 px-1 rounded">e</span> +
                  <span class="font-mono bg-blue-100 px-1 rounded">10 dígitos de cédula</span> +
                  <span class="font-mono bg-blue-100 px-1 rounded">@uleam.edu.ec</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 3: Contraseña -->
          <div v-if="currentStep === 3" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Contraseña</h2>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Contraseña</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  :class="{ 'border-red-500': errors.password }"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  :class="{ 'border-red-500': errors.confirmPassword }"
                  placeholder="Confirma tu contraseña"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    v-if="showConfirmPassword"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-500 text-xs">
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Criterios de contraseña -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
              <div class="font-medium text-gray-800 mb-2">La contraseña debe contener:</div>
              <ul class="space-y-1 text-gray-600">
                <li class="flex items-center gap-2">
                  <span :class="passwordCriteria.length ? 'text-green-600' : 'text-gray-400'">
                    {{ passwordCriteria.length ? '✓' : '○' }}
                  </span>
                  Al menos 8 caracteres
                </li>
                <li class="flex items-center gap-2">
                  <span :class="passwordCriteria.uppercase ? 'text-green-600' : 'text-gray-400'">
                    {{ passwordCriteria.uppercase ? '✓' : '○' }}
                  </span>
                  Al menos una mayúscula
                </li>
                <li class="flex items-center gap-2">
                  <span :class="passwordCriteria.lowercase ? 'text-green-600' : 'text-gray-400'">
                    {{ passwordCriteria.lowercase ? '✓' : '○' }}
                  </span>
                  Al menos una minúscula
                </li>
                <li class="flex items-center gap-2">
                  <span :class="passwordCriteria.number ? 'text-green-600' : 'text-gray-400'">
                    {{ passwordCriteria.number ? '✓' : '○' }}
                  </span>
                  Al menos un número
                </li>
              </ul>
            </div>
          </div>

          <!-- Botones de navegación -->
          <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < 3"
              type="button"
              @click="nextStep"
              class="px-6 py-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Siguiente
            </button>
            <button
              v-else
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Registrando...' : 'Registrarse' }}
            </button>
          </div>
        </form>

        <!-- Link de inicio de sesión -->
        <div class="text-center mt-6 pt-6 border-t border-gray-200">
          <p class="text-gray-600">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-semibold">
              Inicia sesión
            </router-link>
          </p>
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
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados reactivos
const currentStep = ref(1)
const isSubmitting = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// Formulario reactivo
const form = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  confirmPassword: '',
})

// Errores de validación
const errors = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  confirmPassword: '',
})

// Criterios de contraseña
const passwordCriteria = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-Z]/.test(form.password),
  lowercase: /[a-z]/.test(form.password),
  number: /\d/.test(form.password),
}))

// Validaciones por paso
function validateStep1() {
  errors.nombre = ''
  errors.apellido = ''

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es requerido'
  } else if (form.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre.trim())) {
    errors.nombre = 'El nombre solo puede contener letras'
  }

  if (!form.apellido.trim()) {
    errors.apellido = 'El apellido es requerido'
  } else if (form.apellido.trim().length < 2) {
    errors.apellido = 'El apellido debe tener al menos 2 caracteres'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellido.trim())) {
    errors.apellido = 'El apellido solo puede contener letras'
  }

  return !errors.nombre && !errors.apellido
}

function validateStep2() {
  errors.correo = ''

  if (!form.correo.trim()) {
    errors.correo = 'El correo es requerido'
  } else {
    // Validar formato específico: e + 10 dígitos + @uleam.edu.ec
    const emailRegex = /^e\d{10}@uleam\.edu\.ec$/
    if (!emailRegex.test(form.correo.trim())) {
      errors.correo =
        'El correo debe tener el formato: e1234567890@uleam.edu.ec (e + 10 dígitos de cédula + @uleam.edu.ec)'
    } else {
      // Verificar que no esté ya registrado
      const usuariosExistentes = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
      const emailExists = usuariosExistentes.some(
        (usuario) => usuario.correo === form.correo.trim(),
      )
      if (emailExists) {
        errors.correo = 'Este correo ya está registrado'
      }
    }
  }

  return !errors.correo
}

function validateStep3() {
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.password) {
    errors.password = 'La contraseña es requerida'
  } else if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
    errors.password =
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return !errors.password && !errors.confirmPassword
}

// Navegación entre pasos
function nextStep() {
  let isValid = false

  switch (currentStep.value) {
    case 1:
      isValid = validateStep1()
      break
    case 2:
      isValid = validateStep2()
      break
    case 3:
      isValid = validateStep3()
      break
  }

  if (isValid) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Envío del formulario
async function handleSubmit() {
  if (!validateStep3()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Crear el objeto usuario
    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      correo: form.correo.trim(),
      password: form.password, // En producción, esto debería estar hasheado
      fechaRegistro: new Date().toISOString(),
      estado: 'activo',
      tipo: 'estudiante', // Para distinguir de admin
      cedula: form.correo.slice(1, 11), // Extraer los 10 dígitos de la cédula del correo
      nombreCompleto: `${form.nombre.trim()} ${form.apellido.trim()}`,
      rol: 'user', // Rol por defecto
      plan: 'Plan Básico', // Plan gratuito por defecto
      fechaVencimiento: null, // Los planes gratuitos no tienen vencimiento
    }

    // Obtener usuarios existentes del localStorage
    const usuariosExistentes = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')

    // Agregar el nuevo usuario
    usuariosExistentes.push(nuevoUsuario)

    // Guardar en localStorage
    localStorage.setItem('gym_usuarios', JSON.stringify(usuariosExistentes))

    // Mostrar mensaje de éxito
    mostrarAlert(
      '¡Registro exitoso! Se te ha asignado el Plan Básico gratuito. Ahora puedes iniciar sesión con tu cuenta.',
      'success',
    )

    // Resetear formulario
    Object.keys(form).forEach((key) => {
      form[key] = ''
    })
    currentStep.value = 1

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch {
    mostrarAlert('Error al registrar usuario. Por favor, inténtalo de nuevo.', 'error')
  } finally {
    isSubmitting.value = false
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
/* Estilos personalizados para el componente */
.register-view {
  background-attachment: fixed;
}

/* Animaciones para las transiciones de pasos */
.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Estilos para los inputs con focus */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Gradiente de texto para el encabezado */
.gradient-text {
  background: linear-gradient(to right, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animación para el indicador de progreso */
.progress-step {
  transition: all 0.3s ease;
}

/* Estilos para criterios de contraseña */
.criteria-check {
  transition: color 0.2s ease;
}

.register-view {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/2.png');
  background-repeat: no-repeat;
}
</style>
