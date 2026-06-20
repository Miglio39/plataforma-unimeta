import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, Play, MapPin, Info, Landmark, ArrowUp } from 'lucide-react';
import 'aframe';

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
         lugarHover.tipo === 'up' ? <ArrowUp size={24} color="white"/> : 
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

const Hotspot = ({ position, rotation, tipo, titulo, color, onClick, distancia, instruccion }) => {
  const entityRef = useRef(null);

  const iconosRaw = {
    nav: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
    info: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E",
    media: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E",
    back: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E",
    up: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M12 2l-8 8h6v12h4v-12h6z'/%3E%3C/svg%3E"
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
      <a-circle radius="0.5" color="#0b0f19" material="shader: flat; opacity: 0.5; transparent: true" position="0 0 -0.01" segments="64"></a-circle>
      <a-circle radius="0.45" color={color} material="shader: flat; opacity: 0.4; transparent: true" segments="64"></a-circle>
      <a-ring radius-inner="0.44" radius-outer="0.46" color={color} material="shader: flat; opacity: 0.9; transparent: true" segments="64"></a-ring>
      <a-image src={iconoActual} position="0 0 0.01" width="0.40" height="0.40" material="shader: flat; transparent: true"></a-image>
      <a-ring radius-inner="0.55" radius-outer="0.58" color={color} material="shader: flat; opacity: 0.5; transparent: true" segments="64"
              animation="property: scale; to: 1.15 1.15 1.15; dir: alternate; dur: 1200; loop: true; easing: easeInOutSine"></a-ring>
    </a-entity>
  );
};

