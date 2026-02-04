// ========================================
// ENHANCED GALLERY SYSTEM
// B&W effect + Category filters + Zoom
// ========================================

class EnhancedGallery {
    constructor() {
        this.lightbox = null;
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }
    
    init() {
        // Get all gallery images
        this.images = Array.from(document.querySelectorAll('.gallery-item img, .foto img'));
        
        if (this.images.length === 0) return;
        
        // Create lightbox
        this.createLightbox();
        
        // Bind click events to images
        this.images.forEach((img, index) => {
            const parent = img.closest('.gallery-item, .foto');
            if (parent) {
                parent.addEventListener('click', () => this.openLightbox(index));
            }
        });
        
        // Initialize filters if they exist
        this.initFilters();
    }
    
    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox-modal" id="lightbox">
                <button class="lightbox-close" aria-label="Cerrar">
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                <button class="lightbox-nav lightbox-prev" aria-label="Anterior">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button class="lightbox-nav lightbox-next" aria-label="Siguiente">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
                <div class="lightbox-content">
                    <img src="" alt="" class="lightbox-image" id="lightbox-img">
                    <div class="lightbox-caption" id="lightbox-caption"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        
        // Bind lightbox events
        this.bindLightboxEvents();
    }
    
    bindLightboxEvents() {
        // Close button
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Navigation
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.navigate(-1));
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.navigate(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
        
        // Zoom on image click
        this.lightboxImg.addEventListener('click', () => {
            this.lightboxImg.classList.toggle('zoomed');
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
        this.lightboxImg.classList.remove('zoomed');
    }
    
    navigate(direction) {
        this.currentIndex += direction;
        
        // Wrap around
        if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        } else if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        }
        
        this.updateLightbox();
    }
    
    updateLightbox() {
        const currentImg = this.images[this.currentIndex];
        this.lightboxImg.src = currentImg.src;
        this.lightboxImg.alt = currentImg.alt;
        
        // Get caption from alt or data-title
        const parent = currentImg.closest('.gallery-item, .foto');
        const caption = parent?.dataset.title || currentImg.alt || `Imagen ${this.currentIndex + 1} de ${this.images.length}`;
        this.lightboxCaption.textContent = caption;
        
        // Reset zoom
        this.lightboxImg.classList.remove('zoomed');
    }
    
    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (filterBtns.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked button
                this.classList.add('active');
                
                // Get filter category
                const filter = this.dataset.filter;
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
        
        // Set first button as active
        if (filterBtns[0]) {
            filterBtns[0].classList.add('active');
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EnhancedGallery());
} else {
    new EnhancedGallery();
}
