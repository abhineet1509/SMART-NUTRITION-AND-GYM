import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { FaHeadset, FaChevronDown } from "react-icons/fa6";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you?" }
  ]);

  const chatRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { from: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        <FaHeadset size={24} />
      </button>

      {isOpen && (
        <div className="chatbot-box" ref={chatRef}>
          <div className="chatbot-header">
            <span>Gemini Chatbot</span>
            <FaChevronDown onClick={toggleChat} />
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
             <p
             key={index}
             style={{
               display: "inline-block",
               textAlign: "left",
               margin: "2px 0",
               padding: "10px 14px",
               fontSize: "14px",
               backgroundColor: msg.from === "user" ? "#E0FFFF" : "#F0F8FF",
               borderRadius: "20px",
               maxWidth: "70%",
               wordWrap: "break-word",
               alignSelf: msg.from === "user" ? "flex-end" : "flex-start"
             }}
           >
             {msg.text}
           </p>
           
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
