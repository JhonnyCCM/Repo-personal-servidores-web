<template>
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
            'bg-yellow-100 text-yellow-600': alertType === 'warning',
          }"
        >
          <CheckCircle v-if="alertType === 'success'" class="w-5 h-5" />
          <XCircle v-else-if="alertType === 'error'" class="w-5 h-5" />
          <AlertTriangle v-else-if="alertType === 'warning'" class="w-5 h-5" />
          <Info v-else class="w-5 h-5" />
        </div>
        <div class="flex-1">
          <p class="text-gray-800 font-medium">{{ alertMessage }}</p>
        </div>
        <button @click="cerrarAlert" class="text-gray-400 hover:text-gray-600 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useAlert } from '@/composables/useGym'

const { showAlert, alertMessage, alertType, cerrarAlert } = useAlert()
</script>
