// ========================================
// VIDEO PREVIEW ON HOVER
// Autoplay muted videos on hover
// ========================================

class VideoPreviewSystem {
    constructor() {
        this.videos = [];
        this.init();
    }
    
    init() {
        // Find all video cards with preview capability
        const videoCards = document.querySelectorAll('[data-video-preview]');
        
        videoCards.forEach(card => {
            const videoUrl = card.dataset.videoPreview;
            const iframe = card.querySelector('iframe');
            
            if (iframe && videoUrl) {
                this.setupVideoPreview(card, iframe, videoUrl);
            }
        });
    }
    
    setupVideoPreview(card, iframe, videoUrl) {
        let hoverTimer;
        let isPlaying = false;
        
        // Parse video URL to get autoplay version
        const autoplayUrl = this.getAutoplayUrl(videoUrl);
        const originalSrc = iframe.src;
        
        card.addEventListener('mouseenter', () => {
            // Delay preview to avoid accidental triggers
            hoverTimer = setTimeout(() => {
                if (!isPlaying) {
                    iframe.src = autoplayUrl;
                    isPlaying = true;
                    card.classList.add('video-playing');
                }
            }, 500); // 500ms delay
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            
            if (isPlaying) {
                // Stop video by resetting iframe
                iframe.src = originalSrc;
                isPlaying = false;
                card.classList.remove('video-playing');
            }
        });
    }
    
    getAutoplayUrl(url) {
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = this.extractYouTubeId(url);
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
        }
        
        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`;
        }
        
        // Default: return original with parameters
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}autoplay=1&mute=1`;
    }
    
    extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VideoPreviewSystem());
} else {
    new VideoPreviewSystem();
}

// ========================================
// ENHANCED VIDEO CARD INTERACTIONS
// ========================================

window.addEventListener('load', () => {
    const videoCards = document.querySelectorAll('.video-card, [data-video-preview]');
    
    videoCards.forEach(card => {
        // Add play icon overlay
        if (!card.querySelector('.play-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'play-overlay';
            overlay.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
            card.appendChild(overlay);
        }
        
        // Enhance hover effect
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.play-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.play-overlay');
            if (overlay && !this.classList.contains('video-playing')) {
                overlay.style.opacity = '0';
            }
        });
    });
});
