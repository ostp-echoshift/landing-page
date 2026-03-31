// main.js - OSTP @echoShift - Nivel C

// NAV scroll
var nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Custom cursor (solo si el dispositivo tiene mouse)
var cur  = document.querySelector('.cursor');
var ring = document.querySelector('.cursor-ring');
if (cur && ring && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', function(e) {
        cur.style.transform  = 'translate(' + (e.clientX - 6)  + 'px,' + (e.clientY - 6)  + 'px)';
        ring.style.transform = 'translate(' + (e.clientX - 18) + 'px,' + (e.clientY - 18) + 'px)';
    });
    document.addEventListener('mouseleave', function() { cur.style.opacity='0'; ring.style.opacity='0'; });
    document.addEventListener('mouseenter',  function() { cur.style.opacity='1'; ring.style.opacity='1'; });
    document.querySelectorAll('a,button').forEach(function(el) {
        el.addEventListener('mouseenter', function() { cur.style.transform += ' scale(2)'; ring.style.opacity='0'; });
        el.addEventListener('mouseleave', function() { ring.style.opacity='1'; });
    });
} else {
    if (cur)  cur.style.display  = 'none';
    if (ring) ring.style.display = 'none';
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// Services cards desde services.json
var grid = document.getElementById('grid-services');
if (grid) {
    fetch('data/services.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            grid.innerHTML = data.services.map(function(s) {
                return '<div class="card card-service reveal">' +
                    '<div class="card-icon">' + s.icono + '</div>' +
                    '<h3 class="card-title">' + s.titulo + '</h3>' +
                    '<p class="card-desc">' + s.descripcion + '</p>' +
                    '<a href="#contacto" class="card-cta">' + s.cta + '</a>' +
                    '</div>';
            }).join('');
            // re-observe nuevos elementos reveal
            document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
                revealObs.observe(el);
            });
        })
        .catch(function() { grid.innerHTML = ''; });
}