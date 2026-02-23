const projectData = [
    {
        title: "Alpha Dashboard",
        desc: "A clean and functional metrics dashboard.",
        tags: ["React", "D3.js"]
    },
    {
        title: "Beta E-Shop",
        desc: "Modern e-commerce platform with fast checkout.",
        tags: ["Next.js", "Stripe"]
    },
    {
        title: "Gamma Mobile App",
        desc: "Native-feeling mobile experience for tracking tasks.",
        tags: ["React Native", "Firebase"]
    }
];

function loadProjects() {
    const container = document.getElementById('projects-container');

    // Color mapping for different technologies
    const tagColors = {
        'React': { bg: 'rgba(97, 218, 251, 0.1)', color: '#61dafb' },
        'Next.js': { bg: 'rgba(0, 0, 0, 0.3)', color: '#ffffff' },
        'D3.js': { bg: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b' },
        'Stripe': { bg: 'rgba(102, 126, 234, 0.1)', color: '#667eea' },
        'React Native': { bg: 'rgba(78, 205, 196, 0.1)', color: '#4ecdc4' },
        'Firebase': { bg: 'rgba(255, 193, 77, 0.1)', color: '#ffc14d' }
    };

    projectData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                ${p.tags.map(t => {
                    const colors = tagColors[t] || { bg: 'rgba(37, 71, 244, 0.1)', color: '#2547f4' };
                    return `<span style="font-size: 0.8rem; background: ${colors.bg}; color: ${colors.color}; padding: 0.2rem 0.6rem; border-radius: 100px; border: 1px solid ${colors.color}20;">${t}</span>`;
                }).join('')}
            </div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <a href="https://github.com/Denysekkk" style="color: #667eea; text-decoration: none; font-weight: 600; display: inline-block; margin-top: 1.5rem; transition: color 0.3s; position: relative;">Learn More →<span style="position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: var(--gradient-primary); transition: width 0.3s;"></span></a>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    observer.observe(section);
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

// Update scroll progress bar
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / maxScroll) * 100;

    scrollProgressBar.style.width = `${scrollPercent}%`;
}

// Click handler for scroll indicator
scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#about');
    const headerOffset = 80;
    const elementPosition = nextSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});
let scrollTimeout;

function updateScrollIndicator() {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrolled / maxScroll;

    // Change opacity based on scroll position
    const opacity = Math.max(0.3, 1 - scrollPercent * 2);
    scrollIndicator.style.opacity = opacity;

    // Hide indicator after scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        }
    }, 2000);
}

// Parallax effect for hero background
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Throttle scroll events
let scrollThrottle;
window.addEventListener('scroll', () => {
    if (!scrollThrottle) {
        scrollThrottle = setTimeout(() => {
            updateScrollIndicator();
            updateParallax();
            updateScrollProgress();
            scrollThrottle = null;
        }, 16); // ~60fps
    }
});

// Smooth scroll with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
