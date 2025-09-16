import { ref } from 'vue'

// Estados globales para alertas
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success') // success, error, info, warning

// =============================================
// COMPOSABLE PARA ALERTAS
// =============================================

export function useAlert() {
  const mostrarAlert = (mensaje, tipo = 'success') => {
    alertMessage.value = mensaje
    alertType.value = tipo
    showAlert.value = true

    // Auto cerrar después de 3 segundos
    setTimeout(() => {
      showAlert.value = false
    }, 3000)
  }

  const cerrarAlert = () => {
    showAlert.value = false
  }

  return {
    showAlert,
    alertMessage,
    alertType,
    mostrarAlert,
    cerrarAlert,
  }
}

// =============================================
// FUNCIONES DE LOCALSTORAGE
// =============================================

// Función para actualizar localStorage de clases
export function updateClassesLocalStorage(clases) {
  localStorage.setItem('gym_clases', JSON.stringify(clases))
}

// Función para cargar clases desde localStorage
export function loadClassesFromStorage() {
  const storedClases = localStorage.getItem('gym_clases')
  return storedClases ? JSON.parse(storedClases) : []
}

// Función para actualizar localStorage de usuarios
export function updateUsersLocalStorage(usuarios) {
  localStorage.setItem('gym_usuarios', JSON.stringify(usuarios))
}

// Función para inicializar usuario admin
export function initializeAdminUser() {
  const usuarios = JSON.parse(localStorage.getItem('gym_usuarios') || '[]')
  const adminExists = usuarios.some((user) => user.rol === 'admin')

  if (!adminExists) {
    const adminUser = {
      id: 'admin_001',
      nombre: 'Administrador',
      apellido: 'Sistema',
      nombreCompleto: 'Administrador Sistema',
      email: 'admin@uleam.edu.ec', // Cambiar correo por email para consistencia
      correo: 'admin@uleam.edu.ec', // Mantener ambos para compatibilidad
      password: 'admin123',
      rol: 'admin',
      estado: 'activo',
      fechaRegistro: new Date().toISOString(),
      tipo: 'administrador',
      plan: 'Administrador', // Los admins no necesitan plan básico
    }
    usuarios.push(adminUser)
    localStorage.setItem('gym_usuarios', JSON.stringify(usuarios))
    return true
  }
  return false
}

// Función para cargar usuarios desde localStorage
export function loadUsersFromStorage() {
  const storedUsers = localStorage.getItem('gym_usuarios')
  const users = storedUsers ? JSON.parse(storedUsers) : []

  // Asegurar que existe el usuario admin
  const adminExists = users.some((user) => user.rol === 'admin')
  if (!adminExists) {
    const adminUser = {
      id: 'admin_001',
      nombre: 'Administrador',
      apellido: 'Sistema',
      nombreCompleto: 'Administrador Sistema',
      email: 'admin@uleam.edu.ec', // Cambiar correo por email para consistencia
      correo: 'admin@uleam.edu.ec', // Mantener ambos para compatibilidad
      password: 'admin123',
      rol: 'admin',
      estado: 'activo',
      fechaRegistro: new Date().toISOString(),
      tipo: 'administrador',
      plan: 'Administrador', // Los admins no necesitan plan básico
    }
    users.push(adminUser)
  }

  // Asegurar que todos los usuarios tengan un plan básico por defecto
  const updatedUsers = users.map((user) => {
    if (!user.plan && user.rol !== 'admin') {
      return {
        ...user,
        plan: 'Plan Básico',
        fechaVencimiento: null,
      }
    }
    return user
  })

  // Si se actualizaron usuarios, guardar los cambios
  if (JSON.stringify(users) !== JSON.stringify(updatedUsers) || !adminExists) {
    localStorage.setItem('gym_usuarios', JSON.stringify(updatedUsers))
  }

  return updatedUsers
}

// =============================================
// FUNCIONES GENERALES DE LOCALSTORAGE
// =============================================

