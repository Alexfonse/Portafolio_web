// ========================================
// 🔦 RUINS EXPLORER: FLASHLIGHT SYSTEM (V2: PHYSICS)
// Includes Inertia (LERP), Pendulum Swing, and Dynamic Particles
// ========================================

class FlashlightSystem {
    constructor() {
        this.isActive = false;
        this.overlay = null;
        this.cursor = null;
        
        // Physics State
        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
        this.currentX = this.targetX;
        this.currentY = this.targetY;
        
        this.velX = 0;
        this.velY = 0;
        this.rotation = 0;
        
        // Settings
        this.lerpFactor = 0.08; // Lower = "Heavier" lantern
        this.maxRotation = 25; // Degrees
        this.sizes = {
            desktop: 350,
            mobile: 280
        };
        
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
        this.createToggleButton();
        this.createOnboardingHint();
        this.bindEvents();
        this.render();
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'arcane-darkness';
        document.body.appendChild(this.overlay);
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'vintage-lantern';
        
        // Lantern SVG
        this.cursor.innerHTML = `
            <svg viewBox="0 0 100 150" class="lantern-svg">
                <path d="M35,10 Q50,-10 65,10" fill="none" stroke="#d4a373" stroke-width="4" />
                <rect x="30" y="10" width="40" height="15" rx="2" fill="#4a4036" />
                <path d="M25,25 L75,25 L85,110 L15,110 Z" fill="rgba(255, 230, 100, 0.1)" stroke="#5c4d3c" stroke-width="3" />
                <circle cx="50" cy="70" r="15" fill="#fcd34d" class="lantern-flame">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <rect x="20" y="110" width="60" height="10" rx="2" fill="#3e362e" />
            </svg>
            <div class="lantern-glow"></div>
        `;
        
        document.body.appendChild(this.cursor);
    }
    
    createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'lantern-toggle';
        btn.innerHTML = `
            <span class="toggle-icon">🔦</span>
            <span class="toggle-text">EXPLORAR</span>
        `;
        btn.onclick = () => this.toggle();
        document.body.appendChild(btn);
        this.toggleBtn = btn;
    }

    createOnboardingHint() {
        const hint = document.createElement('div');
        hint.className = 'flashlight-hint';
        hint.innerHTML = `
            <span class="hint-icon">✨</span>
            <span class="hint-text">Descubre los secretos en la oscuridad...</span>
        `;
        document.body.appendChild(hint);
        
        // Remove after 6 seconds
        setTimeout(() => {
            hint.classList.add('fade-out');
            setTimeout(() => hint.remove(), 500); // Wait for animation
        }, 6000);
    }
    


    bindEvents() {
        const updateTarget = (x, y) => {
            if (!this.isActive) return;
            this.targetX = x;
            this.targetY = y;
        };

        window.addEventListener('mousemove', e => updateTarget(e.clientX, e.clientY));
        
        window.addEventListener('touchmove', e => {
            if (!this.isActive) return;
            // e.preventDefault(); // Optional: lock scroll
            const touch = e.touches[0];
            updateTarget(touch.clientX, touch.clientY);
        }, { passive: false });
        
        window.addEventListener('touchstart', e => {
             if (this.isActive && e.target !== this.toggleBtn && !this.toggleBtn.contains(e.target)) {
                 const touch = e.touches[0];
                 updateTarget(touch.clientX, touch.clientY);
             }
        }, { passive: false });
    }
    
    toggle() {
        this.isActive = !this.isActive;
        document.body.classList.toggle('lantern-mode', this.isActive);
        this.toggleBtn.classList.toggle('active', this.isActive);
        this.toggleBtn.querySelector('.toggle-text').innerText = this.isActive ? 'SALIR' : 'EXPLORAR';
        
        if (this.isActive) {
            // Reset position to center on enable
            this.targetX = window.innerWidth / 2;
            this.targetY = window.innerHeight / 2;
            this.currentX = this.targetX;
            this.currentY = this.targetY;
        }
    }
    
    render() {
        if (this.isActive && this.cursor) {
            // 1. Physics: LERP (Inertia)
            // Move current towards target smoothly
            const lastX = this.currentX;
            const lastY = this.currentY;
            
            this.currentX += (this.targetX - this.currentX) * this.lerpFactor;
            this.currentY += (this.targetY - this.currentY) * this.lerpFactor;
            
            // 2. Physics: Velocity Calculation
            this.velX = this.currentX - lastX;
            this.velY = this.currentY - lastY;
            
            // 3. Physics: Pendulum Swing
            // Rotate based on horizontal movement (moving right -> swings left/ccw)
            // Multiplier determines "looseness" of the handle
            const targetRotation = -this.velX * 1.5; 
            
            // Smooth out the rotation too
            this.rotation += (targetRotation - this.rotation) * 0.1;
            
            // Clamp rotation
            this.rotation = Math.max(-this.maxRotation, Math.min(this.maxRotation, this.rotation));
            
            // 4. Update DOM
            const radius = window.innerWidth < 768 ? this.sizes.mobile : this.sizes.desktop;
            
            // Mask Position (Follows interpolated position)
            document.documentElement.style.setProperty('--cursor-x', `${this.currentX}px`);
            document.documentElement.style.setProperty('--cursor-y', `${this.currentY}px`);
            document.documentElement.style.setProperty('--light-radius', `${radius}px`);
            
            // Transform: Translate + Swing Rotate
            this.cursor.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
            
            // 5. Dynamic Particles
            // Emit more when moving fast
            const speed = Math.sqrt(this.velX**2 + this.velY**2);
            if (speed > 1) {
                this.maybeSpawnFirefly(speed);
            } else {
                // Occasional ambient firefly
                this.maybeSpawnFirefly(0);
            }
        }
        
        requestAnimationFrame(() => this.render());
    }
    
    maybeSpawnFirefly(speed) {
        // Chance increases with speed
        // Base chance: 0.05 per frame
        // Speed bonus: up to 0.5
        const chance = 0.05 + (Math.min(speed, 20) / 40);
        
        if (Math.random() < chance) {
            const p = document.createElement('div');
            p.className = 'lantern-firefly';
            
            // Spawn point: slightly random around the lantern center
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            
            p.style.left = `${this.currentX + offsetX}px`;
            p.style.top = `${this.currentY + offsetY}px`;
            
            // Drift Logic: Opposite to movement (Inertia/Wind)
            // If moving Right (+VelX), particles drift Left (-Drift)
            const driftX = (Math.random() - 0.5) * 20 - (this.velX * 2); 
            const driftY = (Math.random() - 0.5) * 20 - (this.velY * 2) - 20; // Always slight float up
            
            p.style.setProperty('--drift-x', `${driftX}px`);
            p.style.setProperty('--drift-y', `${driftY}px`);
            
            // Random Color
            const colors = ['#bef264', '#fcd34d', '#10b981'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            
            document.body.appendChild(p);
            
            setTimeout(() => p.remove(), 1000);
        }
    }
}

new FlashlightSystem();
