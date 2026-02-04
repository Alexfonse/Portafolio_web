# 🔄 PROMPT DE CONTINUACIÓN - SISTEMA DE CONTEXTO PERSISTENTE

---

## 📍 INSTRUCCIONES PARA NUEVA SESIÓN

**COPIA Y PEGA ESTE PROMPT AL INICIAR CADA NUEVA SESIÓN CON CLAUDE**

---

Hola Claude, estoy trabajando en un proyecto de portafolio web creativo e interactivo. Este es un proyecto en curso y necesito que revises el contexto previo antes de continuar.

**PASO 1: REVISAR CONTEXTO**
Por favor, lee los siguientes archivos en orden:

1. `/mnt/user-data/uploads/contexto_y_tareas/PROMPT_PRINCIPAL.md` - Documento maestro del proyecto
2. `/mnt/user-data/uploads/contexto_y_tareas/CHECKLIST_DETALLADO.md` - Lista de tareas por sección
3. `/mnt/user-data/uploads/contexto_y_tareas/ESTADO_ACTUAL.md` - Estado actual del proyecto (actualizado cada sesión)
4. `/mnt/user-data/uploads/contexto_y_tareas/DECISIONES_CREATIVAS.md` - Decisiones de diseño tomadas
5. `/mnt/user-data/uploads/contexto_y_tareas/NOTAS_DE_SESION.md` - Notas y aprendizajes de sesiones anteriores

**PASO 2: ANÁLISIS**
Después de leer todos los archivos, por favor:

1. **Resume el estado actual del proyecto** (qué está hecho, qué falta)
2. **Identifica la última tarea en la que estábamos trabajando**
3. **Sugiere los siguientes pasos lógicos** basándote en el progreso
4. **Señala cualquier blocker o decisión pendiente**

**PASO 3: CONFIRMACIÓN**
Una vez que hayas revisado todo el contexto, confirma:
- ✅ "He revisado el contexto completo del proyecto"
- ✅ "Entiendo la visión y objetivos"
- ✅ "Estoy listo para continuar desde [punto específico]"

**PASO 4: CONTINUAR**
Espera mis instrucciones sobre en qué quiero trabajar hoy, o sugiéreme la tarea más lógica basándote en el estado actual.

---

## 🎯 PRINCIPIOS DE CONTINUIDAD

### Mantén Consistencia
- Respeta todas las decisiones de diseño previas documentadas
- Sigue el mismo estilo de código establecido
- Usa las mismas librerías y tecnologías ya integradas
- Mantén la paleta de colores y tipografías definidas

### Documenta Todo
- Al finalizar la sesión, actualiza `ESTADO_ACTUAL.md`
- Registra decisiones importantes en `DECISIONES_CREATIVAS.md`
- Anota aprendizajes y trucos en `NOTAS_DE_SESION.md`
- Marca las tareas completadas en `CHECKLIST_DETALLADO.md`

### Comunica Claramente
- Si algo del contexto anterior parece inconsistente, pregunta
- Si propones un cambio significativo, explica por qué
- Si hay múltiples opciones, presenta pros/contras
- Si te falta información, solicítala específicamente

---

## 📋 TEMPLATE DE ESTADO ACTUAL

**Úsalo para actualizar el archivo al final de cada sesión:**

```markdown
# ESTADO ACTUAL DEL PROYECTO
Última actualización: [FECHA]

## ✅ COMPLETADO
- [Lista de tareas/secciones completadas]
- [Con nivel de detalle]

## 🚧 EN PROGRESO
- [Tarea actual en la que estás trabajando]
- [Porcentaje de completitud aproximado]
- [Bloqueadores si hay]

## ⏭️ PRÓXIMOS PASOS
1. [Siguiente tarea prioritaria]
2. [Segunda tarea]
3. [Tercera tarea]

## 🤔 DECISIONES PENDIENTES
- [Decisión 1 que necesita tomarse]
- [Decisión 2 que requiere input]

## 📝 NOTAS DE LA SESIÓN
- [Insights importantes]
- [Problemas resueltos]
- [Cambios significativos]

## 🐛 BUGS CONOCIDOS
- [Bug 1 y su workaround temporal]
- [Bug 2 para arreglar después]

## 💡 IDEAS PARA MEJORAR
- [Idea 1 para implementar en el futuro]
- [Idea 2 que surgió durante el desarrollo]
```

