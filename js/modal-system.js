// ========================================
// ENHANCED MODAL SYSTEM
// Reusable component for project details
// ========================================

class ModalSystem {
    constructor() {
        this.activeModal = null;
        this.init();
    }
    
    init() {
        // Create modal container if it doesn't exist
        if (!document.getElementById('universal-modal')) {
            this.createModalStructure();
        }
        
        // Bind event listeners
        this.bindEvents();
    }
    
    createModalStructure() {
        const modalHTML = `
            <div id="universal-modal" class="modal-overlay">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title"></h2>
                        <button class="modal-close" aria-label="Cerrar modal">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('universal-modal');
        this.modalContainer = this.modal.querySelector('.modal-container');
        this.modalTitle = this.modal.querySelector('.modal-title');
        this.modalBody = this.modal.querySelector('.modal-body');
        this.closeBtn = this.modal.querySelector('.modal-close');
    }
    
    bindEvents() {
        // Close button click
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Prevent scroll propagation in modal
        this.modalContainer.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });
    }
    
    open(options) {
        const { title, content, actions } = options;
        
        // Set title
        this.modalTitle.textContent = title;
        
        // Set content
        if (typeof content === 'string') {
            this.modalBody.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.modalBody.innerHTML = '';
            this.modalBody.appendChild(content);
        }
        
        // Add actions if provided
        if (actions && actions.length > 0) {
            const actionsHTML = `
                <div class="modal-actions">
                    ${actions.map(action => `
                        <button class="modal-btn ${action.primary ? 'modal-btn-primary' : ''}" 
                                data-action="${action.id}">
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            `;
            this.modalBody.insertAdjacentHTML('beforeend', actionsHTML);
            
            // Bind action buttons
            actions.forEach(action => {
                const btn = this.modalBody.querySelector(`[data-action="${action.id}"]`);
                if (btn && action.callback) {
                    btn.addEventListener('click', () => {
                        action.callback();
                        if (action.closeOnClick !== false) {
                            this.close();
                        }
                    });
                }
            });
        }
        
        // Show modal
        this.modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus on close button for accessibility
        this.closeBtn.focus();
        
        this.activeModal = options;
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Clear content after animation
        setTimeout(() => {
            this.modalBody.innerHTML = '';
            this.modalTitle.textContent = '';
            this.activeModal = null;
        }, 300);
    }
    
    // Helper method to create project modal content
    static createProjectContent(project) {
        return `
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="modal-image">` : ''}
            
            <h3>Descripción</h3>
            <p>${project.description || 'Sin descripción disponible.'}</p>
            
            ${project.challenge ? `
                <h3>Desafíos</h3>
                <p>${project.challenge}</p>
            ` : ''}
            
            ${project.solution ? `
                <h3>Solución</h3>
                <p>${project.solution}</p>
            ` : ''}
            
            ${project.technologies && project.technologies.length > 0 ? `
                <h3>Tecnologías</h3>
                <div class="modal-tags">
                    ${project.technologies.map(tech => `
                        <span class="modal-tag">${tech}</span>
                    `).join('')}
                </div>
            ` : ''}
            
            ${project.features && project.features.length > 0 ? `
                <h3>Características Principales</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            ` : ''}
        `;
    }
}

// Initialize modal system on DOM ready
let modalSystem;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modalSystem = new ModalSystem();
    });
} else {
    modalSystem = new ModalSystem();
}

// ========================================
// AUTO-BIND PROJECT CARDS
// ========================================

window.addEventListener('load', () => {
    // Find all elements with data-modal-trigger
    const triggers = document.querySelectorAll('[data-modal-trigger="project"]');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project data from data attributes
            const projectData = {
                title: this.dataset.projectTitle || 'Proyecto',
                description: this.dataset.projectDescription || '',
                challenge: this.dataset.projectChallenge || '',
                solution: this.dataset.projectSolution || '',
                image: this.dataset.projectImage || '',
                technologies: this.dataset.projectTech ? this.dataset.projectTech.split(',') : [],
                features: this.dataset.projectFeatures ? this.dataset.projectFeatures.split('|') : [],
                link: this.dataset.projectLink || ''
            };
            
            const actions = [];
            
            if (projectData.link) {
                actions.push({
                    id: 'view-project',
                    label: 'Ver Proyecto',
                    primary: true,
                    callback: () => window.open(projectData.link, '_blank')
                });
            }
            
            actions.push({
                id: 'close',
                label: 'Cerrar',
                callback: () => modalSystem.close()
            });
            
            modalSystem.open({
                title: projectData.title,
                content: ModalSystem.createProjectContent(projectData),
                actions: actions
            });
        });
    });
});
