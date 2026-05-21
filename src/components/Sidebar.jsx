import React from 'react';
import { 
  Presentation, Scale, Gavel, Landmark, 
  Library, FlaskConical, Mic, Briefcase, 
  TreePine, MonitorPlay, Home
} from 'lucide-react';

const Sidebar = ({ setEscenaActual, escenaActual }) => {

  const menuInicio = [
    { nombre: 'Inicio (Vista Dron)', archivo: 'inicio.jpg', icono: <Home size={18} /> }
  ];

  const menuSanFernando = [
    { nombre: 'Paraninfo', archivo: 'paraninfo.jpg', icono: <Presentation size={18} /> },
    { nombre: 'Consultorio Jurídico', archivo: 'consultorio.jpg', icono: <Scale size={18} /> },
    { nombre: 'Sala de Audiencias', archivo: 'audiencias.jpg', icono: <Gavel size={18} /> },
    { nombre: 'Rectoría', archivo: 'rectoria.jpg', icono: <Landmark size={18} /> },
    { nombre: 'Biblioteca', archivo: 'biblioteca.jpg', icono: <Library size={18} /> },
    { nombre: 'Laboratorios', archivo: 'tech-laboratorio.jpg', icono: <FlaskConical size={18} /> },
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
    </aside>
  );
};

export default Sidebar;