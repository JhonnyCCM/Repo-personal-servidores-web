<template>
  <div
    class="login-view min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center py-12 px-4"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-6 text-white text-center"
      >
        <div class="mb-4">
          <div
            class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold">Iniciar Sesión</h1>
          <p class="text-white/80 text-sm">Gimnasio Universitario ULEAM</p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Campo de correo -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"> Correo Electrónico </label>
            <div class="relative">
              <input
                v-model="form.correo"
                type="email"
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                :class="{ 'border-red-500': errors.correo }"
                placeholder="admin@uleam.edu.ec o e1234567890@uleam.edu.ec"
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  ></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.correo" class="text-red-500 text-xs">{{ errors.correo }}</p>
          </div>

          <!-- Campo de contraseña -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"> Contraseña </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Ingresa tu contraseña"
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
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

          <!-- Recordar sesión -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Botón de login -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 px-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Link de registro -->
        <div class="text-center mt-6 pt-6 border-t border-gray-200">
          <p class="text-gray-600">
            ¿No tienes una cuenta?
            <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-semibold">
              Regístrate aquí
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAlert } from '@/composables/useGym'

const router = useRouter()
const auth = useAuthStore()
const { mostrarAlert } = useAlert()

// Estados reactivos
const isSubmitting = ref(false)
const showPassword = ref(false)

// Formulario reactivo
const form = reactive({
  correo: '',
  password: '',
})

// Errores de validación
const errors = reactive({
  correo: '',
  password: '',
})

// Función para validar el formulario
function validateForm() {
  errors.correo = ''
  errors.password = ''

  let isValid = true

  // Validar correo
  if (!form.correo.trim()) {
    errors.correo = 'El correo es requerido'
    isValid = false
  } else {
    // Validar formato de correo (permitir admin@uleam.edu.ec o formato institucional)
    const adminEmailRegex = /^admin@uleam\.edu\.ec$/
    const studentEmailRegex = /^e\d{10}@uleam\.edu\.ec$/

    if (!adminEmailRegex.test(form.correo.trim()) && !studentEmailRegex.test(form.correo.trim())) {
      errors.correo = 'Usa admin@uleam.edu.ec o tu correo institucional (e1234567890@uleam.edu.ec)'
      isValid = false
    }
  }

  // Validar contraseña
  if (!form.password) {
    errors.password = 'La contraseña es requerida'
    isValid = false
  }

  return isValid
}

// Función para manejar el login
async function handleLogin() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Obtener usuarios del localStorage
    const usuariosExistentes = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')

    // Buscar usuario por correo y contraseña
    const usuario = usuariosExistentes.find(
      (user) => user.correo === form.correo.trim() && user.password === form.password,
    )

    if (!usuario) {
      mostrarAlert('Correo o contraseña incorrectos. Verifica tus credenciales.', 'error')
      return
    }

    // Verificar que el usuario esté activo
    if (usuario.estado !== 'activo') {
      mostrarAlert('Tu cuenta está inactiva. Contacta al administrador.', 'error')
      return
    }

    // Login exitoso - asegurar que el usuario tenga plan básico por defecto
    if (!usuario.plan && usuario.rol !== 'admin') {
      usuario.plan = 'Plan Básico'
      usuario.fechaVencimiento = null

      // Actualizar en localStorage
      const usuarios = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
      const index = usuarios.findIndex((u) => u.id === usuario.id)
      if (index !== -1) {
        usuarios[index] = usuario
        localStorage.setItem('gym_usuarios', JSON.stringify(usuarios))
      }
    }

    // usar el store de auth
    auth.login(usuario)

    // Mostrar mensaje de éxito
    mostrarAlert(`¡Bienvenido, ${usuario.nombreCompleto}!`, 'success')

    // Limpiar formulario
    form.correo = ''
    form.password = ''

    // Redirigir según el rol después de 1.5 segundos
    setTimeout(() => {
      if (usuario.rol === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    }, 1500)
  } catch {
    mostrarAlert('Error al iniciar sesión. Por favor, inténtalo de nuevo.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Estilos personalizados para el componente */
.login-view {
  background-attachment: fixed;
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

/* Animación para el botón */
.transform.transition-all {
  transition: all 0.3s ease;
}

/* Efectos hover */
.hover\:scale-105:hover {
  transform: scale(1.05);
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

.login-view {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/5.png');
  background-repeat: no-repeat;
}
</style>
