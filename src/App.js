import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360';
import ChatBot from './components/ChatBot'; 
import { Sun, Volume2, Maximize, Play, Pause, MapPin, Info, Target, Compass, Trophy, Star, Home } from 'lucide-react';
import './styles/App.css';


const mapaUnimetaReal = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6015521943896!2d-73.63004462413532!3d4.140889046252994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2dd3971e44a5%3A0x6b4fb6c17b5f25a7!2sUniversidad%20del%20Meta!5e0!3m2!1ses!2sco!4v1715000000000!5m2!1ses!2sco";

// 🔴 LOS 11 LUGARES EXACTOS DEL PROYECTO
const datosSedes = {
  'inicio.jpg': {
    nombre: 'Campus UNIMETA (Vista Dron)', categoria: 'General', descripcion: 'Vista aérea general del campus universitario y sus alrededores.',
    vistaExterior: '/assets/panoramas/inicio.jpg', mapaUrl: mapaUnimetaReal
  },
  'paraninfo.jpg': {
    nombre: 'Paraninfo', categoria: 'Académico', descripcion: 'Espacio principal para eventos, grados y asambleas importantes.',
    vistaExterior: '/assets/panoramas/exterior-paraninfo.jpg', mapaUrl: mapaUnimetaReal
  },
  'consultorio.jpg': {
    nombre: 'Consultorio Jurídico', categoria: 'Servicios', descripcion: 'Atención y asesoría legal gratuita a la comunidad por parte de la facultad de Derecho.',
    vistaExterior: '/assets/panoramas/exterior-consultorio.jpg', mapaUrl: mapaUnimetaReal
  },
  'audiencias.jpg': {
    nombre: 'Sala de Audiencias', categoria: 'Académico', descripcion: 'Simulador de juzgados para las prácticas de los estudiantes de Derecho.',
    vistaExterior: '/assets/panoramas/exterior-audiencias.jpg', mapaUrl: mapaUnimetaReal
  },
  'rectoria.jpg': {
    nombre: 'Rectoría UNIMETA', categoria: 'Administrativo', descripcion: 'Sede administrativa principal de la Corporación Universitaria del Meta.',
    vistaExterior: '/assets/panoramas/exterior-rectoria.jpg', mapaUrl: mapaUnimetaReal
  },
  'biblioteca.jpg': {
    nombre: 'Biblioteca', categoria: 'Académico', descripcion: 'Espacio para el aprendizaje, investigación y consulta de recursos en alta resolución.',
    vistaExterior: '/assets/panoramas/exterior-biblioteca.jpg', mapaUrl: mapaUnimetaReal
  },
  'tech-laboratorio.jpg': {
    nombre: 'Laboratorios Edificio Hernán Villamarín', categoria: 'Académico', descripcion: 'Laboratorios equipados para prácticas y experimentación científica.',
    vistaExterior: '/assets/panoramas/exterior-laboratorios.jpg', mapaUrl: mapaUnimetaReal
  },
  'auditorios.jpg': {
    nombre: 'Auditorios y conferencias', categoria: 'Académico', descripcion: 'Salas equipadas para charlas, exposiciones y cátedras.',
    vistaExterior: '/assets/panoramas/exterior-auditorios.jpg', mapaUrl: mapaUnimetaReal
  },
  'decanaturas.jpg': {
    nombre: 'Decanaturas', categoria: 'Administrativo', descripcion: 'Oficinas de atención y gestión de las diferentes facultades.',
    vistaExterior: '/assets/panoramas/exterior-decanaturas.jpg', mapaUrl: mapaUnimetaReal
  },
  'parque.jpg': {
    nombre: 'Parque Metropolitano', categoria: 'Zonas Externas', descripcion: 'Amplias zonas verdes para el esparcimiento y bienestar universitario.',
    vistaExterior: '/assets/panoramas/exterior-parque.jpg', mapaUrl: mapaUnimetaReal
  },
  'unimeta-tech.jpg': {
    nombre: 'Unimeta Tech', categoria: 'Tecnología', descripcion: 'Centro de innovación tecnológica con laboratorios de sistemas e ingeniería.',
    vistaExterior: '/assets/panoramas/exterior-unimeta-tech.jpg', mapaUrl: mapaUnimetaReal
  }
};

