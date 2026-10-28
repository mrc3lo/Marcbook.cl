import { Plus } from 'lucide-react';
import { faqs } from '../data/faqs.js';

export default function FaqSection() {
  return (
    <section className="section wrap faq">
      <div>
        <div className="eyebrow muted">ANTES DE DESPEGAR</div>
        <h2>Quizás te<br />preguntabas…</h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<Plus size={19} /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
