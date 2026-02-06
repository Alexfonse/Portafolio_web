// ========================================
// ARCANE GALLERY CORE (V3)
// CSS Columns + PulseVisualizer Engine
// ========================================

class ArcaneGallery {
    constructor(containerSelector = '.masonry-grid') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        // Prevent double init
        if (this.container.dataset.arcaneInitialized) return;
        this.container.dataset.arcaneInitialized = 'true';

        this.items = [];
        this.filters = new Set(['all']);
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        this.gatherItems();
        this.injectFilters();
        this.bindEvents();
        this.setupImageHandling();
        
        // Initialize Visualizer (Lightbox)
        this.visualizer = new PulseVisualizer();
    }

    gatherItems() {
        this.items = Array.from(this.container.querySelectorAll('.masonry-item'));
        this.items.forEach(item => {
            const category = item.dataset.category;
            if (category) this.filters.add(category.toLowerCase());
        });
    }

    setupImageHandling() {
        // Auto-hide broken images to maintain layout integrity
        this.items.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                // Handler for future errors
                img.onerror = () => {
                    this.hideBrokenItem(item);
                };
                
                // Check if already broken
                if (img.complete && img.naturalWidth === 0) {
                    this.hideBrokenItem(item);
                }
            }
        });
    }

    hideBrokenItem(item) {
        // Double check to avoid hiding valid items during race conditions
        const img = item.querySelector('img');
        if (img && img.naturalWidth === 0) {
             console.warn('Arcane Gallery: Hiding broken image:', img.src);
             item.style.display = 'none';
             item.classList.add('broken-image');
        }
    }

    injectFilters() {
        let filterContainer = document.querySelector('.masonry-filters');
        if (!filterContainer) {
            filterContainer = document.createElement('div');
            filterContainer.className = 'masonry-filters';
            this.container.parentNode.insertBefore(filterContainer, this.container);
        }

        filterContainer.innerHTML = '';
        const sortedFilters = Array.from(this.filters).sort();
        if (sortedFilters.includes('all')) {
            sortedFilters.splice(sortedFilters.indexOf('all'), 1);
            sortedFilters.unshift('all');
        }

        sortedFilters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${filter === 'all' ? 'active' : ''}`;
            btn.textContent = filter === 'all' ? 'Todo' : this.formatLabel(filter);
            btn.dataset.filter = filter;
            btn.addEventListener('click', () => this.filterItems(filter));
            filterContainer.appendChild(btn);
        });
        
        this.filterContainer = filterContainer;
    }

    formatLabel(str) {
        return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    filterItems(filter) {
        this.currentFilter = filter;
        
        // Update Buttons
        this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Filter Grid
        this.container.classList.add('filtering');
        
        this.items.forEach(item => {
            const category = (item.dataset.category || '').toLowerCase();
            const isVisible = filter === 'all' || category === filter;
            
            if (isVisible) {
                item.classList.remove('hidden');
                // CSS Columns handles reflow automatically
            } else {
                item.classList.add('hidden');
            }
        });

        setTimeout(() => this.container.classList.remove('filtering'), 400);
    }

    bindEvents() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.visualizer.open({
                        src: img.src,
                        title: item.dataset.title,
                        description: item.dataset.description,
                        category: item.dataset.category
                    });
                }
            });
        });
    }
}

// ========================================
// PULSE VISUALIZER (Advanced Lightbox)
// ========================================
class PulseVisualizer {
    constructor() {
        this.buildUI();
        this.bindGlobalEvents();
        
        this.scale = 1;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
    }

    buildUI() {
        if (document.getElementById('pulse-visualizer')) return;

        const modal = document.createElement('div');
        modal.id = 'pulse-visualizer';
        modal.className = 'pulse-modal';
        modal.innerHTML = `
            <div class="pulse-toolbar">
                <span class="pulse-category">VISUALIZER</span>
                <button class="pulse-close" aria-label="Close">✕</button>
            </div>
            
            <div class="pulse-viewport">
                <img id="pulse-image" src="" alt="Active View">
            </div>

            <div class="pulse-controls">
                <button class="pulse-zoom-out">-</button>
                <span class="pulse-zoom-level">100%</span>
                <button class="pulse-zoom-in">+</button>
            </div>

            <div class="pulse-info">
                <h3 id="pulse-title"></h3>
                <p id="pulse-desc"></p>
            </div>
            
            <div class="pulse-nav pulse-prev">‹</div>
            <div class="pulse-nav pulse-next">›</div>
            <div class="pulse-backdrop"></div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;
        this.img = modal.querySelector('#pulse-image');
        this.title = modal.querySelector('#pulse-title');
        this.desc = modal.querySelector('#pulse-desc');
        this.zoomLabel = modal.querySelector('.pulse-zoom-level');
    }

    bindGlobalEvents() {
        // Controls
        this.modal.querySelector('.pulse-close').onclick = () => this.close();
        this.modal.querySelector('.pulse-backdrop').onclick = () => this.close();
        
        // Zoom
        this.modal.querySelector('.pulse-zoom-in').onclick = () => this.zoom(0.2);
        this.modal.querySelector('.pulse-zoom-out').onclick = () => this.zoom(-0.2);
        
        // Wheel Zoom
        this.modal.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.zoom(e.deltaY * -0.001);
        }, { passive: false });

        // Drag / Pan Logic
        this.img.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mousemove', (e) => this.drag(e));
        window.addEventListener('mouseup', () => this.stopDrag());
        
        // Touch Support
        this.img.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        window.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        window.addEventListener('touchend', () => this.stopDrag());
    }

    open(data) {
        this.img.src = data.src;
        this.title.textContent = data.title || 'Untitled';
        this.desc.textContent = data.description || '';
        this.modal.querySelector('.pulse-category').textContent = (data.category || 'Visual').toUpperCase();
        
        this.resetTransform();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            this.img.src = '';
        }, 300);
    }

    zoom(delta) {
        this.scale = Math.min(Math.max(0.5, this.scale + delta), 4);
        this.updateTransform();
        this.zoomLabel.textContent = Math.round(this.scale * 100) + '%';
    }

    resetTransform() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
        this.zoomLabel.textContent = '100%';
    }

    updateTransform() {
        this.img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }

    startDrag(e) {
        if (this.scale <= 1) return; // Only drag if zoomed
        this.isDragging = true;
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;
        this.img.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault && e.preventDefault(); // Prevent scroll on touch
        
        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;
        this.updateTransform();
    }

    stopDrag() {
        this.isDragging = false;
        this.img.style.cursor = this.scale > 1 ? 'grab' : 'default';
    }
}

