import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360';
import ChatBot from './components/ChatBot'; 
import './styles/App.css'; 

// ==========================================
// 🔴 DICCIONARIO DE SEDES Y DEPENDENCIAS 🔴
// Aquí configuras qué foto y qué mapa se muestra al tocar cada botón del menú
// ==========================================
const datosSedes = {
  'unimeta-tech.jpg': {
    vistaExterior: '/assets/panoramas/exterior-unimeta-tech.jpg', 
    mapaUrl: 'https://maps.google.com/maps?q=4.152212,-73.638332+(UNIMETA%20Tech)&hl=es&z=18&output=embed'
  },
  'biblioteca.jpg': {
    vistaExterior: '/assets/panoramas/exterior-biblioteca.jpg', 
    mapaUrl: 'https://maps.google.com/maps?q=4.1442,-73.6251+(Biblioteca%20San%20Fernando)&hl=es&z=18&output=embed'
  },
  'parque-metropolitano.jpg': {
    vistaExterior: '/assets/panoramas/exterior-parque.jpg', 
    mapaUrl: 'https://maps.google.com/maps?q=4.1350,-73.6200+(Parque%20Metropolitano)&hl=es&z=16&output=embed'
  },
  
  // 4. Rectoria (Paso 1)
  'rectoria.jpg': {
    vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', 
    mapaUrl: 'https://maps.google.com/maps?q=4.1471000059997785,-73.63631587475693+(Rectoría%20UNIMETA)&hl=es&z=18&output=embed'
  },
  // 5. Rectoria (Paso 2 agregado para que no se ponga blanco)
  'rectoria1a.jpg': {
    vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', 
    mapaUrl: 'https://maps.google.com/maps?q=4.1471000059997785,-73.63631587475693+(Rectoría%20UNIMETA)&hl=es&z=18&output=embed'
  }
};
  
function App() {
  const [escenaActual, setEscenaActual] = useState('unimeta-tech.jpg');
  const [mensajeIA, setMensajeIA] = useState("¡Hola! Explora el campus o pregúntame algo.");
  
  const [mapaExpandido, setMapaExpandido] = useState(false);
  const [imagenExpandida, setImagenExpandida] = useState(false);
  const [visorExpandido, setVisorExpandido] = useState(false);

  // LA MAGIA DE SINCRONIZACIÓN: 
  const infoSede = datosSedes[escenaActual] || {
    vistaExterior: '/assets/panoramas/mapa-unimeta.png',
    mapaUrl: 'https://maps.google.com/maps?q=4.1442,-73.6251+(Campus%20San%20Fernando)&hl=es&z=18&output=embed'
  };

  useEffect(() => {
    const alCambiarPantallaCompleta = () => {
      if (!document.fullscreenElement) {
        setVisorExpandido(false);
      }
    };
    document.addEventListener('fullscreenchange', alCambiarPantallaCompleta);
    return () => document.removeEventListener('fullscreenchange', alCambiarPantallaCompleta);
  }, []);

  const togglePantallaCompleta = () => {
    const elementoVisor = document.querySelector('.columna-principal');
    
    if (!document.fullscreenElement) {
      if (elementoVisor.requestFullscreen) {
        elementoVisor.requestFullscreen();
      } else if (elementoVisor.webkitRequestFullscreen) { 
        elementoVisor.webkitRequestFullscreen();
      }
      setVisorExpandido(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
      }
      setVisorExpandido(false);
    }
  };

  return (
    <div className="app-container">
      
      <Sidebar setEscenaActual={setEscenaActual} escenaActual={escenaActual} />
      
      <main className="main-content">
        <div className="dashboard-grid-nuevo">
          
          <div className="columna-lateral">
            
            {/* --- TARJETA 1: VISTA EXTERIOR DINÁMICA --- */}
            <div className="tarjeta-lateral">
              <div className="tarjeta-header">
                Vista Exterior
                <button className="btn-expandir" onClick={() => setImagenExpandida(true)} title="Ampliar imagen">⛶</button>
              </div>
              <img 
                src={infoSede.vistaExterior} 
                alt="Vista exterior de la sede" 
                className="imagen-edificio" 
              />
            </div>

            {/* --- TARJETA 2: MAPA DINÁMICO --- */}
            <div className="tarjeta-lateral">
              <div className="tarjeta-header">
                Ubicación del Campus
                <button className="btn-expandir" onClick={() => setMapaExpandido(true)} title="Ampliar mapa">⛶</button>
              </div>
              <div className="mapa-contenedor">
                <iframe
                  width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                  src={infoSede.mapaUrl}
                  title="Mapa de la Sede"
                ></iframe>
              </div>
            </div>

          </div>

          {/* --- TARJETA 3: VISOR 360 DINÁMICO --- */}
          <div className="columna-principal">
            
            <div className="badge-360">
              Vista 360° en Tiempo Real
              <button 
                className="btn-expandir-solo-icono" 
                onClick={togglePantallaCompleta}
                title={visorExpandido ? "Cerrar pantalla completa" : "Ampliar a pantalla completa"}
              >
                {visorExpandido ? '✕' : '⛶'}
              </button>
            </div>

            {/* 🔴 Le pasamos la función setEscenaActual al visor para que la flecha pueda cambiar la foto */}
            <Viewer360 foto={escenaActual} setEscenaActual={setEscenaActual} />
          </div>

        </div>

        <div style={{ display: visorExpandido ? 'none' : 'block' }}>
          <ChatBot mensaje={mensajeIA} setEscenaActual={setEscenaActual} />
        </div>

      </main> 

      {/* =========================================
          MODALES FLOTANTES (TAMBIÉN SON DINÁMICOS)
          ========================================= */}

      {mapaExpandido && (
        <div className="modal-overlay" onClick={() => setMapaExpandido(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar-modal" onClick={() => setMapaExpandido(false)}>✕</button>
            <iframe
              width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
              src={infoSede.mapaUrl}
              title="Mapa Expandido"
            ></iframe>
          </div>
        </div>
      )}

      {imagenExpandida && (
        <div className="modal-overlay" onClick={() => setImagenExpandida(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar-modal" onClick={() => setImagenExpandida(false)}>✕</button>
            <img 
              src={infoSede.vistaExterior} 
              alt="Vista Exterior Expandida" 
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;