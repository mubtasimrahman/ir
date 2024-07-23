import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/globalStyles.scss"
import App from './App/App';


const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

