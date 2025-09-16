<template>
  <div class="user-classes-view min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Header con información personal -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              {{ iniciales }}
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Mis Clases</h1>
              <p class="text-gray-600">
                {{ usuarioActual?.nombre }} • {{ clasesInscritas.length }} clases activas
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Estadísticas rápidas -->
            <div class="bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
              <div class="flex items-center gap-2">
                <Calendar :size="20" class="text-blue-600" />
                <span class="text-sm font-medium text-blue-800">
                  {{ clasesEstaSemanana }} esta semana
                </span>
              </div>
            </div>
            <div class="bg-green-50 rounded-lg px-4 py-2 border border-green-200">
              <div class="flex items-center gap-2">
                <Clock :size="20" class="text-green-600" />
                <span class="text-sm font-medium text-green-800">
                  {{ totalHorasSemana }}h semanales
                </span>
              </div>
            </div>
            <div class="bg-red-50 rounded-lg px-4 py-2 border border-red-200">
              <div class="flex items-center gap-2">
                <Heart :size="20" class="text-red-600" />
                <span class="text-sm font-medium text-red-800">
                  {{ clasesFavoritas.length }} favoritas
                </span>
              </div>
            </div>
            <!-- Botón de recarga -->
            <div class="flex items-center gap-3">
              <!-- Botón de recarga -->
              <button
                @click="recargarDatos"
                :disabled="cargando"
                class="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="{ 'animate-pulse': cargando }"
              >
                <RotateCcw :size="16" :class="{ 'animate-spin': cargando }" />
                <span>{{ cargando ? 'Cargando...' : 'Recargar' }}</span>
              </button>

              <!-- Timestamp de última actualización -->
              <div v-if="ultimaActualizacion" class="flex items-center gap-2 text-sm text-gray-500">
                <!-- Indicador de estado activo -->
                <div
                  class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  title="Auto-actualización activa"
                ></div>
                <span>{{ ultimaActualizacion.toLocaleTimeString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filtros modernos -->
      <div class="mb-8">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter :size="20" class="text-blue-600" />
            Filtros de Vista
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <!-- Filtro por categoría -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                v-model="filtros.categoria"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todas las categorías</option>
                <option v-for="cat in categoriasDisponibles" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Filtro por entrenador -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Entrenador</label>
              <select
                v-model="filtros.entrenador"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todos los entrenadores</option>
                <option
                  v-for="entrenador in entrenadoresDisponibles"
                  :key="entrenador"
                  :value="entrenador"
                >
                  {{ entrenador }}
                </option>
              </select>
            </div>

            <!-- Filtro por día -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Día de la semana</label>
              <select
                v-model="filtros.dia"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todos los días</option>
                <option value="Lun">Lunes</option>
                <option value="Mar">Martes</option>
                <option value="Mié">Miércoles</option>
                <option value="Jue">Jueves</option>
                <option value="Vie">Viernes</option>
                <option value="Sáb">Sábado</option>
                <option value="Dom">Domingo</option>
              </select>
            </div>

            <!-- Filtro por nivel -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
              <select
                v-model="filtros.nivel"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Todos los niveles</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <!-- Toggles de vista -->
          <div class="flex items-center justify-between pt-4 border-t">
            <div class="flex items-center gap-4">
              <button
                @click="cambiarVista('lista')"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  vistaActual === 'lista'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
              >
                <List :size="16" />
                Vista Lista ({{ clasesInscritas.length }})
              </button>
              <button
                @click="cambiarVista('horario')"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  vistaActual === 'horario'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
              >
                <Calendar :size="16" />
                Horario Semanal
              </button>

              <button
                @click="cambiarVista('favoritas')"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  vistaActual === 'favoritas'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
              >
                <Heart :size="16" :class="vistaActual === 'favoritas' ? 'fill-current' : ''" />
                Solo Favoritas ({{ clasesFavoritas.length }})
              </button>
            </div>

            <button
              @click="limpiarFiltros"
              class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw :size="16" />
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Vista de Lista -->
      <div v-if="vistaActual === 'lista'" class="space-y-6">
        <!-- Mensaje si no hay clases -->
        <div v-if="clasesFiltradas.length === 0" class="text-center py-12">
          <BookOpen :size="64" class="mx-auto mb-4 text-gray-300" />
          <div v-if="!usuarioActual">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Usuario no identificado</h3>
            <p class="text-gray-500 mb-4">No se pudo cargar la información del usuario.</p>
            <button
              @click="reinicializarSesion"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw :size="16" class="mr-2" />
              Reinicializar Sesión
            </button>
          </div>
          <div v-else-if="clasesInscritas.length === 0">
            <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes clases inscritas</h3>
            <p class="text-gray-500 mb-4">Parece que aún no te has inscrito en ninguna clase.</p>
            <button
              @click="recargarDatos"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw :size="16" class="mr-2" />
              Verificar Inscripciones
            </button>
          </div>
          <div v-else>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay clases que coincidan</h3>
            <p class="text-gray-500">
              Ajusta los filtros para ver más clases. Tienes {{ clasesInscritas.length }} clases en
              total.
            </p>
          </div>
        </div>

        <!-- Lista de clases paginada -->
        <div v-else class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              v-for="clase in clasesPaginadas"
              :key="clase.id"
              class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              <!-- Header de la tarjeta -->
              <div class="relative p-6 pb-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">{{ clase.nombre }}</h3>
                      <span
                        class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="getCategoriaColor(clase.categoria)"
                      >
                        {{ clase.categoria }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">{{ clase.descripcion }}</p>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <img
                      :src="clase.imagen"
                      :alt="clase.nombre"
                      class="w-16 h-16 rounded-lg object-cover border-2 border-gray-100"
                    />
                    <!-- Botón de favorito -->
                    <button
                      @click="toggleFavorito(clase)"
                      class="p-2 rounded-full transition-colors hover:bg-gray-100"
                      :class="{ 'bg-red-50': esFavorito(clase) }"
                      :title="esFavorito(clase) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
                    >
                      <Heart
                        :size="18"
                        :class="esFavorito(clase) ? 'text-red-500 fill-red-500' : 'text-gray-400'"
                      />
                    </button>
                  </div>
                </div>

                <!-- Información del entrenador -->
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    {{ getInitials(clase.entrenador) }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ clase.entrenador }}</p>
                    <p class="text-xs text-gray-500">Instructor</p>
                  </div>
                </div>

                <!-- Detalles de la clase -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center gap-2 text-gray-600">
                    <Calendar :size="16" class="text-blue-500" />
                    <span>{{ clase.dias }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <Clock :size="16" class="text-green-500" />
                    <span>{{ clase.horaInicio }} ({{ clase.duracion }})</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <MapPin :size="16" class="text-red-500" />
                    <span>{{ clase.lugar }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <TrendingUp :size="16" class="text-purple-500" />
                    <span>{{ clase.nivel }}</span>
                  </div>
                </div>

                <!-- Estado de cupos -->
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Users :size="16" class="text-gray-500" />
                      <span class="text-sm text-gray-600">
                        {{ clase.inscritos?.length || 0 }}/{{ clase.cuposTotal }} inscritos
                      </span>
                    </div>
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                        :style="{
                          width: `${((clase.inscritos?.length || 0) / clase.cuposTotal) * 100}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación para clases -->
          <Pagination
            :current-page="paginaClases"
            :total-pages="totalPaginasClases"
            :total-items="clasesFiltradas.length"
            :items-on-current-page="clasesPaginadas.length"
            items-label="clases"
            @go-to-page="irAPaginaClases"
            @next-page="siguientePaginaClases"
            @previous-page="anteriorPaginaClases"
          />
        </div>
      </div>

      <!-- Vista de Horario Semanal -->
      <div v-else-if="vistaActual === 'horario'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar :size="24" class="text-blue-600" />
              Mi Horario Semanal
            </h3>
            <p class="text-gray-600 mt-1">Vista general de todas tus clases por día y hora</p>
          </div>

          <!-- Horario visual -->
          <div class="overflow-x-auto">
            <div class="min-w-full">
              <!-- Header de días -->
              <div class="grid grid-cols-8 border-b border-gray-200">
                <div class="p-4 font-medium text-gray-500 text-center">Hora</div>
                <div
                  v-for="dia in diasSemana"
                  :key="dia.key"
                  class="p-4 text-center border-l border-gray-200"
                >
                  <div class="font-semibold text-gray-900">{{ dia.nombre }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ dia.fecha }}</div>
                </div>
              </div>

              <!-- Filas de horarios -->
              <div class="divide-y divide-gray-100">
                <div v-for="hora in horasDelDia" :key="hora" class="grid grid-cols-8 min-h-[80px]">
                  <!-- Columna de hora -->
                  <div
                    class="p-4 font-medium text-gray-600 text-center border-r border-gray-200 bg-gray-50"
                  >
                    {{ hora }}
                  </div>

                  <!-- Columnas de días -->
                  <div
                    v-for="dia in diasSemana"
                    :key="`${hora}-${dia.key}`"
                    class="p-2 border-l border-gray-100 relative"
                  >
                    <!-- Clases en esta hora y día -->
                    <div
                      v-for="clase in getClasesEnHorario(hora, dia.key)"
                      :key="clase.id"
                      class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg text-xs mb-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      @click="verDetallesClase(clase)"
                    >
                      <div class="font-semibold truncate">{{ clase.nombre }}</div>
                      <div class="opacity-90 truncate">{{ clase.entrenador }}</div>
                      <div class="opacity-75">{{ clase.lugar }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del día actual -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sun :size="20" />
            Clases de Hoy ({{ fechaHoy }})
          </h4>
          <div v-if="clasesHoy.length === 0" class="text-blue-100">
            No tienes clases programadas para hoy. ¡Disfruta tu día libre!
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="clase in clasesHoy"
              :key="clase.id"
              class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <div class="font-semibold">{{ clase.nombre }}</div>
              <div class="text-sm opacity-90">{{ clase.horaInicio }} - {{ clase.lugar }}</div>
              <div class="text-xs opacity-75 mt-1">con {{ clase.entrenador }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista de Clases Favoritas -->
      <div v-else-if="vistaActual === 'favoritas'" class="space-y-6">
        <!-- Encabezado de favoritas -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Heart :size="24" class="text-red-600 fill-red-600" />
                Mis Clases Favoritas
              </h3>
              <p class="text-gray-600 mt-1">Tus clases marcadas como favoritas</p>
            </div>
            <div class="text-2xl font-bold text-red-600">{{ clasesFavoritas.length }}</div>
          </div>
        </div>

        <!-- Mensaje si no hay favoritas -->
        <div v-if="clasesFavoritas.length === 0" class="text-center py-12">
          <Heart :size="64" class="mx-auto mb-4 text-gray-300" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes clases favoritas</h3>
          <p class="text-gray-500 mb-4">
            Marca tus clases preferidas como favoritas para acceder rápidamente a ellas.
          </p>
          <button
            @click="cambiarVista('lista')"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <List :size="16" class="mr-2" />
            Ver Todas las Clases
          </button>
        </div>

        <!-- Lista de favoritas paginada -->
        <div v-else class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              v-for="clase in favoritasPaginadas"
              :key="clase.id"
              class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden relative"
            >
              <!-- Indicador de favorito -->
              <div class="absolute top-4 right-4 z-10">
                <div class="bg-red-500 text-white p-2 rounded-full shadow-lg">
                  <Heart :size="16" class="fill-current" />
                </div>
              </div>

              <!-- Header de la tarjeta -->
              <div class="relative p-6 pb-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1 pr-12">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">{{ clase.nombre }}</h3>
                      <span
                        class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="getCategoriaColor(clase.categoria)"
                      >
                        {{ clase.categoria }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">{{ clase.descripcion }}</p>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <img
                      :src="clase.imagen"
                      :alt="clase.nombre"
                      class="w-16 h-16 rounded-lg object-cover border-2 border-gray-100"
                    />
                    <!-- Botón para quitar de favoritos -->
                    <button
                      @click="toggleFavorito(clase)"
                      class="p-2 rounded-full transition-colors hover:bg-red-100 bg-red-50"
                      title="Quitar de favoritos"
                    >
                      <Heart :size="18" class="text-red-500 fill-red-500" />
                    </button>
                  </div>
                </div>

                <!-- Información del entrenador -->
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    {{ getInitials(clase.entrenador) }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ clase.entrenador }}</p>
                    <p class="text-xs text-gray-500">Instructor</p>
                  </div>
                </div>

                <!-- Detalles de la clase -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center gap-2 text-gray-600">
                    <Calendar :size="16" class="text-blue-500" />
                    <span>{{ clase.dias }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <Clock :size="16" class="text-green-500" />
                    <span>{{ clase.horaInicio }} ({{ clase.duracion }})</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <MapPin :size="16" class="text-red-500" />
                    <span>{{ clase.lugar }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <TrendingUp :size="16" class="text-purple-500" />
                    <span>{{ clase.nivel }}</span>
                  </div>
                </div>

                <!-- Estado de cupos -->
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Users :size="16" class="text-gray-500" />
                      <span class="text-sm text-gray-600">
                        {{ clase.inscritos?.length || 0 }}/{{ clase.cuposTotal }} inscritos
                      </span>
                    </div>
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                        :style="{
                          width: `${((clase.inscritos?.length || 0) / clase.cuposTotal) * 100}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación para favoritas -->
          <Pagination
            :current-page="paginaFavoritas"
            :total-pages="totalPaginasFavoritas"
            :total-items="clasesFavoritas.length"
            :items-on-current-page="favoritasPaginadas.length"
            items-label="clases favoritas"
            @go-to-page="irAPaginaFavoritas"
            @next-page="siguientePaginaFavoritas"
            @previous-page="anteriorPaginaFavoritas"
          />
        </div>
      </div>

      <!-- Sección de Instructores -->
      <div class="mt-12">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <UserCheck :size="24" class="text-blue-600" />
            Mis Instructores
          </h3>

          <div v-if="misInstructores.length === 0" class="text-center py-8">
            <UserX :size="48" class="mx-auto mb-4 text-gray-300" />
            <p class="text-gray-500">No tienes instructores asignados aún.</p>
          </div>

          <div v-else class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="instructor in instructoresPaginados"
                :key="instructor.nombre"
                class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
                >
                  {{ getInitials(instructor.nombre) }}
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ instructor.nombre }}</h4>
                  <p class="text-sm text-gray-600 mb-2">
                    {{ instructor.clasesConmigo.length }} clase{{
                      instructor.clasesConmigo.length !== 1 ? 's' : ''
                    }}
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="clase in instructor.clasesConmigo.slice(0, 2)"
                      :key="clase"
                      class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {{ clase }}
                    </span>
                    <span
                      v-if="instructor.clasesConmigo.length > 2"
                      class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      +{{ instructor.clasesConmigo.length - 2 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Paginación para instructores -->
            <Pagination
              :current-page="paginaInstructores"
              :total-pages="totalPaginasInstructores"
              :total-items="misInstructores.length"
              :items-on-current-page="instructoresPaginados.length"
              items-label="instructores"
              @go-to-page="irAPaginaInstructores"
              @next-page="siguientePaginaInstructores"
              @previous-page="anteriorPaginaInstructores"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalles de clase -->
    <div
      v-if="mostrarDetallesClase"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarDetallesClase"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">{{ claseSeleccionada?.nombre }}</h3>
          <button
            @click="cerrarDetallesClase"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X :size="24" />
          </button>
        </div>

        <div v-if="claseSeleccionada" class="space-y-6">
          <!-- Imagen y información básica -->
          <div class="flex items-start gap-6">
            <img
              :src="claseSeleccionada.imagen"
              :alt="claseSeleccionada.nombre"
              class="w-32 h-32 rounded-xl object-cover border-2 border-gray-100"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="px-3 py-1 text-sm font-medium rounded-full"
                  :class="getCategoriaColor(claseSeleccionada.categoria)"
                >
                  {{ claseSeleccionada.categoria }}
                </span>
                <span class="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                  {{ claseSeleccionada.nivel }}
                </span>
              </div>
              <p class="text-gray-600 mb-4">{{ claseSeleccionada.descripcion }}</p>

              <!-- Información del instructor -->
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {{ getInitials(claseSeleccionada.entrenador) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ claseSeleccionada.entrenador }}</p>
                  <p class="text-sm text-gray-500">Instructor principal</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Detalles del horario -->
          <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
              <Calendar :size="20" class="text-blue-500" />
              <div>
                <p class="text-sm text-gray-500">Días</p>
                <p class="font-medium text-gray-900">{{ claseSeleccionada.dias }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Clock :size="20" class="text-green-500" />
              <div>
                <p class="text-sm text-gray-500">Horario</p>
                <p class="font-medium text-gray-900">
                  {{ claseSeleccionada.horaInicio }} ({{ claseSeleccionada.duracion }})
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <MapPin :size="20" class="text-red-500" />
              <div>
                <p class="text-sm text-gray-500">Ubicación</p>
                <p class="font-medium text-gray-900">{{ claseSeleccionada.lugar }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Users :size="20" class="text-purple-500" />
              <div>
                <p class="text-sm text-gray-500">Cupos</p>
                <p class="font-medium text-gray-900">
                  {{ claseSeleccionada.inscritos?.length || 0 }}/{{ claseSeleccionada.cuposTotal }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Componente global de alertas -->
    <GlobalAlert />
  </div>
</template>

<script setup>
// Composables
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
  Calendar,
  Clock,
  Filter,
  List,
  RotateCcw,
  BookOpen,
  MapPin,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Sun,
  X,
  Heart,
} from 'lucide-vue-next'
import { obtenerDatosLS, guardarDatosLS, useAlert } from '@/composables/useGym'
import { useAuthStore } from '@/stores/auth'
import { usePagination } from '@/composables/usePagination'
import GlobalAlert from '@/components/common/GlobalAlert.vue'
import Pagination from '@/components/common/Pagination.vue'

// Composables y stores
const authStore = useAuthStore()
const { mostrarAlert } = useAlert()

// Estados reactivos
const todasLasClases = ref([])
const vistaActual = ref('lista') // 'lista', 'horario', 'favoritas'
const mostrarDetallesClase = ref(false)
const claseSeleccionada = ref(null)
const cargando = ref(false)
const ultimaActualizacion = ref(null)
const intervaloActualizacion = ref(null)

// Filtros
const filtros = ref({
  categoria: '',
  entrenador: '',
  dia: '',
  nivel: '',
})

// Configurar paginación para diferentes secciones
const {
  currentPage: paginaClases,
  paginatedItems: clasesPaginadas,
  totalPages: totalPaginasClases,
  goToPage: irAPaginaClases,
  nextPage: siguientePaginaClases,
  previousPage: anteriorPaginaClases,
  resetPagination: reiniciarPaginacionClases,
} = usePagination(
  computed(() => clasesFiltradas.value),
  6,
)

const {
  currentPage: paginaFavoritas,
  paginatedItems: favoritasPaginadas,
  totalPages: totalPaginasFavoritas,
  goToPage: irAPaginaFavoritas,
  nextPage: siguientePaginaFavoritas,
  previousPage: anteriorPaginaFavoritas,
  resetPagination: reiniciarPaginacionFavoritas,
} = usePagination(
  computed(() => clasesFavoritas.value),
  6,
)

const {
  currentPage: paginaInstructores,
  paginatedItems: instructoresPaginados,
  totalPages: totalPaginasInstructores,
  goToPage: irAPaginaInstructores,
  nextPage: siguientePaginaInstructores,
  previousPage: anteriorPaginaInstructores,
  resetPagination: reiniciarPaginacionInstructores,
} = usePagination(
  computed(() => misInstructores.value),
  6,
)

// Computed properties
const usuarioActual = computed(() => authStore.currentUser)

const iniciales = computed(() => {
  if (!usuarioActual.value?.nombre) return 'U'
  return usuarioActual.value.nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

const clasesInscritas = computed(() => {
  if (!usuarioActual.value) return []

  // Usar tanto ID como email para identificar al usuario (compatibilidad con diferentes sistemas)
  const userId = usuarioActual.value.id || usuarioActual.value.email || usuarioActual.value.correo

  if (!userId) {
    return []
  }

  const clases = todasLasClases.value.filter((clase) => {
    if (!clase.inscritos || !Array.isArray(clase.inscritos)) return false

    // Verificar si el usuario está inscrito usando ID, email o correo
    const estaInscrito =
      clase.inscritos.includes(userId) ||
      clase.inscritos.includes(usuarioActual.value.id) ||
      clase.inscritos.includes(usuarioActual.value.email) ||
      clase.inscritos.includes(usuarioActual.value.correo)

    return estaInscrito
  })

  return clases
})

const clasesFavoritas = computed(() => {
  if (!usuarioActual.value) return []

  const userId = usuarioActual.value.id || usuarioActual.value.email || usuarioActual.value.correo

  if (!userId) return []

  return todasLasClases.value.filter((clase) => {
    if (!clase.favoritos || !Array.isArray(clase.favoritos)) return false

    // Verificar si el usuario tiene la clase en favoritos
    return (
      clase.favoritos.includes(userId) ||
      clase.favoritos.includes(usuarioActual.value.id) ||
      clase.favoritos.includes(usuarioActual.value.email) ||
      clase.favoritos.includes(usuarioActual.value.correo)
    )
  })
})

const clasesFiltradas = computed(() => {
  let clases = clasesInscritas.value

  if (filtros.value.categoria) {
    clases = clases.filter((c) => c.categoria === filtros.value.categoria)
  }

  if (filtros.value.entrenador) {
    clases = clases.filter((c) => c.entrenador === filtros.value.entrenador)
  }

  if (filtros.value.dia) {
    clases = clases.filter((c) => c.dias.includes(filtros.value.dia))
  }

  if (filtros.value.nivel) {
    clases = clases.filter((c) => c.nivel === filtros.value.nivel)
  }

  return clases
})

const categoriasDisponibles = computed(() => {
  const cats = new Set(clasesInscritas.value.map((c) => c.categoria))
  return Array.from(cats).sort()
})

const entrenadoresDisponibles = computed(() => {
  const entrenadores = new Set(clasesInscritas.value.map((c) => c.entrenador))
  return Array.from(entrenadores).sort()
})

const clasesEstaSemanana = computed(() => {
  // Calcular clases de esta semana basado en días de clases
  return clasesInscritas.value.length * diasQuetieneClase(clasesInscritas.value)
})

const totalHorasSemana = computed(() => {
  return clasesInscritas.value
    .reduce((total, clase) => {
      const duracion = parseInt(clase.duracion.replace(' min', '')) / 60
      const diasPorSemana = clase.dias.split(', ').length
      return total + duracion * diasPorSemana
    }, 0)
    .toFixed(1)
})

const diasSemana = computed(() => {
  const hoy = new Date()
  const inicioSemana = new Date(hoy)
  inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1) // Empezar en lunes

  return [
    { key: 'Lun', nombre: 'Lunes', fecha: formatearFecha(new Date(inicioSemana)) },
    {
      key: 'Mar',
      nombre: 'Martes',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 86400000)),
    },
    {
      key: 'Mié',
      nombre: 'Miércoles',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 172800000)),
    },
    {
      key: 'Jue',
      nombre: 'Jueves',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 259200000)),
    },
    {
      key: 'Vie',
      nombre: 'Viernes',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 345600000)),
    },
    {
      key: 'Sáb',
      nombre: 'Sábado',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 432000000)),
    },
    {
      key: 'Dom',
      nombre: 'Domingo',
      fecha: formatearFecha(new Date(inicioSemana.getTime() + 518400000)),
    },
  ]
})