// Auto-Init
document.addEventListener('DOMContentLoaded', () => {
    new ArcaneGallery('.masonry-grid');
    
    // Add CSS for Visualizer dynamically if not present
    if (!document.getElementById('pulse-css')) {
        const style = document.createElement('style');
        style.id = 'pulse-css';
        style.textContent = `
            .pulse-modal {
                position: fixed; inset: 0; z-index: 10000;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; opacity: 0; transition: opacity 0.3s ease;
            }
            .pulse-modal.active { pointer-events: auto; opacity: 1; }
            .pulse-backdrop {
                position: absolute; inset: 0; background: rgba(0,0,0,0.95);
                backdrop-filter: blur(20px); z-index: 1;
            }
            .pulse-viewport {
                position: relative; z-index: 2; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                overflow: hidden;
            }
            #pulse-image {
                max-width: 90vw; max-height: 90vh;
                object-fit: contain; transition: transform 0.1s linear;
                will-change: transform; cursor: grab;
            }
            .pulse-toolbar {
                position: absolute; top: 0; left: 0; right: 0; z-index: 10;
                padding: 20px; display: flex; justify-content: space-between;
                color: #fff; pointer-events: none;
            }
            .pulse-close, .pulse-zoom-in, .pulse-zoom-out {
                pointer-events: auto; background: none; border: 1px solid rgba(255,255,255,0.2);
                color: #fff; width: 40px; height: 40px; border-radius: 50%;
                cursor: pointer; transition: all 0.2s;
            }
            .pulse-close:hover { background: #ff0055; border-color: #ff0055; }
            .pulse-info {
                position: absolute; bottom: 30px; left: 30px; z-index: 10;
                pointer-events: none; text-shadow: 0 2px 10px rgba(0,0,0,1);
            }
            .pulse-info h3 { color: #fff; margin: 0 0 5px; font-family: 'Cinzel', serif; }
            .pulse-info p { color: #00ffcc; margin: 0; font-size: 0.9rem; }
            .pulse-controls {
                position: absolute; bottom: 30px; right: 30px; z-index: 10;
                display: flex; gap: 10px; align-items: center; color: #fff;
            }
            .pulse-zoom-in:hover, .pulse-zoom-out:hover { background: #00ffcc; color: #000; }
        `;
        document.head.appendChild(style);
    }
});

// Export
window.ArcaneGallery = ArcaneGallery;
