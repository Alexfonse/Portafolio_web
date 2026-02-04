# 🎨 DECISIONES CREATIVAS - PORTAFOLIO INTERACTIVO

---

**Propósito de este Archivo**: Registrar todas las decisiones importantes de diseño, técnicas y creativas tomadas durante el desarrollo del proyecto. Este registro ayuda a mantener coherencia, justificar elecciones, y servir como referencia en futuras decisiones.

**Última Actualización**: [FECHA INICIAL]

---

## 📋 ÍNDICE DE DECISIONES

1. [Tema Visual y Estética Principal](#decisión-1)
2. [Stack Tecnológico y Librerías](#decisión-2)
3. [Sistema de Tipografías](#decisión-3)
4. [Paleta de Colores](#decisión-4)
5. [Estructura de Navegación](#decisión-5)
6. [Presentación de Habilidades](#decisión-6) - ⏳ PENDIENTE
7. [Layout de Galería de Fotografías](#decisión-7) - ⏳ PENDIENTE
8. [Mecánica de Sección Destructible](#decisión-8) - ⏳ PENDIENTE
9. [Framework CSS](#decisión-9) - ⏳ PENDIENTE
10. [Plataforma de Hosting](#decisión-10) - ⏳ PENDIENTE

---

<a name="decisión-1"></a>
## Decisión #1 - Tema Visual y Estética Principal

**Fecha**: [FECHA INICIAL]
**Estado**: ✅ APROBADA
**Categoría**: Diseño Visual

### Contexto
Se necesitaba definir una dirección visual única que diferenciara este portafolio de los miles que existen. El objetivo era crear algo memorable, impactante y que reflejara tanto profesionalismo como creatividad.

### Opciones Consideradas

**Opción A: Minimalista Profesional**
- Pros: Limpio, rápido, enfocado en contenido
- Contras: Poco memorable, genérico, no destaca

**Opción B: Maximalista Colorido**
- Pros: Muy visual, energético, único
- Contras: Puede ser abrumador, difícil de equilibrar

**Opción C: Estilo Arcane - Mágico/Tecnológico**
- Pros: 
  - Visualmente impactante
  - Balance entre arte y tecnología
  - Permite creatividad sin perder profesionalismo
  - Diferenciador único
  - Paleta rica pero coherente
- Contras: 
  - Más complejo de implementar
  - Requiere más recursos (animaciones, efectos)
  - Riesgo de sobre-estimulación

**Opción D: Cyberpunk Futurista**
- Pros: Moderno, tecnológico, cool
- Contras: Puede ser cliché, menos versátil

### Decisión Final
**Opción C: Estilo Arcane - Mágico/Tecnológico**

### Razonamiento
- Arcane combina perfectamente lo artístico con lo técnico
- Los efectos visuales tipo glitch, partículas y colores neón son modernos y atractivos
- Permite mostrar habilidades técnicas (animaciones, WebGL, etc.)
- Es suficientemente único para destacar sin ser alienante
- La estética "mágica" permite más creatividad en presentación de proyectos

### Impacto
- Define toda la paleta de colores del sitio
- Determina las librerías de animación necesarias
- Influye en tipografías y efectos visuales
- Establece el tono de toda la experiencia de usuario

### Implementación
- Colores vibrantes: cianes, púrpuras, dorados, rosas neón
- Efectos de glitch y partículas constantes
- Backgrounds con gradientes animados
- Sombras y glows pronunciados
- Texturas superpuestas para profundidad

### Referencias
- Serie Arcane (Netflix) - estética visual general
- Awwwards - sitios con efectos similares
- Cyberpunk 2077 - UI/UX referencias

---

<a name="decisión-2"></a>
## Decisión #2 - Stack Tecnológico y Librerías

**Fecha**: [FECHA INICIAL]
**Estado**: ✅ APROBADA
**Categoría**: Técnica

### Contexto
Necesidad de definir qué tecnologías y librerías usar para implementar todas las features interactivas y visuales planeadas.

### Opciones Consideradas

**Core Technologies (No negociables)**:
- HTML5 ✅
- CSS3 ✅
- JavaScript ES6+ ✅

**Animaciones**:
1. GSAP (GreenSock)
   - Pros: Industria estándar, muy potente, excelente performance
   - Contras: Curva de aprendizaje, peso del archivo
   
2. Anime.js
   - Pros: Ligero, fácil de usar
   - Contras: Menos features que GSAP
   
3. Framer Motion
   - Pros: React-native, muy intuitivo
   - Contras: Requiere React

**3D/WebGL**:
1. Three.js
   - Pros: Más popular, más recursos, más ejemplos
   - Contras: Más pesado
   
2. Spline
   - Pros: Interface visual, fácil integración
   - Contras: Menos control programático

**Física**:
1. Matter.js
   - Pros: Perfecto para 2D, ligero, bien documentado
   - Contras: Solo 2D
   
2. Cannon.js
   - Pros: Física 3D completa
   - Contras: Más complejo, innecesario para este proyecto

**Smooth Scroll**:
1. Lenis
   - Pros: Moderno, suave, ligero
   - Contras: Relativamente nuevo
   
2. Locomotive Scroll
   - Pros: Muy popular, muchos ejemplos
   - Contras: Más pesado

### Decisión Final

**Librería Principal de Animaciones**: GSAP
**3D/WebGL**: Three.js
**Física**: Matter.js
**Smooth Scroll**: Lenis
**Partículas**: tsParticles (versión moderna de particles.js)
**Scroll Animations**: AOS (Animate On Scroll)
**Framework CSS**: TBD (Decisión pendiente)

### Razonamiento
- GSAP es el estándar de la industria y permite animaciones complejas
- Three.js tiene la comunidad más grande y más ejemplos
- Matter.js es perfecto para la sección destructible sin añadir peso innecesario
- Lenis es moderno y ofrece el mejor smooth scroll actual
- tsParticles es la evolución natural de particles.js
- AOS simplifica scroll animations sin complejidad

### Impacto
- Define el peso total del sitio
- Determina la curva de aprendizaje
- Establece límites y posibilidades técnicas
- Influye en tiempo de desarrollo

### Implementación
```html
<!-- CDN Links -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@latest/bundled/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>
```

---

<a name="decisión-3"></a>
## Decisión #3 - Sistema de Tipografías

**Fecha**: [FECHA INICIAL]
**Estado**: ✅ APROBADA
**Categoría**: Diseño Tipográfico

### Contexto
Necesidad de seleccionar tipografías que sean:
1. De libre uso (Google Fonts)
2. Mágicas/místicas en apariencia
3. Altamente legibles para cuerpo de texto
4. Impactantes para títulos

### Opciones Consideradas

**Combinación A: Místico Futurista**
- Display: Orbitron
- Cuerpo: Rajdhani
- Acentos: Cinzel
- Carácter: Tecnológico, geométrico, elegante

**Combinación B: Mágico Elegante**
- Display: Philosopher
- Cuerpo: Quicksand
- Acentos: Poiret One
- Carácter: Sofisticado, refinado, artístico

**Combinación C: Arcane Style**
- Display: Bungee Shade / Black Ops One
- Cuerpo: Exo 2
- Acentos: Audiowide
- Carácter: Impactante, cyberpunk, futurista

### Decisión Final
**Combinación A: Místico Futurista**
- **Display/Títulos**: Orbitron
- **Cuerpo/Párrafos**: Rajdhani
- **Acentos/Especial**: Cinzel

### Razonamiento
- Orbitron tiene ese look futurista/tecnológico pero místico
- Rajdhani es extremadamente legible sin ser aburrida
- Cinzel añade elegancia para momentos especiales
- Las tres tipografías se complementan sin chocar
- Todas son gratuitas y optimizadas para web

### Impacto
- Define la personalidad visual del sitio
- Afecta legibilidad y experiencia de lectura
- Contribuye a la atmósfera mágica
- Se integra con el tema Arcane

### Implementación
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&display=swap');

:root {
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Rajdhani', sans-serif;
  --font-accent: 'Cinzel', serif;
  
  /* Escalas tipográficas responsivas */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(2rem, 1.7rem + 1.5vw, 2.75rem);
  --text-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
}
```

---

<a name="decisión-4"></a>
## Decisión #4 - Paleta de Colores

**Fecha**: [FECHA INICIAL]
**Estado**: ✅ APROBADA
**Categoría**: Diseño de Color

### Contexto
Necesidad de definir una paleta coherente que:
- Refleje la estética de Arcane
- Sea vibrante pero no abrumadora
- Funcione en modo oscuro (principal)
- Tenga suficiente contraste para accesibilidad

### Opciones Consideradas

**Paleta A: Arcane Clásico**
- Primario: Cian eléctrico (#00D9FF)
- Secundario: Púrpura místico (#9D4EDD)
- Acento: Dorado brillante (#FFD60A)
- Background: Azul oscuro profundo (#0A0E27)

**Paleta B: Cyberpunk Neón**
- Primario: Rosa neón (#FF006E)
- Secundario: Verde neón (#00FF87)
- Acento: Amarillo eléctrico (#FFEA00)
- Background: Negro puro (#000000)

**Paleta C: Magia Oscura**
- Primario: Púrpura profundo (#6A0DAD)
- Secundario: Azul mágico (#1E90FF)
- Acento: Plata brillante (#C0C0C0)
- Background: Gris muy oscuro (#1A1A2E)

### Decisión Final
**Paleta A: Arcane Clásico** (con expansión)

### Variables CSS Completas
```css
:root {
  /* Colores Principales */
  --color-primary: #00D9FF;        /* Cian eléctrico */
  --color-secondary: #9D4EDD;      /* Púrpura místico */
  --color-accent: #FFD60A;         /* Dorado brillante */
  --color-accent-2: #FF006E;       /* Rosa neón */
  
  /* Backgrounds */
  --bg-dark: #0A0E27;              /* Azul oscuro profundo */
  --bg-darker: #050816;            /* Negro azulado */
  --bg-card: rgba(29, 38, 67, 0.6);/* Translúcido */
  --bg-overlay: rgba(0, 0, 0, 0.8);/* Overlay oscuro */
  
  /* Textos */
  --text-primary: #FFFFFF;          /* Blanco puro */
  --text-secondary: #B8C1EC;        /* Blanco azulado */
  --text-muted: #6B7A99;            /* Gris azulado */
  
  /* Gradientes Mágicos */
  --gradient-magic: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --gradient-fire: linear-gradient(45deg, #ff0844 0%, #ffb199 100%);
  --gradient-cyber: linear-gradient(135deg, #00D9FF 0%, #9D4EDD 100%);
  --gradient-gold: linear-gradient(135deg, #FFD60A 0%, #FF8C00 100%);
  
  /* Efectos de Glow */
  --glow-primary: 0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3);
  --glow-secondary: 0 0 20px rgba(157, 78, 221, 0.5), 0 0 40px rgba(157, 78, 221, 0.3);
  --glow-accent: 0 0 20px rgba(255, 214, 10, 0.6), 0 0 40px rgba(255, 214, 10, 0.4);
  --glow-accent-2: 0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3);
  
  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.5);
  
  /* Estados */
  --color-success: #00FF87;
  --color-warning: #FFD60A;
  --color-error: #FF006E;
  --color-info: #00D9FF;
}
```

### Razonamiento
- Cian y púrpura son icónicos de Arcane
- Dorado añade calidez sin perder el misterio
- Rosa neón como acento secundario para variedad
- Background oscuro hace que los colores brillen
- Los glows crean atmósfera mágica
- Contraste suficiente para accesibilidad WCAG AA

### Impacto
- Define toda la atmósfera visual
- Permite crear efectos de profundidad con capas
- Los glows generan la sensación "mágica"
- Gradientes añaden dinamismo
- Coherencia visual en todo el sitio

### Reglas de Uso
1. **Texto sobre fondo oscuro**: siempre blanco o cian
2. **CTAs importantes**: usar gradient-cyber con glow
3. **Hover states**: añadir glow del color correspondiente
4. **Backgrounds de sección**: alternar bg-dark y bg-darker
5. **Acentos**: usar dorado y rosa con moderación (máximo 20% de la paleta visible)

---

<a name="decisión-5"></a>
## Decisión #5 - Estructura de Navegación

**Fecha**: [FECHA INICIAL]
**Estado**: ✅ APROBADA
**Categoría**: UX/UI

### Contexto
Se necesitaba un sistema de navegación que fuera:
- Único y memorable
- Siempre accesible
- No invasivo
- Consistente con la estética mágica

### Opciones Consideradas

**Opción A: Hamburger Menu Tradicional**
- Pros: Familiar, probado, simple
- Contras: Genérico, poco memorable

**Opción B: Sidebar Vertical**
- Pros: Mucho espacio para opciones, elegante
- Contras: Ocupa espacio valioso, poco móvil-friendly

**Opción C: Menú Circular Flotante (Radial Menu)**
- Pros: 
  - Único y memorable
  - Mágico en apariencia
  - Eficiente en espacio
  - Expandible radialmente
  - Se integra con estética Arcane
- Contras:
  - Más complejo de implementar
  - Curva de aprendizaje para usuarios

**Opción D: Menu Top Bar Fixed**
- Pros: Estándar, familiar
- Contras: Aburrido, ocupa espacio horizontal

### Decisión Final
**Opción C: Menú Circular Flotante (Radial Menu)**

### Especificaciones
- **Posición**: Fixed, centrado en pantalla (o esquina estratégica)
- **Estado Normal**: Círculo compacto con ícono central
- **Estado Hover**: Expansión radial con opciones orbitales
- **Animación**: Rotación sutil constante
- **Efectos**: Glow pulsante, backdrop blur, trails de partículas

### Razonamiento
- Es diferente a 99% de portafolios
- Se alinea perfectamente con estética mágica/tech
- Permite mostrar habilidades de animación
- Funciona bien en desktop y se puede adaptar en móvil
- Es un feature memorable en sí mismo

### Impacto
- Requiere JavaScript complejo para interactividad
- Necesita estados responsivos (móvil → hamburger adaptado)
- Se convierte en signature piece del portafolio
- Define experiencia de navegación única

### Implementación Técnica
- GSAP para animaciones suaves
- CSS transforms para rotación
- Intersection Observer para actualizar estado activo
- Smooth scroll a secciones
- Backdrop filter para blur

### Adaptación Móvil
En screens < 768px:
- Se mantiene circular pero más compacto
- Click expande en lugar de hover
- Posición en esquina inferior derecha
- Opciones en vertical en lugar de radial

---

<a name="decisión-6"></a>
## Decisión #6 - Sistema de Presentación de Habilidades

**Fecha**: ⏳ PENDIENTE
**Estado**: 🔴 SIN DECIDIR
**Categoría**: Diseño de Contenido

### Contexto
Se requiere una forma creativa de mostrar habilidades técnicas sin usar las típicas barras de progreso, que son:
- Poco precisas (nadie sabe "100%" de algo)
- Estáticas y aburridas
- Sobre-utilizadas en portafolios

### Opciones a Considerar

**Opción A: Constelación de Habilidades** ⭐ RECOMENDADA
- **Concepto**: Cada habilidad es una estrella en el espacio
- **Implementación**: Canvas 2D o SVG
- **Interacción**: Parallax con mouse, tooltips al hover
- **Ventajas**: 
  - Visual impactante
  - Fácil de entender
  - Permite categorización por "galaxias"
  - Tamaño de estrella = nivel de dominio
  - Conexiones muestran relaciones entre skills
- **Desventajas**: 
  - Requiere cálculo de posiciones
  - Performance si hay muchas estrellas

**Opción B: Árbol de Habilidades RPG**
- **Concepto**: Estilo árbol de talentos de videojuego
- **Implementación**: SVG con líneas conectoras
- **Interacción**: Click en nodos muestra detalles
- **Ventajas**: 
  - Gamificación atractiva
  - Muestra progresión de aprendizaje
  - Nodos desbloqueados vs bloqueados
- **Desventajas**: 
  - Más complejo de diseñar
  - Requiere pensamiento en dependencias

**Opción C: Sistema de Cartas Mágicas**
- **Concepto**: Cada skill es una carta coleccionable
- **Implementación**: Grid con flip animation 3D
- **Interacción**: Flip al click revela detalles
- **Ventajas**: 
  - Muy visual y táctil
  - Fácil de categorizar
  - Diseño de cartas permite creatividad
- **Desventajas**: 
  - Requiere mucho espacio
  - Diseño de cada carta toma tiempo

**Opción D: Galaxia Interactiva 3D**
- **Concepto**: Modelo 3D de sistema solar
- **Implementación**: Three.js con controles de órbita
- **Interacción**: Rotar, zoom, click en planetas
- **Ventajas**: 
  - MÁS impactante visualmente
  - Demuestra habilidades 3D
  - Experiencia inmersiva total
- **Desventajas**: 
  - Más pesado (Three.js)
  - Mayor complejidad técnica
  - Puede ser overkill

### Decisión Final
**[PENDIENTE DE DECISIÓN DEL USUARIO]**

### Recomendación
**Opción A: Constelación de Habilidades**

**Razones**:
1. Balance perfecto entre impacto visual y complejidad
2. Más ligero que Galaxia 3D pero igual de efectivo
3. Metáfora intuitiva (estrellas brillantes = habilidades)
4. Se integra perfectamente con tema mágico/espacial
5. Permite mostrar relaciones entre habilidades (líneas conectoras)
6. Escalable (fácil agregar/quitar habilidades)

### Siguiente Paso
- Confirmar elección con usuario
- Crear mockup o wireframe de la opción elegida
- Definir categorías de habilidades
- Listar todas las habilidades a mostrar
- Implementar sistema interactivo

---

<a name="decisión-7"></a>
## Decisión #7 - Layout de Galería de Fotografías

**Fecha**: ⏳ PENDIENTE
**Estado**: 🔴 SIN DECIDIR
**Categoría**: Diseño de Galería

### Contexto
Se necesita un layout para mostrar proyectos fotográficos que sea:
- Dinámico e interactivo
- Permita apreciar las fotos en detalle
- Ofrezca navegación intuitiva
- Se vea profesional

### Opciones a Considerar

**Opción 1: Masonry Grid con Lightbox** ⭐ RECOMENDADA
- **Concepto**: Grid de Pinterest con tamaños variables
- **Ventajas**:
  - Visualmente interesante
  - Optimiza uso de espacio
  - Probado y familiar para usuarios
  - Lightbox permite ver detalles
  - Fácil de filtrar por categoría
- **Desventajas**:
  - Puede ser desordenado si no se balancea bien
  - Requiere cálculo de posiciones

**Opción 2: Carrusel 3D Infinito**
- **Concepto**: Carousel con perspectiva 3D
- **Ventajas**:
  - Muy visual y premium
  - Enfoca atención en foto activa
  - Efecto de profundidad impresionante
  - Navegación clara
- **Desventajas**:
  - Muestra pocas fotos a la vez
  - Requiere navegación activa del usuario

**Opción 3: Mosaico Expandible (Fullscreen)**
- **Concepto**: Grid que expande imagen al click
- **Ventajas**:
  - Vista general + detalle
  - Transición suave
  - Control total del usuario
- **Desventajas**:
  - Menos dinámico que otras opciones
  - Requiere clicks múltiples

### Decisión Final
**[PENDIENTE DE DECISIÓN DEL USUARIO]**

### Recomendación
**Opción 1: Masonry Grid + Lightbox Modal**

**Razones**:
1. Mejor balance entre mostrar cantidad y calidad
2. Familiar pero se puede hacer único con animaciones
3. Filtros por categoría funcionan perfecto con masonry
4. Lightbox permite apreciación detallada
5. Más flexible para diferentes cantidades de fotos
6. Mejor UX para exploración

**Implementación Sugerida**:
- Masonry.js o CSS Grid con `grid-auto-flow: dense`
- Hover effects: zoom + overlay con info
- Lightbox custom con animaciones épicas
- Navegación con teclado (arrows)
- Transiciones suaves entre imágenes
- Descripciones animadas
- Opción de compartir/descargar

### Siguiente Paso
- Confirmar elección con usuario
- Diseñar hover states
- Crear lightbox mockup
- Definir categorías de fotos
- Preparar assets optimizados

---

<a name="decisión-8"></a>
## Decisión #8 - Mecánica de Sección Destructible (Index)

**Fecha**: ⏳ PENDIENTE
**Estado**: 🔴 SIN DECIDIR
**Categoría**: Interactividad

### Contexto
La landing page debe tener una experiencia tipo videojuego donde el usuario "destruye" elementos para acceder al portafolio. Esto debe ser:
- Divertido e intuitivo
- Visualmente impactante
- Funcionalmente sólido
- No frustrar al usuario

### Opciones a Considerar

**Modo A: Click Individual para Destruir**
- **Mecánica**: Cada click rompe fragmentos en el área clickeada
- **Física**: Fragmentos caen con gravedad realista
- **Progreso**: Contador o barra de progreso
- **Ventajas**:
  - Simple de entender
  - Control preciso del usuario
  - Satisfacción en cada click
- **Desventajas**:
  - Puede tomar tiempo si hay muchos fragmentos
  - Repetitivo

**Modo B: Arrastre del Mouse Destruye Área**
- **Mecánica**: Drag + hold destruye todos los fragmentos tocados
- **Física**: Explosión de partículas en cadena
- **Progreso**: Visual con efectos de onda
- **Ventajas**:
  - Más rápido
  - Sensación de poder
  - Interacción continua
- **Desventajas**:
  - Menos preciso
  - Puede ser demasiado fácil

**Modo C: Híbrido - Ambos Modos** ⭐ RECOMENDADA
- **Mecánica**: Click O drag, lo que prefiera el usuario
- **Física**: Combinación de ambos sistemas
- **Progreso**: Multi-indicador
- **Ventajas**:
  - Máxima flexibilidad
  - Accesible para diferentes usuarios
  - Más completo
- **Desventajas**:
  - Más complejo de programar
  - Requiere tutorial/hint

**Modo D: Disparo tipo Shooter**
- **Mecánica**: Cursor como mira, click dispara proyectil
- **Física**: Proyectil viaja y explota al impactar
- **Progreso**: Combo multiplier
- **Ventajas**:
  - MUY gamificado
  - Altamente satisfactorio
- **Desventajas**:
  - Puede ser confuso
  - Menos intuitivo

### Decisión Final
**[PENDIENTE DE DECISIÓN DEL USUARIO]**

### Recomendación
**Modo C: Híbrido (Click + Drag)**

**Razones**:
1. Combina lo mejor de ambos mundos
2. Usuarios pueden elegir su estilo
3. Más accesible (click para precisión, drag para velocidad)
4. Mantiene interés (dos formas de interactuar)
5. Permite añadir power-ups o combos después si se desea

**Implementación Técnica**:
- Canvas HTML5 para renderizado
- Matter.js para física de fragmentos
- Partículas con colores de la paleta
- Trails del cursor/drag
- Shake effect al destruir muchos fragmentos
- Sonido satisfactorio (opcional, con mute)
- Progress bar circular o lineal

**Detalles de UX**:
- Hint sutil al inicio: "Click o arrastra para entrar"
- Efectos visuales diferentes para cada modo
- Transición épica cuando 100% destruido
- Easter egg si destruyen todo muy rápido

### Siguiente Paso
- Confirmar elección con usuario
- Prototipar mecánica básica
- Testear sensación de destrucción
- Ajustar física para satisfacción óptima
- Implementar transición final

---

<a name="decisión-9"></a>
## Decisión #9 - Framework CSS para Responsividad

**Fecha**: ⏳ PENDIENTE
**Estado**: 🔴 SIN DECIDIR
**Categoría**: Técnica

### Contexto
Se necesita decidir si usar un framework CSS para agilizar el desarrollo responsive o ir con CSS puro/custom.

### Opciones a Considerar

**Opción A: Bootstrap 5**
- **Pros**:
  - Muy conocido, mucha documentación
  - Grid system robusto
  - Componentes pre-hechos
  - Rápido de implementar
- **Contras**:
  - Más pesado (~200KB)
  - Look genérico si no se customiza
  - Más difícil de override

**Opción B: Tailwind CSS**
- **Pros**:
  - Utility-first, muy flexible
  - Fácil de customizar
  - PurgeCSS elimina CSS no usado
  - Moderno y trending
- **Contras**:
  - Requiere setup de build
  - Curva de aprendizaje
  - HTML puede verse cluttered

**Opción C: CSS Puro con Grid/Flexbox**
- **Pros**:
  - Cero dependencias
  - Máximo control
  - Más ligero
  - Aprende CSS real
- **Contras**:
  - Más tiempo de desarrollo
  - Hay que crear todo desde cero
  - Más testing necesario

**Opción D: Foundation**
- **Pros**:
  - Más semántico que Bootstrap
  - Muy profesional
  - Flexible
- **Contras**:
  - Menos popular (menos recursos)
  - Curva de aprendizaje

### Decisión Final
**[PENDIENTE DE DECISIÓN DEL USUARIO]**

### Recomendación
**Opción A: Bootstrap 5**

**Razones**:
1. Velocidad de desarrollo (proyecto ya es complejo en animaciones)
2. Grid system probado y robusto
3. Utilities útiles para spacing, display, etc.
4. Fácil de customizar con variables SCSS
5. No requiere build step si se usa CDN
6. Documentación excelente

**Customización**:
- Usar solo el Grid y Utilities (no los componentes)
- Override variables de color con nuestra paleta
- Mantener diseño custom, usar solo la estructura

**Alternativa Válida**:
Si prefieres máximo control y peso mínimo: **CSS Puro**
- Crear propio sistema de grid (CSS Grid)
- Utility classes mínimas
- Todo custom

### Siguiente Paso
- Decidir framework o puro CSS
- Si Bootstrap: configurar CDN y variables custom
- Si CSS Puro: crear sistema de grid base
- Establecer breakpoints estándar

---

<a name="decisión-10"></a>
## Decisión #10 - Plataforma de Hosting

**Fecha**: ⏳ PENDIENTE
**Estado**: 🔴 SIN DECIDIR
**Categoría**: Deployment

### Contexto
Al finalizar el proyecto, se necesita un hosting que:
- Sea gratuito o económico
- Ofrezca buen performance
- Permita dominio custom (opcional)
- Sea fácil de deployar

### Opciones a Considerar

**Opción A: GitHub Pages**
- **Pros**:
  - Completamente gratis
  - Integración directa con repo
  - SSL gratis
  - Fácil de usar
- **Contras**:
  - Solo sitios estáticos
  - Sin server-side code
  - Builds limitados

**Opción B: Netlify** ⭐ RECOMENDADA
- **Pros**:
  - Gratis para proyectos personales
  - Deploy automático desde Git
  - SSL gratis
  - CDN global
  - Forms, functions, etc.
  - Preview deploys
- **Contras**:
  - Límites en plan gratuito (100GB bandwidth/mes)

**Opción C: Vercel**
- **Pros**:
  - Optimizado para performance
  - Preview deploys
  - Analytics
  - Edge functions
- **Contras**:
  - Más orientado a Next.js/React
  - Límites en plan gratuito

**Opción D: Cloudflare Pages**
- **Pros**:
  - Unlimited bandwidth
  - CDN de Cloudflare
  - Muy rápido
  - Gratis
- **Contras**:
  - Más nuevo, menos maduro
  - Menos features que Netlify

### Decisión Final
**[PENDIENTE DE DECISIÓN DEL USUARIO]**

### Recomendación
**Opción B: Netlify**

**Razones**:
1. Mejor balance de features y facilidad
2. Deploy automático al push a Git
3. Preview links para cada cambio
4. Forms integrados (por si se añade contacto)
5. CDN rápido global
6. SSL automático
7. Dominio custom gratis

**Plan de Deployment**:
1. Repo en GitHub (privado o público)
2. Conectar Netlify al repo
3. Configure build settings (si usa build)
4. Deploy automático en cada push
5. Configurar dominio custom (opcional)

### Siguiente Paso
- Confirmar plataforma de hosting
- Crear cuenta en plataforma elegida
- Preparar repo de GitHub
- Configurar deployment workflow

---

## 📊 RESUMEN DE DECISIONES

### ✅ Aprobadas (5)
1. Tema Visual: Estilo Arcane
2. Stack Tecnológico: GSAP, Three.js, Matter.js, etc.
3. Tipografías: Orbitron, Rajdhani, Cinzel
4. Paleta de Colores: Arcane Clásico
5. Navegación: Menú Circular Flotante

### ⏳ Pendientes (5)
6. Sistema de Habilidades (Constelación recomendada)
7. Layout de Galería (Masonry recomendado)
8. Mecánica Destructible (Híbrido recomendado)
9. Framework CSS (Bootstrap recomendado)
10. Hosting (Netlify recomendado)

---

## 🎯 PRÓXIMA SESIÓN: TOMAR DECISIONES PENDIENTES

Para avanzar eficientemente, las 5 decisiones pendientes deben tomarse en la próxima sesión de trabajo.

**Orden Sugerido**:
1. Framework CSS (afecta todo el desarrollo)
2. Sistema de Habilidades (feature central de perfil)
3. Layout de Galería (feature central de fotos)
4. Mecánica Destructible (feature central de index)
5. Hosting (puede esperar al final)

---

**ESTE DOCUMENTO CRECE CON EL PROYECTO** 📈

Añade nuevas decisiones conforme surjan. Documenta el razonamiento siempre.

**Una decisión bien documentada hoy ahorra 10 dudas mañana.** 💡
