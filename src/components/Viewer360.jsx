import React, { useState } from 'react'; // 🛑 1. Importamos useState
import 'aframe';

const Viewer360 = ({ foto, setEscenaActual }) => {
  // 🛑 2. Creamos el "interruptor" que controla el giro (empieza encendido)
  const [girar, setGirar] = useState(true);

  // 🛑 3. Función que apaga el interruptor
  const detenerGiro = () => {
    if (girar) setGirar(false);
  };

  return (
    // 🛑 4. Agregamos los detectores de clic (PC) y toque (Celular) al div principal
    <div 
      key={foto} 
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseDown={detenerGiro} 
      onTouchStart={detenerGiro}
    >
      <a-scene 
        embedded 
        vr-mode-ui="enabled: false"
        renderer="antialias: true; colorManagement: true;"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <a-assets>
          {/* Precargamos la imagen con un ID */}
          <img id="panorama" src={`/assets/panoramas/${foto}`} crossOrigin="anonymous" alt="360" />
        </a-assets>

        {/* 🛑 5. Vinculamos el interruptor a la propiedad "enabled" de la animación */}
        <a-sky 
          src={`/assets/panoramas/${foto}`}
          animation={`property: rotation; to: 0 360 0; loop: true; dur: 120000; easing: linear; enabled: ${girar}`}
        ></a-sky>

        {/* =========================================
            FLECHAS DE NAVEGACIÓN (Solo salen en Rectoría)
            ========================================= */}

        {/* Si estamos en la entrada (Paso 1) */}
        {foto === 'rectoria.jpg' && (
          <a-entity position="0 -1.5 -3" rotation="-45 0 0">
            <a-triangle 
              color="#38bdf8" 
              vertex-a="0 0.5 0" vertex-b="-0.5 -0.5 0" vertex-c="0.5 -0.5 0"
              class="clickable" 
              className="clickable"
              onClick={() => setEscenaActual('rectoria1a.jpg')}
            ></a-triangle>
            <a-text value="Avanzar" align="center" position="0 -0.8 0" color="#ffffff" width="3"></a-text>
          </a-entity>
        )}

        {/* Si estamos adentro (Paso 2) */}
        {foto === 'rectoria1a.jpg' && (
          <a-entity position="0 -1.5 3" rotation="-45 180 0">
            <a-triangle 
              color="#ef4444" 
              vertex-a="0 0.5 0" vertex-b="-0.5 -0.5 0" vertex-c="0.5 -0.5 0"
              class="clickable" 
              className="clickable"
              onClick={() => setEscenaActual('rectoria.jpg')}
            ></a-triangle>
            <a-text value="Atras" align="center" position="0 -0.8 0" color="#ffffff" width="3"></a-text>
          </a-entity>
        )}

        {/* Cámara con el "láser" activado para detectar el clic en las flechas */}
        <a-entity camera look-controls="enabled: true; mouseEnabled: true" position="0 0 0">
          <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-entity>

      </a-scene>
    </div>
  );
};

export default Viewer360;