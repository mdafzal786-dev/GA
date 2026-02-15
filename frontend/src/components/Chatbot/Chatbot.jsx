// Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import aiAvatar from "../../assets/Image/Logo.png"; // ✅ AI Image

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello Afzal! I’m Guru AI 🤖 How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Toggle chatbot
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Send message
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: data.reply || "I'm here to help 🙂",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: "bot",
          text: "Sorry, something went wrong 😔",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? "open" : ""}`}>
      {/* Floating Button */}
      <button className="chatbot-fab" onClick={toggleChat}>
        {isOpen ? "×" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-content">
              <img
                src={aiAvatar}
                alt="Guru AI"
                className="bot-avatar-img"
              />
              <div>
                <h4>Guru AI</h4>
                <span className="status">online</span>
              </div>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img
                    src={aiAvatar}
                    alt="AI"
                    className="chat-avatar"
                  />
                )}
                <div className={`message-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row bot">
                <img src={aiAvatar} alt="AI" className="chat-avatar" />
                <div className="message-bubble bot typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
