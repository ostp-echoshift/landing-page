/* =============================================================================
   neon-logo.js — OSTP @echoShift
   ============================================================================= */
class OSTPNeonLogo {
  constructor(config) {
    this.el = typeof config.element === 'string' ? document.querySelector(config.element) : config.element;
    if (!this.el) throw new Error('[OSTP Neon] Elemento no encontrado');
    this.isPowered = false;
    this.config = { autoPowerOn: config.autoPowerOn ?? true, powerOnDelay: config.powerOnDelay ?? 500, pulseInterval: config.pulseInterval ?? 3000, onPowerOn: config.onPowerOn ?? (()=>{}), onPowerOff: config.onPowerOff ?? (()=>{}) };
    this.pulseTimer = null; this.init();
  }
  init() {
    this.el.classList.add('ostp-neon-logo');
    if (this.config.autoPowerOn) setTimeout(() => { this.powerOn(); }, this.config.powerOnDelay);
    this.el.addEventListener('mouseenter', () => { if (this.isPowered) this.el.style.transform = 'scale(1.03)'; });
    this.el.addEventListener('mouseleave', () => { this.el.style.transform = 'scale(1)'; });
    this.el.addEventListener('click', () => { this.toggle(); });
  }
  powerOn() { if (this.isPowered) return; this.isPowered = true; this.el.classList.add('powered-on'); this.config.onPowerOn(); this.startPulse(); }
  powerOff() { if (!this.isPowered) return; this.isPowered = false; this.el.classList.remove('powered-on'); this.config.onPowerOff(); this.stopPulse(); }
  toggle() { this.isPowered ? this.powerOff() : this.powerOn(); }
  startPulse() {
    if (this.pulseTimer) return; let pulseState = false;
    this.pulseTimer = setInterval(() => {
      pulseState = !pulseState;
      if (pulseState) { this.el.style.filter = 'drop-shadow(0 0 60px rgba(0,240,255,0.7)) drop-shadow(0 0 120px rgba(123,46,218,0.4))'; }
      else { this.el.style.filter = 'drop-shadow(0 0 30px rgba(0,240,255,0.5)) drop-shadow(0 0 60px rgba(123,46,218,0.2))'; }
    }, this.config.pulseInterval / 2);
  }
  stopPulse() { if (this.pulseTimer) { clearInterval(this.pulseTimer); this.pulseTimer = null; this.el.style.filter = ''; } }
  destroy() { this.stopPulse(); this.el.classList.remove('ostp-neon-logo', 'powered-on'); this.el.style.transform = ''; this.el.style.filter = ''; }
}
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-neon-logo]'); const neonLogos = [];
  elements.forEach((el) => {
    try { const neon = new OSTPNeonLogo({ element: el, autoPowerOn: el.dataset.neonAuto !== 'false', powerOnDelay: parseInt(el.dataset.neonDelay || '500'), pulseInterval: parseInt(el.dataset.neonPulse || '3000') }); neonLogos.push(neon); } catch(e) { console.warn('[OSTP Neon] Error:', e); }
  });
  window.OSTP_Neon = { logos: neonLogos, version: '1.0', toggle: (s)=>{const el=document.querySelector(s);if(el)el.classList.toggle('powered-on');}, powerOn: (s)=>{const el=document.querySelector(s);if(el)el.classList.add('powered-on');}, powerOff: (s)=>{const el=document.querySelector(s);if(el)el.classList.remove('powered-on');} };
  if (neonLogos.length > 0) console.log('[OSTP Neon] ' + neonLogos.length + ' logos inicializados');
});
window.OSTPNeonLogo = OSTPNeonLogo;