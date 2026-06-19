import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360';
import ChatBot from './components/ChatBot';
import { Sun, Volume2, Maximize, Play, Pause, MapPin, Info, Target, Compass, Trophy, Star, Home, Smartphone, ChevronUp, ChevronDown } from 'lucide-react';
import './styles/App.css';

const enlaceSanFernando = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7938.832908522663!2d-73.63390566206988!3d4.145896234876116!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de42f7bd1cd%3A0x52170e5bb949f588!2sCorporaci%C3%B3n%20Universitaria%20del%20Meta%20-%20UNIMETA!5e0!3m2!1ses!2sco!4v1780778060746!5m2!1ses!2sco";
const enlaceParqueMetropolitano = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7938.832908522663!2d-73.63390566206988!3d4.145896234876116!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de42f7bd1cd%3A0x52170e5bb949f588!2sCorporaci%C3%B3n%20Universitaria%20del%20Meta%20-%20UNIMETA!5e0!3m2!1ses!2sco!4v1780778060746!5m2!1ses!2sco"; 
const enlaceUnimetaTech = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7938.832908522663!2d-73.63390566206988!3d4.145896234876116!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de42f7bd1cd%3A0x52170e5bb949f588!2sCorporaci%C3%B3n%20Universitaria%20del%20Meta%20-%20UNIMETA!5e0!3m2!1ses!2sco!4v1780778060746!5m2!1ses!2sco"; 