function App() {
  const [escenaActual, setEscenaActual] = useState('inicio.jpg');
  const [visorExpandido, setVisorExpandido] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  
  const [lugaresVisitados, setLugaresVisitados] = useState(['inicio.jpg']);

  useEffect(() => {
    // Evitamos registrar sub-escenas que no están en el diccionario (ej. rectoria1a.jpg) para no dañar el conteo
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
          const siguienteIndice = (indiceActual + 1) % ordenRecorrido.length;
          return ordenRecorrido[siguienteIndice];
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

  const infoSede = datosSedes[escenaActual] || {
    nombre: 'Campus San Fernando', categoria: 'General', descripcion: 'Campus principal de la universidad.',
    vistaExterior: '/assets/panoramas/mapa-unimeta.png', mapaUrl: 'https://maps.google.com/maps?q=4.1442,-73.6251+(Campus%20San%20Fernando)&hl=es&z=18&output=embed'
  };

  // ==========================================
  // 🎮 MOTOR DE GAMIFICACIÓN (Matemáticas Seguras)
  // ==========================================
  const totalLugares = 11; // Los 11 lugares oficiales
  const visitadosReales = Math.min(lugaresVisitados.length, totalLugares); // Nunca pasará de 11
  const porcentajeExplorado = Math.min(100, Math.round((visitadosReales / totalLugares) * 100)); // Nunca pasará de 100%
  
  const xpTotal = visitadosReales * 150; 
  const nivelActual = Math.floor(xpTotal / 1000) + 1; 
  const xpParaSiguienteNivel = nivelActual * 1000;
  const porcentajeNivel = Math.round((xpTotal % 1000) / 1000 * 100);

  const distanciaKm = (visitadosReales * 0.4).toFixed(1); 
  const tiempoMin = visitadosReales * 8; 

  const todosLosLogros = [
    { id: '1', titulo: 'Primeros Pasos', desc: 'Iniciaste tu recorrido', meta: 1, xp: 50, icono: <Compass size={16} color="#3b82f6"/>, bg: 'rgba(59, 130, 246, 0.15)' },
    { id: '2', titulo: 'Conoce tu universidad', desc: 'Visita 5 lugares del campus', meta: 5, xp: 150, icono: <Star size={16} color="#eab308"/>, bg: 'rgba(234, 179, 8, 0.15)' },
    { id: '3', titulo: 'Explorador Avanzado', desc: 'Visita 8 lugares del campus', meta: 8, xp: 300, icono: <MapPin size={16} color="#10b981"/>, bg: 'rgba(16, 185, 129, 0.15)' },
    { id: '4', titulo: 'Guía Maestro', desc: 'Visita los 11 lugares', meta: totalLugares, xp: 500, icono: <Trophy size={16} color="#a855f7"/>, bg: 'rgba(168, 85, 247, 0.15)' }
  ];

  const logrosDesbloqueados = todosLosLogros.filter(l => visitadosReales >= l.meta);
  const ultimoLogro = logrosDesbloqueados[logrosDesbloqueados.length - 1] || todosLosLogros[0];
  const proximoLogro = todosLosLogros.find(l => visitadosReales < l.meta) || todosLosLogros[todosLosLogros.length - 1]; 
  const progresoProximoLogro = Math.min(100, Math.round((visitadosReales / proximoLogro.meta) * 100));

  const statsUsuario = {
    xp: xpTotal, nivel: nivelActual, metaXp: xpParaSiguienteNivel, porcentajeNivel: porcentajeNivel,
    visitados: visitadosReales, total: totalLugares, ultimoLogro: ultimoLogro
  };

  return (
    <div className="app-container">
      <div className="dashboard-grid-nuevo">
        
        <Sidebar setEscenaActual={setEscenaActual} escenaActual={escenaActual} statsUsuario={statsUsuario} />
        
        <main className="main-content-wrapper">
          
          <header className="top-bar">
            <div className="location-info">
              <h1>{infoSede.nombre}</h1>
              <p><MapPin size={14} /> San Fernando, Meta</p>
            </div>
            <div className="top-actions">
              <button className="icon-btn"><Sun size={18} /> Día</button>
              <button className="icon-btn"><Volume2 size={18} /></button>
              <button className="icon-btn" onClick={togglePantallaCompleta}><Maximize size={18} /></button>
              <button 
                className="btn-tour" 
                onClick={() => setAutoPlay(!autoPlay)}
                style={{ backgroundColor: autoPlay ? '#ef4444' : '#6366f1' }}
              >
                {autoPlay ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />} 
                {autoPlay ? 'Detener recorrido' : 'Recorrido automático'}
              </button>
            </div>
          </header>

          <section className="columna-principal">
            <Viewer360 foto={escenaActual} setEscenaActual={setEscenaActual} />
            <ChatBot setEscenaActual={setEscenaActual} />
          </section>

          <section className="bottom-cards-grid" style={{ display: visorExpandido ? 'none' : 'grid' }}>
            
            <div className="info-card">
              <div className="card-header">
                <h3><MapPin size={16} /> Mapa del campus</h3>
              </div>
              <div className="mapa-contenedor">
                <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src={infoSede.mapaUrl} title="Mapa"></iframe>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <h3><Info size={16} /> Información del lugar</h3>
              </div>
              <div className="card-content-flex">
                <img src={infoSede.vistaExterior} alt="Exterior" className="thumb-info" onError={(e) => e.target.src = '/assets/panoramas/mapa-unimeta.png'} />
                <div className="text-info">
                  <h4>{infoSede.nombre}</h4>
                  <span className="tag">{infoSede.categoria}</span>
                  <p>{infoSede.descripcion}</p>
                  <span className="horario-text">◷ 7:00 a.m. - 9:00 p.m.</span>
                </div>
              </div>
            </div>

            {/* 🔴 TARJETA DE PROGRESO COMPRIMIDA PARA QUE QUEPA PERFECTO */}
            <div className="info-card">
              <div className="card-header">
                <h3><Target size={16} /> Tu progreso</h3>
              </div>
              
              {/* Le quitamos padding y usamos flex1 para que distribuya mejor el espacio */}
              <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, overflow: 'hidden' }}>
                
                {/* 1. Parte superior: Círculo y estadísticas */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div className="stat-circle" style={{ width: '55px', height: '55px', borderWidth: '4px' }}>
                    <div className="circle-inner">
                      <span className="percent" style={{ fontSize: '0.85rem' }}>{porcentajeExplorado}%</span>
                      <span className="label" style={{ fontSize: '0.4rem' }}>Explorado</span>
                    </div>
                  </div>
                  <ul className="stats-list" style={{ listStyle: 'none', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0, padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Home size={12}/> Lugares: {visitadosReales} / {totalLugares}</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12}/> Recorrido: {distanciaKm} km</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>⏱️ Tiempo: {tiempoMin} min</li>
                  </ul>
                </div>

                {/* 2. Parte inferior: Próximo Logro (Más compacta) */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600', margin: 0 }}>Logro próximo</p>
                   <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ background: proximoLogro.bg, padding: '6px', borderRadius: '50%', display: 'flex' }}>
                         {proximoLogro.icono}
                      </div>
                      <div style={{ flex: 1 }}>
                         <h5 style={{ fontSize: '0.7rem', color: 'white', margin: '0 0 2px 0' }}>{proximoLogro.titulo}</h5>
                         <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', margin: 0 }}>{proximoLogro.desc}</p>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                            <div className="progress-bar-bg" style={{ flex: 1, height: '4px', background: '#1e293b', borderRadius: '2px' }}>
                               <div className="progress-bar-fill" style={{ width: `${progresoProximoLogro}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: '2px', transition: 'width 0.5s' }}></div>
                            </div>
                            <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{visitadosReales} / {proximoLogro.meta}</span>
                            <span style={{ fontSize: '0.5rem', color: '#3b82f6', fontWeight: 'bold' }}>+{proximoLogro.xp} XP</span>
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>

          </section>
        </main> 
      </div>
    </div>
  );
}

export default App;