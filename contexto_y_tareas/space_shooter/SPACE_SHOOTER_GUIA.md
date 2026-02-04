# Space Shooter - Guía de Uso y Mantenimiento

> [!IMPORTANT]
> **ESTADO ACTUAL: DESACTIVADO TEMPORALMENTE**
>
> El juego Space Shooter está actualmente **desactivado** en `index.html` (línea 119 comentada).
>
> - **Razón:** Desactivado temporalmente para pruebas/desarrollo del portafolio
> - **Fecha:** 2026-02-01
> - **Para reactivar:**
>   1. Descomentar `<script src="js/destructible-title.js"></script>` en `index.html` (línea 119)
>   2. Descomentar estilos de `#main-content` en `css/destructible-canvas.css` (líneas 260-263)
> - **Archivos modificados:**
>   - `index.html` - Script del juego comentado
>   - `css/destructible-canvas.css` - Estilos de ocultación del `#main-content` comentados
> - **Archivos intactos:**
>   - `js/destructible-title.js` - Motor del juego (no modificado)

## 🎯 Propósito de este Documento

Esta guía está diseñada para desarrolladores que necesiten mantener, modificar o extender el juego Space Shooter en el futuro.

---

## 📖 Guía Rápida de Uso

### **Como Jugador**

1. Abre `index.html` en tu navegador
2. Espera la animación de intro con "BIENVENIDO AL PORTAFOLIO"
3. Cuenta regresiva 3-2-1
4. **Controles:**
   - **PC:** WASD o Flechas para mover, Mouse/Click/Espacio para disparar
   - **Móvil:** Joystick virtual (aparece al tocar la pantalla)
5. Destruye fragmentos del nombre "ALEXANDER FONSECA"
6. El boss aparece al 40% de progreso (barra verde arriba)
7. Derrota al boss para ganar y acceder al portafolio

### **Como Desarrollador**

**Localización del código:**

```
js/destructible-title.js    # TODO el juego está aquí
```

**Inicializar el juego:**

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const game = new SpaceShooterGame();
  game.init();
});
```

**Hot reload durante desarrollo:**

- Simplemente recarga la página (F5)
- No hay build process

---

## ⚙️ Configuración del Juego

### **Variables Globales**

Todas las variables de configuración están en el constructor de `SpaceShooterGame`:

```javascript
constructor() {
    // Configuración de dificultad
    this.enemyInterval = 65;        // Frames entre spawn de enemigos (↓ = más difícil)
    this.maxProjectiles = 10;       // Límite de balas en pantalla

    // Configuración del boss
    // (Ver Enemy class, línea ~374)
    // health: 8 (móvil y PC)

    // Configuración de sonido
    this.sound = new SoundSystem();
    this.sound.volumeScale = 0.3;   // Volumen general (0-1)
}
```

### **Ajustar Dificultad**

**Hacer el juego MÁS FÁCIL:**

```javascript
// En Enemy class (línea 374):
this.health = type === "boss" ? 5 : 2; // Boss con menos HP

// En SpaceShooterGame:
this.enemyInterval = 90; // Spawn menos enemigos

// En BossFireball (línea 307):
const speed = isMobile ? 2.5 : 4.5; // Fireballs más lentas
```

**Hacer el juego MÁS DIFÍCIL:**

```javascript
// Boss con más HP:
this.health = type === "boss" ? 15 : 3;

// Spawn más rápido:
this.enemyInterval = 40;

