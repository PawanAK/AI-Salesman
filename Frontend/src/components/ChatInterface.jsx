import { useState, useEffect } from "react";
import "./ChatInterface.css";
import { useCookies } from "react-cookie";

function ChatInterface({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [cookies, setCookie] = useCookies(["chatMessages"]);

  useEffect(() => {
    if (cookies.chatMessages) {
      setMessages(cookies.chatMessages);
    }
  }, [cookies.chatMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = { text: messageInput, sender: "you" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setCookie("chatMessages", newMessages, { path: "/" });
      setMessageInput("");
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <button onClick={onClose}>Close Chat</button>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "you" ? "sent" : "received"
            }`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
