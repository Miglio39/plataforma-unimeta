import React from 'react';

const Sidebar = ({ setEscenaActual, escenaActual }) => {
  
  // Grupo 1: Lugares dentro del Campus San Fernando
  const campusSanFernando = [
    { nombre: 'Paraninfo', archivo: 'paraninfo.jpg', icono: '🎭' },
    { nombre: 'Consultorio Jurídico', archivo: 'consultorio.jpg', icono: '⚖️' },
    { nombre: 'Sala de Audiencias', archivo: 'audiencias.jpg', icono: '👨‍⚖️' },
    { nombre: 'Rectoría', archivo: 'rectoria.jpg', icono: '🏛️' },
    { nombre: 'Biblioteca', archivo: 'biblioteca.jpg', icono: '📚' },
    // --- NUEVOS 3 ESPACIOS ---
    { nombre: 'Laboratorios Edificio Hernán Villamarín', archivo: 'laboratorios.jpg', icono: '🔬' },
    { nombre: 'Auditorios y salas de conferencias', archivo: 'auditorios.jpg', icono: '🎤' },
    { nombre: 'Decanaturas', archivo: 'decanaturas.jpg', icono: '👔' }
  ];

  // Grupo 2: Otras Sedes
  const otrasSedes = [
    { nombre: 'Parque Metropolitano', archivo: 'parque.jpg', icono: '🌳' },
    { nombre: 'Unimeta Tech', archivo: 'unimeta-tech.jpg', icono: '💻' }
  ];

  // Función para renderizar cada item de la lista (para no repetir código)
  const renderItem = (lugar) => (
    <li 
      key={lugar.archivo} 
      className={`sidebar-item ${escenaActual === lugar.archivo ? 'active' : ''}`}
      onClick={() => setEscenaActual(lugar.archivo)}
    >
      <span className="icon">{lugar.icono}</span>
      <span className="text">{lugar.nombre}</span>
    </li>
  );

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <h2 className="unimeta-title">UNIMETA</h2>
        <p className="subtitle">VIRTUAL GUIDE</p>
      </div>
      
      <nav className="sidebar-nav">
        {/* SECCIÓN: SAN FERNANDO */}
        <div className="menu-section">
          <h3 className="section-title">📍 San Fernando</h3>
          <ul>
            {campusSanFernando.map(renderItem)}
          </ul>
        </div>

        {/* SECCIÓN: OTRAS SEDES */}
        <div className="menu-section">
          <h3 className="section-title">📍 Sedes Externas</h3>
          <ul>
            {otrasSedes.map(renderItem)}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;