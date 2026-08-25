/**
 * OSTP @echoShift — main.js v2.0
 * Controlador unificado
 */
'use strict';
const OSTP_CONFIG = {
  sessionKey: 'ostp_access',
  restrictedPages: ['contacto.html'],
  dimCount: 8,
  videoExt: '.mp4',
  fallbackImgExt: '.png',
  assetsPath: { clip: 'assets/clip/', img: 'assets/img/', icon: 'assets/icon/' }
};
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const dimMatch = path.match(/dim(\d{2})\.html$/);
  if (dimMatch) { initDimPage(dimMatch[1]); return; }
  if (path.includes('funnel.html')) { initFunnel(); return; }
  if (OSTP_CONFIG.restrictedPages.some(page => path.includes(page))) { validateRestrictedAccess(); }
  initInteractiveLogo();
});
function initDimPage(dimId) {
  console.log(`[OSTP] DIM${dimId} cargado`);
  const setText = (s,t)=>{const el=document.querySelector(s);if(el)el.textContent=t;};
  const setHTML = (s,h)=>{const el=document.querySelector(s);if(el)el.innerHTML=h;};
  setText('#dim-title', 'DIM '+dimId);
  setText('.dim-subtitle', 'Contenido de la dimensión '+dimId);
}
function initFunnel() { console.log('[OSTP] Funnel inicializado'); }
function initInteractiveLogo() { console.log('[OSTP] Logo interactivo inicializado'); }
function validateRestrictedAccess() {
  const hasAccess = sessionStorage.getItem(OSTP_CONFIG.sessionKey) === 'true';
  if (!hasAccess) { sessionStorage.setItem('ostp_redirect_back', window.location.pathname); window.location.href = 'index.html'; return; }
  sessionStorage.setItem('ostp_last_restricted', window.location.pathname);
}
(function injectShockwaveStyles() {
  if (document.getElementById('ostp-shockwave-styles')) return;
  const style = document.createElement('style'); style.id='ostp-shockwave-styles';
  style.textContent = '.shockwave{position:absolute;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,rgba(0,240,255,0.8) 0%,transparent 70%);transform:translate(-50%,-50%) scale(0);animation:shockwave-expand 0.6s ease-out forwards;pointer-events:none;z-index:9999;}@keyframes shockwave-expand{to{transform:translate(-50%,-50%) scale(30);opacity:0;}}@keyframes cardRise{from{opacity:0;transform:var(--base-t,none) translateY(60px);}to{opacity:1;transform:var(--base-t,none) translateY(0);}}.pulse-active{animation:pulseGlow 1.5s ease-in-out infinite;}@keyframes pulseGlow{0%,100%{filter:drop-shadow(0 0 4px currentColor);}50%{filter:drop-shadow(0 0 16px currentColor);}}';
  document.head.appendChild(style);
})();
window.OSTP_API = window.OSTP_API || {};
window.OSTP_API.submitFunnel = window.OSTP_API.submitFunnel || function(p){return Promise.resolve({status:'mock',redirect:'form.html'});};
window.OSTP_API.submitContact = window.submitContact || null;
window.OSTP_API.processPayment = window.processPayment || null;
console.log('[OSTP] main.js v2.0 initialized');