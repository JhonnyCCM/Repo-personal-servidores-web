<script setup>
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer sm:footer-horizontal bg-dark-blue-color text-base-content p-10">
    <nav>
      <h6
        class="footer-title bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        Enlace
      </h6>
      <RouterLink to="/" class="link link-hover">Inicio</RouterLink>
      <RouterLink to="/classes" class="link link-hover">Clases</RouterLink>
      <RouterLink to="/training" class="link link-hover">Entrenar</RouterLink>
      <RouterLink to="/coaches" class="link link-hover">Entrenadores</RouterLink>
      <RouterLink to="/plans" class="link link-hover">Planes</RouterLink>
    </nav>
    <nav>
      <h6
        class="footer-title bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        Contactos
      </h6>
      <a class="link link-hover">Av. Circunvalación Vía a San Mateo</a>
      <a class="link link-hover">incidencias.diit@uleam.edu.ec</a>
    </nav>
    <nav>
      <h6
        class="footer-title bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        Horarios
      </h6>
      <a class="">Lunes - Viernes: 7:00 AM - 8:00 PM</a>
      <a class="">Sábado: 7:00 AM - 12:00 PM</a>
      <a class="">Domingo: Cerrado</a>
    </nav>
  </footer>
  <footer class="footer bg-dark-blue-color text-base-content border-base-300 border-t px-10 py-4">
    <aside class="grid-flow-col items-center">
      <img class="logo h-20 w-auto" src="/img/logo/uleam.png" alt="Logo" />

      <p>
        Gym.
        <br />
        El gimnasio oficial de tu universidad. Comprometidos con tu salud y bienestar.
      </p>
    </aside>
    <nav class="md:place-self-center md:justify-self-end">
      <div class="grid grid-flow-col gap-4">
        <a href="https://www.facebook.com/UleamEc/" target="_blank" rel="noopener noreferrer">
          <Facebook color="white" :size="32" />
        </a>
        <a href="https://x.com/UleamEcuador?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
          <Twitter color="white" :size="32" />
        </a>
        <a
          href="https://www.instagram.com/uleam_ecuador_oficial?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZjJBZ2VtSU91ZGlpdm82MgEeVvBNinqBxbQIbBFGTm_Bf2ppMfwe0zXMoRabNo7ucvSM5iVPxyC6VJtRPzk_aem_MrNsLGMFg4G_Yw4KBWxgSQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram color="white" :size="32" />
        </a>
        <a href="https://www.youtube.com/channel/UCOferC0PjpEUegrVq8Re-TQ" target="_blank" rel="noopener noreferrer">
          <Youtube color="white" :size="32" />
        </a>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.footer-title {
  opacity: 100%;
}

</style>
