# VYNA — repo och driftsättning

Sidan är sedan september 2026 en riktig flersidesstruktur — varje sida har
sin egen adress, egen titel och egen sökbeskrivning. Ingen JavaScript-routing
längre. Fortfarande inget byggsteg: allt i `public/` är exakt det som
publiceras.

```
netlify.toml
DEPLOY.md               ← den här filen
public/
  index.html                              vyna.es/
  products/index.html                     vyna.es/products/
  products/windows/index.html             vyna.es/products/windows/
  products/entrance-doors/index.html      vyna.es/products/entrance-doors/
  products/terrace-doors/index.html       vyna.es/products/terrace-doors/
  products/sliding-doors/index.html       vyna.es/products/sliding-doors/
  products/folding-doors/index.html       vyna.es/products/folding-doors/
  wood/index.html                         vyna.es/wood/
  grants/index.html                       vyna.es/grants/
  builders/index.html                     vyna.es/builders/
  inspiration/index.html                  vyna.es/inspiration/
  about/index.html                        vyna.es/about/
  contact/index.html                      vyna.es/contact/
  es/                                      samma tretton sidor på spanska,
                                            under vyna.es/es/...
  assets/
    style.css        ← all design, en fil, delad av alla 26 sidor
    script.js         ← burger-meny, kontaktformulär, header-skugga vid scroll
    photos/           ← alla fotografier
    vyna-*.svg/.png    ← logotyper, favikoner
  robots.txt
  sitemap.xml          ← alla 26 adresser, med hreflang mellan språken
```

Netlify pekas fortfarande mot `public` via `netlify.toml`. Inget byggkommando,
inga ändringar där.

---

## Vad som ändrades och varför

Fram till nu var hela sajten **en enda fil** — `index.html` — där menyn bytte
innehåll med JavaScript (adresser som `vyna.es/#/products`). Det fungerade
fint för besökare, men **Google indexerade bara en sida**, eftersom allt
efter `#`-tecknet är osynligt för sökmotorer. Elva av tretton sidor existerade
alltså inte ur sökmotorns perspektiv, oavsett hur bra texten var.

Nu har varje sida en riktig adress, en egen `<title>`, en egen
sökbeskrivning och en egen post i sitemap.xml. Det är förutsättningen för
att till exempel produktsidan om skjutdörrar ska kunna ranka på "puertas
correderas de madera" utan att konkurrera med startsidan om samma sökord.

CSS och JavaScript ligger nu i egna filer (`assets/style.css`,
`assets/script.js`) i stället för att upprepas i varje sida. Webbläsaren
laddar dem en gång och återanvänder dem på alla 26 sidor — snabbare för
besökaren, och enklare att ändra en detalj på ett ställe i stället för
tjugosex.

---

## 1. Lägg upp repot

Samma som tidigare — bara innehållet i `public/` har ändrats.

```bash
cd sokvag/till/mappen
git init
git add .
git commit -m "VYNA website — real URLs per page"
git branch -M main
git remote add origin git@github.com:tedcederlund/VYNA.git
git push -u origin main -f
```

`-f` skriver över den gamla hash-baserade versionen. Ladda upp **hela**
`public`-mappen, inklusive alla undermappar (`products/`, `es/`, `assets/`)
— inte bara filerna direkt i roten.

**Viktigt om GitHubs webbgränssnitt:** dra in mappstrukturen medan du står
inne i rätt katalog på GitHub, precis som tidigare. Kontrollera efteråt att
till exempel `public/products/windows/index.html` faktiskt syns i trädet på
just den platsen — det är den vanligaste felkällan.

---

## 2. Netlify

Ingen ny konfiguration behövs. Netlify serverar `mapp/index.html` automatiskt
som `/mapp/` — det är standardbeteende för statiska sajter, inga
omdirigeringsregler krävs. Om sajten redan är kopplad till repot bygger den
om automatiskt vid nästa push.

Kontrollera efter driftsättning:

- `vyna.es/products/windows/` laddar med egen titel i webbläsarfliken
- `vyna.es/es/products/windows/` visar spanska, och EN/ES-växlaren tar dig
  till **samma sida** på andra språket, inte till startsidan
- Menyn visar rätt markerad sida (understruken/highlightad) på varje undersida
- Footer-länkarna fungerar
- WhatsApp-knappen och kontaktformuläret fungerar som förut

---

## 3. Google Search Console

Eftersom adresserna är nya räknas de som nya sidor för Google, även om
innehållet är detsamma som förut. Gör detta så snart sajten är live:

1. Logga in på [Google Search Console](https://search.google.com/search-console)
2. Skicka in `https://vyna.es/sitemap.xml` på nytt under **Sitemaps**
3. Under **URL Inspection**, be om indexering av `vyna.es/` och några av de
   viktigaste undersidorna (`/products/`, `/grants/`) för att skynda på
4. Räkna med några dagar till ett par veckor innan Google hunnit besöka och
   indexera alla 26 sidor

Har ni redan skickat in den gamla sitemap.xml (med bara två adresser) tidigare
gör det ingenting — den nya filen ersätter den automatiskt.

---

## 4. Byta ut bilderna

Samma som tidigare. Varje bildplats är en `<figure>`:

```html
<figure class="bild r-45"><img src="/assets/photos/villa.jpg" alt="Ekfönster" loading="lazy"></figure>
```

Lägg fotot i `public/assets/photos/`, referera det med `/assets/photos/…`
(notera det inledande snedstrecket — alla sökvägar är nu rotbaserade och
fungerar likadant oavsett hur djupt sidan ligger i mappstrukturen).

---

## 5. Ändra text på en specifik sida

Varje sida är nu sin egen fil. Vill du ändra något på skjutdörrssidan, öppna
`public/products/sliding-doors/index.html` (eller
`public/es/products/sliding-doors/index.html` för spanskan) — inte
`index.html` i roten, som bara är startsidan.

**Sidtitel och sökbeskrivning** ligger högst upp i varje fil:

```html
<title>Timber Sliding Doors | VYNA</title>
<meta name="description" content="…">
```

Ändrar du dessa, uppdatera **inte** `og:title`/`og:description` för hand —
de bör spegla samma text (det finns ingen automatisk synk längre eftersom
varje sida är en fristående fil).

---

## Kvar att bestämma

- Instagram-handtaget, kontaktmailen och bilderna på produktsidorna — samma
  öppna punkter som tidigare, opåverkade av den här omläggningen
- Varumärkeskontroll i EUIPO och OEPM
- När produktbilder finns på riktiga VYNA-leveranser: byt ut Pexels-bilderna
  på produktsidorna, eftersom det är de bilderna en kund tror föreställer
  era egna fönster
