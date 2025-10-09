import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Phone } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface BudgetChatbotProps {
  budgetData: any;
  isOpen: boolean;
  onClose: () => void;
}

const BudgetChatbot: React.FC<BudgetChatbotProps> = ({ budgetData, isOpen, onClose }) => {
  // Calculate monthly and annual budget based on 5% of monthly revenue
  const monthlyBudget = (budgetData?.monthlyRevenue || 0) * 0.05;
  const annualBudget = monthlyBudget * 12;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm your MIBBS Budget Advisor. I see you've got a ₹${annualBudget.toLocaleString('en-IN')} annual budget recommendation for your ${budgetData?.industry || 'business'}. I'm here to help you understand every detail. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('digital') || message.includes('online')) {
      const digitalAmount = budgetData.allocations.find((a: any) => a.channel.includes('Digital'))?.amount || 0;
      return `Great question! I've allocated ₹${digitalAmount.toLocaleString('en-IN')} for digital marketing because your ${budgetData.industry} industry shows strong online engagement. This covers social media ads, Google Ads, and influencer partnerships.`;
    }

    if (message.includes('why') || message.includes('how')) {
      return `Your budget is calculated based on industry standards for ${budgetData.industry} businesses. The allocation ensures maximum ROI while building long-term brand value.`;
    }

    if (message.includes('agency') || message.includes('partner')) {
      return `I can help you find certified agencies in ${budgetData.location.city} that specialize in ${budgetData.industry}. Would you like me to show you matching agencies?`;
    }

    return `That's a great question about your ${budgetData.industry} business! Your ₹${annualBudget.toLocaleString('en-IN')} budget is designed specifically for businesses like yours. Could you be more specific about what you'd like to understand?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "Why is digital marketing 40% of my budget?",
    "How will I see ROI from this investment?",
    "Which agencies should I work with?",
    "When will I see results?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-mibbs-gradient p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">MIBBS Budget Advisor</h3>
                <p className="text-purple-100 text-sm">Ask me anything about your budget plan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-mibbs-accent' 
                    : 'bg-mibbs-light'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-mibbs-primary" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-mibbs-accent text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-mibbs-light rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-mibbs-primary" />
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 mb-3">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-xs px-3 py-2 bg-mibbs-light text-mibbs-primary rounded-full hover:bg-mibbs-primary hover:text-white transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me about your budget plan..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mibbs-primary resize-none"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-mibbs-gradient text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Consultant CTA */}
          <div className="mt-4 p-3 bg-gradient-to-r from-mibbs-light to-pink-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Need detailed strategy help?</p>
                <p className="text-xs text-gray-600">Book a consultation with our experts</p>
              </div>
              <button className="flex items-center space-x-2 bg-mibbs-gradient text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                <Phone className="w-4 h-4" />
                <span>₹99 Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetChatbot;
