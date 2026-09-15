// Constantes
const HOLES = 9;
const GAME_SECONDS = 30;
const TYPES = {
  mole:  { emoji: '🐹', pts: 10, weight: 70 },
  gold:  { emoji: '🐹✨', pts: 50, weight: 10 },
  bomb:  { emoji: '💣', pts: -30, weight: 20 },
};
// tempo que fica para fora e intervalo entre aparições, do começo ao fim (ms)
const UP_TIME = [1100, 550];
const SPAWN_INTERVAL = [900, 380];
const MAX_UP = 3;           // toupeiras simultâneas no auge
const COMBO_STEP = 3;       // acertos seguidos para subir o multiplicador
const COMBO_MAX = 4;
const BEST_KEY = 'toupeira-best';
