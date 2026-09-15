# 🐹 Acerte a Toupeira

Whack-a-mole de 30 segundos em HTML, CSS e JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/acerte-a-toupeira/

## Rodar local

```bash
npx serve -l 5196 .
```

## Como jogar

- Toque ou clique nas toupeiras assim que aparecerem. Teclas `1` a `9` também funcionam (espelham a grade)
- 🐹 vale 10 · 🐹✨ dourada vale 50 · 💣 bomba tira 30 e zera o combo
- A cada 3 acertos seguidos o multiplicador sobe (até x4). Errar o buraco ou deixar uma escapar zera o combo

## Funcionalidades

- Dificuldade progressiva: aparições mais rápidas, mais curtas e até 3 ao mesmo tempo no fim
- Sorteio ponderado de tipos (70% comum, 20% bomba, 10% dourada)
- Animações de subir, ser acertada, bomba explodindo e erro
- Contagem regressiva com bipes nos últimos 5 segundos
- Recorde no `localStorage`, resumo com acertos e erros

## Estrutura

```
js/config.js    # tipos, tempos e constantes
js/spawner.js   # quando, onde e o que aparece
js/audio.js     # sons
js/render.js    # DOM e animações
js/game.js      # regras, combo, tempo e loop
```

## Licença

MIT
