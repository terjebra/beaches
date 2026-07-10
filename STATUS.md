# Status — Strandvind Mandal

Fremdrift mot milepælene i [PLAN.md](./PLAN.md). Oppdater denne filen når en milepæl
fullføres eller når noe avviker fra planen, slik at arbeidet kan fortsette i en ny sesjon.

## Ferdig

**Milepæl 1 – Skjelett** ✅
- Vite + React 18 + TS-skjelett, boilerplate fjernet
- Design tokens + base-stiler i `src/index.css` (§7)
- `vite.config.ts`: `base: '/beaches/'`
- `.github/workflows/deploy.yml`: bygger, tester, deployer til Pages ved push til `main`
  (+ `workflow_dispatch` for manuell re-run)
- Repo: `github.com/terjebra/beaches` · Live: `https://terjebra.github.io/beaches/`
- GitHub Pages Source er satt til «GitHub Actions» i repo-settings

**Milepæl 2 – Logikk** ✅
- `src/data/beaches.ts`: 9 strender, portert 1:1 fra `reference/strandvind-mandal.html`
- `src/lib/score.ts`: `angDiff`, `scoreBeach`, `cat`, `explain`, `dirName` med TS-typer
- `src/lib/score.test.ts`: 6 tester, alle grønne (wraparound, rød/grønn scoring,
  vindstille→95, stabil sortering, alle fire `explain`-vinkler)

**Milepæl 3 – Data (MET-klient)** ✅
- `src/lib/met.ts`: `fetchForecast()` mot MET sitt `compact`-endepunkt, plukker
  nå/+3t/+6t/+9t
- `src/hooks/useForecast.ts`: react-query (`staleTime: 30 min`, `retry: 2`),
  returnerer alltid data (faller tilbake til eksempelvind ved feil)
- `QueryClientProvider` koblet inn i `src/main.tsx`

**Milepæl 4 – UI** ✅
- `src/components/Hero.tsx`, `Compass.tsx` — temp, vind, kompass, tidschips
- `src/components/BestBeach.tsx` — anbefalingskortet
- `src/components/BeachList.tsx` / `BeachCard.tsx` — sortert liste, score-pills, Yr-lenker
- `App.tsx` koblet opp mot `useForecast()` + `score.ts`. Appen fungerer uten kart.

**Milepæl 5 – Kart** ✅
- `src/components/BeachMap.tsx`: react-leaflet + Esri World Imagery-fliser
- `L.divIcon`-markører (fargeprikk per kategori, vindpil, navn), markup/CSS 1:1
  fra prototypen

**Milepæl 6 – Finpuss** ✅ (funksjonelt) / ⚠️ (verifisering utestår, se under)
- `src/components/WindOverride.tsx` — retning/styrke-slidere, overstyrer scoring +
  visning (temp forblir fra varselet, kun from/speed overstyres, som i prototypen)
- Animerte vindstriper i `Hero.tsx`, memoisert på `[current.from, current.speed]`
  så de ikke regenereres ved urelaterte re-renders
- `prefers-reduced-motion` slår av vindstriper og kompassnål-transition

## Avvik fra planen (bevisste, avklart med bruker eller nødvendige pga. faktisk API/versjon)

- **Gust-data**: MET sitt `compact`-endepunkt inkluderer *ikke* `wind_speed_of_gust`
  (kun `complete`-endepunktet har det – verifisert live mot API 2026-07-09).
  Beholdt `compact` (riktig for payload-størrelse) og gjort `gust` valgfritt
  (`gust?: number`) i `ForecastPoint`/`MetInstantDetails` i stedet for å bytte
  endepunkt. Prototypens rendering behandlet allerede gust som valgfritt
  (`w.gust ? ... : ""`), så dette er konsistent.
- **Sponga → Yr-lenke**: stranda vises som «Sponga» i UI-et (`navn`), men
  Yr-lenken peker til slug `Bankebukta` – bekreftet med bruker at Yr bruker
  det navnet for samme strand. `id` er fortsatt `lambertstranda` internt
  (kun brukt som nøkkel, vises ikke), navnet ble endret fra «Lambertstranda»
  til «Sponga» på brukerens beskjed.
- **Deploy-base-path**: Avklart med bruker at `base` skal være `/beaches/`
  (matcher repo-navnet), ikke en egen `/strender/`-subpath.
- **react-leaflet-versjon**: Planen (§2) spesifiserer v4, men v4s peer-deps krever
  React 18. Dette prosjektet ble scaffoldet med React 19 (create-vite sin
  standard). Brukt react-leaflet v5 i stedet — API-kompatibelt for
  MapContainer/TileLayer/Marker-bruken her.
- **Stranddata (lat/lon) var systematisk feil**: Bruker rapporterte at kart-POI-ene
  var «way off». Kryssjekket alle 9 strender mot ekte Google Maps-plassdata: hver
  strands lengdegrad i prototypen var ~350–590m for langt vest (breddegrad var
  stort sett riktig). Alle 9 strender er nå rettet, inkludert `stumpestrendene`
  (siste, rettet med bruker-oppgitt Google Maps-lenke).
  `venderMot`-verdiene er IKKE endret ennå (jf. PLAN.md §10-forbudet), men bør
  vurderes på nytt siden posisjonene nå er justert.

## Gjenstår / ikke verifisert

Alle 6 milepæler er funksjonelt implementert, testet (`npm test`), lintet
(`npm run lint`) og bygget (`npm run build`) uten feil, og deployet til
`https://terjebra.github.io/beaches/`.

**Ikke gjort** (krever en faktisk nettleser, som ikke er brukt i denne sesjonen):
- Visuell verifisering ved 390px og 320px bredde
- Lighthouse mobil-score (Performance/Accessibility ≥ 90)
- Manuell test av WindOverride-sliderne, tastaturfokus og kart-interaksjon i nettleser

Statisk CSS-gjennomgang tyder på at layouten tåler 320px (flex-wrap på chips,
ingen fikserte bredder som ville forårsake horisontal scroll), men dette er ikke
bekreftet i en ekte nettleser.

Alle 9 strenders koordinater er nå verifisert mot Google Maps. Gjenstående:
vurder om `venderMot` for noen strender bør justeres nå som posisjonene er
mer presise (ikke gjort ennå — jf. PLAN.md §10).

## Praktisk for å fortsette

```
git clone https://github.com/terjebra/beaches.git
cd beaches
npm install
npm run dev
```

Verifiseringsrutine brukt gjennom prosjektet: etter hver endring, kjør
`npm run lint && npm test && npm run build`, commit, push til `main`, og vent på
at GitHub Actions-workflowen fullfører (`gh`-CLI er ikke installert i dette
miljøet, så status er sjekket via `curl` mot GitHub sitt REST API for Actions-runs,
som har en lav rate-limit uautentisert — bruk `curl https://terjebra.github.io/beaches/`
for å sjekke om siste build faktisk er live, det går ikke mot samme rate-limit).
