import { useState } from 'react';
import { Laptop, Monitor, ShieldCheck } from 'lucide-react';
import { services } from '../data/services.js';
import ServiceCard from '../components/ui/ServiceCard.jsx';

export default function ServicesSection() {
  const [system, setSystem] = useState('Mac');

  return (
    <section className="section wrap" id="servicios">
      <div className="section-top">
        <div>
          <div className="eyebrow muted">01 / LO QUE PODEMOS HACER</div>
          <h2>Cada falla, una nueva<br /><span className="soft">posibilidad.</span></h2>
        </div>
        <div className="section-aside">
          <p>Desde una batería que ya no dura<br />hasta esos archivos que necesitas recuperar.</p>
          <div className="tabs" role="group" aria-label="Tipo de equipo">
            {['Mac', 'Windows'].map(platform => (
              <button
                key={platform}
                aria-pressed={system === platform}
                className={system === platform ? 'selected' : ''}
                onClick={() => setSystem(platform)}
              >
                {platform === 'Mac' ? <Laptop size={15} /> : <Monitor size={15} />}
                {' '}{platform === 'Mac' ? 'Apple / Mac' : 'Windows / PC'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="service-grid">
        {services
          .filter(service => service.systems.includes(system))
          .map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} system={system} />
          ))}
      </div>
      <p className="service-note">
        <ShieldCheck size={15} /> Cada equipo es distinto. Confirmamos compatibilidad, alcance y presupuesto antes de intervenir.
      </p>
    </section>
  );
}
