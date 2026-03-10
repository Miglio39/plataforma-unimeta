import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360tour';
import Model3D from './components/Model3D';
import ChatBot from './components/ChatBot';
import './styles/App.css';

function App() {
  const [escenaActual, setEscenaActual] = useState('biblioteca.jpg');
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mensajeIA, setMensajeIA] = useState("¡Hola! Soy el guía virtual de UNIMETA.");

  // Función para cambiar de lugar y que la IA reaccione
  const viajarA = (archivo, mensaje) => {
    setEscenaActual(archivo);
    setMensajeIA(mensaje);
    setMostrarMapa(false);
  };

  return (
    <div className="app-container">
      <Sidebar setEscenaActual={setEscenaActual} escenaActual={escenaActual} />
      
      <main className="main-content">
        <header className="top-header">
          <h1>¡REVOLUCIONA UNIMETA!</h1>
          <p className="subtitle-main">Descubre tu Campus con Virtual Guide</p>
        </header>

        {/* Sección Central: Holograma 3D y Visor 360 flotante */}
        <div className="center-display">
          {/* Lado Izquierdo: Modelo 3D Programático del Edificio */}
<div className="hologram-container">
  <a-scene embedded vr-mode-ui="enabled: false" style={{width: '100%', height: '100%', background: 'transparent'}}>
    
    {/* Luces para que se vea bien el 3D */}
    <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
    <a-light type="directional" position="-2 4 4" intensity="1" color="#ffffff"></a-light>

    {/* CÁMARA: Ajustada para ver el modelo de frente */}
    <a-entity position="0 1.5 6">
      <a-camera fov="50" look-controls="enabled: true"></a-camera>
    </a-entity>

    {/* GRUPO PRINCIPAL: Todo el edificio rota suavemente */}
    <a-entity animation="property: rotation; to: 0 360 0; loop: true; dur: 25000; easing: linear">
      
      {/* 1. BASE HOLOGRÁFICA (El rectángulo neón del suelo) */}
      <a-plane 
        position="0 -2 0" 
        rotation="-90 0 0" 
        width="7" 
        height="4" 
        color="#00f2ff" 
        material="opacity: 0.2; transparent: true; side: double"
        border="1px solid cyan"
      ></a-plane>
      <a-box 
        position="0 -2 0" 
        width="7" height="0.05" depth="4" 
        material="wireframe: true; color: #00f2ff"
      ></a-box>

      {/* 2. ESTRUCTURA PRINCIPAL (El cuerpo gris) */}
      <a-box position="0 0.5 0" width="5" height="4" depth="2" color="#7c8594"></a-box>
      
      {/* Ventanales (Simulados con cajas negras brillantes) */}
      <a-box position="0 0.5 1.05" width="4.5" height="3.5" depth="0.1" color="#1a1a1a" material="metalness: 0.8; roughness: 0.2"></a-box>

      {/* 3. MARCO AMARILLO (El detalle distintivo de la imagen) */}
      {/* Lado derecho amarillo */}
      <a-box position="1.2 0.5 1.2" width="1.5" height="3" depth="0.2" color="#f1c40f"></a-box>
      {/* Centro hueco (truco visual: ponemos una caja negra encima para simular el marco) */}
      <a-box position="1.2 0.5 1.25" width="1.1" height="2.6" depth="0.2" color="#222"></a-box>

      {/* 4. DETALLES ROJOS/NARANJA */}
      {/* Panel izquierdo */}
      <a-box position="-1.5 0 1.2" width="1" height="2.5" depth="0.2" color="#e74c3c"></a-box>
      {/* Detalle superior */}
      <a-box position="-1.5 1.5 1.2" width="1" height="0.5" depth="0.3" color="#f39c12"></a-box>

      {/* 5. TECHO Y MAQUINARIA (Greebles) */}
      <a-box position="0 2.6 0" width="4.8" height="0.2" depth="1.8" color="#555"></a-box>
      {/* Caja técnica arriba */}
      <a-box position="-1 3 0" width="1" height="0.8" depth="1" color="#f1c40f"></a-box>
      <a-cylinder position="1 2.8 0" radius="0.3" height="0.8" color="#bdc3c7"></a-cylinder>

    </a-entity>
  </a-scene>
</div>

          <div className="mini-viewer-circle">
   <Viewer360 foto={escenaActual} />
   <div className="viewer-label">VISTA 360°</div>
</div>
        </div>

        {/* Capa del Mapa Interactivo */}
        {mostrarMapa && (
          <div className="map-overlay">
            <div className="map-content">
              <button className="close-map" onClick={() => setMostrarMapa(false)}>X</button>
              <h2>Mapa General del Campus</h2>
              <div className="map-relative">
                <img src="/assets/panoramas/mapa-unimeta.png" alt="Mapa" />
                {/* Ejemplo de punto interactivo */}
                <div 
                  className="map-dot" 
                  style={{top: '50%', left: '50%'}} 
                  onClick={() => viajarA('biblioteca.jpg', 'Has llegado a la biblioteca.')}
                ></div>
              </div>
              <p>Haz clic en un punto para viajar</p>
            </div>
          </div>
        )}

        {/* Barra de Navegación Inferior */}
        <div className="bottom-nav">
          <button className="nav-item" onClick={() => setMostrarMapa(true)}>
            <div className="nav-icon">🗺️</div>
            <span>Explore el Mapa Interactivo</span>
          </button>
          
          <button className="nav-item" onClick={() => setMensajeIA("Dime, ¿en qué puedo ayudarte?")}>
            <div className="nav-icon">🤖</div>
            <span>Consulta con nuestra IA</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon">🔬</div>
            <span>Recorridos por Laboratorios</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon">🏛️</div>
            <span>Conoce tu Facultad</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon">📅</div>
            <span>Eventos Universitarios</span>
          </button>
        </div>

        <ChatBot mensaje={mensajeIA} />
      </main>
    </div>
  );
}

export default App;