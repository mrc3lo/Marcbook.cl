# Marcbook · Cosmos

Propuesta local de sitio en React + Vite. El sitio anterior permanece en la carpeta superior. Esta versión incluye paleta azul/cian, modo día y noche, textos ampliados y contacto por WhatsApp.

## Revisar y desarrollar

```sh
npm install
npm run dev
```

Abrir la dirección que imprime Vite. Para revisar sin servidor, abrir `REVISAR.html` con Chrome o Safari.

```sh
npm run preview:file  # Compila y regenera REVISAR.html
npm run check:dom     # Comprueba las interacciones del build en DOM simulado
```

`dist/` y `REVISAR.html` se generan automáticamente: editar los archivos de `src/`.

## Organización

```text
src/
├── main.jsx                   # Montaje de React y estilos
├── App.jsx                    # Orden y composición de las secciones
├── config/site.js             # Contacto, navegación y configuración del tema
├── data/
│   ├── services.js            # Catálogo de servicios
│   ├── faqs.js                # Preguntas y respuestas
│   ├── process.js             # Pasos de atención
│   └── contact.js             # Opciones del formulario
├── hooks/
│   ├── useTheme.js            # Tema, almacenamiento y color del navegador
│   └── useMotion.js           # Efectos y movimiento reducido
├── lib/whatsapp.js            # URLs y construcción de mensajes
├── components/
│   ├── layout/                # Header y Footer
│   ├── ui/                    # Marca, botones, selector de tema y tarjeta
│   ├── contact/ContactForm.jsx
│   └── effects/Cosmos.jsx
├── sections/                  # Un archivo por sección visible
└── styles/
    ├── index.css              # Orden explícito de la cascada
    ├── base.css, fonts.css
    ├── layout.css, footer.css
    ├── sections/              # Estilos base por sección
    ├── accessibility.css
    ├── responsive.css
    ├── readability.css
    ├── themes.css
    └── responsive-readability.css
```

`vite.config.js` configura la transformación automática de JSX. No se requiere importar React en cada componente.

## Dónde editar

| Cambio | Archivo |
| --- | --- |
| Orden de las secciones | `src/App.jsx` |
| Portada | `src/sections/HeroSection.jsx` |
| Textos y estructura de otra sección | Archivo correspondiente de `src/sections/` |
| Servicios | `src/data/services.js` |
| Preguntas frecuentes | `src/data/faqs.js` |
| Proceso de atención | `src/data/process.js` |
| Opciones de equipo y problema | `src/data/contact.js` |
| Teléfono, Instagram, ubicación y horario | `src/config/site.js` |
| Mensajes preparados | `src/lib/whatsapp.js` |
| Campos y comportamiento de consulta | `src/components/contact/ContactForm.jsx` |
| Portal animado | `src/components/effects/Cosmos.jsx` |
| Lógica del tema y los efectos | `src/hooks/` |
| Colores de los temas | `src/styles/themes.css` |
| Tamaños de lectura finales | `src/styles/readability.css` |
| Diseño base de una sección | `src/styles/sections/` |
| Ajustes móviles | `responsive.css` y `responsive-readability.css` |

El Canvas también define sus colores en `Cosmos.jsx`; el color de la barra del navegador está en `config/site.js`. La navegación se configura en ese mismo archivo. Los metadatos se definen en `src/config/seo.js` y se insertan en `index.html` desde `scripts/seo.mjs` durante desarrollo y compilación.

Los estilos se importan en orden desde `styles/index.css`. Los ajustes de legibilidad y responsive finales pueden prevalecer sobre los estilos base de cada sección. Se conserva el orden de la versión anterior para mantener su apariencia.

## Estados e interacciones

- `App` conecta `useTheme` y `useMotion` con la cabecera y la portada.
- `Header` controla el menú móvil.
- `ServicesSection` controla la plataforma seleccionada.
- `ContactForm` controla equipo, problema y detalle. La lógica del mensaje está en `lib/whatsapp.js`.
- `useTheme` guarda `light` o `dark` en `marcbook-theme`. Si no hay preferencia guardada, usa el modo nocturno, independientemente del tema del sistema; si el almacenamiento está bloqueado, funciona durante la sesión.
- `useMotion` respeta la preferencia de movimiento reducido y permite desactivar efectos. `Cosmos` dibuja el portal y limpia sus observadores y animación al desmontar.

No hay backend, cuentas ni base de datos. La consulta abre WhatsApp con un texto preparado; la persona lo revisa y envía. Los detalles no se almacenan en el sitio.

