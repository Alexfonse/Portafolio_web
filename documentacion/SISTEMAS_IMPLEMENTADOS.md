# 📚 DOCUMENTACIÓN TÉCNICA - PORTAFOLIO ARCANO

**Versión:** 1.0  
**Fecha:** 2026-01-30  
**Arquitectura:** Modular CSS/JS + Vanilla JavaScript

---

## 📂 ESTRUCTURA DEL PROYECTO

```
Portafolio_web/
├── css/
│   ├── arcane-palette.css          # Sistema de colores arcanos
│   ├── magical-typography.css      # Tipografías y escalas
│   ├── glitch-effects.css          # Efectos de interferencia
│   ├── custom-cursor.css           # Estilos del cursor SVG
│   ├── spotlight-effect.css        # Efecto linterna
│   ├── masonry-grid.css            # Grid Pinterest
│   ├── floating-particles.css      # Partículas ambientales
│   ├── gallery-enhancements.css    # Mejoras de galería
│   ├── custom-scrollbar.css        # Scrollbar personalizado
│   └── ...
├── js/
│   ├── custom-cursor.js            # Lógica cursor personalizado
│   ├── spotlight-gallery.js        # Sistema spotlight
│   ├── masonry-grid.js             # Auto-layout masonry
│   ├── floating-particles.js       # Generador de partículas
│   ├── enhanced-gallery.js         # Lightbox + filtros
│   ├── custom-scrollbar.js         # Scrollbar controller
│   └── ...
├── contexto_y_tareas/
│   ├── PROMPT_PRINCIPAL.md
│   ├── NUEVAS_TAREAS_ARCANAS.md
│   ├── ANALISIS_CREATIVO.md
│   └── PORTFOLIO_GAP_ANALYSIS.md
└── documentacion/
    ├── README.md
    ├── SISTEMAS_IMPLEMENTADOS.md
    ├── API_REFERENCE.md
    └── GUIA_MANTENIMIENTO.md
```

---

## 🎨 SISTEMAS IMPLEMENTADOS

### 1. **Sistema de Colores Arcanos**

**Archivo:** `css/arcane-palette.css`

**Variables CSS:**

```css
:root {
  /* Colores Principales */
  --arcane-green: #00ff88;
  --arcane-emerald: #10b981;
  --arcane-gold: #ffd700;

  /* Backgrounds */
  --bg-void: #000000;
  --bg-abyss: #0a0e0a;
  --bg-shadow: #1a1f1a;

  /* Gradientes */
  --gradient-arcane: linear-gradient(...);
  --gradient-witchcraft: linear-gradient(...);

  /* Efectos Glow */
  --glow-green: 0 0 20px rgba(16, 185, 129, 0.6);
  --glow-gold: 0 0 20px rgba(255, 215, 0, 0.6);
}
```

**Uso:**

```css
.my-element {
  color: var(--arcane-green);
  background: var(--bg-shadow);
  box-shadow: var(--glow-green);
}
```

---

### 2. **Tipografías Mágicas**

**Archivo:** `css/magical-typography.css`

**Familias:**

- **Display (H1):** Almendra (manuscrito arcano)
- **Headings (H2-H4):** Cinzel (elegante)
- **Body:** Quicksand (legible)
- **Accent:** IM Fell English (medieval)

**Escalas Fluid:**

```css
--text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
--text-4xl: clamp(3rem, 2.5rem + 3vw, 5rem);
```

**Características:**

- Auto-responsive con `clamp()`
- Line heights optimizados
- Letter spacing para legibilidad

---

### 3. **Sistema de Cursor Personalizado**

**Archivos:** `css/custom-cursor.css` + `js/custom-cursor.js`

**Clase Principal:** `CustomCursor`

#### **Propiedades:**

```javascript
{
  cursorEl: HTMLElement,      // Container principal
  cursorMain: SVGElement,      // Hexágono SVG
  cursorGlow: HTMLElement,     // Ring de glow
  mouseX: Number,              // Posición X
  mouseY: Number,              // Posición Y
  trails: Array<HTMLElement>,  // Array de partículas trail
  maxTrails: 10               // Límite de trails
}
```

#### **Métodos Públicos:**

- `init()` - Inicializa el cursor
- `createCursor()` - Crea elementos DOM
- `createSVG()` - Genera hexágono SVG
- `bindEvents()` - Event listeners
- `moveCursor()` - Actualiza posición
- `createTrail()` - Genera partícula trail
- `createClickParticles()` - Explosión en click

