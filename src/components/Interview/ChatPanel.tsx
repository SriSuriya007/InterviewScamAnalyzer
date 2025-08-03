import React, { useState } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'system';
}

function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'System',
      content: 'Interview session started. AI monitoring is active.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'system'
    },
    {
      id: '2',
      sender: 'Mike Chen',
      content: 'Welcome to the technical interview. Let\'s start with a brief introduction.',
      timestamp: new Date(Date.now() - 1200000),
      type: 'user'
    },
    {
      id: '3',
      sender: 'Emma Wilson',
      content: 'Thank you! I\'m excited to discuss my experience and skills.',
      timestamp: new Date(Date.now() - 900000),
      type: 'user'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: user?.name || 'User',
        content: newMessage,
        timestamp: new Date(),
        type: 'user'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Interview Chat</h3>
          </div>
          <span className="text-sm text-gray-500">{messages.length} messages</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`${message.type === 'system' ? 'text-center' : ''}`}>
            {message.type === 'system' ? (
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                {message.content}
              </div>
            ) : (
              <div className={`max-w-xs ${message.sender === user?.name ? 'ml-auto' : 'mr-auto'}`}>
                <div className={`rounded-lg p-3 ${
                  message.sender === user?.name 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.sender === user?.name ? 'text-right' : 'text-left'
                }`}>
                  {message.sender} • {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;