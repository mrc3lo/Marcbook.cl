import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Se ejecuta únicamente durante la compilación; no necesita servidor en Vercel.
export function render() {
  return renderToString(<App />);
}
