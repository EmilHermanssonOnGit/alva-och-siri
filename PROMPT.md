# Prompt: Bygg hemsidan för Alva & Siri

Kopiera allt under linjen och ge det till Claude Code (eller annan AI-kodassistent) i en tom mapp. Bifoga gärna bilden på deras gamla Instagram-inbjudan som inspiration.

---

## Din roll

Du är en **senior grafisk designer och UX/UI-expert** som också bygger det du designar. Du har ett säkert öga för typografi, färg, bildval, rytm och detaljer, och du fattar alla designbeslut själv. Beställaren kan ingenting om design, så ställ inga designfrågor. Välj det som blir snyggast och motivera kort i README.

## Uppdraget

Bygg en professionell, vacker och responsiv hemsida för **Alva & Siri**, två unga kvinnor som håller retreats och workshops om kvinnohälsa: menscykeln, hormoner, kvinnokroppen, mindfulness, meditation, rörelse och "womb work". Hittills har de bjudit in till sina retreats med en enkel Instagram-bild med text (bifogad som inspiration). Hemsidan ska ersätta det och kännas som ett etablerat, förtroendeingivande varumärke, men fortfarande personlig, varm och "gosig".

Sidan ska bara köras lokalt för nu (ingen hosting, ingen backend), men vara enkel att publicera senare.

## 1. Teknik

- Ren **HTML + CSS + vanilla JavaScript**. Inget ramverk, inget byggsteg, inga JS-bibliotek.
- Filstruktur:
  ```
  index.html            startsida
  retreat.html          detaljsida för kommande retreat
  anmal.html            formulär: anmäl intresse
  css/styles.css
  js/main.js
  images/               foton + SVG-illustrationer
  images/CREDITS.md     källa och licens för varje foto
  README.md
  ```
- Ska gå att öppna genom att dubbelklicka på `index.html`, och även via `npx serve .`. Skriv båda sätten i README.
- Typsnitt via Google Fonts. Inga andra externa beroenden vid körning (alla bilder ligger lokalt).
- All text på **svenska**. Sätt `lang="sv"`.
- Innehåll som ofta ändras (datum, pris, plats, texter) ska vara lätt att hitta, med tydliga HTML-kommentarer som `<!-- ÄNDRA HÄR: datum för retreat -->`.

## 2. Känsla och varumärke

Nyckelord: **varm, jordnära, feminin, lugn, naturlig, ärlig, inbjudande**. Tänk skandinavisk landsbygd, linne och ull, syrenbuskar, morgonljus över skärgården, en kopp te på en veranda. Originalfotot på Alva & Siri har en **analog film-känsla** (mjuka färger, lätt kornighet). Ta vara på det i hela den visuella identiteten.

Undvik: neonfärger, stockfoto-känsla, för mycket rosa, glittriga gradienter, generiska ikoner i ljusblått, tunga skuggor, "wellness-guld-och-marmor", överdrivet esoteriska symboler.

## 3. Färgpalett

Paletten är hämtad från deras tidigare inbjudan (vinröd rubriktext, salviagröna textrutor, rosa stickad tröja, syrener, gräsmatta). Definiera som CSS-variabler i `:root`:

| Variabel       | Hex       | Användning |
|----------------|-----------|------------|
| `--cream`      | `#FAF5EE` | Huvudbakgrund |
| `--linen`      | `#F1E8DC` | Alternerande sektionsbakgrund |
| `--wine`       | `#7A2232` | Rubriker, logotyp, primära knappar |
| `--wine-dark`  | `#5A1824` | Hover på vinröda knappar, footer-bakgrund |
| `--sage`       | `#8A9A7B` | Sekundär accent, ikoner, linjer |
| `--sage-light` | `#DDE3D3` | Kort, taggar, mjuka ytor |
| `--blush`      | `#E8C4BC` | Mjuka detaljer, dekorativa former |
| `--terracotta` | `#C0705A` | Sparsam accent (t.ex. "Få platser kvar") |
| `--lilac`      | `#B9A5C9` | Mycket sparsam accent (syrenen i bilden) |
| `--ink`        | `#3B2F2F` | Brödtext (varm mörkbrun i stället för svart) |
| `--ink-soft`   | `#6E5F5B` | Sekundär text |

Regler:
- Bakgrunden är nästan alltid cream eller linen. Stora ytor ska vara ljusa och luftiga.
- Vinrött är huvudfärgen för rubriker och den primära knappen ("Anmäl intresse").
- Salviagrönt används för lugnare element och sekundära knappar.
- All text ska ha minst WCAG AA-kontrast mot sin bakgrund.

## 4. Typografi

- **Rubriker:** `Cormorant Garamond` (serif, vikt 500–600, gärna kursiv på enstaka ord för betoning). Den är elegant och romantisk och påminner om serif-rubriken i originalbilden.
- **Brödtext:** `DM Sans` (vikt 400, 500 för betoning). Ren och lättläst.
- **Små etiketter/överrubriker:** DM Sans i VERSALER, `letter-spacing: 0.15em`, liten storlek, färg `--sage`. Hela texter ska inte skrivas i versaler.
- Storlekar med `clamp()`:
  - H1: ca 3.5–5.5rem
  - H2: ca 2.25–3.25rem
  - H3: ca 1.4–1.75rem
  - Brödtext: 1.0625–1.125rem, `line-height: 1.7`
- Max textbredd ca 65 tecken (`max-width: 65ch`).

## 5. Layout och designprinciper

- **Mobil först.** De flesta besökare kommer från Instagram på mobilen. Designa för 375px bredd först, sedan surfplatta och desktop.
- Generöst med luft: ca 6–8rem vertikal padding per sektion på desktop, 4rem på mobil.
- Max innehållsbredd ca 1200px, centrerat. Bryt gärna rutnätet ibland: bilder som går utanför kanten, överlappande bild och text. Det ger ett redaktionellt, magasinsaktigt intryck.
- Mjuka former: rundade hörn (16–24px). Ge några bilder **valvform** (`border-radius: 999px 999px 24px 24px`) för en feminin, organisk känsla.
- Dekorativa element: organiska "blob"-former i blush/sage-light bakom bilder, handritade linjer och en återkommande måncykel-symbol. Gör dem som inline-SVG och använd dem sparsamt.
- Subtil **filmkornighet** över hela sidan (fast SVG-brus med låg opacitet, `pointer-events: none`).
- Knappar i pill-form med tydlig padding och mjuk hover.
- Ingen horisontell scroll på någon skärmstorlek.

## 6. Foton och illustrationer: du skaffar dem själv

Du ansvarar för alla bilder. Lämna inga grå platshållare.

### 6.1 Foton
Sök och ladda ner fria foton från **Unsplash** eller **Pexels** (båda tillåter kommersiell användning utan kreditering, men skriv ändå upp källan). Spara dem lokalt i `images/`.

Bilder som behövs (välj själv exakt motiv utifrån känslan i avsnitt 2):

| Fil               | Motiv (sökförslag) | Format |
|-------------------|-------------------|--------|
| `hero.jpg`        | Två kvinnor i naturen/trädgård, mjukt ljus, analog känsla ("women friends nature film", "scandinavian summer women") | Stående |
| `about.jpg`       | Varm, personlig miljö: händer runt tekoppar, filtar, ljus ("cozy tea hands linen") | Stående |
| `yxlan.jpg`       | Svensk skärgård, röd stuga, brygga, klippor ("swedish archipelago cottage", "stockholm archipelago") | Liggande |
| `retreat-1.jpg`   | Meditation/yoga inomhus, naturligt ljus ("women meditation circle", "yoga cabin morning") | Liggande |
| `retreat-2.jpg`   | Dukat bord, god mat, gemenskap ("rustic dinner table candles friends") | Liggande |
| `retreat-3.jpg`   | Skrivande/journal, blommor ("journaling flowers linen") | Stående |
| `lilac.jpg`       | Syrener i närbild ("lilac flowers close up") | Valfritt, dekor |

Krav:
- **Titta på varje bild** (öppna/läs bildfilen) innan du använder den. Den ska passa paletten och känslan, inte se ut som stockfoto.
- Bilderna ska upplevas som en sammanhållen serie: varma, dämpade och filmiska. Harmonisera med en gemensam CSS-behandling (t.ex. lätt varm ton via `filter: saturate(.9) sepia(.08)` eller en mjuk färgöverlagring).
- Optimera: max 2000px bred, sikta på under 300 KB per bild. Använd `loading="lazy"` (utom på hero-bilden), `object-fit: cover`, och sätt `width`/`height` så att layouten inte hoppar.
- Beskrivande `alt`-text på svenska.
- Skriv källa, fotograf och licens för varje bild i `images/CREDITS.md`.
- Om originalbilden på Alva & Siri är bifogad: beskär ut den övre delen med deras ansikten (där ingen text täcker) och använd den i Om oss-sektionen. Notera i README att de bör byta till en högupplöst version.
- Om du inte kommer åt webben: skapa i stället stämningsfulla illustrationer i SVG/CSS i samma palett, och skriv i README vilka foton som borde läggas in.

### 6.2 Illustrationer (gör själv som SVG)
- Logotypsymbol: enkel måncykel (fyra små cirklar från ny- till fullmåne) eller stiliserad blomma.
- Botaniska linjeteckningar (syrenkvist, blad), med tunn linje i wine eller sage.
- Ikoner till de sex arbetssätten (avsnitt 8.5) och de fyra cykelfaserna, i samma linjestil.
- Organiska blob-former.
- Favicon (samma symbol som logotypen).

## 7. Animationer

Animationerna ska kännas **lugna, mjuka och andningsliknande**, som sidans tema. Inget studsigt eller hetsigt. Använd CSS-animationer, IntersectionObserver och Web Animations API. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`, durationer runt 0.6–1.2s.

Var animationerna passar:
- **Hero vid sidladdning:** rubriken visas ord för ord med fade och liten rörelse uppåt (stagger). Hero-bilden avslöjas med en `clip-path`-animation som "växer upp" ur valvformen. Därefter tonas underrubrik och knappar in.
- **Blobs:** långsam, kontinuerlig "andning" (scale/morph över 12–20s) bakom bilder.
- **Scroll-reveal:** sektioner, kort och bilder tonas in och glider upp när de kommer in i bild, i stagger för rutnät.
- **Handritade linjer:** SVG-linjer och botaniska illustrationer "ritas fram" (`stroke-dasharray`/`stroke-dashoffset`) när de scrollas in.
- **Bilder:** subtil parallax (bilden rör sig lite långsammare än sidan) och mjuk zoom vid hover på desktop.
- **Cykelringen (8.4):** faserna tänds en i taget i ett långsamt varv när sektionen syns. Vid hover/klick på en fas förstoras den mjukt och texten växlar med crossfade.
- **Ordslinga:** ett horisontellt, långsamt rullande band med ord i stor kursiv serif: "Vila · Gemenskap · Rörelse · Cykel · Kropp · Närvaro · God mat ·". Pausas vid hover.
- **Nedräkning:** "Om X dagar" till nästa retreat, där siffran räknar upp när den syns.
- **Knappar:** mjukt färgskifte och 2px lyft vid hover. Den primära knappen kan ha en diskret "glow"-puls var 6:e sekund i heron.
- **Header:** får mjukt bakgrund och skugga vid scroll och döljs vid scroll nedåt/visas vid scroll uppåt på mobil.
- **Formulär:** fält-etiketter flyter upp vid fokus. Efter skickat formulär ritas en blomma fram i SVG, följt av tackmeddelandet.
- **Sidövergångar:** lätt fade mellan sidorna (View Transitions API där det stöds, annars ingen effekt).

Krav: respektera `prefers-reduced-motion` (stäng av rörelse men behåll innehållet synligt), animera bara `transform`/`opacity`/`clip-path` för jämn prestanda, och se till att allt innehåll syns även om JavaScript inte laddas.

## 8. Startsidan (index.html)

### 8.1 Header / navigering
- Logotyp till vänster: "Alva & Siri" i Cormorant Garamond, vinröd, med SVG-symbolen.
- Länkar: Om oss · Menscykeln · Retreats · Röster · Frågor
- Primär knapp till höger: **"Anmäl intresse"** (länk till `anmal.html`).
- Sticky header. På mobil: hamburgermeny som öppnar en animerad helskärmsmeny med stora serif-länkar.

### 8.2 Hero
- Stor rubrik: **"Lär känna din *cykliska* kropp"** (där "cykliska" är kursiv).
- Underrubrik: "Retreats om menscykeln, hormoner och kvinnokroppen, med gemenskap, vila och god mat."
- Knappar: "Anmäl intresse" (primär) och "Se kommande retreat" (sekundär, scrollar till 8.6).
- Stor bild i valvform (`hero.jpg`) med en blob bakom och en botanisk linjeteckning.
- En flytande bricka över bilden: "Nästa retreat · 23–25 okt · Yxlan".

### 8.3 Om oss
- Överrubrik: "VILKA VI ÄR"
- Rubrik: "Hej, vi är *Alva & Siri*"
- Använd den här texten (den kommer ändras senare, så markera med `<!-- ÄNDRA HÄR -->`):

  > Vi är två vänner som någonstans på vägen hittade vår stora passion: kvinnokroppen och dess fantastiska cykel. Det som började med nyfikenhet, långa samtal och böcker som skickades fram och tillbaka har vuxit till något vi inte kan låta bli att dela med oss av.
  >
  > Vi tror att alla kvinnor förtjänar att förstå sin kropp, inte kämpa emot den. När vi lär oss lyssna på våra hormoner, vår energi och våra behov genom cykelns olika faser händer något. Vi blir snällare mot oss själva.
  >
  > Därför skapar vi rum där du får landa, äta gott, röra dig, vila och lära dig mer om dig själv, tillsammans med andra. Varmt, tryggt och utan krav. Välkommen till oss.
  >
  > Kramar och kärlek, Alva & Siri

- Layout: bild (`about.jpg` eller beskuret originalfoto) bredvid texten, överlappande med en blob. Signaturen "Alva & Siri" i kursiv serif, gärna som SVG-linje som ritas fram.

### 8.4 Menscykeln: de fyra faserna
Sidans visuella signatur. Visa cykeln som en **interaktiv ring** med fyra segment på desktop, och som swipe-bara kort (scroll-snap) på mobil:

1. **Menstruation: inre vinter.** Vila, reflektion och inåtvändhet. Kroppen ber om lugn.
2. **Follikelfas: inre vår.** Ny energi, nyfikenhet och lust att börja nytt.
3. **Ägglossning: inre sommar.** Utåtriktad, social och full av energi.
4. **Lutealfas: inre höst.** Avrundning, ärlighet och ett större behov av lugn.

Varje fas har en egen dämpad färg (wine, sage-light, blush, terracotta) och en egen SVG-ikon. I ringens mitt visas vald fas med rubrik och 2–3 meningar. Ingen medicinsk rådgivning, bara inspiration och kunskap.

### 8.5 Vad vi arbetar med
Rutnät med 6 kort (ikon + rubrik + en mening), med scroll-reveal i stagger:
Rörelse · Meditation & mindfulness · Womb work · Skriva & reflektera · Lyssna & dela · Skapa

Därefter ordslingan från avsnitt 7.

### 8.6 Kommande retreats (huvudfokus!)
Överrubrik: "KOMMANDE RETREATS". Rubrik: "Kom som du är, gå hem lite närmare dig själv".

**Huvudkort: höstretreat (stort och framträdande):**
- Bild: `yxlan.jpg` med ett kort ovanpå/bredvid.
- **Höstretreat på Yxlan**
- **När:** 23–25 oktober 2026
- **Var:** Siris landställe på Yxlan, Stockholms skärgård
- **Tid:** Fredag kl. 18.00 med middag. Avslut söndag efter lunch, runt kl. 13.00.
- **Investering:** 1 500 kr
- **Beskrivning:** "En helg fylld med mys, gemenskap, god mat och avslappning för kropp och sinne, och framför allt en helg där vi utforskar kvinnokroppen och vår menscykel på ett djupare plan."
- **Vi kommer göra:** rörelse, meditationer, womb work, skriva och reflektera, lyssna och skapa.
- **Ingår:** boende, all mat från fredagsmiddag till söndagslunch, alla pass och material.
- "Däremellan tar vi hand om dig ♡"
- Nedräkning: "Om X dagar" (räknas ut med JS från dagens datum, och döljs när datumet har passerat).
- Tagg: "Få platser kvar" i terracotta (lätt att ta bort).
- Knappar: **"Anmäl intresse"** (primär, länkar till `anmal.html?retreat=host-2026`) och "Läs mer" (till `retreat.html`).

**Mindre teaser-kort bredvid/under:**
- **Vårretreat 2027.** "Datum släpps snart. Anmäl intresse så hör vi av oss först till dig." Knapp: "Anmäl intresse" (till `anmal.html?retreat=var-2027`).

Gör det enkelt att lägga till fler retreat-kort genom att kopiera ett HTML-block (kommentera hur).

### 8.7 Röster från deltagare
Rubrik: "Det här säger *de som varit med*". Visa citaten i stor kursiv serif i en mjuk, automatiskt bläddrande karusell (pausas vid hover/fokus, med pilar och prickar och swipe på mobil) eller som ett asymmetriskt rutnät. Citaten är uppenbart påhittade platshållare, så markera med `<!-- ÄNDRA HÄR: byt till riktiga citat -->`:

1. "Jag kom dit stressad över mina guldmynt och åkte hem i fas med min inre vinter. Bästa helgen på länge." **Krösus Sork**
2. "Maten! Gemenskapen! Jag har aldrig förstått min kropp så bra som efter den här helgen." **Nalle-Maja**
3. "Jag trodde womb work var något man gjorde med en spade. Nu vet jag bättre, och jag är så tacksam." **Lilla My**
4. "Alva och Siri har en magisk förmåga att få en att känna sig hemma. Jag gråt, skrattade och åt tre portioner." **Brummelisa**
5. "Som en varm filt för själen. Jag har redan bokat in mig på nästa." **Snorkfröken**

### 8.8 Vanliga frågor
Dragspel (`<details>`/`<summary>` med mjuk öppna/stäng-animation och en +-ikon som roterar till ×). Skriv varma, rimliga svar:
- Behöver jag några förkunskaper?
- Vad ska jag ta med mig?
- Hur tar jag mig till Yxlan?
- Vad händer om jag har mens under helgen? (Svaret ska vara varmt och avdramatiserande, t.ex. "Perfekt! Då får du uppleva din inre vinter tillsammans med oss.")
- Passar det mig som använder hormonella preventivmedel eller inte har mens?
- Hur går anmälan till? (Du anmäler intresse via formuläret, sedan hör vi av oss med mer info och betalning.)

### 8.9 Avslutande uppmaning
En bred sektion på `--wine` med cream-text: "Redo att lära känna din kropp på djupet?" och en stor knapp "Anmäl intresse". Lägg en botanisk illustration som ritas fram.

### 8.10 Footer
- Bakgrund `--wine-dark`, text i cream.
- Logotyp, en kort mening ("Retreats om kvinnokroppen och menscykeln"), navigeringslänkar, © 2026 Alva & Siri.
- **Ingen e-post och ingen Instagram** någonstans på sidan.
- Diskret ansvarsfriskrivning: "Våra retreats ersätter inte medicinsk rådgivning. Kontakta vården vid besvär."

## 9. anmal.html: anmäl intresse

En egen, lugn och vacker sida. Det här ska vara den bästa formulärupplevelsen besökaren har haft.

- Layout desktop: formulär till vänster, och till höger en bild i valvform plus en sammanfattning av valt retreat (namn, datum, plats, pris). Sammanfattningen uppdateras när man byter retreat. På mobil hamnar sammanfattningen överst och komprimeras.
- Rubrik: "Anmäl ditt *intresse*". Ingress: "Fyll i formuläret så hör vi av oss med mer information. Anmälan är inte bindande."
- Fält:
  - Vilket retreat (val, förvalt utifrån `?retreat=` i URL:en): "Höstretreat på Yxlan, 23–25 okt 2026" / "Vårretreat 2027 (datum kommer)" / "Jag vill bara få veta om framtida retreats"
  - Namn *
  - E-post * (deltagarens, så att Alva & Siri kan svara)
  - Telefon (valfritt)
  - Allergier eller specialkost
  - "Har du varit på ett retreat med oss tidigare?" (ja/nej som snygga pill-val)
  - "Vad hoppas du få ut av helgen?" (textruta, valfritt)
  - Kryssruta * "Jag förstår att min intresseanmälan inte är bindande."
- Flytande etiketter, stora tryckytor (minst 44px), tydlig fokusmarkering.
- Validering i webbläsaren med vänliga felmeddelanden på svenska som visas vid fältet (t.ex. "Vi behöver din e-post för att kunna svara dig").
- **Skicka:** det finns ingen backend. Spara anmälan i `localStorage` och logga den i konsolen. Visa sedan en vacker bekräftelse: en SVG-blomma ritas fram och sedan visas "Tack, [förnamn]! Vi hör av oss snart. ♡" och en knapp tillbaka till startsidan. Lägg en tydlig kommentar i `main.js` om var man senare kopplar in en formulärtjänst (t.ex. Formspree eller Netlify Forms).

## 10. retreat.html (detaljsida)

Samma header och footer. Innehåll:
- Hero med bild, retreatens namn, datum, plats, pris och knappen "Anmäl intresse".
- "Det här väntar dig": längre, stämningsfull beskrivning.
- Bildgalleri (`retreat-1/2/3.jpg`) i asymmetriskt rutnät.
- **Schema som vertikal tidslinje** som ritas fram när man scrollar:
  - *Fredag:* 18.00 ankomst och te · 19.00 middag · 20.30 öppningscirkel
  - *Lördag:* morgonrörelse · frukost · womb work · lunch · skriva och reflektera · fri tid och vila · middag · kvällsmeditation
  - *Söndag:* mjuk morgon · frukost · skapa · avslutningscirkel · lunch · hemfärd runt 13.00
  - Markera att schemat är preliminärt.
- Vad som ingår / vad du tar med (två kolumner med ikoner).
- Om platsen: Yxlan i Stockholms skärgård, med bild och kort text om hur man tar sig dit (färja från Stockholm, och markera att detaljer kommer vid anmälan).
- Avslutande uppmaning med knappen "Anmäl intresse".

## 11. Kvalitet, tillgänglighet och SEO

- Semantisk HTML (`header`, `nav`, `main`, `section`, `footer`, korrekt rubrikordning).
- Fungerar med tangentbord. Karusell och cykelring är tangentbordsstyrbara med rätt ARIA-attribut.
- `<title>`, `<meta name="description">` och Open Graph-taggar på svenska för varje sida (så att länken ser snygg ut när den delas på Instagram/Facebook). Använd `hero.jpg` som OG-bild.
- Prestanda: inga onödiga skript, typsnitt med `display=swap`, optimerade bilder.
- Inga medicinska påståenden. Formulera kunskap som inspiration och erfarenhet, inte som behandling.

## 12. Ton och språk

Varm, personlig, inkluderande och lugn. Skriv som en vän som vet mycket, inte som en klinik. Använd "du". Korta stycken. Lite poetiskt får det gärna vara, men tydligt och konkret när det gäller praktisk info (datum, pris, plats, tider).

## 13. När du är klar

1. Starta sidan lokalt och granska den som designer på 375px, 768px och 1440px bredd. Ta skärmdumpar och putsa allt som inte ser genomarbetat ut (avstånd, linjering, bildbeskärning, radbrytningar i rubriker).
2. Testa alla länkar, menyn, cykelringen, karusellen, dragspelet, nedräkningen och formuläret (både fel- och lyckat fall, och att `?retreat=` förväljer rätt).
3. Testa med `prefers-reduced-motion` påslaget.
4. Skriv README med:
   - hur man startar sidan
   - kort motivering av designvalen
   - var man ändrar datum, pris och texter
   - hur man lägger till ett nytt retreat
   - vad som är platshållare: citat, Om oss-text och eventuellt foto på Alva & Siri
