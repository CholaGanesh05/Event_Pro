document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Variables
    let currentCategory = 'all';
    let currentImageIndex = 0;
    let visibleItems = 9; // Initial number of visible items
    let allGalleryItems = [];
    let filteredItems = [];
    
    // Initialize gallery
    function initGallery() {
        // Store all gallery items in an array for easy manipulation
        allGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        // Initially show only first batch of items
        updateGalleryView();
        
        // Initialize zoom functionality
        initZoom();
    }
    
    // Filter gallery by category
    function filterGallery(category) {
        currentCategory = category;
        visibleItems = 9; // Reset visible items to initial value
        
        // Update active class on filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        updateGalleryView();
    }
    
    // Update gallery view based on filters and visible items count
    function updateGalleryView() {
        // Hide all items first
        allGalleryItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Get items that match the current category
        filteredItems = currentCategory === 'all' 
            ? allGalleryItems 
            : allGalleryItems.filter(item => item.getAttribute('data-category') === currentCategory);
        
        // Show only the number of items up to visibleItems
        filteredItems.slice(0, visibleItems).forEach(item => {
            item.style.display = 'block';
        });
        
        // Show/hide load more button based on whether there are more items
        if (filteredItems.length <= visibleItems) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Apply animation to newly visible items
        animateItems();
    }
    
    // Animate items when they appear
    function animateItems() {
        const visibleItems = document.querySelectorAll('.gallery-item[style="display: block;"]');
        visibleItems.forEach((item, index) => {
            // Remove any existing animation class
            item.classList.remove('fade-in');
            
            // Trigger reflow to restart animation
            void item.offsetWidth;
            
            // Add animation with delay based on index
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
    }
    
    // Initialize zoom/lightbox functionality
    function initZoom() {
        const zoomLinks = document.querySelectorAll('.gallery-zoom');
        
        zoomLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get image data
                const imgSrc = this.getAttribute('data-img');
                const imgTitle = this.getAttribute('data-title');
                const imgDesc = this.getAttribute('data-desc');
                
                // Set current image index for navigation
                currentImageIndex = filteredItems.indexOf(this.closest('.gallery-item'));
                
                // Open lightbox with image
                openLightbox(imgSrc, imgTitle, imgDesc);
            });
        });
    }
    
    // Open lightbox with image
    function openLightbox(src, title, desc) {
        // Set lightbox content
        lightboxImg.src = src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        // Add loading indicator
        lightboxImg.classList.add('loading');
        
        // Show lightbox with fade-in effect
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Remove loading indicator when image is loaded
        lightboxImg.onload = function() {
            lightboxImg.classList.remove('loading');
        };
        
        // Update navigation buttons
        updateLightboxNavigation();
    }
    
    // Close lightbox
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Clear image source after fade out to prevent flash of previous image
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            navigateToImage(currentImageIndex);
        }
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentImageIndex < filteredItems.length - 1) {
            currentImageIndex++;
            navigateToImage(currentImageIndex);
        }
    }
    
    // Navigate to specific image by index
    function navigateToImage(index) {
        const galleryItem = filteredItems[index];
        const zoomLink = galleryItem.querySelector('.gallery-zoom');
        
        const imgSrc = zoomLink.getAttribute('data-img');
        const imgTitle = zoomLink.getAttribute('data-title');
        const imgDesc = zoomLink.getAttribute('data-desc');
        
        // Add transition effect
        lightboxImg.classList.add('changing');
        
        // Change content after short delay for smoother transition
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxTitle.textContent = imgTitle;
            lightboxDesc.textContent = imgDesc;
            
            // Remove transition class when image is loaded
            lightboxImg.onload = function() {
                lightboxImg.classList.remove('changing');
            };
            
            updateLightboxNavigation();
        }, 300);
    }
    
    // Update lightbox navigation buttons based on current position
    function updateLightboxNavigation() {
        // Enable/disable prev button
        if (currentImageIndex <= 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
        
        // Enable/disable next button
        if (currentImageIndex >= filteredItems.length - 1) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }
    
    // Load more items
    function loadMoreItems() {
        visibleItems += 6; // Increase visible items count
        updateGalleryView();
    }
    
    // Keyboard navigation for lightbox
    function handleKeyboardNavigation(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightboxHandler();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    }
    
    // Mobile swipe navigation for lightbox
    function initSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left, go to next image
                nextImage();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right, go to previous image
                prevImage();
            }
        }
    }
    
    // Add lazy loading to gallery images
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.gallery-item img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('fade-in');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(img => {
                img.classList.add('fade-in');
            });
        }
    }
    
    // Add CSS for dynamic effects
    function addDynamicStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .gallery-item {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                opacity: 0;
            }
            
            .gallery-item.fade-in {
                animation: fadeIn 0.5s forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .gallery-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            .lightbox-img.loading {
                opacity: 0.5;
            }
            
            .lightbox-img.changing {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-controls button.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .gallery-lightbox.active {
                animation: fadeInLightbox 0.3s forwards;
            }
            
            @keyframes fadeInLightbox {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Event Listeners
    function addEventListeners() {
        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterGallery(category);
            });
        });
        
        // Lightbox close button
        closeLightbox.addEventListener('click', closeLightboxHandler);
        
        // Close lightbox when clicking outside of content
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightboxHandler();
            }
        });
        
        // Lightbox navigation buttons
        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);
        
        // Load more button
        loadMoreBtn.addEventListener('click', loadMoreItems);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    // Initialize everything
    function init() {
        addDynamicStyles();
        initGallery();
        addEventListeners();
        initSwipeNavigation();
        initLazyLoading();
    }
    
    // Start the gallery
    init();
});