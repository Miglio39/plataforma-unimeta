import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Search, MapPin, Compass, Home } from 'lucide-react';

const ChatBot = ({ setEscenaActual }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  
  // Iniciamos con el historial vacío para mostrar el diseño inicial
  const [historial, setHistorial] = useState([]);
  const [isTyping, setIsTyping] = useState(false); 
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Si hay una conversación o el bot está escribiendo, haz scroll hacia abajo
    if (historial.length > 0 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } 
    // Si el historial está vacío (pantalla de inicio), asegúrate de quedarte arriba
    else if (isOpen) {
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
    const regexEnlace = /\[([^\]]+)\]\(([^)]+)\)/g;
    const partes = [];
    let ultimoIndice = 0;
    let match;

    while ((match = regexEnlace.exec(texto)) !== null) {
      if (match.index > ultimoIndice) {
        partes.push(texto.substring(ultimoIndice, match.index));
      }
      const etiqueta = match[1];
      const url = match[2];

      if (url.startsWith('#ESCENA:')) {
        const nombreImagen = url.replace('#ESCENA:', '');
        partes.push(
          <button key={match.index} className="chat-link-btn" onClick={() => setEscenaActual && setEscenaActual(nombreImagen)}>
            {etiqueta}
          </button>
        );
      } else {
        partes.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="chat-link-btn">{etiqueta}</a>
        );
      }
      ultimoIndice = regexEnlace.lastIndex;
    }
    
    if (ultimoIndice < texto.length) partes.push(texto.substring(ultimoIndice));
    return partes.length > 0 ? partes : texto;
  };

  // Botón flotante cuando el chat está cerrado
  if (!isOpen) {
    return (
      <div className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
        <img src="/assets/icons/avatar-bot.png" alt="IA" className="chatbot-toggle-img" />
      </div>
    );
  }

  return (
    <div className="chatbot-panel">
      <div className="chat-panel-header">
        <div className="chat-title">
          <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>🤖</span> Rau IA
        </div>
        <button className="chat-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
      </div>

      <div className="chat-body custom-scroll">
        
        {/* =========================================
            ESTADO INICIAL (ROBOT + SUGERENCIAS)
            Solo se muestra si no hay historial
            ========================================= */}
        {historial.length === 0 && (
          <div className="chat-empty-state">
            <div className="robot-hero-container">
              <div className="glow-rings"></div>
              {/* 🔴 Aquí también actualizamos a avatar-bot.png */}
              <img src="/assets/icons/avatar-bot.png" alt="Avatar IA" className="robot-hero-img" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png'} />
            </div>
            
            <h3 className="chat-welcome-text">
              ¡Hola! Soy tu asistente virtual.<br/>¿En qué puedo ayudarte hoy?
            </h3>

            <div className="chat-suggestions-vertical">
              <button onClick={() => enviarMensaje(null, "¿Dónde está la biblioteca?")}>
                <Search size={16} className="sugg-icon"/> ¿Dónde está la biblioteca?
              </button>
              <button onClick={() => enviarMensaje(null, "Llévame a rectoría")}>
                <MapPin size={16} className="sugg-icon"/> Llévame a rectoría
              </button>
              <button onClick={() => enviarMensaje(null, "Mostrar laboratorios")}>
                <Home size={16} className="sugg-icon"/> Mostrar laboratorios
              </button>
              <button onClick={() => enviarMensaje(null, "Quiero un recorrido guiado")}>
                <Compass size={16} className="sugg-icon"/> Quiero un recorrido guiado
              </button>
            </div>
          </div>
        )}

        {/* =========================================
            HISTORIAL DE CHAT (MENSAJES)
            ========================================= */}
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
        <input 
          type="text" 
          placeholder="Escribe tu pregunta..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping} 
        />
        <button type="submit" className="send-btn" disabled={isTyping || !input.trim()}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;