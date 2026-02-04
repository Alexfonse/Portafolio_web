// ========================================
// PINTEREST MASONRY GRID
// Auto-layout dinámico con filtros
// ========================================

class MasonryGrid {
    constructor(containerSelector = '.masonry-grid') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.items = [];
        this.filters = new Set(['all']);
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        this.gatherItems();
        this.calculateRowSpans();
        this.createFilters();
        this.bindEvents();
        
        // Recalcular en resize
        window.addEventListener('resize', () => {
            this.debounce(() => this.calculateRowSpans(), 250);
        });
        
        // Recalcular cuando las imágenes carguen
        this.container.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                this.calculateRowSpans();
            } else {
                img.addEventListener('load', () => this.calculateRowSpans());
            }
        });
    }
    
    gatherItems() {
        this.items = Array.from(this.container.querySelectorAll('.masonry-item'));
        
        // Recopilar categorías únicas
        this.items.forEach(item => {
            const category = item.dataset.category;
            if (category) {
                this.filters.add(category.toLowerCase());
            }
        });
    }
    
    calculateRowSpans() {
        const rowHeight = 10; // Debe coincidir con grid-auto-rows en CSS
        const gap = 20; // Debe coincidir con gap en CSS
        
        this.items.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;
            
            // Esperar a que la imagen tenga dimensiones
            if (img.naturalHeight === 0) return;
            
            const imageHeight = img.offsetHeight;
            const rowSpan = Math.ceil((imageHeight + gap) / rowHeight);
            
            // Asignar data-rows para CSS
            if (rowSpan <= 20) item.dataset.rows = '1';
            else if (rowSpan <= 30) item.dataset.rows = '2';
            else if (rowSpan <= 40) item.dataset.rows = '3';
            else if (rowSpan <= 50) item.dataset.rows = '4';
            else item.dataset.rows = '5';
            
            // Aplicar directamente también
            item.style.gridRowEnd = `span ${rowSpan}`;
        });
    }
    
    createFilters() {
        // Buscar contenedor de filtros o crearlo
        let filterContainer = document.querySelector('.masonry-filters');
        
        if (!filterContainer) {
            filterContainer = document.createElement('div');
            filterContainer.className = 'masonry-filters';
            this.container.parentNode.insertBefore(filterContainer, this.container);
        }
        
        // Crear botones de filtro
        filterContainer.innerHTML = '';
        
        this.filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (filter === 'all' ? ' active' : '');
            btn.textContent = filter === 'all' ? 'Todas' : this.formatFilterName(filter);
            btn.dataset.filter = filter;
            
            btn.addEventListener('click', () => this.filterItems(filter));
            
            filterContainer.appendChild(btn);
        });
        
        // Agregar contador
        const counter = document.createElement('div');
        counter.className = 'results-count';
        counter.textContent = `${this.items.length} fotos`;
        filterContainer.appendChild(counter);
        
        this.filterContainer = filterContainer;
    }
    
    formatFilterName(str) {
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    filterItems(filter) {
        this.currentFilter = filter;
        
        // Actualizar botones activos
        this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        let visibleCount = 0;
        
        // Filtrar items
        this.items.forEach(item => {
            const itemCategory = (item.dataset.category || '').toLowerCase();
            const shouldShow = filter === 'all' || itemCategory === filter;
            
            if (shouldShow) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Actualizar contador
        const counter = this.filterContainer.querySelector('.results-count');
        if (counter) {
            counter.textContent = `${visibleCount} foto${visibleCount !== 1 ? 's' : ''}`;
        }
        
        // Recalcular layout
        setTimeout(() => this.calculateRowSpans(), 100);
    }
    
    bindEvents() {
        // Click en items para abrir lightbox
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, item.dataset.title, item.dataset.description);
                }
            });
        });
    }
    
    openLightbox(src, title, description) {
        // Disparar evento personalizado para que el sistema de lightbox existente lo maneje
        const event = new CustomEvent('openLightbox', {
            detail: { src, title, description }
        });
        document.dispatchEvent(event);
        
        // Fallback si no hay sistema de lightbox
        if (!document.querySelector('.modal')) {
            console.log('Opening:', src);
        }
    }
    
    // Utilidad debounce
    debounce(func, wait) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, wait);
    }
    
    // Método público para agregar items dinámicamente
    addItem(itemElement) {
        this.container.appendChild(itemElement);
        this.items.push(itemElement);
        
        const img = itemElement.querySelector('img');
        if (img) {
            img.addEventListener('load', () => this.calculateRowSpans());
        }
        
        this.calculateRowSpans();
    }
    
    // Método público para refrescar
    refresh() {
        this.gatherItems();
        this.calculateRowSpans();
        this.createFilters();
    }
}

// Auto-inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MasonryGrid('.masonry-grid');
        // También soportar .gallery-container si existe
        new MasonryGrid('.gallery-container');
    });
} else {
    new MasonryGrid('.masonry-grid');
    new MasonryGrid('.gallery-container');
}

// Exportar para uso externo
window.MasonryGrid = MasonryGrid;
