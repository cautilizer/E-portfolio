document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded');

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Simulate form submission
            console.log('Form submitted:', formData);

            // Show success message
            formSuccess.classList.add('active');

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('active');
            }, 5000);
        });
    }

    // Animate info cards on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // Animate social icons
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icons = entry.target.querySelectorAll('.social-icon');
                icons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                socialObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
        socialIcons.querySelectorAll('.social-icon').forEach(icon => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(20px)';
            icon.style.transition = 'all 0.6s ease';
        });
        socialObserver.observe(socialIcons);
    }

    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Add typing effect to form labels (optional enhancement)
    const labels = document.querySelectorAll('.form-group label');
    labels.forEach(label => {
        label.style.transition = 'color 0.3s ease';
    });

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--primary-color)';
            }
        });

        input.addEventListener('blur', function() {
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--text-primary)';
            }
        });
    });
});