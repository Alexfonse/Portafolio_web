# 🎨 NUEVAS TAREAS - IDENTIDAD VISUAL ARCANA

**Fecha:** 2026-01-30  
**Prioridad:** P0 - Críticas para identidad del proyecto

---

## 🖼️ GALERÍA PINTEREST-STYLE

### Referencias

- [Pinterest Inspiration 1](https://www.youtube.com/watch?v=4WyYtDu-gR0)
- [Pinterest Inspiration 2](https://www.youtube.com/watch?v=Shp-bamfX_Q)

### Tareas

- [ ] **Masonry Grid Mejorado** (Auto-ajustable, dinámico)
  - Columnas variables según viewport
  - Height automático por imagen
  - Transiciones suaves al reordenar
  - Sin espacios vacíos

- [ ] **Efecto Linterna/Spotlight**
  - Galería oscura por defecto
  - Círculo de luz sigue al mouse
  - Ilumina área alrededor del cursor
  - Transición suave del spotlight
  - Opcional: Doble modo (normal/linterna)

---

## 🖱️ CURSOR PERSONALIZADO SVG

### Tareas

- [ ] **Diseño de Cursor SVG**
  - Forma mágica/arcana personalizada
  - Estados: normal, hover, click
  - Animación de transición entre estados
- [ ] **Efectos de Click**
  - Partículas mágicas al hacer click
  - Ondas expansivas
  - Trail de estelas al mover
  - Glow pulsante

- [ ] **Integración Global**
  - Aplicar a todo el sitio
  - Desactivar en dispositivos touch
  - Performance optimizado

---

## 🎨 NUEVA PALETA DE COLORES - "DARK ARCANE"

### Concepto

Colores místicos, oscuros, mágicos: **verde arcano, negro profundo, dorado místico**

### Paleta Propuesta

```css
:root {
  /* Principales */
  --arcane-green: #00ff88; /* Verde neón místico */
  --arcane-emerald: #10b981; /* Esmeralda oscura */
  --arcane-jade: #059669; /* Jade profundo */

  --arcane-gold: #ffd700; /* Dorado brillante */
  --arcane-amber: #f59e0b; /* Ámbar místico */
  --arcane-bronze: #cd7f32; /* Bronce antiguo */

  /* Backgrounds */
  --bg-void: #000000; /* Negro puro */
  --bg-abyss: #0a0e0a; /* Negro verdoso */
  --bg-shadow: #1a1f1a; /* Gris oscuro verdoso */
  --bg-mist: rgba(16, 185, 129, 0.1); /* Niebla verde */

  /* Acentos */
  --accent-poison: #22c55e; /* Verde veneno */
  --accent-witch: #7c3aed; /* Púrpura bruja */
  --accent-blood: #dc2626; /* Rojo sangre */

  /* Gradientes Arcanos */
  --gradient-arcane: linear-gradient(
    135deg,
    #00ff88 0%,
    #059669 50%,
    #ffd700 100%
  );
  --gradient-witchcraft: linear-gradient(45deg, #10b981 0%, #7c3aed 100%);
  --gradient-shadow: linear-gradient(180deg, #000000 0%, #1a1f1a 100%);

  /* Glows */
  --glow-green:
    0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3);
  --glow-gold: 0 0 20px rgba(255, 215, 0, 0.6);
  --glow-poison: 0 0 30px rgba(34, 197, 94, 0.8);
}
```

### Tareas

- [ ] Crear archivo `arcane-palette.css`
- [ ] Migrar variables existentes
- [ ] Aplicar nueva paleta globalmente
- [ ] Actualizar todos los componentes
- [ ] Testing de contraste (WCAG)

---

## ✨ EFECTOS GLITCH EN TEXTOS

### Tipos de Glitch

1. **Glitch RGB Split** (títulos principales)
2. **Scan Lines** (efecto CRT)
3. **Data Corruption** (letras aleatorias)
4. **Static Noise** (interferencia)

### Tareas

- [ ] Crear `glitch-effects.css`
- [ ] Implementar animación RGB split
- [ ] Scan lines overlay
- [ ] Glitch aleatorio en hover
- [ ] Aplicar a títulos h1, h2
- [ ] Performance check (no abusar)

---

## 🔤 TIPOGRAFÍAS MÁGICAS

### Familia de Fuentes Propuesta

**Opción A: Místico Oscuro**

```css
--font-display: "Cinzel Decorative", serif; /* Títulos - gótico elegante */
--font-heading: "Philosopher", sans-serif; /* Subtítulos - místico */
--font-body: "Raleway", sans-serif; /* Cuerpo - legible */
--font-accent: "MedievalSharp", cursive; /* Acentos - medieval */
```

**Opción B: Arcano Moderno**

```css
--font-display: "Playfair Display", serif; /* Títulos - elegante */
--font-heading: "Cormorant Garamond", serif; /* Subtítulos - clásico */
--font-body: "Inter", sans-serif; /* Cuerpo - moderno */
--font-accent: "UnifrakturMaguntia", cursive; /* Acentos - gótico */
```

**Opción C: Witch & Wizard (RECOMENDADO)**

```css
--font-display: "Almendra", serif; /* Títulos - manuscrito mágico */
--font-heading: "Cinzel", serif; /* Subtítulos - romano elegante */
--font-body: "Quicksand", sans-serif; /* Cuerpo - suave, legible */
--font-accent: "IM Fell English", serif; /* Acentos - medieval */
```

### Tareas

- [ ] Seleccionar familia de fuentes
- [ ] Integrar Google Fonts
- [ ] Actualizar variables CSS
- [ ] Aplicar jerarquía tipográfica
- [ ] Testing de legibilidad
- [ ] Responsive font sizes

---

## 📋 INTEGRACIÓN CON GAP ANALYSIS

### Documentar en `contexto_y_tareas/`

- [ ] Copiar `portfolio_gap_analysis.md` a carpeta
- [ ] Actualizar con nuevas tareas
- [ ] Priorizar tareas visuales
- [ ] Timeline actualizado

---

## 🎯 ORDEN DE IMPLEMENTACIÓN SUGERIDO

### Sesión 1 (Ahora) - Identidad Visual

1. ✅ Nueva paleta de colores "Dark Arcane"
2. ✅ Tipografías mágicas (Opción C)
3. ✅ Glitch effects en títulos
4. ⏳ Aplicar globalmente

### Sesión 2 - Interactividad Avanzada

5. ⏳ Cursor SVG personalizado
6. ⏳ Click effects + particles
7. ⏳ Spotlight/Linterna en galería

### Sesión 3 - Galería Pinterest

8. ⏳ Masonry grid mejorado
9. ⏳ Auto-layout dinámico
10. ⏳ Integración con spotlight

---

## ✅ CHECKLIST DE VALIDACIÓN

### Visual

- [ ] Paleta coherente en todo el sitio
- [ ] Contraste adecuado (legibilidad)
- [ ] Glitch sutil, no abrumador
- [ ] Tipografías legibles en todos los tamaños

### Interactividad

- [ ] Cursor funciona en desktop
- [ ] Spotlight smooth (60fps)
- [ ] Click effects no bloquean interacción
- [ ] Masonry se reorganiza suavemente

### Performance

- [ ] Lighthouse > 85
- [ ] No lags en animaciones
- [ ] GPU acelerado donde sea posible
- [ ] Lazy loading de efectos pesados

---

**Prioridad Total:** P0  
**Impacto Visual:** 🔴 MÁXIMO  
**Tiempo Estimado:** 3-4 días de trabajo intenso
