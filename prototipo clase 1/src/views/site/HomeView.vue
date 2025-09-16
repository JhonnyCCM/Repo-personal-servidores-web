<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Footprints, GraduationCap, Dumbbell, Star, HandCoins, HandHeart } from 'lucide-vue-next'
</script>

<template>
  <!--hero section-->
  <div class="hero-background relative min-h-[40rem] lg:min-h-0 flex lg:flex-row flex-col">
    <div class="flex lg:flex lg:flex-row flex-col justify-left md:justify-normal h-full flex-1">
      <div class="relative flex-1 z-20 flex items-left justify-left">
        <div class="flex items-center justify-center h-full">
          <div class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center lg:text-left">
            <h1
              class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 !leading-tight"
            >
              <span class="block text-white">Tu energía, tu espacio, </span>
              <span
                class="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >tu gimnasio</span
              >
            </h1>

            <p
              class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-xl leading-normal mb-8 max-w-xl lg:max-w-none"
            >
              Mejora tu salud, reduce el estrés y alcanza tus metas físicas en un ambiente pensado
              para ti. Accede a clases guiadas, entrenadores calificados y equipos de última
              generación, todo dentro de tu universidad.
            </p>

            <div class="flex items-center gap-4 justify-center lg:justify-start">
              <router-link
                to="/login"
                class="btn bg-blue-400 hover:-translate-y-2 transition-transform duration-300 text-white rounded-[1rem]"
              >
                Comienza ahora
              </router-link>
              <router-link
                to="/classes"
                class="btn border border-white text-white bg-transparent transition-transform duration-300 hover:scale-105 rounded-[1rem]"
              >
                Ver clases
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--features section-->
  <div class="bg-surface-0 light:bg-surface-950 px-6 md:px-12 lg:px-20 py-20 text-center">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-4">
        <div class="font-bold text-3xl leading-tight">
          <span class="text-dark-blue-color">Por qué </span>
          <span
            class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >GymUni</span
          >
        </div>
        <div class="text-surface-500 light:text-surface-400 leading-tight">
          Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto hover:"
          >
            <Footprints color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Classes Especilizadas
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Variedad de clases dirigidas por entrenadores certificados para todos los niveles.
            </p>
          </div>
        </div>
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto"
          >
            <GraduationCap color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Exclusivos para estudiantes
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Diseñado específicamente para la comunidad universitaria con horarios flexibles.
            </p>
          </div>
        </div>
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto"
          >
            <Dumbbell color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Equipos Modernos
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Máquinas y equipos de última generación para un entrenamiento completo y seguro.
            </p>
          </div>
        </div>
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto"
          >
            <Star color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Entrenadores Expertos
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Personal calificado y experimentado para guiarte en tu journey fitness.
            </p>
          </div>
        </div>
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto"
          >
            <HandCoins color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Precios Asequibles
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Planes especiales y accesibles diseñados específicamente para estudiantes
              universitarios.
            </p>
          </div>
        </div>
        <div
          class="w-full rounded-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 light:bg-surface-800 shadow mx-auto"
          >
            <HandHeart color="var(--dark-blue-color)" :size="32" />
          </span>
          <div class="flex flex-col gap-1">
            <div class="text-surface-900 light:text-surface-0 text-xl font-medium leading-tight">
              Comunidad
            </div>
            <p class="text-surface-500 light:text-surface-400 leading-normal">
              Fomentando un ambiente comunitario y social donde los estudiantes pueden conectar y
              motivarse mutuamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--cta section-->
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div
      class="text-surface-700 dark:text-surface-100 text-center flex flex-col items-center gap-4"
    >
      <div class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold text-lg leading-tight">POR ULEAM</div>
      <div class="text-gray-300 font-bold text-4xl leading-tight">
        ¿Listo para comenzar tu transformación?
      </div>
      <div class="text-white text-xl leading-normal">
        Únete a nuestra comunidad y descubre todo lo que tenemos para ofrecerte.
      </div>
      <Button label="Join Now" icon="pi pi-discord" rounded class="mt-4" />
    </div>
  </div>
</template>

<style scoped>
.hero-background {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(#000000bd, #000000bd), url('/img/banner/gym1.jpeg');
  background-repeat: no-repeat;
}
</style>
