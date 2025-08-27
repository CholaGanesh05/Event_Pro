// Enhanced booking.js with advanced features and animations
console.log("✅ Enhanced Booking JS is loaded!");

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all booking components
    initBookingFormAnimations();
    initFormValidation();
    initInteractiveCalendar();
    initDynamicPricing();
    initFormSteps();
    initFileUpload();
    initFormProgress();
    initSmartSuggestions();
    initFormStorage();
    addEnhancedStyles();
});

// Booking Form Animations
function initBookingFormAnimations() {
    const bookingForm = document.querySelector('.booking-form');
    const sidebar = document.querySelector('.sidebar');
    
    if (bookingForm) {
        // Initial animation state
        bookingForm.style.transform = 'translateY(50px)';
        
        // Staggered animation for form groups
        const formGroups = bookingForm.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.transform = 'translateY(30px)';
            group.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                group.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        // Animate form container
        setTimeout(() => {
            bookingForm.style.transition = 'transform 0.8s ease';
            bookingForm.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (sidebar) {
        sidebar.style.transform = 'translateX(30px)';
        setTimeout(() => {
            sidebar.style.transition = 'transform 0.8s ease';
            sidebar.style.transform = 'translateX(0)';
        }, 400);
    }
}

// Enhanced Form Validation
function initFormValidation() {
    const bookingForm = document.getElementById('booking-form');
    const formInputs = bookingForm.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        // Add floating labels effect
        initFloatingLabels(input);
        
        // Real-time validation feedback
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => clearFieldError(input));
    });
    
    // Enhanced form submission
    bookingForm.addEventListener('submit', handleFormSubmission);
    
    // Add form field enhancements
    initFieldEnhancements();
}

// Floating Labels Effect
function initFloatingLabels(input) {
    const formGroup = input.closest('.form-group');
    const label = formGroup.querySelector('label');
    
    if (!label) return;
    
    // Create floating label wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'floating-label-wrapper';
    
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    
    // Check if field has value
    function checkValue() {
        if (input.value || input === document.activeElement) {
            wrapper.classList.add('focused');
        } else {
            wrapper.classList.remove('focused');
        }
    }
    
    input.addEventListener('focus', checkValue);
    input.addEventListener('blur', checkValue);
    input.addEventListener('input', checkValue);
    
    // Initial check
    checkValue();
}

