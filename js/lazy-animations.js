// ========================================
// LAZY ANIMATION SYSTEM - Scroll-triggered
// IntersectionObserver pattern
// ========================================

class LazyAnimator {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Find all elements with data-lazy-animate attribute
        const elements = document.querySelectorAll('[data-lazy-animate]');
        
        elements.forEach(el => {
            // Add initial state
            el.style.opacity = '0';
            el.style.transform = this.getInitialTransform(el);
            
            // Start observing
            this.observer.observe(el);
        });
    }
    
    getInitialTransform(element) {
        const animationType = element.dataset.lazyAnimate;
        
        switch(animationType) {
            case 'fade-up':
                return 'translateY(50px)';
            case 'fade-down':
                return 'translateY(-50px)';
            case 'fade-left':
                return 'translateX(50px)';
            case 'fade-right':
                return 'translateX(-50px)';
            case 'scale':
                return 'scale(0.8)';
            case 'rotate':
                return 'rotate(-10deg) scale(0.9)';
            default:
                return 'translateY(30px)';
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
                
                // Stop observing after animation
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateElement(element) {
        const delay = element.dataset.lazyDelay || 0;
        const duration = element.dataset.lazyDuration || 800;
        
        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
            
            // Add animated class for additional CSS hooks
            element.classList.add('lazy-animated');
        }, delay);
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LazyAnimator());
} else {
    new LazyAnimator();
}

// ========================================
// STAGGERED ANIMATIONS - For lists/grids
// ========================================

function staggerAnimate(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Auto-apply to common elements
window.addEventListener('load', () => {
    // Stagger project cards
    staggerAnimate('.glass-panel', 150);
    
    // Stagger gallery items
    staggerAnimate('.gallery-item', 100);
    
    // Stagger skill bars
    staggerAnimate('.skill-item', 80);
});
