document.addEventListener('DOMContentLoaded', function() {
    // Testimonials data
    const testimonials = [
        {
            name: "Jessica & Mark",
            event: "Wedding, May 2024",
            image: "images/testimonial-1.jpg",
            quote: "EventPro transformed our wedding vision into reality. Their attention to detail and creative solutions made our special day absolutely perfect. The team was responsive, professional, and genuinely cared about making our event memorable.",
            rating: 5
        },
        {
            name: "Thomas Wilson",
            event: "GlobalTech Inc., February 2024",
            image: "images/testimonial-2.jpg",
            quote: "Working with EventPro for our annual corporate gala was an absolute pleasure. Their team managed everything flawlessly, from venue selection to coordinating multiple vendors. They turned a stressful planning process into a smooth experience.",
            rating: 5
        },
        {
            name: "Sarah Johnson",
            event: "Charity Gala, March 2024",
            image: "images/testimonial-3.jpg",
            quote: "Our nonprofit fundraiser exceeded all expectations thanks to EventPro. They helped us maximize our budget while creating an elegant and impactful event that impressed our donors and raised significant funds for our cause.",
            rating: 5
        }
    ];

    // Tab functionality for event categories
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentNode;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Package card hover effect with smooth animation
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('featured')) {
                card.style.transition = 'transform 0.3s ease';
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }
        });
    });
    
    // Testimonial slider with automatic rotation
    const testimonialSlider = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    
    function createTestimonialCard(testimonial) {
        return `
            <div class="testimonial-card">
                <div class="testimonial-rating">
                    ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                </div>
                <div class="testimonial-text">
                    <p>"${testimonial.quote}"</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.event}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function showTestimonial(index) {
        if (testimonialSlider) {
            const testimonial = testimonials[index];
            
            // Create fade-out effect
            testimonialSlider.style.opacity = '0';
            
            // Change content after fade-out
            setTimeout(() => {
                testimonialSlider.innerHTML = createTestimonialCard(testimonial);
                
                // Fade back in
                testimonialSlider.style.opacity = '1';
            }, 300);
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Add CSS transition for testimonial slider
    if (testimonialSlider) {
        testimonialSlider.style.transition = 'opacity 0.3s ease';
    }
    
    // Auto-rotate testimonials every 5 seconds
    const testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause rotation on hover
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            setInterval(nextTestimonial, 5000);
        });
        
        // Add navigation controls if needed
        const prevBtn = document.createElement('button');
        prevBtn.className = 'testimonial-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'testimonial-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        testimonialSlider.appendChild(prevBtn);
        testimonialSlider.appendChild(nextBtn);
        
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Initialize first testimonial
    if (testimonialSlider && testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // Smooth scroll for anchor links (consistent behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Mobile menu toggle (standardized to .active + body.nav-open)
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');

    if (hamburger && mainNav) {
        const toggle = () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            if (authButtons) authButtons.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        };

        hamburger.addEventListener('click', toggle);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && mainNav.classList.contains('active')) toggle();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) toggle();
        });
    }
    
    // Enhancement services hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add smooth transitions to service cards and icons
    serviceCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
        }
    });
    
    // Process steps animation on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    function animateOnScroll() {
        processSteps.forEach(step => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (stepPosition < screenPosition) {
                step.classList.add('animated');
            }
        });
    }
    
    // Add animated class to process steps when they come into view
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements already in viewport on page load
    animateOnScroll();
});