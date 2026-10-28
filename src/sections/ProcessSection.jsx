import { processSteps } from '../data/process.js';

export default function ProcessSection() {
  return (
    <section className="section wrap process" id="proceso">
      <div className="section-top">
        <div>
          <div className="eyebrow muted">02 / ASÍ DE SIMPLE</div>
          <h2>Volver a conectar.<br /><span className="soft">Sin dar vueltas.</span></h2>
        </div>
        <p className="section-aside">Tecnología compleja.<br />Un proceso fácil de entender.</p>
      </div>
      <div className="steps">
        {processSteps.map(([title, text], index) => (
          <article key={title}>
            <span className="step-number">0{index + 1}<span> / </span></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
