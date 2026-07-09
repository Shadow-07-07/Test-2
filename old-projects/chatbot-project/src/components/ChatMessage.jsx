import dayjs from 'dayjs';
import userProfileImage from '../assets/user.png';
import robotProfileImage from '../assets/robot.png';
import './ChatMessage.css';

export function ChatMessage({message, sender, time}){  
  return (
    <div className=
      {sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
    >
      {sender === 'robot' && <img src={robotProfileImage} className="chat-message-profile" />}
      <div className="chat-messages">
        {message}
        {time && (
          <div className="chat-message-time">
            {dayjs(time).format('h:mma')}
          </div>
        )}

      </div>
      {sender === 'user' && <img src={userProfileImage} className="chat-message-profile" />}
    </div>
  ); 
} 