const datosSedes = {
  // --- SEDE SAN FERNANDO ---
  'inicio.jpg': { nombre: 'Campus UNIMETA (Vista Dron)', categoria: 'General', descripcion: 'Vista aérea general del campus universitario y sus alrededores.', vistaExterior: '/assets/panoramas/inicio.jpg', mapaUrl: enlaceSanFernando },
  'paraninfo.jpg': { nombre: 'Paraninfo', categoria: 'Académico', descripcion: 'Espacio principal para eventos, grados y asambleas importantes.', vistaExterior: '/assets/panoramas/exterior-paraninfo.jpg', mapaUrl: enlaceSanFernando },
  'consultorio.jpg': { nombre: 'Consultorio Jurídico', categoria: 'Servicios', descripcion: 'Atención y asesoría legal gratuita a la comunidad por parte de la facultad de Derecho.', vistaExterior: '/assets/panoramas/exterior-consultorio.jpg', mapaUrl: enlaceSanFernando },
  'audiencias.jpg': { nombre: 'Sala de Audiencias', categoria: 'Académico', descripcion: 'Simulador de juzgados para las prácticas de los estudiantes de Derecho.', vistaExterior: '/assets/panoramas/exterior-audiencias.jpg', mapaUrl: enlaceSanFernando },
  
  // GIMNASIO (2 PISOS)
  'gimnasio.jpg': { nombre: 'Gimnasio - Piso 1', categoria: 'Bienestar', descripcion: 'Primer nivel del complejo deportivo. Zona de pesas, máquinas de fuerza y acondicionamiento físico.', vistaExterior: '/assets/panoramas/exterior-gimnasio.jpg', mapaUrl: enlaceSanFernando },
  'gimnasio-piso2.jpg': { nombre: 'Gimnasio - Piso 2', categoria: 'Bienestar', descripcion: 'Segundo nivel. Zona dedicada a ejercicios cardiovasculares, aeróbicos y clases grupales.', vistaExterior: '/assets/panoramas/exterior-gimnasio.jpg', mapaUrl: enlaceSanFernando },
  
  'biblioteca.jpg': { nombre: 'Biblioteca', categoria: 'Académico', descripcion: 'Espacio para el aprendizaje, investigación y consulta de recursos en alta resolución.', vistaExterior: '/assets/panoramas/exterior-biblioteca.jpg', mapaUrl: enlaceSanFernando },
  
  // 🔴 REEMPLAZO DEFINITIVO: SALA DE RADIO
  'sala-radio.jpg': { nombre: 'Sala de Radio', categoria: 'Comunicaciones', descripcion: 'Estudio de radiodifusión equipado con tecnología profesional para prácticas de comunicación y periodismo.', vistaExterior: '/assets/panoramas/exterior-radio.jpg', mapaUrl: enlaceSanFernando },
  
  // AUDITORIOS DISTRIBUIDOS
  'auditorio-mayor.jpg': { nombre: 'Auditorio Principal (Aula Magna)', categoria: 'Auditorios', descripcion: 'Espacio de gran capacidad destinado a ceremonias solemnes, conferencias magistrales y actos culturales centrales.', vistaExterior: '/assets/panoramas/exterior-auditorio-mayor.jpg', mapaUrl: enlaceSanFernando },
  'auditorio-bloquea.jpg': { nombre: 'Auditorio Bloque A', categoria: 'Auditorios', descripcion: 'Auditorio alterno equipado con sistemas de proyección acústica para ponencias y eventos de facultades.', vistaExterior: '/assets/panoramas/exterior-auditorio-a.jpg', mapaUrl: enlaceSanFernando },
  'auditorio-juridico.jpg': { nombre: 'Auditorio de Ciencias Jurídicas', categoria: 'Auditorios', descripcion: 'Sala especializada de conferencias and debates adscrita a la facultad de Derecho y Ciencias Sociales.', vistaExterior: '/assets/panoramas/exterior-auditorio-juridico.jpg', mapaUrl: enlaceSanFernando },

  // --- LABORATORIOS ---
  'lab-fisica.jpg': { nombre: 'Laboratorio de Física', categoria: 'Laboratorios', descripcion: 'Espacio equipado para prácticas de física experimental.', vistaExterior: '/assets/panoramas/thumb-fisica.jpg', mapaUrl: enlaceSanFernando },
  'lab-redes.jpg': { nombre: 'Laboratorio de Redes', categoria: 'Laboratorios', descripcion: 'Infraestructura y equipos para conectividad y redes CISCO.', vistaExterior: '/assets/panoramas/thumb-redes.jpg', mapaUrl: enlaceSanFernando },
  'lab-software.jpg': { nombre: 'Laboratorio de Software', categoria: 'Laboratorios', descripcion: 'Salas de cómputo especializadas para desarrollo y programación.', vistaExterior: '/assets/panoramas/thumb-software.jpg', mapaUrl: enlaceSanFernando },
  'lab-suelos.jpg': { nombre: 'Laboratorio de Suelos', categoria: 'Laboratorios', descripcion: 'Análisis de materiales y mecánica de suelos para Ingeniería Civil.', vistaExterior: '/assets/panoramas/thumb-suelos.jpg', mapaUrl: enlaceSanFernando },
  'lab-hidraulica.jpg': { nombre: 'Laboratorio de Hidráulica', categoria: 'Laboratorios', descripcion: 'Estudio de fluidos y canales para proyectos de ingeniería.', vistaExterior: '/assets/panoramas/thumb-hidraulica.jpg', mapaUrl: enlaceSanFernando },
  'lab-materiales.jpg': { nombre: 'Laboratorio de Materiales', categoria: 'Laboratorios', descripcion: 'Pruebas de resistencia y calidad de materiales de construcción.', vistaExterior: '/assets/panoramas/thumb-materiales.jpg', mapaUrl: enlaceSanFernando },
  'lab-electronica.jpg': { nombre: 'Laboratorio de Electrónica', categoria: 'Laboratorios', descripcion: 'Equipos y componentes para el diseño de circuitos y sistemas.', vistaExterior: '/assets/panoramas/thumb-electronica.jpg', mapaUrl: enlaceSanFernando },
  'lab-telematica.jpg': { nombre: 'Laboratorio de Telemática', categoria: 'Laboratorios', descripcion: 'Integración de telecomunicaciones y sistemas informáticos.', vistaExterior: '/assets/panoramas/thumb-telematica.jpg', mapaUrl: enlaceSanFernando },
  'lab-arquitectura.jpg': { nombre: 'Taller de Arquitectura', categoria: 'Laboratorios', descripcion: 'Espacio creativo para el diseño, maquetación y urbanismo.', vistaExterior: '/assets/panoramas/thumb-arquitectura.jpg', mapaUrl: enlaceSanFernando },
  'lab-topografia.jpg': { nombre: 'Laboratorio de Topografía', categoria: 'Laboratorios', descripcion: 'Equipos de medición, teodolitos y estaciones totales.', vistaExterior: '/assets/panoramas/thumb-topografia.jpg', mapaUrl: enlaceSanFernando },
  'lab-pavimentos.jpg': { nombre: 'Laboratorio de Pavimentos', categoria: 'Laboratorios', descripcion: 'Análisis y diseño de mezclas asfálticas y estructuras viales.', vistaExterior: '/assets/panoramas/thumb-pavimentos.jpg', mapaUrl: enlaceSanFernando },
  'lab-idiomas.jpg': { nombre: 'Laboratorio de Idiomas', categoria: 'Laboratorios', descripcion: 'Prácticas de listening y speaking con software especializado.', vistaExterior: '/assets/panoramas/thumb-idiomas.jpg', mapaUrl: enlaceSanFernando },
  'lab-sistemas.jpg': { nombre: 'Centro de Cómputo', archivo: 'lab-sistemas.jpg' },
  'lab-quimica.jpg': { nombre: 'Laboratorio de Química', categoria: 'Laboratorios', descripcion: 'Espacio para prácticas y reacciones químicas controladas.', vistaExterior: '/assets/panoramas/thumb-quimica.jpg', mapaUrl: enlaceSanFernando },
  'lab-biologia.jpg': { nombre: 'Laboratorio de Biología', categoria: 'Laboratorios', descripcion: 'Microscopía y estudio de ecosistemas y microorganismos.', vistaExterior: '/assets/panoramas/thumb-biologia.jpg', mapaUrl: enlaceSanFernando },

  // --- SEDES EXTERNAS ---
  'parque.jpg': { nombre: 'Parque Metropolitano', categoria: 'Zonas Externas', descripcion: 'Amplias zonas verdes para el esparcimiento y bienestar universitario.', vistaExterior: '/assets/panoramas/exterior-parque.jpg', mapaUrl: enlaceSanFernando },
  'unimeta-tech.jpg': { nombre: 'Unimeta Tech', categoria: 'Tecnología', descripcion: 'Centro de innovación tecnológica con laboratorios de sistemas e ingeniería.', vistaExterior: '/assets/panoramas/exterior-unimeta-tech.jpg', mapaUrl: enlaceUnimetaTech }
};

