import { ref, computed } from 'vue'

/**
 * Composable para manejar paginación de manera reutilizable
 * @param {Array} items - Array de elementos a paginar
 * @param {Number} initialPageSize - Tamaño inicial de página (default: 6)
 * @returns {Object} - Objeto con propiedades y métodos de paginación
 */
export function usePagination(items, initialPageSize = 6) {
  // Estados reactivos
  const currentPage = ref(1)
  const pageSize = ref(initialPageSize)

  // Computed properties
  const totalItems = computed(() => items.value?.length || 0)

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / pageSize.value)
  })

  const paginatedItems = computed(() => {
    if (!items.value || items.value.length === 0) return []

    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return items.value.slice(start, end)
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  const startItem = computed(() => {
    if (totalItems.value === 0) return 0
    return (currentPage.value - 1) * pageSize.value + 1
  })

  const endItem = computed(() => {
    if (totalItems.value === 0) return 0
    return Math.min(currentPage.value * pageSize.value, totalItems.value)
  })

  // Métodos
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  function previousPage() {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  function goToFirstPage() {
    currentPage.value = 1
  }

  function goToLastPage() {
    currentPage.value = totalPages.value
  }

  function updatePageSize(newSize) {
    // Calcular el primer item de la página actual
    const currentFirstItem = (currentPage.value - 1) * pageSize.value + 1

    // Actualizar el tamaño de página
    pageSize.value = parseInt(newSize)

    // Recalcular la página para mantener la posición relativa
    const newPage = Math.ceil(currentFirstItem / pageSize.value)
    currentPage.value = Math.min(newPage, totalPages.value) || 1
  }

  function resetPagination() {
    currentPage.value = 1
  }

  // Información de la página actual
  const pageInfo = computed(() => {
    return {
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      totalItems: totalItems.value,
      pageSize: pageSize.value,
      startItem: startItem.value,
      endItem: endItem.value,
      hasNextPage: hasNextPage.value,
      hasPreviousPage: hasPreviousPage.value,
    }
  })

  return {
    // Estados reactivos
    currentPage,
    pageSize,

    // Computed properties
    totalItems,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPreviousPage,
    startItem,
    endItem,
    pageInfo,

    // Métodos
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    updatePageSize,
    resetPagination,
  }
}
