# Marcbook

Servicio técnico de MacBook, iMac y PC en Concepción. Sitio React con estética cósmica, modos día/noche, contacto por WhatsApp y HTML generado para buscadores.

## Aplicación actual

El código está en [`propuesta-react/`](propuesta-react/). La raíz conserva los archivos del sitio HTML anterior como referencia. Vercel está configurado para construir y publicar la aplicación React.

```sh
npm run setup
npm run dev
```

```sh
npm run build
npm run check:dom
npm run check:seo
```

Se requiere Node.js 24. La compilación produce `propuesta-react/dist/` con contenido prerenderizado, metadatos, datos estructurados, robots.txt y sitemap.xml.

## Vercel

Para usar la raíz del repositorio, `vercel.json` instala las dependencias de `propuesta-react`, ejecuta el build completo y publica `propuesta-react/dist`. No necesita mover el código ni reemplazar manualmente el HTML anterior.

Si el proyecto de Vercel ya usa `propuesta-react` como Root Directory, la configuración de esa carpeta también permite compilar y publicar `dist/`.

Dominio canónico del sitio: **https://www.marcbook.cl/**. Ambos dominios, `www.marcbook.cl` y `marcbook.cl`, deben estar asociados al proyecto. Confirmar que las redirecciones de dominios del panel sean coherentes con esa URL y que producción permita indexación.

La integración con GitHub puede iniciar el despliegue cuando se actualiza la rama de producción. La salida de `dist/` y la vista local `REVISAR.html` no se versionan: se generan desde el código fuente.

## Documentación

- [Guía de edición y estructura modular](propuesta-react/README.md)
- [Arquitectura en Word](propuesta-react/docs/Arquitectura_Marcbook_Cosmos.docx)
- [Revisión SEO y comprobaciones pendientes de producción](propuesta-react/docs/Revision_SEO_Marcbook.md)

La atención se coordina previamente en Concepción. No se publica una dirección residencial.
