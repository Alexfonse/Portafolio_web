// ========================================
// SPOTLIGHT V2: MAGICAL INTERACTIVITY
// Gyroscope, Physics & Flash Effects
// ========================================

class SpotlightGallery {
    constructor(gallerySelector = '.masonry-grid') {
        this.gallery = document.querySelector(gallerySelector);
        if (!this.gallery) return;
        
        // State
        this.isActive = false;
        this.isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Physics
        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
        this.currentX = this.targetX;
        this.currentY = this.targetY;
        
        // Gyroscope State
        this.tiltX = 0;
        this.tiltY = 0;
        
        this.init();
    }
    
    init() {
        // Initialize DOM Elements
        this.createSpotlightElements();
        this.createToggleButton();
        
        // Bind Events
        this.bindEvents();
        
        // Start Render Loop
        this.render();
    }
    
    createSpotlightElements() {
        // Beam Container
        this.spotlightBeam = document.createElement('div');
        this.spotlightBeam.className = 'spotlight-beam';
        
        // Core Light (The glowing orb)
        this.flashCore = document.createElement('div');
        this.flashCore.className = 'flash-core';
        this.spotlightBeam.appendChild(this.flashCore);
        
        // Mobile Flashlight Icon Cursor
        if (this.isMobile) {
            this.flashlightCursor = document.createElement('div');
            this.flashlightCursor.className = 'flashlight-cursor';
            this.flashlightCursor.innerHTML = '🔦'; // Emoji fallback
            document.body.appendChild(this.flashlightCursor);
        }
        
        document.body.appendChild(this.spotlightBeam);
    }
    
    createToggleButton() {
        // Check if button already exists (to prevent duplicates)
        if (document.querySelector('.spotlight-toggle')) return;

        const button = document.createElement('button');
        button.className = 'spotlight-toggle';
        button.setAttribute('aria-label', 'Toggle magic flashlight');
        button.innerHTML = '<ion-icon name="flashlight-outline"></ion-icon>';
        
        button.addEventListener('click', () => this.toggle());
        
        document.body.appendChild(button);
        this.toggleButton = button;
    }
    
    bindEvents() {
        // Desktop / Basic Mouse
        document.addEventListener('mousemove', (e) => {
            if (!this.isActive) return;
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            
            // Spawn fireflies occasionally
            if (this.isActive && Math.random() > 0.9) {
                this.spawnFirefly(e.clientX, e.clientY);
            }
        });
        
        // Touch Move (Manual Drag)
        document.addEventListener('touchmove', (e) => {
            if (!this.isActive || !e.touches[0]) return;
            e.preventDefault(); // Prevent scrolling while using flashlight
            this.targetX = e.touches[0].clientX;
            this.targetY = e.touches[0].clientY;
        }, { passive: false });
        
        // Gyroscope (Mobile Magic)
        if (window.DeviceOrientationEvent && this.isMobile) {
            window.addEventListener('deviceorientation', (e) => this.handleGyroscope(e));
        }
    }
    
    handleGyroscope(e) {
        if (!this.isActive) return;
        
        const beta = e.beta || 0; // Tilt Front/Back
        const gamma = e.gamma || 0; // Tilt Left/Right
        
        // Calibrate center (approximate holding angle)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Sensitivity multiplier
        const sensitivity = 15;
        
        this.targetX = centerX + (gamma * sensitivity);
        this.targetY = centerY + ((beta - 45) * sensitivity);
    }
    
    triggerFlash(x, y) {
        // Visual flash effect on the core
        this.flashCore.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.flashCore.style.filter = 'brightness(2)';
        
        // Spawn burst of fireflies
        for(let i=0; i<5; i++) this.spawnFirefly(x, y);
        
        setTimeout(() => {
            this.flashCore.style.transform = '';
            this.flashCore.style.filter = '';
        }, 150);
    }
    
    spawnFirefly(x, y) {
        if (!this.spotlightBeam) return;
        
        const p = document.createElement('div');
        p.className = 'magic-particle';
        
        // Random properties for Firefly behavior
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        
        p.style.setProperty('--x', (x + offsetX) + 'px');
        p.style.setProperty('--y', (y + offsetY) + 'px');
        
        // Drift direction
        const tx = (Math.random() - 0.5) * 50;
        const ty = (Math.random() - 0.5) * 50 - 20; // Slight upward drift
        
        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        
        // Firefly Colors (Yellow/Green/Gold)
        const colors = ['#fcd34d', '#bef264', '#10b981']; 
        p.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        p.style.setProperty('--size', (Math.random() * 3 + 2) + 'px');
        p.style.setProperty('--duration', (Math.random() * 1 + 1) + 's');
        
        this.spotlightBeam.appendChild(p);
        
        // Cleanup
        setTimeout(() => p.remove(), 2000);
    }
    
    render() {
        if (this.isActive) {
            // Smooth LERP movement
            this.currentX += (this.targetX - this.currentX) * 0.1;
            this.currentY += (this.targetY - this.currentY) * 0.1;
            
            // Update Spotlight Position CSS
            this.gallery.style.setProperty('--spotlight-x', `${this.currentX}px`);
            this.gallery.style.setProperty('--spotlight-y', `${this.currentY}px`);
            
            // Update Mobile Cursor Icon Position
            if (this.flashlightCursor) {
                this.flashlightCursor.style.left = `${this.currentX}px`;
                this.flashlightCursor.style.top = `${this.currentY}px`;
                
                // Rotate based on movement (simulated angling)
                const rotate = -45 + (this.targetX - this.currentX) * 0.2;
                this.flashlightCursor.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
            }
        }
        
        requestAnimationFrame(() => this.render());
    }
    
    toggle() {
        this.isActive = !this.isActive;
        
        this.gallery.classList.toggle('spotlight-off', !this.isActive);
        
        if (this.toggleButton) {
            this.toggleButton.classList.toggle('active', this.isActive);
            const icon = this.toggleButton.querySelector('ion-icon');
            if (icon) icon.name = this.isActive ? 'flashlight' : 'flashlight-outline';
        }

        if (this.flashlightCursor) {
            this.flashlightCursor.classList.toggle('active', this.isActive);
        }
        
        if (this.isActive) {
            // Request Gyroscope Permission (iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission().catch(console.error);
            }
            this.triggerFlash(this.currentX, this.currentY);
        }
    }
}

// Initialize safely
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SpotlightGallery());
} else {
    new SpotlightGallery();
}
