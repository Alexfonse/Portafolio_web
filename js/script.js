// --- ⚡ ARCANE PAGE LOADER (INSTANT LOAD) ---
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.arcane-loader');
    
    // 🔒 Lock Scroll initially not necessary if we hide fast, but safe practice
    /* document.body.style.overflow = 'hidden'; */
    
    const hideLoader = () => {
        if (loader && !loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            
            // 🔓 Unlock Scroll IMMEDIATELY
            document.body.style.overflow = ''; 

            // Remove from DOM quickly
            loader.style.display = 'none';
        }
    };

    if (loader) {
        // execute immediately
        hideLoader();
    } else {
        document.body.style.overflow = '';
    }
});

// Extra safety: Ensure it's gone
window.addEventListener('load', () => {
    const loader = document.querySelector('.arcane-loader');
    if (loader) {
        loader.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// --- 🎯 INTELLIGENT CIRCULAR MENU ---
document.addEventListener('DOMContentLoaded', () => {
    // UPDATED SELECTORS FOR ARCANE UNIFIED MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const circularMenu = document.querySelector('.circular-menu');
    const menuItems = document.querySelectorAll('.menu-items li');
    const scrollHint = document.querySelector('.scroll-hint');
    
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let scrollIntention = 0; // Track cumulative scroll up distance
    
    // Toggle Menu
    if (menuToggle && circularMenu) {
        menuToggle.addEventListener('click', (e) => {
            // Updated class: 'active' for Unified CSS
            const isActive = circularMenu.classList.toggle('active');
            
            // 💥 Arcane Burst Effect
            if (isActive) {
                const rect = menuToggle.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Create 12 particles
                for (let i = 0; i < 12; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('arcane-particle');
                    document.body.appendChild(particle);
                    
                    // Random spread
                    const angle = (i / 12) * Math.PI * 2;
                    const velocity = Math.random() * 80 + 60; // Distance
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity;
                    
                    // Set custom props for CSS animation
                    particle.style.left = `${centerX}px`;
                    particle.style.top = `${centerY}px`;
                    particle.style.setProperty('--tx', `${tx}px`);
                    particle.style.setProperty('--ty', `${ty}px`);
                    
                    // Cleanup
                    setTimeout(() => particle.remove(), 1000);
                }
            }
            
            // Hide/show scroll hint
            if (scrollHint) {
                if (isActive) {
                    scrollHint.classList.add('hidden');
                } else {
                    scrollHint.classList.remove('hidden');
                }
            }
        });
    }

    // Active Link Highlighting
    menuItems.forEach((item) => {
        const link = item.querySelector('a');
        if (!link) return;

        link.addEventListener('click', (event) => {
            // Close menu on navigation
            circularMenu.classList.remove('active');
            
            // Remove active class from all items
            menuItems.forEach((li) => {
                li.querySelector('a')?.classList.remove('active');
            });
            
            // Add active class to clicked
            link.classList.add('active');
            
            // If internal link, smooth scroll
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            
            // Close menu after click
            setTimeout(() => {
                circularMenu.classList.remove('menu-open');
                if (scrollHint) scrollHint.classList.remove('hidden');
            }, 300);
        });
    });

    // Intelligent Scroll Handler + Header Navbar Logic
    const headerNavbar = document.querySelector('.header-navbar');
    let scrollTimeout;
    
    const handleScroll = () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const delta = scrollTop - lastScrollTop;
            scrollVelocity = Math.abs(delta);
            
            // Track scroll up intention
            if (delta < 0) {
                scrollIntention += Math.abs(delta);
            } else {
                scrollIntention = Math.max(0, scrollIntention - 10);
            }
            
            // ✨ Dynamic Scroll Threshold (40% of viewport)
            // This ensures the menu doesn't disappear too early on large screens
            const threshold = window.innerHeight * 0.4;
            
            if (scrollTop > threshold) {
                // Show header navbar
                headerNavbar?.classList.add('show');
                headerNavbar?.classList.remove('hidden');
                
                // Hide circular menu
                circularMenu?.classList.add('hide-menu');
            } else {
                // Hide header navbar
                headerNavbar?.classList.remove('show');
                headerNavbar?.classList.add('hidden');
                
                // Show circular menu (centered)
                circularMenu?.classList.remove('hide-menu');
            }
            
            lastScrollTop = scrollTop;
            scrollTimeout = null;
        }, 16); // ~60fps
    };

    // Passive listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});

// --- 🔥 HEADER NAVBAR - Active Link Highlight ---
document.addEventListener('DOMContentLoaded', () => {
    const headerLinks = document.querySelectorAll('.header-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    headerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Smooth scroll for internal links
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// --- 🍔 HAMBURGER MENU (New Unified Pattern) ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.header-nav'); // or .main-nav
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('ion-icon');
            if (icon) {
                const isOpened = navMenu.classList.contains('active');
                icon.setAttribute('name', isOpened ? 'close-outline' : 'menu-outline');
            }
        });
        
        // Close menu when clicking a link
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('ion-icon');
                if (icon) icon.setAttribute('name', 'menu-outline');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('ion-icon');
                if (icon) icon.setAttribute('name', 'menu-outline');
            }
        });
    }
});


