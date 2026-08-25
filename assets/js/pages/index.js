/* index.js — OSTP @echoShift — Placeholder */
document.addEventListener('DOMContentLoaded', function() {
  console.log('[OSTP Index] Controlador cargado');
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function(counter) {
      var target = parseInt(counter.dataset.count);
      if (!target) return;
      var current = 0, suffix = counter.dataset.suffix || '', increment = target / 40;
      var timer = setInterval(function() { current += increment; if (current >= target) { counter.textContent = target + suffix; clearInterval(timer); } else { counter.textContent = Math.floor(current) + suffix; } }, 30);
    });
  }
  function initScrollReveal() {
    var elements = document.querySelectorAll('.stat-item, .section-header, .hex-card');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) { if (entry.isIntersecting) { var el = entry.target; var delay = parseInt(el.dataset.delay) || 0; setTimeout(function() { el.classList.add('visible'); }, delay); observer.unobserve(el); } });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
      elements.forEach(function(el) { observer.observe(el); });
    } else { elements.forEach(function(el) { el.classList.add('visible'); }); }
  }
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() { this.classList.toggle('active'); navMenu.classList.toggle('mobile-open'); });
      navMenu.querySelectorAll('a').forEach(function(link) { link.addEventListener('click', function() { hamburger.classList.remove('active'); navMenu.classList.remove('mobile-open'); }); });
    }
  }
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() { if (window.pageYOffset > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); });
  }
  setTimeout(animateCounters, 500);
  initScrollReveal(); initMobileMenu(); initNavbarScroll();
});
window.OSTP_Index = { version: '1.0' };