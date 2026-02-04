# 🎮 INDEX DESTRUCTIBLE - Especificación Técnica

**Feature:** Título destructible con física de partículas  
**Prioridad:** P0 - CRÍTICO  
**Estimación:** 4-5 horas  
**Estado:** En Desarrollo

---

## 🎯 OBJETIVO

Crear una experiencia interactiva única en el index donde el usuario debe "destruir" el título del portafolio mediante clicks/toques para acceder al contenido principal. Es el primer "WOW" moment del sitio.

---

## 📋 ESPECIFICACIÓN FUNCIONAL

### **Comportamiento:**

1. Usuario entra a `index.html`
2. Ve un canvas fullscreen con título fragmentado
3. Click/touch destruye fragmentos en área de impacto
4. Arrastre del mouse destruye múltiples fragmentos
5. Contador muestra progreso (0% → 100%)
6. Al 100%, explosión épica + transición al menú principal
7. Partículas flotan y desaparecen gradualmente

### **Estados:**

- **Inicial:** Título completo, fragmentos estáticos
- **Interacción:** Fragmentos explotan al click
- **Progreso:** 0-99% destruido
- **Completo:** 100% destruido → transición

---

## 🛠️ ARQUITECTURA TÉCNICA

### **Tecnologías:**

- **Canvas 2D:** Rendering de fragmentos
- **Matter.js:** Motor de física (opcional)
- **Vanilla JS:** Lógica de interacción

### **Estructura de Archivos:**

```
js/
├── destructible-title.js        # Clase principal
├── particle-system.js           # Sistema de partículas (reutilizable)
└── physics-engine.js            # Wrapper de Matter.js (opcional)

css/
└── destructible-canvas.css      # Estilos del canvas
```

---

## 💻 IMPLEMENTACIÓN

### **Clase: DestructibleTitle**

#### **Propiedades:**

```javascript
{
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  fragments: Array<Fragment>,
  particles: Array<Particle>,
  mouseX: Number,
  mouseY: Number,
  isMouseDown: Boolean,
  destructionProgress: Number,  // 0-100
  config: {
    text: "ALEXANDER FONSECA",
    fontFamily: "Almendra",
    fontSize: 120,
    fragmentSize: 10,           // Tamaño de píxel/fragmento
    explosionForce: 15,
    gravity: 0.5,
    friction: 0.98
  }
}
```

#### **Métodos:**

**Inicialización:**

```javascript
init(); // Setup canvas + eventos
createFragments(); // Genera geometría del texto
setupEventListeners(); // Mouse/touch events
```

**Game Loop:**

```javascript
update(deltaTime); // Actualiza física
render(); // Dibuja frame
gameLoop(); // RequestAnimationFrame
```

**Interacción:**

```javascript
handleClick(x, y); // Destruye fragmentos en punto
handleDrag(x, y); // Destruye en área
checkCollision(fragment, point); // Detección de colisión
explodeFragment(fragment); // Crea explosión
```

**Progreso:**

```javascript
calculateProgress(); // Retorna 0-100
updateProgressBar(); // UI visual
checkCompletion(); // Trigger transición si 100%
```

**Transición:**

```javascript
triggerExplosion(); // Explosión final épica
fadeOutCanvas(); // Fade out
showMainMenu(); // Revelar contenido
```

---

### **Clase: Fragment**

**Representa un fragmento del título**

```javascript
class Fragment {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.vx = 0; // Velocidad X
    this.vy = 0; // Velocidad Y
    this.size = size;
    this.color = color;
    this.alpha = 1; // Opacidad
    this.rotation = 0;
    this.rotationSpeed = 0;
    this.isDestroyed = false;
  }

  update(deltaTime) {
    if (this.isDestroyed) return;

    // Física
    this.vy += config.gravity * deltaTime;
    this.vx *= config.friction;
    this.vy *= config.friction;

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.rotation += this.rotationSpeed * deltaTime;

    // Fade out
    if (this.y > canvas.height) {
      this.alpha -= 0.01;
      if (this.alpha <= 0) this.isDestroyed = true;
    }
  }

  render(ctx) {
    if (this.isDestroyed) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  explode(forceX, forceY) {
    this.vx = forceX;
    this.vy = forceY;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
  }
}
```

