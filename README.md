# 🎨 Portafolio Web - Alexander Fonseca

Portfolio interactivo con diseño arcano mágico. Frontend Developer & Multimedia Producer.

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)](https://github.com/Alexfonse/Portafolio_web)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

## 🚀 Demo en Vivo

**URL:** [https://alexfonse.github.io/Portafolio_web](https://alexfonse.github.io/Portafolio_web)

---

## 📖 Descripción

Portafolio web personal con un sistema de diseño **arcano mágico** que combina:

- Efectos visuales inmersivos (particles, custom cursor, glitch)
- Arquitectura modular y escalable
- Performance optimizado
- Diseño responsive

---

## 🎨 Estilo Visual: Arcano Mágico

### Paleta de Colores

| Color         | Hex       | Uso                 |
| ------------- | --------- | ------------------- |
| 🟢 Verde Neón | `#00FF88` | Acentos principales |
| 🟢 Esmeralda  | `#10B981` | Glows y bordes      |
| 🟡 Dorado     | `#FFD700` | Títulos importantes |
| ⚫ Void       | `#000000` | Fondo principal     |

### Efectos Visuales

- ✨ **Floating Particles** - Partículas animadas en fondo
- 🖱️ **Custom Cursor** - Cursor personalizado con glow
- 💥 **Glitch Effects** - Efecto glitch en títulos
- 🔮 **Glassmorphism** - Cards con blur y transparencia
- 🔦 **Spotlight Effect** - Luz que sigue al cursor
- 📐 **Masonry Grid** - Layout dinámico para galería

**Referencia de implementación:** [`fotos.html`](fotos.html) - Página completamente implementada

---

## 📁 Estructura del Proyecto

```
Portafolio_web/
├── assets/              # Recursos multimedia
│   ├── img/            # Imágenes
│   ├── video/          # Videos
│   ├── sound/          # Audio (Space Shooter)
│   └── tipografias/    # Fuentes personalizadas
│
├── css/                 # Hojas de estilo (19 archivos)
│   ├── arcane-palette.css        # Paleta de colores arcanos
│   ├── custom-cursor.css         # Cursor personalizado
│   ├── floating-particles.css    # Partículas flotantes
│   ├── glitch-effects.css        # Efectos glitch
│   ├── glassmorphism.css         # Efectos de cristal
│   ├── magical-typography.css    # Tipografía con glows
│   ├── masonry-grid.css          # Grid dinámico
│   ├── spotlight-effect.css      # Efecto de luz
│   ├── main.css / style.css      # Estilos principales
│   └── bootstrap.min.css         # Framework CSS
│
├── js/                  # Scripts (16 archivos)
│   ├── custom-cursor.js          # Lógica del cursor
│   ├── floating-particles.js     # Generación de partículas
│   ├── masonry-grid.js           # Grid dinámico
│   ├── enhanced-gallery.js       # Lightbox mejorado
│   ├── destructible-title.js     # Space Shooter (desactivado)
│   ├── script.js / main.js       # Scripts principales
│   └── bootstrap.min.js          # Framework JS
│
├── docs/                # Documentación profesional
│   ├── Manual_Identidad_Corporativa.md
│   ├── CV_1_FRONTEND_DEVELOPER_JR.txt
│   ├── CV_2_POWER_PLATFORM_JR.txt
│   └── CV_3_GENERAL_LINKEDIN.txt
│
├── guias/               # Guías de búsqueda laboral
│   ├── EMPRESAS_Y_ESTRATEGIA_BUSQUEDA.md
│   ├── GUIA_FREELANCE_DESDE_CERO.md
│   └── GUIA_LINKEDIN_PASO_A_PASO.md
│
├── proyectos/           # Recursos de proyectos específicos
│
├── documentacion/       # Docs técnicas
│   └── SPACE_SHOOTER_GAME.md
│
├── contexto_y_tareas/   # Contexto del desarrollo
│
├── tools/               # Scripts de análisis
│   ├── analyze-images.js
│   └── image_analysis_report.md
│
├── index.html           # Página principal
├── fotos.html           # Galería fotográfica ⭐
├── proyectos.html       # Casos de estudio
├── perfil.html          # Sobre mí + Skills
├── videos.html          # Showreel
├── contacto.html        # Formulario de contacto
├── blog.html            # Artículos de diseño
├── flower.html          # Flores interactivas
└── (otros *.html)       # Páginas adicionales
```

---

## 🛠️ Stack Tecnológico

### Frontend Core

- **HTML5** - Semántico y accesible
- **CSS3** - Grid, Flexbox, Custom Properties
- **JavaScript (ES6+)** - Vanilla, sin frameworks

### Librerías y Frameworks

- **Bootstrap 5.3.3** - Layout responsive
- **Ionicons** - Iconografía

### Efectos Personalizados

- **Particles System** - Implementación custom
- **Custom Cursor** - Canvas + requestAnimationFrame
- **Masonry Grid** - Algoritmo custom de layout
- **Lightbox** - Modal fullscreen con navegación
- **Glitch Effect** - CSS Animations + data attributes
- **Glassmorphism** - backdrop-filter + blend modes

### Performance

- Lazy loading de imágenes
- Optimización de assets
- Minificación de CSS/JS en producción

---

## 📄 Páginas del Portafolio

| Página           | Descripción         | Estado                    | Características                   |
| ---------------- | ------------------- | ------------------------- | --------------------------------- |
| `index.html`     | Página principal    | 🟡 En desarrollo          | Hero, Principios, Proceso         |
| `fotos.html`     | Galería fotográfica | ✅ **Completo**           | Masonry grid, Filtros, Lightbox   |
| `proyectos.html` | Casos de estudio    | ⚠️ Requiere actualización | Layout 40/60, Métricas            |
| `perfil.html`    | Sobre mí            | 🟡 En desarrollo          | Skills, Experiencia, "Por qué yo" |
| `videos.html`    | Showreel            | ✅ Funcional              | Grid de videos                    |
| `contacto.html`  | Contacto            | 🟡 Básico                 | Formulario                        |
| `blog.html`      | Blog                | ✅ Funcional              | Artículos de diseño               |
| `flower.html`    | Easter egg          | ✅ Completo               | Flores interactivas               |

**Leyenda:** ✅ Completo | 🟡 En desarrollo | ⚠️ Requiere cambios

---

## 🚀 Instalación y Uso

### Pre-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Opcional: Live Server para desarrollo local

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/Alexfonse/Portafolio_web.git

# Navegar al directorio
cd Portafolio_web

# Instalar dependencias npm (opcional, solo para dev tools)
npm install
```

### Ejecución Local

**Opción 1: Abrir directamente**

```bash
# Abrir index.html en tu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Opción 2: Live Server (recomendado)**

```bash
# Si tienes VS Code con extensión Live Server
# Click derecho en index.html > "Open with Live Server"
```

**Opción 3: Servidor HTTP simple**

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# Luego abre http://localhost:8000
```

---

## 📝 Documentación

### Identidad de Marca

- **Manual de Identidad:** [`docs/Manual_Identidad_Corporativa.md`](docs/Manual_Identidad_Corporativa.md)
  - Sistema dual: FON Corporativo (negro/morado) + FON Arcano Web (verde/dorado)
  - Guía de aplicación según contexto
  - Efectos visuales documentados

### CVs y Recursos

- **CVs:** [`docs/CV_*.txt`](docs/)
  - CV Frontend Developer Jr
  - CV Power Platform Jr
  - CV General LinkedIn

### Guías de Desarrollo Profesional

- **Estrategia de búsqueda:** [`guias/EMPRESAS_Y_ESTRATEGIA_BUSQUEDA.md`](guias/)
- **Freelance desde cero:** [`guias/GUIA_FREELANCE_DESDE_CERO.md`](guias/)
- **LinkedIn paso a paso:** [`guias/GUIA_LINKEDIN_PASO_A_PASO.md`](guias/)

### Documentación Técnica

- **Space Shooter:** [`documentacion/SPACE_SHOOTER_GAME.md`](documentacion/)
  - Juego destructible (actualmente desactivado)
  - Física con Matter.js
  - Sistema de audio

---

## 🎯 Roadmap

### ⏳ Por Hacer

- [ ] Actualizar `proyectos.html` con datos reales
- [ ] Aplicar estilo arcano completamente a `index.html`
- [ ] Mejorar sección "Por qué yo" en `perfil.html`
- [ ] Optimizar performance (Core Web Vitals)
- [ ] Implementar Google Analytics
- [ ] Agregar tests automatizados

### ✅ Completado Recientemente

- [x] Sistema de galería con Masonry Grid (`fotos.html`)
- [x] Optimización de imágenes a formato WebP
- [x] Unificación del tema Arcano en `fotos.html`
- [x] Corrección de referencias de imágenes (`fotomontaje_6` y `fotomontaje_7`)
- [x] Custom cursor con glow effect
- [x] Floating particles system
- [x] Reorganización de archivos del proyecto
- [x] Documentación de identidad dual FON

---

## 🐛 Issues Conocidos

1. **Space Shooter desactivado temporalmente** - Ver documentación interna para reactivación.
2. **`proyectos.html`** - Contiene métricas placeholder, pendiente de actualización con datos reales.

---

## 🤝 Contribución

Este es un portafolio personal, pero si encuentras un bug o tienes sugerencias:

1. Abre un issue en GitHub
2. Describe el problema o mejora
3. (Opcional) Crea un pull request

---

## 📧 Contacto

**Alexander Fonseca**

- 📧 **Email:** [martinezharry2016@gmail.com](mailto:martinezharry2016@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/jhon-fonseca](https://linkedin.com/in/jhon-fonseca)
- 🐙 **GitHub:** [@Alexfonse](https://github.com/Alexfonse)
- 📍 **Ubicación:** Bogotá, Colombia

---

## 📜 Licencia

© 2026 Alexander Fonseca. Todos los derechos reservados.

El código de este portafolio está disponible para referencia, pero las imágenes, diseños y contenido personal son propietarios.

---

## 🌟 Agradecimientos

- **Diseño Arcano:** Inspirado en paletas mágicas y estéticas cyberpunk
- **Ionicons:** Sistema de iconos
- **Bootstrap:** Framework CSS base
- **Comunidad Frontend:** Por recursos e inspiración

---

**⚡ Hecho con pasión, código limpio, y un toque de magia arcana ✨**
