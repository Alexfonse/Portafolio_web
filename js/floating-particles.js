// ========================================
// FLOATING PARTICLES SYSTEM
// Partículas ambientales animadas
// ========================================

class FloatingParticles {
    constructor(options = {}) {
        this.container = null;
        this.particles = [];
        
        // Configuración
        this.config = {
            count: options.count || 20,
            minSize: options.minSize || 2,
            maxSize: options.maxSize || 6,
            colors: options.colors || ['#00FF88', '#10B981', '#FFD700'],
            speed: options.speed || 15, // segundos para float-up
            ...options
        };
        
        // Solo inicializar en desktop por performance
        if (window.innerWidth > 768) {
            this.init();
        }
    }
    
    init() {
        this.createContainer();
        this.generateParticles();
        
        // Regenerar partículas periódicamente
        setInterval(() => this.refreshParticles(), 30000);
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'particles-container';
        document.body.appendChild(this.container);
        
        // También añadir nebula overlay
        const nebula = document.createElement('div');
        nebula.className = 'nebula-overlay';
        document.body.appendChild(nebula);
    }
    
    generateParticles() {
        for (let i = 0; i < this.config.count; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = this.randomBetween(this.config.minSize, this.config.maxSize);
        const sizeClass = size < 3 ? 'small' : size > 4 ? 'large' : 'medium';
        particle.classList.add(sizeClass);
        
        // Color aleatorio
        const colorClass = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
        if (colorClass.includes('FFD700')) {
            particle.classList.add('gold');
        } else if (colorClass.includes('10B981')) {
            particle.classList.add('emerald');
        }
        
        // Efectos aleatorios
        const effects = ['drift', 'pulse', 'twinkle', ''];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        if (randomEffect) {
            particle.classList.add(randomEffect);
        }
        
        // Posición inicial aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        
        // Drift aleatorio
        const driftX = this.randomBetween(-100, 100);
        particle.style.setProperty('--drift-x', driftX + 'px');
        
        // Delay aleatorio
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Duración aleatoria (varía la velocidad)
        const duration = this.randomBetween(this.config.speed - 5, this.config.speed + 5);
        particle.style.animationDuration = duration + 's';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    refreshParticles() {
        // Remover partículas viejas
        this.particles.forEach(p => p.remove());
        this.particles = [];
        
        // Generar nuevas
        this.generateParticles();
    }
    
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Método público para destruir
    destroy() {
        if (this.container) {
            this.container.remove();
        }
        this.particles = [];
    }
    
    // Método público para pausar/reanudar
    pause() {
        this.particles.forEach(p => {
            p.style.animationPlayState = 'paused';
        });
    }
    
    resume() {
        this.particles.forEach(p => {
            p.style.animationPlayState = 'running';
        });
    }
}

// Auto-inicializar partículas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.particleSystem = new FloatingParticles({
            count: 20,
            speed: 15
        });
    });
} else {
    window.particleSystem = new FloatingParticles({
        count: 20,
        speed: 15
    });
}

// Pausar durante scroll intenso (optimización)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (window.particleSystem) {
        window.particleSystem.pause();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            window.particleSystem.resume();
        }, 500);
    }
});

// Exportar para uso externo
window.FloatingParticles = FloatingParticles;
