import { ArrowUpRight } from 'lucide-react';
import { wa, buildServiceMessage } from '../../lib/whatsapp.js';

export default function ServiceCard({ service, index, system }) {
  const Icon = service.icon;

  return (
    <a
      className="service-card"
      href={wa(buildServiceMessage(service.name, system))}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-top">
        <Icon size={26} strokeWidth={1.35} />
        <span>0{index + 1}</span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.text}</p>
      <div className="card-bottom">
        <span>{service.tag}</span>
        <ArrowUpRight size={21} />
      </div>
    </a>
  );
}
