import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Viewer360 from './components/Viewer360';
import ChatBot from './components/ChatBot';
// 🔴 NUEVO: Se agregó 'X' a las importaciones para el botón de cerrar
import { Maximize, Play, Pause, MapPin, Info, Home, Smartphone, ChevronUp, ChevronDown, BookOpen, Clock, Mail, X } from 'lucide-react';
import './styles/App.css';

// 🔴 ENLACES DE GOOGLE MAPS ACTUALIZADOS
const enlaceSanFernando = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.367339612912!2d-73.63896692552844!3d4.147958846202362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de42f7bd1cd%3A0x52170e5bb949f588!2sCorporaci%C3%B3n%20Universitaria%20del%20Meta%20-%20UNIMETA!5e0!3m2!1ses!2sco!4v1781974017322!5m2!1ses!2sco";
const enlaceUnimetaTech = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.3461124519717!2d-73.64079222552834!3d4.152171046169625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2def726e32d3%3A0x7a45b029dac597ae!2sUnimeta%20Tech!5e0!3m2!1ses!2sco!4v1781974073904!5m2!1ses!2sco"; 
const enlaceParqueMetropolitano = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6462745943977!2d-73.50554872552839!3d4.09220644663312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2851af69336d%3A0x5bfb2a3e1e269c6c!2sPARQUE%20METROPOLITANO%20MARIA%20LUCIA!5e0!3m2!1ses!2sco!4v1781974095481!5m2!1ses!2sco"; 

