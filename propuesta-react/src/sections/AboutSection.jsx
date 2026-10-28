import Logo from '../components/ui/Logo.jsx';
import { ArrowUpRight } from 'lucide-react';
import { wa } from '../lib/whatsapp.js';

export default function AboutSection() {
  return (
    <section className="about wrap" id="sobre-mi">
      <div className="about-art" aria-hidden="true">
        <div className="chip"><Logo variant="stacked" decorative /></div>
        <div className="about-orbit one" />
        <div className="about-orbit two" />
        <span className="about-caption">HUMANO DETRÁS DEL HARDWARE.</span>
      </div>
      <div className="about-copy">
        <div className="eyebrow muted">03 / EL LADO HUMANO</div>
        <h2>Hola, soy Marcelo.<br /><span className="soft">Tu conexión con<br />una solución.</span></h2>
        <p>Estoy detrás de Marcbook. Me dedico a reparar, optimizar y mantener MacBook y computadores en Concepción.</p>
        <p>Me interesa que entiendas qué le pasa a tu equipo y que puedas decidir con información clara. Hablas directamente conmigo durante el proceso.</p>
        <a
          className="text-link"
          href={wa('Hola Marcelo, quisiera hacerte una consulta sobre mi computador.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Conversemos <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
