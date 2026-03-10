// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Viewer360 from './components/Viewer360';
// import ChatBot from './components/ChatBot'; 
// import './styles/App.css'; 

// function App() {
//   const [escenaActual, setEscenaActual] = useState('biblioteca.jpg');
//   const [mensajeIA, setMensajeIA] = useState("¡Hola! Explora el campus o pregúntame algo.");
  
//   // 1. Estado para controlar si el mapa interactivo está abierto o cerrado
//   const [mostrarMapa, setMostrarMapa] = useState(false);

//   // 2. Función para teletransportarse y actualizar el mensaje de la IA
//   const viajarA = (archivo, mensaje) => {
//     setEscenaActual(archivo);
//     setMensajeIA(mensaje);
//     setMostrarMapa(false); // Cierra el mapa automáticamente al viajar
//   };

//   return (
//     <div className="app-container">
      
//       {/* 1. SIDEBAR ELEGANTE */}
//       <Sidebar 
//         setEscenaActual={setEscenaActual} 
//         escenaActual={escenaActual} 
//       />
      
//       {/* 2. CONTENIDO PRINCIPAL (GLASS PANEL) */}
//       <main className="main-content">
        
//         {/* Cabecera Limpia */}
//         <header className="top-header">
//           <h1>Virtual <span>Guide</span></h1>
//           <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>Universidad del Meta</div>
//         </header>

//         {/* GRID DASHBOARD */}
//         <div className="dashboard-grid">
          
//           {/* A. TARJETA IZQUIERDA: Mapa/Edificio */}
//           <div className="card-preview">
//             <img 
//               src="/assets/panoramas/mapa-unimeta.png" 
//               alt="Vista General" 
//             />
//           </div>

//           {/* B. TARJETA DERECHA: Visor 360 (Rectangular y Grande) */}
//           <div className="card-viewer">
//             <div className="badge-360">Vista 360° en Tiempo Real</div>
//             <Viewer360 foto={escenaActual} />
//           </div>

//           {/* C. DOCK DE CONTROL (Abajo) */}
//           <div className="control-dock">
//             {/* Botón actualizado para abrir el mapa interactivo */}
//             <button className="dock-btn" onClick={() => setMostrarMapa(true)}>
//               <span className="icon">🗺️</span> Mapa
//             </button>
//             <button className="dock-btn" onClick={() => setMensajeIA("Estoy aquí para ayudarte.")}>
//               <span className="icon">🤖</span> Asistente IA
//             </button>
//             <button className="dock-btn">
//               <span className="icon">📅</span> Eventos
//             </button>
//           </div>

//         </div>

//         {/* --- 3. MÓDULO: MAPA INTERACTIVO FLOTANTE --- */}
//         {mostrarMapa && (
//           // onClick aquí permite cerrar el mapa haciendo clic en el fondo oscuro
//           <div className="map-overlay" onClick={() => setMostrarMapa(false)}>
            
//             {/* stopPropagation evita que al hacer clic dentro del mapa se cierre */}
//             <div className="map-content-glass" onClick={(e) => e.stopPropagation()}>
//               <button className="close-map" onClick={() => setMostrarMapa(false)}>✕</button>
              
//               <h2 className="map-title">Mapa General del Campus</h2>
              
//               <div className="map-image-container">
//                 <img src="/assets/panoramas/mapa-unimeta.mp4" alt="Mapa General" className="map-image" />
                
//                 {/* PUNTO 1: Biblioteca */}
//                 <div 
//                   className="map-pin" 
//                   style={{ top: '45%', left: '35%' }} 
//                   onClick={() => viajarA('biblioteca.jpg', 'Has viajado a la Biblioteca Juan N. Mojica.')}
//                 >
//                   <span className="pin-tooltip">Biblioteca</span>
//                   <div className="pin-pulse"></div>
//                 </div>

//                 {/* PUNTO 2: Paraninfo */}
//                 <div 
//                   className="map-pin" 
//                   style={{ top: '60%', left: '65%' }} 
//                   onClick={() => viajarA('paraninfo.jpg', 'Bienvenido al Paraninfo.')}
//                 >
//                   <span className="pin-tooltip">Paraninfo</span>
//                   <div className="pin-pulse"></div>
//                 </div>

//                 {/* PUNTO 3: UNIMETA TECH */}
//                 <div 
//                   className="map-pin" 
//                   style={{ top: '30%', left: '50%' }} 
//                   onClick={() => viajarA('tech.jpg', 'Llegaste a UNIMETA TECH.')}
//                 >
//                   <span className="pin-tooltip">Unimeta Tech</span>
//                   <div className="pin-pulse"></div>
//                 </div>

//               </div>
              
//               <p className="map-instruction">Selecciona un punto brillante para teletransportarte ⚡</p>
//             </div>
//           </div>
//         )}

//         {/* --- 4. CHATBOT INTERACTIVO (El Cerebro) --- */}
//         <ChatBot mensaje={mensajeIA} />

//       </main>
//     </div>
//   );
// }

// export default App;
