import React, { useState } from 'react';
import { 
  Presentation, Scale, Gavel, Landmark, 
  Library, FlaskConical, Mic, Briefcase, 
  TreePine, MonitorPlay, ChevronRight, Home, Compass
} from 'lucide-react';

const Sidebar = ({ setEscenaActual, escenaActual, statsUsuario }) => {

  const [tipoPerfil, setTipoPerfil] = useState('estudiante');

  const perfilesDisponibles = {
    estudiante: { nombre: 'Miguel Acevedo', rol: 'Estudiante Ing. Sistemas', color: '2563eb', avatarName: 'Miguel+Acevedo' },
    funcionario: { nombre: 'Docente / Administrativo', rol: 'Funcionario UNIMETA', color: '9333ea', avatarName: 'Funcionario+Unimeta' },
    visitante: { nombre: 'Invitado Externo', rol: 'Explorador Novato', color: '10b981', avatarName: 'Invitado' }
  };

  const perfilActual = perfilesDisponibles[tipoPerfil];
  
  // 🔴 Recibimos las estadísticas y el último logro desde App.js
  const stats = statsUsuario || { xp: 0, nivel: 1, metaXp: 1000, porcentajeNivel: 0, visitados: 1, ultimoLogro: { titulo: 'Primeros Pasos', desc: 'Iniciaste tu recorrido', bg: 'rgba(59, 130, 246, 0.1)', icono: <Compass size={18} color="#3b82f6"/> } };

  const menuInicio = [
    { nombre: 'Inicio (Vista Dron)', archivo: 'inicio.jpg', icono: <Home size={18} /> }
  ];
  
  const menuSanFernando = [
    { nombre: 'Paraninfo', archivo: 'paraninfo.jpg', icono: <Presentation size={18} /> },
    { nombre: 'Consultorio Jurídico', archivo: 'consultorio.jpg', icono: <Scale size={18} /> },
    { nombre: 'Sala de Audiencias', archivo: 'audiencias.jpg', icono: <Gavel size={18} /> },
    { nombre: 'Rectoría', archivo: 'rectoria.jpg', icono: <Landmark size={18} /> },
    { nombre: 'Biblioteca', archivo: 'biblioteca.jpg', icono: <Library size={18} /> },
    { nombre: 'Laboratorios', archivo: 'laboratorio.jpg', icono: <FlaskConical size={18} /> },
    { nombre: 'Auditorios y conferencias', archivo: 'auditorios.jpg', icono: <Mic size={18} /> },
    { nombre: 'Decanaturas', archivo: 'decanaturas.jpg', icono: <Briefcase size={18} /> }
  ];

  const menuSedesExternas = [
    { nombre: 'Parque Metropolitano', archivo: 'parque.jpg', icono: <TreePine size={18} /> },
    { nombre: 'Unimeta Tech', archivo: 'unimeta-tech.jpg', icono: <MonitorPlay size={18} /> }
  ];

  const renderItem = (lugar) => (
    <li 
      key={lugar.archivo} 
      className={`sidebar-item ${escenaActual === lugar.archivo ? 'active' : ''}`}
      onClick={() => setEscenaActual(lugar.archivo)}
    >
      <div className="item-content">
        <span className="icon-container">{lugar.icono}</span>
        <span className="text">{lugar.nombre}</span>
      </div>
    </li>
  );

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon-wrapper">
          <span className="u-logo-left">U</span>
          <span className="u-logo-right">U</span>
        </div>
        <div className="logo-text-wrapper">
          <h2 className="unimeta-title">UNIMETA</h2>
          <p className="subtitle">VIRTUAL GUIDE</p>
        </div>
      </div>
      
      <nav className="sidebar-nav custom-scroll" style={{ marginTop: '10px' }}>
        <div className="menu-section">
          <ul>{menuInicio.map(renderItem)}</ul>
        </div>

        <div className="menu-section">
          <h3 className="section-title">San Fernando</h3>
          <ul>{menuSanFernando.map(renderItem)}</ul>
        </div>

        <div className="menu-section">
          <h3 className="section-title">Sedes Externas</h3>
          <ul>{menuSedesExternas.map(renderItem)}</ul>
        </div>
      </nav>

      <div style={{ padding: '0 5px', marginBottom: '8px', flexShrink: 0 }}>
        <select 
          value={tipoPerfil} 
          onChange={(e) => setTipoPerfil(e.target.value)}
          style={{
            width: '100%', padding: '8px 10px', borderRadius: '8px',
            background: '#0f1523', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.7rem', outline: 'none', cursor: 'pointer'
          }}
        >
          <option value="estudiante">👨‍🎓 Modo: Estudiante</option>
          <option value="funcionario">💼 Modo: Funcionario</option>
          <option value="visitante">🚶‍♂️ Modo: Visitante Externo</option>
        </select>
      </div>

      <div className="user-profile-card" style={{ borderColor: `#${perfilActual.color}40` }}>
        <div className="user-info">
          <img 
            src={`https://ui-avatars.com/api/?name=${perfilActual.avatarName}&background=${perfilActual.color}&color=fff`} 
            alt="Avatar" 
            className="avatar-img" 
            style={{ border: `2px solid #${perfilActual.color}` }}
          />
          <div className="user-details">
            <h4>{perfilActual.nombre}</h4>
            <p>{perfilActual.rol}</p>
          </div>
        </div>
        <div className="xp-container">
          <div className="xp-label">
            <span className="level" style={{ backgroundColor: `#${perfilActual.color}` }}>NIVEL {stats.nivel}</span>
            <span className="xp-text">{stats.xp} / {stats.metaXp} XP</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{width: `${stats.porcentajeNivel}%`, backgroundColor: `#${perfilActual.color}`, transition: 'width 0.5s ease'}}></div>
          </div>
        </div>
      </div>

      {/* 🔴 LOGROS RECIENTES: Se conecta al logro que envía App.js */}
      <div className="achievements-card">
        <div className="achievements-header">
          <h4>Logros recientes</h4>
          <ChevronRight size={16} className="arrow-icon" />
        </div>
        
        <div className="achievement-item">
          <div className="achievement-icon" style={{ background: stats.ultimoLogro.bg }}>
            {stats.ultimoLogro.icono}
          </div>
          <div className="achievement-details">
            <h5>{stats.ultimoLogro.titulo}</h5>
            <p>{stats.ultimoLogro.desc}</p>
            <span className="xp-reward" style={{ color: `#${perfilActual.color}` }}>Desbloqueado</span>
          </div>
        </div>
        
      </div>
    </aside>
  );
};

export default Sidebar;