import { Laptop, Monitor, Cpu } from 'lucide-react';

export default function CompatibilitySection() {
  return (
    <div className="compatibility">
      <div className="wrap">
        <span>UN NUEVO IMPULSO PARA TU</span>
        <span><Laptop size={20} /> MacBook</span>
        <span><Monitor size={20} /> iMac</span>
        <span><Cpu size={20} /> Windows & PC</span>
        <span className="compat-end">REPARAR. MEJORAR. SEGUIR.</span>
      </div>
    </div>
  );
}
