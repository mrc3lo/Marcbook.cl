import { ArrowDown, Check, Laptop, Power } from 'lucide-react';
import Cosmos from '../components/effects/Cosmos.jsx';
import WhatsApp from '../components/ui/WhatsApp.jsx';

export default function HeroSection({ theme, motion, onToggleMotion }) {
  return (
    <section className="hero wrap" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" /> SERVICIO TÉCNICO · CONCEPCIÓN, CHILE</div>
        <h1>Tu tecnología.<br />Un universo de<br /><span className="gradient-text">posibilidades.</span></h1>
        <p className="hero-description">
          Servicio técnico de MacBook, iMac y PC en Concepción.<br className="desktop" /> Reparación, mantención y mejoras para que una falla<br className="desktop" /> no detenga lo que imaginas.
        </p>
        <div className="hero-actions">
          <WhatsApp />
          <a href="#servicios" className="text-link">Explorar servicios <ArrowDown size={17} /></a>
        </div>
        <div className="hero-notes">
          <span><Check size={14} /> Atención directa con Marcelo</span>
          <span><Check size={14} /> Diagnóstico claro</span>
        </div>
      </div>

      <div className="hero-art">
        <Cosmos motion={motion} theme={theme} />
        {/**<div className="coordinate coord-top">MB / EXPLORACIÓN 001 <span>↗</span></div> */}
        <div className="portal-center"><Laptop size={40} strokeWidth={1} /><span>RE:CONECTA</span></div>
       {/** <div className="orbit-label"><span className="tiny-cross">+</span> HARDWARE CON NUEVA VIDA</div>
        <div className="coordinate coord-bottom">
          <span>36°49′ S · 73°03′ O</span><span>CONCEPCIÓN ↗</span>
        </div> */}
      </div>

      <div className="hero-foot">
        <span>TECNOLOGÍA QUE SIGUE CONTIGO</span>
        <a href="#servicios">DESLIZA PARA EXPLORAR <ArrowDown size={13} /></a>
        <button className="motion-toggle" aria-pressed={motion} onClick={onToggleMotion}>
          <Power size={13} /> Efectos {motion ? 'activados' : 'desactivados'}
        </button>
      </div>
    </section>
  );
}
