import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'user',
      message: 'Hello World',
    },
    {
      id: 2,
      sender: 'bot',
      message: 'I am an AI',
    },
  ]);


const handleMessageSubmit = async () => {
  try {
    const newChat = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: message,
    };

    setChatHistory([...chatHistory, newChat]);
    setMessage('');

    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();
      const botResponse = {
        id: chatHistory.length + 2,
        sender: 'bot',
        message: data.response,
      };

      setChatHistory([...chatHistory, botResponse]);
      console.log(data);
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menue-button">Suggestions</div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`chat-message ${chat.sender === 'bot' ? 'chatgpt' : ''}`}
            >
              <div className="chat-message-center">
                <div className={`avatar ${chat.sender}`}></div>
                <div className="message">{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-holder">
          <textarea
            rows="1"
            className="chat-input-textarea"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={handleMessageSubmit}>Send</button>
        </div>
      </section>
    </div>
  );
}

export default App;
