# VYNA — repo och driftsättning

Statisk sida. Inget byggsteg, inga beroenden, ingen server.

```
netlify.toml        ← Netlifys inställningar, läses automatiskt
.gitignore
DEPLOY.md           ← den här filen
public/             ← allt som publiceras
  index.html            hela sidan, alla fyra vyer
  robots.txt
  sitemap.xml
  assets/               logotyper, favikoner, delningsbild, tokens
```

Bara `public/` hamnar på vyna.es. Den här filen och `netlify.toml` ligger i
repot men publiceras aldrig — det är därför strukturen ser ut så här.

---

## 1. Lägg upp repot

```bash
cd sokvag/till/mappen
git init
git add .
git commit -m "VYNA website, first version"
git branch -M main
git remote add origin git@github.com:DITT-KONTO/vyna-web.git
git push -u origin main
```

Skapa repot tomt på GitHub först — utan README, .gitignore eller licens,
annars krockar historiken vid första push.

Privat eller publikt spelar ingen roll tekniskt. Privat är rimligare för
ett företag som inte publicerat sig än.

---

## 2. Koppla repot till Netlify

1. **Add new site → Import an existing project**
2. Välj GitHub och auktorisera om det behövs
3. Peka ut `vyna-web`
4. Netlify läser `netlify.toml` och fyller i publiceringsmappen `public`
   automatiskt. Låt byggkommandot vara tomt
5. **Deploy**

Klart. Varje `git push` till `main` bygger om sidan inom någon minut.

### Det du får på köpet

**Deploy previews.** Pusha en branch och Netlify bygger en egen URL för
just den. Vill du visa Johan två varianter av startsidan behöver du inte
röra den publika sidan.

```bash
git checkout -b ny-startsida
# ändra
git push -u origin ny-startsida
```

**Rollback.** Under **Deploys** ligger varje tidigare version kvar.
Ett klick på *Publish deploy* återställer. Du behöver aldrig fumla i Git
när något ser fel ut i skarpt läge.

---

## 3. Koppla vyna.es

Två vägar. Välj en.

### Väg A — låt Netlify sköta DNS

1. **Domain management → Add a domain** → `vyna.es`
2. Välj **Netlify DNS**. Du får fyra namnservrar, typ `dns1.p03.nsone.net`
3. Hos registraren där du köpte vyna.es: byt ut namnservrarna mot Netlifys
4. Spara

Har du redan mail på domänen måste MX-posterna läggas in i Netlify DNS
också, annars slutar mailen fungera samma stund som bytet slår igenom.

### Väg B — behåll DNS hos registraren

| Typ | Namn | Värde |
|---|---|---|
| A | `@` (eller tomt) | `75.2.60.5` |
| CNAME | `www` | `ditt-sajtnamn.netlify.app` |

`75.2.60.5` är Netlifys lastbalanserare för apex-domäner. Stöder din
registrar ALIAS eller ANAME är de bättre än A-posten — peka dem mot
`ditt-sajtnamn.netlify.app` i stället.

Lägg sedan till `vyna.es` under **Domain management** så att certifikatet
utfärdas.

### Sedan, oavsett väg

- `.es` propagerar ofta långsammare än `.com`. Räkna med ett dygn, ibland två
- Kontrollera att **HTTPS-certifikatet** utfärdats. Det sker automatiskt,
  men först när DNS pekar rätt
- Sätt `https://vyna.es` som primär domän så att www omdirigeras dit

---

## 4. Sätt upp hello@vyna.es

Mailen på sidan är död tills det här är gjort. Netlify hanterar inte mail.

Zoho Mail har en gratisnivå för en domän. Google Workspace kostar men
integrerar bättre om ni redan kör Google.

1. Skapa konto, lägg till `vyna.es`
2. Du får MX-poster, en SPF-post (TXT) och oftast DKIM
3. Lägg in dem där DNS ligger — Netlify DNS eller registraren
4. Testa genom att mejla dig själv från ett annat konto

Vill du inte lösa mail nu: ta bort de två raderna med `hello@vyna.es` ur
`public/index.html`. En kontaktväg som studsar är sämre än ingen.

---

## 5. Kontrollera efter publicering

- Skicka `https://vyna.es` till dig själv i WhatsApp. Delningsbilden ska visas
- Klicka WhatsApp-knappen från en telefon, kontrollera numret
- Fyll i formuläret och skicka — det ska öppna WhatsApp med texten ifylld
- **Google Search Console**: lägg till sajten, skicka in
  `https://vyna.es/sitemap.xml`
- **Google Business Profile** för adressen i San Pedro. Sidan har redan
  strukturerad data för lokal sökning, men den kopplas till en företagsprofil
  för att ge full effekt

---

## 6. Byta ut bilderna

Varje bildplats är en `<figure>`. Lägg fotot i `public/assets/` och ändra:

```html
<figure class="bild r-45 tom">                              <!-- före -->
<figure class="bild r-45" data-src="assets/villa.jpg" data-alt="Ekfönster">
```

Ta bort `tom` och raden `<p class="lapp">…</p>` inuti. Formatklassen
(`r-45`, `r-32`, `r-169`) styr proportionen, så beskärningen blir rätt
oavsett bildens mått.

Sedan:

```bash
git add .
git commit -m "Riktiga projektfoton"
git push
```

---

## Kvar att bestämma

- Instagram-handtaget `@vyna.windows` är påhittat. Byt eller ta bort
- Projektnamnen på Inspiration-sidan är fyllnadstext
- Specifikationerna (0,8 W/m²K, EN 14351-1, 400 kg) behöver verifieras mot
  vad era faktiska leverantörer levererar
- Typsnitten hämtas från Google Fonts, vilket skickar besökarens IP-adress
  till Google. Båda är fria under SIL OFL och kan läggas lokalt i `assets/`
- Varumärkeskontroll i EUIPO och OEPM före publicering, inte efter
