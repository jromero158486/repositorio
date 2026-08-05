# Sitio nuevo de Joselyn Romero

## Qué es esto
5 páginas HTML estáticas (sin build tools, sin frameworks) listas para GitHub Pages:
`index.html` (About), `research.html`, `publications.html`, `awards.html`, `leadership.html`,
más `styles.css` y `script.js` compartidos.

## Antes de publicar — 3 cosas que te faltan

1. **Copia tu carpeta `/images` actual** (la de tu repo `jromero158486.github.io`) dentro de
   esta carpeta, sin cambiar nombres de archivo — ya reutilicé los mismos nombres
   (`mit1.png`, `cornell.png`, `davis.png`, etc.) así no tienes que resubir nada.
   La única imagen nueva que uso es tu foto de perfil: `images/photo1.png` (ya la tenías).

2. **Tu CV en PDF** va en `files/Joselyn_Romero_Resume_.pdf` (crea la carpeta `files/`).

3. **Revisa `leadership.html`** — armé esa página con lo que ya tenías en Awards/bio
   (chapter IEEE EMBS, Kectil, IEEE WIE, SPIRSE, etc.). Si tienes cargos específicos
   (ej. título exacto en el capítulo IEEE EMBS, talleres que hayas dictado, mentorías),
   mándamelos y te los agrego como tarjetas propias.

## Cómo subirlo a GitHub Pages
Reemplaza el contenido de tu repo `jromero158486.github.io` con estos archivos
(manteniendo `/images` y `/files`), haz commit y push a la rama `main` — Pages lo
publica solo, normalmente en 1–2 minutos.

## Notas de diseño
- Estilo: negro puro + tipografía grande (Bricolage Grotesque), inspirado en guglieri.com/talks.
- El elemento de firma es una onda tipo PPG/biosignal (tu propia área de investigación)
  que se "dibuja" al hacer scroll — aparece en cada página como divisor.
- El reloj de la esquina (Ithaca, NY) es en vivo, se actualiza solo.
- Las 8 entradas de research.html son acordeón: clic para expandir/colapsar el detalle.
- Todo funciona sin JavaScript también (el contenido nunca queda oculto si el JS falla).
