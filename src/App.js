import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360';
import ChatBot from './components/ChatBot';
import { Maximize, Play, Pause, MapPin, Info, Home, Smartphone, ChevronUp, ChevronDown, BookOpen, Clock, Mail } from 'lucide-react';
import './styles/App.css';

// 🔴 ENLACES DE GOOGLE MAPS ACTUALIZADOS
const enlaceSanFernando = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.367339612912!2d-73.63896692552844!3d4.147958846202362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de42f7bd1cd%3A0x52170e5bb949f588!2sCorporaci%C3%B3n%20Universitaria%20del%20Meta%20-%20UNIMETA!5e0!3m2!1ses!2sco!4v1781974017322!5m2!1ses!2sco";
const enlaceUnimetaTech = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.3461124519717!2d-73.64079222552834!3d4.152171046169625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2def726e32d3%3A0x7a45b029dac597ae!2sUnimeta%20Tech!5e0!3m2!1ses!2sco!4v1781974073904!5m2!1ses!2sco"; 
const enlaceParqueMetropolitano = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6462745943977!2d-73.50554872552839!3d4.09220644663312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2851af69336d%3A0x5bfb2a3e1e269c6c!2sPARQUE%20METROPOLITANO%20MARIA%20LUCIA!5e0!3m2!1ses!2sco!4v1781974095481!5m2!1ses!2sco"; 

