/**
 * Glass Shattering Effect for Portafolio_web
 * Adds gamification element. Clicking elements with class 'shatter-target'
 * will break them into particles.
 */

class ShatterEffect {
    constructor() {
        this.targets = document.querySelectorAll('.shatter-target');
        this.addListeners();
    }

    addListeners() {
        this.targets.forEach(target => {
            target.addEventListener('click', (e) => {
                // Prevent default action if it's not a link or if we want to shatter first
                // e.preventDefault(); 
                this.shatter(e.target, e.clientX, e.clientY);
            });
        });
    }

    shatter(element, startX, startY) {
        const rect = element.getBoundingClientRect();
        const particles = 30;
        
        // Hide element temporarily or permanently
        element.style.visibility = 'hidden';
        
        // Create particles container
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.top = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            
            // Initial position near the click or center of element
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Random shard shape
            const width = Math.random() * 20 + 5;
            const height = Math.random() * 20 + 5;
            particle.style.width = `0`;
            particle.style.height = `0`;
            particle.style.borderLeft = `${width/2}px solid transparent`;
            particle.style.borderRight = `${width/2}px solid transparent`;
            particle.style.borderBottom = `${height}px solid rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Physics
            const velocityX = (Math.random() - 0.5) * 15;
            const velocityY = (Math.random() - 0.5) * 15;
            let gravity = 0.5;
            let posX = x;
            let posY = y;
            let velX = velocityX;
            let velY = velocityY;
            let rotation = 0;

            container.appendChild(particle);

            // Animate
            const animate = () => {
                velY += gravity;
                posX += velX;
                posY += velY;
                rotation += 10;

                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.borderBottomColor = `rgba(255, 255, 255, ${Math.max(0, parseFloat(particle.style.borderBottomColor.split(',')[3]) - 0.02)})`;
                particle.style.transform = `rotate(${rotation}deg)`;

                if (parseFloat(particle.style.borderBottomColor.split(',')[3]) > 0 && posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                    if (container.children.length === 0) {
                        container.remove();
                    }
                }
            };
            requestAnimationFrame(animate);
        }

        // Restore element after delay (Mini-game reset)
        setTimeout(() => {
            element.style.visibility = 'visible';
            element.style.opacity = '0';
            element.animate([
                { opacity: 0, transform: 'scale(0.8)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: 500, fill: 'forwards' });
            element.style.opacity = '1';
        }, 2000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ShatterEffect();
});
