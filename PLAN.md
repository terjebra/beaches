# Strandvind Mandal – implementeringsplan

> Instruksjoner til Claude Code. Les hele planen før du begynner. Bygg milepæl for milepæl,
> og verifiser hver milepæl (bygg + test) før du går videre.
> Referanseprototype: `reference/strandvind-mandal.html` (fungerende HTML-versjon med endelig
> design, farger, logikk og data). Porter design og logikk 1:1 derfra der planen ikke sier noe annet.

## 1. Hva appen er

En åpen webapp (ingen pålogging) som forteller hvilken badestrand i Mandal som har best
forhold akkurat nå, basert på vindretning og vindstyrke fra MET/Yr. Primærbruk er **mobil** –
folk sjekker den på vei ut døra. Svaret («beste strand nå») skal være synlig uten scrolling
på en vanlig mobilskjerm.

## 2. Tech stack

- Vite + React 18 + TypeScript (strict)
- Kart: `react-leaflet` v4 + `leaflet` med Esri World Imagery-fliser (satellitt, ingen API-nøkkel)
- Datahenting: `@tanstack/react-query` (caching, retry, stale-while-revalidate)
- Styling: ren CSS med CSS-variabler (design tokens under) – ikke Tailwind, prototypen er allerede ren CSS
- Test: Vitest for logikk
- Deploy: GitHub Pages via GitHub Actions

## 3. Prosjektstruktur

```
strandvind/
├── reference/strandvind-mandal.html   # prototypen (kopier inn, kun referanse)
├── src/
│   ├── data/beaches.ts                # stranddata (se §4)
│   ├── lib/score.ts                   # scoring + forklaring (se §5) – rene funksjoner
│   ├── lib/score.test.ts
│   ├── lib/met.ts                     # MET-klient + typer (se §6)
│   ├── hooks/useForecast.ts           # react-query-hook
│   ├── components/
│   │   ├── Hero.tsx                   # temp, vind, kompass, tidschips, vindstriper
│   │   ├── Compass.tsx
│   │   ├── BestBeach.tsx              # anbefalingskortet
│   │   ├── BeachMap.tsx               # react-leaflet, divIcon-markører
│   │   ├── BeachList.tsx / BeachCard.tsx
│   │   └── WindOverride.tsx           # test-slidere for retning/styrke
│   ├── App.tsx
│   ├── index.css                      # tokens + globale stiler
│   └── main.tsx
├── .github/workflows/deploy.yml
└── vite.config.ts                     # base: '/<repo-navn>/'
```

## 4. Data (`src/data/beaches.ts`)

Kopier eksakt fra prototypens `BEACHES`-array (9 strender, Kalhammeren er bevisst utelatt).
Type:

```ts
export interface Beach {
  id: string;
  navn: string;
  lat: number;
  lon: number;
  venderMot: number;   // kompassretning ut mot havet, grader
  yr: string | null;   // lenke til fullt varsel på Yr
}
```

`venderMot`-verdiene er avlest fra satellittkart og kan bli justert senere – de skal derfor
kun ligge i denne ene filen.

## 5. Scoring (`src/lib/score.ts`) – kjernen, skal enhetstestes

Porter funksjonene `angDiff`, `scoreBeach`, `cat` (kategorier `g`/`y`/`r` ved ≥72 / ≥45 / <45),
`explain` og `dirName` fra prototypen uendret, men med TypeScript-typer.

Semantikk: `windFrom` er retningen vinden kommer FRA (MET-konvensjon).
Vinkelavstand nær 0 mot `venderMot` = pålandsvind (dårlig), nær 180 = le (bra).
Under 2,5 m/s: alle strender scorer 95.

Testkrav (Vitest), minimum:
- `angDiff(350, 10) === 20` (wraparound)
- Vind 8 m/s fra 165° → Sjøsanden (venderMot 165) får lav score (rød), Lillebanken (285) høy
- Vind 1 m/s → alle strender 95
- Sortering er deterministisk og stabil
- `explain` returnerer norsk tekst for alle fire vinkelintervaller

