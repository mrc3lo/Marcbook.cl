import { useState } from 'react';
import WhatsApp from '../ui/WhatsApp.jsx';
import { deviceOptions, problemOptions } from '../../data/contact.js';
import { buildInquiryMessage } from '../../lib/whatsapp.js';

export default function ContactForm() {
  const [device, setDevice] = useState(deviceOptions[0]);
  const [problem, setProblem] = useState(problemOptions[0]);
  const [details, setDetails] = useState('');
  const message = buildInquiryMessage({ device, problem, details });

  return (
    <form className="contact-card" onSubmit={event => event.preventDefault()}>
      <span className="small-label">PREPAREMOS TU CONSULTA</span>
      <h3>¿Qué necesita tu equipo?</h3>

      <label htmlFor="device">Mi equipo es</label>
      <select id="device" value={device} onChange={event => setDevice(event.target.value)}>
        {deviceOptions.map(option => <option key={option}>{option}</option>)}
      </select>

      <label htmlFor="problem">Lo que sucede</label>
      <select id="problem" value={problem} onChange={event => setProblem(event.target.value)}>
        {problemOptions.map(option => <option key={option}>{option}</option>)}
      </select>

      <label htmlFor="details">Algo más que deba saber <span>(opcional)</span></label>
      <textarea
        id="details"
        maxLength={1000}
        rows={2}
        placeholder="Modelo, año o detalles de la falla…"
        value={details}
        onChange={event => setDetails(event.target.value)}
      />

      <WhatsApp message={message}>Continuar en WhatsApp</WhatsApp>
      <p className="form-note">
        Se abrirá WhatsApp con tu consulta preparada.<br />Tú revisas el mensaje antes de enviarlo.
      </p>
    </form>
  );
}