const datosSedes = {
  // --- SEDE SAN FERNANDO ---
  'inicio.jpg': { nombre: 'Campus UNIMETA (Vista Dron)', categoria: 'General', descripcion: 'Vista aérea general del campus universitario y sus alrededores.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'paraninfo.jpg': { nombre: 'Paraninfo', categoria: 'Académico', descripcion: 'Espacio principal para eventos, grados y asambleas importantes.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'consultorio.jpg': { nombre: 'Consultorio Jurídico', categoria: 'Servicios', descripcion: 'Atención y asesoría legal gratuita a la comunidad por parte de la facultad de Derecho.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'audiencias.jpg': { nombre: 'Sala de Audiencias', categoria: 'Académico', descripcion: 'Simulador de juzgados para las prácticas de los estudiantes de Derecho.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'gimnasio.jpg': { nombre: 'Gimnasio - Piso 1', categoria: 'Bienestar', descripcion: 'Primer nivel del complejo deportivo. Zona de pesas, máquinas de fuerza y acondicionamiento físico.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'gimnasio-piso2.jpg': { nombre: 'Gimnasio - Piso 2', categoria: 'Bienestar', descripcion: 'Segundo nivel. Zona dedicada a ejercicios cardiovasculares, aeróbicos y clases grupales.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'biblioteca.jpg': { nombre: 'Biblioteca', categoria: 'Académico', descripcion: 'Espacio para el aprendizaje, investigación y consulta de recursos en alta resolución.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'sala-radio.jpg': { nombre: 'Sala de Radio', categoria: 'Comunicaciones', descripcion: 'Estudio de radiodifusión equipado con tecnología profesional para prácticas de comunicación y periodismo.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'auditorio-mayor.jpg': { nombre: 'Auditorio Principal (Aula Magna)', categoria: 'Auditorios', descripcion: 'Espacio de gran capacidad destinado a ceremonias solemnes, conferencias magistrales y actos culturales centrales.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'auditorio-bloquea.jpg': { nombre: 'Auditorio Bloque A', categoria: 'Auditorios', descripcion: 'Auditorio alterno equipado con sistemas de proyección acústica para ponencias y eventos de facultades.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'auditorio-juridico.jpg': { nombre: 'Auditorio de Ciencias Jurídicas', categoria: 'Auditorios', descripcion: 'Sala especializada de conferencias and debates adscrita a la facultad de Derecho y Ciencias Sociales.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  
  // --- LABORATORIOS (Ubicados dentro del Campus San Fernando) ---
  'lab-fisica.jpg': { nombre: 'Laboratorio de Física', categoria: 'Laboratorios', descripcion: 'Espacio equipado para prácticas de física experimental.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-redes.jpg': { nombre: 'Laboratorio de Redes', categoria: 'Laboratorios', descripcion: 'Infraestructura y equipos para conectividad y redes CISCO.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-software.jpg': { nombre: 'Laboratorio de Software', categoria: 'Laboratorios', descripcion: 'Salas de cómputo especializadas para desarrollo y programación.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-suelos.jpg': { nombre: 'Laboratorio de Suelos', categoria: 'Laboratorios', descripcion: 'Análisis de materiales y mecánica de suelos para Ingeniería Civil.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-hidraulica.jpg': { nombre: 'Laboratorio de Hidráulica', categoria: 'Laboratorios', descripcion: 'Estudio de fluidos y canales para proyectos de ingeniería.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-materiales.jpg': { nombre: 'Laboratorio de Materiales', categoria: 'Laboratorios', descripcion: 'Pruebas de resistencia y calidad de materiales de construcción.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-electronica.jpg': { nombre: 'Laboratorio de Electrónica', categoria: 'Laboratorios', descripcion: 'Equipos y componentes para el diseño de circuitos y sistemas.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-telematica.jpg': { nombre: 'Laboratorio de Telemática', categoria: 'Laboratorios', descripcion: 'Integración de telecomunicaciones y sistemas informáticos.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-arquitectura.jpg': { nombre: 'Taller de Arquitectura', categoria: 'Laboratorios', descripcion: 'Espacio creativo para el diseño, maquetación y urbanismo.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-topografia.jpg': { nombre: 'Laboratorio de Topografía', categoria: 'Laboratorios', descripcion: 'Equipos de medición, teodolitos y estaciones totales.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-pavimentos.jpg': { nombre: 'Laboratorio de Pavimentos', categoria: 'Laboratorios', descripcion: 'Análisis y diseño de mezclas asfálticas y estructuras viales.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-idiomas.jpg': { nombre: 'Laboratorio de Idiomas', categoria: 'Laboratorios', descripcion: 'Prácticas de listening y speaking con software especializado.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-sistemas.jpg': { nombre: 'Centro de Cómputo', categoria: 'Laboratorios', descripcion: 'Salas informáticas de acceso general para estudiantes.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-quimica.jpg': { nombre: 'Laboratorio de Química', categoria: 'Laboratorios', descripcion: 'Espacio para prácticas y reacciones químicas controladas.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },
  'lab-biologia.jpg': { nombre: 'Laboratorio de Biología', categoria: 'Laboratorios', descripcion: 'Microscopía y estudio de ecosistemas y microorganismos.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando },

  // --- SEDES EXTERNAS ---
  'parque.jpg': { nombre: 'Parque Metropolitano', categoria: 'Zonas Externas', descripcion: 'Amplias zonas verdes para el esparcimiento y bienestar universitario.', vistaExterior: '/assets/panoramas/exterior-parque.jpg', mapaUrl: enlaceParqueMetropolitano },
  'unimeta-tech.jpg': { nombre: 'Unimeta Tech', categoria: 'Tecnología', descripcion: 'Centro de innovación tecnológica con laboratorios de sistemas e ingeniería.', vistaExterior: '/assets/panoramas/exterior-unimeta-tech.jpg', mapaUrl: enlaceUnimetaTech }
};

const obtenerDirectorio = (escena) => {
  const directorio = {
    'paraninfo.jpg': { horario: '8:00 a.m. - 6:00 p.m.', email: 'eventos@unimeta.edu.co' },
    'consultorio.jpg': { horario: '8:00 a.m. - 12:00 p.m. / 2:00 p.m. - 5:00 p.m.', email: 'consultorio@unimeta.edu.co' },
    'audiencias.jpg': { horario: '8:00 a.m. - 5:00 p.m.', email: 'derecho@unimeta.edu.co' },
    'biblioteca.jpg': { horario: '7:00 a.m. - 9:00 p.m. (L-V)', email: 'biblioteca@unimeta.edu.co' },
    'gimnasio.jpg': { horario: '6:00 a.m. - 9:00 p.m.', email: 'bienestar@unimeta.edu.co' },
    'gimnasio-piso2.jpg': { horario: '6:00 a.m. - 9:00 p.m.', email: 'bienestar@unimeta.edu.co' },
    'sala-radio.jpg': { horario: '8:00 a.m. - 6:00 p.m.', email: 'radio@unimeta.edu.co' },
  };

  if (directorio[escena]) return directorio[escena];
  
  if (escena.includes('lab-') || escena.includes('tech')) {
     return { horario: '7:00 a.m. - 8:00 p.m.', email: 'laboratorios@unimeta.edu.co' };
  }
  if (escena.includes('auditorio')) {
     return { horario: '8:00 a.m. - 6:00 p.m.', email: 'auditorios@unimeta.edu.co' };
  }
  
  return { horario: '8:00 a.m. - 6:00 p.m.', email: 'info@unimeta.edu.co' };
};

function App() {
  const [escenaActual, setEscenaActual] = useState('inicio.jpg');
  const [visorExpandido, setVisorExpandido] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [mostrarPanelInferior, setMostrarPanelInferior] = useState(false);

  const ordenRecorrido = Object.keys(datosSedes);
  
  useEffect(() => {
    let intervalo;
    if (autoPlay) {
      intervalo = setInterval(() => {
        setEscenaActual((actual) => {
          const indiceActual = ordenRecorrido.indexOf(actual);
          return ordenRecorrido[(indiceActual + 1) % ordenRecorrido.length];
        });
      }, 12000);
    }
    return () => clearInterval(intervalo);
  }, [autoPlay, ordenRecorrido]);

  useEffect(() => {
    const alCambiarPantallaCompleta = () => {
      if (!document.fullscreenElement) setVisorExpandido(false);
    };
    document.addEventListener('fullscreenchange', alCambiarPantallaCompleta);
    return () => document.removeEventListener('fullscreenchange', alCambiarPantallaCompleta);
  }, []);

  const togglePantallaCompleta = () => {
    const elementoVisor = document.querySelector('.columna-principal');
    if (!document.fullscreenElement) {
      if (elementoVisor.requestFullscreen) elementoVisor.requestFullscreen();
      setVisorExpandido(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setVisorExpandido(false);
    }
  };

  const infoSede = datosSedes[escenaActual] || { nombre: 'Campus San Fernando', categoria: 'General', descripcion: 'Campus principal.', vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: enlaceSanFernando };
  const dirInfo = obtenerDirectorio(escenaActual);

  return (
    <>
      <div className="rotate-device-overlay">
        <Smartphone className="rotate-phone-icon" size={80} strokeWidth={1.5} />
        <h2>Gira tu dispositivo</h2>
        <p>Para disfrutar de la experiencia inmersiva 360° de UNIMETA, por favor coloca tu teléfono en posición horizontal.</p>
      </div>

      <div className="app-container">
        <div className="dashboard-grid-nuevo">
          
          <Sidebar setEscenaActual={setEscenaActual} escenaActual={escenaActual} />
          
          <main className="main-content-wrapper">
            <header className="top-bar">
              <div className="location-info">
                <h1>{infoSede.nombre}</h1>
                <p className="hide-mobile"><MapPin size={14} /> San Fernando, Meta</p>
              </div>
              
              <div className="top-actions">
                <button className="icon-btn hide-mobile" onClick={togglePantallaCompleta} title="Pantalla Completa">
                  <Maximize size={18} />
                </button>
                <button className="btn-tour" onClick={() => setAutoPlay(!autoPlay)} style={{ backgroundColor: autoPlay ? '#ef4444' : '#6366f1' }}>
                  {autoPlay ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />} 
                  <span className="hide-mobile">{autoPlay ? 'Detener recorrido' : 'Recorrido automático'}</span>
                </button>
              </div>
            </header>

            <section className="columna-principal">
              <Viewer360 foto={escenaActual} setEscenaActual={setEscenaActual} />
              <ChatBot setEscenaActual={setEscenaActual} />
            </section>

            <div className={`bottom-panel-wrapper ${mostrarPanelInferior ? 'open' : ''}`}>
              <button className="toggle-bottom-btn" onClick={() => setMostrarPanelInferior(!mostrarPanelInferior)}>
                 {mostrarPanelInferior ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
              
              <section className="bottom-cards-grid" style={{ display: visorExpandido ? 'none' : 'grid' }}>
                <div className="info-card">
                  <div className="card-header"><h3><MapPin size={16} /> Mapa del campus</h3></div>
                  <div className="mapa-contenedor">
                    <iframe loading="lazy" width="100%" height="100%" frameBorder="0" scrolling="no" src={infoSede.mapaUrl} title="Mapa"></iframe>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header"><h3><Info size={16} /> Información del lugar</h3></div>
                  <div className="card-content-flex">
                    <img loading="lazy" src={infoSede.vistaExterior} alt="Exterior" className="thumb-info" onError={(e) => e.target.src = '/assets/panoramas/exterior-rectoria.jpg'} />
                    <div className="text-info">
                      <h4>{infoSede.nombre}</h4>
                      <span className="tag">{infoSede.categoria}</span>
                      <p>{infoSede.descripcion}</p>
                      <span className="horario-text">◷ Abierto al público</span>
                    </div>
                  </div>
                </div>

                {/* 🔴 MÓDULO ULTRA OPTIMIZADO: Solo Horario y Correo alineados horizontalmente, sin scroll */}
                <div className="info-card">
                  <div className="card-header"><h3><BookOpen size={15} /> Directorio de Contacto</h3></div>
                  <div style={{ 
                    padding: '12px 14px', 
                    display: 'grid', 
                    gridTemplateColumns: '1fr', /* Una sola columna vertical para dar ancho máximo a los textos */
                    gap: '16px', /* Mayor separación para que se vea ordenado y respire */
                    flex: 1, 
                    justifyContent: 'center',
                    overflow: 'hidden' 
                  }}>
                    
                    {/* Item 1: Horario */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                       <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '8px', borderRadius: '50%', flexShrink: 0 }}><Clock size={15} color="#10b981"/></div>
                       <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Horario de Atención</p>
                          <p style={{ fontSize: '0.78rem', color: 'white', margin: '2px 0 0 0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={dirInfo.horario}>{dirInfo.horario}</p>
                       </div>
                    </div>

                    {/* Item 2: Correo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                       <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '8px', borderRadius: '50%', flexShrink: 0 }}><Mail size={15} color="#f59e0b"/></div>
                       <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Correo Electrónico</p>
                          <p style={{ fontSize: '0.78rem', color: 'white', margin: '2px 0 0 0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={dirInfo.email}>{dirInfo.email}</p>
                       </div>
                    </div>

                  </div>
                </div>
              </section>
            </div>
          </main> 
        </div>
      </div>
    </>
  );
}

export default App;