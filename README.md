# Sathana S — Data Science / ML Portfolio

A single-page, ATS-friendly, fully responsive portfolio built with plain HTML, CSS, and JavaScript (no build step, no framework required).

## File structure

```
portfolio/
├── index.html          # All content + semantic structure + SEO/structured data
├── css/
│   └── style.css        # Design tokens, layout, dark/light theme, animations
├── js/
│   └── script.js         # Theme toggle, mobile nav, typing effect, scroll reveal, form
├── assets/
│   └── Sathana_Resume.pdf   # Downloadable résumé (linked from the Hero CTA)
└── README.md
```

## Design notes

- **Theme**: dark by default with a light-mode toggle (persisted in `localStorage`), built around a "model status" / notebook motif — a typed terminal panel in the hero, skill confidence bars, and dataset-style project tags.
- **Fonts**: Space Grotesk (display), Inter (body), IBM Plex Mono (data/labels) — loaded from Google Fonts.
- **Accessibility**: skip-to-content link, visible focus states, `aria-live` form status, `prefers-reduced-motion` respected throughout, semantic landmarks (`header`, `main`, `section`, `footer`).
- **SEO**: descriptive `<title>`/meta description, Open Graph tags, and a `Person` JSON-LD block so search engines and some ATS parsers can read your identity and links directly.
- **ATS-friendliness**: all content is real text (no content baked into images), heading hierarchy is logical (h1 → h2 → h3), and the résumé PDF stays downloadable as the canonical ATS document — this site is the discovery layer, your PDF remains the parse-friendly artifact recruiters upload to their ATS.

## Local setup

No build tools needed.

```bash
# Option A — just open it
open index.html      # macOS
start index.html      # Windows

# Option B — serve it locally (recommended, avoids some browser file:// restrictions)
python3 -m http.server 5500
# then visit http://localhost:5500
```

## Before you deploy

1. Replace `assets/Sathana_Resume.pdf` with your latest résumé if it changes (keep the filename or update the `href` in `index.html`'s hero CTA).
2. Update the `url` field in the JSON-LD block in `<head>` to your real deployed domain.
3. Wire up the contact form to an actual backend (see below) — right now it only shows a success message locally.
4. Optional: add a real `assets/og-image.png` (1200×630) for nicer social-media link previews.

## Deployment

### GitHub Pages
1. Push this folder to a repo (e.g. `sathana495/portfolio`).
2. Repo → **Settings → Pages** → Source: `main` branch, `/root`.
3. Site goes live at `https://sathana495.github.io/portfolio/`.

### Netlify
1. Drag-and-drop the `portfolio/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), **or**
2. Connect the GitHub repo → build command: *none* → publish directory: `/` (or `portfolio` if nested).

### Vercel
1. `npm i -g vercel` (one-time), then from inside the `portfolio/` folder run `vercel`.
2. Accept defaults — it's a static site, so no framework preset/build command is needed.

## Wiring up the contact form

The form currently only validates and shows a client-side confirmation message. To actually receive messages without running your own backend, pick one:

- **Formspree** — add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>`, remove the `preventDefault()` in `script.js`, and Formspree emails you each submission.
- **EmailJS** — keep the JS-driven submit, call `emailjs.send(...)` inside the existing `submit` handler.
- **Netlify Forms** — if hosting on Netlify, just add `data-netlify="true"` and a hidden `form-name` input to the `<form>` tag; Netlify handles the rest automatically.

## Enhancement suggestions

- **Project images/GIFs**: add a short screen-recording or chart screenshot to each project card — recruiters skim visuals faster than bullet points.
- **Live demo links**: if any Streamlit apps are deployed (Streamlit Community Cloud is free), link "Live Demo" alongside "GitHub" on each project card.
- **Blog / case studies**: a `/writing` section with 1–2 deep-dive posts on the Accident Severity or Churn projects would differentiate you further than bullet points can.
- **Analytics**: add a privacy-friendly analytics snippet (e.g. Plausible or GoatCounter) to see which sections recruiters actually read.
- **React/Next.js migration**: if you outgrow a static site (e.g. want a CMS-driven blog), the content in `index.html` maps cleanly onto components (`Hero`, `About`, `SkillGroup`, `ProjectCard`, `TimelineItem`) — Next.js + Vercel would be the natural next step, keeping the same design tokens as CSS variables or a Tailwind theme.
- **Testimonials/recommendations**: once you have manager or peer quotes from InternsElite/LIVEWIRE, a short quote strip near Experience adds social proof.
- **Automated résumé sync**: keep this site and your résumé PDF generated from one source of truth (e.g. a JSON/YAML data file) so updating one doesn't mean manually re-editing the other.
