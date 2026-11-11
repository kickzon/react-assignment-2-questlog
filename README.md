# SoundShelf

SoundShelf är en musikapp där användaren kan skapa och hantera en personlig samling av album. Appen är byggd med React och TypeScript och använder Shelf API för att lagra informationen.

Detta projekt är skapat som inlämningsuppgift 2 i kursen JavaScript-ramverk. Jag siktar på betyget VG.

## Funktioner

I appen kan användaren:

- Visa alla album i samlingen
- Filtrera album efter lyssningsstatus
- Visa information om ett enskilt album
- Lägga till nya album
- Redigera befintliga album
- Ta bort album
- Ange betyg, genre, omslagsbild, datum, anteckningar och taggar
- Behålla det valda filtret efter att sidan har laddats om
- Få återkoppling när data laddas eller om något går fel

Albumen kan ha följande status:

- Want to listen
- Listening
- Listened
- Dropped

## Tekniker

Projektet använder:

- React
- TypeScript
- React Router
- Vite
- Shelf API
- CSS
- ESLint
- Local Storage

## Installation

För att köra projektet lokalt behöver du ha Node.js och npm installerat.

1. Klona repot:

```bash
git clone https://github.com/kickzon/react-assignment-2-questlog.git
```

2. Gå till projektets mapp:

```bash
cd react-assignment-2-questlog
```

3. Installera projektets dependencies:

```bash
npm install
```

4. Starta utvecklingsservern:

```bash
npm run dev
```

Öppna sedan adressen som visas i terminalen, vanligtvis `http://localhost:5173`.

## Scripts

```bash
npm run dev
```

Startar projektet i utvecklingsläge.

```bash
npm run build
```

Kontrollerar TypeScript och skapar en produktionsversion av appen.

```bash
npm run lint
```

Kontrollerar koden med ESLint.

```bash
npm run preview
```

Förhandsvisar den färdiga produktionsversionen lokalt.

## API

Appen använder [Shelf API](https://shelf-api-mu.vercel.app/docs) för att hämta och spara album.

Mitt handle i API:et är:

```text
kickzon-music
```

Appen använder följande typer av API-anrop:

- `GET` för att hämta album
- `POST` för att skapa album
- `PATCH` för att uppdatera album
- `DELETE` för att ta bort album

## Routing

Appen innehåller följande routes:

- `/` – visar alla album och statusfiltret
- `/albums/new` – visar formuläret för att lägga till ett album
- `/albums/:albumId` – visar information om ett enskilt album
- `*` – visar en 404-sida när adressen inte finns

## Custom hooks

Jag har flyttat logiken för API-anrop och Local Storage till egna hooks. På så sätt ansvarar komponenterna främst för vad som ska visas, medan hooksen hanterar data och state.

### `useAlbums`

Hämtar listan med album från API:et. Hooken kan även ta emot en status och hämta de album som tillhör det valda filtret. Den hanterar också laddning, fel och avbryter anropet om komponenten tas bort.

### `useAlbum`

Hämtar ett enskilt album med hjälp av albumets id. Hooken innehåller även en `refetch`-funktion som gör att albumet kan hämtas på nytt efter en uppdatering.

### `useSaveAlbum`

Samlar funktionerna för att skapa, uppdatera och ta bort album. Hooken hanterar även sparningsstatus och fel från API:et.

### `useLocalStorage`

Sparar det valda statusfiltret i webbläsarens Local Storage. Det gör att samma filter fortfarande är valt när användaren laddar om sidan.

Hooken använder en generisk TypeScript-typ, vilket gör att den kan återanvändas för olika typer av värden.

## Val och motiveringar

Jag valde att samla API-logiken i custom hooks för att separera datahanteringen från appens komponenter. Det gör komponenterna mer lättlästa och hooksen kan återanvändas på flera ställen.

Jag har delat upp formulären efter deras olika ansvarsområden. AlbumForm används för att skapa ett nytt album med all albuminformation, medan AlbumActions används för att uppdatera status och betyg eller ta bort ett befintligt album. Det gör komponenternas ansvar tydligare. Det minskar mängden upprepad kod och gör att samma validering och formulärfält används på båda platserna.

Jag använder TypeScript-typer för album, status, nya album och uppdateringar. Det hjälper mig att upptäcka fel under utvecklingen och gör det tydligare vilken data komponenterna och API-funktionerna förväntar sig.

Statusfiltret sparas med en separat Local Storage-hook eftersom filtret ska finnas kvar efter en omladdning utan att behöva sparas i API:et.

## Publicerad app

Appen är publicerad på Vercel:

[https://react-assignment-2-questlog.vercel.app/](https://react-assignment-2-questlog.vercel.app/)
