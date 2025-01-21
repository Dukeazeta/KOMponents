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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
