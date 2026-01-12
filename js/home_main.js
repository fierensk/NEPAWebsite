// /main/main.js

// ---------- Particles ----------
const particlesEl = document.getElementById('particles');
if (particlesEl) {
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
    s.style.animationDelay = (Math.random() * 10) + 's';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    particlesEl.appendChild(s);
  }
}

// ---------- Mobile menu ----------
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('active');
}

const menuToggle = document.getElementById('menuToggle');
if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

// ---------- Carousel (only if present) ----------
const carouselWrapper = document.getElementById('carouselWrapper');
const dotsEl = document.getElementById('dots');
const carouselContainer = document.querySelector('.carousel-container');

let currentSlide = 0;
let autoplay = null;

function getTotalSlides() {
  if (!carouselWrapper) return 0;
  return carouselWrapper.querySelectorAll('.carousel-slide').length;
}

function updateCarousel(totalSlides) {
  if (!carouselWrapper) return;
  carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
  autoplay = null;
}

function startAutoplay(totalSlides) {
  stopAutoplay();
  if (totalSlides <= 1) return;
  autoplay = setInterval(() => moveSlide(1, totalSlides), 5000);
}

function resetAutoplay(totalSlides) {
  startAutoplay(totalSlides);
}

function moveSlide(dir, totalSlides) {
  if (totalSlides <= 0) return;
  currentSlide += dir;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateCarousel(totalSlides);
  resetAutoplay(totalSlides);
}

function goToSlide(index, totalSlides) {
  currentSlide = index;
  updateCarousel(totalSlides);
  resetAutoplay(totalSlides);
}

function initCarousel() {
  if (!carouselWrapper || !dotsEl || !carouselContainer) return;

  const totalSlides = getTotalSlides();
  if (totalSlides <= 0) return;

  // Build dots
  dotsEl.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i, totalSlides));
    dotsEl.appendChild(dot);
  }

  // Buttons (supports both inline onclick legacy and data attributes if present)
  const prevBtn = document.querySelector('[data-carousel="prev"]') || document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('[data-carousel="next"]') || document.querySelector('.carousel-btn.next');

  if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1, totalSlides));
  if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1, totalSlides));

  // Pause on hover
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', () => startAutoplay(totalSlides));

  // Touch support
  let touchStart = 0;
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientX;
  });
  carouselContainer.addEventListener('touchend', (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveSlide(diff > 0 ? 1 : -1, totalSlides);
  });

  startAutoplay(totalSlides);
}

initCarousel();
