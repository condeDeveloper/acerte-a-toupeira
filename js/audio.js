// Sons sintetizados com WebAudio
const Sound = (() => {
  let ctx;
  function tone(freq, dur, type = 'square', vol = 0.06) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  return {
    pop:  () => tone(500, 0.05, 'triangle', 0.03),
    hit:  (combo) => tone(600 + combo * 80, 0.1, 'square'),
    gold: () => [800, 1000, 1300].forEach((f, i) => setTimeout(() => tone(f, 0.1, 'triangle', 0.07), i * 60)),
    bomb: () => tone(90, 0.4, 'sawtooth', 0.09),
    miss: () => tone(200, 0.06, 'sawtooth', 0.03),
    tick: () => tone(1200, 0.04, 'square', 0.03),
    end:  () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.15, 'square', 0.05), i * 100)),
  };
})();
