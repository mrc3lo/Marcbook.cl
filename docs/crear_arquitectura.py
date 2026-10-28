"""Genera un DOCX con biblioteca estándar; no requiere dependencias de Python."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.sax.saxutils import escape
import xml.etree.ElementTree as ET

OUT = Path(__file__).resolve().parent / 'Arquitectura_Marcbook_Cosmos.docx'
W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
parts = []
def p(text='', style=None):
    pr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ''
    parts.append(f'<w:p>{pr}<w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>')
def heading(text): p(text, 'Heading1')
def sub(text): p(text, 'Heading2')
def bullet(text): p('•  ' + text)
def page(): parts.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
def table(headers, rows, widths=None):
    widths = widths or [int(9600/len(headers))]*len(headers)
    xml = '<w:tbl><w:tblPr><w:tblW w:w="9600" w:type="dxa"/><w:tblBorders>' + ''.join(f'<w:{edge} w:val="single" w:sz="4" w:color="CBD9EA"/>' for edge in ['top','left','bottom','right','insideH','insideV']) + '</w:tblBorders><w:tblCellMar><w:top w:w="90" w:type="dxa"/><w:left w:w="110" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="110" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>' + ''.join(f'<w:gridCol w:w="{x}"/>' for x in widths) + '</w:tblGrid>'
    for i, row in enumerate([headers] + rows):
        xml += '<w:tr>' + ('<w:trPr><w:tblHeader/></w:trPr>' if i == 0 else '')
        for text, width in zip(row, widths):
            fill = '165FB9' if i == 0 else ('F0F5FC' if i % 2 else 'FFFFFF')
            props = '<w:b/><w:color w:val="FFFFFF"/>' if i == 0 else '<w:color w:val="193958"/>'
            xml += f'<w:tc><w:tcPr><w:tcW w:w="{width}" w:type="dxa"/><w:shd w:fill="{fill}"/></w:tcPr><w:p><w:pPr><w:spacing w:after="0"/></w:pPr><w:r><w:rPr>{props}<w:sz w:val="21"/></w:rPr><w:t>{escape(str(text))}</w:t></w:r></w:p></w:tc>'
        xml += '</w:tr>'
    parts.append(xml + '</w:tbl>'); p()

p('MARCBOOK', 'Title')
p('Arquitectura del sitio web', 'Subtitle')
p('Propuesta Cosmos · React + Vite · Revisión 6 · Aplicación en la raíz', 'Subtitle')
p('28 de octubre de 2026')
heading('1. Propósito y alcance')
p('Sitio de presentación y contacto para el servicio técnico de Marcelo Díaz Flores en Concepción. El objetivo principal es que una persona comprenda los servicios y escriba por WhatsApp con información útil sobre su equipo.')
p('La aplicación React se encuentra directamente en la raíz del repositorio mrc3lo/Marcbook.cl: index.html, package.json, src, public y scripts. El HTML antiguo se retira del árbol de trabajo y se conserva en el historial de Git y en un respaldo local externo. El push de la rama master puede iniciar el despliegue automático; su resultado debe verificarse en Vercel.')
sub('Principios de la experiencia')
bullet('Estética del cosmos y de los circuitos: azules, cian y profundidad visual, manteniendo el contenido por delante de los efectos.')
bullet('Dos ambientes: modo día y modo noche, con preferencia recordada en el navegador cuando el almacenamiento está disponible.')
bullet('Lectura cómoda: textos principales y controles más grandes, contraste reforzado y estructura de títulos clara.')
bullet('Contacto directo: acceso a WhatsApp desde portada, servicios, formulario y botón flotante.')
sub('Esquema general')
table(['Entrada', 'Procesamiento local', 'Salida'], [ ['Navegador del visitante', 'Interfaz React y estilos CSS', 'Servicios e información'], ['Equipo + problema + detalle', 'Construcción del mensaje mediante wa()', 'WhatsApp con texto preparado'], ['Tema y efectos', 'Estado React / localStorage solo para tema', 'Preferencias visuales'] ], [2300,4000,3300])
p('No hay servidor de aplicación, base de datos, cuentas de usuarios ni almacenamiento de consultas. La conversación comienza en WhatsApp y el cliente confirma el envío.')
page()
heading('2. Arquitectura de información')
p('Una sola página con navegación por anclas. Las secciones siguen el recorrido: entender → explorar → confiar → consultar.')
table(['Bloque / destino', 'Contenido', 'Función'], [
['Cabecera', 'Marca, navegación, selector día/noche, menú móvil.', 'Orientación y control visual.'],
['Inicio · #inicio', 'Propuesta de valor, portal cósmico, botón de WhatsApp y control de efectos.', 'Explicar y facilitar el primer contacto.'],
['Compatibilidad', 'MacBook, iMac y Windows / PC.', 'Aclarar qué equipos se atienden.'],
['Servicios · #servicios', 'Seis servicios; selector Apple / Mac o Windows / PC.', 'Preparar consultas según servicio y plataforma.'],
['Trabajos reales', 'Fotos de mantención y almacenamiento del sitio original.', 'Conectar la estética con el trabajo técnico.'],
['Proceso · #proceso', 'Contar la falla, revisar opciones, aprobar el trabajo.', 'Explicar cómo se coordina la atención.'],
['Sobre mí · #sobre-mi', 'Marcelo, atención directa y explicación del diagnóstico.', 'Construir confianza con información real.'],
['Preguntas frecuentes', 'Equipos, costos, recuperación de datos y coordinación.', 'Resolver dudas antes del contacto.'],
['Contacto · #contacto', 'Selector de equipo, problema y detalle opcional; teléfono y horario.', 'Abrir una consulta útil en WhatsApp.'],
['Pie y botón flotante', 'Marca, Instagram, año y acceso persistente a WhatsApp.', 'Mantener disponibles los canales de contacto.']
], [2200,4300,3100])
sub('Contenido de servicios')
p('Diagnóstico y reparación; cambio de batería; upgrade SSD; mantención profunda; recuperación de datos; sistema y optimización. Se conservan las mismas categorías para ambas plataformas y se incorpora la plataforma elegida al mensaje. La compatibilidad y el alcance se confirman para cada equipo.')
page()
heading('3. Arquitectura técnica y archivos')
table(['Elemento', 'Responsabilidad'], [
['React 19 + React DOM', 'Renderizado y estado interactivo en el navegador.'],
['Vite 7', 'Desarrollo local y empaquetado estático de producción.'],
['lucide-react', 'Iconos SVG importados desde la aplicación.'],
['CSS + Canvas 2D', 'Sistema visual, adaptación a pantallas y portal de partículas.'],
['Google Fonts', 'DM Sans y Space Grotesk; fuentes del sistema como alternativa.'],
['WhatsApp / Instagram', 'Canales externos enlazados; no hay integración de API.']
], [3000,6600])
table(['Archivo / carpeta', 'Contenido'], [
['index.html', 'Punto de entrada, idioma es-CL, metadatos, favicon y montaje de React.'],
['src/main.jsx', 'Hidrata el HTML prerenderizado o monta React en desarrollo; importa los estilos.'],
['src/entry-server.jsx', 'Genera el HTML de App solo durante la compilación.'],
['src/config/seo.js', 'Título, descripción e imagen para buscadores y redes.'],
['scripts/seo.mjs', 'Metadatos, Organization/Service, robots y sitemap.'],
['scripts/finalize-build.mjs', 'Inserta HTML completo en dist y elimina la compilación temporal.'],
['scripts/check-seo.mjs', 'Comprueba SEO técnico sobre la salida de producción.'],
['vercel.json', 'Configuración en la raíz: Vite, npm ci --include=dev, npm run build y salida dist.'],
['src/App.jsx', 'Orden de las secciones y conexión de preferencias con cabecera y portada.'],
['src/sections/', 'Una sección por archivo: Hero, Compatibility, Services, Work, Process, About, Faq y Contact.'],
['src/components/layout/', 'Header y Footer: estructura común de navegación y pie.'],
['src/components/ui/', 'Brand, Logo, WhatsApp, FloatingWhatsApp, ThemeToggle y ServiceCard reutilizables.'],
['src/components/contact/', 'ContactForm: campos y estado de la consulta.'],
['src/components/effects/', 'Cosmos: representación del portal con Canvas 2D.'],
['src/hooks/', 'useTheme y useMotion: lógica de preferencias visuales y limpieza de efectos.'],
['src/config/site.js', 'Teléfono, Instagram, ubicación, horario, navegación y configuración del tema.'],
['src/config/branding.js', 'Rutas de logos oficiales, tamaño original y encuadre del área visible.'],
['src/data/', 'Catálogo de servicios, preguntas frecuentes, pasos del proceso y opciones del formulario.'],
['src/lib/whatsapp.js', 'Enlace wa() y funciones para construir mensajes de consulta y servicio.'],
['src/styles/index.css', 'Índice de estilos: establece un orden explícito de importación.'],
['src/styles/sections/', 'Estilos base separados para portada, servicios, trabajos, proceso, sobre mí, preguntas y contacto.'],
['src/styles/*.css', 'Base, cabecera, pie, accesibilidad, tipografía, temas y ajustes de pantallas.'],
['vite.config.js', 'Transformación automática de JSX para los módulos React.'],
['public/trabajos/', 'Fotografías reutilizadas de trabajos originales.'],
['public/logos/', 'Copias íntegras de los PNG oficiales horizontal y apilado de la carpeta original logos.'],
['public/favicon.ico y favicon-96.png', 'Iconos raster del navegador; ICO con cinco resoluciones y PNG de 96 px.'],
['public/apple-touch-icon.png', 'Icono de 180 px para dispositivos Apple.'],
['public/social/marcbook-share.png', 'Tarjeta de 1200×630 con el logo para Open Graph y vistas previas.'],
['package.json / package-lock.json', 'Dependencias, scripts y versiones resueltas.'],
['dist/', 'Resultado generado para hosting estático.'],
['make-preview.mjs / REVISAR.html', 'Generador y vista de revisión autónoma con estilos, JS y fotos integrados.'],
['review.mjs / check-dom.mjs', 'Comprobación de navegador y comprobación funcional de DOM, respectivamente.'],
['docs/', 'Documento de arquitectura y su generador.']
], [3400,6200])
p('Cada sección y componente tiene su propio módulo. Los estados de menú, selección de plataforma y formulario viven junto al componente que los usa. App mantiene únicamente las preferencias compartidas mediante hooks; no se introduce un almacén global ni un router.')
page()
heading('4. Componentes, estados y datos')
sub('Árbol de componentes implementados')
p('createRoot → React.StrictMode → App', 'Code')
p('App → useTheme + useMotion', 'Code')
p('App → Header → Brand → Logo (PNG oficial)', 'Code')
p('Header → ThemeToggle; AboutSection → Logo apilado', 'Code')
p('App → HeroSection → Cosmos + WhatsApp', 'Code')
p('App → CompatibilitySection + ServicesSection → ServiceCard', 'Code')
p('App → WorkSection + ProcessSection + AboutSection + FaqSection', 'Code')
p('App → ContactSection → ContactForm → WhatsApp', 'Code')
p('App → Footer + FloatingWhatsApp', 'Code')
table(['Elemento', 'Responsabilidad'], [
['App', 'Compone las secciones y conecta useTheme/useMotion con Header y HeroSection.'],
['Header / ThemeToggle', 'Header posee el estado del menú; ThemeToggle recibe el tema y una función de cambio.'],
['ServicesSection / ServiceCard', 'La sección posee la plataforma elegida; cada tarjeta recibe servicio, índice y plataforma.'],
['ContactSection / ContactForm', 'La sección presenta el contacto; el formulario posee equipo, problema y detalle.'],
['useTheme / useMotion', 'Encapsulan preferencias, sincronización con HTML y suscripciones al sistema.'],
['Cosmos', 'Dibuja estrellas y portal en Canvas 2D. Adapta el color al tema, responde al cursor y limita el dibujo a unos 30 cuadros por segundo cuando está visible.'],
['WhatsApp', 'Crea el botón reutilizable con URL de consulta, nueva pestaña y rel de protección.'],
['wa(text)', 'Codifica el texto con encodeURIComponent y genera el enlace al número 56971499330.'],
['Datos / configuración', 'src/data contiene contenido de listas; src/config/site.js concentra los datos compartidos.'],
['buildInquiryMessage / buildServiceMessage', 'Construyen mensajes independientes de la presentación React.']
], [2400,7200])
table(['Estado', 'Valor inicial / persistencia', 'Uso'], [
['theme', 'Modo nocturno inicial; después restaura la elección guardada, si existe.', 'data-theme en HTML, color del navegador y Canvas.'],
['menu · Header', 'Cerrado; no persistente.', 'Desplegar/cerrar navegación móvil.'],
['motion', 'Activo salvo preferencia de movimiento reducido.', 'Canvas animado y transiciones.'],
['system · ServicesSection', 'Mac; no persistente.', 'Selección visual y consulta del servicio.'],
['device / problem · ContactForm', 'MacBook / Está lento.', 'Mensaje del formulario.'],
['details · ContactForm', 'Vacío; máximo 1.000 caracteres.', 'Contexto opcional del problema.']
], [1900,3900,3800])
p('La clave marcbook-theme guarda únicamente light o dark. Si localStorage está bloqueado, el control sigue funcionando durante la sesión. Los detalles de la consulta no se guardan.')
page()
heading('5. Sistema visual y comodidad de uso')
table(['Criterio', 'Modo noche', 'Modo día'], [
['Fondo general', '#090B10 · azul negro', '#F3F7FD · azul muy claro'],
['Texto principal', '#F0F5FF', '#152C49'],
['Texto descriptivo', '#ABB8CC', '#415B78'],
['Acento / controles', '#8EC8FF · azul luminoso', '#165FB9 · azul profundo'],
['Superficies', 'Tarjetas oscuras', 'Tarjetas blancas y azul suave']
], [3000,3300,3300])
sub('Identidad visual oficial')
p('La cabecera y el pie usan LOGO-SIN FONDO-01.png, horizontal. La sección Sobre mí y el favicon usan LOGO-SIN FONDO-02.png, apilado. Los archivos se copian íntegros a public/logos. Logo.jsx encuadra el margen transparente mediante un viewBox SVG, sin redibujar ni recolorear la marca. El mismo degradado azul y cian se utiliza en ambos temas. Los tamaños se editan en styles/branding.css y las rutas y encuadres en config/branding.js.')
p('Los iconos de pestaña se sirven como ICO y PNG reales. La tarjeta social usa el logo apilado sobre fondo oscuro en un PNG de 1200×630, con metadatos HTTPS, MIME y dimensiones. scripts/build-favicon.mjs genera los derivados mediante scripts/lib/png.mjs, sin modificar los logos originales. El SVG anterior deja de ser el icono anunciado en el HTML.')
sub('Tipografía y adaptación')
bullet('DM Sans para lectura e interfaz; Space Grotesk para marca y títulos. Si Google Fonts no carga, se usa sans-serif del sistema.')
bullet('Textos descriptivos: aproximadamente 15–17 px. Campos de consulta: 16 px. Etiquetas del formulario: 15 px. Títulos de servicios: 20–22 px según pantalla.')
bullet('Rótulos decorativos: alrededor de 10–12 px. La información esencial se presenta con mayor tamaño y contraste. Interlineado descriptivo de 1,8.')
bullet('Servicios en tres columnas en escritorio, dos en tablet y una en pantallas de hasta 540 px. Navegación móvil desde 760 px.')
bullet('Controles principales con alturas aproximadas de 44–50 px. Distribución flexible y texto que puede ajustarse a varias líneas.')
sub('Movimiento e interacción')
p('El portal usa estrellas, anillos y partículas azules; sigue suavemente al puntero. ResizeObserver adapta el lienzo e IntersectionObserver evita redibujar el portal fuera de vista. El usuario puede desactivar los efectos; se respeta prefers-reduced-motion y se limpia la animación al desmontar el componente.')
sub('Accesibilidad implementada')
p('Enlace para saltar al contenido, estructura semántica, etiquetas asociadas a campos, foco visible, botones con nombres accesibles, menú con aria-expanded, pestañas con aria-pressed, imágenes con texto alternativo y preguntas con details/summary. Estas medidas no sustituyen una auditoría completa de accesibilidad.')
page()
heading('6. Conversión, revisión y publicación')
sub('Recorrido hacia WhatsApp')
p('1. El visitante conoce los servicios y elige su equipo. 2. Puede consultar desde una tarjeta o completar equipo, problema y detalle. 3. El sitio arma un enlace wa.me con el texto codificado. 4. WhatsApp se abre para que el cliente revise y envíe. El sitio no confirma diagnósticos ni cobra servicios.')
sub('Comandos de trabajo')
table(['Comando', 'Resultado'], [
['npm install', 'Instala las dependencias.'],
['npm run dev', 'Inicia Vite en el equipo local.'],
['npm run build', 'Compila cliente y prerender; genera dist/ con contenido completo.'],
['npm run check:seo', 'Valida el HTML inicial, metadatos, datos estructurados, robots y sitemap.'],
['npm run brand:favicon', 'Regenera iconos ICO/PNG, icono Apple y tarjeta social desde el logo oficial.'],
['npm run preview:file', 'Compila y regenera REVISAR.html, que puede abrirse sin servidor.'],
['npm run check:dom', 'Comprueba interacciones React en DOM simulado; no valida apariencia.'],
['npm run check:browser', 'Comprueba interacciones y capturas con Chrome cuando esté permitido.']
], [3400,6200])
sub('Alcance de la verificación')
p('La revisión de compilación y la prueba funcional de DOM se documentan en README.md. El entorno bloqueó previamente el puerto de Vite y el lanzamiento de Chrome automatizado. Por ello, la inspección visual real, el ajuste fino de espaciado en ambos temas y las pruebas de teclado, zoom y dispositivos físicos deben revisarse antes de publicar.')
sub('Próxima publicación, pendiente de decisión')
p('El repositorio mrc3lo/Marcbook.cl está conectado a Vercel y la rama local de publicación es master. Usar Root Directory vacío o punto, framework Vite, instalación npm ci --include=dev, build npm run build y salida dist. Se requiere Node.js 24. La aplicación está en la raíz y no usa carpetas intermedias. El dominio canónico es https://www.marcbook.cl/; comprobar el resultado del despliegue y las redirecciones del panel.')
p('Antes de publicar: revisar modo día y noche, lectura con zoom al 200 %, menú móvil, enlaces al teléfono e Instagram, mensajes preparados y preferencias de movimiento. Comprobar también peso de imágenes, metadatos y disponibilidad del dominio. No se ha configurado analítica ni envío de datos a un servidor propio.')


page()
heading('7. Guía para editar el proyecto')
p('Editar los archivos fuente de src/. dist/ y REVISAR.html son resultados generados: se regeneran después de los cambios y no se editan manualmente.')
table(['Quiero cambiar…', 'Archivo o carpeta'], [
['El orden o la presencia de una sección', 'src/App.jsx'],
['La portada y sus textos', 'src/sections/HeroSection.jsx'],
['Un servicio, descripción o plataforma', 'src/data/services.js'],
['Las preguntas y respuestas', 'src/data/faqs.js'],
['Los pasos de atención', 'src/data/process.js'],
['Las opciones del formulario', 'src/data/contact.js'],
['El teléfono, Instagram, ubicación u horario', 'src/config/site.js'],
['El texto preparado para WhatsApp', 'src/lib/whatsapp.js'],
['Los campos o comportamiento del formulario', 'src/components/contact/ContactForm.jsx'],
['La animación del cosmos', 'src/components/effects/Cosmos.jsx'],
['Logos oficiales y tamaño de marca', 'src/config/branding.js, components/ui/Logo.jsx y styles/branding.css'],
['La preferencia de tema o movimiento', 'src/hooks/useTheme.js o useMotion.js'],
['El aspecto base de una sección', 'src/styles/sections/<sección>.css'],
['Metadatos y buscadores', 'src/config/seo.js y scripts/seo.mjs'],
['Los colores día/noche', 'src/styles/themes.css; el portal usa Cosmos.jsx y el color del navegador usa config/site.js'],
['Los tamaños finales de lectura', 'src/styles/readability.css'],
['La adaptación a móviles', 'src/styles/responsive.css y responsive-readability.css']
], [4000,5600])
sub('Orden de estilos')
p('styles/index.css importa primero fuentes, base y estructura; después los estilos de cada sección y el pie; luego accesibilidad y reglas responsivas; al final, legibilidad, temas y ajustes responsivos finales. El orden conserva la cascada de la versión anterior. Revisar los ajustes finales cuando una regla base no produzca el efecto esperado.')
sub('Agregar una sección')
p('Crear un componente en src/sections; crear su estilo en src/styles/sections si hace falta; importar el estilo en styles/index.css y el componente en App.jsx. Si debe aparecer en el menú, agregar su ancla en config/site.js. Mantener el estado dentro de la sección salvo que realmente deba compartirse.')
sub('Verificación tras editar')
p('Ejecutar npm run preview:file y npm run check:dom. La comprobación de DOM no sustituye la revisión visual. Para abrir el resultado sin servidor, usar REVISAR.html. Para desarrollo continuo, ejecutar npm run dev en un entorno que permita el servidor local.')

page()
heading('8. SEO y generación estática')
p('La compilación genera primero los recursos del navegador y después el HTML de las secciones con renderToString. finalize-build.mjs inserta ese HTML en dist/index.html y emite robots.txt y sitemap.xml. React activa luego las interacciones mediante hydrateRoot. No se necesita un servidor de aplicación en producción.')
p('El título y descripción se orientan al servicio técnico de MacBook y PC en Concepción. Se conservan el titular creativo, los cambios del propietario y el modo nocturno predeterminado. La atención figura con coordinación previa y no se publica la dirección residencial.')
p('Los datos estructurados describen Organization, WebSite, WebPage y seis servicios. Se evita declarar un local con dirección incompleta y no se inventan reseñas ni calificaciones. El dominio canónico preparado es https://www.marcbook.cl/; debe confirmarse con la configuración real de Vercel.')
p('Las dos fotos visibles usan copias optimizadas de aproximadamente 265 KB en conjunto; se mantienen los originales. Tienen dimensiones, texto alternativo y carga diferida. Las fuentes se descubren desde el HTML con display=swap y conexiones anticipadas.')
p('check:dom incluye hidratación con preferencias guardadas. check:seo comprueba el contenido sin JavaScript, los metadatos, las referencias JSON-LD, las anclas y los recursos de rastreo. Las pruebas locales no garantizan indexación ni posiciones en Google.')
p('Antes y después de publicar deben comprobarse dominio, HTTPS, redirecciones, Search Console, ficha de negocio y velocidad móvil. La consulta del dominio no pudo completarse desde el entorno de trabajo. El detalle y las fuentes oficiales están en docs/Revision_SEO_Marcbook.md.')

p('Documento elaborado a partir del código de la propuesta local · Marcbook Cosmos · Revisión 6 · Aplicación en la raíz', 'Caption')

styles = '''<w:styles xmlns:w="%s"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="23"/><w:color w:val="253C57"/><w:lang w:val="es-CL"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="150" w:line="290" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:spacing w:before="500" w:after="200"/></w:pPr><w:rPr><w:b/><w:sz w:val="60"/><w:color w:val="165FB9"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:sz w:val="32"/><w:color w:val="526B87"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:keepNext/><w:spacing w:before="260" w:after="170"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="32"/><w:color w:val="165FB9"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:keepNext/><w:spacing w:before="200" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="25"/><w:color w:val="193958"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="21"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="Caption"/><w:rPr><w:sz w:val="19"/><w:color w:val="526B87"/></w:rPr></w:style></w:styles>''' % W
body = ''.join(parts)
doc = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="{W}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>{body}<w:sectPr><w:footerReference w:type="default" r:id="rId2"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1050" w:bottom="1000" w:left="1050" w:header="500" w:footer="500"/></w:sectPr></w:body></w:document>'''
footer = f'''<w:ftr xmlns:w="{W}"><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="526B87"/></w:rPr><w:t>Marcbook · Arquitectura · </w:t></w:r><w:fldSimple w:instr="PAGE"/></w:p></w:ftr>'''
files = {
'[Content_Types].xml': '''<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>''',
'_rels/.rels': '''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>''',
'word/document.xml': doc,
'word/styles.xml': styles,
'word/footer1.xml': footer,
'word/_rels/document.xml.rels': '''<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>''',
'docProps/core.xml': '''<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Arquitectura del sitio Marcbook Cosmos</dc:title><dc:creator>Marcbook</dc:creator><dc:description>Arquitectura de información, técnica y visual de la propuesta React, revisión 6, aplicación en la raíz.</dc:description></cp:coreProperties>'''
}
with ZipFile(OUT, 'w', ZIP_DEFLATED) as z:
    for name, xml in files.items():
        ET.fromstring(xml)
        z.writestr(name, xml)
with ZipFile(OUT) as z:
    assert z.testzip() is None
print(OUT)
