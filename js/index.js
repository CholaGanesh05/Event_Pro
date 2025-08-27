// Enhanced index.js with advanced features - No fading issues
console.log("✅ Enhanced Index JS is loaded!");

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initHeroAnimations();
    initScrollAnimations();
    initInteractiveElements();
    initSlidersAndCarousels();
    initLazyLoading();
    initKeyboardNavigation();
    initMobileOptimizations();
    addDynamicStyles();
});

// Hero Section Animations
function initHeroAnimations() {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        // Start visible, animate in from position only
        hero.style.transform = 'translateY(40px)';
        
        // Staggered animation for hero elements
        const heroElements = hero.querySelectorAll('h1, p, .cta-buttons');
        heroElements.forEach(el => {
            el.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            hero.style.transition = 'transform 0.8s ease';
            hero.style.transform = 'translateY(0)';
            
            // Animate individual elements with delays
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.transition = 'transform 0.6s ease';
                    el.style.transform = 'translateY(0)';
                }, 300 + (index * 200));
            });
        }, 200);
    }
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const sections = document.querySelectorAll(
        '.event-categories, .popular-venues, .featured-packages, .testimonials, .cta-section'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
                // Don't unobserve - keep elements visible
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        // Start with transform only, keep visible
        section.style.transform = 'translateY(50px)';
        sectionObserver.observe(section);
    });
    
    // Animate individual cards within sections
    initCardAnimations();
    initPackageAnimations();
    initTestimonialSlider();
}

// Enhanced Card Animations
function initCardAnimations() {
    const categoryCards = document.querySelectorAll('.category-card');
    const venueCards = document.querySelectorAll('.venue-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.category-card, .venue-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
                // Don't unobserve - keep cards visible
            }
        });
    }, { threshold: 0.3 });
    
    // Prepare cards for animation - keep visible, just transform
    [...categoryCards, ...venueCards].forEach(card => {
        card.style.transform = 'translateY(30px) scale(0.95)';
    });
    
    // Observe parent containers
    const categorySection = document.querySelector('.event-categories');
    const venuesSection = document.querySelector('.popular-venues');
    
    if (categorySection) cardObserver.observe(categorySection);
    if (venuesSection) cardObserver.observe(venuesSection);
}

// Enhanced Package Animations with Hover Effects
function initPackageAnimations() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach((card, index) => {
        // Start visible, just transform
        card.style.transform = 'scale(0.9) translateY(30px)';
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
        
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.transform = 'scale(1) translateY(0)';
                }, index * 200);
                // Don't disconnect - keep observing
            }
        }, { threshold: 0.3 });
        
        observer.observe(card);
    });
}

