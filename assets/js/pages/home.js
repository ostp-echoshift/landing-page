/* home.js — OSTP @echoShift — Placeholder */
document.addEventListener('DOMContentLoaded', function() {
  console.log('[OSTP Home] Controlador cargado');
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() { this.classList.toggle('active'); navMenu.classList.toggle('mobile-open'); });
    navMenu.querySelectorAll('a').forEach(function(link) { link.addEventListener('click', function() { hamburger.classList.remove('active'); navMenu.classList.remove('mobile-open'); }); });
  }
});
window.OSTP_Home = { version: '1.0' };