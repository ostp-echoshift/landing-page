# DEPLOY CHECKLIST - OSTP @echoShift - Nivel E
# Generado: 2026-03-31 11:03:09

## Pre-deploy

[ ] Abrir index_rebuild.html en Chrome - revisar visual completo
[ ] Revisar mobile (DevTools F12 > Toggle device toolbar)
[ ] Verificar que cards de servicios cargan (fetch services.json)
[ ] Verificar FAQ accordion abre y cierra
[ ] Verificar smooth scroll desde nav links
[ ] Verificar custom cursor funciona
[ ] Verificar WA float boton visible y link correcto
[ ] Verificar logo SVG animado visible en hero bg
[ ] Revisar meta description en <head>
[ ] Revisar title tag

## Deploy

[ ] Rename-Item index.html index_monolith.html
[ ] Rename-Item index_rebuild.html index.html
[ ] git add .
[ ] git commit -m 'deploy: Leviatan build OSTP @echoShift'
[ ] git push origin main

## Post-deploy

[ ] Abrir https://www.ostp-echoshift.com - confirmar carga
[ ] Confirmar HTTPS activo (candado verde)
[ ] Test mobile en celular real
[ ] Compartir URL con Harry (feedback cliente)

<!--OSTP-CHECKLIST-->