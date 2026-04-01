import React, { useState, useEffect, useRef } from 'react';

// 🔴 IMPORTANTE: Añadimos 'setEscenaActual' a las propiedades que recibe el ChatBot
const ChatBot = ({ mensaje, setEscenaActual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [historial, setHistorial] = useState([
    { sender: 'bot', text: mensaje || "¡Hola! Soy el guía virtual de UNIMETA con IA." }
  ]);
  const [isTyping, setIsTyping] = useState(false); 
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial, isOpen, isTyping]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textoUsuario = input;
    
    setHistorial(prev => [...prev, { sender: 'user', text: textoUsuario }]);
    setInput('');
    setIsTyping(true); 

    try {
      // URL de Producción 
      const webhookUrl = 'https://api.unimeta360.online/webhook/chatbot';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pregunta: textoUsuario })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const respuestaIA = data.respuesta_ia || "Recibí la conexión, pero el formato de respuesta de n8n no es el esperado.";

      setHistorial(prev => [...prev, { sender: 'bot', text: respuestaIA }]);

    } catch (error) {
      console.error("Error conectando con n8n:", error);
      setHistorial(prev => [...prev, { sender: 'bot', text: "❌ Error de conexión con el cerebro IA. Verifica que el flujo en n8n esté en modo 'Listening' o Activo." }]);
    } finally {
      setIsTyping(false); 
    }
  };

  // 🔴 LA MAGIA: Función que convierte Markdown en botones y detecta comandos internos 🔴
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

      // Si la URL empieza con "#ESCENA:", es una orden para cambiar el 360
      if (url.startsWith('#ESCENA:')) {
        const nombreImagen = url.replace('#ESCENA:', ''); 
        partes.push(
          <button 
            key={match.index} 
            className="chat-link-btn"
            onClick={() => {
              if(setEscenaActual) {
                 setEscenaActual(nombreImagen); // Cambia la foto del visor 360
                 setIsOpen(false); // Cierra el chat automáticamente
              } else {
                 console.error("Falta pasar la propiedad setEscenaActual al componente ChatBot");
              }
            }}
          >
            {etiqueta}
          </button>
        );
      } else {
        // Enlace normal a una página externa
        partes.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="chat-link-btn">
            {etiqueta}
          </a>
        );
      }
      ultimoIndice = regexEnlace.lastIndex;
    }
    
    if (ultimoIndice < texto.length) {
      partes.push(texto.substring(ultimoIndice));
    }

    return partes.length > 0 ? partes : texto;
  };

  return (
    <div className="chatbot-wrapper">
      
      {isOpen && (
        <div className="chat-window">
          
          <div className="chat-header">
            <div className="chat-title">
              <span className="dot-online"></span> Asistente IA (GPT)
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-body">
            {historial.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {/* 🔴 Aplicamos el traductor de mensajes aquí 🔴 */}
                {formatearMensaje(msg.text)}
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Procesando con IA...
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
            <button type="submit" className="send-btn" disabled={isTyping}>➤</button>
          </form>

        </div>
      )}

      {!isOpen && (
        <div className="chat-bubble-preview" onClick={() => setIsOpen(true)}>
          ¿Tienes dudas? ¡Pregúntame!
        </div>
      )}
      <img 
        src="/assets/icons/buho.png" 
        className="buho-avatar" 
        alt="IA" 
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default ChatBot;