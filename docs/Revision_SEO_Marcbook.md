# Revisión SEO · Marcbook

Revisión local previa a publicación · 28 de octubre de 2026.

La base técnica está preparada y comprobada localmente. No se garantiza una posición concreta en Google. La indexación y el posicionamiento solo podrán evaluarse sobre el dominio publicado y con acceso a las herramientas de Google.

## Cambios implementados

| Área | Resultado |
| --- | --- |
| Título | Servicio técnico MacBook y PC en Concepción \| Marcbook |
| Descripción | Servicios, ciudad y atención con coordinación previa; coherente con el contenido visible. |
| HTML inicial | La compilación genera las secciones completas. No depende de ejecutar JavaScript para leer servicios, preguntas o contacto. |
| React | Hidrata el HTML estático y conserva el modo nocturno predeterminado, la preferencia guardada y el control de efectos. |
| Contenido local | La portada menciona servicio técnico de MacBook, iMac y PC en Concepción. Se conserva el titular creativo y los elementos que el propietario ocultó. |
| Identidad | Logos originales, teléfono e Instagram confirmados. |
| Atención | Se publica “Atención con coordinación previa”. No se publica dirección residencial, mapa de la casa ni coordenadas de un local. |
| Canónica | `https://www.marcbook.cl/`, coherente con Open Graph, JSON-LD y sitemap. Confirmar que sea el host principal en Vercel antes de publicar. |
| Indexación | Metadato de producción `index, follow, max-image-preview:large`, robots.txt y sitemap.xml generados. |
| Compartir enlaces | Open Graph y tarjetas de redes con PNG dedicado del logo oficial, descripción y URL absoluta. La foto real se mantiene como imagen de contenido en los datos estructurados. No se consideran por sí solos una mejora de ranking. |
| Datos estructurados | Organization, WebSite, WebPage y seis Service enlazados; se generan desde la configuración y el catálogo reales. |
| Fotografías | Copias optimizadas, dimensiones explícitas, texto alternativo, carga diferida y decodificación asíncrona. Los originales se conservan. |
| Fuentes | Conexiones anticipadas y hoja de fuentes descubierta desde el HTML, con display=swap y fuentes de respaldo. |
| Vercel | Configuración local explícita de build completo y salida dist; redirección permanente de /index.html a /. |
| Revisión autónoma | REVISAR.html integra recursos y lleva noindex para distinguirse de la página de producción. No debe publicarse en sustitución de dist/. |

## Decisiones sobre datos estructurados

Se usa Organization con catálogo de servicios y área atendida en Concepción. No se añadió LocalBusiness incompleto: el formato de resultados enriquecidos de negocio local requiere una dirección, y no existe una dirección pública confirmada para publicar. Tampoco se inventaron calificaciones, reseñas, precios, sucursales ni credenciales Apple.

Las preguntas siguen visibles en la página. No se promete un resultado enriquecido FAQ para este negocio. El JSON-LD se comprueba como JSON y como grafo coherente; queda pendiente la prueba oficial de Google sobre la URL publicada.

## Rendimiento: evidencia y límites

Las fotos que usa la página pasaron de aproximadamente 8,2 MB a 265 KB en conjunto, una reducción cercana al 97 %. Se crean derivados en public/trabajos/optimized/ y se mantienen las fotografías originales. El ahorro corresponde a los archivos de foto solicitados por la página, no a una medición de velocidad de red ni al peso completo del repositorio.

No se afirma una puntuación Lighthouse ni que se cumplan los Core Web Vitals: requieren medición en navegador y, en el caso de datos de campo, visitas reales. El entorno no permitió anteriormente abrir el servidor local ni Chrome automatizado.

## Comprobaciones ejecutadas

- `npm run build`: cliente, compilación temporal para prerender y HTML final sin servidor de aplicación.
- `npm run check:dom`: selector de temas y persistencia, almacenamiento bloqueado, modo nocturno predeterminado, movimiento reducido, menú, plataformas y mensaje de WhatsApp.
- Hidratación del HTML generado con tema claro guardado y movimiento reducido: conserva el elemento main original y no registra errores de hidratación.
- `npm run check:seo`: título y descripción únicos, canónica HTTPS, contenido inicial, grafo JSON-LD, privacidad, imágenes, anclas, recursos y coincidencia con robots/sitemap.
- La revisión visual, la respuesta HTTP del dominio y las herramientas oficiales de Google no se sustituyen por estos controles.

