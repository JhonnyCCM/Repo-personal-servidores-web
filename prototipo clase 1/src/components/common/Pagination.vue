<template>
  <div v-if="totalPages > 1" class="pagination-component">
    <div class="flex items-center justify-between">
      <!-- Información de páginas -->
      <div class="text-sm text-gray-600">
        Mostrando {{ itemsOnCurrentPage }} de {{ totalItems }} {{ itemsLabel }}
      </div>

      <!-- Controles de paginación -->
      <div class="flex items-center gap-2">
        <!-- Botón anterior -->
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="pagination-btn"
          :class="{ disabled: currentPage === 1 }"
        >
          <ChevronLeft :size="16" />
          <span class="hidden sm:inline">Anterior</span>
        </button>

        <!-- Números de página -->
        <div class="flex items-center gap-1">
          <!-- Primera página -->
          <button
            v-if="showFirstPage"
            @click="goToPage(1)"
            class="pagination-number"
            :class="{ active: currentPage === 1 }"
          >
            1
          </button>

          <!-- Puntos suspensivos izquierda -->
          <span v-if="showLeftEllipsis" class="pagination-ellipsis">...</span>

          <!-- Páginas visibles -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="pagination-number"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>

          <!-- Puntos suspensivos derecha -->
          <span v-if="showRightEllipsis" class="pagination-ellipsis">...</span>

          <!-- Última página -->
          <button
            v-if="showLastPage"
            @click="goToPage(totalPages)"
            class="pagination-number"
            :class="{ active: currentPage === totalPages }"
          >
            {{ totalPages }}
          </button>
        </div>

        <!-- Botón siguiente -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
          :class="{ disabled: currentPage === totalPages }"
        >
          <span class="hidden sm:inline">Siguiente</span>
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <!-- Selector de items por página (opcional) -->
    <div v-if="showPageSizeSelector" class="flex items-center justify-center mt-4 gap-2">
      <span class="text-sm text-gray-600">Items por página:</span>
      <select
        :value="pageSize"
        @change="updatePageSize($event.target.value)"
        class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Definir el nombre del componente
defineOptions({
  name: 'CommonPagination',
})

// Props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 6,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
  itemsLabel: {
    type: String,
    default: 'elementos',
  },
  showPageSizeSelector: {
    type: Boolean,
    default: false,
  },
  pageSizeOptions: {
    type: Array,
    default: () => [3, 6, 9, 12],
  },
})

// Emits
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize)
})

const itemsOnCurrentPage = computed(() => {
  const startItem = (props.currentPage - 1) * props.pageSize + 1
  const endItem = Math.min(props.currentPage * props.pageSize, props.totalItems)
  return props.totalItems === 0 ? 0 : endItem - startItem + 1
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = props.currentPage
  const maxVisible = props.maxVisiblePages

  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)

  // Ajustar el inicio si estamos cerca del final
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  // No incluir primera y última página si ya se muestran por separado
  const showFirst = start > 1
  const showLast = end < total

  if (showFirst && start > 2) {
    start = Math.max(2, start)
  }
  if (showLast && end < total - 1) {
    end = Math.min(total - 1, end)
  }

  for (let i = start; i <= end; i++) {
    if (!(showFirst && i === 1) && !(showLast && i === total)) {
      pages.push(i)
    }
  }

  return pages
})

const showFirstPage = computed(() => {
  return (
    totalPages.value > props.maxVisiblePages &&
    props.currentPage > Math.ceil(props.maxVisiblePages / 2) + 1
  )
})

const showLastPage = computed(() => {
  return (
    totalPages.value > props.maxVisiblePages &&
    props.currentPage < totalPages.value - Math.floor(props.maxVisiblePages / 2)
  )
})

const showLeftEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showRightEllipsis = computed(() => {
  return (
    showLastPage.value &&
    visiblePages.value.length > 0 &&
    visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1
  )
})

// Methods
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

function previousPage() {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

function nextPage() {
  if (props.currentPage < totalPages.value) {
    goToPage(props.currentPage + 1)
  }
}

function updatePageSize(newSize) {
  const size = parseInt(newSize)
  emit('update:pageSize', size)
  // Recalcular la página actual para mantener la posición relativa
  const currentItem = (props.currentPage - 1) * props.pageSize + 1
  const newPage = Math.ceil(currentItem / size)
  emit('update:currentPage', newPage)
}
</script>

<style scoped>
.pagination-component {
  user-select: none;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.pagination-btn:hover:not(.disabled) {
  background-color: #f9fafb;
  color: #111827;
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  transition: all 0.2s;
  cursor: pointer;
}

.pagination-number:hover {
  background-color: #f9fafb;
  color: #111827;
}

.pagination-number.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.pagination-number.active:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: #9ca3af;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .pagination-btn {
    padding: 0.25rem 0.5rem;
  }

  .pagination-number {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.75rem;
  }
}
</style>
