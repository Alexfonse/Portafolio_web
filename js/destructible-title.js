// ========================================
// SPACE SHOOTER v5.0 - PORTFOLIO EDITION
// + Sound system with Web Audio API
// + Portfolio-themed intro & messages
// + Beautiful victory/defeat screens
// + Complete mobile optimization
// ========================================

// Sistema de Audio con Web Audio API
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volumeScale = 0.3; // Volume global
        
        // Lazy init del contexto (requiere interacción del usuario)
        document.addEventListener('click', () => this.init(), { once: true });
        document.addEventListener('touchstart', () => this.init(), { once: true });
    }
    
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    playShoot() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1 * this.volumeScale, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }
    
    playExplosion() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.2 * this.volumeScale, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }
    
    playDamage() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
        
        gain.gain.setValueAtTime(0.15 * this.volumeScale, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }
    
    playVictory() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        
        // Fanfare de victoria (3 notas ascendentes)
        [440, 554, 659].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const startTime = ctx.currentTime + i * 0.15;
            osc.frequency.setValueAtTime(freq, startTime);
            
            gain.gain.setValueAtTime(0.15 * this.volumeScale, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
            
            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    }
    
    playDefeat() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        
        // Sad trombone (3 notas descendentes)
        [330, 294, 220].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const startTime = ctx.currentTime + i * 0.2;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.9, startTime + 0.3);
            
            gain.gain.setValueAtTime(0.12 * this.volumeScale, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
            
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }
    
    playBossHit() {
        if (!this.enabled || !this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.18 * this.volumeScale, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    }
}

// Object Pool para projectiles (evita crear/destruir constantemente)
class ObjectPool {
    constructor(createFn, resetFn, size = 50) {
        this.objects = [];
        this.createFn = createFn;
        this.resetFn = resetFn;
        for (let i = 0; i < size; i++) {
            this.objects.push(createFn());
        }
    }
    
    get() {
        return this.objects.pop() || this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        if (this.objects.length < 100) this.objects.push(obj);
    }
}

class Projectile {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = -14;
        this.size = 18;
        this.skill = null;
        this.isActive = false;
        this.rotation = 0;
        this.glow = 0;
        this.fromHelp = false;
    }
    
    init(x, y, skill, fromHelp = false) {
        this.x = x;
        this.y = y;
        this.skill = skill;
        this.fromHelp = fromHelp;
        this.isActive = true;
        // Helper ships tienen proyectiles más grandes
        if (fromHelp) {
            this.vx = (Math.random() - 0.5) * 3;
            this.size = 35; // MÁS GRANDE
        }
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.3;
        this.glow = Math.sin(Date.now() / 100) * 6 + 10;
        if (this.y < -70 || this.y > window.innerHeight + 70) this.isActive = false;
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = this.skill.color;
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.skill.color;
        ctx.fillText(this.skill.icon, 0, 0);
        ctx.restore();
    }
}

class HelperShip {
    constructor(canvasWidth, canvasHeight, skill, side) {
        this.skill = skill;
        this.size = 32;
        this.shootTimer = 0;
        this.shootInterval = 25; // MENOS disparos (antes 10)
        
        if (side === 'left') {
            this.x = -40; this.y = canvasHeight * 0.3;
            this.vx = 2.5; this.vy = 1;
        } else if (side === 'right') {
            this.x = canvasWidth + 40; this.y = canvasHeight * 0.3;
            this.vx = -2.5; this.vy = 1;
        } else if (side === 'top-left') {
            this.x = canvasWidth * 0.2; this.y = -40;
            this.vx = 0.5; this.vy = 2.5;
        } else {
            this.x = canvasWidth * 0.8; this.y = -40;
            this.vx = -0.5; this.vy = 2.5;
        }
        
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.isActive = true;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 50) this.vx = Math.abs(this.vx);
        if (this.x > this.canvasWidth - 50) this.vx = -Math.abs(this.vx);
        if (this.y > this.canvasHeight * 0.5) this.vy = -Math.abs(this.vy) * 0.5;
        if (this.y < 50) this.vy = Math.abs(this.vy) * 0.5;
        
        this.shootTimer++;
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 14;
        ctx.shadowColor = this.skill.color;
        
