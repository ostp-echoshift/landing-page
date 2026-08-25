/* service.js — OSTP @echoShift — Placeholder */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[OSTP Service] Controlador cargado');
  const filterButtons = document.querySelectorAll('.catalog-filters button');
  const serviceCards = document.querySelectorAll('.catalog-card, .service-card');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        serviceCards.forEach(card => {
          const category = card.dataset.category || card.dataset.dim;
          if (filter === 'all' || category === filter) { card.style.display = 'block'; } else { card.style.display = 'none'; }
        });
      });
    });
  }
  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      serviceCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }
  serviceCards.forEach((card, i) => { card.style.animationDelay = (i * 0.06) + 's'; });
});
window.OSTP_Service = { version: '1.0' };