// Field Validation Logic
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error state
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required`;
    } else if (value) {
        // Type-specific validation
        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'number':
                if (field.id === 'guests' && (value < 1 || value > 1000)) {
                    isValid = false;
                    errorMessage = 'Number of guests must be between 1 and 1000';
                }
                break;
            case 'date':
                if (new Date(value) < new Date()) {
                    isValid = false;
                    errorMessage = 'Event date must be in the future';
                }
                break;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Field Error/Success Display
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    field.classList.add('error');
    
    let errorDiv = formGroup.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Add shake animation
    field.style.animation = 'shake 0.5s ease';
    setTimeout(() => field.style.animation = '', 500);
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.field-error');
    
    field.classList.remove('error', 'success');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Enhanced Form Submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Validate all fields
    const isFormValid = validateAllFields(form);
    
    if (isFormValid) {
        // Collect form data
        const formData = collectFormData(form);
        
        // Simulate API call
        setTimeout(() => {
            showSuccessMessage();
            resetForm(form);
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Clear stored form data
            clearFormStorage();
        }, 2000);
        
    } else {
        // Show validation errors
        showValidationError();
        
        // Reset button state
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 1000);
    }
}

// Interactive Calendar Enhancement
function initInteractiveCalendar() {
    const calendar = document.querySelector('.calendar');
    const calendarDates = document.querySelectorAll('.calendar-date:not(.disabled):not(.booked)');
    const eventDateField = document.getElementById('event-date');
    const prevBtn = document.querySelector('.calendar-controls button:first-child');
    const nextBtn = document.querySelector('.calendar-controls button:last-child');
    
    let currentMonth = 3; // April (0-indexed)
    let currentYear = 2025;
    
    // Calendar navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateCalendar(-1));
        nextBtn.addEventListener('click', () => navigateCalendar(1));
    }
    
    // Date selection with enhanced feedback
    calendarDates.forEach(dateElement => {
        dateElement.addEventListener('click', function() {
            selectCalendarDate(this, eventDateField);
        });
        
        // Hover effects
        dateElement.addEventListener('mouseenter', function() {
            if (!this.classList.contains('booked')) {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = '#e9f4ff';
            }
        });
        
        dateElement.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Update calendar display based on form date input
    if (eventDateField) {
        eventDateField.addEventListener('change', function() {
            highlightSelectedDate(this.value);
        });
    }
}

// Calendar Date Selection
function selectCalendarDate(dateElement, eventDateField) {
    // Clear previous selection
    document.querySelectorAll('.calendar-date').forEach(d => {
        d.classList.remove('selected');
        d.style.transform = 'scale(1)';
        d.style.backgroundColor = '';
    });
    
    // Select new date
    dateElement.classList.add('selected');
    dateElement.style.backgroundColor = 'var(--primary-color)';
    dateElement.style.color = 'white';
    dateElement.style.transform = 'scale(1.05)';
    
    // Update form field
    const day = parseInt(dateElement.textContent, 10);
    const currentMonth = getCurrentCalendarMonth();
    const currentYear = getCurrentCalendarYear();
    
    const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    eventDateField.value = formattedDate;
    
    // Validate the field
    validateField(eventDateField);
    
    // Show selection feedback
    showDateSelectionFeedback(dateElement);
}

// Dynamic Pricing Calculator
function initDynamicPricing() {
    const eventTypeField = document.getElementById('event-type');
    const guestsField = document.getElementById('guests');
    const budgetField = document.getElementById('budget');
    const servicesCheckboxes = document.querySelectorAll('input[name="services[]"]');
    
    // Create pricing display
    createPricingDisplay();
    
    // Update pricing on field changes
    [eventTypeField, guestsField, budgetField].forEach(field => {
        if (field) {
            field.addEventListener('change', updatePricingEstimate);
            field.addEventListener('input', debounce(updatePricingEstimate, 500));
        }
    });
    
    servicesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePricingEstimate);
    });
}

// Create Pricing Display Widget
function createPricingDisplay() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    const pricingWidget = document.createElement('div');
    pricingWidget.className = 'pricing-widget';
    pricingWidget.innerHTML = `
        <h3>Estimated Cost</h3>
        <div class="pricing-breakdown">
            <div class="price-item">
                <span>Base Package</span>
                <span id="base-price">$0</span>
            </div>
            <div class="price-item">
                <span>Additional Services</span>
                <span id="services-price">$0</span>
            </div>
            <div class="price-item">
                <span>Guest Count Adjustment</span>
                <span id="guest-adjustment">$0</span>
            </div>
            <div class="price-total">
                <span>Total Estimate</span>
                <span id="total-price">$0</span>
            </div>
        </div>
        <p class="pricing-note">*This is an estimated cost. Final pricing will be provided after consultation.</p>
    `;
    
    sidebar.insertBefore(pricingWidget, sidebar.firstChild);
}

// Update Pricing Estimate
function updatePricingEstimate() {
    const eventType = document.getElementById('event-type')?.value;
    const guests = parseInt(document.getElementById('guests')?.value) || 0;
    const selectedServices = Array.from(document.querySelectorAll('input[name="services[]"]:checked'));
    
    // Base pricing by event type
    const basePrices = {
        'wedding': 2500,
        'corporate': 1800,
        'birthday': 1200,
        'anniversary': 1500,
        'graduation': 1000,
        'social': 1300,
        'other': 1400
    };
    
    // Service pricing
    const servicePrices = {
        'planning': 500,
        'decor': 800,
        'catering': 45, // per person
        'entertainment': 600,
        'photography': 750,
        'transportation': 300
    };
    
    let basePrice = basePrices[eventType] || 0;
    let servicesPrice = 0;
    let guestAdjustment = 0;
    
    // Calculate services cost
    selectedServices.forEach(service => {
        const serviceValue = service.value;
        if (serviceValue === 'catering') {
            servicesPrice += servicePrices[serviceValue] * guests;
        } else {
            servicesPrice += servicePrices[serviceValue] || 0;
        }
    });
    
    // Guest count adjustment (for venues and logistics)
    if (guests > 50) {
        guestAdjustment = Math.floor((guests - 50) / 25) * 200;
    }
    
    const total = basePrice + servicesPrice + guestAdjustment;
    
    // Update display
    animatePriceUpdate('base-price', `$${basePrice.toLocaleString()}`);
    animatePriceUpdate('services-price', `$${servicesPrice.toLocaleString()}`);
    animatePriceUpdate('guest-adjustment', `$${guestAdjustment.toLocaleString()}`);
    animatePriceUpdate('total-price', `$${total.toLocaleString()}`);
}

// Animate Price Updates
function animatePriceUpdate(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.style.transform = 'scale(1.1)';
    element.style.color = 'var(--primary-color)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 150);
}

// Form Steps/Progress Enhancement
function initFormSteps() {
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length === 0) return;
    
    // Create progress indicator
    createProgressIndicator();
    
    // Track form completion
    trackFormProgress();
}

// Create Progress Indicator
function createProgressIndicator() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">
            <span id="progress-percentage">0%</span> Complete
        </div>
    `;
    
    bookingForm.insertBefore(progressBar, bookingForm.firstChild);
}

