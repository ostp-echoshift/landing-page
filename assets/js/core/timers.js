/**
 * OSTP @echoShift — ostp-timers.js v2.0
 */
'use strict';
const OSTP_Timers = {
  config: { landing: { limit: 5 * 60 * 1000, alertAt: 60 * 1000, key: 'ostp_landing_timer', strict: true }, form: { otpLimit: 15 * 60 * 1000, key: 'ostp_form_otp', onExpire: () => OSTP_Timers.form.reset() }, paypage: { key: 'ostp_paypage_validated' } },
  landing: {
    start: function() { if (sessionStorage.getItem(OSTP_Timers.config.landing.key)) return; sessionStorage.setItem(OSTP_Timers.config.landing.key, Date.now().toString()); OSTP_Timers.landing.renderUI(); OSTP_Timers.landing.tick(); },
    getRemaining: function() { const start = parseInt(sessionStorage.getItem(OSTP_Timers.config.landing.key), 10); if (!start) return OSTP_Timers.config.landing.limit; return Math.max(0, OSTP_Timers.config.landing.limit - (Date.now() - start)); },
    tick: function() {
      const remaining = OSTP_Timers.landing.getRemaining();
      const display = document.getElementById('ostp-timer-display');
      if (display) { const mins = Math.floor(remaining/60000); const secs = Math.floor((remaining%60000)/1000); display.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`; }
      const alertBox = document.getElementById('ostp-timer-alert');
      if (alertBox) {
        if (remaining <= 60000 && remaining > 0) { alertBox.classList.add('active'); if (!alertBox.dataset.pulsing) { alertBox.dataset.pulsing='true'; OSTP_Timers.landing.startPulse(alertBox); } }
        else if (remaining === 0) { alertBox.classList.remove('active'); OSTP_Timers.landing.stopPulse(alertBox); OSTP_Timers.landing.expire(); return; }
        else { alertBox.classList.remove('active'); OSTP_Timers.landing.stopPulse(alertBox); }
      }
      if (remaining > 0) requestAnimationFrame(OSTP_Timers.landing.tick);
    },
    startPulse: function(el) { let state = true; el.dataset.pulseInterval = setInterval(() => { el.style.background = state ? 'linear-gradient(135deg,#ff0000,#ffffff)' : 'linear-gradient(135deg,#ffffff,#ff0000)'; el.style.color = state ? '#ffffff' : '#ff0000'; state = !state; }, 500); },
    stopPulse: function(el) { if (el.dataset.pulseInterval) { clearInterval(el.dataset.pulseInterval); delete el.dataset.pulseInterval; } el.style.background = ''; el.style.color = ''; },
    expire: function() { sessionStorage.removeItem(OSTP_Timers.config.landing.key); sessionStorage.removeItem('ostp_form_data'); sessionStorage.removeItem('ostp_trap_selected'); window.location.href = 'funnel.html?timeout=true&strict=1'; },
    renderUI: function() {
      if (!document.getElementById('ostp-timer-display')) { const timer = document.createElement('div'); timer.id='ostp-timer-display'; timer.style.cssText='position:fixed;top:16px;right:24px;z-index:9999;background:rgba(6,6,10,0.95);color:#00f0ff;font-family:Orbitron,monospace;font-size:0.9rem;font-weight:700;padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);letter-spacing:0.08em;backdrop-filter:blur(8px);'; document.body.appendChild(timer); }
      if (!document.getElementById('ostp-timer-alert')) { const alert = document.createElement('div'); alert.id='ostp-timer-alert'; alert.className='ostp-timer-alert'; alert.style.cssText='position:fixed;top:16px;right:24px;z-index:10000;padding:10px 20px;border-radius:8px;font-weight:700;font-family:Orbitron,monospace;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;display:none;animation:none;'; alert.innerHTML='<i class="fas fa-exclamation-triangle"></i> 01:00'; document.body.appendChild(alert); }
    }
  },
  form: {
    startOTP: function(phone) { const otpData = { phone: phone.replace(/\D/g,''), code: Math.floor(100000 + Math.random() * 900000).toString(), expires: Date.now() + OSTP_Timers.config.form.otpLimit, verified: false }; sessionStorage.setItem(OSTP_Timers.config.form.key, JSON.stringify(otpData)); console.log(`[OSTP_OTP] Codigo para ${otpData.phone}: ${otpData.code}`); OSTP_Timers.form.checkExpiry(); },
    verify: function(code) { const otp = JSON.parse(sessionStorage.getItem(OSTP_Timers.config.form.key) || '{}'); if (!otp.code || Date.now() > otp.expires) { OSTP_Timers.form.reset(); return false; } if (code === otp.code) { otp.verified = true; sessionStorage.setItem(OSTP_Timers.config.form.key, JSON.stringify(otp)); sessionStorage.setItem('ostp_access', 'true'); return true; } return false; },
    checkExpiry: function() { const interval = setInterval(() => { const otp = JSON.parse(sessionStorage.getItem(OSTP_Timers.config.form.key) || '{}'); if (!otp.code || Date.now() > otp.expires) { clearInterval(interval); if (!otp.verified) OSTP_Timers.form.reset(); } }, 5000); },
    reset: function() { sessionStorage.removeItem(OSTP_Timers.config.form.key); sessionStorage.removeItem('ostp_form_data'); window.location.href = 'funnel.html?otp_expired=1'; }
  },
  paypage: {
    validate: function(paymentData) { const record = { id: 'OSTP-' + Date.now(), timestamp: new Date().toISOString(), payment: paymentData, status: 'validated', whatsapp_notified: false }; const queue = JSON.parse(sessionStorage.getItem('ostp_sql_queue') || '[]'); queue.push(record); sessionStorage.setItem('ostp_sql_queue', JSON.stringify(queue)); sessionStorage.setItem(OSTP_Timers.config.paypage.key, 'true'); OSTP_Timers.paypage.notifyWhatsApp(record); return true; },
    notifyWhatsApp: function(record) { const message = `✅ PAGO VALIDADO\nID: ${record.id}\nCliente: ${record.payment.nombre}\nServicio: ${record.payment.dim}\nMonto: $${record.payment.amount} MXN`; console.log(`[OSTP_WHATSAPP_BOT] ${message}`); const queue = JSON.parse(sessionStorage.getItem('ostp_sql_queue') || '[]'); const idx = queue.findIndex(r => r.id === record.id); if (idx !== -1) { queue[idx].whatsapp_notified = true; sessionStorage.setItem('ostp_sql_queue', JSON.stringify(queue)); } },
    canAccessContact: function() { return sessionStorage.getItem(OSTP_Timers.config.paypage.key) === 'true'; }
  },
  init: function(segment) { switch(segment) { case 'landing': OSTP_Timers.landing.start(); break; case 'form': break; case 'paypage': break; } }
};
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('service.html')) OSTP_Timers.init('landing');
  if (path.includes('form.html')) OSTP_Timers.init('form');
  if (path.includes('paypage.html')) OSTP_Timers.init('paypage');
});
window.OSTP_Timers = OSTP_Timers;
console.log('[OSTP] ostp-timers.js loaded');