# 📚 README - Documentación del Portafolio

**Proyecto:** Portafolio Web Interactivo - Alexander Fonseca  
**Identidad:** Dark Arcane (Verde/Negro/Dorado)  
**Stack:** Vanilla JavaScript + CSS Grid + HTML5 Canvas

---

## 📁 ESTRUCTURA DE CARPETAS

```
Portafolio_web/
├── index.html                   # Landing page con título destructible
├── fotos.html                   # Galería masonry con spotlight
├── videos.html                  # Galería de videos
├── proyectos.html               # Portfolio de proyectos
├── perfil.html                  # Perfil profesional
├── blog.html                    # Blog/artículos
│
├── css/                         # Estilos modulares
│   ├── arcane-palette.css       # Sistema de colores
│   ├── magical-typography.css   # Tipografías
│   ├── glitch-effects.css       # Efectos de interferencia
│   ├── custom-cursor.css        # Cursor personalizado
│   ├── destructible-canvas.css  # Canvas interactivo
│   ├── masonry-grid.css         # Grid Pinterest
│   ├── floating-particles.css   # Partículas ambientales
│   └── ...
│
├── js/                          # Scripts modulares
│   ├── destructible-title.js    # Título destructible (P0)
│   ├── custom-cursor.js         # Cursor SVG hexagonal
│   ├── masonry-grid.js          # Auto-layout gallery
│   ├── floating-particles.js    # Partículas flotantes
│   ├── spotlight-gallery.js     # Efecto linterna
│   └── ...
│
├── assets/                      # Recursos multimedia
│   ├── img/                     # Imágenes
│   ├── videos/                  # Videos
│   └── icons/                   # Iconos
│
├── contexto_y_tareas/           # Documentación de planificación
│   ├── PROMPT_PRINCIPAL.md
│   ├── NUEVAS_TAREAS_ARCANAS.md
│   ├── ANALISIS_CREATIVO.md
│   └── PORTFOLIO_GAP_ANALYSIS.md
│
└── documentacion/               # Documentación técnica
    ├── README.md                # Este archivo
    ├── SISTEMAS_IMPLEMENTADOS.md
    ├── INDEX_DESTRUCTIBLE_SPEC.md
    └── GUIA_MANTENIMIENTO.md
```

---

## 🎨 CARACTERÍSTICAS PRINCIPALES

### ✅ Implementadas (65%)

1. **Index Destructible** 🎮
   - Título fragmentable con física de partículas
   - Canvas HTML5 interactivo
   - Progress bar animada
   - Transición épica al completar

2. **Identidad Visual Arcana** 🌟
   - Paleta verde/negro/dorado
   - Tipografías mágicas (Almendra, Cinzel)
   - Efectos glitch RGB split
   - Gradientes animados

3. **Cursor Personalizado** 🖱️
   - Hexágono SVG arcano
   - Trail de partículas verdes
   - Explosión dorada al click
   - Estados hover/click/link

4. **Galería Masonry** 📸
   - Layout estilo Pinterest
   - Auto-ajuste de columnas
   - Filtros por categoría
   - Metadata en overlay

5. **Spotlight Effect** 💡
   - Modo linterna en galería
   - Círculo de luz sigue mouse
   - Toggle button
   - Touch support

6. **Floating Particles** ✨
   - 20 partículas ambientales
   - Efectos drift/pulse/twinkle
   - Nebula overlay
   - Performance optimizado

### ⏳ En Desarrollo (20%)

7. **Skills Constellation** (Próximo)
8. **Timeline Interactiva** (Próximo)
9. **Page Transitions** (Próximo)

### 📋 Pendientes (15%)

10. Sistema de Achievements
11. Audio mágico
12. Theme switcher
13. Modo presentación

---

## 🚀 INICIO RÁPIDO

### **1. Clonar / Abrir Proyecto**

```powershell
cd c:\Users\marti\OneDrive\Documents\Paradox\Portafolio_web
```

### **2. Abrir con Live Server**

- Usar extensión Live Server de VS Code
- O abrir `index.html` directamente en navegador

### **3. Navegación**

- **Index:** Destruir título con clicks
- **Fotos:** Ver galería masonry + spotlight
- **Videos/Proyectos/Perfil/Blog:** Explorar contenido

---

## 📖 DOCUMENTACIÓN TÉCNICA

### **Para Desarrolladores:**

