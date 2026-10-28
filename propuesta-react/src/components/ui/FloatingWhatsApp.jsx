import { MessageCircle } from 'lucide-react';
import { wa } from '../../lib/whatsapp.js';

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-wa"
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Marcelo por WhatsApp"
    >
      <MessageCircle size={24} /><span>¿Lo revisamos?</span>
    </a>
  );
}