---

### **Generación de Fragmentos**

```javascript
createFragments() {
  // 1. Crear texto en canvas temporal
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
  tempCtx.fillStyle = '#FFD700';
  tempCtx.textAlign = 'center';
  tempCtx.textBaseline = 'middle';

  const textWidth = tempCtx.measureText(this.config.text).width;
  tempCanvas.width = textWidth + 100;
  tempCanvas.height = this.config.fontSize + 100;

  // Re-dibujar con dimensiones correctas
  tempCtx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
  tempCtx.fillStyle = '#FFD700';
  tempCtx.textAlign = 'center';
  tempCtx.fillText(this.config.text, tempCanvas.width/2, tempCanvas.height/2);

  // 2. Pixelate - obtener datos de imagen
  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const pixels = imageData.data;

  // 3. Crear fragmentos desde píxeles
  const fragmentSize = this.config.fragmentSize;

  for (let y = 0; y < tempCanvas.height; y += fragmentSize) {
    for (let x = 0; x < tempCanvas.width; x += fragmentSize) {
      const index = (y * tempCanvas.width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha > 128) { // Solo píxeles visibles
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const color = `rgb(${r}, ${g}, ${b})`;

        // Posición centrada en canvas principal
        const fragmentX = this.canvas.width/2 - tempCanvas.width/2 + x;
        const fragmentY = this.canvas.height/2 - tempCanvas.height/2 + y;

        this.fragments.push(new Fragment(
          fragmentX,
          fragmentY,
          fragmentSize,
          color
        ));
      }
    }
  }
}
```

---

### **Sistema de Eventos**

```javascript
setupEventListeners() {
  // Mouse events
  this.canvas.addEventListener('mousedown', (e) => {
    this.isMouseDown = true;
    this.handleClick(e.clientX, e.clientY);
  });

  this.canvas.addEventListener('mousemove', (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.isMouseDown) {
      this.handleDrag(e.clientX, e.clientY);
    }
  });

  this.canvas.addEventListener('mouseup', () => {
    this.isMouseDown = false;
  });

  // Touch events (mobile)
  this.canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    this.handleClick(touch.clientX, touch.clientY);
  });

  this.canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    this.handleDrag(touch.clientX, touch.clientY);
  });

  // Resize
  window.addEventListener('resize', () => this.resize());
}
```

---

### **Detección de Colisión**

```javascript
handleClick(x, y) {
  const impactRadius = 30; // Radio de destrucción

  this.fragments.forEach(fragment => {
    if (fragment.isDestroyed) return;

    const dx = fragment.x - x;
    const dy = fragment.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < impactRadius) {
      this.explodeFragment(fragment, dx, dy, distance);
    }
  });

  this.calculateProgress();
  this.createClickParticles(x, y);
}

explodeFragment(fragment, dx, dy, distance) {
  // Normalizar dirección
  const angle = Math.atan2(dy, dx);
  const force = this.config.explosionForce * (1 - distance / 30);

  fragment.explode(
    Math.cos(angle) * force,
    Math.sin(angle) * force
  );

  // Marcar como "en explosión"
  fragment.isExploding = true;
}
```

---

### **Progress Calculation**

```javascript
calculateProgress() {
  const total = this.fragments.length;
  const destroyed = this.fragments.filter(f => f.isExploding || f.isDestroyed).length;

  this.destructionProgress = (destroyed / total) * 100;
  this.updateProgressBar();

  if (this.destructionProgress >= 100 && !this.completionTriggered) {
    this.completionTriggered = true;
    this.triggerCompletion();
  }
}

updateProgressBar() {
  const progressBar = document.getElementById('destruction-progress');
  if (progressBar) {
    progressBar.style.width = this.destructionProgress + '%';
    progressBar.textContent = Math.floor(this.destructionProgress) + '%';
  }
}
```

