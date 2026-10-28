import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { wa } from '../../lib/whatsapp.js';

export default function WhatsApp({ children = 'Hablemos de tu equipo', className = '', message, ...props }) {
  return (
    <a
      href={wa(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button primary ${className}`}
      {...props}
    >
      <MessageCircle size={18} />{children}<ArrowUpRight size={18} />
    </a>
  );
}
