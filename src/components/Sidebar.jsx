import React, { useState } from 'react';
import { 
  Presentation, Scale, Gavel, Dumbbell, 
  Library, FlaskConical, Mic, Radio, 
  TreePine, MonitorPlay, Home, ChevronRight, ChevronDown 
} from 'lucide-react';

const Sidebar = ({ setEscenaActual, escenaActual }) => {

  const [labsOpen, setLabsOpen] = useState(false);
  const [auditoriosOpen, setAuditoriosOpen] = useState(false);

  const menuInicio = [
    { nombre: 'Inicio (Vista Dron)', archivo: 'inicio.webp', icono: <Home size={18} /> }
  ];

  const listaLaboratorios = [
    { nombre: 'Lab. de Física', archivo: 'lab-fisica.webp' },
    { nombre: 'Lab. de Redes', archivo: 'lab-redes.webp' },
    { nombre: 'Lab. de Software', archivo: 'lab-software.webp' },
    { nombre: 'Lab. de Suelos', archivo: 'lab-suelos.webp' },
    { nombre: 'Lab. de Hidráulica', archivo: 'lab-hidraulica.webp' },
    { nombre: 'Lab. de Materiales', archivo: 'lab-materiales.webp' },
    { nombre: 'Lab. de Electrónica', archivo: 'lab-electronica.webp' },
    { nombre: 'Lab. de Telemática', archivo: 'lab-telematica.webp' },
    { nombre: 'Taller de Arquitectura', archivo: 'lab-arquitectura.webp' },
    { nombre: 'Lab. de Topografía', archivo: 'lab-topografia.webp' },
    { nombre: 'Lab. de Pavimentos', archivo: 'lab-pavimentos.webp' },
    { nombre: 'Lab. de Idiomas', archivo: 'lab-idiomas.webp' },
    { nombre: 'Centro de Cómputo', archivo: 'lab-sistemas.webp' },
    { nombre: 'Lab. de Química', archivo: 'lab-quimica.webp' },
    { nombre: 'Lab. de Biología', archivo: 'lab-biologia.webp' }
  ];

  const listaAuditorios = [
    { nombre: 'Auditorio Principal', archivo: 'auditorio-mayor.webp' },
    { nombre: 'Auditorio Bloque A', archivo: 'auditorio-bloquea.webp' },
    { nombre: 'Auditorio Cs. Jurídicas', archivo: 'auditorio-juridico.webp' }
  ];

  const menuSanFernando = [
    { nombre: 'Paraninfo', archivo: 'paraninfo.webp', icono: <Presentation size={18} /> },
    { nombre: 'Consultorio Jurídico', archivo: 'consultorio.webp', icono: <Scale size={18} /> },
    { nombre: 'Sala de Audiencias', archivo: 'audiencias.webp', icono: <Gavel size={18} /> },
    { nombre: 'Gimnasio', archivo: 'gimnasio.webp', icono: <Dumbbell size={18} /> },
    { nombre: 'Biblioteca', archivo: 'biblioteca.webp', icono: <Library size={18} /> },
    
    // 🔴 REEMPLAZO LOGRADO: SALA DE RADIO CON ÍCONO DE MICROFONO DE EMISORA
    { nombre: 'Sala de Radio', archivo: 'sala-radio.webp', icono: <Radio size={18} /> },
    
    { 
      esSubmenu: true, 
      identificador: 'labs',
      nombre: 'Laboratorios', 
      icono: <FlaskConical size={18} />, 
      subItems: listaLaboratorios 
    },
    
    { 
      esSubmenu: true, 
      identificador: 'auditorios',
      nombre: 'Auditorios y Conferencias', 
      icono: <Mic size={18} />, 
      subItems: listaAuditorios 
    }
  ];

  const menuSedesExternas = [
    { nombre: 'Parque Metropolitano', archivo: 'parque-01.webp', icono: <TreePine size={18} /> },
    { nombre: 'Unimeta Tech', archivo: 'unimeta-tech.webp', icono: <MonitorPlay size={18} /> }
  ];

  const renderItem = (lugar, index) => {
    
    if (lugar.esSubmenu) {
      const esDeLabs = lugar.identificador === 'labs';
      const isOpen = esDeLabs ? labsOpen : auditoriosOpen;
      const toggleMenu = esDeLabs ? () => setLabsOpen(!labsOpen) : () => setAuditoriosOpen(!auditoriosOpen);

      return (
        <React.Fragment key={`submenu-${lugar.identificador}-${index}`}>
          <li 
            className={`sidebar-item ${isOpen ? 'active-submenu' : ''}`}
            onClick={toggleMenu}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div className="item-content">
              <span className="icon-container">{lugar.icono}</span>
              <span className="text" style={{ fontWeight: isOpen ? '600' : 'normal', color: isOpen ? 'white' : 'inherit' }}>
                {lugar.nombre}
              </span>
            </div>
            {isOpen ? <ChevronDown size={14} color="white" /> : <ChevronRight size={14} />}
          </li>
          
          {isOpen && (
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