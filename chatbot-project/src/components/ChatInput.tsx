import dayjs from 'dayjs';
import {useState} from 'react';
import {Chatbot} from 'supersimpledev';
import loadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

type ChatMessages = {
  message: string;
  sender: string;
  id: string;
  time: number;
}[];
type ChatInputProps = {
  chatMessages : ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
}

export function ChatInput({chatMessages, setChatMessages}: ChatInputProps) {
  const [inputText, setInputText] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  function saveInput(event: {
    target: {
      value: string;
    };
  }){
    setInputText(event.target.value);
  }
  async function sendMessage(){
    if(isLoading || inputText === ''){
      return;
    }
    setIsLoading(true);

    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message : inputText,
        sender : 'user',
        id : crypto.randomUUID(),
        time : dayjs().valueOf()
      }
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message : <img src={loadingSpinnerGif} className="loading-spinner" />,
        sender : 'robot',
        id : crypto.randomUUID()
    }]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message : response,
        sender : 'robot',
        id : crypto.randomUUID(),
        time : dayjs().valueOf()
      }
    ]);
    
    setIsLoading(false);
  }
  function handleKeyDown(event){
    if(event.key === 'Enter'){
      sendMessage();
    }
    else if(event.key === 'Escape'){
      setInputText('');
    }
  }
  function clearMessages(){
    setChatMessages([]);
  }
  return ( 
      <div className="input-container">
        <input 
          className="chat-input"
          placeholder="Send a message" 
          size={30} 
          onChange={saveInput}
          onKeyDown={handleKeyDown}
          value={inputText}
        />
        <button 
          className="send-button"
          onClick={sendMessage} 
        >Send</button>
        <button 
          className="clear-button"  
          onClick={clearMessages}
        >clear</button>
      </div>
  ); 
}
