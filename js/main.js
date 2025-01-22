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

// Component filtering
const filterButtons = document.querySelectorAll('.component-filters .btn');
const componentsContainer = document.getElementById('components-container');

// Sample components data
const componentsFilter = [
    {
        name: 'KButton',
        category: 'buttons',
        description: 'A customizable button with various styles and states',
        preview: `KButton(
    text: 'Click Me',
    onPressed: () => {},
)`,
    },
    {
        name: 'KCard',
        category: 'cards',
        description: 'A flexible card component with multiple variants',
        preview: `KCard(
    child: Column(
        children: [
            Text('Card Title'),
            Text('Card content goes here'),
        ],
    ),
)`,
    },
    {
        name: 'KInput',
        category: 'inputs',
        description: 'A modern text input field with built-in validation',
        preview: `KInput(
    label: 'Username',
    onChanged: (value) => {},
)`,
    },
];

// Filter components
function filterComponents(category) {
    const filteredComponents = category === 'all' 
        ? componentsFilter 
        : componentsFilter.filter(comp => comp.category === category);
    
    componentsContainer.innerHTML = '';
    
    filteredComponents.forEach(comp => {
        const componentCard = createComponentCardFilter(comp);
        componentsContainer.appendChild(componentCard);
    });
}

// Create component card
function createComponentCardFilter(component) {
    const col = document.createElement('div');
    col.className = 'col-lg-6 mb-4';
    
    col.innerHTML = `
        <div class="component-card">
            <div class="component-preview">
                <pre><code>${component.preview}</code></pre>
            </div>
            <div class="component-info p-4">
                <h3>${component.name}</h3>
                <p>${component.description}</p>
                <a href="docs.html#${component.name.toLowerCase()}" class="btn btn-primary">Learn More</a>
            </div>
        </div>
    `;
    
    return col;
}

// Initialize components page if on components.html
if (window.location.pathname.includes('components.html')) {
    // Initial load of all components
    filterComponents('all');
    
    // Add click handlers for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter components
            const category = button.getAttribute('data-filter');
            filterComponents(category);
        });
    });
}

// Documentation search functionality
const searchInput = document.querySelector('.docs-search input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.docs-section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
}
