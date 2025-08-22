import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Send, 
  Paperclip, 
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Star,
  Archive,
  Trash2
} from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'TechStart Solutions',
      contact: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      lastMessage: 'Thanks for the proposal. We need to discuss the timeline.',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      leadId: 'L-001'
    },
    {
      id: 2,
      name: 'Fashion Forward',
      contact: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      lastMessage: 'Can we schedule a call to discuss the brand identity project?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      leadId: 'L-002'
    },
    {
      id: 3,
      name: 'Organic Foods Co.',
      contact: 'Amit Kumar',
      avatar: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      lastMessage: 'Perfect! We\'re ready to move forward with the project.',
      timestamp: '3 hours ago',
      unread: 0,
      online: true,
      leadId: 'L-003'
    },
    {
      id: 4,
      name: 'Urban Fitness',
      contact: 'Sneha Reddy',
      avatar: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      lastMessage: 'Could you provide more details about the mobile app features?',
      timestamp: '1 day ago',
      unread: 1,
      online: false,
      leadId: 'L-004'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      message: 'Hi! I saw your proposal for our digital marketing project. It looks comprehensive.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'agency',
      message: 'Thank you! I\'m glad you found it comprehensive. I tried to cover all aspects of your requirements.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'client',
      message: 'I have a few questions about the timeline. Can we discuss?',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'agency',
      message: 'Absolutely! I\'m available for a call anytime today. What works best for you?',
      timestamp: '10:36 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'client',
      message: 'Thanks for the proposal. We need to discuss the timeline.',
      timestamp: '2 min ago',
      type: 'text'
    }
  ];

  const quickReplies = [
    'Thank you for your interest!',
    'I\'ll send you the details shortly.',
    'Let\'s schedule a call to discuss this.',
    'I\'m available for a meeting anytime.',
    'I\'ll prepare a custom proposal for you.'
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{conversation.contact}</p>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-600">#{conversation.leadId}</span>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.contact} • Lead #{selectedConversation.leadId}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Star className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'agency' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'agency'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'agency' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-6 py-2 border-t border-gray-100">
              <div className="flex space-x-2 overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(reply)}
                    className="flex-shrink-0 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-end space-x-3">
                <div className="flex-1 border border-gray-300 rounded-lg">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full px-4 py-3 border-0 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;