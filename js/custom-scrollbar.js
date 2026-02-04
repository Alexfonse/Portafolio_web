// ========================================
// CUSTOM SCROLLBAR CONTROLLER
// Artificial scrollbar for mobile
// ========================================

class CustomScrollbar {
    constructor() {
        this.scrollbar = null;
        this.thumb = null;
        this.scrollTimeout = null;
        this.init();
    }
    
    init() {
        // Only initialize on mobile/tablet
        if (window.innerWidth > 1024) return;
        
        // Create scrollbar elements
        this.createScrollbar();
        
        // Bind events
        window.addEventListener('scroll', this.updateScrollbar.bind(this), { passive: true });
        window.addEventListener('resize', this.updateScrollbar.bind(this));
    }
    
    createScrollbar() {
        // Create container
        this.scrollbar = document.createElement('div');
        this.scrollbar.className = 'custom-scrollbar';
        
        // Create thumb
        this.thumb = document.createElement('div');
        this.thumb.className = 'custom-scrollbar-thumb';
        
        this.scrollbar.appendChild(this.thumb);
        document.body.appendChild(this.scrollbar);
        
        // Initial update
        this.updateScrollbar();
    }
    
    updateScrollbar() {
        if (!this.thumb || window.innerWidth > 1024) return;
        
        // Calculate scroll percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
        // Calculate thumb height (proportional to viewport/document ratio)
        const thumbHeight = (winHeight / docHeight) * 100;
        this.thumb.style.height = thumbHeight + '%';
        
        // Calculate thumb position
        const maxTop = 100 - thumbHeight;
        const thumbTop = scrollPercent * maxTop;
        this.thumb.style.top = thumbTop + '%';
        
        // Show scrollbar while scrolling
        document.body.classList.add('scrolling');
        
        // Hide after 1 second of no scrolling
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 1000);
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CustomScrollbar());
} else {
    new CustomScrollbar();
}

// Reinitialize on resize (mobile ↔ desktop switch)
window.addEventListener('resize', () => {
    const scrollbarEl = document.querySelector('.custom-scrollbar');
    if (window.innerWidth > 1024 && scrollbarEl) {
        scrollbarEl.remove();
    } else if (window.innerWidth <= 1024 && !scrollbarEl) {
        new CustomScrollbar();
    }
});