        ctx.fillStyle = this.skill.color + '30';
        ctx.strokeStyle = this.skill.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.size/2);
        ctx.lineTo(-this.size/2.5, this.size/2);
        ctx.lineTo(this.size/2.5, this.size/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.font = `${this.size * 0.55}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.skill.color;
        ctx.fillText(this.skill.icon, 0, 0);
        ctx.restore();
    }
    
    canShoot() {
        if (this.shootTimer >= this.shootInterval) {
            this.shootTimer = 0;
            return true;
        }
        return false;
    }
}

// Boss Fireball - Proyectil letal del jefe
class BossFireball {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        
        // Calcular dirección hacia el jugador
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Velocidad reducida en móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const speed = isMobile ? 3.5 : 6; // MÁS LENTO en móvil
        
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        this.size = 25;
        this.isActive = true;
        this.glow = 0;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.glow = Math.sin(Date.now() / 80) * 10 + 20;
        
        // Desactivar si sale de pantalla
        if (this.x < -50 || this.x > window.innerWidth + 50 ||
            this.y < -50 || this.y > window.innerHeight + 50) {
            this.isActive = false;
        }
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Bola de fuego
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = '#FF0066';
        
        // Núcleo
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, '#FF0066');
        gradient.addColorStop(0.5, '#FF6B35');
        gradient.addColorStop(1, 'rgba(255, 0, 102, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Centro brillante
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    getBounds() {
        return {
            x: this.x - this.size,
            y: this.y - this.size,
            width: this.size * 2,
            height: this.size * 2
        };
    }
}

class Enemy {
    constructor(canvasWidth, type = 'normal') {
        this.type = type;
        this.x = Math.random() * (canvasWidth - 120) + 60;
        this.y = -60;
        this.width = type === 'boss' ? 130 : 34;
        this.height = type === 'boss' ? 110 : 34;
        this.vx = (Math.random() - 0.5) * (type === 'boss' ? 2 : 4.5);
        this.vy = type === 'boss' ? 1.3 : 3 + Math.random();
        this.health = type === 'boss' ? 8 : 2; // Boss MUY fácil
        this.maxHealth = this.health;
        this.isActive = true;
        this.color = type === 'boss' ? '#FF0066' : '#FF6B35';
        this.canvasWidth = canvasWidth;
        this.pulse = Math.random() * Math.PI * 2;
        this.shootTimer = 0;
        
        // Boss dispara MENOS en móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        this.shootInterval = type === 'boss' ? (isMobile ? 90 : 60) : 999;
        this.damage = type === 'boss' ? 30 : 10; // Daño físico al chocar
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.07;
        this.shootTimer++;
        
        if (this.x < this.width/2 || this.x > this.canvasWidth - this.width/2) {
            this.vx *= -1;
        }
        
        if (this.type === 'boss' && this.y > 130) this.vy = 0;
        if (this.y > window.innerHeight + 150) this.isActive = false;
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        const s = Math.sin(this.pulse) * 0.12 + 1;
        ctx.scale(s, s);
        
        if (this.type === 'boss') {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.width/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Hexágonos
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2.5;
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                const x1 = Math.cos(a) * 22;
                const y1 = Math.sin(a) * 22;
                const x2 = Math.cos(a + Math.PI / 3) * 22;
                const y2 = Math.sin(a + Math.PI / 3) * 22;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            
            // Ojos
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(-16, -10, 7, 0, Math.PI * 2);
            ctx.arc(16, -10, 7, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(-16, -10, 3, 0, Math.PI * 2);
            ctx.arc(16, -10, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // HP
            const bw = 90, bh = 6;
            const hp = this.health / this.maxHealth;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(-bw/2, this.height/2 + 8, bw, bh);
            ctx.fillStyle = hp > 0.5 ? '#00FF88' : hp > 0.25 ? '#FFD700' : '#FF0066';
            ctx.fillRect(-bw/2, this.height/2 + 8, bw * hp, bh);
            
            ctx.font = 'bold 9px "Cinzel"';
            ctx.fillStyle = '#FFD700';
            ctx.textAlign = 'center';
            ctx.fillText('BOSS', 0, this.height/2 + 24);
        } else {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 9;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.moveTo(0, -this.height/2);
            ctx.lineTo(this.width/2, 0);
            ctx.lineTo(0, this.height/2);
            ctx.lineTo(-this.width/2, 0);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
    
    hit() {
        this.health--;
        return this.health <= 0;
    }
    
    canShoot() {
        if (this.type === 'boss' && this.shootTimer >= this.shootInterval) {
            this.shootTimer = 0;
            return true;
        }
        return false;
    }
    
    getBounds() {
        return {
            x: this.x - this.width/2,
            y: this.y - this.height/2,
            width: this.width,
            height: this.height
        };
    }
}

class Spaceship {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 80;
        this.width = 48;
        this.height = 68;
        this.speed = 11;
        this.maxHealth = 100;
        this.health = 100;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.keys = { left: false, right: false, up: false, down: false };
        
        // Cooldown aumentado en móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        this.shootCooldown = isMobile ? 250 : 150; // MÁS LENTO en móvil
        this.lastShootTime = 0;
        this.canShootTime = 0; // Tiempo cuando puede empezar a disparar
        this.trail = [];
        this.tilt = 0; // Para animación
        this.invincible = false; // Invencibilidad temporal después de daño
        this.invincibleTimer = 0;
    }
    
    update() {
        let vx = 0, vy = 0;
        if (this.keys.left) vx = -this.speed;
        if (this.keys.right) vx = this.speed;
        if (this.keys.up) vy = -this.speed;
        if (this.keys.down) vy = this.speed;
        
        // Tilt animación
        if (vx < 0) this.tilt = Math.max(this.tilt - 0.1, -0.2);
        else if (vx > 0) this.tilt = Math.min(this.tilt + 0.1, 0.2);
        else this.tilt *= 0.9;
        
        this.x = Math.max(this.width/2, Math.min(this.canvasWidth - this.width/2, this.x + vx));
        this.y = Math.max(this.height/2, Math.min(this.canvasHeight - this.height/2, this.y + vy));
        
        if (vx !== 0 || vy !== 0) {
            this.trail.push({ x: this.x, y: this.y + this.height/2 });
            if (this.trail.length > 7) this.trail.shift();
        }
        
        // Invencibilidad
        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) this.invincible = false;
        }
    }
    
    render(ctx) {
        // Trail
        this.trail.forEach((p, i) => {
            const a = i / this.trail.length;
            ctx.fillStyle = `rgba(0, 255, 136, ${a * 0.6})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * a, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.tilt);
        
        // Parpadeo si invencible
        if (!this.invincible || Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.shadowBlur = 16;
            ctx.shadowColor = '#00FF88';
            
            ctx.fillStyle = '#10B981';
            ctx.beginPath();
            ctx.moveTo(0, -this.height/2);
            ctx.lineTo(-this.width/2, this.height/2);
            ctx.lineTo(this.width/2, this.height/2);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2.2;
            ctx.stroke();
            
            ctx.fillStyle = '#00FF88';
            ctx.beginPath();
            ctx.arc(0, -5, 9, 0, Math.PI * 2);
            ctx.fill();
            
            // Alas
            ctx.fillStyle = '#059669';
            [[-1, 1]].forEach(([dx]) => {
                ctx.beginPath();
                ctx.moveTo(dx * this.width/2, this.height/4);
                ctx.lineTo(dx * (this.width/2 + 13), this.height/2);
                ctx.lineTo(dx * this.width/2, this.height/2);
                ctx.closePath();
                ctx.fill();
            });
        }
        
        ctx.restore();
    }
    
    shoot() {
        const now = Date.now();
        // Verificar delay de 2 segundos
        if (now < this.canShootTime) return false;
        
        if (now - this.lastShootTime > this.shootCooldown) {
            this.lastShootTime = now;
            return true;
        }
        return false; // Cooldown activo
    }
    
    takeDamage(amount) {
        if (this.invincible) return false;
        
        this.health = Math.max(0, this.health - amount);
        this.invincible = true;
        this.invincibleTimer = 45; // ~0.75s de invencibilidad
        
        return this.health <= 0;
    }
    
    getBounds() {
        return {
            x: this.x - this.width/2,
            y: this.y - this.height/2,
            width: this.width,
            height: this.height
        };
    }
}

