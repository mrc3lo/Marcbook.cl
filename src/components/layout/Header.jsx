import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../../config/site.js';
import Brand from '../ui/Brand.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';

export default function Header({ theme, onToggleTheme }) {
  const [menu, setMenu] = useState(false);

  return (
    <header className="header">
      <Brand label="Marcbook, inicio" />
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Navegación principal">
        {navigation.map(({ label, href }) => (
          <a href={href} key={href} onClick={() => setMenu(false)}>{label}</a>
        ))}
        <a className="nav-contact" href="#contacto" onClick={() => setMenu(false)}>
          Conversemos <ArrowUpRight size={16} />
        </a>
      </nav>
      <div className="header-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          className="menu-toggle"
          aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menu}
          onClick={() => setMenu(current => !current)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
