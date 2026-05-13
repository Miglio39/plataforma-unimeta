import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, Play, MapPin, Info, Landmark } from 'lucide-react';
import 'aframe';

// 🔴 EL TOOLTIP INDEPENDIENTE (Para no recargar el 3D)
const TooltipFlotante = () => {
  const [lugarHover, setLugarHover] = useState(null);

  useEffect(() => {
    const mostrar = (e) => setLugarHover(e.detail);
    const ocultar = () => setLugarHover(null);
    window.addEventListener('mostrar-tooltip', mostrar);
    window.addEventListener('ocultar-tooltip', ocultar);
    return () => {
      window.removeEventListener('mostrar-tooltip', mostrar);
      window.removeEventListener('ocultar-tooltip', ocultar);
    };
  }, []);

  if (!lugarHover) return null;

  return (
    <div style={{
      position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(11, 15, 25, 0.85)', backdropFilter: 'blur(8px)',
      border: `1px solid ${lugarHover.color}60`, borderRadius: '15px', 
      padding: '15px 20px', display: 'flex', gap: '15px', 
      color: 'white', zIndex: 1000, boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${lugarHover.color}40`,
      pointerEvents: 'none', maxWidth: '350px' 
    }}>
      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: lugarHover.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px ${lugarHover.color}`, flexShrink: 0 }}>
        {lugarHover.tipo === 'nav' ? <Landmark size={24} color="white"/> :
         lugarHover.tipo === 'back' ? <MapPin size={24} color="white"/> :
         lugarHover.tipo === 'info' ? <Info size={24} color="white"/> :
         <Play size={24} color="white"/>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
         <h4 style={{ fontWeight: '700', fontSize: '1.2rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {lugarHover.titulo} - {lugarHover.instruccion} 
         </h4>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ background: '#3b82f6', color: 'white', borderRadius: '15px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
               <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>Distancia: {lugarHover.distancia}</span>
            </div>
         </div>
      </div>
    </div>
  );
};


// ==========================================
// 1. HOTSPOT ANTI-CRASHES
// ==========================================
const Hotspot = ({ position, rotation, tipo, titulo, color, onClick, distancia, instruccion }) => {
  const entityRef = useRef(null);

  const iconosRaw = {
    nav: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
    info: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E",
    media: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E",
    back: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E"
  };

  const iconoActual = iconosRaw[tipo] || iconosRaw.nav;

  useEffect(() => {
    if (!entityRef.current) return;
    const el = entityRef.current;
    
    const onMouseEnter = () => window.dispatchEvent(new CustomEvent('mostrar-tooltip', { detail: { titulo, tipo, color, distancia, instruccion } }));
    const onMouseLeave = () => window.dispatchEvent(new CustomEvent('ocultar-tooltip'));
    
    const onMouseClick = () => {
      if (onClick) onClick();
      window.dispatchEvent(new CustomEvent('ocultar-tooltip'));
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('click', onMouseClick);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('click', onMouseClick);
    };
  }, [titulo, tipo, color, distancia, instruccion, onClick]);

  return (
    <a-entity
      ref={entityRef}
      position={position}
      rotation={rotation}
      className="clickable"
      scale="0.5 0.5 0.5" 
      animation__mouseenter="property: scale; to: 0.55 0.55 0.55; dur: 200; easing: easeOutQuad; startEvents: mouseenter"
      animation__mouseleave="property: scale; to: 0.5 0.5 0.5; dur: 200; easing: easeOutQuad; startEvents: mouseleave"
    >
      <a-circle radius="0.5" color="#000000" material="shader: flat; opacity: 0.4" position="0 0 -0.01" segments="64"></a-circle>
      <a-circle radius="0.45" color={color} material="shader: flat; opacity: 0.95" segments="64"></a-circle>
      <a-image src={iconoActual} position="0 0 0.01" width="0.45" height="0.45" material="shader: flat; transparent: true"></a-image>
      <a-ring radius-inner="0.6" radius-outer="0.65" color="#ffffff" material="shader: flat; opacity: 0.8" segments="64"
              animation="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1000; loop: true; easing: easeInOutSine"></a-ring>
    </a-entity>
  );
};


// ==========================================
// 2. COMPONENTE PRINCIPAL
// ==========================================
const Viewer360 = ({ foto, setEscenaActual }) => {
  const [infoEmergente, setInfoEmergente] = useState(null);

  // 🔴 FUNCIÓN DE GIRO CENTRALIZADA
  const moverCamara = (direccion) => {
    const camara = document.querySelector('[camera]');
    if (!camara || !camara.components['look-controls']) return;

    const lookControls = camara.components['look-controls'];
    if (lookControls.yawObject && lookControls.pitchObject) {
      const velocidadGiro = 0.15; // Velocidad suave
      if (direccion === 'left') lookControls.yawObject.rotation.y += velocidadGiro;
      if (direccion === 'right') lookControls.yawObject.rotation.y -= velocidadGiro;
      if (direccion === 'up') lookControls.pitchObject.rotation.x += velocidadGiro;
      if (direccion === 'down') lookControls.pitchObject.rotation.x -= velocidadGiro;
    }
  };

  // 🔴 ESCUCHADOR DE TECLADO (WASD y Flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignorar si el usuario está escribiendo en el chat o en un input
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;

      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          moverCamara('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moverCamara('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moverCamara('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moverCamara('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="viewer-container">
      
      {/* CAPA 3D (A-FRAME) */}
      <a-scene embedded vr-mode-ui="enabled: false" renderer="antialias: true; colorManagement: true; highResolution: true;" cursor="rayOrigin: mouse">
        <a-sky src={`/assets/panoramas/${foto}`} color="#ffffff" rotation="0 -90 0"></a-sky>

        {/* =========================================
            🚁 MARCADORES: SOLO EN LA VISTA DRON
            ========================================= */}
        <a-entity visible={foto === 'inicio.jpg'} position={foto === 'inicio.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot 
            tipo="nav" position="2 -0.5 -5" rotation="0 -20 0" color="#9333ea" 
            titulo="Biblioteca" onClick={() => setEscenaActual('biblioteca.jpg')} 
            distancia="A 35m" instruccion="Clic para entrar" 
          />
          <Hotspot 
            tipo="nav" position="-4 -1 -4" rotation="0 40 0" color="#10b981" 
            titulo="Laboratorios" onClick={() => setEscenaActual('tech-laboratorio.jpg')} 
            distancia="A 25m" instruccion="Clic para entrar"
          />
          <Hotspot 
            tipo="nav" position="5 -1 2" rotation="0 -110 0" color="#f59e0b" 
            titulo="Rectoría" onClick={() => setEscenaActual('rectoria.jpg')} 
            distancia="A 18m" instruccion="Clic para entrar"
          />
          <Hotspot 
            tipo="nav" position="-2 -1 5" rotation="0 150 0" color="#ea580c" 
            titulo="Auditorios" onClick={() => setEscenaActual('auditorios.jpg')} 
            distancia="A 40m" instruccion="Clic para entrar"
          />
        </a-entity>

        {/* 🔴 CÁMARA: Desactivamos el WASD nativo (caminar) para usar nuestro script de rotación */}
        <a-entity camera look-controls="enabled: true; mouseEnabled: true" wasd-controls="enabled: false" position="0 0 0">
          <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-entity>
      </a-scene>

      {/* =========================================
          CAPA HTML (INTERFAZ SUPERPUESTA)
          ========================================= */}
      <div className="viewer-ui-overlay" style={{ pointerEvents: 'none' }}>
        
        <TooltipFlotante />

        {/* POPUP DE INFO EMERGENTE */}
        {infoEmergente && (
          <div className="hotspot-popup-modal pointer-auto" style={{ pointerEvents: 'auto' }}>
            <button className="close-popup" onClick={() => setInfoEmergente(null)}><X size={16}/></button>
            <div className="popup-header">{infoEmergente.icono}<h3>{infoEmergente.titulo}</h3></div>
            <p>{infoEmergente.contenido}</p>
          </div>
        )}

        {/* MINIMAPA RADAR */}
        <div className="overlay-top">
          <div className="v-minimap pointer-auto" style={{ pointerEvents: 'auto' }}>
            <div className="v-minimap-body">
              <img src="/assets/panoramas/mapa-unimeta1.png" alt="Radar" onError={(e) => e.target.style.background = '#1e293b'} />
              <div className="radar-sweep"></div>
              <div className="v-map-pin"><MapPin size={12} fill="#ef4444" color="white"/></div>
            </div>
          </div>
        </div>

        {/* CONTROLES INFERIORES Y CARRUSEL */}
        <div className="overlay-bottom">
          <div className="v-controls pointer-auto" style={{ pointerEvents: 'auto' }}>
            <button className="ctrl-btn up" onClick={() => moverCamara('up')}><ChevronUp size={16} /></button>
            <button className="ctrl-btn left" onClick={() => moverCamara('left')}><ChevronLeft size={16} /></button>
            <div className="ctrl-center"></div>
            <button className="ctrl-btn right" onClick={() => moverCamara('right')}><ChevronRight size={16} /></button>
            <button className="ctrl-btn down" onClick={() => moverCamara('down')}><ChevronDown size={16} /></button>
          </div>

          <div className="v-carousel pointer-auto" style={{ pointerEvents: 'auto' }}>
            <div className={`carousel-item ${foto === 'inicio.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('inicio.jpg')} title="Inicio (Dron)">
              <img src="/assets/panoramas/inicio.jpg" alt="Inicio" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'biblioteca.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('biblioteca.jpg')} title="Biblioteca">
              <img src="/assets/panoramas/biblioteca.jpg" alt="Biblio" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'rectoria.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('rectoria.jpg')} title="Rectoría">
              <img src="/assets/panoramas/rectoria.jpg" alt="Rectoria" onError={(e) => e.target.style.display = 'none'}/>
            </div>
            <div className={`carousel-item ${foto === 'tech-laboratorio.jpg' ? 'active' : ''}`} onClick={() => setEscenaActual('tech-laboratorio.jpg')} title="Laboratorios">
              <img src="/assets/panoramas/tech-laboratorio.jpg" alt="Tech" onError={(e) => e.target.style.display = 'none'}/>
            </div>
          </div>

          <div style={{ width: '70px', height: '70px' }}></div>
          
        </div>
      </div>
    </div>
  );
};

export default Viewer360;