// Track Form Progress
function trackFormProgress() {
    const requiredFields = document.querySelectorAll('[required]');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progress-percentage');
    
    function updateProgress() {
        let completedFields = 0;
        
        requiredFields.forEach(field => {
            if (field.type === 'checkbox') {
                if (field.checked) completedFields++;
            } else if (field.value.trim() !== '') {
                completedFields++;
            }
        });
        
        const percentage = Math.round((completedFields / requiredFields.length) * 100);
        
        if (progressFill && progressText) {
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}%`;
            
            // Change color based on completion
            if (percentage >= 100) {
                progressFill.style.backgroundColor = '#28a745';
            } else if (percentage >= 50) {
                progressFill.style.backgroundColor = '#ffc107';
            } else {
                progressFill.style.backgroundColor = 'var(--primary-color)';
            }
        }
    }
    
    // Update progress on field changes
    requiredFields.forEach(field => {
        field.addEventListener('input', updateProgress);
        field.addEventListener('change', updateProgress);
    });
    
    // Initial progress check
    updateProgress();
}

// Smart Suggestions System
function initSmartSuggestions() {
    const eventTypeField = document.getElementById('event-type');
    const guestsField = document.getElementById('guests');
    
    if (eventTypeField) {
        eventTypeField.addEventListener('change', showEventTypeSuggestions);
    }
    
    if (guestsField) {
        guestsField.addEventListener('input', debounce(showGuestCountSuggestions, 500));
    }
}

// Show Event Type Suggestions
function showEventTypeSuggestions() {
    const eventType = document.getElementById('event-type').value;
    const suggestionsContainer = createSuggestionsContainer();
    
    const suggestions = {
        'wedding': {
            services: ['planning', 'decor', 'catering', 'photography'],
            venues: ['garden-pavilion', 'seaside-terrace'],
            tips: 'Consider booking 6-12 months in advance for the best venue availability.'
        },
        'corporate': {
            services: ['planning', 'catering', 'entertainment'],
            venues: ['grand-hall', 'rooftop-lounge'],
            tips: 'Professional AV equipment and networking opportunities are essential for corporate events.'
        },
        'birthday': {
            services: ['decor', 'catering', 'entertainment'],
            venues: ['crystal-ballroom', 'rooftop-lounge'],
            tips: 'Themed decorations and interactive entertainment work great for birthday celebrations.'
        }
    };
    
    const suggestion = suggestions[eventType];
    if (suggestion) {
        showSuggestion(suggestionsContainer, suggestion, eventType);
    }
}

// Form Storage for Draft Saving
function initFormStorage() {
    const form = document.getElementById('booking-form');
    const formFields = form.querySelectorAll('input, select, textarea');
    
    // Load saved data on page load
    loadFormData();
    
    // Save data on field changes
    formFields.forEach(field => {
        field.addEventListener('input', debounce(saveFormData, 1000));
        field.addEventListener('change', saveFormData);
    });
    
    // Add draft notification
    showDraftNotification();
}

// Save Form Data (using sessionStorage alternative)
function saveFormData() {
    const form = document.getElementById('booking-form');
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Store in memory (since localStorage is not available)
    window.bookingFormDraft = data;
    
    // Show save indicator
    showSaveIndicator();
}

// Load Form Data
function loadFormData() {
    if (window.bookingFormDraft) {
        const data = window.bookingFormDraft;
        
        Object.entries(data).forEach(([key, value]) => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    field.checked = value === 'on' || value === field.value;
                } else {
                    field.value = value;
                }
            }
        });
        
        // Show draft loaded notification
        showDraftLoadedNotification();
    }
}

// File Upload Enhancement (if needed for future use)
function initFileUpload() {
    // Create file upload area for inspiration images/documents
    const additionalInfoGroup = document.querySelector('textarea#event-description').closest('.form-group');
    
    const fileUploadHTML = `
        <div class="form-group full-width">
            <label>Upload Inspiration Images or Documents (Optional)</label>
            <div class="file-upload-area" id="fileUploadArea">
                <div class="upload-placeholder">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop files here or <span class="upload-link">browse</span></p>
                    <input type="file" id="fileInput" multiple accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" style="display: none;">
                </div>
                <div class="uploaded-files" id="uploadedFiles"></div>
            </div>
        </div>
    `;
    
    additionalInfoGroup.insertAdjacentHTML('afterend', fileUploadHTML);
    
    // Initialize file upload functionality
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadLink = document.querySelector('.upload-link');
    
    if (fileUploadArea && fileInput && uploadLink) {
        // Click to browse
        uploadLink.addEventListener('click', () => fileInput.click());
        
        // Drag and drop functionality
        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('drop', handleFileDrop);
        
        // File input change
        fileInput.addEventListener('change', handleFileSelect);
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'Field';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function validateAllFields(form) {
    const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    return data;
}

function showSuccessMessage() {
    const successModal = createModal('Success!', 
        'Thank you for your booking request! Our event planning team will contact you within 24 hours to discuss your event details.',
        'success'
    );
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        successModal.remove();
    }, 5000);
}

function showValidationError() {
    const errorModal = createModal('Please Complete Required Fields', 
        'Some required fields are missing or contain invalid information. Please check the highlighted fields and try again.',
        'error'
    );
    document.body.appendChild(errorModal);
    
    setTimeout(() => {
        errorModal.remove();
    }, 4000);
}

function createModal(title, message, type) {
    const modal = document.createElement('div');
    modal.className = `booking-modal ${type}`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
        </div>
    `;
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

function resetForm(form) {
    form.reset();
    
    // Clear all validation states
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
        clearFieldError(field);
    });
    
    // Reset calendar selection
    document.querySelectorAll('.calendar-date.selected').forEach(date => {
        date.classList.remove('selected');
        date.style.backgroundColor = '';
        date.style.color = '';
        date.style.transform = 'scale(1)';
    });
    
    // Reset pricing
    updatePricingEstimate();
}

