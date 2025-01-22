// Sample components data - Replace with your actual components
const components = [
    {
        name: 'Custom Button',
        description: 'A beautiful and customizable button widget with various styles and animations.',
        previewImage: 'https://via.placeholder.com/300x200?text=Button+Preview',
        category: 'Buttons',
        tags: ['UI', 'Interactive']
    },
    {
        name: 'Card View',
        description: 'Modern card widget with customizable shadows and transitions.',
        previewImage: 'https://via.placeholder.com/300x200?text=Card+Preview',
        category: 'Layout',
        tags: ['UI', 'Container']
    },
    {
        name: 'Progress Indicator',
        description: 'Animated progress indicators with multiple styles.',
        previewImage: 'https://via.placeholder.com/300x200?text=Progress+Preview',
        category: 'Indicators',
        tags: ['Animation', 'Feedback']
    }
];

// Function to handle smooth scrolling
function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 60; // Account for fixed header
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Function to load components with animation
function loadComponents() {
    const grid = document.getElementById('components-grid');
    grid.innerHTML = ''; // Clear existing content
    
    components.forEach((component, index) => {
        const componentElement = createComponentCard(component);
        componentElement.style.opacity = '0';
        componentElement.style.transform = 'translateY(20px)';
        grid.appendChild(componentElement);
        
        // Animate component entry with delay based on index
        setTimeout(() => {
            componentElement.style.transition = 'all 0.5s ease';
            componentElement.style.opacity = '1';
            componentElement.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Function to create a component card
function createComponentCard(component) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    
    col.innerHTML = `
        <div class="component-card">
            <div class="component-preview">
                <img src="${component.previewImage}" alt="${component.name}" class="img-fluid">
            </div>
            <div class="component-info">
                <h3>${component.name}</h3>
                <p>${component.description}</p>
                <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-primary">${component.category}</span>
                    ${component.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Theme handling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event listeners for theme
themeToggle.addEventListener('click', toggleTheme);
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Load components
    loadComponents();
    
    // Animate number counters
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 30; // Divide animation into 30 steps
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.round(current);
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 50);
    });

    // Handle smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Add scroll reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        observer.observe(section);
    });
});
