/* navbar.js — OSTP @echoShift — Placeholder */
'use strict';
const OSTP_Navbar = {
  isOpen: false, isHidden: false, lastScroll: 0,
  init: function(selector = '.navbar') {
    this.navbar = document.querySelector(selector);
    if (!this.navbar) return;
    this.hamburger = this.navbar.querySelector('.hamburger');
    this.navLinks = this.navbar.querySelector('.navbar-nav');
    this.setupHamburger(); this.setupScroll(); this.setupActiveLink();
  },
  setupHamburger: function() {
    if (!this.hamburger) return;
    this.hamburger.addEventListener('click', () => { this.toggle(); });
    if (this.navLinks) { this.navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { if (window.innerWidth <= 768) this.close(); }); }); }
  },
  toggle: function() { this.isOpen = !this.isOpen; this.hamburger.classList.toggle('open', this.isOpen); if (this.navLinks) this.navLinks.classList.toggle('open', this.isOpen); },
  open: function() { if (this.isOpen) return; this.isOpen = true; this.hamburger.classList.add('open'); if (this.navLinks) this.navLinks.classList.add('open'); },
  close: function() { if (!this.isOpen) return; this.isOpen = false; this.hamburger.classList.remove('open'); if (this.navLinks) this.navLinks.classList.remove('open'); },
  setupScroll: function() { let ticking = false; window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(() => { this.handleScroll(); ticking = false; }); ticking = true; } }); },
  handleScroll: function() { const currentScroll = window.pageYOffset; if (currentScroll > this.lastScroll && currentScroll > 100) { this.navbar.style.transform = 'translateY(-100%)'; this.isHidden = true; } else { this.navbar.style.transform = 'translateY(0)'; this.isHidden = false; } if (currentScroll > 10) this.navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)'; else this.navbar.style.boxShadow = 'none'; this.lastScroll = currentScroll; },
  setupActiveLink: function() { if (!this.navLinks) return; const currentPath = window.location.pathname; this.navLinks.querySelectorAll('a').forEach(link => { const href = link.getAttribute('href'); if (href) { if (currentPath.includes(href.replace('/', '')) && href !== 'index.html') link.classList.add('active'); else if (href === 'index.html' && (currentPath === '/' || currentPath === '')) link.classList.add('active'); } }); },
  show: function() { this.navbar.style.transform = 'translateY(0)'; this.isHidden = false; },
  hide: function() { this.navbar.style.transform = 'translateY(-100%)'; this.isHidden = true; }
};
document.addEventListener('DOMContentLoaded', () => { OSTP_Navbar.init(); });
window.OSTP_Navbar = OSTP_Navbar;