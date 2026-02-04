// ========================================
// SPOTLIGHT GALLERY EFFECT
// Efecto de linterna en galería
// ========================================

class SpotlightGallery {
    constructor(gallerySelector = '.gallery-container') {
        this.gallery = document.querySelector(gallerySelector);
        if (!this.gallery) return;
        
        this.isActive = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.spotlightBeam = null;
        
        this.init();
    }
    
    init() {
        // Agregar clase para spotlight
        this.gallery.classList.add('gallery-spotlight', 'spotlight-off');
        
        // Crear toggle button
        this.createToggleButton();
        
        // Crear haz de luz
        this.createSpotlightBeam();
        
        // Crear hint inicial
        this.showHint();
        
        // Bind events
        this.bindEvents();
    }
    
    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'spotlight-toggle';
        button.setAttribute('aria-label', 'Toggle spotlight mode');
        button.innerHTML = '<ion-icon name="flashlight-outline"></ion-icon>';
        
        button.addEventListener('click', () => this.toggle());
        
        document.body.appendChild(button);
        this.toggleButton = button;
    }
    
    createSpotlightBeam() {
        this.spotlightBeam = document.createElement('div');
        this.spotlightBeam.className = 'spotlight-beam';
        document.body.appendChild(this.spotlightBeam);
        
        // Crear partículas en el haz
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            this.spotlightBeam.appendChild(particle);
        }
    }
    
    showHint() {
        const hint = document.createElement('div');
        hint.className = 'spotlight-hint';
        hint.textContent = '💡 Activa el modo linterna para explorar las fotos';
        document.body.appendChild(hint);
        
        setTimeout(() => hint.remove(), 4000);
    }
    
    bindEvents() {
        // Seguir el mouse
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateSpotlight();
        });
        
        // También en móvil con touch
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
                this.updateSpotlight();
            }
        });
    }
    
    updateSpotlight() {
        if (!this.isActive) return;
        
        // Actualizar posición de la variable CSS
        const galleryRect = this.gallery.getBoundingClientRect();
        const percentX = ((this.mouseX - galleryRect.left) / galleryRect.width) * 100;
        const percentY = ((this.mouseY - galleryRect.top) / galleryRect.height) * 100;
        
        this.gallery.style.setProperty('--mouse-x', percentX + '%');
        this.gallery.style.setProperty('--mouse-y', percentY + '%');
        
        // Mover el haz de luz
        if (this.spotlightBeam) {
            this.spotlightBeam.style.left = this.mouseX + 'px';
            this.spotlightBeam.style.top = this.mouseY + 'px';
        }
    }
    
    toggle() {
        this.isActive = !this.isActive;
        
        if (this.isActive) {
            this.activate();
        } else {
            this.deactivate();
        }
    }
    
    activate() {
        this.gallery.classList.remove('spotlight-off');
        this.toggleButton.innerHTML = '<ion-icon name="flashlight"></ion-icon>';
        
        // Cambiar color del botón
        this.toggleButton.style.background = 'var(--gradient-gold)';
        
        // Actualizar posición inicial
        this.updateSpotlight();
    }
    
    deactivate() {
        this.gallery.classList.add('spotlight-off');
        this.toggleButton.innerHTML = '<ion-icon name="flashlight-outline"></ion-icon>';
        
        // Restaurar color del botón
        this.toggleButton.style.background = 'var(--gradient-arcane)';
    }
}

// Inicializar spotlight en galería
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SpotlightGallery('.gallery-container');
    });
} else {
    new SpotlightGallery('.gallery-container');
}

// También aplicar a otras galerías si existen
window.addEventListener('load', () => {
    const galleries = document.querySelectorAll('[data-spotlight="true"]');
    galleries.forEach(gallery => {
        new SpotlightGallery(`#${gallery.id}`);
    });
});
