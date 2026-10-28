import { Instagram, ArrowUpRight } from 'lucide-react';
import Brand from '../ui/Brand.jsx';
import { site } from '../../config/site.js';

export default function Footer() {
  return (
    <footer className="wrap footer">
      <Brand />
      <p>Tecnología con una nueva perspectiva.</p>
      <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
        <Instagram size={16} /> Instagram <ArrowUpRight size={14} />
      </a>
      <span>© {new Date().getFullYear()} {site.name}</span>
    </footer>
  );
}