---

## 🎨 TEMPLATE DE DECISIONES CREATIVAS

```markdown
# DECISIONES CREATIVAS - PORTAFOLIO

## Decisión #[N] - [Título]
**Fecha**: [DD/MM/YYYY]
**Contexto**: [Qué problema/situación llevó a esta decisión]

**Opciones Consideradas**:
1. Opción A - [Descripción]
   - Pros: [...]
   - Contras: [...]
2. Opción B - [Descripción]
   - Pros: [...]
   - Contras: [...]

**Decisión Final**: [Opción elegida]

**Razonamiento**: [Por qué se eligió esta opción]

**Impacto**: [Cómo afecta al proyecto]

**Implementación**: [Detalles técnicos clave]

---
```

---

## 📓 TEMPLATE DE NOTAS DE SESIÓN

```markdown
# NOTAS DE SESIÓN - [FECHA]

## 🎯 Objetivo de la Sesión
[Qué se planeaba lograr hoy]

## ✅ Logros
- [Tarea completada 1]
- [Tarea completada 2]
- [Tarea completada 3]

## 💡 Aprendizajes
- [Truco/técnica nueva descubierta]
- [Solución a un problema complejo]
- [Optimización encontrada]

## 🐛 Problemas Encontrados
**Problema**: [Descripción]
**Solución**: [Cómo se resolvió]
**Prevención**: [Cómo evitarlo en el futuro]

## 🔗 Recursos Útiles
- [Link a tutorial]
- [Documentación consultada]
- [Referencia de diseño]

## 🚀 Siguiente Sesión
**Comenzar con**: [Primera tarea para la próxima vez]
**Tener listo**: [Recursos o info necesaria]
**Tiempo estimado**: [Cuánto podría tomar]

---
```

---

## 🔍 COMANDOS RÁPIDOS DE VERIFICACIÓN

### Revisar Progreso General
```
"Claude, ¿qué porcentaje del proyecto está completo? Dame un breakdown por secciones."
```

### Verificar Checklist
```
"Claude, revisa el CHECKLIST_DETALLADO.md y dime cuántas tareas están marcadas como completadas en la Sección [X]"
```

### Análisis de Bloqueadores
```
"Claude, identifica cualquier decisión pendiente o bloqueador que esté impidiendo avanzar"
```

### Sugerencia de Siguiente Tarea
```
"Claude, basándote en el estado actual, ¿cuál es la tarea más lógica y de mayor impacto para trabajar ahora?"
```

### Revisión de Calidad
```
"Claude, revisa el código/diseño de la Sección [X] contra los estándares definidos en PROMPT_PRINCIPAL.md"
```

---

## 📊 SISTEMA DE TRACKING DE PROGRESO

### Métricas Clave

**Completitud por Sección**:
- [ ] Sección 0: Setup Inicial - 0%
- [ ] Sección 1: Index Destructible - 0%
- [ ] Componente: Menú Circular - 0%
- [ ] Sección 2: Perfil - 0%
- [ ] Sección 3: Fotografía - 0%
- [ ] Sección 4: Videos - 0%
- [ ] Sección 5: Proyectos - 0%
- [ ] Efectos Globales - 0%
- [ ] Responsividad - 0%
- [ ] Performance - 0%
- [ ] Accesibilidad - 0%
- [ ] Testing - 0%

**Progreso General**: 0/12 secciones = 0%

### Actualizar Progreso
Al final de cada sesión, actualiza los porcentajes basándote en tareas completadas del checklist.

---

## 🎓 MEJORES PRÁCTICAS PARA CONTINUIDAD

### DO ✅
- Leer TODOS los archivos de contexto antes de escribir código
- Actualizar documentación al finalizar cada sesión
- Hacer commits frecuentes con mensajes descriptivos
- Testear cada feature antes de marcarla como completa
- Documentar soluciones a problemas complejos
- Pedir clarificación si algo no está claro

