import React, { useState } from 'react';
import { 
  Presentation, Scale, Gavel, Landmark, 
  Library, FlaskConical, Mic, Briefcase, 
  TreePine, MonitorPlay, Home, ChevronRight, ChevronDown 
} from 'lucide-react';

const Sidebar = ({ setEscenaActual, escenaActual }) => {

  // 🔴 ESTADO: Controla si la carpeta de laboratorios está abierta o cerrada
  const [labsOpen, setLabsOpen] = useState(false);

  const menuInicio = [
    { nombre: 'Inicio (Vista Dron)', archivo: 'inicio.jpg', icono: <Home size={18} /> }
  ];

  // 🔴 AQUÍ AGREGAS TUS 15 LABORATORIOS
  const listaLaboratorios = [
    { nombre: 'Lab. de Redes', archivo: 'lab-redes.jpg' },
    { nombre: 'Lab. de Software', archivo: 'lab-software.jpg' },
    { nombre: 'Lab. de Física', archivo: 'lab-fisica.jpg' },
    { nombre: 'Lab. de Química', archivo: 'lab-quimica.jpg' },
    { nombre: 'Lab. de Sistemas Avanzados', archivo: 'lab-sistemas2.jpg' },
    // ... agrega los demás aquí ...
  ];

  const menuSanFernando = [
    { nombre: 'Paraninfo', archivo: 'paraninfo.jpg', icono: <Presentation size={18} /> },
    { nombre: 'Consultorio Jurídico', archivo: 'consultorio.jpg', icono: <Scale size={18} /> },
    { nombre: 'Sala de Audiencias', archivo: 'audiencias.jpg', icono: <Gavel size={18} /> },
    { nombre: 'Rectoría', archivo: 'rectoria.jpg', icono: <Landmark size={18} /> },
    { nombre: 'Biblioteca', archivo: 'biblioteca.jpg', icono: <Library size={18} /> },
    
    // 🔴 ESTE ES EL BOTÓN DESPLEGABLE
    { 
      esSubmenu: true, 
      nombre: 'Laboratorios', 
      icono: <FlaskConical size={18} />, 
      subItems: listaLaboratorios 
    },
    
    { nombre: 'Auditorios y conferencias', archivo: 'auditorios.jpg', icono: <Mic size={18} /> },
    { nombre: 'Decanaturas', archivo: 'decanaturas.jpg', icono: <Briefcase size={18} /> }
  ];

  const menuSedesExternas = [
    { nombre: 'Parque Metropolitano', archivo: 'parque.jpg', icono: <TreePine size={18} /> },
    { nombre: 'Unimeta Tech', archivo: 'unimeta-tech.jpg', icono: <MonitorPlay size={18} /> }
  ];

  const renderItem = (lugar, index) => {
    
    // 🔴 LÓGICA PARA RENDERIZAR EL SUBMENÚ DE LABORATORIOS
    if (lugar.esSubmenu) {
      return (
        <React.Fragment key={`submenu-${index}`}>
          {/* El botón principal que abre/cierra */}
          <li 
            className={`sidebar-item ${labsOpen ? 'active-submenu' : ''}`}
            onClick={() => setLabsOpen(!labsOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div className="item-content">
              <span className="icon-container">{lugar.icono}</span>
              <span className="text" style={{ fontWeight: labsOpen ? '600' : 'normal', color: labsOpen ? 'white' : 'inherit' }}>
                {lugar.nombre}
              </span>
            </div>
            {/* Cambia la flechita si está abierto o cerrado */}
            {labsOpen ? <ChevronDown size={14} color="white" /> : <ChevronRight size={14} />}
          </li>
          
          {/* La lista interna que aparece cuando se abre */}
          {labsOpen && (
            <ul className="submenu-list">
              {lugar.subItems.map((subItem) => (
                <li
                  key={subItem.archivo}
                  className={`sidebar-item submenu-item ${escenaActual === subItem.archivo ? 'active' : ''}`}
                  onClick={() => setEscenaActual(subItem.archivo)}
                >
                  <div className="item-content">
                    <span className="text" style={{ paddingLeft: '8px' }}>• {subItem.nombre}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      );
    }

    // Lógica normal para los demás botones
    return (
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
  };

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
          <ul>{menuInicio.map((item, i) => renderItem(item, i))}</ul>
        </div>
        <div className="menu-section">
          <h3 className="section-title">San Fernando</h3>
          <ul>{menuSanFernando.map((item, i) => renderItem(item, i))}</ul>
        </div>
        <div className="menu-section">
          <h3 className="section-title">Sedes Externas</h3>
          <ul>{menuSedesExternas.map((item, i) => renderItem(item, i))}</ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;