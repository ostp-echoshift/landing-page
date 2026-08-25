/* =============================================================================
   amorphous.js — OSTP @echoShift
   Módulo de partículas interactivas
   ============================================================================= */
class AmorphousGraph {
  constructor(canvasId, config = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.config = {
      particleCount: config.particleCount || 50,
      connectionRadius: config.connectionRadius || 140,
      particleRadius: config.particleRadius || 2.5,
      speed: config.speed || 0.4,
      color: config.color || 'rgba(0,240,255,',
      mouseRadius: config.mouseRadius || 150,
      ...config
    };
    this.particles = [];
    this.mouse = { x: null, y: null, radius: this.config.mouseRadius };
    this.resize(); this.init(); this.animate();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouse(e));
    window.addEventListener('mouseleave', () => { this.mouse.x = null; this.mouse.y = null; });
  }
  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w; this.canvas.height = h; this.init();
    }
  }
  handleMouse(e) {
    const r = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - r.left; this.mouse.y = e.clientY - r.top;
  }
  init() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.speed, vy: (Math.random() - 0.5) * this.config.speed,
        radius: Math.random() * 0.8 + this.config.particleRadius * 0.6
      });
    }
  }
  drawParticle(p) {
    this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.config.color + '0.8)'; this.ctx.fill();
  }
  drawConnection(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < this.config.connectionRadius) {
      this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y);
      const o = 1 - dist / this.config.connectionRadius;
      this.ctx.strokeStyle = this.config.color + (o * 0.35) + ')';
      this.ctx.lineWidth = 0.6; this.ctx.stroke();
    }
  }
  updateParticle(p) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
    if (this.mouse.x !== null) {
      const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y, dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < this.mouse.radius) {
        const f = (this.mouse.radius - dist) / this.mouse.radius;
        p.vx += dx * f * 0.02; p.vy += dy * f * 0.02;
      }
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        this.drawConnection(this.particles[i], this.particles[j]);
      }
    }
    for (const p of this.particles) { this.updateParticle(p); this.drawParticle(p); }
    requestAnimationFrame(() => this.animate());
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('amorphous-graph')) {
    new AmorphousGraph('amorphous-graph', {
      particleCount: 50, connectionRadius: 140, speed: 0.4, color: 'rgba(0,240,255,'
    });
  }
});
window.AmorphousGraph = AmorphousGraph;