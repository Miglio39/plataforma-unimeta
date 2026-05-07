import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

// 🔴 Quitamos React.StrictMode para que A-Frame funcione sin problemas
root.render(
    <App />
);