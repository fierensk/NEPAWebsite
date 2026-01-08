// /main/main.js

// Particles - Stars and Shooting Stars
const particlesEl = document.getElementById('particles');

// Create twinkling stars
for (let i = 0; i < 100; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 4 + 's';
  p.style.animationDuration = (3 + Math.random() * 3) + 's';
  particlesEl.appendChild(p);
}

// Create occasional shooting stars
for (let i = 0; i < 5; i++) {
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.left = (60 + Math.random() * 40) + '%';
  s.style.top = Math.random() * 40 + '%';
  s.style.animationDelay = Math.random() * 10 + 's';
  s.style.animationDuration = (2 + Math.random() * 2) + 's';
  particlesEl.appendChild(s);
}

// Carousel
let currentSlide = 0;
const totalSlides = 11;
let autoplay = null;

function initCarousel() {
  const dotsEl = document.getElementById('dots');

  // Build dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(dot);
  }

  // Buttons
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');
  if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

  startAutoplay();

  // Pause on hover
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', () => stopAutoplay());
    container.addEventListener('mouseleave', () => startAutoplay());

    // Touch support
    let touchStart = 0;
    container.addEventListener('touchstart', (e) => {
      touchStart = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) moveSlide(diff > 0 ? 1 : -1);
    });
  }
}

function moveSlide(dir) {
  currentSlide += dir;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateCarousel();
  resetAutoplay();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoplay();
}

function updateCarousel() {
  const wrapper = document.getElementById('carouselWrapper');
  if (wrapper) wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function startAutoplay() {
  stopAutoplay();
  autoplay = setInterval(() => moveSlide(1), 5000);
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
  autoplay = null;
}

function resetAutoplay() {
  startAutoplay();
}

// Mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('active');
}

// Wire up menu toggle
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

// Init
initCarousel();
