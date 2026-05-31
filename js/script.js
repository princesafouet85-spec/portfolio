// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animate-in');

                // If it's a skill bar, trigger the width animation
                const skillProgress = entry.target.querySelectorAll('.skill-progress');
                skillProgress.forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }, delay * 1000);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.animate-ready, .stat-item, .skill-group').forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 14, 26, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        nav.style.position = 'fixed';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
        nav.style.position = 'absolute';
    }
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const setTheme = (mode) => {
    const isDark = mode === 'dark';
    body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', isDark ? 'Basculer en mode clair' : 'Basculer en mode sombre');
    }
    localStorage.setItem('theme', mode);
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
    });
}

const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<>\"']/g, (match) => {
        const entities = { '&': '&amp;', '<': '<', '>': '>', '"': '"', "'": '&#39;' };
        return entities[match];
    });
};

if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const clientName = document.getElementById('name').value.trim() || 'cher client';
        contactForm.hidden = true;
        contactSuccess.hidden = false;
        contactSuccess.classList.add('show', 'animate-in');
        contactSuccess.innerHTML = `
            <h3>Merci ${escapeHtml(clientName)}, votre demande a bien été envoyée&nbsp;!</h3>
            <p>Nous vous répondrons sous 24h.</p>
        `;
    });
}

