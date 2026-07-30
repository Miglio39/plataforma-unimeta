import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, Play, MapPin, Info, Landmark, ArrowUp, User } from 'lucide-react';
import 'aframe';

// =======================================================
// 🛠️ MODO DESARROLLADOR: BUSCADOR DE COORDENADAS
// =======================================================
if (typeof window !== 'undefined' && typeof window.AFRAME !== 'undefined' && !window.AFRAME.components['dev-logger']) {
  window.AFRAME.registerComponent('dev-logger', {
    init: function () {
      this.el.addEventListener('click', (e) => {
        if (e.detail.intersection) {
          const p = e.detail.intersection.point;
          const coordenadaExacta = `${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)}`;
          
          navigator.clipboard.writeText(coordenadaExacta).then(() => {
            const toast = document.createElement('div');
            toast.innerText = `📍 Coordenada copiada: ${coordenadaExacta}`;
            toast.style.cssText = "position:absolute; top:20px; left:50%; transform:translateX(-50%); background:#10b981; color:white; padding:10px 20px; border-radius:10px; z-index:9999; font-weight:bold; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: sans-serif;";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
          }).catch(err => {
            console.log("Coordenada:", coordenadaExacta);
          });
        }
      });
    }
  });
}

// =======================================================
// 📍 MATRIZ LIMPIA: MAPEO DEL PARQUE METROPOLITANO
// =======================================================
const recorridoParque = [
  { id: 'parque-01.jpg', next: 'parque-02.jpg', prev: null, posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: '' },
  { id: 'parque-02.jpg', next: 'parque-05.jpg', prev: 'parque-01.jpg', posNext: '-4.35 2.50 -6.19', rotNext: '0 50 0', tipoNext: 'info', posPrev: '0 -1.50 6', textNext: 'Vista Aérea', textPrev: 'Retroceder' },  
  { id: 'parque-03.jpg', next: 'parque-04.jpg', prev: 'parque-02.jpg', posNext: '6.22 -1.50 -2.05', posPrev: '1.10 -1.50 5.21', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-05.jpg', next: 'parque-06.jpg', prev: 'parque-04.jpg', posNext: '-1.23 -1.50 5.01', posPrev: '-3.91 -1.50 1.25', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-06.jpg', next: 'parque-12.jpg', prev: 'parque-05.jpg', posNext: '22.55 0.5 -2.36', rotNext: '0 5000 0', tipoNext: 'info', posPrev: '-2.27 2.50 -7.94', rotPrev: '0 0 0', tipoPrev: 'back', textNext: 'Avanzar a lo lejos', textPrev: 'Vista Aérea' },  
  { id: 'parque-12.jpg', next: 'parque-14.jpg', prev: 'parque-06.jpg', posNext: '0.37 -1.50 -5.11', posPrev: '0.03 -1.50 9.75', textNext: 'Ir al establo', textPrev: 'Retroceder' },
  { id: 'parque-14.jpg', next: 'parque-16.jpg', prev: 'parque-12.jpg', posNext: '4.59 0.50 -8.26', rotNext: '0 5 0', tipoNext: 'info', posPrev: '0 -1.50 6', textNext: 'Entrar al establo', textPrev: 'Retroceder' },
  
  // 🔴 FOTO 16 (Ajustada): Flecha de avanzar flotante ('Casa principal'), flecha de retroceso acostada y girada 180°
  { id: 'parque-16.jpg', next: 'parque-19.jpg', prev: 'parque-14.jpg', posNext: '0.53 1 -2.23', rotNext: '0 0 0', tipoNext: 'info', posPrev: '-0.46 -1.50 3.38', rotPrev: '-90 0 0', tipoPrev: 'up', rotIconoPrev: 180, tamanoPrev: 0.5, textNext: 'Casa principal', textPrev: 'Retroceder' },
  
  { id: 'parque-19.jpg', next: 'parque-24.jpg', prev: 'parque-16.jpg', posNext: '-7.21 1.50 -2.31',rotNext: '0 50 0', tipoNext: 'info', posPrev: '0  6', textNext: 'Avanzar', },
  { id: 'parque-24.jpg', next: 'parque-20.jpg', prev: 'parque-19.jpg', posNext: '-1.08 -1.50 -2.88', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-23.jpg', next: 'parque-22.jpg', prev: 'parque-24.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Auditorio', textPrev: 'Retroceder' },
  { id: 'parque-22.jpg', next: 'parque-23.jpg', prev: 'parque-21.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-2.jpg', next: 'parque-24.jpg', prev: 'parque-22.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  
  
  
  { id: 'parque-25.jpg', next: 'parque-26.jpg', prev: 'parque-24.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-26.jpg', next: 'parque-27.jpg', prev: 'parque-25.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-27.jpg', next: 'parque-28.jpg', prev: 'parque-26.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: 'Avanzar', textPrev: 'Retroceder' },
  { id: 'parque-28.jpg', next: null, prev: 'parque-27.jpg', posNext: '0 -1.50 -6', posPrev: '0 -1.50 6', textNext: '', textPrev: 'Retroceder' }
];

// 🟢 TOOLTIP FLOTANTE
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
      background: 'rgba(11, 15, 25, 0.9)', backdropFilter: 'blur(10px)',
      border: `1px solid ${lugarHover.color}60`, borderRadius: '40px', 
      padding: '8px 20px 8px 8px', display: 'flex', alignItems: 'center', gap: '15px', 
      color: 'white', zIndex: 1000, boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${lugarHover.color}40`,
      pointerEvents: 'none', transition: 'all 0.2s ease-out' 
    }}>
      
      {lugarHover.miniatura ? (
        <div style={{ width: '55px', height: '55px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${lugarHover.color}`, flexShrink: 0, backgroundColor: '#1e293b' }}>
          <img 
            src={`/assets/panoramas/${lugarHover.miniatura}`} 
            alt="Vista Previa" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ) : (
        <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: lugarHover.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px ${lugarHover.color}`, flexShrink: 0 }}>
          {lugarHover.tipo === 'nav' ? <Landmark size={24} color="white"/> :
           lugarHover.tipo === 'back' ? <MapPin size={24} color="white"/> :
           lugarHover.tipo === 'info' ? <Info size={24} color="white"/> :
           lugarHover.tipo === 'up' ? <ArrowUp size={24} color="white"/> : 
           <User size={24} color="white"/>}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '10px' }}>
         <h4 style={{ fontWeight: '700', fontSize: '1.1rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {lugarHover.titulo}
         </h4>
         <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>{lugarHover.instruccion}</span>
      </div>
    </div>
  );
};

// 🔴 COMPONENTE INTELIGENTE ACTUALIZADO
const Hotspot = ({ position, rotation, tipo, titulo, color, onClick, instruccion, destino, tamano = 1, rotIcono = 0 }) => {
  const entityRef = useRef(null);
  
  // Determinamos si va en el piso
  const isGround = !rotation || rotation.startsWith("-90");
  
  const scaleBase = isGround ? 1.1 : 0.75;
  const scaleFinal = scaleBase * tamano;

  const iconosRaw = {
    nav: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
    info: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E",
    back: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E",
    up: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1024' height='1024' fill='white'%3E%3Cpath d='M12 2l-8 8h6v12h4v-12h6z'/%3E%3C/svg%3E"
  };
  
  const iconoActual = iconosRaw[tipo] || iconosRaw.nav;

  useEffect(() => {
    if (!entityRef.current) return;
    const el = entityRef.current;
    
    const onMouseEnter = () => window.dispatchEvent(new CustomEvent('mostrar-tooltip', { detail: { titulo, tipo, color, instruccion, miniatura: destino } }));
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
  }, [titulo, tipo, color, instruccion, destino, onClick]);

  return (
    <a-entity ref={entityRef} position={position} rotation={rotation || "-90 0 0"} className="clickable" scale={`${scaleFinal} ${scaleFinal} ${scaleFinal}`}>
      {isGround ? (
        <React.Fragment>
          <a-circle radius="0.5" color="#0b0f19" material="shader: flat; opacity: 0.5; transparent: true" segments="64"></a-circle>
          <a-circle radius="0.25" color={color} material="shader: flat;" position="0 0 0.01"></a-circle>
          
          {/* 🔴 EL DIBUJO GIRA AQUÍ ADENTRO */}
          <a-image src={iconoActual} position="0 0 0.02" rotation={`0 0 ${rotIcono}`} width="0.25" height="0.25" material="shader: flat; transparent: true"></a-image>

          <a-ring radius-inner="0.28" radius-outer="0.29" color="white" material="shader: flat; opacity: 0.8; transparent: true" position="0 0 0.01" segments="64"></a-ring>
          <a-ring radius-inner="0.32" radius-outer="0.33" color="white" material="shader: flat; opacity: 0.8; transparent: true" position="0 0 0.01" segments="64"></a-ring>
          <a-ring radius-inner="0.36" radius-outer="0.37" color="white" material="shader: flat; opacity: 0.8; transparent: true" position="0 0 0.01" segments="64"></a-ring>
          
          <a-ring radius-inner="0.5" radius-outer="0.55" color="white" material="shader: flat; opacity: 0.6; transparent: true" segments="64"
                  animation="property: scale; to: 1.3 1.3 1.3; dur: 2000; loop: true; easing: easeOutQuad; dir: alternate"></a-ring>
          <a-ring radius-inner="0.5" radius-outer="0.55" color="white" material="shader: flat; opacity: 0.6; transparent: true" segments="64"
                  animation="property: opacity; to: 0; dur: 2000; loop: true; easing: linear;"></a-ring>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <a-circle radius="0.4" color={color} material="shader: flat; opacity: 0.8; transparent: true" position="0 0 -0.01" segments="64"></a-circle>
          <a-ring radius-inner="0.38" radius-outer="0.42" color={color} material="shader: flat; opacity: 1; transparent: true" segments="64"></a-ring>
          <a-ring radius-inner="0.45" radius-outer="0.55" color={color} material="shader: flat; opacity: 0.7; transparent: true" segments="64"
                  animation="property: scale; to: 1.25 1.25 1.25; dir: alternate; dur: 1200; loop: true; easing: easeInOutSine"></a-ring>
          
          <a-image src={iconoActual} position="0 0 0.01" rotation={`0 0 ${rotIcono}`} width="0.4" height="0.4" material="shader: flat; transparent: true"></a-image>
        </React.Fragment>
      )}
    </a-entity>
  );
};

const Viewer360 = ({ foto, setEscenaActual }) => {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [fadeOpacity, setFadeOpacity] = useState(0); 
  const [zoomScale, setZoomScale] = useState(1);
  const sceneRef = useRef(null);

  const manejarCambioEscena = (nuevaEscena) => {
    setFadeOpacity(1);
    setZoomScale(1.15); 
    setTimeout(() => {
      setEscenaActual(nuevaEscena); 
      setTimeout(() => {
        setFadeOpacity(0);
        setZoomScale(1); 
      }, 200); 
    }, 450);
  };

  const moverCamara = (direccion) => {
    const camara = document.querySelector('[camera]');
    if (!camara || !camara.components['look-controls']) return;
    const lookControls = camara.components['look-controls'];
    if (lookControls.yawObject && lookControls.pitchObject) {
      const velocidadGiro = 0.20;
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
        case 'ArrowUp': case 'w': case 'W': moverCamara('up'); break;
        case 'ArrowDown': case 's': case 'S': moverCamara('down'); break;
        case 'ArrowLeft': case 'a': case 'A': moverCamara('left'); break;
        case 'ArrowRight': case 'd': case 'D': moverCamara('right'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoRotating]);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;
    const stopAutoRotate = () => {
      if (isAutoRotating) setIsAutoRotating(false);
    };
    sceneEl.addEventListener('mousedown', stopAutoRotate);
    sceneEl.addEventListener('touchstart', stopAutoRotate);
    return () => {
      sceneEl.removeEventListener('mousedown', stopAutoRotate);
      sceneEl.removeEventListener('touchstart', stopAutoRotate);
    };
  }, [isAutoRotating]);

  return (
    <div className="viewer-container" style={{ overflow: 'hidden' }}>
      
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000',
          opacity: fadeOpacity,
          backdropFilter: fadeOpacity > 0.1 ? 'blur(8px)' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 90
        }}
      />
      
      <a-scene 
        ref={sceneRef}
        embedded 
        vr-mode-ui="enabled: false" 
        renderer="antialias: true; colorManagement: true;" 
        cursor="rayOrigin: mouse"
        style={{
          transform: `scale(${zoomScale})`,
          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <a-plane dev-logger className="clickable" position="0 -1.5 0" rotation="-90 0 0" width="100" height="100" material="opacity: 0.0; transparent: true"></a-plane>

        <a-assets timeout="10000">
          <img id="tex-inicio" src="/assets/panoramas/inicio.jpg" crossOrigin="anonymous" alt="Inicio" />
          <img id="tex-biblioteca" src="/assets/panoramas/biblioteca.jpg" crossOrigin="anonymous" alt="Biblioteca" />
          <img id="tex-gimnasio" src="/assets/panoramas/gimnasio.jpg" crossOrigin="anonymous" alt="Gimnasio" />
          <img id="tex-auditorio" src="/assets/panoramas/auditorio-mayor.jpg" crossOrigin="anonymous" alt="Auditorio" />
          {recorridoParque.map(nodo => (
            <img key={`asset-${nodo.id}`} id={`tex-${nodo.id}`} src={`/assets/panoramas/${nodo.id}`} crossOrigin="anonymous" alt={nodo.id} />
          ))}
        </a-assets>

        {foto === 'inicio.jpg' && (
          <a-entity animation={`property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 90000; easing: linear; enabled: ${isAutoRotating}`}>
            <a-sky src="/assets/panoramas/inicio.jpg" color="#ffffff" rotation="0 -90 0"></a-sky>
            <a-entity position="0 0 0">
              <Hotspot tipo="nav" position="2 -0.5 -5" rotation="0 -20 0" color="#3b82f6" titulo="Biblioteca" destino="biblioteca.jpg" instruccion="Clic para entrar" onClick={() => manejarCambioEscena('biblioteca.jpg')} />
              <Hotspot tipo="nav" position="-4 -1 -4" rotation="0 40 0" color="#3b82f6" titulo="Laboratorios" destino="lab-software.jpg" instruccion="Clic para entrar" onClick={() => manejarCambioEscena('lab-software.jpg')} />
              <Hotspot tipo="nav" position="5 -1 2" rotation="0 -110 0" color="#9333ea" titulo="Gimnasio" destino="gimnasio.jpg" instruccion="Clic para entrar" onClick={() => manejarCambioEscena('gimnasio.jpg')} />
              <Hotspot tipo="nav" position="-2 -1 5" rotation="0 150 0" color="#3b82f6" titulo="Auditorios" destino="auditorio-mayor.jpg" instruccion="Clic para entrar" onClick={() => manejarCambioEscena('auditorio-mayor.jpg')} />
            </a-entity>
          </a-entity>
        )}

        {foto !== 'inicio.jpg' && (
          <a-sky src={`/assets/panoramas/${foto}`} color="#ffffff" rotation="0 -90 0"></a-sky>
        )}

        <a-entity visible={foto === 'gimnasio.jpg'} position={foto === 'gimnasio.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="up" position="-3 1.5 4" rotation="0 150 0" color="#3b82f6" titulo="Subir al Segundo Piso" destino="gimnasio-piso2.jpg" instruccion="Clic para subir" onClick={() => manejarCambioEscena('gimnasio-piso2.jpg')} />
        </a-entity>

        <a-entity visible={foto === 'gimnasio-piso2.jpg'} position={foto === 'gimnasio-piso2.jpg' ? "0 0 0" : "0 -9999 0"}>
          <Hotspot tipo="back" position="-3 -1 4" rotation="0 150 0" color="#ef4444" titulo="Bajar al Primer Piso" destino="gimnasio.jpg" instruccion="Clic para bajar" onClick={() => manejarCambioEscena('gimnasio.jpg')} />
        </a-entity>

        {recorridoParque.map((nodo) => (
          <a-entity key={`nodo-${nodo.id}`} visible={foto === nodo.id} position={foto === nodo.id ? "0 0 0" : "0 -9999 0"}>
            
            {nodo.prev && (
              <Hotspot 
                tipo={nodo.tipoPrev || "back"} 
                position={nodo.posPrev} 
                rotation={nodo.rotPrev || "-90 0 0"} 
                rotIcono={nodo.rotIconoPrev || 0}
                tamano={nodo.tamanoPrev || 1}
                color="#ef4444" 
                titulo={nodo.textPrev || "Retroceder"} 
                destino={nodo.prev} 
                instruccion="Clic para retroceder" 
                onClick={() => manejarCambioEscena(nodo.prev)}
              />
            )}
            
            {nodo.next && (
              <Hotspot 
                tipo={nodo.tipoNext || "nav"} 
                position={nodo.posNext} 
                rotation={nodo.rotNext || "-90 0 0"} 
                rotIcono={nodo.rotIconoNext || 0}
                tamano={nodo.tamanoNext || 1}
                color="#10b981" 
                titulo={nodo.textNext || "Avanzar"} 
                destino={nodo.next} 
                instruccion={nodo.tipoNext === 'up' ? "Clic para volar" : "Clic para avanzar"} 
                onClick={() => manejarCambioEscena(nodo.next)}
              />
            )}

            {nodo.next2 && (
              <Hotspot 
                tipo={nodo.tipoNext2 || "nav"} 
                position={nodo.posNext2} 
                rotation={nodo.rotNext2 || "-90 0 0"} 
                rotIcono={nodo.rotIconoNext2 || 0}
                tamano={nodo.tamanoNext2 || 1}
                color="#3b82f6" 
                titulo={nodo.textNext2 || "Desvío"} 
                destino={nodo.next2} 
                instruccion="Clic para avanzar"
                onClick={() => manejarCambioEscena(nodo.next2)} 
              />
            )}

            {/* 🔴 NUEVO: BOTÓN AVANZAR 3 */}
            {nodo.next3 && (
              <Hotspot 
                tipo={nodo.tipoNext3 || "nav"} 
                position={nodo.posNext3} 
                rotation={nodo.rotNext3 || "-90 0 0"} 
                rotIcono={nodo.rotIconoNext3 || 0}
                tamano={nodo.tamanoNext3 || 1}
                color="#10b981" 
                titulo={nodo.textNext3 || "Camino Extra"} 
                destino={nodo.next3} 
                instruccion="Clic para avanzar"
                onClick={() => manejarCambioEscena(nodo.next3)} 
              />
            )}
            
          </a-entity>
        ))}

        <a-entity camera look-controls="enabled: true; mouseEnabled: true" wasd-controls="enabled: false" position="0 0 0">
          <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-entity>
      </a-scene>

      <div className="viewer-ui-overlay" style={{ pointerEvents: 'none' }}>
        <TooltipFlotante />
        <div style={{ position: 'absolute', bottom: '30px', left: '30px', pointerEvents: 'auto', zIndex: 100 }}>
          <div className="v-controls">
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