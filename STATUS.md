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

## Avvik fra planen (bevisste, avklart med bruker)

- **Gust-data**: MET sitt `compact`-endepunkt inkluderer *ikke* `wind_speed_of_gust`
  (kun `complete`-endepunktet har det – verifisert live mot API 2026-07-09).
  Beholdt `compact` (riktig for payload-størrelse) og gjort `gust` valgfritt
  (`gust?: number`) i `ForecastPoint`/`MetInstantDetails` i stedet for å bytte
  endepunkt. Prototypens rendering behandlet allerede gust som valgfritt
  (`w.gust ? ... : ""`), så dette er konsistent.
- **Lambertstranda → Yr-lenke**: lenken i prototypen peker til en Yr-URL med
  slug `Bankebukta`, ikke `Lambertstranda`. Bekreftet med bruker at dette er
  samme strand under et annet navn på Yr – portert eksakt som i prototypen,
  ingen endring nødvendig.
- **Deploy-base-path**: Avklart med bruker at `base` skal være `/beaches/`
  (matcher repo-navnet), ikke en egen `/strender/`-subpath.

## Neste: Milepæl 4 – UI

Fra PLAN.md §9: Hero, BestBeach, liste. Appen skal fungere uten kart.

Gjenstår i `src/components/`:
- `Hero.tsx` — temp, vind, kompass, tidschips, vindstriper (§7)
- `Compass.tsx`
- `BestBeach.tsx` — anbefalingskortet
- `BeachList.tsx` / `BeachCard.tsx`

`App.tsx` er fortsatt en minimal placeholder (`<h1>Strandvind · Mandal</h1>`) og må
kobles opp mot `useForecast()`, `score.ts` og de nye komponentene.

Ikke påbegynt: Milepæl 5 (kart) og 6 (finpuss).

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
miljøet, så status er sjekket via `curl` mot GitHub sitt REST API for Actions-runs).
