// ========================================
// CUSTOM SVG CURSOR
// Cursor mágico arcano con partículas
// ========================================

class CustomCursor {
    constructor() {
        this.cursorEl = null;
        this.cursorMain = null;
        this.cursorGlow = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.trails = [];
        this.maxTrails = 10;
        
        // Initialize on all devices that support hover (relaxed check)
        if (window.matchMedia('(hover: hover)').matches) {
            this.init();
        }
    }
    
    init() {
        this.createCursor();
        this.bindEvents();
    }
    
    createCursor() {
        // Crear contenedor
        this.cursorEl = document.createElement('div');
        this.cursorEl.className = 'custom-cursor';
        
        // SVG principal (hexágono arcano)
        this.cursorMain = this.createSVG();
        this.cursorEl.appendChild(this.cursorMain);
        
        // Glow ring
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'cursor-glow';
        this.cursorEl.appendChild(this.cursorGlow);
        
        document.body.appendChild(this.cursorEl);
    }
    
    createSVG() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'cursor-main');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 20 20');
        
        // Hexágono mágico
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '10,2 18,6 18,14 10,18 2,14 2,6');
        polygon.setAttribute('fill', 'none');
        polygon.setAttribute('stroke', '#10B981');
        polygon.setAttribute('stroke-width', '2');
        
        // Círculo central
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '10');
        circle.setAttribute('cy', '10');
        circle.setAttribute('r', '3');
        circle.setAttribute('fill', '#00FF88');
        
        svg.appendChild(polygon);
        svg.appendChild(circle);
        
        return svg;
    }
    
    bindEvents() {
        // Seguir movimiento del mouse
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.moveCursor();
            this.createTrail();
        });
        
        // Click effects
        document.addEventListener('mousedown', () => {
            this.cursorEl.classList.add('cursor-click');
            this.createClickParticles();
        });
        
        document.addEventListener('mouseup', () => {
            this.cursorEl.classList.remove('cursor-click');
        });
        
        // Hover states
        // Hover states using DELEGATION (Fixes dynamic elements issues)
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, [role="button"], .clickable, .lantern-toggle, .masonry-item, .masonry-overlay');
            if (target) {
                this.cursorEl.classList.add('cursor-hover', 'cursor-link');
            }
            
            const imgTarget = e.target.closest('img, .gallery-item, .foto, .masonry-item, .masonry-overlay');
            if (imgTarget) {
                this.cursorEl.classList.add('cursor-image');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, [role="button"], .clickable, .lantern-toggle, .masonry-item, .masonry-overlay');
            if (target) {
                this.cursorEl.classList.remove('cursor-hover', 'cursor-link');
            }
            
            const imgTarget = e.target.closest('img, .gallery-item, .foto, .masonry-item, .masonry-overlay');
            if (imgTarget) {
                this.cursorEl.classList.remove('cursor-image');
            }
        });
    }
    
    moveCursor() {
        if (!this.cursorEl) return;
        
        // Mover cursor principal
        this.cursorMain.style.left = this.mouseX + 'px';
        this.cursorMain.style.top = this.mouseY + 'px';
        
        // Mover glow (con ligero delay)
        this.cursorGlow.style.left = this.mouseX + 'px';
        this.cursorGlow.style.top = this.mouseY + 'px';
    }
    
    createTrail() {
        // Limitar número de trails
        if (this.trails.length >= this.maxTrails) {
            const oldTrail = this.trails.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
        
        // Crear nueva partícula de trail
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = this.mouseX + 'px';
        trail.style.top = this.mouseY + 'px';
        
        document.body.appendChild(trail);
        this.trails.push(trail);
        
        // Remover después de la animación
        setTimeout(() => {
            trail.remove();
            const index = this.trails.indexOf(trail);
            if (index > -1) {
                this.trails.splice(index, 1);
            }
        }, 800);
    }
    
    createClickParticles() {
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            
            // Posición inicial
            particle.style.left = this.mouseX + 'px';
            particle.style.top = this.mouseY + 'px';
            
            // Dirección aleatoria
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 30 + Math.random() * 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            // Remover después de animación
            setTimeout(() => particle.remove(), 600);
        }
    }
}

// Inicializar cursor personalizado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CustomCursor());
} else {
    new CustomCursor();
}
