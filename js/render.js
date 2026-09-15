// DOM
const Render = {
  init(onHit) {
    this.field = document.getElementById('field');
    this.score = document.getElementById('score');
    this.time = document.getElementById('time');
    this.combo = document.getElementById('combo');
    this.best = document.getElementById('best');
    this.overlay = document.getElementById('overlay');
    this.holes = [];
    for (let i = 0; i < HOLES; i++) {
      const h = document.createElement('div');
      h.className = 'hole';
      h.innerHTML = '<div class="mole"></div>';
      h.addEventListener('pointerdown', e => { e.preventDefault(); onHit(i); });
      this.field.appendChild(h);
      this.holes.push(h);
    }
  },

  up(i, type) {
    const h = this.holes[i];
    h.querySelector('.mole').textContent = TYPES[type].emoji;
    h.classList.remove('hit', 'boom', 'miss');
    h.classList.add('up');
  },
  down(i) { this.holes[i].classList.remove('up'); },
  hit(i, pts) {
    const h = this.holes[i];
    h.dataset.pts = (pts > 0 ? '+' : '') + pts;
    h.classList.remove('up');
    h.classList.add('hit');
    setTimeout(() => h.classList.remove('hit'), 600);
  },
  boom(i) { const h = this.holes[i]; h.classList.remove('up'); h.classList.add('boom'); setTimeout(() => h.classList.remove('boom'), 600); },
  miss(i) { const h = this.holes[i]; h.classList.remove('miss'); void h.offsetWidth; h.classList.add('miss'); },

  hud(score, time, combo, best) {
    this.score.textContent = score;
    this.time.textContent = time;
    this.best.textContent = best;
    this.combo.textContent = 'x' + combo;
    this.combo.classList.toggle('hot', combo > 1);
    if (combo > 1) { this.combo.classList.remove('hot'); void this.combo.offsetWidth; this.combo.classList.add('hot'); }
  },
  showEnd(score, best, isRecord, hits, misses) {
    document.getElementById('ov-title').textContent = isRecord ? '🏆 Novo recorde!' : 'Tempo esgotado!';
    document.getElementById('ov-text').textContent = `${score} pontos · ${hits} acertos · ${misses} erros · recorde ${best}`;
    this.overlay.classList.remove('hidden');
  },
  hideEnd() { this.overlay.classList.add('hidden'); },
  startBtn(enabled) { document.getElementById('start').disabled = !enabled; },
};
