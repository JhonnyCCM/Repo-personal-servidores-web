# 🏋️ Gimnasio Universitario

Sistema de gestión para gimnasio universitario desarrollado con Vue 3, que permite administrar clases, entrenadores, equipamiento, miembros y planes de membresía.

## ✨ Características

- **Panel de Administración**: Gestión completa de clases, entrenadores, equipamiento y miembros
- **Vista de Usuario**: Exploración de clases, entrenadores y equipamiento disponible
- **Sistema de Autenticación**: Login/registro con roles diferenciados
- **Interfaz Responsive**: Diseño adaptable para dispositivos móviles y desktop
- **Filtros Avanzados**: Búsqueda y filtrado por categorías, zonas y disponibilidad
- **Almacenamiento Local**: Persistencia de datos usando localStorage

## 🚀 Tecnologías

- **Vue 3** (Composition API)
- **Vue Router** para navegación
- **Pinia** para gestión de estado
- **Tailwind CSS** + **DaisyUI** para estilos
- **Lucide Vue Next** para iconografía
- **Vite** como bundler

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jandryvV/Gimnasio-Universitario.git

# Navegar al directorio
cd gym

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Vista previa del build
npm run lint      # Linter ESLint
npm run format    # Formatear código con Prettier
```

## 👨‍💼 Usuario Administrador

Por defecto, el sistema incluye un usuario administrador:

- **Email**: admin@uleam.edu.ec
- **Password**: admin123

## 🌐 Deployment

Este proyecto está optimizado para deployment en Vercel. El archivo `vercel.json` está configurado para manejar el routing de Vue Router correctamente.

## 📁 Estructura del Proyecto

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Compile and Minify for Production

```sh
bun run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
