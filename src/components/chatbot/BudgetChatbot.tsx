import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Phone, X } from 'lucide-react';
import { BudgetData } from '../../types';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface BudgetChatbotProps {
  budgetData: BudgetData;
  isOpen: boolean;
  onClose: () => void;
}

const BudgetChatbot: React.FC<BudgetChatbotProps> = ({ budgetData, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm your MIBBS Budget Advisor. I see you've got a ₹${budgetData.budget?.total?.toLocaleString('en-IN') || '0'} monthly budget recommendation for your ${budgetData.industry || 'business'}. I'm here to help you understand every detail and answer any questions about your personalized budget plan. What would you like to know?`,
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
    
    // Budget allocation questions
    if (message.includes('digital') || message.includes('online')) {
      return `Great question! I've allocated ₹${budgetData.budget.digital.toLocaleString('en-IN')} (40%) to digital marketing because:

• Your ${budgetData.industry} industry shows strong online engagement
• Digital channels offer better tracking and ROI measurement
• You can start small and scale based on performance

This covers social media ads, Google Ads, and influencer partnerships. Would you like specific platform recommendations?`;
    }

    if (message.includes('design') || message.includes('creative')) {
      return `Your design budget of ₹${budgetData.budget.design.toLocaleString('en-IN')} (25%) is crucial for:

• Professional logo and brand identity
• Marketing materials and templates
• Social media content creation
• Website design elements

For ${budgetData.industry} businesses, strong visual identity builds trust and recognition. This investment pays off long-term!`;
    }

    if (message.includes('traditional') || message.includes('offline')) {
      return `The ₹${budgetData.budget.traditional.toLocaleString('en-IN')} (20%) for traditional marketing includes:

• Local print advertising
• Radio sponsorships
• Outdoor advertising
• Direct mail campaigns

For your location in ${budgetData.location.city}, traditional media still reaches important local audiences, especially for ${budgetData.industry} businesses.`;
    }

    if (message.includes('events') || message.includes('pr')) {
      return `Your events & PR budget of ₹${budgetData.budget.events.toLocaleString('en-IN')} (15%) covers:

• Trade shows and exhibitions
• Local community events
• PR campaigns and media outreach
• Networking events

These build personal connections and local brand presence - very important for ${budgetData.industry} businesses in ${budgetData.location.city}.`;
    }

    // ROI and results questions
    if (message.includes('roi') || message.includes('return') || message.includes('results')) {
      return `Based on ${budgetData.industry} industry benchmarks, you can expect:

• 3-5x revenue growth within 6-12 months
• 2,500+ new customers annually
• 40% improvement in brand recognition

Your ${budgetData.monthlyRevenue} revenue range suggests this budget will generate significant returns. The key is consistent execution across all channels.`;
    }

    // Agency questions
    if (message.includes('agency') || message.includes('partner')) {
      return `I've matched you with agencies in ${budgetData.location.city} that specialize in ${budgetData.industry}:

• Creative Minds Studio - Design & Digital (₹50K-80K/month)
• Digital Impact Agency - Performance Marketing (₹60K-1L/month)
• Brand Builders Co. - Full Service (₹80K-1.5L/month)

All are MIBBS-certified and have proven track records in your industry. Would you like me to connect you with any of them?`;
    }

    // Timeline questions
    if (message.includes('time') || message.includes('when') || message.includes('how long')) {
      return `Based on your "${budgetData.timeline}" preference:

• Month 1-2: Brand foundation (logo, website, basic social presence)
• Month 3-4: Digital campaigns launch, content creation ramps up
• Month 5-6: Traditional media integration, events planning
• Month 6+: Optimization based on performance data

Your ${budgetData.industry} industry typically sees initial results within 2-3 months, with significant growth by month 6.`;
    }

    // Industry-specific questions
    if (message.includes('industry') || message.includes('sector') || message.includes('competition')) {
      return `For ${budgetData.industry} businesses, I've customized your budget because:

• This industry has specific customer behavior patterns
• Competition levels require strategic positioning
• Seasonal trends affect marketing timing
• Local market dynamics in ${budgetData.location.state} matter

Your budget allocation reflects these industry-specific insights. Need more details about any particular aspect?`;
    }

    // Consultant referral triggers
    if (message.includes('help') || message.includes('confused') || message.includes('complex') || message.includes('detailed') || message.includes('strategy')) {
      return `I understand this can feel overwhelming! While I can explain the basics, for a detailed strategy session tailored specifically to your business, I'd recommend speaking with one of our MIBBS consultants.

They can provide:
• Detailed implementation roadmap
• Agency selection guidance  
• Custom strategy for your specific goals
• Month-by-month action plan

Would you like to book a 30-minute consultation for just ₹99? Our consultants have helped 1000+ businesses like yours succeed.`;
    }

    // Default responses
    const defaultResponses = [
      `That's a great question about your ${budgetData.industry} business! Your ₹${budgetData.budget.total.toLocaleString('en-IN')} budget is designed specifically for businesses like yours in ${budgetData.location.city}. Could you be more specific about what aspect you'd like to understand better?`,
      
      `I'm here to help you understand every aspect of your personalized budget plan. Whether it's about digital marketing, design costs, or ROI expectations - just ask! What specific area would you like me to explain?`,
      
      `Your budget recommendation is based on ${budgetData.industry} industry data and your ${budgetData.monthlyRevenue} revenue range. I can explain any part of it in detail. What would you like to know more about?`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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

    // Simulate typing delay
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Why is digital marketing 40% of my budget?",
    "How will I see ROI from this investment?",
    "Which agencies should I work with?",
    "When will I see results?",
    "Is this budget right for my industry?"
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
                onKeyPress={handleKeyPress}
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