// Función genérica para obtener datos de localStorage
export function obtenerDatosLS(clave, valorPorDefecto = []) {
  try {
    const datos = localStorage.getItem(clave)
    return datos ? JSON.parse(datos) : valorPorDefecto
  } catch (error) {
    console.error(`Error al obtener datos de localStorage (${clave}):`, error)
    return valorPorDefecto
  }
}

// Función genérica para guardar datos en localStorage
export function guardarDatosLS(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos))
    return true
  } catch (error) {
    console.error(`Error al guardar datos en localStorage (${clave}):`, error)
    return false
  }
}

// Función para limpiar datos de prueba del localStorage
export function limpiarDatosPrueba() {
  // Verificar si ya se ejecutó la limpieza
  const limpiezaRealizada = localStorage.getItem('gym_limpieza_realizada')
  if (limpiezaRealizada) {
    return // Ya se realizó la limpieza
  }

  // Limpiar usuarios de prueba (mantener solo admin)
  const usuarios = obtenerDatosLS('gym_usuarios', [])
  const usuariosLimpios = usuarios.filter((user) => user.rol === 'admin')
  guardarDatosLS('gym_usuarios', usuariosLimpios)

  // Limpiar solicitudes de pago de prueba
  guardarDatosLS('gym_solicitudes_pago', [])

  // Limpiar notificaciones de prueba
  guardarDatosLS('gym_notificaciones_usuario', [])

  // Marcar como realizada la limpieza
  localStorage.setItem('gym_limpieza_realizada', 'true')
}

// =============================================
// UTILIDADES PARA CLASES
// =============================================

// Función para obtener cupos disponibles
export function getCuposDisponibles(clase) {
  return clase.cuposTotal - (clase.inscritos?.length || 0)
}

// Función para obtener clase de color según disponibilidad de cupos
export function getCuposClass(clase) {
  const disponibles = getCuposDisponibles(clase)
  const porcentajeDisponible = (disponibles / clase.cuposTotal) * 100

  if (disponibles === 0) return 'text-red-600 font-bold'
  if (porcentajeDisponible <= 20) return 'text-orange-600 font-bold'
  return 'text-green-600 font-bold'
}

// Función para obtener colores de nivel
export function getNivelColor(nivel) {
  switch (nivel) {
    case 'Principiante':
      return 'bg-green-100 text-green-800'
    case 'Intermedio':
      return 'bg-yellow-100 text-yellow-800'
    case 'Avanzado':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

// =============================================
// VALIDACIONES Y UTILIDADES
// =============================================

// Función para validar email
export function isValidEmail(email) {
  const adminEmailRegex = /^admin@uleam\.edu\.ec$/
  const studentEmailRegex = /^e\d{10}@uleam\.edu\.ec$/
  return adminEmailRegex.test(email) || studentEmailRegex.test(email)
}

// Función para generar ID único
export function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9)
}

// Función para formatear fecha
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Función para manejar errores de imagen
export function handleImageError(event, fallbackSrc = '/img/banner/gym1.jpeg') {
  event.target.src = fallbackSrc
}

// =============================================
// COMPOSABLE PRINCIPAL PARA FORMULARIOS
// =============================================

export function useFormValidation() {
  const errors = ref({})
  const isValid = ref(true)

  const validateField = (fieldName, value, rules) => {
    errors.value[fieldName] = ''

    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.value[fieldName] = `${fieldName} es requerido`
      return false
    }

    if (rules.email && value && !isValidEmail(value)) {
      errors.value[fieldName] = 'Formato de email inválido'
      return false
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.value[fieldName] = `Mínimo ${rules.minLength} caracteres`
      return false
    }

    if (rules.min && value && value < rules.min) {
      errors.value[fieldName] = `Valor mínimo: ${rules.min}`
      return false
    }

    return true
  }

  const validateForm = (formData, validationRules) => {
    let formIsValid = true
    errors.value = {}

    for (const [fieldName, rules] of Object.entries(validationRules)) {
      const fieldValue = formData[fieldName]
      if (!validateField(fieldName, fieldValue, rules)) {
        formIsValid = false
      }
    }

    isValid.value = formIsValid
    return formIsValid
  }

  const clearErrors = () => {
    errors.value = {}
    isValid.value = true
  }

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    clearErrors,
  }
}
