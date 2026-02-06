// ========================================
// 🔦 INDEX TECH FLASHLIGHT (Soft Version)
// Independent system for index.html
// ========================================

class IndexFlashlight {
    constructor() {
        this.isActive = false; // Start Off by default
        this.overlay = null;
        this.cursor = null;
        
        // Physics
        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
        this.currentX = this.targetX;
        this.currentY = this.targetY;
        this.velX = 0;
        this.velY = 0;
        
        // Config
        this.lerpFactor = 0.1; // Smoother/Quicker than Ruins
        
        // Init
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.createOverlay();
        this.createCursor();
        this.createToggle();
        this.bindEvents();
        this.loop();
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'index-darkness';
        document.body.appendChild(this.overlay);
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'tech-orb-cursor';
        document.body.appendChild(this.cursor);
    }
    
    createToggle() {
        const btn = document.createElement('button');
        btn.className = 'index-light-toggle';
        btn.innerHTML = '<ion-icon name="flashlight-outline"></ion-icon>';
        btn.setAttribute('aria-label', 'Activar Luz');
        btn.onclick = () => this.toggle();
        document.body.appendChild(btn);
        this.toggleBtn = btn;
    }
    
    toggle() {
        this.isActive = !this.isActive;
        document.body.classList.toggle('flashlight-on', this.isActive);
        this.toggleBtn.classList.toggle('active', this.isActive);
        
        // Reset positions
        if (this.isActive) {
            this.currentX = this.targetX;
            this.currentY = this.targetY;
        }
    }
    
    bindEvents() {
        const onMove = (x, y) => {
            if (!this.isActive) return;
            this.targetX = x;
            this.targetY = y;
        };

        window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
        
        // Mobile touch
        window.addEventListener('touchmove', e => {
            if (!this.isActive) return;
            // e.preventDefault(); // Don't block scroll on index
            const t = e.touches[0];
            onMove(t.clientX, t.clientY);
        }, { passive: true });
    }
    
    loop() {
        if (this.isActive) {
            // physics
            const lastX = this.currentX;
            const lastY = this.currentY;
            
            this.currentX += (this.targetX - this.currentX) * this.lerpFactor;
            this.currentY += (this.targetY - this.currentY) * this.lerpFactor;
            
            this.velX = this.currentX - lastX;
            this.velY = this.currentY - lastY;
            
            // Render CSS Vars
            const root = document.documentElement;
            root.style.setProperty('--cursor-x', `${this.currentX}px`);
            root.style.setProperty('--cursor-y', `${this.currentY}px`);
            
            if (this.cursor) {
                this.cursor.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
            }
            
            // Particles
            // Spawn based on speed
            const speed = Math.sqrt(this.velX**2 + this.velY**2);
            if (speed > 2 || Math.random() < 0.05) {
                this.spawnParticle(speed);
            }
        }
        
        requestAnimationFrame(() => this.loop());
    }
    
    spawnParticle(speed) {
        // Optimized: Only spawn if visible and not too many
        if (document.querySelectorAll('.tech-particle').length > 30) return;
        
        const p = document.createElement('div');
        p.className = 'tech-particle';
        
        // Random Type
        const r = Math.random();
        if (r > 0.6) p.classList.add('gold');
        else if (r > 0.3) p.classList.add('cyan');
        
        // Spawn near cursor
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        
        p.style.left = `${this.currentX + offsetX}px`;
        p.style.top = `${this.currentY + offsetY}px`;
        
        // Fly away from movement (trail)
        const dx = -this.velX * 2 + (Math.random() - 0.5) * 20;
        const dy = -this.velY * 2 + (Math.random() - 0.5) * 20;
        
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        
        document.body.appendChild(p);
        
        // Cleanup - Strict
        setTimeout(() => p.remove(), 1000);
    }
}

// Start
new IndexFlashlight();
