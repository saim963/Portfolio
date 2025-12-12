// Premium Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initCustomCursor();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initNavigation();
    initProjectHoverEffects();
    initReducedMotionHandling();
    initBackgroundMedia();
});

// Initialize background media for sections
function initBackgroundMedia() {
    // Preload background images to ensure smooth experience
    const backgroundImages = [
        'res/background-ambience.mp4',
        'res/background-texture.jpg',
        'res/hero-bg.jpg',
        'res/hero-visual.png',
        'res/project1-bg.jpg',
        'res/project1-visual.png',
        'res/project2-bg.jpg',
        'res/project2-visual.png',
        'res/project3-bg.jpg',
        'res/project3-visual.png',
        'res/process-bg.jpg',
        'res/contact-bg.jpg',
        'res/form-bg.jpg'
    ];

    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Set up video background controls
    const video = document.querySelector('.background-video');
    if (video) {
        // Handle video loading and error
        video.addEventListener('error', function() {
            console.log('Background video failed to load, switching to image');
            // Hide video and show image as fallback
            video.style.display = 'none';
            const bgImage = document.querySelector('.background-image');
            if (bgImage) {
                bgImage.style.display = 'block';
            }
        });
    }
}

// Custom Cursor Effect
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card');
    
    if (cursor) {
        // Show cursor when mouse moves
        document.addEventListener('mousemove', (e) => {
            cursor.style.visibility = 'visible';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add class to body to indicate cursor is active
            document.body.classList.add('cursor-active');
        });
        
        // Hide cursor when mouse stops
        document.addEventListener('mouseout', () => {
            cursor.style.visibility = 'hidden';
            document.body.classList.remove('cursor-active');
        });
        
        // Enlarge cursor on links
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset to account for fixed header
                const offset = 80; // Height of the fixed navigation
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetSection.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations for Elements
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Remove observer after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements that should fade in
    document.querySelectorAll('.project-card, .process-step, .skill-category, .about-text, .contact-info, .contact-form-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Observe title lines for staggered animation
    document.querySelectorAll('.title-line').forEach((line, index) => {
        line.classList.add('fade-in');
        line.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(line);
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send the data to a server here
            // For this demo, we'll just show a success message
            showSuccess('Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        });
    }
}

// Show error message
function showError(message) {
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    errorEl.style.color = '#FF6B6B';
    errorEl.style.marginTop = '10px';
    errorEl.style.fontSize = '0.9rem';
    
    // Remove any existing error messages
    const existingError = document.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Add error message to form
    const form = document.querySelector('.contact-form');
    form.appendChild(errorEl);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorEl.parentNode) {
            errorEl.parentNode.removeChild(errorEl);
        }
    }, 5000);
}

// Show success message
function showSuccess(message) {
    // Create success element
    const successEl = document.createElement('div');
    successEl.className = 'form-success';
    successEl.textContent = message;
    successEl.style.color = '#4ECDC4';
    successEl.style.marginTop = '10px';
    successEl.style.fontSize = '0.9rem';
    
    // Remove any existing messages
    const existingSuccess = document.querySelector('.form-success');
    const existingError = document.querySelector('.form-error');
    if (existingSuccess) existingSuccess.remove();
    if (existingError) existingError.remove();
    
    // Add success message to form
    const form = document.querySelector('.contact-form');
    form.appendChild(successEl);
    
    // Remove success after 5 seconds
    setTimeout(() => {
        if (successEl.parentNode) {
            successEl.parentNode.removeChild(successEl);
        }
    }, 5000);
}

// Navigation Handling
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? 'Close' : 'Menu';
        });
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Project Card Hover Effects
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle animation to project elements
            const title = card.querySelector('h3');
            const link = card.querySelector('.project-link');
            
            if (title) {
                title.style.transform = 'translateY(-5px)';
            }
            
            if (link) {
                link.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('h3');
            const link = card.querySelector('.project-link');
            
            if (title) {
                title.style.transform = 'translateY(0)';
            }
            
            if (link) {
                link.style.transform = 'translateX(0)';
            }
        });
    });
}

// Reduced Motion Handling
function initReducedMotionHandling() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Apply reduced motion settings based on user preference
    const applyReducedMotion = (reduce) => {
        if (reduce) {
            document.documentElement.style.setProperty('scroll-behavior', 'auto');
            document.body.classList.add('reduced-motion');
        } else {
            document.documentElement.style.setProperty('scroll-behavior', 'smooth');
            document.body.classList.remove('reduced-motion');
        }
    };
    
    // Apply initial setting
    applyReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
        applyReducedMotion(e.matches);
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
}

// Initialize parallax if needed
// Uncomment the following line if you want to enable parallax
// initParallax();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handling
window.addEventListener('scroll', throttle(() => {
    // Any scroll-dependent function can be placed here
    // Using throttle to limit execution
}, 100));