## Imágenes y revisión autónoma

Las fotos están en `public/trabajos/` y los logos oficiales en `public/logos/`. `make-preview.mjs` integra fotos, logos, estilos y JavaScript en `REVISAR.html`. Si se agregan más imágenes a la página, actualizar también ese generador para incluirlas en la versión autónoma.

Google Fonts necesita conexión; si no carga, se usan fuentes del sistema.

## Validación

La compilación y las pruebas funcionales de DOM pasaron después de la reorganización. También se comprobó que la reorganización modular conservó los textos y las reglas visuales de esa revisión. Posteriormente se integraron los logos oficiales en los componentes de marca. Cubren temas, persistencia, preferencia del sistema, almacenamiento bloqueado, movimiento reducido, menú, servicios, mensaje de WhatsApp y tamaños de texto.

Las pruebas de DOM no verifican la apariencia. El entorno impidió previamente abrir el puerto local y ejecutar Chrome automatizado; queda pendiente la inspección visual en navegador. `npm run check:browser` permite comprobar las interacciones y obtener capturas en un equipo que permita ejecutar Chrome. No envía mensajes.

## Arquitectura en Word

`docs/Arquitectura_Marcbook_Cosmos.docx` contiene la revisión 5: SEO, HTML prerenderizado, identidad y estructura modular, árbol de componentes, propiedad de los estados, guía de edición, temas y publicación pendiente.

Regenerar con:

```sh
python3 docs/crear_arquitectura.py
```

## Publicación posterior

El repositorio de destino es `mrc3lo/Marcbook.cl`. La raíz incluye configuración para instalar y construir esta aplicación y publicar `propuesta-react/dist`; también se admite usar `propuesta-react` como Root Directory de Vercel y publicar `dist`. Consultar el README de la raíz. El dominio canónico es `https://www.marcbook.cl/`. Los artefactos `REVISAR.html` y `dist/` se generan y no se versionan.


## Logos oficiales

Las copias de `LOGO-SIN FONDO-01.png` y `LOGO-SIN FONDO-02.png`, procedentes de la carpeta original `../logos/`, se conservan íntegras en `public/logos/`.

- `src/config/branding.js`: rutas y encuadre del área visible de cada PNG.
- `src/components/ui/Logo.jsx`: muestra la imagen original dentro de un SVG con viewBox, evitando el gran margen transparente del archivo.
- `Brand.jsx`: usa el logo horizontal en cabecera y pie; la sección Sobre mí usa el logo apilado.
- `src/styles/branding.css`: tamaños de marca en escritorio y móviles.
- `npm run brand:favicon`: regenera el icono del navegador desde el PNG oficial apilado. Ejecutar después `npm run preview:file` para actualizar la revisión autónoma.

Se conservan los colores y proporciones originales tanto en modo día como en modo noche. No se aplican filtros de color ni se recrean las letras con tipografía.


## SEO y HTML prerenderizado

`npm run build` compila el cliente, genera temporalmente `src/entry-server.jsx` con Vite y ejecuta `scripts/finalize-build.mjs`. La salida `dist/index.html` contiene todo el contenido, datos estructurados y metadatos. No se necesita un servidor de React en producción. `.prerender/` se elimina al terminar.

`src/main.jsx` hidrata ese HTML y, en desarrollo sin contenido previo, monta React normalmente. Los hooks arrancan con valores consistentes para evitar errores de hidratación y después restauran las preferencias del visitante.

- Editar título y descripción en `src/config/seo.js`.
- Confirmar `site.url` en `src/config/site.js` antes de publicar: está preparado para `https://www.marcbook.cl/`.
- `robots.txt` y `sitemap.xml` se generan en `dist/` con ese dominio.
- `npm run check:seo` comprueba metadatos, HTML inicial, datos estructurados, fotos y rastreo; ejecutar después de compilar.
- Las fotografías servidas por la página usan `public/trabajos/optimized/`. Los originales permanecen disponibles.
- `REVISAR.html` lleva noindex; se publica `dist/` usando el build completo configurado en `vercel.json`.
- Se indica atención con coordinación previa en Concepción y se mantiene privada la dirección residencial.

Informe de implementación y controles pendientes: [docs/Revision_SEO_Marcbook.md](docs/Revision_SEO_Marcbook.md). Las posiciones de Google, Search Console, ficha de negocio, dominio y rendimiento real requieren verificación externa después de publicar.
