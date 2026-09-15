// Regras e loop
class Game {
  constructor() {
    Render.init(i => this.hit(i));
    this.best = Number(localStorage.getItem(BEST_KEY) || 0);
    this.spawner = new Spawner();
    this.state = 'idle';
    this.active = new Map(); // hole -> { type, until }
    this.score = 0; this.timeLeft = GAME_SECONDS; this.streak = 0;
    Render.hud(0, GAME_SECONDS, 1, this.best);
    document.getElementById('start').addEventListener('click', () => this.start());
    document.getElementById('again').addEventListener('click', () => { Render.hideEnd(); this.start(); });
    window.addEventListener('keydown', e => {
      const n = Number(e.key);
      if (n >= 1 && n <= 9) this.hit(n - 1); // teclado numérico espelha a grade
      if (e.code === 'Enter' && this.state !== 'playing') { Render.hideEnd(); this.start(); }
    });
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  get combo() { return Math.min(COMBO_MAX, 1 + Math.floor(this.streak / COMBO_STEP)); }

  start() {
    this.state = 'playing';
    this.score = 0; this.timeLeft = GAME_SECONDS; this.streak = 0; this.hits = 0; this.misses = 0;
    this.active.forEach((_, i) => Render.down(i));
    this.active.clear();
    this.spawner.timer = 400;
    this.lastTick = Math.ceil(this.timeLeft);
    Render.startBtn(false);
    Render.hud(0, GAME_SECONDS, 1, this.best);
  }

  hit(i) {
    if (this.state !== 'playing') return;
    const a = this.active.get(i);
    if (!a) { this.streak = 0; this.misses++; Render.miss(i); Sound.miss(); Render.hud(this.score, Math.ceil(this.timeLeft), this.combo, this.best); return; }
    this.active.delete(i);
    if (a.type === 'bomb') {
      this.score = Math.max(0, this.score + TYPES.bomb.pts);
      this.streak = 0; this.misses++;
      Render.boom(i); Sound.bomb();
    } else {
      const pts = TYPES[a.type].pts * this.combo;
      this.score += pts; this.streak++; this.hits++;
      Render.hit(i, pts);
      a.type === 'gold' ? Sound.gold() : Sound.hit(this.combo);
    }
    Render.hud(this.score, Math.ceil(this.timeLeft), this.combo, this.best);
  }

  update(dt) {
    this.timeLeft -= dt;
    const shown = Math.max(0, Math.ceil(this.timeLeft));
    if (shown !== this.lastTick) { this.lastTick = shown; if (shown <= 5 && shown > 0) Sound.tick(); Render.hud(this.score, shown, this.combo, this.best); }
    if (this.timeLeft <= 0) return this.end();

    const progress = 1 - this.timeLeft / GAME_SECONDS;
    const now = performance.now();
    // desce as que expiraram (toupeira que escapa quebra o combo)
    for (const [i, a] of [...this.active]) {
      if (now >= a.until) { this.active.delete(i); Render.down(i); if (a.type !== 'bomb') this.streak = 0; }
    }
    const s = this.spawner.update(dt, progress, this.active);
    if (s) { this.active.set(s.hole, { type: s.type, until: now + s.upFor }); Render.up(s.hole, s.type); Sound.pop(); }
  }

  end() {
    this.state = 'over';
    this.active.forEach((_, i) => Render.down(i));
    this.active.clear();
    const isRecord = this.score > this.best;
    if (isRecord) { this.best = this.score; localStorage.setItem(BEST_KEY, this.best); }
    Render.startBtn(true);
    Render.hud(this.score, 0, 1, this.best);
    Sound.end();
    setTimeout(() => Render.showEnd(this.score, this.best, isRecord, this.hits, this.misses), 500);
  }

  loop(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if (this.state === 'playing') this.update(dt);
    requestAnimationFrame(t => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
