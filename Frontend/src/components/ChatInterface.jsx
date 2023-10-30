import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./ChatInterface.css";

function ChatInterface({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", sender: "ai" },
    {
      text: "I'm looking for a new laptop. Can you help me choose one?",
      sender: "user",
    },
    { text: "Of course! What's your budget?", sender: "ai" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [cookies, setCookie] = useCookies(["chatMessages"]);

  useEffect(() => {
    if (cookies.chatMessages) {
      setMessages(cookies.chatMessages);
    }
  }, [cookies.chatMessages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() !== "") {
      const newMessage = { text: messageInput, sender: "user" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setCookie("chatMessages", newMessages, { path: "/" });
      setMessageInput("");

      // Make API call to backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageInput }),
      });

      // Get response from backend
      const data = await response.json();

      // Display response from backend
      const aiMessage = { text: data.message, sender: "ai" };
      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      setCookie("chatMessages", updatedMessages, { path: "/" });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`message ${
          message.sender === "user" ? "sent" : "received"
        }`}>
        {message.text}
      </div>
    ));
  };

  return (
    <div className="chat-interface">
      <button onClick={onClose}>Close Chat</button>
      <div className="chat-messages">{renderMessages()}</div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
