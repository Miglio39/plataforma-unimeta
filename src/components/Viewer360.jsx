import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, Play, MapPin, Info } from 'lucide-react';
import 'aframe';

const Hotspot = ({ position, rotation, tipo, titulo, color, onClick }) => {
  let icono = 'IR';
  if (tipo === 'info') icono = 'i';
  if (tipo === 'media') icono = '>';

  return (
    <a-entity position={position} rotation={rotation} scale="0.45 0.45 0.45" className="clickable" onClick={onClick}>
      <a-plane color="#0f1523" opacity="0.75" width="3.5" height="0.8" position="1.2 0 -0.01" material="shader: flat"></a-plane>
      <a-circle color={color} radius="0.4" material="shader: flat"></a-circle>
      <a-text value={icono} align="center" position="0 0 0.02" width="4" color="#ffffff" font="kelsonsans"></a-text>
      <a-text value={titulo} align="left" position="0.55 0 0.02" width="3.5" color="#ffffff" font="kelsonsans"></a-text>
    </a-entity>
  );
};

const Viewer360 = ({ foto, setEscenaActual }) => {
  const [girar, setGirar] = useState(true);
  const [infoEmergente, setInfoEmergente] = useState(null);
  const skyRef = useRef(null);

  useEffect(() => {
    if (skyRef.current) {
      skyRef.current.setAttribute('src', `/assets/panoramas/${foto}`);
    }
  }, [foto]);

  const detenerGiro = () => { if (girar) setGirar(false); };

  const moverCamara = (direccion) => {
    detenerGiro();
    const camara = document.querySelector('[camera]');
    if (!camara || !camara.components['look-controls']) return;

    const lookControls = camara.components['look-controls'];
    if (lookControls.yawObject && lookControls.pitchObject) {
      const velocidadGiro = 0.3;
      if (direccion === 'left') lookControls.yawObject.rotation.y += velocidadGiro;
      if (direccion === 'right') lookControls.yawObject.rotation.y -= velocidadGiro;
      if (direccion === 'up') lookControls.pitchObject.rotation.x += velocidadGiro;
      if (direccion === 'down') lookControls.pitchObject.rotation.x -= velocidadGiro;
    }
  };

  return (
    <div className="viewer-container" onMouseDown={detenerGiro} onTouchStart={detenerGiro}>
      
      <a-scene embedded vr-mode-ui="enabled: false" renderer="antialias: true; colorManagement: true;">
        
        <a-sky ref={skyRef} color="#ffffff" rotation="0 -90 0" animation={`property: rotation; to: 0 270 0; loop: true; dur: 120000; easing: linear; enabled: ${girar}`}></a-sky>

        {/* 🚁 DRON (INICIO) */}
        <a-entity visible={foto === 'inicio.jpg'} position={foto === 'inicio.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="nav" position="2 -1 -5" rotation="0 -20 0" color="#2563eb" titulo="Ir a Biblioteca" onClick={() => setEscenaActual('biblioteca.jpg')} />
          <Hotspot tipo="nav" position="-4 -2 -4" rotation="0 40 0" color="#10b981" titulo="Ir a Laboratorios" onClick={() => setEscenaActual('tech-laboratorio.jpg')} />
          <Hotspot tipo="nav" position="5 -1.5 2" rotation="0 -110 0" color="#f59e0b" titulo="Ir a Rectoría" onClick={() => setEscenaActual('rectoria.jpg')} />
        </a-entity>

        {/* 📚 BIBLIOTECA */}
        <a-entity visible={foto === 'biblioteca.jpg'} position={foto === 'biblioteca.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="nav" position="4 -0.5 -4" rotation="0 -45 0" color="#2563eb" titulo="Volver al Inicio" onClick={() => setEscenaActual('inicio.jpg')} />
          <Hotspot tipo="info" position="-3.5 0.5 -3" rotation="0 45 0" color="#eab308" titulo="Reglas de la Biblioteca" onClick={() => setInfoEmergente({ titulo: 'Reglamento Interno', contenido: 'Por favor mantener silencio en esta área. El uso de equipos electrónicos está permitido solo con audífonos.', icono: <Info size={24} color="#eab308" /> })} />
          <Hotspot tipo="media" position="0 -1.5 -4" rotation="-15 0 0" color="#ef4444" titulo="Audioguia: Historia" onClick={() => setInfoEmergente({ titulo: 'Audioguía Iniciada', contenido: 'Reproduciendo: "La historia de la biblioteca Hernán Villamarín...".', icono: <Play size={24} color="#ef4444" /> })} />
        </a-entity>

        {/* 🔬 LABORATORIOS */}
        <a-entity visible={foto === 'tech-laboratorio.jpg'} position={foto === 'tech-laboratorio.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="nav" position="4 -0.5 -4" rotation="0 -45 0" color="#2563eb" titulo="Volver al Inicio" onClick={() => setEscenaActual('inicio.jpg')} />
        </a-entity>

        {/* 🏛️ RECTORÍA */}
        <a-entity visible={foto === 'rectoria.jpg'} position={foto === 'rectoria.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="nav" position="0 -0.5 -4" rotation="0 0 0" color="#2563eb" titulo="Volver al Inicio" onClick={() => setEscenaActual('inicio.jpg')} />
        </a-entity>

        <a-entity camera look-controls="enabled: true; mouseEnabled: true" position="0 0 0">
          <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-entity>
      </a-scene>

      <div className="viewer-ui-overlay">
        
        {infoEmergente && (
          <div className="hotspot-popup-modal pointer-auto">
            <button className="close-popup" onClick={() => setInfoEmergente(null)}><X size={16}/></button>
            <div className="popup-header">{infoEmergente.icono}<h3>{infoEmergente.titulo}</h3></div>
            <p>{infoEmergente.contenido}</p>
          </div>
        )}

        <div className="overlay-top">
          <div className="v-minimap pointer-auto">
            <div className="v-minimap-body">
              <img src="/assets/panoramas/mapa-unimeta1.png" alt="Radar" onError={(e) => e.target.style.background = '#1e293b'} />
              <div className="radar-sweep"></div>
              <div className="v-map-pin"><MapPin size={12} fill="#ef4444" color="white"/></div>
            </div>
          </div>
        </div>

        <div className="overlay-bottom">
          <div className="v-controls pointer-auto">
            <button className="ctrl-btn up" onClick={() => moverCamara('up')}><ChevronUp size={16} /></button>
            <button className="ctrl-btn left" onClick={() => moverCamara('left')}><ChevronLeft size={16} /></button>
            <div className="ctrl-center"></div>
            <button className="ctrl-btn right" onClick={() => moverCamara('right')}><ChevronRight size={16} /></button>
            <button className="ctrl-btn down" onClick={() => moverCamara('down')}><ChevronDown size={16} /></button>
          </div>

          <div className="v-carousel pointer-auto">
            <div className={`carousel-item ${foto === 'inicio.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('inicio.jpg')} title="Inicio (Dron)">
              <img src="/assets/panoramas/inicio.jpg" alt="Inicio" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'biblioteca.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('biblioteca.jpg')} title="Biblioteca">
              <img src="/assets/panoramas/biblioteca.jpg" alt="Biblio" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'rectoria.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('rectoria.jpg')} title="Rectoría">
              <img src="/assets/panoramas/rectoria.jpg" alt="Rectoria" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'laboratorio.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('laboratorio.jpg')} title="Unimeta Tech">
              <img src="/assets/panoramas/laboratorio.jpg" alt="Tech" onError={(e) => e.target.style.display = 'none'}/>
            </div>
          </div>

          {/* 🔴 SOLUCIÓN MÁGICA: Espaciador invisible de 70px para contrarrestar los controles izquierdos y centrar el carrusel */}
          <div style={{ width: '70px', height: '70px' }}></div>
          
        </div>
      </div>
    </div>
  );
};

export default Viewer360;