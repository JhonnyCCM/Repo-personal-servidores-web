<template>
  <div class="image-upload">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Preview de imagen actual -->
    <div v-if="previewUrl" class="mb-4">
      <div class="relative inline-block">
        <img
          :src="previewUrl"
          :alt="alt || 'Preview'"
          class="w-20 h-20 object-cover rounded-lg border border-gray-300"
        />
        <button
          type="button"
          @click="removeImage"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Área de upload -->
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
      :class="{ 'border-red-500': hasError, 'border-blue-500': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="space-y-2">
        <Upload class="mx-auto text-gray-400" :size="24" />
        <div>
          <button
            type="button"
            @click="$refs.fileInput.click()"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Seleccionar imagen
          </button>
          <span class="text-gray-500"> o arrastra aquí</span>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
      </div>
    </div>

    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Upload } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Imagen',
  },
  alt: {
    type: String,
    default: 'Imagen',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const isDragging = ref(false)
const errorMessage = ref('')

const previewUrl = computed(() => props.modelValue)
const hasError = computed(() => !!props.error || !!errorMessage.value)

watch(
  () => props.error,
  (newError) => {
    errorMessage.value = newError
  },
)

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    processFile(file)
  }
}

function processFile(file) {
  errorMessage.value = ''

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Por favor selecciona un archivo de imagen válido'
    return
  }

  // Validar tamaño (5MB)
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'La imagen no puede ser mayor a 5MB'
    return
  }

  // Crear URL de preview
  const reader = new FileReader()
  reader.onload = (e) => {
    emit('update:modelValue', e.target.result)
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
