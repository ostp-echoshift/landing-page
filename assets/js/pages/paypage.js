/* paypage.js — OSTP @echoShift — Placeholder */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[OSTP Paypage] Inicializado');
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = { nombre: document.getElementById('nombre')?.value, email: document.getElementById('email')?.value, dim: document.getElementById('dim')?.value, amount: document.getElementById('amount')?.value || '1500', metodo: document.querySelector('input[name="metodo"]:checked')?.value || 'card' };
      try { const result = await OSTP_API.processPayment(data); if (result.success) window.location.href = result.redirect || 'gracias.html'; } catch (error) { console.error('[OSTP Paypage] Error:', error); }
    });
  }
});