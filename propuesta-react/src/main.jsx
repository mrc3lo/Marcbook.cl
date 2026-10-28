import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

const container = document.getElementById('root');
const application = <React.StrictMode><App /></React.StrictMode>;

// Producción recibe HTML ya generado; Vite en desarrollo monta la aplicación.
if (container.querySelector('main')) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