// Fireballs más rápidas:
const speed = isMobile ? 5 : 8;
```

---

## 🎨 Personalización Visual

### **Cambiar Colores**

**Fragmentos del nombre:**

```javascript
// En createFragments(), línea ~915:
this.fragments.push(
  new Fragment(
    boundedX,
    boundedY,
    fragSize,
    "#FF00FF", // Cambia este color (actualmente #FFD700)
  ),
);
```

**Nave del jugador:**

```javascript
// En Spaceship.render(), línea ~562:
ctx.fillStyle = "#00FFFF"; // Color de la nave (actualmente #00FF88)
```

**Boss:**

```javascript
// En Enemy.render(), línea ~428:
ctx.fillStyle = "#PURPLE"; // Color del boss (actualmente #FF0066)
```

### **Cambiar Textos**

**Texto de intro:**

```javascript
// En renderIntro(), línea ~1675:
this.ctx.fillText(
  "TU TEXTO AQUÍ",
  this.canvas.width / 2,
  this.canvas.height / 2 - 30,
);
this.ctx.fillText(
  "SUBTÍTULO",
  this.canvas.width / 2,
  this.canvas.height / 2 + 20,
);
```

**Nombre fragmentado:**

```javascript
// En constructor, línea ~838:
this.config = {
  text: "TU NOMBRE AQUÍ", // Texto completo
  textLine1: "PRIMERA", // Línea 1 (móvil)
  textLine2: "SEGUNDA", // Línea 2 (móvil)
  fontFamily: "Arial",
  fontSize: 100,
  fragmentSize: 12,
  fontWeight: "900",
};
```

---

## 🔊 Sistema de Audio

### **Modificar Sonidos**

Todos los sonidos están en `SoundSystem` class (línea ~15-150):

**Cambiar pitch de disparo:**

```javascript
playShoot() {
    // ...
    osc.frequency.setValueAtTime(1000, ctx.currentTime);  // Más agudo (antes 800)
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
}
```

**Cambiar duración:**

```javascript
playExplosion() {
    // ...
    osc.stop(ctx.currentTime + 0.5);  // 0.5s en vez de 0.3s
}
```

**Desactivar sonido completamente:**

```javascript
// En constructor de SpaceShooterGame:
this.sound.enabled = false;
```

---

## 📱 Optimización Móvil

### **Detectar si es móvil:**

```javascript
this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
```

### **Aplicar configuraciones específicas:**

```javascript
if (this.isMobile) {
  // Tu código específico de móvil
  this.applyMobileOptimizations();
}
```

### **Ejemplo de optimización:**

```javascript
applyMobileOptimizations() {
    // Reducir calidad de partículas
    this.maxParticles = 50;  // En vez de 100

    // Cooldown más alto
    this.spaceship.shootCooldown = 300;

    // Boss más fácil
    this.bossHealthMultiplier = 0.6;
}
```

---

## 🐛 Debugging

### **Activar modo debug:**

Agrega esto al inicio del método `render()`:

```javascript
render() {
    // ...

    // DEBUG: Mostrar información
    if (this.debugMode) {
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = '14px monospace';
        this.ctx.fillText(`FPS: ${Math.round(1000/this.dt)}`, 10, 20);
        this.ctx.fillText(`Enemies: ${this.enemies.length}`, 10, 40);
        this.ctx.fillText(`Bullets: ${this.activeProjectiles.length}`, 10, 60);
        this.ctx.fillText(`Progress: ${this.progress.toFixed(1)}%`, 10, 80);
    }
}
```

**Activar:**

```javascript
const game = new SpaceShooterGame();
game.debugMode = true;
game.init();
```

### **Hitboxes visibles:**

En `render()`, después de render ar cada entidad:

```javascript
render() {
    // ...
    enemies.forEach(e => {
        e.render(this.ctx);

        // DEBUG: Hitbox
        if (this.debugMode) {
            this.ctx.strokeStyle = '#F00';
            this.ctx.strokeRect(e.x - e.width/2, e.y - e.height/2, e.width, e.height);
        }
    });
}
```

---

## 🚀 Nuevas Características

### **Añadir un nuevo tipo de enemigo:**

1. **Define el tipo en Enemy class:**

```javascript
constructor(canvasWidth, type = 'normal') {
    // ...
    if (type === 'fast') {
        this.width = 28;
        this.height = 28;
        this.vx = (Math.random() - 0.5) * 8;  // Más rápido
        this.vy = 5;
        this.health = 1;
        this.color = '#00FFFF';
    }
}
```

2. **Spawnearlo:**

```javascript
spawnEnemy() {
    this.enemyTimer++;

    if (this.enemyTimer >= this.enemyInterval) {
        const type = Math.random() < 0.3 ? 'fast' : 'normal';
        this.enemies.push(new Enemy(this.canvas.width, type));
        this.enemyTimer = 0;
    }
}
```

### **Añadir power-ups:**

1. **Crear clase PowerUp:**

```javascript
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'health', 'rapidfire', 'shield'
    this.width = 30;
    this.height = 30;
    this.vy = 2;
  }

  apply(spaceship) {
    switch (this.type) {
      case "health":
        spaceship.health = Math.min(spaceship.maxHealth, spaceship.health + 30);
        break;
      case "rapidfire":
        spaceship.shootCooldown = 50;
        setTimeout(() => (spaceship.shootCooldown = 150), 5000);
        break;
    }
  }
}
```

2. **Integrar en SpaceShooterGame:**

```javascript
constructor() {
    // ...
    this.powerUps = [];
}

