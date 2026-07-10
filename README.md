# Strandvind · Mandal

Åpen webapp som viser hvilken badestrand i Mandal som har best forhold akkurat nå,
basert på vindretning og vindstyrke fra [MET/Yr](https://api.met.no). Ingen pålogging,
ingen backend – ren statisk side.

## 🏖️ Appen

**[terjebra.github.io/beaches](https://terjebra.github.io/beaches/)**

Se [PLAN.md](./PLAN.md) for full spesifikasjon.

## Strendene

Appen dekker 9 strender i Mandal-området. «Vender mot» er kompassretningen ut mot
havet – det er *derfra* pålandsvind kommer, altså den verste vindretningen for
akkurat den stranda. Rene tallverdier ligger i `src/data/beaches.ts`.

| Strand | Vender mot | Yr-varsel |
| --- | --- | --- |
| Sjøsanden | SSØ (165°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2007/Norge/Agder/Lindesnes/Sj%C3%B8sanden) |
| Lordens | SØ (130°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316229/Norge/Agder/Lindesnes/Lordens) |
| Stumpestrendene | S (175°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316231/Norge/Agder/Lindesnes/Stumpestrendene) |
| Kanelstranda | S (180°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316230/Norge/Agder/Lindesnes/Kanelstranda) |
| Spidsbo | S (190°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316234/Norge/Agder/Lindesnes/Spidsbo) |
| Banken | VSV (245°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2039/Norge/Agder/Lindesnes/Banken) |
| Lillebanken | VNV (285°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316238/Norge/Agder/Lindesnes/Lillebanken) |
| Torkelshåla | V (270°) | – (ingen Yr-side) |
| Sponga | SSV (205°) | [Yr](https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316312/Norge/Agder/Lindesnes/Bankebukta) (Yr kaller den «Bankebukta») |

Appen viser alltid strendene sortert etter hvilken som har best forhold akkurat nå,
ikke i denne rekkefølgen.

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