---

### **Transición Final**

```javascript
triggerCompletion() {
  // 1. Explosión masiva de partículas restantes
  this.fragments.forEach(fragment => {
    if (!fragment.isDestroyed) {
      const angle = Math.random() * Math.PI * 2;
      const force = 20 + Math.random() * 10;
      fragment.explode(
        Math.cos(angle) * force,
        Math.sin(angle) * force
      );
    }
  });

  // 2. Efecto de flash
  this.createFlashEffect();

  // 3. Fade out canvas después de 1 segundo
  setTimeout(() => {
    this.fadeOutCanvas();
  }, 1000);

  // 4. Mostrar menú principal después de 2 segundos
  setTimeout(() => {
    this.showMainMenu();
  }, 2000);
}

fadeOutCanvas() {
  this.canvas.style.transition = 'opacity 1s ease';
  this.canvas.style.opacity = '0';
}

showMainMenu() {
  // Revelar el contenido principal
  const mainContent = document.getElementById('main-content');
  mainContent.style.display = 'block';
  mainContent.style.opacity = '0';

  setTimeout(() => {
    mainContent.style.transition = 'opacity 1s ease';
    mainContent.style.opacity = '1';
  }, 50);

  // Ocultar/remover canvas
  setTimeout(() => {
    this.canvas.style.display = 'none';
  }, 1000);
}
```

---

## 🎨 UI COMPONENTS

### **Progress Bar:**

```html
<div id="destruction-ui">
  <div class="progress-container">
    <div id="destruction-progress" class="progress-bar">0%</div>
  </div>
  <p class="instruction">¡Haz click para destruir el título!</p>
</div>
```

```css
#destruction-ui {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
}

.progress-container {
  width: 400px;
  height: 30px;
  background: rgba(10, 14, 10, 0.8);
  border: 2px solid var(--arcane-emerald);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-arcane);
  width: 0%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-void);
  font-weight: bold;
  font-family: var(--font-heading);
}

.instruction {
  color: var(--arcane-green);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  text-shadow: var(--glow-green);
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 🎯 IDEAS EXTRA (Nice-to-Have)

### **1. Modo "Speed Run"**

```javascript
startTimer() {
  this.startTime = Date.now();
  this.timerInterval = setInterval(() => {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    document.getElementById('timer').textContent = elapsed + 's';
  }, 100);
}
```

### **2. Combo Multiplicador**

```javascript
handleClick() {
  const now = Date.now();
  if (now - this.lastClickTime < 500) {
    this.combo++;
    this.explosionForce *= (1 + this.combo * 0.1);
  } else {
    this.combo = 0;
  }
  this.lastClickTime = now;
}
```

### **3. Konami Code Easter Egg**

```javascript
setupKonamiCode() {
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                'b', 'a'];
  let position = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === code[position]) {
      position++;
      if (position === code.length) {
        this.autoDestroy(); // Explosión automática
        position = 0;
      }
    } else {
      position = 0;
    }
  });
}
```

---

## 🚀 PERFORMANCE

### **Optimizaciones:**

1. **Object Pooling:** Reutilizar partículas
2. **Culling:** No renderizar fragmentos fuera de pantalla
3. **RAF Throttling:** Limitar a 60fps
4. **Canvas Layers:** Separar estático de dinámico

### **Métricas:**

- 60 FPS constante
- < 50ms tiempo de frame
- < 100 MB RAM

---

## 📱 RESPONSIVE

```javascript
resize() {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  // Ajustar tamaño de fuente en móvil
  if (window.innerWidth < 768) {
    this.config.fontSize = 60;
    this.config.fragmentSize = 5;
  }

  // Regenerar fragmentos con nuevo tamaño
  this.fragments = [];
  this.createFragments();
}
```

---

**Estado:** 📝 Especificación completa  
**Siguiente:** Implementación del código
