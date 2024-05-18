import React, { useState, useEffect } from 'react';
import './style.css'; // Import your styles here

const Chatbox = () => {
  const [state, setState] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleState = () => {
    setState(!state);
  };

  const onSendButton = async () => {
    console.log("Send Clicked")
    if (input === "") return;

    const userMessage = { name: "User", message: input };
    setMessages([...messages, userMessage]);
    

    try {
      const response = await fetch('https://e-commerce-chatbot.onrender.com/predict', {
        method: 'POST',
        body: JSON.stringify({ message:input }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
      });
      const data = await response.json();
      const botMessage = { name: "Gopal", message: data.answer };
      
      console.log(botMessage)
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
    setInput('');
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSendButton();
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector('.chatbox__footer input');
    inputElement.addEventListener("keyup", handleKeyUp);

    return () => {
      inputElement.removeEventListener("keyup", handleKeyUp);
    };
  }, [input]);

  return (
    <div className="container">
      <div className="chatbox">
        <div className={`chatbox__support ${state ? 'chatbox--active' : ''}`}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">Hi. My name is Gopal. How can I help you?</p>
            </div>
          </div>
          <div className="chatbox__messages">
            <div>
              {messages.slice().map((item, index) => (
                <div key={index} className={`messages__item messages__item--${item.name === 'Gopal' ? 'visitor' : 'operator'}`}>
                  {item.message}
                </div>
              ))}
            </div>
          </div>
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="chatbox__send--footer send__button" onClick={onSendButton}>Send</button>
          </div>
        </div>
        <div className="chatbox__button">
          <button onClick={toggleState}>
            <img src="path_to_your_chatbox-icon.svg" alt="Chat Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