### DON'T ❌
- Asumir que recuerdas de sesiones anteriores sin revisar
- Cambiar decisiones de diseño sin documentar el porqué
- Dejar código a medias sin notas de continuación
- Saltar pasos del checklist sin marcar
- Ignorar warnings o bugs menores
- Procrastinar decisiones importantes

---

## 🔄 WORKFLOW DE SESIÓN TÍPICA

### 1. Inicio (5-10 min)
- Leer archivos de contexto
- Revisar estado actual
- Identificar tarea del día

### 2. Planificación (5 min)
- Confirmar objetivo de sesión
- Desglosar en subtareas
- Estimar tiempo necesario

### 3. Desarrollo (60-120 min)
- Implementar features
- Testear constantemente
- Documentar en código
- Resolver problemas

### 4. Testing (15-30 min)
- Verificar funcionalidad
- Test responsive
- Revisar performance
- Validar contra checklist

### 5. Documentación (10 min)
- Actualizar ESTADO_ACTUAL.md
- Registrar decisiones si hubo
- Anotar aprendizajes
- Marcar tareas completadas

### 6. Cierre (5 min)
- Commit de cambios
- Preparar próxima sesión
- Listar próximos pasos

---

## 🎯 OBJETIVOS DE CADA MILESTONE

### Milestone 1: Fundación
- Setup completo del proyecto
- Variables CSS definidas
- Librerías integradas
- **Meta**: Base sólida para desarrollo

### Milestone 2: Navegación
- Menú circular funcional
- Scroll suave
- Transiciones entre secciones
- **Meta**: Navegación fluida

### Milestone 3: Index Épico
- Sección destructible completa
- Física de partículas
- Transición al menú
- **Meta**: Primera impresión memorable

### Milestone 4: Contenido Core
- Perfil con habilidades
- Galerías funcionales
- Proyectos mostrados
- **Meta**: Contenido accesible y atractivo

### Milestone 5: Efectos Wow
- Parallax
- Cursor custom
- Micro-animaciones
- Glitch effects
- **Meta**: Experiencia inmersiva

### Milestone 6: Pulido Final
- Optimización completa
- Testing exhaustivo
- Accesibilidad verificada
- **Meta**: Producto profesional

---

## 📞 PREGUNTAS FRECUENTES

### "¿Qué hago si el contexto parece desactualizado?"
Pregunta específicamente qué parece inconsistente. Actualizaremos los docs.

### "¿Cómo decido prioridades si hay múltiples tareas?"
Sigue el orden del CHECKLIST_DETALLADO.md, está ordenado por dependencias.

### "¿Qué hago si encuentro un bug en código anterior?"
Regístralo en ESTADO_ACTUAL.md → Bugs Conocidos. Decide si arreglarlo ahora o después.

### "¿Puedo cambiar una decisión de diseño previa?"
Sí, pero documenta el cambio en DECISIONES_CREATIVAS.md con razonamiento claro.

### "¿Cómo sé si una tarea está realmente completa?"
Verifica contra el checklist específico. Si cumple todos los puntos, está completa.

---

## 🎉 CELEBRACIÓN DE HITOS

Cuando completes un milestone importante:

1. ✅ Marca todas las tareas relacionadas
2. 📸 Toma screenshots del progreso
3. 📝 Escribe un breve resumen del logro
4. 🎯 Define claramente el siguiente milestone
5. 🎊 ¡Reconoce el trabajo bien hecho!

---

## 🚀 LLAMADO A LA ACCIÓN

**Cada sesión es un paso más cerca del portafolio extraordinario.**

**Mantén el momentum.**
**Documenta todo.**
**Itera sin piedad.**
**Nunca te conformes con "suficientemente bueno".**

**Este proyecto será tu carta de presentación al mundo.**
**Haz que cada línea de código cuente.**

---

## 📌 VERSIÓN DE ESTE SISTEMA

**Versión**: 1.0
**Fecha de Creación**: [FECHA ACTUAL]
**Última Actualización**: [FECHA ACTUAL]

**Changelog**:
- v1.0 - Sistema inicial de continuidad creado

---

**¿LISTO PARA CONTINUAR LA AVENTURA? 🚀✨**

**Lee el contexto. Entiende el estado. Avanza con propósito.**
