import { MessageCircle, ArrowUpRight, MapPin, Clock, CalendarDays } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm.jsx';
import { wa } from '../lib/whatsapp.js';
import { site } from '../config/site.js';

export default function ContactSection() {
  return (
    <section className="contact-section" id="contacto">
      <div className="contact-glow" />
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow"><span className="status-dot" /> EL SIGUIENTE PASO EMPIEZA AQUÍ</div>
          <h2>Hagamos que<br />todo vuelva a<br /><span className="gradient-text">conectar.</span></h2>
          <p>Cuéntame qué le pasa a tu equipo.<br />Busquemos juntos la mejor forma de seguir.</p>
          <a className="phone" href={wa()} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} /> {site.phoneLabel} <ArrowUpRight size={18} />
          </a>
          <div className="contact-meta">
            <span><MapPin size={14} /> {site.location}</span>
            <span><Clock size={14} /> {site.hoursLabel}</span>
            <span><CalendarDays size={14} /> {site.attentionLabel}</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
