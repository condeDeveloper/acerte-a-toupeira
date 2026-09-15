// Decide quando, onde e o que aparece
class Spawner {
  constructor() { this.timer = 0; }

  // Interpola um valor entre início e fim conforme o progresso (0..1)
  static lerp([a, b], t) { return a + (b - a) * t; }

  pickType() {
    const total = Object.values(TYPES).reduce((s, t) => s + t.weight, 0);
    let r = Math.random() * total;
    for (const [k, t] of Object.entries(TYPES)) { r -= t.weight; if (r <= 0) return k; }
    return 'mole';
  }

  // Retorna { hole, type, upFor } quando deve aparecer algo, senão null
  update(dt, progress, occupied) {
    this.timer -= dt * 1000;
    if (this.timer > 0) return null;
    this.timer = Spawner.lerp(SPAWN_INTERVAL, progress) * (0.8 + Math.random() * 0.4);
    const maxUp = 1 + Math.round(progress * (MAX_UP - 1));
    if (occupied.size >= maxUp) return null;
    const free = [];
    for (let i = 0; i < HOLES; i++) if (!occupied.has(i)) free.push(i);
    if (!free.length) return null;
    return {
      hole: free[Math.floor(Math.random() * free.length)],
      type: this.pickType(),
      upFor: Spawner.lerp(UP_TIME, progress) * (0.85 + Math.random() * 0.3),
    };
  }
}