#### **Estados:**

- `.cursor-hover` - Hovering sobre link/button
- `.cursor-click` - Click activo
- `.cursor-link` - Sobre link (dorado)
- `.cursor-image` - Sobre imagen (escala 1.5x)

#### **Uso:**

```javascript
// Auto-inicializa en DOMContentLoaded
// Desactivado automáticamente en mobile (<1024px)
```

---

### 4. **Masonry Grid (Pinterest-Style)**

**Archivos:** `css/masonry-grid.css` + `js/masonry-grid.js`

**Clase Principal:** `MasonryGrid`

#### **Propiedades:**

```javascript
{
  container: HTMLElement,           // .masonry-grid
  items: Array<HTMLElement>,        // .masonry-item
  filters: Set<String>,             // Categorías únicas
  currentFilter: 'all',             // Filtro activo
  filterContainer: HTMLElement      // Botones de filtro
}
```

#### **Métodos Públicos:**

- `init()` - Inicializa el grid
- `gatherItems()` - Recopila items y categorías
- `calculateRowSpans()` - Calcula altura de cada item
- `createFilters()` - Genera botones automáticamente
- `filterItems(filter)` - Filtra por categoría
- `addItem(element)` - Añade item dinámicamente
- `refresh()` - Recalcula layout

#### **HTML Requerido:**

```html
<div class="masonry-grid">
  <div
    class="masonry-item"
    data-category="retrato"
    data-title="Título"
    data-description="Desc"
  >
    <img src="..." alt="..." />
    <div class="masonry-overlay">
      <h3>Título</h3>
      <p>Descripción</p>
    </div>
    <span class="masonry-category">Retrato</span>
  </div>
</div>
```

#### **CSS Grid:**

```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 10px;
  gap: 20px;
}
```

#### **Responsive:**

- Desktop: 3-4 columnas
- Tablet: 2-3 columnas
- Mobile: 2 columnas

---

### 5. **Floating Particles System**

**Archivos:** `css/floating-particles.css` + `js/floating-particles.js`

**Clase Principal:** `FloatingParticles`

#### **Configuración:**

```javascript
{
  count: 20,                    // Número de partículas
  minSize: 2,                   // Tamaño mínimo (px)
  maxSize: 6,                   // Tamaño máximo (px)
  colors: ['#00FF88', '#10B981', '#FFD700'], // Colores
  speed: 15                     // Velocidad (segundos)
}
```

#### **Métodos Públicos:**

- `init()` - Inicializa sistema
- `createContainer()` - Crea DOM container
- `generateParticles()` - Genera N partículas
- `createParticle()` - Crea partícula individual
- `refreshParticles()` - Regenera cada 30s
- `pause()` - Pausa animaciones
- `resume()` - Reanuda animaciones
- `destroy()` - Limpia sistema

#### **Clases CSS:**

- `.particle` - Base
- `.small`, `.medium`, `.large` - Tamaños
- `.gold`, `.emerald` - Colores
- `.drift`, `.pulse`, `.twinkle` - Efectos

#### **Animaciones:**

```css
@keyframes float-up {
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  50% {
    transform: translateY(50vh);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-10vh);
    opacity: 0;
  }
}
```

#### **Optimización:**

- Solo desktop (>768px)
- Pausa durante scroll intenso
- Auto-limpia cada 30 segundos

---

### 6. **Spotlight Gallery Effect**

**Archivos:** `css/spotlight-effect.css` + `js/spotlight-gallery.js`

**Clase Principal:** `SpotlightGallery`

#### **Propiedades:**

```javascript
{
  gallery: HTMLElement,         // .gallery-container
  isActive: Boolean,            // Estado on/off
  mouseX: Number,               // Posición mouse X
  mouseY: Number,               // Posición mouse Y
  spotlightBeam: HTMLElement,   // Haz de luz
  toggleButton: HTMLElement     // Botón toggle
}
```

#### **Métodos Públicos:**

- `init()` - Inicializa spotlight
- `createToggleButton()` - Crea botón flashlight
- `createSpotlightBeam()` - Crea haz de luz
- `toggle()` - Activa/desactiva
- `activate()` - Enciende spotlight
- `deactivate()` - Apaga spotlight
- `updateSpotlight()` - Actualiza posición

