// ========================================
// ✨ TEXT PARTICLE SYSTEM (AUTO MODE)
// Emits particles from text automatically when visible
// ========================================

class AutoTextParticles {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.activeElements = new Set();
        this.frameId = null;
        
        this.init();
    }

    init() {
        this.elements = document.querySelectorAll('.interactive-text');
        
        // 1. Setup Observer to know when text is on screen
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // 10% visible
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activeElements.add(entry.target);
                    this.startLoop();
                } else {
                    this.activeElements.delete(entry.target);
                    if (this.activeElements.size === 0) this.stopLoop();
                }
            });
        }, options);
        
        this.elements.forEach(el => this.observer.observe(el));
    }

    startLoop() {
        if (!this.frameId) {
            this.loop();
        }
    }

    stopLoop() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    loop() {
        // Run logic
        this.activeElements.forEach(el => {
            // Random chance to spawn particle per frame per element
            // 60fps -> 0.05 chance -> ~3 particles per second per element
            if (Math.random() < 0.08) { 
                this.spawnParticle(el);
            }
        });

        if (this.activeElements.size > 0) {
            this.frameId = requestAnimationFrame(() => this.loop());
        } else {
            this.frameId = null;
        }
    }

    spawnParticle(element) {
        const rect = element.getBoundingClientRect();
        
        // Don't spawn if element has 0 size (hidden)
        if (rect.width === 0 || rect.height === 0) return;

        const p = document.createElement('div');
        p.className = 'text-particle';

        // 1. Color (Cyan dominant for this theme)
        if (Math.random() > 0.7) {
            p.classList.add('gold');
        } else {
            p.classList.add('cyan');
        }

        // 2. Position (Random within text box)
        // We use clientX/Y logic but simulated
        const randomX = Math.random() * rect.width;
        const randomY = Math.random() * rect.height;
        
        const startX = rect.left + randomX;
        const startY = rect.top + randomY;

        p.style.left = `${startX}px`;
        p.style.top = `${startY}px`;

        // 3. Trajectory (Drift var)
        const drift = (Math.random() - 0.5) * 40; // -20 to 20px x-drift
        p.style.setProperty('--tx', `${drift}px`);

        document.body.appendChild(p);

        // 4. Cleanup
        setTimeout(() => p.remove(), 1500);
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    new AutoTextParticles();
});