## Pendiente en la publicación y en las cuentas de Google

1. Confirmar que www.marcbook.cl es el dominio de producción y que marcbook.cl redirige hacia él. Si se elige el dominio sin www, cambiar site.url antes de compilar para mantener canónica, sitemap y datos estructurados alineados. No modificar DNS sin revisar la configuración real.
2. Comprobar HTTPS, respuesta 200 en portada/robots/sitemap, redirecciones permanentes de duplicados, 404 real en rutas inexistentes y ausencia de noindex o autenticación en producción. Mantener las vistas previas fuera de indexación.
3. Verificar la propiedad en Google Search Console, enviar `https://www.marcbook.cl/sitemap.xml`, inspeccionar la portada y solicitar indexación tras publicar. No se inventó un token de verificación ni se configuró una cuenta sin acceso.
4. Revisar o crear la ficha de Google Business Profile con la modalidad real de atención. No se proporcionó un enlace a una ficha existente, por lo que no se incluyó en sameAs. Confirmar la elegibilidad y la forma correcta de manejar la dirección sin publicar por defecto la residencia familiar.
5. Mantener consistentes nombre, teléfono, horarios y zona atendida; completar servicios y fotos en la ficha y solicitar reseñas a clientes atendidos.
6. Ejecutar Rich Results Test y PageSpeed Insights sobre la URL de producción; revisar posteriormente cobertura, consultas y experiencia móvil en Search Console.

La consulta de https://marcbook.cl/ y https://www.marcbook.cl/ no pudo completarse desde este entorno: la herramienta web no obtuvo la página y curl no pudo resolver los hosts. Esto no permite distinguir entre un problema del dominio y las restricciones de red del entorno. Es un control pendiente, no una declaración de que el dominio esté caído.

## Dónde mantener el SEO

- `src/config/site.js`: dominio principal y datos de contacto.
- `src/config/seo.js`: título, descripción e imagen compartida.
- `scripts/seo.mjs`: metadatos, datos estructurados, robots y sitemap.
- `src/entry-server.jsx` y `scripts/finalize-build.mjs`: HTML generado durante la compilación.
- `scripts/check-seo.mjs`: comprobación técnica de la salida.
- `vercel.json`: build que debe ejecutar Vercel y salida a publicar.

`dist/` es el resultado de producción. Los ajustes deben hacerse en los archivos fuente y regenerarse con `npm run preview:file`.

## Referencias oficiales consultadas

- [Google: fundamentos de SEO con JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: títulos en los resultados](https://developers.google.com/search/docs/appearance/title-link)
- [Google: canónica y duplicados](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: datos de Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: datos de LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: factores del posicionamiento local](https://support.google.com/business/answer/7091)
- [Google: zonas de servicio](https://support.google.com/business/answer/9157481?hl=es)
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Vercel: dominios y redirecciones](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)


## Actualización de estructura para Vercel

La aplicación fue trasladada a la raíz del repositorio para reemplazar el sitio HTML anterior. `vercel.json` usa framework Vite, instalación `npm ci --include=dev`, compilación `npm run build` y salida `dist`. Root Directory debe ser `.` o vacío; no debe apuntar a una carpeta intermedia. El index antiguo y sus scripts/estilos se retiran del árbol de publicación. Se conservan el SEO, los logos, las preferencias y el contenido actual.


## Corrección de iconos y vista previa social

Se añaden favicon.ico con resoluciones 16/32/48/64/96 px, favicon PNG de 96 px, icono Apple de 180 px y tarjeta de logo PNG 1200×630. Se sustituye el enlace principal al SVG incrustado por formatos raster. El HTML prerenderizado incluye og:image, secure_url, MIME image/png, dimensiones reales y texto alternativo. Los originales de la marca no se modifican.

Las comprobaciones de SEO verifican las firmas PNG/ICO, las dimensiones de los archivos, sus rutas en dist y su concordancia con los metadatos. Las vistas previas almacenadas por aplicaciones externas pueden seguir mostrando información anterior hasta que vuelvan a consultar el sitio.
