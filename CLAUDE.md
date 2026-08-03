# Certificaciones de IA

Web estática (vanilla HTML/CSS/JS, sin build tools ni dependencias) para mostrar mis certificaciones de Inteligencia Artificial. Estilo inspirado en [Wildpedia](https://github.com/adlopp/Wildpedia).

## Estructura

- `index.html` — marcado, con atributos `data-i18n` / `data-i18n-placeholder` para textos traducibles.
- `styles.css` — variables CSS para theming (`:root` / `[data-theme="dark"]`), grid responsive con 3 breakpoints.
- `certifications.js` — **único archivo que se edita para añadir/quitar certificaciones** (array `CERTIFICATIONS`).
- `script.js` — toda la lógica: i18n ES/EN, modo oscuro, búsqueda con sugerencias, tarjetas animadas (IntersectionObserver), modal de detalle.

## Añadir una certificación

Editar el array `CERTIFICATIONS` en `certifications.js`. Campos: `id`, `title`, `issuer`, `date` (`YYYY-MM-DD`), `credentialId`, `credentialUrl`, `image`, `description`.

No hay sistema de categorías/filtros — de momento todas las certificaciones son de IA, así que no aporta valor filtrar por tema. Si en el futuro se diversifican mucho los temas, se podría reintroducir.

**Flujo cuando el usuario pasa solo una URL de verificación** (ej. un link de Skilljar/Credly/etc.):
1. Hacer `WebFetch` de la URL para extraer: nombre del curso/certificación, emisor, fecha de emisión, credential ID y la propia URL de verificación.
2. Añadir un nuevo objeto al array `CERTIFICATIONS` con esos datos.
3. `image`: para certificaciones de Anthropic/Claude, usar el logo oficial ya guardado en `assets/claude-logo.svg` (icono "sunburst" naranja, vectorial, descargado de `https://claude.ai/favicon.svg` — preferir SVG sobre PNG/JPG siempre que exista, para que no se vea borroso al escalar en las tarjetas) — no generar una imagen distinta por certificado. Para otras certificaciones (AWS, Google, etc.), buscar y descargar el logo del emisor de forma similar (SVG si está disponible, si no un PNG de la mayor resolución posible) y guardarlo en `assets/<emisor>-logo.svg`/`.png` para reutilizarlo entre todas sus certificaciones. Si no hay logo disponible, dejar `image` vacío (se muestra un icono 🏅 por defecto).
4. No hace falta pedir confirmación de cada campo: si el fetch trae título, emisor, fecha, credential ID y link, es suficiente para crear la entrada directamente.

Certificaciones ya cargadas como referencia de formato: "Claude 101" y "Claude Code 101" (Anthropic Education, ambas usan `assets/claude-logo.svg`).

**Flujo cuando el usuario sube un PDF de certificado de completado a `assets/`:**
1. PyMuPDF (`fitz`) está instalado en el Python del sistema por si hace falta renderizar un PDF a imagen (poppler, ImageMagick no están disponibles en esta máquina). No usarlo para generar la imagen de la tarjeta si el emisor ya tiene logo en `assets/` (ver punto 3 anterior) — solo sirve para extraer datos (nombre, curso) si no vinieran ya claros, o si se decide mostrar el certificado en sí en vez del logo del emisor.
2. Pedir al usuario los datos que no están en el PDF si hace falta (título exacto, emisor, fecha, credential ID/URL si existen).
3. Añadir/actualizar la entrada en `CERTIFICATIONS`.
4. Preguntar si se debe borrar el PDF original de `assets/` (para no publicarlo en la web) o dejarlo — dejarlo y usarlo como `credentialUrl` (ruta relativa `assets/<id>.pdf`) es la opción por defecto cuando el emisor no tiene un link de verificación público estable (ej. BIG school: el certificado se descarga como PDF puntual, sin URL de verificación propia, y el propio usuario reporta que a veces retiran el acceso). Nunca depender de un enlace externo (Google Drive, portal del emisor, etc.) para la credencial — mejor autoalojarla en el repo, igual que con las imágenes de los logos.

## Convenciones

- No introducir frameworks ni build tools; el proyecto se sirve tal cual (útil para GitHub Pages).
- Cualquier texto visible nuevo debe añadirse en ambos idiomas dentro del objeto `I18N` en `script.js`, no hardcodeado en el HTML.
- Los datos de contacto (GitHub, LinkedIn, email, teléfono) están en el footer de `index.html`; no se ha añadido botón de descarga de CV porque la web se distribuye a través del propio CV.