const horasDelDia = computed(() => {
  // Generar horarios desde las 6:00 hasta las 22:00
  const horas = []
  for (let i = 6; i <= 22; i++) {
    horas.push(`${i.toString().padStart(2, '0')}:00`)
  }
  return horas
})

const fechaHoy = computed(() => {
  return new Date().toLocaleDateString('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

const clasesHoy = computed(() => {
  const hoy = new Date().toLocaleDateString('es-EC', { weekday: 'short' })
  const diaHoy = hoy.charAt(0).toUpperCase() + hoy.slice(1, 3)

  return clasesInscritas.value.filter((clase) => clase.dias.includes(diaHoy))
})

const misInstructores = computed(() => {
  const instructoresMap = new Map()

  clasesInscritas.value.forEach((clase) => {
    if (!instructoresMap.has(clase.entrenador)) {
      instructoresMap.set(clase.entrenador, {
        nombre: clase.entrenador,
        clasesConmigo: [],
      })
    }
    instructoresMap.get(clase.entrenador).clasesConmigo.push(clase.nombre)
  })

  return Array.from(instructoresMap.values())
})

// Métodos
function cargarClases() {
  cargando.value = true

  try {
    // Verificar si hay usuario autenticado
    if (!authStore.isLoggedIn || !usuarioActual.value) {
      authStore.initializeAuth()

      // Si después de inicializar aún no hay usuario, no continuar
      if (!usuarioActual.value) {
        cargando.value = false
        return
      }
    }

    const clasesStorage = obtenerDatosLS('gym_clases', [])
    todasLasClases.value = clasesStorage
    ultimaActualizacion.value = new Date()
  } catch (error) {
    console.error('Error cargando clases:', error)
  } finally {
    cargando.value = false
  }
}

// Función para recargar datos (útil cuando se hacen cambios)
function recargarDatos() {
  cargarClases()
}

// Función para reinicializar sesión
function reinicializarSesion() {
  authStore.initializeAuth()
  recargarDatos()
}

function limpiarFiltros() {
  filtros.value = {
    categoria: '',
    entrenador: '',
    dia: '',
    nivel: '',
  }
}

// Funciones para cambiar vista
function cambiarVista(nuevaVista) {
  vistaActual.value = nuevaVista

  // Reiniciar paginación cuando se cambia de vista
  if (nuevaVista === 'lista') {
    reiniciarPaginacionClases()
  } else if (nuevaVista === 'favoritas') {
    reiniciarPaginacionFavoritas()
  }
}

// Función para reiniciar todas las paginaciones
function reiniciarTodasLasPaginaciones() {
  reiniciarPaginacionClases()
  reiniciarPaginacionFavoritas()
  reiniciarPaginacionInstructores()
}

function getCategoriaColor(categoria) {
  const colores = {
    Cardio: 'bg-red-100 text-red-800',
    Fuerza: 'bg-orange-100 text-orange-800',
    Funcional: 'bg-yellow-100 text-yellow-800',
    Acuático: 'bg-blue-100 text-blue-800',
    Relajación: 'bg-green-100 text-green-800',
  }
  return colores[categoria] || 'bg-gray-100 text-gray-800'
}

function getInitials(nombre) {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function diasQuetieneClase(clases) {
  if (clases.length === 0) return 0
  // Promedio de días por clase
  return Math.round(
    clases.reduce((acc, clase) => {
      return acc + clase.dias.split(', ').length
    }, 0) / clases.length,
  )
}

function formatearFecha(fecha) {
  return fecha.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })
}

function getClasesEnHorario(hora, dia) {
  // Para el horario semanal siempre usar clases inscritas, no filtradas
  return clasesInscritas.value.filter((clase) => {
    const claseHora = clase.horaInicio
    return clase.dias.includes(dia) && claseHora === hora
  })
}

function verDetallesClase(clase) {
  claseSeleccionada.value = clase
  mostrarDetallesClase.value = true
}

function cerrarDetallesClase() {
  mostrarDetallesClase.value = false
  claseSeleccionada.value = null
}

// Función para agregar/quitar de favoritos
function toggleFavorito(clase) {
  if (!usuarioActual.value) {
    mostrarAlert('Debes estar autenticado para gestionar favoritos', 'error')
    return
  }

  const userId = usuarioActual.value.id || usuarioActual.value.email || usuarioActual.value.correo
  if (!userId) {
    mostrarAlert('Error: No se pudo identificar al usuario', 'error')
    return
  }

  if (!clase.favoritos) {
    clase.favoritos = []
  }

  const index = clase.favoritos.indexOf(userId)
  if (index === -1) {
    // Agregar a favoritos
    clase.favoritos.push(userId)
    mostrarAlert(`"${clase.nombre}" agregada a tus clases favoritas`, 'success')
  } else {
    // Quitar de favoritos
    clase.favoritos.splice(index, 1)
    mostrarAlert(`"${clase.nombre}" eliminada de tus clases favoritas`, 'info')
  }

  // Actualizar localStorage
  const clasesActualizadas = todasLasClases.value.map((c) =>
    c.id === clase.id ? { ...c, favoritos: clase.favoritos } : c,
  )
  todasLasClases.value = clasesActualizadas
  guardarDatosLS('gym_clases', clasesActualizadas)
}

// Función para verificar si está en favoritos del usuario actual
function esFavorito(clase) {
  if (!usuarioActual.value || !clase.favoritos) return false

  const userId = usuarioActual.value.id || usuarioActual.value.email || usuarioActual.value.correo
  if (!userId) return false

  return (
    clase.favoritos.includes(userId) ||
    clase.favoritos.includes(usuarioActual.value.id) ||
    clase.favoritos.includes(usuarioActual.value.email) ||
    clase.favoritos.includes(usuarioActual.value.correo)
  )
}

// Lifecycle
onMounted(() => {
  // Inicializar auth store
  authStore.initializeAuth()

  // Esperar un tick para que se inicialice la auth
  setTimeout(() => {
    cargarClases()
  }, 100)

  // Configurar auto-refresh cada 10 segundos
  intervaloActualizacion.value = setInterval(() => {
    cargarClases()
  }, 10000)

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  window.addEventListener('storage', (e) => {
    if (e.key === 'gym_clases') {
      cargarClases()
    }
  })

  // Escuchar cuando la página se vuelve visible (útil para SPAs)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      cargarClases()
    }
  })
})

onUnmounted(() => {
  // Limpiar el intervalo al desmontar el componente
  if (intervaloActualizacion.value) {
    clearInterval(intervaloActualizacion.value)
  }

  // Remover event listeners
  window.removeEventListener('storage', cargarClases)
  document.removeEventListener('visibilitychange', cargarClases)
})

// Watcher para recargar cuando cambie el usuario
watch(
  () => usuarioActual.value,
  (newUser, oldUser) => {
    if (newUser && newUser !== oldUser) {
      cargarClases()
    }
  },
  { deep: true },
)

// Watcher para el estado de login
watch(
  () => authStore.isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn && usuarioActual.value) {
      cargarClases()
    }
  },
)

// Watcher para reiniciar paginación cuando cambien los filtros
watch(
  () => filtros.value,
  () => {
    reiniciarTodasLasPaginaciones()
  },
  { deep: true },
)
</script>

<style scoped>
/* Estilos personalizados para la vista de usuario */
.user-classes-view {
  font-family: 'Inter', sans-serif;
}

/* Animación para las tarjetas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInUp 0.3s ease-out;
}

/* Gradientes personalizados para los estados */
.status-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Scrollbar personalizado para el horario */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
