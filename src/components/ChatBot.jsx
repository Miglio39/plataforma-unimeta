import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Search, MapPin, Compass, Home, ZoomIn } from 'lucide-react';

const ChatBot = ({ setEscenaActual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [historial, setHistorial] = useState([]);
  const [isTyping, setIsTyping] = useState(false); 
  
  // 🔴 NUEVO ESTADO: Controla la imagen en pantalla completa
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (historial.length > 0 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (isOpen) {
      const chatBody = document.querySelector('.chat-body');
      if (chatBody) chatBody.scrollTop = 0;
    }
  }, [historial, isOpen, isTyping]);

  const enviarMensaje = async (e, textoDirecto = null) => {
    if (e) e.preventDefault();
    const textoUsuario = textoDirecto || input;
    if (!textoUsuario.trim()) return;  
    
    setHistorial(prev => [...prev, { sender: 'user', text: textoUsuario }]);
    setInput('');
    setIsTyping(true);

    try {
      const webhookUrl = 'https://api.unimeta360.online/webhook/chatbot';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: textoUsuario })
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      
      const respuestaIA = data.respuesta_ia || data.output || "Recibí la conexión, procesando...";
      setHistorial(prev => [...prev, { sender: 'bot', text: respuestaIA }]);

    } catch (error) {
      setHistorial(prev => [...prev, { sender: 'bot', text: "❌ Error de conexión. Verifica que el nodo de Webhook en n8n esté activo." }]);
    } finally {
      setIsTyping(false); 
    }
  };

  const formatearMensaje = (texto) => {
    const regex = /(!?)\[([^\]]+)\]\(([^)]+)\)/g;
    const partes = [];
    let ultimoIndice = 0;
    let match;

    while ((match = regex.exec(texto)) !== null) {
      if (match.index > ultimoIndice) {
        partes.push(texto.substring(ultimoIndice, match.index));
      }
      
      const esImagen = match[1] === '!'; 
      const textoOAlt = match[2];
      const url = match[3];

      if (esImagen) {
        // 🔴 IMAGEN CLICKEABLE: Agregamos onClick y cursor de lupa
        partes.push(
          <div key={match.index} style={{ position: 'relative', marginTop: '10px', cursor: 'zoom-in' }} onClick={() => setImagenAmpliada(url)}>
            <img 
              src={url} 
              alt={textoOAlt} 
              style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }} 
            />
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', background: 'rgba(0,0,0,0.6)', padding: '4px', borderRadius: '5px' }}>
               <ZoomIn size={14} color="white" />
            </div>
          </div>
        );
      } else if (url.startsWith('#ESCENA:')) {
        const nombreImagen = url.replace('#ESCENA:', '');
        partes.push(
          <button key={match.index} className="chat-link-btn" onClick={() => setEscenaActual && setEscenaActual(nombreImagen)}>
            {textoOAlt}
          </button>
        );
      } else {
        // 🔴 ENLACES NORMALES AZULES: Para calendarios o links externos
        partes.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline', fontWeight: 'bold' }}>
            {textoOAlt}
          </a>
        );
      }
      ultimoIndice = regex.lastIndex;
    }
    
    if (ultimoIndice < texto.length) partes.push(texto.substring(ultimoIndice));
    return partes.length > 0 ? partes : texto;
  };

  // Botón flotante
  if (!isOpen) {
    return (
      <div className="chatbot-toggle-btn" onClick={() => setIsOpen(true)} style={{ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/assets/icons/avatar-bot.png" alt="IA" className="chatbot-toggle-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
      </div>
    );
  }

  return (
    <>
      {/* 🔴 MODAL DE IMAGEN PANTALLA COMPLETA */}
      {imagenAmpliada && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          onClick={() => setImagenAmpliada(null)}
        >
          <button style={{ position: 'absolute', top: '20px', right: '30px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
             <X size={32} />
          </button>
          <img src={imagenAmpliada} alt="Ampliación" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '15px', boxShadow: '0 0 40px rgba(0,0,0,0.8)', objectFit: 'contain' }} />
        </div>
      )}

      {/* PANEL DEL CHAT NORMAL */}
      <div className="chatbot-panel">
        <div className="chat-panel-header">
          <div className="chat-title">
            <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>🤖</span> Rau IA
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>

        <div className="chat-body custom-scroll">
          {historial.length === 0 && (
            <div className="chat-empty-state">
              <div className="robot-hero-container">
                <div className="glow-rings"></div>
                <img src="/assets/icons/avatar-bot.png" alt="Avatar IA" className="robot-hero-img" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png'} />
              </div>
              <h3 className="chat-welcome-text">¡Hola! Soy tu asistente virtual.<br/>¿En qué puedo ayudarte hoy?</h3>
              <div className="chat-suggestions-vertical">
                <button onClick={() => enviarMensaje(null, "¿Dónde está la biblioteca?")}><Search size={16} className="sugg-icon"/> ¿Dónde está la biblioteca?</button>
                <button onClick={() => enviarMensaje(null, "Llévame a rectoría")}><MapPin size={16} className="sugg-icon"/> Llévame a rectoría</button>
                <button onClick={() => enviarMensaje(null, "Mostrar laboratorios")}><Home size={16} className="sugg-icon"/> Mostrar laboratorios</button>
                <button onClick={() => enviarMensaje(null, "Quiero un recorrido guiado")}><Compass size={16} className="sugg-icon"/> Quiero un recorrido guiado</button>
              </div>
            </div>
          )}

          {historial.length > 0 && (
            <div className="chat-messages-container">
              {historial.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {formatearMensaje(msg.text)}
                </div>
              ))}
              {isTyping && <div className="chat-message bot typing">Procesando...</div>}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-footer" onSubmit={enviarMensaje}>
          <input type="text" placeholder="Escribe tu pregunta..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isTyping} />
          <button type="submit" className="send-btn" disabled={isTyping || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;