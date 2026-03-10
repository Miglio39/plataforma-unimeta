// import React from 'react';
// import 'aframe';

// const Viewer360 = ({ foto, setEscenaActual }) => {
//   return (
//     <div key={foto} style={{ width: '100%', height: '100%', position: 'relative' }}>
//       <a-scene 
//         embedded 
//         vr-mode-ui="enabled: false"
//         renderer="antialias: true; colorManagement: true;"
//         style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
//       >
//         <a-assets>
//           <img id="panorama" src={`/assets/panoramas/${foto}`} crossOrigin="anonymous" alt="360" />
//         </a-assets>

//         {/* 1. ELIMINAMOS LA ANIMACIÓN PARA QUE LA IMAGEN SE QUEDE QUIETA */}
//         <a-sky src="#panorama"></a-sky>

//         {/* ===================================================
//             📍 RECORRIDO DE RECTORÍA
//             =================================================== */}

//         {foto === 'rectoria.jpg' && (
//           /* Inclinamos la flecha a -45 grados para que te mire directamente */
//           <a-entity position="0 -1.5 -3" rotation="-45 0 0">
//             <a-triangle 
//               color="#38bdf8" 
//               vertex-a="0 0.5 0" vertex-b="-0.5 -0.5 0" vertex-c="0.5 -0.5 0"
//               className="clickable"
//               class="clickable" /* Forzamos a que A-Frame reconozca que es clickeable */
//               onClick={() => setEscenaActual('rectoria1a.jpg')}
//               animation="property: position; to: 0 0.2 0; dir: alternate; dur: 800; loop: true"
//             ></a-triangle>
//             <a-text value="Avanzar" align="center" position="0 -0.8 0" color="#ffffff" width="3"></a-text>
//           </a-entity>
//         )}

//         {foto === 'rectoria1a.jpg' && (
//           /* La flecha de regreso también la inclinamos (-45 grados) y rotamos hacia atrás (180) */
//           <a-entity position="0 -1.5 3" rotation="-45 180 0">
//             <a-triangle 
//               color="#ef4444" 
//               vertex-a="0 0.5 0" vertex-b="-0.5 -0.5 0" vertex-c="0.5 -0.5 0"
//               className="clickable"
//               class="clickable"
//               onClick={() => setEscenaActual('rectoria.jpg')}
//             ></a-triangle>
//             <a-text value="Atras" align="center" position="0 -0.8 0" color="#ffffff" width="3"></a-text>
//           </a-entity>
//         )}

//         {/* 2. LE PONEMOS EL LÁSER DIRECTAMENTE A LA CÁMARA */}
//         <a-entity camera look-controls="enabled: true; mouseEnabled: true" position="0 0 0">
//           <a-entity cursor="rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
//         </a-entity>
        
//       </a-scene>
//     </div>
//   );
// };

// export default Viewer360;