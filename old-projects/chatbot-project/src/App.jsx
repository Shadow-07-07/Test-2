import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage';
import ChatMessages from './components/ChatMessages';
import robotProfileImage from './assets/robot.png';
import './App.css'




function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  // Adding new responses to chatbot
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  }, []);
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);
  return (
    <>
      <title> Chatbot Project </title>
      <link rel="icon" type="image/svg+xml" href={robotProfileImage} />

      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcome-message">Welcome to the chatbot</p>
        )}
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>

  );
}

export default App
