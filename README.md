# Alva & Siri – hemsida

En hemsida för Alva & Siris retreats om menscykeln, hormoner och kvinnokroppen. Ren HTML, CSS och JavaScript. Inget att installera och inget byggsteg.

```
index.html          Startsidan
retreat.html        Detaljsida för höstretreaten på Yxlan
anmal.html          Formulär: anmäl intresse
css/styles.css      All design (färger, typsnitt, layout, animationer)
js/main.js          Interaktion och animationer
images/             Foton och ikon (källor i images/CREDITS.md)
```

## Starta sidan lokalt

**Enklast:** dubbelklicka på `index.html` så öppnas den i webbläsaren.

**Bättre (allt fungerar, även mjuka sidövergångar):** starta en liten lokal server i mappen och öppna http://localhost:5500

```bash
python -m http.server 5500
```

Har du Node.js installerat går det också bra med `npx serve .`

## Ändra innehåll

Sök efter `ÄNDRA HÄR` i HTML-filerna. Där finns kommentarer vid allt som ofta ändras.

| Vad | Var |
|-----|-----|
| Datum, plats, tid, pris | `index.html` (hero-brickan och retreat-kortet), `retreat.html` (hero, snabbfakta, schema), `anmal.html` (listan med retreats), samt footern på alla sidor |
| Nedräkningen ("Om 22 dagar") | Attributen `data-countdown="2026-10-23"` (start) och `data-countdown-end="2026-10-25"` (slut). Den räknar själv och döljs när retreaten har varit. |
| Texten om er | `index.html`, avsnittet "Om oss" |
| Citat | `index.html`, avsnittet "Röster" |
| Vanliga frågor | `index.html`, avsnittet "Vanliga frågor" |
| Schema och packlista | `retreat.html` |
| Färger | Överst i `css/styles.css` under "Designvariabler" |

### Lägga till ett nytt retreat

1. Kopiera blocket `<article class="retreat-teaser">…</article>` i `index.html` och ändra text, bild och länken `anmal.html?retreat=NYTT-ID`.
2. Lägg till ett motsvarande `<option value="NYTT-ID" …>` i `anmal.html`. Attributen `data-name`, `data-date`, `data-place`, `data-price` och `data-image` styr sammanfattningen bredvid formuläret.

### Byta bilder

Lägg en ny bild i `images/` med samma filnamn, så byts den överallt. Riktlinjer:

| Fil | Används till | Format |
|-----|--------------|--------|
| `alva-siri.jpg` | Polaroiden i "Om oss" | Liggande, ca 1100 × 750 px |
| `tea.jpg` | Bågen i "Om oss" | Stående, ca 1000 × 1250 px |
| `yxlan.jpg`, `brygga.jpg` | Platsen | Liggande, ca 1600 px bred |
| `dinner.jpg` | Retreatsidans stora bild | Stående, ca 1100 × 1650 px |
| `meditation.jpg`, `journal.jpg` | Galleriet på retreatsidan (även `tea.jpg`) | Valfritt, ca 1100–1400 px |
| `og.jpg` | Bilden som visas när länken delas | Exakt 1200 × 630 px |
| `lilac.jpg` | Vårretreaten och frågorna | Stående |

Håll bilderna under ca 300 kB (komprimera till exempel med squoosh.app).

Startsidans stora bild är ingen fotofil utan en egenritad illustration av en blommande livmoder (SVG direkt i `index.html`). Den ritas fram när sidan laddas, och månfaserna ovanför lyser upp i tur och ordning.

## Formuläret

Sidan har ingen server ännu. När någon skickar formuläret sparas anmälan bara i den webbläsaren och skrivs ut i konsolen, sedan visas tackrutan. **Inga anmälningar når er ännu.**

