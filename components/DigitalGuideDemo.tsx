import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, MapPin, Coffee, Home, Clock, ChevronDown, ChevronUp, Plus,
  MessageCircle, Send, X, Star, Calendar, Key, Car, Heart,
  Phone, Shield, Sparkles, Bot
} from 'lucide-react';

const DigitalGuideDemo = () => {
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['welcome']);
  const [showAddToHome, setShowAddToHome] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "What's the WiFi password?",
    "Where can we eat nearby?",
    "How do I use the hot tub?",
    "What time is check-out?"
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: messageToSend })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      if (data.suggestedQuestions) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again!" 
      }]);
    }
    
    setIsTyping(false);
  };

  const connectToWifi = () => {
    if (!emailCaptured) {
      document.getElementById('email-modal')?.classList.remove('hidden');
    } else {
      navigator.clipboard.writeText('Welcome2Paradise');
      alert('Password copied to clipboard!');
    }
  };

  const captureEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    setEmailCaptured(true);
    document.getElementById('email-modal')?.classList.add('hidden');
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Welcome! WiFi password copied to clipboard';
    document.body.appendChild(successMsg);
    
    navigator.clipboard.writeText('Welcome2Paradise');
    
    setTimeout(() => successMsg.remove(), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Add to Home Screen Banner */}
      {showAddToHome && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add to home screen for instant access</span>
          </div>
          <button onClick={() => setShowAddToHome(false)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lakeside Paradise</h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lake Tahoe, California
              </p>
            </div>
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('welcome')}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Welcome to Paradise!</span>
            </div>
            {expandedSections.includes('welcome') ? 
              <ChevronUp className="w-5 h-5" /> : 
              <ChevronDown className="w-5 h-5" />
            }
          </button>
          {expandedSections.includes('welcome') && (
            <div className="px-6 pb-4 space-y-3">
              <p className="text-white/90 text-sm">
                We're thrilled to have you! This digital guide has everything you need for an amazing stay.
              </p>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <p className="text-sm font-medium mb-2">Quick Start:</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Door code: 4829</li>
                  <li>• WiFi: LakeCottage_5G</li>
                  <li>• Hot tub is ready!</li>
                  <li>• Coffee bar in kitchen</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* WiFi Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('wifi')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">WiFi Access</span>
            </div>
            {expandedSections.includes('wifi') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('wifi') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Network Name</p>
                  <p className="font-mono font-semibold">LakeCottage_5G</p>
                </div>
                <button
                  onClick={connectToWifi}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {emailCaptured ? (
                    <>Copy Password</>
                  ) : (
                    <>Get Password</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Check-in Info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('checkin')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Check-in Info</span>
            </div>
            {expandedSections.includes('checkin') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('checkin') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Check-in: 4:00 PM</p>
                    <p className="text-sm text-gray-600">Check-out: 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Door Code: 4829</p>
                    <p className="text-sm text-gray-600">Enter on front door keypad</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Parking</p>
                    <p className="text-sm text-gray-600">Driveway fits 2 cars</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* House Guide */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('guide')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">House Guide</span>
            </div>
            {expandedSections.includes('guide') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('guide') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium text-sm">Hot Tub</p>
                  <p className="text-sm text-gray-600">Ready to use! Controls on side panel.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-medium text-sm">Coffee Bar</p>
                  <p className="text-sm text-gray-600">Nespresso + drip coffee in kitchen.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-medium text-sm">Fire Pit</p>
                  <p className="text-sm text-gray-600">Firewood by the deck. Matches in drawer.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-medium text-sm">Lake Access</p>
                  <p className="text-sm text-gray-600">Private beach 2 min walk. Kayaks available!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Favorites */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('local')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-600" />
              <span className="font-semibold">Local Favorites</span>
            </div>
            {expandedSections.includes('local') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('local') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    Restaurants
                  </p>
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm">Blue Water Grill</p>
                      <p className="text-xs text-gray-600">5 min walk • Fresh seafood • $$</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm">Mountain Mike's Pizza</p>
                      <p className="text-xs text-gray-600">10 min drive • Family friendly • $</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Activities
                  </p>
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm">Sunset Point Trail</p>
                      <p className="text-xs text-gray-600">Easy 2hr hike • Amazing views</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm">Lake Rental Co</p>
                      <p className="text-xs text-gray-600">Boats & jet skis • 2 miles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('emergency')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="font-semibold">Emergency Info</span>
            </div>
            {expandedSections.includes('emergency') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('emergency') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Emergency: 911</p>
                    <p className="text-sm text-gray-600">Host: (555) 123-4567</p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-800 mb-1">First Aid Kit</p>
                  <p className="text-xs text-red-600">Under kitchen sink</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800 mb-1">Nearest Hospital</p>
                  <p className="text-xs text-blue-600">Lake Regional Medical - 15 min</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
      >
        <Bot className="w-6 h-6" />
        <span className="pr-2 font-medium">Ask anything!</span>
      </button>

      {/* AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-96 h-[600px] sm:h-[500px] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Your AI Guide</h3>
                  <p className="text-xs text-white/80">Ask me anything about your stay!</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Hi! I'm your AI guide. Ask me anything about your stay!</p>
                  
                  {/* Suggested Questions */}
                  <div className="mt-6 space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="w-full text-left bg-gray-100 hover:bg-gray-200 rounded-lg p-3 text-sm transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-purple-600 inline mr-2" />
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about WiFi, activities, house info..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-2 hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Email Capture Modal */}
      <div id="email-modal" className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <h3 className="text-xl font-bold mb-3">Get WiFi Access</h3>
          <p className="text-gray-600 text-sm mb-4">
            Enter your email to receive the WiFi password and exclusive local tips during your stay!
          </p>
          <form onSubmit={captureEmail}>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Get WiFi Password
            </button>
          </form>
          <button
            onClick={() => document.getElementById('email-modal')?.classList.add('hidden')}
            className="mt-3 w-full text-gray-500 text-sm hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalGuideDemo;