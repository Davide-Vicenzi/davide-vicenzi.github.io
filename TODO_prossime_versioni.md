# Sito personale — Roadmap prossime versioni

## Foto profilo (quando disponibile)
- [ ] Sostituire il placeholder nell'**hero** (`<div class="hero-avatar">`) con un tag `<img>`:
  ```html
  <img src="foto.jpg" alt="Davide Vicenzi">
  ```
  Rimuovere gli span `.hero-avatar-initials` e `.hero-avatar-hint`.
- [ ] Sostituire il placeholder nella **nav** (`<div class="nav-avatar" id="nav-avatar">`) con:
  ```html
  <img src="foto.jpg" alt="Davide Vicenzi">
  ```
  Rimuovere lo span `.nav-avatar-initials`.
- Formato consigliato: JPEG o WebP, dimensione minima 300×300px, ritaglio quadrato.

---

## Case studies
- [ ] Raccogliere 2–3 case study con dati concreti (tempi, risultati misurabili, contesto)
- [ ] Ottenere **autorizzazione scritta** dal cliente prima di qualsiasi pubblicazione
- [ ] Definire il template visivo (es. card con: contesto / sfida / soluzione / risultato)
- [ ] Valutare se aggiungere una sezione dedicata o integrare nei singoli "Ambiti di intervento"

## Recensioni / testimonial clienti
- [ ] Richiedere testimonial ai clienti attuali (testo breve + nome/ruolo/azienda o anonimizzato)
- [ ] Decidere il formato di presentazione (citazione con attribuzione, logo azienda, etc.)
- [ ] Integrare nella sezione "Con chi lavoro" o in una sezione apposita

---

## Formspree — attivazione invio form
- [x] Registrato su https://formspree.io
- [x] Form creato e ID configurato — endpoint attivo: `https://formspree.io/f/xojzgqav`

---

## Contenuti futuri
- [ ] **Sezione Bitcoin/interessi personali** — da valutare in v2 come narrativa personale
      (nodo, home mining, uso quotidiano — non come pitch commerciale)
- [ ] **Dominio personalizzato** — es. davidevicenzi.it o davidevicenzi.com

---

## Tecnico / infrastruttura
- [x] Sito pubblicato su GitHub Pages — URL live: https://davide-vicenzi.github.io/
- [x] CDN valutata — non necessaria: GitHub Pages usa già Fastly, font su Google Fonts CDN
- [x] Meta tag Open Graph e Twitter Card configurati
- [x] `og-image.jpg` creata e caricata nel repository
- [x] Umami Cloud configurato — tracking attivo (ID: `aee1fbe9-f34b-44ff-8fbf-5df45b9bd2ed`)
- [x] Favicon implementata: `favicon.svg` (browser moderni) + `favicon.ico` (fallback) + `apple-touch-icon.png` (iOS)
- [x] `<link rel="canonical">` aggiunto
- [x] `<meta name="theme-color">` aggiunto (barra browser mobile verde #0E3F35)
- [x] `<meta name="author">` aggiunto
- [x] `robots.txt` creato (Allow: *, riferimento sitemap)
- [x] `sitemap.xml` creato (pagina singola, aggiornare `lastmod` ad ogni pubblicazione)
- [x] `404.html` personalizzata — stessa palette e logo del sito

## Bassa priorità — da rivalutare dopo foto, case studies e recensioni
- [ ] Minificazione CSS/JS (file già sotto 20KB, impatto trascurabile)
- [ ] Service Worker / PWA (overkill per questo tipo di sito)
- [ ] Lazy loading immagini (rilevante dopo inserimento foto profilo e immagini case study)

---

## Analytics privacy-first — analisi comparativa

### Perché non Google Analytics
GA4 raccoglie dati personali (IP, fingerprint del browser, comportamento cross-site) e richiede il banner cookie per essere conforme al GDPR. Su un sito professionale B2B il banner è rumore, e affidarsi a Google per i dati dei tuoi potenziali clienti è una scelta di cui vale la pena valutare le alternative.

---

### Opzione A — Umami ⭐ consigliato per GitHub Pages
**Cos'è:** script open source, auto-hostabile o in cloud.
**Piano cloud gratuito:** 3 siti, 100.000 eventi/mese — più che sufficiente.
**Privacy:** nessun cookie, nessun dato personale, conforme GDPR senza banner.
**Dati disponibili:** visite, pageview, provenienza (referrer, paese), dispositivo, browser, durata sessione.

**Integrazione (2 minuti):**
1. Creare account su https://cloud.umami.is
2. Aggiungere il sito e copiare il tracking script
3. Incollare prima di `</body>` in `index.html`:
```html
<script defer src="https://cloud.umami.is/script.js"
        data-website-id="IL-TUO-ID"></script>
```

---

### Opzione B — Plausible
**Cos'è:** analogo a Umami, design più curato, prodotto più maturo.
**Piano gratuito:** non esiste — trial 30 giorni, poi €9/mese.
**Quando ha senso:** se vuoi un'interfaccia più raffinata e sei disposto a pagare.
**Privacy:** identica a Umami, nessun cookie.

---

### Opzione C — Cloudflare Web Analytics
**Cos'è:** analytics integrato nella CDN Cloudflare, gratis se il sito passa per Cloudflare.
**Piano gratuito:** sì, illimitato.
**Limite:** richiede di passare il DNS del dominio su Cloudflare, meno rilevante su GitHub Pages con dominio github.io.
**Privacy:** no cookie, ma i dati restano nell'ecosistema Cloudflare.

---

### Confronto rapido

| | Umami Cloud | Plausible | Cloudflare |
|---|---|---|---|
| Costo | Gratis | €9/mese | Gratis |
| Cookie | No | No | No |
| Banner GDPR | Non necessario | Non necessario | Non necessario |
| Self-hostabile | Sì | Sì | No |
| Integrazione | Script tag | Script tag | DNS |
| Dati disponibili | ★★★★ | ★★★★★ | ★★★ |

**Raccomandazione per la situazione attuale:** **Umami Cloud**, piano free. Zero costo, zero cookie, integrazione in 5 minuti su GitHub Pages.

---

## Open Graph — condivisione professionale su LinkedIn

### Cos'è
Quando condividi un link su LinkedIn (o WhatsApp, Slack, etc.), la piattaforma va a leggere il tuo sito e genera automaticamente un'anteprima: titolo, descrizione e immagine. Quell'anteprima è costruita dai **meta tag Open Graph** presenti nell'`<head>` dell'HTML.

Senza questi tag, LinkedIn genera un'anteprima casuale (o non la genera affatto), prendendo testo e immagine a caso dalla pagina. Il risultato è spesso brutto o fuorviante.

### Cosa vede chi riceve il link — con vs senza OG

**Senza tag OG:**
```
┌─────────────────────────────────┐
│  [nessuna immagine / logo caso] │
│  davide-vicenzi.github.io       │
│  Davide Vicenzi — Consulente... │
└─────────────────────────────────┘
```

**Con tag OG configurati:**
```
┌─────────────────────────────────┐
│  [tua foto professionale, 1200x630px] │
│  Davide Vicenzi                 │
│  Consulente BI & Performance    │
│  Management · Ingegnere di      │
│  processo                       │
└─────────────────────────────────┘
```

### I tag da aggiungere in `<head>` di `index.html`

```html
<!-- Open Graph / LinkedIn -->
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://davide-vicenzi.github.io/">
<meta property="og:title"       content="Davide Vicenzi — Consulente BI & Performance Management">
<meta property="og:description" content="Libero professionista in Business Intelligence e Corporate Performance Management su piattaforma Board, con un percorso da ingegnere chimico di processo.">
<meta property="og:image"       content="https://davide-vicenzi.github.io/og-image.jpg">
<meta property="og:locale"      content="it_IT">

<!-- Twitter/X Card (opzionale ma consigliato) -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="Davide Vicenzi — Consulente BI & Performance Management">
<meta name="twitter:description" content="Libero professionista in Business Intelligence e Corporate Performance Management su piattaforma Board.">
<meta name="twitter:image"       content="https://davide-vicenzi.github.io/og-image.jpg">
```

### Il punto critico: l'immagine `og:image`

Questa è la parte che richiede un'azione manuale. LinkedIn la usa come "copertina" del link condiviso.

**Specifiche tecniche:**
- Formato: JPEG o PNG
- Dimensioni: **1200 × 630 px** (rapporto 1.91:1) — obbligatorio per LinkedIn
- Peso: sotto i 5 MB (consigliato sotto 1 MB)
- Nome file: salvare come `og-image.jpg` nella root del repository GitHub

**Contenuto consigliato per un profilo professionale:**
- Sfondo con il colore primario del sito (`#0E3F35`) o variante
- Nome e titolo professionale in grande
- Eventuale tua foto in piccolo a lato
- Logo "DV." in un angolo

Può essere creata con Canva (template "LinkedIn post") o con qualsiasi editor grafico. Una volta creata, caricarla nel repository GitHub e aggiungere i tag OG all'HTML — a quel punto lo possiamo integrare insieme.

### Come verificare che funzioni
Dopo aver pubblicato, usare il **LinkedIn Post Inspector**:
https://www.linkedin.com/post-inspector/
Incollare l'URL del sito: LinkedIn mostra esattamente come apparirà l'anteprima e, se necessario, forza l'aggiornamento della cache.