function clearFormStorage() {
    delete window.bookingFormDraft;
}

function showSaveIndicator() {
    // Create or update save indicator
    let indicator = document.getElementById('saveIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'saveIndicator';
        indicator.className = 'save-indicator';
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = 'Draft saved';
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

function getCurrentCalendarMonth() {
    return 4; // April
}

function getCurrentCalendarYear() {
    return 2025;
}

function highlightSelectedDate(dateValue) {
    // Implementation for highlighting date in calendar based on form input
    console.log('Highlighting date:', dateValue);
}

function showDateSelectionFeedback(dateElement) {
    // Create ripple effect for date selection
    const ripple = document.createElement('div');
    ripple.className = 'date-ripple';
    dateElement.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add Enhanced Styles
function addEnhancedStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Enhanced Booking Form Styles */
        .floating-label-wrapper {
            position: relative;
            margin-bottom: 20px;
        }
        
        .floating-label-wrapper label {
            position: absolute;
            top: 12px;
            left: 15px;
            transition: all 0.3s ease;
            pointer-events: none;
            color: #999;
            background: white;
            padding: 0 5px;
            z-index: 1;
        }
        
        .floating-label-wrapper.focused label {
            top: -8px;
            left: 10px;
            font-size: 12px;
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .field-error {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            display: none;
            animation: slideDown 0.3s ease;
        }
        
        .form-input.error, .form-select.error, .form-textarea.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }
        
        .form-input.success, .form-select.success, .form-textarea.success {
            border-color: #28a745;
            box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Loading Button */
        .btn-submit.loading {
            position: relative;
            color: transparent;
        }
        
        .btn-submit.loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-left: -10px;
            margin-top: -10px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Form Progress */
        .form-progress {
            margin-bottom: 30px;
            text-align: center;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--primary-color);
            width: 0%;
            transition: width 0.3s ease, background-color 0.3s ease;
            border-radius: 4px;
        }
        
        .progress-text {
            font-size: 14px;
            color: #666;
            font-weight: 500;
        }
        
        /* Pricing Widget */
        .pricing-widget {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                    }
                `;
                document.head.appendChild(styleElement);
            }