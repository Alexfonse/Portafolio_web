// ========================================
// PARALLAX SCROLL CONTROLLER
// Smooth parallax effect for multiple layers
// ========================================

class ParallaxController {
    constructor() {
        this.layers = [];
        this.ticking = false;
        this.lastScrollY = 0;
        
        this.init();
    }
    
    init() {
        // Find parallax sections
        const sections = document.querySelectorAll('.parallax-section');
        
        sections.forEach(section => {
            const bg = section.querySelector('.parallax-bg');
            const mid = section.querySelector('.parallax-mid');
            const front = section.querySelector('.parallax-front');
            
            if (bg || mid || front) {
                this.layers.push({
                    section,
                    bg: { element: bg, speed: 0.5 },      // Slowest
                    mid: { element: mid, speed: 0.8 },    // Medium
                    front: { element: front, speed: 1.2 } // Fastest
                });
            }
        });
        
        if (this.layers.length > 0) {
            window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
            this.update(); // Initial update
        }
    }
    
    handleScroll() {
        this.lastScrollY = window.pageYOffset;
        
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.update();
                this.ticking = false;
            });
            
            this.ticking = true;
        }
    }
    
    update() {
        this.layers.forEach(({ section, bg, mid, front }) => {
            const rect = section.getBoundingClientRect();
            
            // Only animate if section is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPosition = this.lastScrollY - section.offsetTop;
                
                // Apply transforms
                if (bg.element) {
                    const bgOffset = scrollPosition * bg.speed;
                    bg.element.style.transform = `translateY(${bgOffset}px)`;
                }
                
                if (mid.element) {
                    const midOffset = scrollPosition * (mid.speed - 1);
                    mid.element.style.transform = `translateY(${midOffset}px)`;
                }
                
                if (front.element) {
                    const frontOffset = scrollPosition * (front.speed - 1);
                    front.element.style.transform = `translateY(${frontOffset}px)`;
                }
            }
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ParallaxController());
} else {
    new ParallaxController();
}

// ========================================
// SMOOTH SCROLL (Optional enhancement)
// ========================================

function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

window.addEventListener('load', initSmoothScroll);