const Viewer360 = ({ foto, setEscenaActual }) => {
  const [infoEmergente, setInfoEmergente] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const sceneRef = useRef(null);

  const moverCamara = (direccion) => {
    const camara = document.querySelector('[camera]');
    if (!camara || !camara.components['look-controls']) return;

    const lookControls = camara.components['look-controls'];
    if (lookControls.yawObject && lookControls.pitchObject) {
      const velocidadGiro = 0.15; 
      if (direccion === 'left') lookControls.yawObject.rotation.y += velocidadGiro;
      if (direccion === 'right') lookControls.yawObject.rotation.y -= velocidadGiro;
      if (direccion === 'up') lookControls.pitchObject.rotation.x += velocidadGiro;
      if (direccion === 'down') lookControls.pitchObject.rotation.x -= velocidadGiro;
      
      if (isAutoRotating) {
        setIsAutoRotating(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [isAutoRotating]);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;

    const stopAutoRotate = () => {
      if (isAutoRotating) {
        console.log("Interacción detectada, deteniendo rotación automática.");
        setIsAutoRotating(false);
      }
    };

    sceneEl.addEventListener('mousedown', stopAutoRotate);
    sceneEl.addEventListener('touchstart', stopAutoRotate);

    return () => {
      sceneEl.removeEventListener('mousedown', stopAutoRotate);
      sceneEl.removeEventListener('touchstart', stopAutoRotate);
    };
  }, [isAutoRotating]);

  return (
    <div className="viewer-container">
      
      <a-scene 
        ref={sceneRef}
        embedded 
        vr-mode-ui="enabled: false" 
        renderer="antialias: true; colorManagement: true;" 
        cursor="rayOrigin: mouse"
      >
        
        {/* PRECARGA NATIVA DE A-FRAME (Latencia Cero) */}
        <a-assets timeout="10000">
          <img id="tex-inicio" src="/assets/panoramas/inicio.jpg" crossOrigin="anonymous" alt="Inicio" />
          <img id="tex-biblioteca" src="/assets/panoramas/biblioteca.jpg" crossOrigin="anonymous" alt="Biblioteca" />
          <img id="tex-gimnasio" src="/assets/panoramas/gimnasio.jpg" crossOrigin="anonymous" alt="Gimnasio" />
          <img id="tex-auditorio" src="/assets/panoramas/auditorio-mayor.jpg" crossOrigin="anonymous" alt="Auditorio" />
          <img id="tex-parque" src="/assets/panoramas/parque.jpg" crossOrigin="anonymous" alt="Parque" />
        </a-assets>

        <a-entity 
          animation={foto === 'inicio.jpg' ? `property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 90000; easing: linear; enabled: ${isAutoRotating}` : undefined}
        >
          <a-sky src={`/assets/panoramas/${foto}`} color="#ffffff" rotation="0 -90 0"></a-sky>

          <a-entity visible={foto === 'inicio.jpg'} position={foto === 'inicio.jpg' ? "0 0 0" : "0 -9999 0"}>
            <Hotspot tipo="nav" position="2 -0.5 -5" rotation="0 -20 0" color="#3b82f6" titulo="Biblioteca" onClick={() => setEscenaActual('biblioteca.jpg')} distancia="A 35m" instruccion="Clic para entrar" />
            <Hotspot tipo="nav" position="-4 -1 -4" rotation="0 40 0" color="#3b82f6" titulo="Laboratorios" onClick={() => setEscenaActual('lab-software.jpg')} distancia="A 25m" instruccion="Clic para entrar"/>
            <Hotspot tipo="nav" position="5 -1 2" rotation="0 -110 0" color="#9333ea" titulo="Gimnasio" onClick={() => setEscenaActual('gimnasio.jpg')} distancia="A 18m" instruccion="Clic para entrar"/>
            <Hotspot tipo="nav" position="-2 -1 5" rotation="0 150 0" color="#3b82f6" titulo="Auditorios" onClick={() => setEscenaActual('auditorio-mayor.jpg')} distancia="A 40m" instruccion="Clic para entrar"/>
          </a-entity>
        </a-entity>

        <a-entity visible={foto === 'gimnasio.jpg'} position={foto === 'gimnasio.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot 
            tipo="up" 
            position="-3 1.5 4" 
            rotation="0 150 0" 
            color="#3b82f6" 
            titulo="Subir al Segundo Piso" 
            onClick={() => setEscenaActual('gimnasio-piso2.jpg')} 
            distancia="Escaleras" 
            instruccion="Clic para subir" 
          />
        </a-entity>

        <a-entity visible={foto === 'gimnasio-piso2.jpg'} position={foto === 'gimnasio-piso2.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot 
            tipo="back" position="-3 -1 4" rotation="0 150 0" 
            color="#ef4444" 
            titulo="Bajar al Primer Piso" onClick={() => setEscenaActual('gimnasio.jpg')} 
            distancia="Escaleras" instruccion="Clic para bajar" 
          />
        </a-entity>

        <a-entity camera look-controls="enabled: true; mouseEnabled: true" wasd-controls="enabled: false" position="0 0 0">
          <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-entity>
      </a-scene>

      <div className="viewer-ui-overlay" style={{ pointerEvents: 'none' }}>
        
        <TooltipFlotante />

        {infoEmergente && (
          <div className="hotspot-popup-modal pointer-auto" style={{ pointerEvents: 'auto' }}>
            <button className="close-popup" onClick={() => setInfoEmergente(null)}><X size={16}/></button>
            <div className="popup-header">{infoEmergente.icono}<h3>{infoEmergente.titulo}</h3></div>
            <p>{infoEmergente.contenido}</p>
          </div>
        )}

        <div className="overlay-top">
          <div className="v-minimap pointer-auto" style={{ pointerEvents: 'auto' }}>
            <div className="v-minimap-body">
              <img loading="lazy" src="/assets/panoramas/mapa-unimeta1.png" alt="Radar" onError={(e) => e.target.style.background = '#1e293b'} />
              <div className="radar-sweep"></div>
              <div className="v-map-pin"><MapPin size={12} fill="#ef4444" color="white"/></div>
            </div>
          </div>
        </div>

        {/* 🔴 INTERFAZ INFERIOR LIMPIA (Sin el carrusel de fotos) */}
        <div className="overlay-bottom" style={{ justifyContent: 'flex-start' }}>
          <div className="v-controls pointer-auto" style={{ pointerEvents: 'auto' }}>
            <button className="ctrl-btn up" onClick={() => moverCamara('up')}><ChevronUp size={16} /></button>
            <button className="ctrl-btn left" onClick={() => moverCamara('left')}><ChevronLeft size={16} /></button>
            <div className="ctrl-center"></div>
            <button className="ctrl-btn right" onClick={() => moverCamara('right')}><ChevronRight size={16} /></button>
            <button className="ctrl-btn down" onClick={() => moverCamara('down')}><ChevronDown size={16} /></button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Viewer360;