import Logo from './Logo.jsx';

export default function Brand({ label = 'Marcbook, inicio' }) {
  return (
    <a className="brand" href="#inicio" aria-label={label}>
      <Logo decorative />
    </a>
  );
}
