# OSTP @echoShift - Landing Page

**Operador:** Chavalow - OSTP @echoShift - Zapopan, Jalisco MX
**Pipeline:** Leviatan A-E
**Live:** https://www.ostp-echoshift.com
**Repo:** github.com/ostp-echoshift/ostp-echoshift
**Build:** 2026-03-31 11:03:09

## Stack

- HTML5 + CSS3 (sin frameworks)
- Vanilla JS (sin dependencias)
- GitHub Pages (deploy estatico)
- Fuentes: Fraunces + Syne + DM Sans (Google Fonts)

## Estructura

    index.html          - produccion actual (monolitico)
    index_rebuild.html  - nueva version modular (Leviatan C)
    css/tokens.css      - design system tokens
    css/base.css        - reset + utilidades
    css/hero.css        - nav + hero + botones
    css/components.css  - cards + WA float
    css/sections.css    - todas las secciones
    js/main.js          - nav + cursor + FAQ + services fetch
    js/reveal.js        - IntersectionObserver reveal
    data/services.json  - servicios OSTP (editable)
    assets/logo/        - ostp_logo_animated.svg + ostp_logo_traced.svg

## Deploy (Nivel E)

    Rename-Item index.html index_monolith.html
    Rename-Item index_rebuild.html index.html
    git add .
    git commit -m 'deploy: Leviatan build OSTP @echoShift'
    git push origin main

## Design System

    --ostp-primary:  #2E91CF
    --ostp-deep:     #0A507C
    --ostp-accent:   #715BD8
    --cyan:          #00C8A0
    --bg-page:       #060810
    --bg-header:     #0D1F35
    --font-display:  Fraunces
    --font-ui:       Syne
    --font-body:     DM Sans

<!--OSTP-README-->