// --- ✨ PREMIUM ORGANIC FIREFLIES (Global Overlay) ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('luciernagas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Configuration
        let width, height;
        
        // Dynamic quantity based on screen size (Requested ~25 max, but let's make it responsive)
        const getParticleCount = () => window.innerWidth < 768 ? 15 : 25;
        let particleCount = getParticleCount();
        
        // Colors: Emerald, Gold, Cyan (Arcane Palette)
        const colors = [
            { r: 16, g: 185, b: 129 }, // Emerald
            { r: 255, g: 214, b: 10 }, // Gold
            { r: 0, g: 217, b: 255 }   // Cyan
        ];

        // Resize Handling
        // Resize Handling (Optimized for Mobile Scroll)
        let resizeTimeout;
        const resize = () => {
            // Only resize if width changes significantly (ignores mobile URL bar vertical height changes)
            if (Math.abs(canvas.width - window.innerWidth) > 50 || Math.abs(canvas.height - window.innerHeight) > 50) {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        };

        // Debounce resize to prevent stutter (100ms delay)
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        });
        
        // Initial set
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        class Firefly {
            constructor() {
                this.init(true); // true = random start on screen
            }

            init(randomY = false) {
                this.x = Math.random() * width;
                this.y = randomY ? Math.random() * height : height + 20; // Start below screen if not random
                
                // Organic Movement Parameters
                this.baseSize = Math.random() * 2 + 1; // 1 to 3px core
                this.sizePulseSpeed = Math.random() * 0.05 + 0.02;
                this.angle = Math.random() * Math.PI * 2; // Random direction
                this.velocity = Math.random() * 0.5 + 0.2; // Slow organic speed
                this.angleSpeed = (Math.random() - 0.5) * 0.02; // Meander amount
                
                // Color & Opacity
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = 0;
                this.fadeState = 'in'; // in, hold, out
                this.fadeSpeed = Math.random() * 0.01 + 0.005;
                this.maxOpacity = Math.random() * 0.6 + 0.4;
                
                // Time-based wave properties
                this.t = Math.random() * 100;
            }

            update() {
                // organic path (sine wave drift)
                this.x += Math.cos(this.angle) * this.velocity;
                this.y += Math.sin(this.angle) * this.velocity;
                
                // slowly change direction (brownian-ish motion)
                this.angle += (Math.random() - 0.5) * 0.1;
                
                // vertical drift upwards is common for fireflies/embers
                this.y -= 0.2; 

                // Pulse Size
                this.t += this.sizePulseSpeed;
                this.currentSize = this.baseSize + Math.sin(this.t) * 0.5;

                // Lifecycle: Fade In -> Hold -> Fade Out
                if (this.fadeState === 'in') {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= this.maxOpacity) {
                        this.opacity = this.maxOpacity;
                        this.fadeState = 'hold';
                        this.holdTimer = Math.random() * 100 + 50; // frames to hold
                    }
                } else if (this.fadeState === 'hold') {
                    this.holdTimer--;
                    if (this.holdTimer <= 0) this.fadeState = 'out';
                } else if (this.fadeState === 'out') {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) {
                        this.init(); // Respawn
                    }
                }

                // Boundary Wrapping (Teleport to opposite side if way off)
                if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
                    if (this.opacity <= 0.1) this.init(); // Only respawn if dim
                }
            }

            draw(ctx) {
                if (this.opacity <= 0) return;

                ctx.beginPath();
                // Create soft glow gradient
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0, 
                    this.x, this.y, this.currentSize * 4
                );
                
                const { r, g, b } = this.color;
                
                // Core
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
                // Glow
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.4})`);
                // Fade
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.currentSize * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create Pool
        const particles = Array.from({ length: particleCount }, () => new Firefly());

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // "Lighter" blend mode makes overlapping lights brighter
            ctx.globalCompositeOperation = 'screen'; 

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            ctx.globalCompositeOperation = 'source-over';
            requestAnimationFrame(animate);
        };

        animate();
    }
});



// --- Gallery Logic (Modal & Filters) ---
document.addEventListener('DOMContentLoaded', () => {
    // Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.classList.add('hide');
                        item.style.opacity = '0';
                    }
                });
            });
        });
    }

    // Modal
    const modal = document.getElementById('myModal');
    if (modal) {
        const modalImg = document.getElementById("modalImg");
        const closeBtn = document.getElementsByClassName("close")[0];
        const prevBtn = document.querySelector('.modal-prev');
        const nextBtn = document.querySelector('.modal-next');
        const images = document.querySelectorAll('.gallery-item img');
        let currentIndex = 0;

        function openModal(index) {
            modal.style.display = "block";
            currentIndex = index;
            modalImg.src = images[currentIndex].src;
            
            // Update caption if exists
            const caption = document.querySelector('.modal-caption');
            if (caption) {
                const img = images[currentIndex];
                caption.textContent = `${img.alt || 'Imagen'} | ${img.closest('.gallery-item')?.getAttribute('data-category') || 'General'}`;
            }
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openModal(currentIndex);
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            openModal(currentIndex);
        }

        images.forEach((img, index) => {
            img.addEventListener('click', () => openModal(index));
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });
        }
        
        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        if (nextBtn) nextBtn.addEventListener('click', showNext);
        
        window.addEventListener('click', (e) => {
            if (e.target == modal) modal.style.display = "none";
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === "block") {
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'Escape') modal.style.display = "none";
            }
        });
    }
});

// --- Progress Bars Animation ---
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-fill");
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    let targetWidth = bar.style.width || '0%';
                    
                    if (targetWidth === '0%') {
                        if (bar.classList.contains('fill-90')) targetWidth = '90%';
                        else if (bar.classList.contains('fill-85')) targetWidth = '85%';
                        else if (bar.classList.contains('fill-80')) targetWidth = '80%';
                        else if (bar.classList.contains('fill-70')) targetWidth = '70%';
                        else if (bar.classList.contains('fill-50')) targetWidth = '50%';
                        else if (bar.classList.contains('fill-40')) targetWidth = '40%';
                    }
                    
                    bar.style.width = targetWidth;
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }
});

// --- ⚡ LAZY LOADING SECTIONS (Intersection Observer) ---
document.addEventListener("DOMContentLoaded", function () {
    const lazySections = document.querySelectorAll('.lazy-section');
    
    if (lazySections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                    sectionObserver.unobserve(section);
                }
            });
        }, {
            root: null,
            rootMargin: '100px', // Increased from 50px for earlier activation
            threshold: 0.05 // Reduced from 0.1 for smoother appearance
        });
        
        lazySections.forEach(section => sectionObserver.observe(section));
    }
});

// --- ✨ MAGICAL SCROLL EFFECTS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll particles (desktop only)
    if (window.innerWidth > 768) {
        let particleTimeout;
        window.addEventListener('scroll', () => {
            if (particleTimeout) return;
            
            particleTimeout = setTimeout(() => {
                createScrollParticle();
                particleTimeout = null;
            }, 100);
        }, { passive: true });
        
        function createScrollParticle() {
            const particle = document.createElement('div');
            particle.className = 'scroll-particle';
            particle.style.left = (Math.random() * 90 + 5) + 'vw';
            particle.style.top = (window.pageYOffset + window.innerHeight * 0.8) + 'px';
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
        
        // Scroll runes (rare)
        let runeIndex = 0;
        const runes = ['⟐', '⟑', '⟒', '◉', '◈', '⬢', '⬡', '⬠'];
        
        window.addEventListener('scroll', () => {
            if (Math.random() > 0.95) { // 5% chance
                const rune = document.createElement('div');
                rune.className = 'scroll-rune';
                rune.textContent = runes[runeIndex % runes.length];
                rune.style.left = (Math.random() * 80 + 10) + 'vw';
                rune.style.top = (window.pageYOffset + window.innerHeight / 2) + 'px';
                document.body.appendChild(rune);
                
                runeIndex++;
                setTimeout(() => rune.remove(), 2000);
            }
        }, { passive: true });
    }

    // 📧 EMAIL COPY FUNCTIONALITY (With Robust Fallback)
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault(); // ALWAYS prevent default mailto
            const email = "martinezharry2016@gmail.com";
            
            // Robust Copy Function
            const copyText = async (text) => {
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(text);
                    } else {
                        throw new Error("Clipboard API unavailable");
                    }
                } catch (err) {
                    // Legacy Fallback (for file:// or http)
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try {
                        document.execCommand('copy');
                    } catch (e) {
                        console.error("Legacy copy failed", e);
                        // Only open mailto if absolutely everything fails
                        window.location.href = this.href;
                        return;
                    } finally {
                        document.body.removeChild(textArea);
                    }
                }
                showToast(`📧 Correo Copiado: ${email}`);
            };

            copyText(email);
        });
    }

    // 🍞 TOAST NOTIFICATION SYSTEM
    function showToast(message) {
        // Create element
        const toast = document.createElement('div');
        toast.className = 'arcane-toast';
        toast.innerHTML = `
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500); // Wait for fade out
        }, 3000);
    }
});