#### **CSS:**

```css
.gallery-spotlight::before {
  background: radial-gradient(
    circle 150px at var(--mouse-x) var(--mouse-y),
    transparent 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
}
```

#### **Toggle Button:**

- Posición: `fixed bottom-right`
- Icono: `flashlight-outline` (off) / `flashlight` (on)
- Color cambia con estado

---

### 7. **Glitch Text Effects**

**Archivo:** `css/glitch-effects.css`

#### **Tipos de Glitch:**

**A. RGB Split:**

```html
<h1 class="glitch-title" data-text="Título">Título</h1>
```

**B. Scan Lines:**

```html
<div class="scan-lines">Contenido</div>
```

**C. Data Corruption:**

```html
<span class="data-corrupt">Texto</span>
```

**D. Static Noise:**

```html
<div class="static-noise">Contenido</div>
```

#### **Animaciones:**

```css
@keyframes glitch-anim-1 {
  0% {
    clip: rect(2px, 9999px, 64px, 0);
  }
  /* ... clipping aleatorio */
  100% {
    clip: rect(76px, 9999px, 38px, 0);
  }
}
```

---

### 8. **Enhanced Gallery System**

**Archivos:** `css/gallery-enhancements.css` + `js/enhanced-gallery.js`

#### **Características:**

- **B&W → Color:** `filter: grayscale(100%)` → `grayscale(0%)`
- **Lightbox mejorado:** Navegación + zoom + caption
- **Filtros por categoría:** Auto-generados
- **Keyboard navigation:** Arrows, ESC

#### **Clases:**

- `.gallery-item` - Item de galería
- `.lightbox` - Modal fullscreen
- `.lightbox-content` - Imagen principal
- `.lightbox-caption` - Metadata

---

## 🔧 APIs Y UTILIDADES

### **Eventos Personalizados:**

```javascript
// Abrir lightbox
document.dispatchEvent(
  new CustomEvent("openLightbox", {
    detail: { src, title, description },
  }),
);
```

### **Variables CSS Dinámicas:**

```javascript
// Spotlight position
element.style.setProperty("--mouse-x", percentX + "%");
element.style.setProperty("--mouse-y", percentY + "%");

// Particle drift
element.style.setProperty("--drift-x", driftX + "px");
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints:**

```css
/* Mobile */
@media (max-width: 768px) {
}

/* Tablet */
@media (max-width: 1024px) {
}

/* Desktop */
@media (min-width: 1025px) {
}
```

### **Touch Detection:**

```javascript
if (window.matchMedia("(hover: hover)").matches) {
  // Desktop con hover
} else {
  // Touch device
}
```

---

## ♿ ACCESIBILIDAD

### **Reduced Motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none;
    opacity: 0.2;
  }
}
```

### **ARIA Labels:**

```html
<button aria-label="Toggle spotlight mode">
  <ion-icon name="flashlight-outline"></ion-icon>
</button>
```

### **Keyboard Navigation:**

- Tab order lógico
- ESC cierra modals
- Arrows navegan galería
- Focus visible

---

## 🚀 PERFORMANCE

### **Optimizaciones:**

1. **Lazy Loading:** `<img loading="lazy">`
2. **Debounce en resize:** 250ms
3. **RequestAnimationFrame:** Para animaciones suaves
4. **GPU Acceleration:** `transform` y `opacity`
5. **Particle Pooling:** Límite de 20 partículas
6. **Pausa durante scroll:** Reduce carga

### **Métricas Target:**

- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1
- Lighthouse > 90

---

## 🐛 DEBUGGING

### **Console Logs:**

```javascript
console.log("Opening:", src); // Lightbox fallback
```

### **Browser DevTools:**

- **Performance tab:** Verificar 60fps
- **Network tab:** Lazy loading funciona
- **Console:** No errores JavaScript

---

## 📄 LICENCIA Y CRÉDITOS

**Autor:** Alexander Fonseca  
**Framework:** Vanilla JavaScript + CSS Grid  
**Librerías:**

- Bootstrap 5 (grid/utilities)
- Ionicons (iconos)
- Google Fonts (tipografías)

**Próximas integraciones:**

- Matter.js (física para index destructible)
- Three.js (constelación 3D)

---

**Última actualización:** 2026-01-30  
**Versión:** 1.0.0
