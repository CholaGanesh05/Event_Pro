// contact.js
console.log("✅ Contact JS is loaded!");

document.addEventListener('DOMContentLoaded', () => {
    const easeOutQuad = (t) => t * (2 - t);

    // ----------------------------
    // Section Fade-in Animation
    // ----------------------------
    const sections = document.querySelectorAll('.contact-info-section, .contact-form-section, .map-section, .faq-preview, .cta-section');
    sections.forEach(section => {
        section.classList.add('section');
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                obs.unobserve(section);
            }
        }, { threshold: 0.2 });

        observer.observe(section);
    });

    // ----------------------------
    // Contact Cards Animation
    // ----------------------------
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.setAttribute('tabindex', '0');

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                obs.unobserve(card);
            }
        }, { threshold: 0.3 });

        observer.observe(card);

        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ----------------------------
    // Contact Form Handling
    // ----------------------------
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    // Form validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^\(?[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    };

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        
        formGroup.appendChild(errorElement);
        input.style.borderColor = '#e74c3c';
    };

    const clearError = (input) => {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
    };

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
            } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
            } else if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
            } else {
                clearError(input);
            }
        });

        input.addEventListener('focus', () => {
            clearError(input);
        });

        // Add floating label effect
        if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            } else if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        // Check privacy policy agreement
        const privacyCheckbox = document.getElementById('privacy');
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, 'You must agree to the privacy policy');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        }
    });

    const showSuccessMessage = () => {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="background: #2ecc71; color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                Message sent successfully! We'll get back to you within 24 hours.
            </div>
        `;
        
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    };

    // ----------------------------
    // FAQ Accordion
    // ----------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle i');
        
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle i');
                    otherAnswer.style.maxHeight = '0';
                    otherToggle.classList.remove('fa-minus');
                    otherToggle.classList.add('fa-plus');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                toggle.classList.remove('fa-minus');
                toggle.classList.add('fa-plus');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-minus');
            }
        });

        // Keyboard accessibility
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // ----------------------------
    // CTA Buttons Animation
    // ----------------------------
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn, .view-all .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'transform 0.3s ease';
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        button.addEventListener('focus', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('blur', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // ----------------------------
    // Map Container Animation
    // ----------------------------
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.style.opacity = '0';
        mapContainer.style.transform = 'translateY(30px)';

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                mapContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                mapContainer.style.opacity = '1';
                mapContainer.style.transform = 'translateY(0)';
                obs.unobserve(mapContainer);
            }
        }, { threshold: 0.3 });

        observer.observe(mapContainer);
    }

    // ----------------------------
    // Social Icons Hover Effects
    // ----------------------------
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = 'translateY(-3px) scale(1.1)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ----------------------------
    // Sidebar Widget Animation
    // ----------------------------
    const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
    sidebarWidgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateX(30px)';
        widget.style.transitionDelay = `${index * 0.2}s`;

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                widget.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                widget.style.opacity = '1';
                widget.style.transform = 'translateX(0)';
                obs.unobserve(widget);
            }
        }, { threshold: 0.3 });

        observer.observe(widget);
    });

    // ----------------------------
    // Hamburger Menu (standardized)
    // ----------------------------
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

    // ----------------------------
    // Smooth Scroll for Anchor Links (standardized)
    // ----------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// ----------------------------
// Keyboard Support Enhancement
// ----------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        
        // Handle contact cards
        if (focused.classList.contains('contact-card')) {
            focused.style.transform = 'translateY(-10px) scale(1.02)';
            setTimeout(() => {
                focused.style.transform = 'translateY(0) scale(1)';
            }, 200);
        }
    }
});

// ----------------------------
// Form Auto-save (Optional Enhancement)
// ----------------------------
const autoSaveForm = () => {
    const formData = {};
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        } else {
            formData[input.name] = input.checked;
        }
    });
    
    // Store in memory (since localStorage is not supported in Claude artifacts)
    window.contactFormDraft = formData;
};

// Restore form data on page load
const restoreFormData = () => {
    if (window.contactFormDraft) {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const savedValue = window.contactFormDraft[input.name];
            if (savedValue !== undefined) {
                if (input.type !== 'checkbox') {
                    input.value = savedValue;
                } else {
                    input.checked = savedValue;
                }
            }
        });
    }
};

// Auto-save every 30 seconds
setInterval(autoSaveForm, 30000);

// Restore form data when page loads
document.addEventListener('DOMContentLoaded', restoreFormData);