Innan ni börjar dela länken kopplar ni in en formulärtjänst, till exempel [Formspree](https://formspree.io) eller Netlify Forms. I `js/main.js` finns en kommentar (`HÄR KOPPLAR NI IN EN RIKTIG FORMULÄRTJÄNST`) som visar exakt var.

## Publicering (GitHub Pages)

Sidan ligger på GitHub och publiceras automatiskt med GitHub Pages:

- **Kod:** https://github.com/EmilHermanssonOnGit/alva-och-siri
- **Live:** https://emilhermanssonongit.github.io/alva-och-siri/

Varje gång ni pushar till grenen `main` uppdateras sidan inom någon minut.

```bash
git add -A
git commit -m "Beskriv ändringen"
git push
```

## Egen domän

Exemplen nedan använder `alvaochsiri.se` – byt mot er domän.

**1. Lägg till domänen i GitHub (gör detta först)**
1. Gå till repot → **Settings** → **Pages**.
2. Under **Custom domain**: skriv `www.alvaochsiri.se` och klicka **Save**. GitHub skapar då en fil som heter `CNAME` i repot. Kör `git pull` innan ni pushar nästa gång, så kommer den med lokalt.

**2. Ställ in DNS hos domänleverantören** (Loopia, One.com, GoDaddy m.fl. – leta efter "DNS-inställningar")

Ta först bort eventuella gamla A-, AAAA- och CNAME-poster för `@` och `www` som pekar på leverantörens parkeringssida. Lägg sedan till:

| Typ | Namn / värd | Värde |
|-----|-------------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `emilhermanssonongit.github.io` |

Då fungerar både `alvaochsiri.se` och `www.alvaochsiri.se`. GitHub skickar automatiskt den ena till den andra. Använd **inte** wildcard-poster (`*`).

**3. Vänta och slå på HTTPS**
- DNS-ändringar slår igenom på allt från några minuter upp till ett dygn.
- När GitHub visar en grön bock under Custom domain: kryssa i **Enforce HTTPS** (kan ta upp till 24 timmar innan rutan går att klicka i).

**4. Verifiera domänen (rekommenderas)**
Under ert GitHub-konto → **Settings** → **Pages** → **Add a domain**. GitHub ger er en TXT-post att lägga in hos domänleverantören. Det hindrar andra från att ta över domänen på GitHub.

**5. Uppdatera delningsbilden**
Byt `https://emilhermanssonongit.github.io/alva-och-siri/` mot `https://www.alvaochsiri.se/` i raden `og:image` i `index.html`, `retreat.html` och `anmal.html`, och pusha.

## Platshållare att fylla i

- [ ] **Texten om er** i "Om oss" – skriv om med egna ord
- [ ] **Citaten** – just nu Krösus Sork, Nalle-Maja, Lilla My, Brummelisa och Snorkfröken
- [ ] **Foto på er** – `alva-siri.jpg` är beskuret från den gamla inbjudan och har låg upplösning. Byt gärna till ett skarpare foto.
- [ ] **Vårretreat 2027** – ett exempel. Ta bort kortet om det inte är planerat.
- [ ] **"Få platser kvar"**-taggen – ta bort när den inte stämmer
- [ ] **Packlistan, schemat och resvägen** – bekräfta att uppgifterna stämmer
- [ ] **Avbokningsvillkor** – finns inte med än. Lägg gärna till som en fråga under "Vanliga frågor".
- [ ] **Formulärtjänst** – se ovan
- [ ] **Egen domän:** byt adressen i `og:image` (se nedan)

## Designval

- **Känsla:** skandinavisk landsbygd, syrener, linne och analog film – varmt och lugnt, inte kliniskt. En svag filmkornighet ligger över hela sidan och alla foton har samma varma ton, så att de hänger ihop som en serie.
- **Färger:** hämtade från den gamla inbjudan. Vinrött för rubriker och knappar, salviagrönt som lugn accent, krämvitt och linne som bakgrund, och blush och terrakotta sparsamt. All text klarar kontrastkraven (WCAG AA).
- **Typsnitt:** Cormorant Garamond till rubrikerna (elegant och romantisk, med kursiva ord som accent) och DM Sans till brödtexten (lättläst). Versaler används bara till små etiketter, eftersom hela stycken i versaler är svårlästa.
- **Former:** bågformade bilder och mjuka, "andande" färgfläckar ger en feminin, organisk känsla. En återkommande måncykel-symbol bildar logotypen.
- **Signatur:** menscykelns fyra faser som en interaktiv ring (inre vinter, vår, sommar, höst) som går att klicka och styra med tangentbordet. På mobil är faserna kort som man swipar mellan.
- **Mobil först:** de flesta kommer från Instagram på mobilen. Alla sidor är testade på 375 px bredd utan sidledsscroll.
- **Animationer:** lugna och andningslika. Rubriken visas ord för ord, bilderna växer fram ur bågen, linjeteckningar ritas fram, bilder har lätt parallax och ett ordband rullar långsamt. Allt stängs av för den som valt minskad rörelse i sina inställningar, och allt innehåll syns även utan JavaScript.
- **Tillgänglighet:** semantisk HTML, synlig fokusmarkering, tangentbordsstyrd karusell, cykelring och meny, beskrivande alt-texter och en länk för att hoppa till innehållet.
