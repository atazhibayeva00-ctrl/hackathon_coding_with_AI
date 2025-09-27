import React, { useState } from 'react';

// Temporary InKeep chat component until we get the correct package
interface InKeepChatButtonProps {
  aiChatSettings: {
    graphUrl: string;
    apiKey: string;
  };
}

const InkeepChatButton: React.FC<InKeepChatButtonProps> = ({ aiChatSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{sender: string, message: string, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'You',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    // Simulate API call to InKeep
    try {
      console.log('Making API call to:', aiChatSettings.graphUrl);
      console.log('Using API key:', aiChatSettings.apiKey ? 'Present' : 'Missing');
      
      const response = await fetch(aiChatSettings.graphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiChatSettings.apiKey}`
        },
        body: JSON.stringify({
          message: currentMessage,
          context: 'geographic-intelligence'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          sender: 'InKeep AI',
          message: data.response || 'I received your message. This is a placeholder response.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(`API call failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('InKeep API error:', error);
      const errorMessage = {
        sender: 'InKeep AI',
        message: `Sorry, I'm having trouble connecting right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="inkeep-chat-container">
      {!isOpen ? (
        <button 
          className="inkeep-chat-button"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat with AI
        </button>
      ) : (
        <div className="inkeep-chat-window">
          <div className="inkeep-chat-header">
            <span>InKeep AI Assistant</span>
            <button 
              className="inkeep-chat-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="inkeep-chat-messages">
            {messages.length === 0 ? (
              <div className="inkeep-chat-welcome">
                <p>👋 Hi! I'm your InKeep AI assistant. I can help you with:</p>
                <ul>
                  <li>📍 Location analysis</li>
                  <li>🏠 Property information</li>
                  <li>🛡️ Safety assessments</li>
                  <li>🌊 Environmental data</li>
                </ul>
                <p>Ask me anything about the current location!</p>
                <div style={{ marginTop: '15px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', fontSize: '12px' }}>
                  <strong>Debug Info:</strong><br/>
                  API URL: {aiChatSettings.graphUrl}<br/>
                  API Key: {aiChatSettings.apiKey ? 'Present' : 'Missing'}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`inkeep-message ${msg.sender === 'You' ? 'user' : 'ai'}`}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </div>
              ))
            )}
          </div>
          <div className="inkeep-chat-input-container">
            <input
              type="text"
              placeholder="Ask me about this location..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="inkeep-chat-input"
            />
            <button 
              onClick={handleSendMessage}
              className="inkeep-chat-send"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component that uses Vite's environment variables
const ChatButton: React.FC = () => {
  // Get environment variables with proper fallbacks
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003';
  const apiKey = import.meta.env.VITE_INKEEP_API_KEY || 'sk_C5h0cZx95Wpw.WVj1jsUcpYhvos72EftbNcB16jWeONM794D8Nmu6Jxw';
  
  const buttonProps: InKeepChatButtonProps = {
    aiChatSettings: {
      graphUrl: `${apiBaseUrl}/api/chat`,
      apiKey: apiKey,
    },
  };

  console.log('Environment variables:', {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_INKEEP_API_KEY: import.meta.env.VITE_INKEEP_API_KEY ? 'Present' : 'Missing',
    finalApiUrl: buttonProps.aiChatSettings.graphUrl
  });

  return <InkeepChatButton {...buttonProps} />;
};

export default ChatButton;