class Fragment {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.color = color;
        this.alpha = 1;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.isExploding = false;
        this.isDestroyed = false;
    }
    
    update(dt) {
        if (this.isDestroyed || !this.isExploding) return;
        this.vy += 0.5 * dt;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rotation += this.rotationSpeed * dt;
        if (this.y > window.innerHeight + 100) {
            this.alpha -= 0.045;
            if (this.alpha <= 0) this.isDestroyed = true;
        }
    }
    
    render(ctx) {
        if (this.isDestroyed) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
    
    explode(fx, fy) {
        this.isExploding = true;
        this.vx = fx;
        this.vy = fy;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
    }
    
    getBounds() {
        return {
            x: this.x - this.size/2,
            y: this.y - this.size/2,
            width: this.size,
            height: this.size
        };
    }
}

// Virtual Joystick para móvil
class VirtualJoystick {
    constructor(canvas) {
        this.canvas = canvas;
        this.active = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.maxRadius = 60;
    }
    
    start(x, y) {
        this.active = true;
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
    }
    
    move(x, y) {
        this.currentX = x;
        this.currentY = y;
    }
    
    end() {
        this.active = false;
    }
    
    getDirection() {
        if (!this.active) return { x: 0, y: 0 };
        
        const dx = this.currentX - this.startX;
        const dy = this.currentY - this.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > this.maxRadius) {
            return {
                x: (dx / distance) * this.maxRadius / this.maxRadius,
                y: (dy / distance) * this.maxRadius / this.maxRadius
            };
        }
        
