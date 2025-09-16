import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Inicializar desde localStorage al crear el store
  const storedUser = localStorage.getItem('user') // Cambiar de gym_currentUser a user
  const isLoggedIn = ref(!!storedUser)
  const currentUser = ref(storedUser ? JSON.parse(storedUser) : null)

  // Computed para verificar si el usuario es admin
  const isAdmin = computed(() => {
    return currentUser.value?.rol === 'admin'
  })

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return currentUser.value?.rol === role
  }

  function login(userData) {
    // Asegurar que el userData tenga un rol por defecto
    const userWithRole = {
      ...userData,
      rol: userData.rol || 'user', // Por defecto es 'user'
    }

    // Usar 'user' como clave para consistencia con el resto de la app
    localStorage.setItem('user', JSON.stringify(userWithRole))
    currentUser.value = userWithRole
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem('user')
    currentUser.value = null
    isLoggedIn.value = false
  }

  // Función para actualizar el usuario actual
  function updateUser(userData) {
    const updatedUser = { ...currentUser.value, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    currentUser.value = updatedUser
  }

  // Función para inicializar/verificar la sesión
  function initializeAuth() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        currentUser.value = user
        isLoggedIn.value = true
      } catch (error) {
        console.error('Error al restaurar sesión:', error)
        logout()
      }
    } else {
      logout()
    }
  }

  return {
    isLoggedIn,
    currentUser,
    isAdmin,
    hasRole,
    login,
    logout,
    updateUser,
    initializeAuth,
  }
})
