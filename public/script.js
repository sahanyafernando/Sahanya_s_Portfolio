// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Get saved theme or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.opacity = '0.95';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.opacity = '1';
        navbar.style.boxShadow = 'none';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-submit');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Show loading state
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        formMessage.style.display = 'none';

        try {
            // Determine API endpoint
            const apiEndpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000/api/contact'
                : '/api/contact';

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                formMessage.textContent = data.message || 'Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                // Error
                formMessage.textContent = data.error || 'Something went wrong. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'Network error. Please check your connection and try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced Typing Animation with Cursor
function typeWriter(element, text, speed = 50, callback = null) {
    let i = 0;
    element.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            // Remove cursor, add character, add cursor back
            element.removeChild(cursor);
            element.textContent += text.charAt(i);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor when done
            if (element.contains(cursor)) {
                element.removeChild(cursor);
            }
            if (callback) callback();
        }
    }
    type();
}

// Multi-text typing animation (cycles through multiple texts)
function typeWriterMultiple(element, texts, speed = 50, deleteSpeed = 30, pauseTime = 2000) {
    let textIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Delete characters
            if (charIndex > 0) {
                element.removeChild(cursor);
                element.textContent = currentText.substring(0, charIndex - 1);
                element.appendChild(cursor);
                charIndex--;
                setTimeout(type, deleteSpeed);
            } else {
                // Move to next text
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        } else {
            // Type characters
            if (charIndex < currentText.length) {
                element.removeChild(cursor);
                element.textContent = currentText.substring(0, charIndex + 1);
                element.appendChild(cursor);
                charIndex++;
                setTimeout(type, speed);
            } else {
                // Pause before deleting
                isDeleting = true;
                setTimeout(type, pauseTime);
            }
        }
    }
    type();
}

// Initialize typing animations
document.addEventListener('DOMContentLoaded', () => {
    // Hero name typing animation
    const heroName = document.querySelector('.hero-title .name');
    if (heroName) {
        const originalText = heroName.textContent.trim();
        typeWriter(heroName, originalText, 80);
    }
    
    // Hero title - multiple titles typing animation
    const heroTitles = document.querySelectorAll('.hero-title .title');
    if (heroTitles.length > 0) {
        // First title types normally
        const firstTitle = heroTitles[0];
        const firstTitleText = firstTitle.textContent.trim();
        setTimeout(() => {
            typeWriter(firstTitle, firstTitleText, 60);
        }, 1000);
        
        // Second title types after first
        if (heroTitles.length > 1) {
            const secondTitle = heroTitles[1];
            const secondTitleText = secondTitle.textContent.trim();
            setTimeout(() => {
                typeWriter(secondTitle, secondTitleText, 60);
            }, 2000);
        }
    }
    
    // Hero description typing animation
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent.trim();
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 30);
        }, 3000);
    }
    
    // Section titles typing animation on scroll
    const sectionTitles = document.querySelectorAll('.section-title, .page-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                const originalText = entry.target.textContent.trim();
                entry.target.textContent = '';
                entry.target.style.display = 'inline-block';
                typeWriter(entry.target, originalText, 50, () => {
                    // After typing completes, restore normal display
                    entry.target.style.display = '';
                });
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
});

// Add scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .about-text');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check