- [`SISTEMAS_IMPLEMENTADOS.md`](./SISTEMAS_IMPLEMENTADOS.md) - API completa de todos los sistemas
- [`INDEX_DESTRUCTIBLE_SPEC.md`](./INDEX_DESTRUCTIBLE_SPEC.md) - Spec del título destructible

### **Clases Principales:**

| Clase               | Archivo               | Propósito                      |
| ------------------- | --------------------- | ------------------------------ |
| `DestructibleTitle` | destructible-title.js | Título fragmentable con física |
| `CustomCursor`      | custom-cursor.js      | Cursor SVG personalizado       |
| `MasonryGrid`       | masonry-grid.js       | Grid auto-layout Pinterest     |
| `FloatingParticles` | floating-particles.js | Sistema de partículas          |
| `SpotlightGallery`  | spotlight-gallery.js  | Efecto linterna                |

### **Principales Variables CSS:**

```css
--arcane-green: #00ff88 --arcane-emerald: #10b981 --arcane-gold: #ffd700
  --bg-void: #000000 --gradient-arcane: linear-gradient(...) --glow-green: 0 0
  20px rgba(16, 185, 129, 0.6);
```

---

## 🛠️ MANTENIMIENTO

### **Añadir Nueva Imagen a Galería:**

```html
<div
  class="masonry-item"
  data-category="retrato"
  data-title="Título"
  data-description="Descripción"
>
  <img src="assets/img/nueva.jpg" loading="lazy" alt="..." />
  <div class="masonry-overlay">
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
  <span class="masonry-category">Retrato</span>
</div>
```

### **Cambiar Texto del Index:**

```javascript
// En destructible-title.js
window.destructibleTitle = new DestructibleTitle({
  text: "TU NUEVO TEXTO",
});
```

### **Modificar Colores:**

Editar `css/arcane-palette.css`:

```css
:root {
  --arcane-green: #TU_COLOR;
}
```

---

## 🐛 TROUBLESHOOTING

### **Canvas no aparece:**

- Verificar que `destructible-title.js` esté cargado
- Revisar console de DevTools
- Confirmar que fuente "Almendra" esté disponible

### **Masonry no funciona:**

- Verificar que items tengan clase `.masonry-item`
- Confirmar `data-category` en cada item
- Verificar que `masonry-grid.js` esté cargado

### **Cursor personalizado no aparece:**

- Solo funciona en desktop (>1024px)
- Requiere hover capability
- Verificar CSS `cursor: none !important`

---

## 📊 PERFORMANCE

### **Métricas Actuales:**

- Lighthouse Score: ~85 (target: 90+)
- FCP: < 1.5s
- LCP: < 2.5s
- Canvas FPS: 60fps

### **Optimizaciones Aplicadas:**

- Lazy loading de imágenes
- CSS/JS modular
- Canvas requestAnimationFrame
- Particle pooling
- Touch device detection

---

## 📱 RESPONSIVE

| Breakpoint | Layout                           |
| ---------- | -------------------------------- |
| < 768px    | Mobile: 2 cols, fuente pequeña   |
| 768-1024px | Tablet: 2-3 cols                 |
| > 1024px   | Desktop: 3-4 cols, cursor custom |

---

## ♿ ACCESIBILIDAD

- **ARIA labels** en botones interactivos
- **Keyboard navigation** en galería
- **Reduced motion** respetado
- **Alt text** en todas las imágenes
- **Focus visible** en elementos interactivos

---

## 📄 CRÉDITOS

**Desarrollador:** Alexander Fonseca  
**Diseño:** Identidad "Dark Arcane"  
**Librerías:**

- Bootstrap 5
- Ionicons
- Google Fonts

**Sin dependencias pesadas:**

- No jQuery
- No frameworks JS
- Vanilla JavaScript puro

---

## 🚧 ROADMAP

### **Fase A (Actual - Enero 2026)**

- [x] Index Destructible
- [ ] Skills Constellation
- [ ] Aplicar arcane a todas las páginas

### **Fase B (Febrero 2026)**

- [ ] Page Transitions
- [ ] Sistema de Achievements
- [ ] Audio mágico

### **Fase C (Marzo 2026)**

- [ ] Theme switcher
- [ ] Modo presentación
- [ ] Optimización final

---

## 📞 CONTACTO

**Portfolio:** [En construcción]  
**Email:** [alexfonse@domain.com]  
**GitHub:** [Tu perfil]

---

**Última actualización:** 2026-01-30  
**Versión:** 1.0.0  
**Estado:** 65% Completo
