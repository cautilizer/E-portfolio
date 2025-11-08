document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects page loaded');

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


    // Animation for projects appearing needs this code for if I add more projects in the future
    const projectCards = document.querySelectorAll('.project-card');


    // Model functionality
    const model = document.getElementById('projectModel');
    const viewBtns = document.querySelectorAll('.view-btn');
    const closeModel = document.querySelector('.close-model');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Load project details dynamically
            document.getElementById("model-title").innerText = btn.dataset.title;
            document.getElementById("model-description").innerText = btn.dataset.description;
            document.getElementById("model-tech").innerText = btn.dataset.tech;

            // Load key features dynamically from data-features attribute
            const featuresList = document.querySelector(".model-features ul");
            featuresList.innerHTML = ""; // clear old list
            try {
                const features = JSON.parse(btn.dataset.features || "[]");
                features.forEach(f => {
                    const li = document.createElement("li");
                    li.textContent = f;
                    featuresList.appendChild(li);
                });
            } catch (err) {
                console.error("Invalid feature list", err);
            }

            // Load demo/code links
            const demoLink = document.querySelector(".model-links .btn-primary");
            const codeLink = document.querySelector(".model-links .btn-secondary");
            demoLink.href = btn.dataset.demo || "#";
            codeLink.href = btn.dataset.code || "#";

            // Hide buttons if no link provided
            demoLink.style.display = btn.dataset.demo ? "inline-block" : "none";
            codeLink.style.display = btn.dataset.code ? "inline-block" : "none";

            demoLink.textContent = btn.dataset.demoText || "Live Demo";

            model.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModel) {
        closeModel.addEventListener('click', () => {
            model.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close model when clicking outside
    model.addEventListener('click', (e) => {
        if (e.target === model) {
            model.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close model with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && model.classList.contains('active')) {
            model.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Animate project cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
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

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});