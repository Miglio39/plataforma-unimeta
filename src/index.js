import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 👈 ¡Cambiamos 'Apptour' por 'App'!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);