const datosSedes = {
  // --- SEDE SAN FERNANDO ---
  'inicio.webp': { nombre: 'Campus UNIMETA (Vista Dron)', categoria: 'General', descripcion: 'Vista aérea general del campus universitario y sus alrededores.', vistaExterior: '/assets/panoramas/exterior-rectoria.webp', mapaUrl: enlaceSanFernando },
  'paraninfo.webp': { nombre: 'Paraninfo', categoria: 'Académico', descripcion: 'Espacio principal para eventos, grados y asambleas importantes.', vistaExterior: '/assets/panoramas/exterior-paraninfo.webp', mapaUrl: enlaceSanFernando },
  'consultorio.webp': { nombre: 'Consultorio Jurídico', categoria: 'Servicios', descripcion: 'Atención y asesoría legal gratuita a la comunidad por parte de la facultad de Derecho.', vistaExterior: '/assets/panoramas/exterior-consultorio.webp', mapaUrl: enlaceSanFernando },
  'audiencias.webp': { nombre: 'Sala de Audiencias', categoria: 'Académico', descripcion: 'Simulador de juzgados para las prácticas de los estudiantes de Derecho.', vistaExterior: '/assets/panoramas/exterior-rectoria.webp', mapaUrl: enlaceSanFernando },
  'gimnasio.webp': { nombre: 'Gimnasio - Piso 1', categoria: 'Bienestar', descripcion: 'Primer nivel del complejo deportivo. Zona de pesas, máquinas de fuerza y acondicionamiento físico.', vistaExterior: '/assets/panoramas/exterior-gym.webp', mapaUrl: enlaceSanFernando },
  'gimnasio-piso2.webp': { nombre: 'Gimnasio - Piso 2', categoria: 'Bienestar', descripcion: 'Segundo nivel. Zona dedicada a ejercicios cardiovasculares, aeróbicos y clases grupales.', vistaExterior: '/assets/panoramas/exterior-gym.webp', mapaUrl: enlaceSanFernando },
  'biblioteca.webp': { nombre: 'Biblioteca', categoria: 'Académico', descripcion: 'Espacio para el aprendizaje, investigación y consulta de recursos en alta resolución.', vistaExterior: '/assets/panoramas/exterior-biblioteca.webp', mapaUrl: enlaceSanFernando },
  'sala-radio.webp': { nombre: 'Sala de Radio', categoria: 'Comunicaciones', descripcion: 'Estudio de radiodifusión equipado con tecnología profesional para prácticas de comunicación y periodismo.', vistaExterior: '/assets/panoramas/exterior-mar.webp', mapaUrl: enlaceSanFernando },
  'auditorio-mayor.webp': { nombre: 'Auditorio Principal (Aula Magna)', categoria: 'Auditorios', descripcion: 'Espacio de gran capacidad destinado a ceremonias solemnes, conferencias magistrales y actos culturales centrales.', vistaExterior: '/assets/panoramas/exterior.RYL.webp', mapaUrl: enlaceSanFernando },
  'auditorio-bloquea.webp': { nombre: 'Auditorio Bloque A', categoria: 'Auditorios', descripcion: 'Auditorio alterno equipado con sistemas de proyección acústica para ponencias y eventos de facultades.', vistaExterior: '/assets/panoramas/exterior.RYL.webp', mapaUrl: enlaceSanFernando },
  'auditorio-juridico.webp': { nombre: 'Auditorio de Ciencias Jurídicas', categoria: 'Auditorios', descripcion: 'Sala especializada de conferencias and debates adscrita a la facultad de Derecho y Ciencias Sociales.', vistaExterior: '/assets/panoramas/exterior.RYL.webp', mapaUrl: enlaceSanFernando },
  
 
  // --- LABORATORIOS (Ubicados dentro del Campus San Fernando) ---
  // --- LABORATORIOS (Ubicados dentro del Campus San Fernando) ---
  'lab-calidad-ambiental.webp': { nombre: 'Laboratorio de Calidad Ambiental', categoria: 'Laboratorios', descripcion: 'Espacio dedicado al análisis, monitoreo y evaluación de factores ambientales y ecosistémicos.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-biologia-quimica.webp': { nombre: 'Laboratorio de Biología y Química', categoria: 'Laboratorios', descripcion: 'Área equipada para el estudio de microorganismos, reacciones químicas y prácticas experimentales integradas.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-microbiologia.webp': { nombre: 'Laboratorio de Microbiología', categoria: 'Laboratorios', descripcion: 'Entorno especializado en microscopía y cultivo de agentes biológicos para la investigación científica.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-fisica.webp': { nombre: 'Laboratorio de Física', categoria: 'Laboratorios', descripcion: 'Espacio equipado para prácticas de física experimental, mecánica clásica y análisis de fenómenos físicos.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-electrica-401.webp': { nombre: 'Laboratorio de Eléctrica 401', categoria: 'Laboratorios', descripcion: 'Sala especializada para prácticas de circuitos, mediciones y fundamentos de ingeniería eléctrica.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-electrica-402.webp': { nombre: 'Laboratorio de Eléctrica 402', categoria: 'Laboratorios', descripcion: 'Entorno diseñado para el análisis de sistemas eléctricos de potencia y máquinas eléctricas.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-electrica-403.webp': { nombre: 'Laboratorio de Eléctrica 403', categoria: 'Laboratorios', descripcion: 'Espacio de simulación y montaje de proyectos avanzados en ingeniería eléctrica y electrónica.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-higiene-seguridad.webp': { nombre: 'Laboratorio de Higiene y Seguridad Industrial', categoria: 'Laboratorios', descripcion: 'Área enfocada en la evaluación de riesgos laborales, ergonomía y control de ambientes de trabajo seguros.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-suelo-pavimentos.webp': { nombre: 'Laboratorio de Suelos y Pavimentos', categoria: 'Laboratorios', descripcion: 'Infraestructura técnica para el análisis de materiales, geotecnia y diseño de mezclas asfálticas para obras civiles.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  'lab-procesos-agros.webp': { nombre: 'Laboratorio de Procesos Agroindustriales', categoria: 'Laboratorios', descripcion: 'Entorno equipado para la transformación, conservación y análisis de calidad de productos agropecuarios.', vistaExterior: '/assets/panoramas/exterior-laboratorios.webp', mapaUrl: enlaceSanFernando },
  
  // --- SEDES EXTERNAS (PARQUE METROPOLITANO) ---
  'parque-01.webp': { nombre: 'Parque Metropolitano - Entrada', categoria: 'Zonas Externas', descripcion: 'Entrada principal del parque.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-02.webp': { nombre: 'Parque Metropolitano - Recepción y Aulas', categoria: 'Zonas Externas', descripcion: 'Punto de acceso y equipamiento, integrado con modernos salones de clase para actividades académicas.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-05.webp': { nombre: 'Parque Metropolitano - Vista Aérea (Aulas)', categoria: 'Zonas Externas', descripcion: 'Perspectiva aérea que destaca la infraestructura de las aulas y el sistema de paneles solares sostenibles.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-06.webp': { nombre: 'Parque Metropolitano - Sendero Principal', categoria: 'Zonas Externas', descripcion: 'Zona central que marca el inicio del sendero ecológico de 1.000 metros a través de los paisajes naturales del parque.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-12.webp': { nombre: 'Parque Metropolitano - Puente Principal', categoria: 'Zonas Externas', descripcion: 'Estructura principal que conecta los espacios del parque', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-14.webp': { nombre: 'Parque Metropolitano - Exterior del Establo', categoria: 'Zonas Externas', descripcion: 'Espacio dedicado al cuidado y acondicionamiento de fauna, albergando diversas especies de granja.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-16.webp': { nombre: 'Parque Metropolitano - Interior del Establo', categoria: 'Zonas Externas', descripcion: 'Vista detallada del interior de los corrales, diseñados para el manejo seguro y el bienestar de los animales.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-19.webp': { nombre: 'Parque Metropolitano - Entrada Casa Principal', categoria: 'Zonas Externas', descripcion: 'Acceso a la histórica casa principal del parque, un espacio de gran valor institucional y arquitectónico.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-24.webp': { nombre: 'Parque Metropolitano - Vista Aérea Casa', categoria: 'Zonas Externas', descripcion: 'Toma aérea que permite apreciar la magnitud, el diseño y los alrededores de la emblemática casa principal.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-20.webp': { nombre: 'Parque Metropolitano - Centro Casa Principal', categoria: 'Zonas Externas', descripcion: 'Punto central de encuentro y distribución dentro de las instalaciones de la casa principal.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-23.webp': { nombre: 'Parque Metropolitano - Residencia Fundador', categoria: 'Zonas Externas', descripcion: 'Interior histórico de la residencia del Dr. Rafael Mojica, fundador de UNIMETA, donde se preserva el legado de la institución.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-22.webp': { nombre: 'Parque Metropolitano - Auditorio María Lucía', categoria: 'Zonas Externas', descripcion: 'Auditorio principal del parque, un espacio campestre diseñado para eventos institucionales y académicos.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-25.webp': { nombre: 'Parque Metropolitano - Senderos Húmedos', categoria: 'Zonas Externas', descripcion: 'Camino conector desde la casa principal hacia la zona húmeda, rodeado de senderos peatonales y hermosos jardines.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-26.webp': { nombre: 'Parque Metropolitano - Piscina', categoria: 'Zonas Externas', descripcion: 'Área recreativa equipada con piscina, diseñada para el descanso, la integración y el bienestar de la comunidad universitaria.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-27.webp': { nombre: 'Parque Metropolitano - Vista Aérea Piscina', categoria: 'Zonas Externas', descripcion: 'Perspectiva aérea de la zona húmeda y de descanso, destacando su amplia distribución y hermoso entorno paisajístico.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'parque-28.webp': { nombre: 'Parque Metropolitano - Mariposario', categoria: 'Zonas Externas', descripcion: 'Espacio académico e investigativo dedicado a la conservación de la biodiversidad, protección de lepidópteros.', vistaExterior: '/assets/panoramas/exterior-parque.webp', mapaUrl: enlaceParqueMetropolitano },
  'unimeta-tech.webp': { nombre: 'Unimeta Tech', categoria: 'Tecnología', descripcion: 'Centro de innovación tecnológica con laboratorios de sistemas e ingeniería.', vistaExterior: '/assets/panoramas/exterior-unimeta-tech.webp', mapaUrl: enlaceUnimetaTech }
};

const obtenerDirectorio = (escena) => {
  const directorio = {
    'paraninfo.webp': { horario: '8:00 a.m. - 6:00 p.m.', email: 'eventos@unimeta.edu.co' },
    'consultorio.webp': { horario: '8:00 a.m. - 12:00 p.m. / 2:00 p.m. - 5:00 p.m.', email: 'consultorio@unimeta.edu.co' },
    'audiencias.jpg': { horario: '8:00 a.m. - 5:00 p.m.', email: 'derecho@unimeta.edu.co' },
    'biblioteca.webp': { horario: '7:00 a.m. - 9:00 p.m. (L-V)', email: 'biblioteca@unimeta.edu.co' },
    'gimnasio.webp': { horario: '6:00 a.m. - 9:00 p.m.', email: 'bienestar@unimeta.edu.co' },
    'gimnasio-piso2.webp': { horario: '6:00 a.m. - 9:00 p.m.', email: 'bienestar@unimeta.edu.co' },
    'sala-radio.webp': { horario: '8:00 a.m. - 6:00 p.m.', email: 'radio@unimeta.edu.co' },
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
  const [escenaActual, setEscenaActual] = useState('inicio.webp');
  const [visorExpandido, setVisorExpandido] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [mostrarPanelInferior, setMostrarPanelInferior] = useState(false);
  
  // 🔴 NUEVO ESTADO: Controla la imagen que se está ampliando
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

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

  const infoSede = datosSedes[escenaActual] || { nombre: 'Campus San Fernando', categoria: 'General', descripcion: 'Campus principal.', vistaExterior: '/assets/panoramas/exterior-campus-sanfernando.webp', mapaUrl: enlaceSanFernando };
  const dirInfo = obtenerDirectorio(escenaActual);

  // 🔴 NUEVA LÓGICA: Determinar la dirección exacta según la escena actual
  let textoUbicacion = "Barrio San Fernando, Villavicencio"; // Por defecto (Sede Principal)
  if (escenaActual.includes('parque')) {
    textoUbicacion = "Granja El Hachón, Villavicencio, Meta";
  } else if (escenaActual.includes('tech')) {
    textoUbicacion = "Centro de Villavicencio";
  }

  return (
    <>
      {/* 🔴 NUEVO MODAL PARA IMAGEN AMPLIADA */}
      {imagenAmpliada && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(5px)',
            zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'zoom-out'
          }}
          onClick={() => setImagenAmpliada(null)}
        >
          <button 
            onClick={() => setImagenAmpliada(null)}
            style={{
              position: 'absolute', top: '20px', right: '30px',
              background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%',
              padding: '10px', color: 'white', cursor: 'pointer', display: 'flex', transition: '0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <X size={28} />
          </button>
          
          <img 
            src={imagenAmpliada} 
            alt="Vista Ampliada" 
            style={{
              maxWidth: '90%', maxHeight: '90%', borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)', objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

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
                {/* 🔴 NUEVO: Ahora muestra la variable dinámica que acabamos de crear */}
                <p className="hide-mobile"><MapPin size={14} /> {textoUbicacion}</p>
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
                    {/* 🔴 NUEVO: Imagen clickeable para abrir el modal */}
                    <img 
                      loading="lazy" 
                      src={infoSede.vistaExterior} 
                      alt="Exterior" 
                      className="thumb-info" 
                      style={{ cursor: 'zoom-in' }}
                      onClick={() => setImagenAmpliada(infoSede.vistaExterior)}
                      onError={(e) => e.target.src = '/assets/panoramas/exterior-rectoria.jpg'} 
                    />
                    <div className="text-info">
                      <h4>{infoSede.nombre}</h4>
                      <span className="tag">{infoSede.categoria}</span>
                      <p>{infoSede.descripcion}</p>
                      <span className="horario-text">◷ Abierto al público</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header"><h3><BookOpen size={15} /> Directorio de Contacto</h3></div>
                  <div style={{ 
                    padding: '12px 14px', 
                    display: 'grid', 
                    gridTemplateColumns: '1fr',
                    gap: '16px',
                    flex: 1, 
                    justifyContent: 'center',
                    overflow: 'hidden' 
                  }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                       <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '8px', borderRadius: '50%', flexShrink: 0 }}><Clock size={15} color="#10b981"/></div>
                       <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Horario de Atención</p>
                          <p style={{ fontSize: '0.78rem', color: 'white', margin: '2px 0 0 0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={dirInfo.horario}>{dirInfo.horario}</p>
                       </div>
                    </div>

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