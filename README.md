# Strandvind · Mandal

Åpen webapp som viser hvilken badestrand i Mandal som har best forhold akkurat nå,
basert på vindretning og vindstyrke fra [MET/Yr](https://api.met.no). Ingen pålogging,
ingen backend – ren statisk side.

Se [PLAN.md](./PLAN.md) for full spesifikasjon.

## Kjøre lokalt

```
npm install
npm run dev
```

## Justere stranddata

Stranddata (navn, posisjon, hvilken retning stranda vender mot havet, lenke til Yr)
ligger i `src/data/beaches.ts`. `venderMot` er avlest fra satellittkart og kan
justeres der ved behov.

## Deploy

Push til `main` bygger og publiserer automatisk til GitHub Pages via
`.github/workflows/deploy.yml`.
