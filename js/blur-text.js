/**
 * BlurText Effect (Vanilla JS)
 * Simulates React/Framer Motion BlurText component.
 * Usage: Add class 'blur-text' to any element.
 * Options (via data attributes):
 *  data-animate-by="words" (default) or "chars"
 *  data-delay="200" (stagger delay in ms)
 *  data-direction="top" or "bottom"
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select both text and load (image/card) targets
    const targets = document.querySelectorAll('.blur-text, .blur-load');
    
    if (targets.length === 0) return;

    const observerOptions = {
        threshold: 0.05, // Lower threshold for earlier trigger
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters full view
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        // Only prepare (split text) if it is a text animation
        if (target.classList.contains('blur-text')) {
            prepareElement(target);
        }
        observer.observe(target);
    });

    function prepareElement(element) {
        const text = element.innerText; // Get raw text
        const animateBy = element.getAttribute('data-animate-by') || 'words';
        const direction = element.getAttribute('data-direction') || 'top';
        
        // Clear content
        element.innerHTML = '';
        element.style.opacity = '1'; // Ensure container is visible

        let segments;
        if (animateBy === 'chars') {
            segments = text.split('');
        } else {
            segments = text.split(' ');
        }

        segments.forEach((segment, index) => {
            const span = document.createElement('span');
            span.classList.add('blur-word');
            
            if (direction === 'bottom') {
                span.classList.add('from-bottom');
            }
            
            // Handle spaces for words
            if (animateBy === 'words') {
                span.textContent = segment;
            } else {
                // Chars
                span.textContent = segment === ' ' ? '\u00A0' : segment;
            }

            element.appendChild(span);
        });
    }

    function animateElement(element) {
        // Handle Text Animation (Staggered)
        if (element.classList.contains('blur-text')) {
            const spans = element.querySelectorAll('.blur-word');
            const baseDelay = parseInt(element.getAttribute('data-delay') || '40');
            
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.add('visible');
                }, index * baseDelay);
            });
        } 
        // Handle Component/Image Animation (Instant Class Add)
        else if (element.classList.contains('blur-load')) {
            // Optional: Add a small delay if defined
            const delay = parseInt(element.getAttribute('data-delay') || '0');
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
        }
    }
});
