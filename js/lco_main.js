// Particles - Stars and Shooting Stars
const particlesEl = document.getElementById('particles');

// Create twinkling stars
for(let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 4 + 's';
    p.style.animationDuration = (3 + Math.random() * 3) + 's';
    particlesEl.appendChild(p);
}

// Create occasional shooting stars
for(let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'shooting-star';
    s.style.left = (60 + Math.random() * 40) + '%';
    s.style.top = Math.random() * 40 + '%';
    s.style.animationDelay = (Math.random() * 10) + 's';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    particlesEl.appendChild(s);
}

// Mobile menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});