update() {
    // ...
    this.powerUps.forEach(p => p.update());

    // Colisión con power-ups
    this.powerUps.forEach(p => {
        if (checkAABB(this.spaceship, p)) {
            p.apply(this.spaceship);
            this.sound.playPowerUp();
            p.active = false;
        }
    });

    this.powerUps = this.powerUps.filter(p => p.active);
}
```

---

## 📊 Performance Profiling

### **Medir FPS:**

```javascript
class SpaceShooterGame {
  constructor() {
    // ...
    this.frameCount = 0;
    this.fpsDisplay = 0;
    this.lastFpsUpdate = Date.now();
  }

  gameLoop() {
    this.update();
    this.render();

    // FPS Counter
    this.frameCount++;
    const now = Date.now();
    if (now - this.lastFpsUpdate > 1000) {
      this.fpsDisplay = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
      console.log(`FPS: ${this.fpsDisplay}`);
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }
}
```

### **Identificar cuellos de botella:**

```javascript
update() {
    console.time('update');

    console.time('physics');
    this.fragments.forEach(f => f.update(dt));
    console.timeEnd('physics');

    console.time('collisions');
    this.checkCollisions();
    console.timeEnd('collisions');

    console.timeEnd('update');
}
```

---

## 🔧 Troubleshooting

### **Problema: El juego no carga**

**Solución:**

1. Abre la consola del navegador (F12)
2. Busca errores de JavaScript
3. Verifica que `destructible-title.js` esté cargado:
   ```javascript
   console.log(typeof SpaceShooterGame); // Debería ser "function"
   ```

### **Problema: No hay sonido**

**Solución:**

1. Verifica que el AudioContext esté inicializado:
   ```javascript
   console.log(game.sound.audioContext); // No debería ser null
   ```
2. Haz click en la página (Web Audio API requiere interacción)
3. Verifica el volumen:
   ```javascript
   game.sound.volumeScale = 0.5; // Subir volumen
   ```

### **Problema: FPS bajo**

**Soluciones:**

1. Reducir número de fragmentos:
   ```javascript
   // En createFragments():
   fragSize = 15; // Fragmentos más grandes = menos cantidad
   ```
2. Desactivar partículas:
   ```javascript
   // En update():
   // this.particles.forEach(...);  // Comentar esta línea
   ```
3. Activar culling agresivo:
   ```javascript
   update() {
       this.fragments = this.fragments.filter(f =>
           f.x > -50 && f.x < window.innerWidth + 50 &&
           f.y > -50 && f.y < window.innerHeight + 50
       );
   }
   ```

---

## 📚 Recursos y Referencia Rápida

### **Métodos Principales**

| Método              | Descripción          | Ubicación   |
| ------------------- | -------------------- | ----------- |
| `init()`            | Inicializa el juego  | Línea ~847  |
| `update()`          | Loop de física       | Línea ~1496 |
| `render()`          | Loop de render       | Línea ~1608 |
| `shoot()`           | Disparar proyectil   | Línea ~1075 |
| `checkCollisions()` | Detectar colisiones  | Línea ~1362 |
| `triggerVictory()`  | Pantalla de victoria | Línea ~1478 |

### **Clases Clave**

| Clase           | Línea Inicio | Propósito             |
| --------------- | ------------ | --------------------- |
| SoundSystem     | ~15          | Audio procedural      |
| ObjectPool      | ~158         | Optimización          |
| Fragment        | ~185         | Partículas del nombre |
| Projectile      | ~177         | Proyectiles jugador   |
| Spaceship       | ~516         | Nave del jugador      |
| Enemy           | ~368         | Enemigos y boss       |
| BossFireball    | ~306         | Proyectiles del boss  |
| VirtualJoystick | ~728         | Controles móvil       |

---

## ✅ Checklist de Testing

Antes de deployar cambios, verificar:

- [ ] El juego carga sin errores en consola
- [ ] La intro se reproduce correctamente
- [ ] Los controles funcionan (PC y móvil)
- [ ] Los sonidos se reproducen
- [ ] El boss aparece al 40%
- [ ] La victoria redirige a perfil.html
- [ ] El texto se ve bien en móvil
- [ ] FPS >30 en móvil gama baja
- [ ] No hay memory leaks (usar DevTools → Memory)

---

**Documento:** Guía de Uso y Mantenimiento  
**Última actualización:** 2026-01-30  
**Mantenedor:** Alexander Fonseca
