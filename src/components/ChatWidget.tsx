import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react';
import { useProducts, useDistributors } from '../contexts/DemoStateContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 'initial',
  role: 'assistant',
  content: "Hello! I'm your SQ Industrial assistant. I can help you find:\n\n• Available transformers and electrical equipment\n• Distributors near your location\n• Product specifications and pricing\n\nHow can I help you today?",
  timestamp: new Date(),
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { products } = useProducts();
  const { distributors } = useDistributors();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('transformer')) {
      const transformers = products.filter(
        (p) => p.category.toLowerCase().includes('transformer')
      );
      const inStock = transformers.filter((p) => p.inStock);
      
      if (lowerQuery.includes('power')) {
        const powerTransformers = transformers.filter((p) => p.category === 'Power Transformers');
        return `We have ${powerTransformers.length} Power Transformers available:\n\n${powerTransformers
          .slice(0, 3)
          .map((p) => `• **${p.name}** - ${p.specifications['Capacity'] || 'N/A'} (${p.inStock ? 'In Stock' : 'Out of Stock'})`)
          .join('\n')}\n\nWould you like to request a quote for any of these?`;
      }

      if (lowerQuery.includes('distribution')) {
        const distTransformers = transformers.filter((p) => p.category === 'Distribution Transformers');
        return `We have ${distTransformers.length} Distribution Transformers:\n\n${distTransformers
          .slice(0, 3)
          .map((p) => `• **${p.name}** - ${p.specifications['Capacity'] || 'N/A'} (${p.inStock ? 'In Stock' : 'Out of Stock'})`)
          .join('\n')}\n\nThese are ideal for urban and rural electrification projects.`;
      }

      return `We offer ${transformers.length} transformers across Power and Distribution categories. Currently ${inStock.length} are in stock.\n\nPopular models:\n${transformers
        .filter((p) => p.featured)
        .slice(0, 3)
        .map((p) => `• **${p.name}** (${p.category})`)
        .join('\n')}\n\nWould you like details on Power Transformers or Distribution Transformers?`;
    }

    if (lowerQuery.includes('distributor') || lowerQuery.includes('near') || lowerQuery.includes('location')) {
      const divisions = ['dhaka', 'chittagong', 'khulna', 'sylhet', 'rajshahi', 'barisal', 'rangpur', 'mymensingh'];
      const mentionedDivision = divisions.find((d) => lowerQuery.includes(d));

      if (mentionedDivision) {
        const divisionDistributors = distributors.filter(
          (d) => d.division.toLowerCase() === mentionedDivision && d.isActive
        );
        
        if (divisionDistributors.length > 0) {
          return `Found ${divisionDistributors.length} distributor(s) in ${mentionedDivision.charAt(0).toUpperCase() + mentionedDivision.slice(1)}:\n\n${divisionDistributors
            .map((d) => `• **${d.name}**\n  📞 ${d.phone}\n  📧 ${d.email}`)
            .join('\n\n')}\n\nWould you like me to help you request a quote?`;
        }
        return `I couldn't find active distributors in ${mentionedDivision.charAt(0).toUpperCase() + mentionedDivision.slice(1)}. We have distributors in: ${[...new Set(distributors.map((d) => d.division))].join(', ')}.`;
      }

      return `We have ${distributors.length} authorized distributors across Bangladesh:\n\n${[...new Set(distributors.map((d) => d.division))]
        .map((division) => {
          const count = distributors.filter((d) => d.division === division).length;
          return `• **${division}**: ${count} distributor(s)`;
        })
        .join('\n')}\n\nWhich division are you located in?`;
    }

    if (lowerQuery.includes('switchgear')) {
      const switchgear = products.filter((p) => p.category === 'Switchgear');
      return `We have ${switchgear.length} Switchgear products:\n\n${switchgear
        .map((p) => `• **${p.name}** - ${p.specifications['Voltage Rating'] || 'N/A'} (${p.inStock ? 'In Stock' : 'Out of Stock'})`)
        .join('\n')}\n\nThese include medium voltage switchgear, distribution boards, and ring main units.`;
    }

    if (lowerQuery.includes('cable')) {
      const cables = products.filter(
        (p) => p.category.toLowerCase().includes('cable')
      );
      return `We offer ${cables.length} cable products:\n\n**Industrial Cables:**\n${cables
        .filter((p) => p.category === 'Industrial Cables')
        .map((p) => `• ${p.name}`)
        .join('\n')}\n\n**Control Cables:**\n${cables
        .filter((p) => p.category === 'Control Cables')
        .map((p) => `• ${p.name}`)
        .join('\n')}\n\nAll cables meet IEC standards.`;
    }

    if (lowerQuery.includes('protection') || lowerQuery.includes('relay') || lowerQuery.includes('scada')) {
      const protection = products.filter((p) => p.category === 'Protection Systems');
      return `We have ${protection.length} Protection System products:\n\n${protection
        .map((p) => `• **${p.name}** - ${p.description.slice(0, 50)}...`)
        .join('\n')}\n\nThese include numerical relays, RTU controllers, and arc flash protection.`;
    }

    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('quote')) {
      return `For accurate pricing, I recommend requesting a formal quote. Prices vary based on:\n\n• Specific model and capacity\n• Quantity required\n• Delivery location\n• Installation requirements\n\nYou can submit a Request for Quote (RFQ) through our website, or I can connect you with a distributor in your area.`;
    }

    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return "Hello! Welcome to SQ Industrial. I can help you find:\n\n• Transformers (Power & Distribution)\n• Industrial and Control Cables\n• Switchgear equipment\n• Protection Systems\n• Distributors near you\n\nWhat are you looking for today?";
    }

    if (lowerQuery.includes('thank')) {
      return "You're welcome! If you have any more questions about our products or need help finding a distributor, feel free to ask. Have a great day!";
    }

    return `I can help you find information about:\n\n• **Transformers** - Power and Distribution\n• **Cables** - Industrial and Control\n• **Switchgear** - MV/LV panels and RMUs\n• **Protection Systems** - Relays and SCADA\n• **Distributors** - Locations across Bangladesh\n\nTry asking something like:\n- "Show me available transformers"\n- "Find distributors near Dhaka"\n- "What switchgear do you have?"`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">SQ Assistant</h3>
                <p className="text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 rounded-tl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content.split('**').map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i}>{part}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200 text-gray-600">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about products, distributors..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by SQ Industrial AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
