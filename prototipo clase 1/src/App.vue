<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import GlobalAlert from './components/common/GlobalAlert.vue'
import { initializeAdminUser, limpiarDatosPrueba } from './composables/useGym'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

// Inicializar usuario admin y restaurar sesión cuando la app se monte
onMounted(() => {
  // Limpiar datos de prueba existentes (solo se ejecuta una vez)
  limpiarDatosPrueba()

  // Inicializar admin después de la limpieza
  initializeAdminUser()

  // Restaurar sesión si existe
  auth.initializeAuth()
})
</script>

<template>
  <html lang="en">
    <AppHeader />
    <main class="pt-16">
      <!-- Compensar el header fijo -->
      <RouterView />
    </main>
    <AppFooter />
    <GlobalAlert />
  </html>
</template>