function App() {
  const [escenaActual, setEscenaActual] = useState('inicio.jpg');
  const [visorExpandido, setVisorExpandido] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [lugaresVisitados, setLugaresVisitados] = useState(['inicio.jpg']);
  const [mostrarPanelInferior, setMostrarPanelInferior] = useState(false);

  useEffect(() => {
    if (datosSedes[escenaActual] && !lugaresVisitados.includes(escenaActual)) {
      setLugaresVisitados(prev => [...prev, escenaActual]);
    }
  }, [escenaActual, lugaresVisitados]);

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

  const infoSede = datosSedes[escenaActual] || { nombre: 'Campus San Fernando', categoria: 'General', descripcion: 'Campus principal.', vistaExterior: '/assets/panoramas/mapa-unimeta.png', mapaUrl: enlaceSanFernando };

  const totalLugares = Object.keys(datosSedes).length; 
  const visitadosReales = Math.min(lugaresVisitados.length, totalLugares);
  const porcentajeExplorado = Math.min(100, Math.round((visitadosReales / totalLugares) * 100));
  const distanciaKm = (visitadosReales * 0.4).toFixed(1);
  const tiempoMin = visitadosReales * 8; 

  const todosLosLogros = [
    { id: '1', titulo: 'Primeros Pasos', desc: 'Iniciaste tu recorrido', meta: 1, xp: 50, icono: <Compass size={16} color="#3b82f6"/>, bg: 'rgba(59, 130, 246, 0.15)' },
    { id: '2', titulo: 'Conoce tu universidad', desc: 'Visita 5 lugares del campus', meta: 5, xp: 150, icono: <Star size={16} color="#eab308"/>, bg: 'rgba(234, 179, 8, 0.15)' },
    { id: '3', titulo: 'Explorador Avanzado', desc: 'Visita 10 lugares del campus', meta: 10, xp: 300, icono: <MapPin size={16} color="#10b981"/>, bg: 'rgba(16, 185, 129, 0.15)' },
    { id: '4', titulo: 'Guía Maestro', desc: `Visita los ${totalLugares} lugares`, meta: totalLugares, xp: 500, icono: <Trophy size={16} color="#a855f7"/>, bg: 'rgba(168, 85, 247, 0.15)' }
  ];

  const proximoLogro = todosLosLogros.find(l => visitadosReales < l.meta) || todosLosLogros[todosLosLogros.length - 1];
  const progresoProximoLogro = Math.min(100, Math.round((visitadosReales / proximoLogro.meta) * 100));

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
                <button className="icon-btn hide-mobile"><Sun size={18} /> Día</button>
                <button className="icon-btn hide-mobile"><Volume2 size={18} /></button>
                <button className="icon-btn hide-mobile" onClick={togglePantallaCompleta}><Maximize size={18} /></button>
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
                    {/* ⚡ OPTIMIZACIÓN: Carga diferida en iframe */}
                    <iframe loading="lazy" width="100%" height="100%" frameBorder="0" scrolling="no" src={infoSede.mapaUrl} title="Mapa"></iframe>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header"><h3><Info size={16} /> Información del lugar</h3></div>
                  <div className="card-content-flex">
                    {/* ⚡ OPTIMIZACIÓN: Carga diferida en imagen descriptiva */}
                    <img loading="lazy" src={infoSede.vistaExterior} alt="Exterior" className="thumb-info" onError={(e) => e.target.src = '/assets/panoramas/mapa-unimeta.png'} />
                    <div className="text-info">
                      <h4>{infoSede.nombre}</h4>
                      <span className="tag">{infoSede.categoria}</span>
                      <p>{infoSede.descripcion}</p>
                      <span className="horario-text">◷ 7:00 a.m. - 9:00 p.m.</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header"><h3><Target size={16} /> Tu progreso</h3></div>
                  <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div className="stat-circle" style={{ width: '55px', height: '55px', borderWidth: '4px' }}>
                        <div className="circle-inner"><span className="percent" style={{ fontSize: '0.85rem' }}>{porcentajeExplorado}%</span><span className="label" style={{ fontSize: '0.4rem' }}>Explorado</span></div>
                      </div>
                      <ul className="stats-list" style={{ listStyle: 'none', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0, padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Home size={12}/> Lugares: {visitadosReales} / {totalLugares}</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12}/> Recorrido: {distanciaKm} km</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>⏱️ Tiempo: {tiempoMin} min</li>
                      </ul>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                       <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', margin: 0 }}>Logro próximo</p>
                       <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <div style={{ background: proximoLogro.bg, padding: '6px', borderRadius: '50%', display: 'flex' }}>{proximoLogro.icono}</div>
                          <div style={{ flex: 1 }}>
                             <h5 style={{ fontSize: '0.7rem', color: 'white', margin: '0 0 2px 0' }}>{proximoLogro.titulo}</h5>
                             <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', margin: 0 }}>{proximoLogro.desc}</p>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <div className="progress-bar-bg" style={{ flex: 1, height: '4px', background: '#1e293b', borderRadius: '2px' }}><div className="progress-bar-fill" style={{ width: `${progresoProximoLogro}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: '2px', transition: 'width 0.5s' }}></div></div>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{visitadosReales} / {proximoLogro.meta}</span>
                                <span style={{ fontSize: '0.5rem', color: '#3b82f6', fontWeight: 'bold' }}>+{proximoLogro.xp} XP</span>
                             </div>
                          </div>
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