// Interactive Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialSlider || testimonialCards.length === 0) return;
    
    let currentSlide = 0;
    let isAutoPlaying = true;
    let slideInterval;
    
    // Create slider controls
    const sliderControls = document.createElement('div');
    sliderControls.className = 'slider-controls';
    sliderControls.innerHTML = `
        <button class="slider-btn prev-btn" aria-label="Previous testimonial">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="slider-dots"></div>
        <button class="slider-btn next-btn" aria-label="Next testimonial">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    testimonialSlider.parentNode.appendChild(sliderControls);
    
    // Create dots for each testimonial
    const dotsContainer = sliderControls.querySelector('.slider-dots');
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Slider functionality
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    }
    
    function updateSlider() {
        testimonialCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });
        
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function startAutoPlay() {
        if (isAutoPlaying) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    sliderControls.querySelector('.prev-btn').addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    sliderControls.querySelector('.next-btn').addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // Pause auto-play on hover
    testimonialSlider.addEventListener('mouseenter', stopAutoPlay);
    testimonialSlider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    initTouchSlider(testimonialSlider, nextSlide, prevSlide, resetAutoPlay);
    
    // Initialize slider
    updateSlider();
    startAutoPlay();
}

// Touch/Swipe Support for Sliders
function initTouchSlider(slider, nextCallback, prevCallback, resetCallback) {
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextCallback();
            } else {
                prevCallback();
            }
            resetCallback();
        }
    }, { passive: true });
}

// Interactive Elements Enhancement
function initInteractiveElements() {
    // Enhanced CTA Button Animations
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn, .btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        // Create ripple effect
        button.addEventListener('click', createRippleEffect);
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Enhanced Navigation
    initEnhancedNavigation();
    
    // Floating Action Button (if needed)
    createFloatingActionButton();
}

// Ripple Effect for Buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Navigation with Smooth Scrolling
function initEnhancedNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Mobile menu toggle
    if (hamburger && mainNav && authButtons) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            authButtons.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && mainNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                authButtons.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Floating Action Button for Quick Access
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-btn';
    fab.innerHTML = '<i class="fas fa-calendar-plus"></i>';
    fab.setAttribute('aria-label', 'Plan Your Event');
    
    fab.addEventListener('click', () => {
        window.location.href = 'booking.html';
    });
    
    // Show/hide based on scroll
    let fabVisible = false;
    window.addEventListener('scroll', () => {
        const shouldShow = window.scrollY > 500;
        
        if (shouldShow && !fabVisible) {
            fab.classList.add('show');
            fabVisible = true;
        } else if (!shouldShow && fabVisible) {
            fab.classList.remove('show');
            fabVisible = false;
        }
    });
    
    document.body.appendChild(fab);
}

// Lazy Loading with Intersection Observer
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src], img[src*="venue"], img[src*="testimonial"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    // Don't unobserve images
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Keyboard Navigation Support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const mainNav = document.querySelector('.main-nav');
            
            if (mainNav && mainNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }
        
        // Quick navigation shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    window.location.href = 'booking.html';
                    break;
                case 'c':
                    e.preventDefault();
                    window.location.href = 'contact.html';
                    break;
            }
        }
    });
}

// Mobile-Specific Optimizations
function initMobileOptimizations() {
    // Touch-friendly hover effects
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .category-card, .package-card, .venue-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateOnScroll() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Section Animation Helper
function animateSection(section) {
    section.style.transition = 'transform 0.8s ease';
    section.style.transform = 'translateY(0)';
    
    // Add specific animations based on section
    if (section.classList.contains('event-categories')) {
        const cards = section.querySelectorAll('.category-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }
}

// Dynamic Styles for Enhanced Effects
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Enhanced Animations - No opacity issues */
        .animate-in {
            transform: translateY(0) scale(1) !important;
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Slider Controls */
        .slider-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        
        .slider-btn {
            background: var(--primary-color, #007bff);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .slider-btn:hover {
            background: var(--primary-dark, #0056b3);
            transform: scale(1.1);
        }
        
        .slider-dots {
            display: flex;
            gap: 10px;
        }
        
        .slider-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: rgba(0, 123, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .slider-dot.active {
            background: var(--primary-color, #007bff);
            transform: scale(1.2);
        }
        
        /* Testimonials Slider - Fixed visibility */
        .testimonials-slider {
            display: flex;
            transition: transform 0.5s ease;
            overflow: hidden;
        }
        
        .testimonial-card {
            flex: 0 0 100%;
            transition: transform 0.5s ease;
        }
        
        .testimonial-card.active {
            transform: scale(1.02);
        }
        
        /* Floating Action Button */
        .floating-action-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--primary-color, #007bff);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 123, 255, 0.4);
            transform: translateY(100px) scale(0);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 1000;
        }
        
        .floating-action-btn.show {
            transform: translateY(0) scale(1);
        }
        
        .floating-action-btn:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.6);
        }
        
        /* Lazy Loading - No opacity issues */
        .lazy {
            transition: transform 0.5s ease;
        }
        
        .lazy.loaded {
            transform: scale(1.01);
        }
        
        /* Touch Device Optimizations */
        .touch-device .touch-active {
            transform: scale(0.98);
        }
        
        /* Mobile Navigation Enhancement */
        .nav-open {
            overflow: hidden;
        }
        
        /* Responsive Enhancements */
        @media (max-width: 768px) {
            .slider-controls {
                gap: 15px;
            }
            
            .slider-btn {
                width: 35px;
                height: 35px;
            }
            
            .floating-action-btn {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
            }
        }
        
        /* Performance Optimization */
        * {
            will-change: auto;
        }
        
        .animate-in,
        .slider-btn,
        .floating-action-btn {
            will-change: transform;
        }
    `;
    document.head.appendChild(styleElement);
}