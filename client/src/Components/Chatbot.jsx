import React, { useState, useRef, useEffect } from "react";
import { FaHeadset, FaChevronDown } from "react-icons/fa6";

const Chatbot = () => {
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
<<<<<<< HEAD
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
=======
      const res = await fetch("${import.meta.env.VITE_BACKEND_URL}/api/chat", {
>>>>>>> 785319e4 (Update backend URL to deployed endpoint and use env variable)
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
    <div className="fixed bottom-10 right-12 z-[9999] cursor-pointer">
   
    <div
      className="bg-red-600 text-white border-none rounded-full p-3 shadow-md hover:scale-110 transition-transform"
      onClick={toggleChat}
    >
      <FaHeadset size={24} />
    </div>
    {isOpen && (
      <div
        className="w-[80vw] max-w-[400px] h-[60vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden absolute bottom-16 right-0 animate-[popUp_0.45s_ease-out]"
        ref={chatRef}
      >
        <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center font-bold text-base">
          <span>Gemini Chatbot</span>
          <FaChevronDown onClick={toggleChat} className="cursor-pointer" />
        </div>
  
        <div className="flex-1 flex flex-col gap-1.5 p-3 overflow-y-auto animate-fadeIn">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`inline-block text-left text-sm px-4 py-2 rounded-2xl max-w-[70%] break-words ${
                msg.from === 'user' ? 'bg-cyan-100 self-end' : 'bg-blue-50 self-start'
              }`}
            >
              {msg.text}
            </p>
          ))}
        </div>
  
        {/* Input Area */}
        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full m-3 border border-gray-300 hover:shadow-md transition-shadow">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-none outline-none bg-transparent px-3 py-1 text-sm"
          />
    <div
            onClick={handleSend}
            className="hidden sm:inline-block bg-red-600 text-white px-4 py-2  rounded-full text-sm font-bold hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all"
          >
            Send
          </div>
        </div>
      </div>
    )}
  </div>
  

  );
};

export default Chatbot;
