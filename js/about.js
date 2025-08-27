// about.js
console.log("✅ About JS is loaded!");

document.addEventListener('DOMContentLoaded', () => {
    const easeOutQuad = (t) => t * (2 - t);

    // ----------------------------
    // Counter Animation
    // ----------------------------
    const statBoxes = document.querySelectorAll('.stat-box h3');
    const counterSpeed = 120;

    statBoxes.forEach(counter => {
        const text = counter.textContent.trim();
        const match = text.match(/\d+/);
        if (!match) return;

        const target = parseInt(match[0]);
        const suffix = text.replace(match[0], '');

        counter.style.opacity = '0';
        counter.style.transform = 'translateX(60px)';
        counter.setAttribute('aria-live', 'polite');
        counter.classList.add('counter');

        const animateCounter = () => {
            let frame = 0;
            const totalFrames = counterSpeed;

            const update = () => {
                frame++;
                const progress = easeOutQuad(frame / totalFrames);
                const current = Math.round(target * progress);
                counter.textContent = current + suffix;

                if (frame < totalFrames) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
            counter.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            counter.style.opacity = '1';
            counter.style.transform = 'translateX(0)';
        };

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                obs.unobserve(counter);
            }
        }, { threshold: 0.6 });

        observer.observe(counter);
    });

    // ----------------------------
    // Section Fade-in
    // ----------------------------
    const sections = document.querySelectorAll('.our-story, .mission-vision, .our-values, .meet-team, .our-process, .testimonials, .cta-section');
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
    // Team Member Animation
    // ----------------------------
    const teamCards = document.querySelectorAll('.team-member');
    teamCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
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

        card.addEventListener('focus', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('blur', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // ----------------------------
    // Testimonial Cards
    // ----------------------------
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.2}s`;

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                obs.unobserve(card);
            }
        }, { threshold: 0.3 });

        observer.observe(card);
    });

    // ----------------------------
    // CTA Buttons
    // ----------------------------
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
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
});

// ----------------------------
// Keyboard Support for Team Cards
// ----------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('team-member')) {
            focused.style.transform = 'scale(1.05)';
            setTimeout(() => focused.style.transform = 'scale(1)', 300);
        }
    }
});
