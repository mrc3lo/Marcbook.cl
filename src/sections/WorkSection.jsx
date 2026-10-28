import { ArrowUpRight } from 'lucide-react';

export default function WorkSection() {
  return (
    <section className="work-section wrap">
      <div className="work-heading">
        <div className="eyebrow muted">DEL COSMOS AL CIRCUITO</div>
        <h2>Lo extraordinario<br />está en los detalles.</h2>
        <p>Detrás de cada equipo hay conexiones, energía e información. Cuidar cada componente es cuidar lo que haces con él.</p>
        <span className="small-label"><span className="status-dot" /> IMÁGENES DE TRABAJOS REALES</span>
      </div>
      <div className="work-photo">
        <img
          src="/trabajos/optimized/limpieza.jpg"
          alt="Detalle del interior de un computador durante una mantención de Marcbook"
          loading="lazy"
          decoding="async"
          width={900}
          height={1200}
        />
        <div><span>01 / MANTENCIÓN</span><ArrowUpRight size={21} /></div>
      </div>
      <div className="work-photo second">
        <img src="/trabajos/optimized/ssd.jpg" alt="Intervención de almacenamiento SSD en un computador" loading="lazy" decoding="async" width={1200} height={900} />
        <div><span>02 / NUEVAS POSIBILIDADES</span><ArrowUpRight size={21} /></div>
      </div>
    </section>
  );
}