## 6. MET-klient (`src/lib/met.ts` + `hooks/useForecast.ts`)

- Endepunkt: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=58.0180&lon=7.4310`
  (ett punkt for hele området – strendene ligger innenfor ~1 km)
- Fra nettleser kan vi ikke sette User-Agent; MET aksepterer nettleserkall. Ikke legg til
  egne headere som utløser CORS-preflight.
- react-query: `staleTime: 30 min`, `retry: 2`. Ikke poll oftere – MET blokkerer aggressive klienter.
- Plukk timeserie-punktene for nå, +3t, +6t, +9t: `air_temperature`, `wind_speed`,
  `wind_from_direction`, `wind_speed_of_gust`. Definér TypeScript-typer for det vi bruker.
- Feilhåndtering: ved feil vises gult varselbanner + eksempelvind (5 m/s fra 225°),
  som i prototypen. Appen skal aldri være blank.

## 7. UI og design

Porter prototypens design 1:1. Design tokens (CSS-variabler i `index.css`):

```
--hav:#0E4A6B  --dyp:#08344C  --grunne:#5FB8BF  --sand:#F4E7C5  --bakgrunn:#F7F3E8
--furu:#2F5D50 --sol:#FFC94D  --roed:#DB5461    --gul:#E8A93C   --groenn:#3B9B6F
--tekst:#12303F --dus:#5C7482
```

Fonter: Familjen Grotesk (display) + Inter (brødtekst) fra Google Fonts.

Sidestruktur, ovenfra: Hero (gradient hav-blå, temp, vind, kompass, tidschips, animerte
vindstriper i vindretningen) → BestBeach-kort (overlapper hero med -14px) → kart →
WindOverride (`<details>`) → sortert liste → footer med MET-kreditering.

Krav:
- **Mobil først.** Bygg for 390 px bredde, test også 320 px. Desktop = sentrert kolonne maks 720 px.
- «Beste strand»-kortet skal være synlig uten scrolling på mobil.
- Kompassnål og kartmarkører roterer dit vinden blåser (`windFrom + 180`).
- Kartmarkører: `L.divIcon` med fargeprikk (kategori), vindpil og navn – kopier markup/CSS fra prototypen.
- `prefers-reduced-motion`: slå av vindstriper og nål-transitions.
- Synlig tastaturfokus på chips, slidere og lenker. Norsk språk i hele UI-et (`<html lang="nb">`).

## 8. GitHub Pages-deploy

- `vite.config.ts`: `base: '/<repo-navn>/'` (viktig – ellers 404 på assets)
- Workflow `.github/workflows/deploy.yml`: på push til `main` → `npm ci && npm test && npm run build`
  → deploy `dist/` med `actions/deploy-pages` (bruk offisielt Pages-oppsett med
  `actions/upload-pages-artifact`)
- README: kort beskrivelse, hvordan justere stranddata, lokal kjøring (`npm run dev`)
- MET-API-et har åpen CORS, så alt fungerer som ren statisk side – ingen backend

## 9. Milepæler (bygg i denne rekkefølgen)

1. **Skjelett:** Vite + TS + React, tokens/fonter, deploy-workflow som publiserer en tom side. Verifiser at Pages fungerer FØR resten bygges.
2. **Logikk:** `beaches.ts`, `score.ts` + alle tester grønne.
3. **Data:** MET-klient + `useForecast` med feilfallback.
4. **UI:** Hero, BestBeach, liste. App fungerer uten kart.
5. **Kart:** react-leaflet med markører som oppdateres med vind.
6. **Finpuss:** WindOverride, vindstriper, reduced motion, 320 px-sjekk, Lighthouse mobil ≥ 90 på Performance og Accessibility.

## 10. Ikke gjør

- Ingen pålogging, ingen backend, ingen database, ingen analytics
- Ikke hent vær per strand (ett MET-kall holder), ikke poll oftere enn hvert 30. min
- Ikke legg til Kalhammeren
- Ikke endre scoring-formelen eller `venderMot`-verdiene uten å si ifra – de skal verifiseres mot virkeligheten