        return {
            x: dx / this.maxRadius,
            y: dy / this.maxRadius
        };
    }
    
    render(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.globalAlpha = 0.6;
        
        // Base
        ctx.fillStyle = '#00FF88';
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.startX, this.startY, this.maxRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Stick
        const dx = this.currentX - this.startX;
        const dy = this.currentY - this.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const limitedDistance = Math.min(distance, this.maxRadius);
        const angle = Math.atan2(dy, dx);
        const stickX = this.startX + Math.cos(angle) * limitedDistance;
        const stickY = this.startY + Math.sin(angle) * limitedDistance;
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(stickX, stickY, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class SpaceShooterGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.spaceship = null;
        this.fragments = [];
        this.particles = [];
        this.enemies = [];
        this.helperShips = [];
        this.bossFireballs = []; // Proyectiles del boss
        this.joystick = null;
        
        this.progress = 0;
        this.bossDefeated = false; // Nueva condición de victoria
        this.score = 0;
        this.completed = false;
        this.gameOver = false;
        this.lastTime = 0;
        this.startTime = 0;
        this.gameStartTime = 0; // Tiempo real de inicio del juego (después de countdown)
        this.animationId = null;
        
        // Sistema de intro
        this.introActive = true;
        this.introPhase = 'ship-entry'; // ship-entry, countdown, ready
        this.introStartTime = 0;
        this.countdownNumber = 3;
        
        this.enemyTimer = 0;
        this.enemyInterval = 65;
        this.bossSpawned = false;
        
        this.helpActivated = false;
        
        // Object pool
        this.projectilePool = new ObjectPool(
            () => new Projectile(),
            (p) => p.reset(),
            50
        );
        this.activeProjectiles = [];
        
        this.skills = [
            { color: "#00FF88", icon: "💻" },
            { color: "#FFD700", icon: "🎨" },
            { color: "#31A8FF", icon: "🖼️" },
            { color: "#FF9A00", icon: "✏️" },
            { color: "#9999FF", icon: "🎬" },
            { color: "#F7DF1E", icon: "⚡" },
            { color: "#264DE4", icon: "🎨" },
            { color: "#E34F26", icon: "📄" }
        ];
        
        this.currentSkillIndex = 0;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        this.config = {
            text: "ALEXANDER FONSECA",
            textLine1: "ALEXANDER", // Primera línea en móvil
            textLine2: "FONSECA",    // Segunda línea en móvil
            fontFamily: "Arial", // Fuente más clara y legible
            fontSize: 100,
            fragmentSize: 12,
            fontWeight: "900" // Extra bold para mejor visibilidad
        };
        
        this.maxProjectiles = 10; // LÍMITE de proyectiles
        
        // Sistema de sonido
        this.sound = new SoundSystem();
    }
    
    init() {
        this.createCanvas();
        this.createFragments();
        this.createSpaceship();
        this.createUI();
        this.setupEvents();
        
        if (this.isMobile) {
            this.joystick = new VirtualJoystick(this.canvas);
        }
        
        this.startTime = Date.now();
        this.introStartTime = Date.now();
        this.gameLoop();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'space-shooter-canvas';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
    }
    
    createSpaceship() {
        this.spaceship = new Spaceship(this.canvas.width, this.canvas.height);
        // Configurar tiempo de delay de disparo (2 segundos)
        this.spaceship.canShootTime = Date.now() + 2000;
    }
    
    createFragments() {
        const temp = document.createElement('canvas');
        const tctx = temp.getContext('2d');
        
        let fs = this.config.fontSize;
        let fragSize = this.config.fragmentSize;
        let textToRender = this.config.text;
        
        // CRÍTICO: En móvil, dividir en DOS LÍNEAS
        if (window.innerWidth < 480) {
            fs = 48; // Tamaño del canvas
            fragSize = 3; // Fragmentos PEQUEÑOS para más detalle
            // Renderizar en dos líneas
            this.createFragmentsMultiline(temp, tctx, fs, fragSize);
            return;
        } else if (window.innerWidth < 768) {
            fs = 70;
            fragSize = 5;
        } else if (window.innerWidth < 1024) {
            fs = 85;
            fragSize = 7;
        }
        
        // RENDERIZADO DE ALTA CALIDAD
        tctx.font = `${this.config.fontWeight} ${fs}px ${this.config.fontFamily}`;
        const tm = tctx.measureText(this.config.text);
        temp.width = Math.min(tm.width + 100, window.innerWidth - 30); // MAX width con padding
        temp.height = fs * 1.3 + 100;
        
        // Configuración para texto NÍTIDO
        tctx.font = `${this.config.fontWeight} ${fs}px ${this.config.fontFamily}`;
        tctx.fillStyle = '#FFD700';
        tctx.textAlign = 'center';
        tctx.textBaseline = 'middle';
        tctx.imageSmoothingEnabled = true;
        tctx.imageSmoothingQuality = 'high';
        tctx.fillText(this.config.text, temp.width/2, temp.height/2);
        
        const imgData = tctx.getImageData(0, 0, temp.width, temp.height);
        const px = imgData.data;
        
        for (let y = 0; y < temp.height; y += fragSize) {
            for (let x = 0; x < temp.width; x += fragSize) {
                const i = (y * temp.width + x) * 4;
                if (px[i + 3] > 128) {
                    const color = `rgba(${px[i]}, ${px[i+1]}, ${px[i+2]}, 1)`;
                    const fx = this.canvas.width/2 - temp.width/2 + x;
                    const fy = 90 + y;
                    
                    // Verificar que esté dentro de la pantalla
                    if (fx >= 0 && fx <= this.canvas.width && fy >= 0 && fy <= this.canvas.height * 0.6) {
                        this.fragments.push(new Fragment(fx, fy, fragSize, color));
                    }
                }
            }
        }
    }
    
    // Función especial para renderizar texto en dos líneas (móvil)
    createFragmentsMultiline(temp, tctx, fs, fragSize) {
        const line1 = this.config.textLine1; // "ALEXANDER"
        const line2 = this.config.textLine2; // "FONSECA"
        
        // Configuración para texto NÍTIDO
        tctx.font = `${this.config.fontWeight} ${fs}px ${this.config.fontFamily}`;
        const tm1 = tctx.measureText(line1);
        const tm2 = tctx.measureText(line2);
        
        const maxWidth = Math.max(tm1.width, tm2.width);
        temp.width = Math.min(maxWidth + 60, window.innerWidth - 20);
        temp.height = fs * 2.8; // Espacio para DOS líneas
        
        tctx.font = `${this.config.fontWeight} ${fs}px ${this.config.fontFamily}`;
        tctx.fillStyle = '#FFD700';
        tctx.textAlign = 'center';
        tctx.textBaseline = 'middle';
        tctx.imageSmoothingEnabled = true;
        tctx.imageSmoothingQuality = 'high';
        
        // Renderizar línea 1 (arriba)
        tctx.fillText(line1, temp.width/2, fs * 0.7);
        // Renderizar línea 2 (abajo)
        tctx.fillText(line2, temp.width/2, fs * 1.8);
        
        const imgData = tctx.getImageData(0, 0, temp.width, temp.height);
        const data = imgData.data;
        
        const startX = (window.innerWidth - temp.width) / 2;
        const startY = 60; // Top position
        
        for (let y = 0; y < temp.height; y += fragSize) {
            for (let x = 0; x < temp.width; x += fragSize) {
                const i = (y * temp.width + x) * 4;
                const alpha = data[i + 3];
                
                if (alpha > 50) {
                    const boundedX = Math.max(fragSize, Math.min(window.innerWidth - fragSize, startX + x));
                    const boundedY = Math.max(fragSize, Math.min(200, startY + y));
                    
                    this.fragments.push(new Fragment(
                        boundedX,
                        boundedY,
                        fragSize,
                        '#FFD700'
                    ));
                }
            }
        }
    }
    
    createUI() {
        const ui = document.createElement('div');
        ui.id = 'space-shooter-ui';
        ui.innerHTML = `
            <div class="game-hud">
                <div class="health-display">
                    <div class="health-bar-container">
                        <div id="health-bar" class="health-bar" style="width: 100%"></div>
                    </div>
                    <span id="health-value" class="health-value">100</span>
                </div>
                <div class="score-display">
                    <span class="score-label">PUNTAJE:</span>
                    <span id="score-value" class="score-value">0</span>
                </div>
            </div>
            <div class="controls-hint">WASD / Flechas / Táctil - Mover | ESPACIO / CLICK - Disparar</div>
            <div class="progress-container">
                <div id="destruction-progress" class="progress-bar">0%</div>
            </div>
            <div id="victory-screen" class="victory-screen" style="display:none;">
                <div class="victory-content">
                    <h1 class="victory-title">¡VICTORIA!</h1>
                    <p class="victory-score">Puntaje Final: <span id="final-score">0</span></p>
                    <p class="victory-message">Has demostrado tus habilidades</p>
                </div>
            </div>
            <div id="gameover-screen" class="gameover-screen" style="display:none;">
                <div class="gameover-content">
                    <h1 class="gameover-title">GAME OVER</h1>
                    <p class="gameover-score">Puntaje: <span id="gameover-score-value">0</span></p>
                </div>
            </div>
        `;
        document.body.appendChild(ui);
    }
    
    setupEvents() {
        const keyDown = (e) => {
            const k = e.key.toLowerCase();
            if (k === 'w' || k === 'arrowup') this.spaceship.keys.up = true;
            if (k === 's' || k === 'arrowdown') this.spaceship.keys.down = true;
            if (k === 'a' || k === 'arrowleft') this.spaceship.keys.left = true;
            if (k === 'd' || k === 'arrowright') this.spaceship.keys.right = true;
            if (k === ' ') {
                this.shoot();
                e.preventDefault();
            }
        };
        
        const keyUp = (e) => {
            const k = e.key.toLowerCase();
            if (k === 'w' || k === 'arrowup') this.spaceship.keys.up = false;
            if (k === 's' || k === 'arrowdown') this.spaceship.keys.down = false;
            if (k === 'a' || k === 'arrowleft') this.spaceship.keys.left = false;
            if (k === 'd' || k === 'arrowright') this.spaceship.keys.right = false;
        };
        
        const mouseDown = (e) => this.shoot();
        
        const touchStart = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            // Si toca en la mitad inferior izquierda, activa joystick
            if (y > this.canvas.height / 2) {
                if (this.joystick) this.joystick.start(x, y);
            } else {
                // Si toca arriba, dispara
                this.shoot();
            }
        };
        
        const touchMove = (e) => {
            e.preventDefault();
            if (this.joystick && this.joystick.active) {
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                this.joystick.move(x, y);
            }
        };
        
        const touchEnd = (e) => {
            e.preventDefault();
            if (this.joystick) this.joystick.end();
        };
        
        this.keyDownHandler = keyDown;
        this.keyUpHandler = keyUp;
        this.mouseHandler = mouseDown;
        this.touchStartHandler = touchStart;
        this.touchMoveHandler = touchMove;
        this.touchEndHandler = touchEnd;
        
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
        this.canvas.addEventListener('mousedown', this.mouseHandler);
        this.canvas.addEventListener('touchstart', this.touchStartHandler, { passive: false });
        this.canvas.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
        this.canvas.addEventListener('touchend', this.touchEndHandler, { passive: false });
    }
    
    shoot() {
        if (this.spaceship.shoot()) {
            const skill = this.skills[this.currentSkillIndex];
            this.currentSkillIndex = (this.currentSkillIndex + 1) % this.skills.length;
            
            const p = this.projectilePool.get();
            p.init(this.spaceship.x, this.spaceship.y - this.spaceship.height/2, skill, false);
            this.activeProjectiles.push(p);
            
            // SONIDO de disparo
            this.sound.playShoot();
            
            // LÍMITE: Si supera maxProjectiles, eliminar el primero
            if (this.activeProjectiles.length > this.maxProjectiles) {
                const removed = this.activeProjectiles.shift();
                this.projectilePool.release(removed);
            }
        }
    }
    
    spawnEnemy() {
        this.enemyTimer++;
        
        // Boss aparece al 40% de progreso
        if (this.progress >= 40 && !this.bossSpawned) {
            this.enemies.push(new Enemy(this.canvas.width, 'boss'));
            this.bossSpawned = true;
        }
        
        if (this.enemyTimer >= this.enemyInterval && this.enemies.length < 5) {
            this.enemies.push(new Enemy(this.canvas.width, 'normal'));
            this.enemyTimer = 0;
        }
    }
    
    activateHelp() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        
        if (!this.helpActivated && elapsed > 35) {
            this.helpActivated = true;
            const sides = ['left', 'right', 'top-left', 'top-right'];
            sides.forEach((side, i) => {
                const skill = this.skills[i % this.skills.length];
                this.helperShips.push(new HelperShip(this.canvas.width, this.canvas.height, skill, side));
            });
        }
    }
    
    updateHelperShips() {
        this.helperShips.forEach(ship => {
            ship.update();
            if (ship.canShoot()) {
                const p = this.projectilePool.get();
                p.init(ship.x, ship.y, ship.skill, true);
                this.activeProjectiles.push(p);
            }
        });
    }
    
    // Optimización: AABB collision (mucho más rápido que círculo)
    checkAABBCollision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
    
    checkCollisions() {
        // Projectiles vs Fragments (solo activos)
        this.activeProjectiles.forEach(p => {
            if (!p.isActive) return;
            
            const pBounds = { x: p.x - 15, y: p.y - 15, width: 30, height: 30 };
            
            this.fragments.forEach(f => {
                if (f.isDestroyed || f.isExploding) return;
                
                if (this.checkAABBCollision(pBounds, f.getBounds())) {
                    p.isActive = false;
                    this.explodeArea(p.x, p.y, 60);
                    if (!p.fromHelp) this.addScore(10);
                }
            });
            
            // vs Enemies
            this.enemies.forEach(e => {
                if (!e.isActive) return;
                
                if (this.checkAABBCollision(pBounds, e.getBounds())) {
                    p.isActive = false;
                    if (e.hit()) {
                        const pts = e.type === 'boss' ? 250 : 25;
                        if (!p.fromHelp) this.addScore(pts);
                        this.createParticles(e.x, e.y, e.type === 'boss' ? 18 : 7);
                        e.isActive = false;
                        
                        // Si es el boss, marcar como derrotado
                        if (e.type === 'boss') {
                            this.bossDefeated = true;
                        }
                    }
                }
            });
        });
        
        // Enemies vs Spaceship (DAÑO AL JUGADOR)
        const shipBounds = this.spaceship.getBounds();
        this.enemies.forEach(e => {
            if (!e.isActive) return;
            
            if (this.checkAABBCollision(shipBounds, e.getBounds())) {
                // Boss NO muere al chocar, solo hace daño
                if (e.type !== 'boss') {
                    e.isActive = false; // Enemigos normales mueren
                    this.createParticles(e.x, e.y, 10);
                }
                
                const dead = this.spaceship.takeDamage(e.damage);
                if (dead) {
                    this.triggerGameOver();
                } else {
                    this.updateHealthBar();
                }
            }
        });
        
        // Boss Fireballs vs Spaceship (MUERTE INSTANTÁNEA)
        this.bossFireballs.forEach(fb => {
            if (!fb.isActive) return;
            
            if (this.checkAABBCollision(shipBounds, fb.getBounds())) {
                fb.isActive = false;
                this.createParticles(fb.x, fb.y, 15);
                
                // Bola de fuego mata instantáneamente
                this.spaceship.health = 0;
                this.triggerGameOver();
            }
        });
        
        // Cleanup pool
        this.activeProjectiles = this.activeProjectiles.filter(p => {
            if (p.isActive) return true;
            this.projectilePool.release(p);
            return false;
        });
        
        this.enemies = this.enemies.filter(e => e.isActive);
        this.bossFireballs = this.bossFireballs.filter(fb => fb.isActive);
    }
    
    explodeArea(x, y, r) {
        let count = 0;
        this.fragments.forEach(f => {
            if (f.isDestroyed || f.isExploding) return;
            const dx = f.x - x, dy = f.y - y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d < r) {
                const a = Math.atan2(dy, dx);
                const force = 20 * (1 - d/r);
                f.explode(
                    Math.cos(a) * force + (Math.random()-0.5)*5,
                    Math.sin(a) * force + (Math.random()-0.5)*5
                );
                count++;
            }
        });
        if (count > 0) {
            this.createParticles(x, y, Math.min(count, 8));
            this.calcProgress();
        }
    }
    
    createParticles(x, y, n) {
        for (let i = 0; i < n * 2; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = 4 + Math.random() * 8;
            this.particles.push({
                x, y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s,
                size: 2 + Math.random() * 3,
                color: ['#00FF88','#FFD700','#10B981','#FF6B35'][Math.floor(Math.random()*4)],
                alpha: 1,
                life: 1
            });
        }
    }
    
    addScore(pts) {
        this.score += pts;
        const sv = document.getElementById('score-value');
        if (sv) sv.textContent = this.score;
    }
    
    updateHealthBar() {
        const healthPercent = (this.spaceship.health / this.spaceship.maxHealth) * 100;
        const hb = document.getElementById('health-bar');
        const hv = document.getElementById('health-value');
        
        if (hb) {
            hb.style.width = healthPercent + '%';
            if (healthPercent > 60) hb.style.background = '#00FF88';
            else if (healthPercent > 30) hb.style.background = '#FFD700';
            else hb.style.background = '#FF0066';
        }
        
        if (hv) hv.textContent = Math.max(0, Math.floor(this.spaceship.health));
    }
    
    calcProgress() {
        const total = this.fragments.length;
        const destroyed = this.fragments.filter(f => f.isExploding || f.isDestroyed).length;
        this.progress = (destroyed / total) * 100;
        
        const pb = document.getElementById('destruction-progress');
        if (pb) {
            pb.style.width = this.progress + '%';
            pb.textContent = Math.floor(this.progress) + '%';
        }
        
        // VICTORIA: Matar al boss (revisar en cada frame)
        this.checkVictory();
    }
    
    checkVictory() {
        if (this.bossDefeated && !this.completed) {
            console.log('VICTORIA DETECTADA - Boss derrotado');
            this.completed = true;
            this.triggerVictory();
        }
    }
    
    triggerVictory() {
        // SONIDO de victoria
        this.sound.playVictory();
        
        this.fragments.forEach(f => {
            if (!f.isDestroyed && !f.isExploding) {
                const a = Math.random() * Math.PI * 2;
                const force = 22 + Math.random() * 18;
                f.explode(Math.cos(a) * force, Math.sin(a) * force);
            }
        });
        
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle, rgba(0,255,136,0.9) 0%, transparent 70%);
            pointer-events: none; z-index: 10001;
            animation: flashFade 0.5s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
        
        setTimeout(() => {
            const victoryScreen = document.getElementById('victory-screen');
            const finalScore = document.getElementById('final-score');
            if (victoryScreen && finalScore) {
                finalScore.textContent = this.score;
                victoryScreen.style.display = 'flex';
            }
            
            setTimeout(() => this.fadeOut(), 2500);
        }, 800);
    }
    
    triggerGameOver() {
        this.gameOver = true;
        
        const gameoverScreen = document.getElementById('gameover-screen');
        const gameoverScore = document.getElementById('gameover-score-value');
        if (gameoverScreen && gameoverScore) {
            gameoverScore.textContent = this.score;
            gameoverScreen.style.display = 'flex';
        }
        
        setTimeout(() => this.fadeOut(), 2000);
    }
    
    fadeOut() {
        this.canvas.style.transition = 'opacity 0.8s ease';
        this.canvas.style.opacity = '0';
        const ui = document.getElementById('space-shooter-ui');
        if (ui) {
            ui.style.transition = 'opacity 0.8s ease';
            ui.style.opacity = '0';
        }
        setTimeout(() => this.showMain(), 800);
    }
    
    showMain() {
        const main = document.getElementById('main-content');
        if (main) {
            main.style.display = 'block';
            main.style.opacity = '0';
            setTimeout(() => {
                main.style.transition = 'opacity 1.5s ease';
                main.style.opacity = '1';
            }, 50);
        }
        setTimeout(() => this.cleanup(), 1500);
    }
    
    cleanup() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.keyDownHandler) window.removeEventListener('keydown', this.keyDownHandler);
        if (this.keyUpHandler) window.removeEventListener('keyup', this.keyUpHandler);
        if (this.mouseHandler) this.canvas?.removeEventListener('mousedown', this.mouseHandler);
        if (this.touchStartHandler) this.canvas?.removeEventListener('touchstart', this.touchStartHandler);
        if (this.touchMoveHandler) this.canvas?.removeEventListener('touchmove', this.touchMoveHandler);
        if (this.touchEndHandler) this.canvas?.removeEventListener('touchend', this.touchEndHandler);
        
        this.canvas?.remove();
        document.getElementById('space-shooter-ui')?.remove();
        
        this.fragments = [];
        this.activeProjectiles = [];
        this.particles = [];
        this.enemies = [];
        this.helperShips = [];
        this.canvas = null;
        this.ctx = null;
    }
    
    update() {
        if (this.gameOver || this.completed) return;
        
        const now = performance.now();
        const dt = this.lastTime ? Math.min((now - this.lastTime) / 16.67, 2) : 1;
        this.lastTime = now;
        
        // INTRO SEQUENCE - Skip game logic during intro
        if (this.introActive) {
            this.updateIntro();
            return;
        }
        
        // Joystick móvil
        if (this.joystick && this.joystick.active) {
            const dir = this.joystick.getDirection();
            this.spaceship.keys.left = dir.x < -0.3;
            this.spaceship.keys.right = dir.x > 0.3;
            this.spaceship.keys.up = dir.y < -0.3;
            this.spaceship.keys.down = dir.y > 0.3;
            
            // DISPARO AUTOMÁTICO al mover en móvil
            if (Math.abs(dir.x) > 0.2 || Math.abs(dir.y) > 0.2) {
                this.shoot();
            }
        }
        
        this.spaceship.update();
        this.spawnEnemy();
        this.activateHelp();
        this.updateHelperShips();
        this.updateBossFireballs();
        
        this.activeProjectiles.forEach(p => p.update());
        this.enemies.forEach(e => e.update());
        this.helperShips.forEach(h => h.update());
        this.bossFireballs.forEach(fb => fb.update());
        
        // Verificar victoria en cada frame
        this.checkVictory();
        this.fragments.forEach(f => f.update(dt));
        
        // Partículas con splice inverso (más eficiente)
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35;
            p.alpha -= 0.035;
            p.life -= 0.035;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
        
        this.checkCollisions();
    }
    
    updateIntro() {
        const elapsed = (Date.now() - this.introStartTime) / 1000;
        
        if (this.introPhase === 'ship-entry') {
            // Nave entra desde abajo durante 1.5 segundos
            const progress = Math.min(elapsed / 1.5, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.spaceship.y = this.canvas.height + 100 - (easeOut * (this.canvas.height + 100 - (this.canvas.height - 80)));
            
            if (elapsed > 1.5) {
                this.introPhase = 'countdown';
                this.introStartTime = Date.now();
                this.countdownNumber = 3;
            }
        } else if (this.introPhase === 'countdown') {
            // Mostrar 3, 2, 1
            const countElapsed = elapsed;
            if (countElapsed > 1 && this.countdownNumber === 3) {
                this.countdownNumber = 2;
                this.introStartTime = Date.now();
            } else if (countElapsed > 1 && this.countdownNumber === 2) {
                this.countdownNumber = 1;
                this.introStartTime = Date.now();
            } else if (countElapsed > 1 && this.countdownNumber === 1) {
                this.introPhase = 'ready';
                this.introStartTime = Date.now();
            }
        } else if (this.introPhase === 'ready') {
            // Mostrar "START!" por 0.5s
            if (elapsed > 0.5) {
                this.introActive = false;
                this.gameStartTime = Date.now();
                this.spaceship.canShootTime = Date.now() + 2000; // 2s delay
            }
        }
    }
    
    updateBossFireballs() {
        // Boss dispara bolas de fuego
        this.enemies.forEach(e => {
            if (e.type === 'boss' && e.isActive && e.canShoot()) {
                // Disparar hacia la posición del jugador
                const fireball = new BossFireball(
                    e.x,
                    e.y,
                    this.spaceship.x,
                    this.spaceship.y
                );
                this.bossFireballs.push(fireball);
            }
        });
    }
    
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // INTRO RENDERING
        if (this.introActive) {
            this.renderIntro();
            return;
        }
        
        // INTRO RENDERING
        if (this.introActive) {
            this.renderIntro();
            return;
        }
        
        // Estrellas (cachear)
        if (!this.stars) {
            this.stars = [];
            for (let i = 0; i < 90; i++) {
                this.stars.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 1.6,
                    alpha: Math.random() * 0.6 + 0.4
                });
            }
        }
        this.stars.forEach(s => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            this.ctx.fillRect(s.x, s.y, s.size, s.size);
        });
        
        // Batch rendering (menos state changes)
        this.fragments.forEach(f => f.render(this.ctx));
        this.enemies.forEach(e => e.render(this.ctx));
        this.helperShips.forEach(h => h.render(this.ctx));
        this.bossFireballs.forEach(fb => fb.render(this.ctx)); // Bolas de fuego
        this.activeProjectiles.forEach(p => p.render(this.ctx));
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        this.spaceship.render(this.ctx);
        
        // Joystick
        if (this.joystick) this.joystick.render(this.ctx);
    }
    
    renderIntro() {
        // Renderizar fragmentos del nombre
        this.fragments.forEach(f => f.render(this.ctx));
        
        // Renderizar nave
        this.spaceship.render(this.ctx);
        
        // PANTALLA DE BIENVENIDA (antes del countdown)
        if (this.introPhase === 'ship-entry') {
            this.ctx.save();
            
            // Overlay semi-transparente
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
            gradient.addColorStop(1, 'rgba(0, 20, 30, 0.8)');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Texto principal
            this.ctx.font = 'bold 42px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            this.ctx.shadowBlur = 25;
            this.ctx.shadowColor = '#00FF88';
            
            // Gradiente en el texto
            const textGradient = this.ctx.createLinearGradient(0, this.canvas.height/2 - 50, 0, this.canvas.height/2 + 50);
            textGradient.addColorStop(0, '#00FF88');
            textGradient.addColorStop(1, '#FFD700');
            this.ctx.fillStyle = textGradient;
            
            this.ctx.fillText('BIENVENIDO AL PORTAFOLIO', this.canvas.width/2, this.canvas.height/2 - 30);
            
            // Subtítulo
            this.ctx.font = 'bold 28px Arial';
            this.ctx.shadowBlur = 15;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillText('DE ALEXANDER FONSECA', this.canvas.width/2, this.canvas.height/2 + 20);
            
            this.ctx.restore();
        }
        
        // COUNTDOWN OVERLAY
        else if (this.introPhase === 'countdown') {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = 'bold 140px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Efecto de glow pulsante
            this.ctx.shadowBlur = 40 + Math.sin(Date.now() / 100) * 10;
            this.ctx.shadowColor = '#00FF88';
            
            // Gradiente en número
            const numGradient = this.ctx.createRadialGradient(
                this.canvas.width/2, this.canvas.height/2, 0,
                this.canvas.width/2, this.canvas.height/2, 100
            );
            numGradient.addColorStop(0, '#00FF88');
            numGradient.addColorStop(1, '#059669');
            this.ctx.fillStyle = numGradient;
            
            this.ctx.fillText(this.countdownNumber, this.canvas.width/2, this.canvas.height/2);
            
            this.ctx.restore();
        }
        
        // READY!
        else if (this.introPhase === 'ready') {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = 'bold 90px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            this.ctx.shadowBlur = 50;
            this.ctx.shadowColor = '#FFD700';
            
            // Gradiente dorado
            const readyGradient = this.ctx.createLinearGradient(0, this.canvas.height/2 - 50, 0, this.canvas.height/2 + 50);
            readyGradient.addColorStop(0, '#FFD700');
            readyGradient.addColorStop(0.5, '#FFA500');
            readyGradient.addColorStop(1, '#FFD700');
            this.ctx.fillStyle = readyGradient;
            
            this.ctx.fillText('¡COMIENZA!', this.canvas.width/2, this.canvas.height/2);
            
            this.ctx.restore();
        }
    }
    
    gameLoop() {
        this.update();
        this.render();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

// Auto-init
if (!window.spaceShooterInstance) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.spaceShooterInstance = new SpaceShooterGame();
            window.spaceShooterInstance.init();
        });
    } else {
        window.spaceShooterInstance = new SpaceShooterGame();
        window.spaceShooterInstance.init();
    }
}

// CSS
const style = document.createElement('style');
style.textContent = `
@keyframes flashFade {
    0% { opacity: 0; }
    25% { opacity: 1; }
    100% { opacity: 0; }
}
`;
document.head.appendChild(style);
