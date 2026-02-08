import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, MapPin, Coffee, Home, Clock, ChevronDown, ChevronUp, Plus,
  MessageCircle, Send, X, Star, Calendar, Key, Car, Heart,
  Phone, Shield, Sparkles, Bot, Camera, Navigation, Sun,
  CloudRain, DollarSign, Gift, Users, Utensils, Activity,
  Volume2, CheckCircle2, AlertCircle, TrendingUp, Zap,
  Smartphone, Share2, Copy, ExternalLink, Mic, ArrowRight
} from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  icon: React.ReactNode;
}

const EnhancedDigitalGuide = () => {
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showAddToHome, setShowAddToHome] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [weather, setWeather] = useState<WeatherData>({ temp: 72, condition: 'Sunny', icon: <Sun className="w-5 h-5" /> });
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailCaptured && !showUpsell) {
        setShowUpsell(true);
      }
    }, 30000); // Show upsell after 30 seconds
    
    return () => clearTimeout(timer);
  }, [emailCaptured, showUpsell]);

  // Smart greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = guestName || 'there';
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

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
        body: JSON.stringify({ 
          question: messageToSend,
          context: { guestName, checkInDate, emailCaptured }
        })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again!" 
      }]);
    }
    
    setIsTyping(false);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("How do I use the hot tub?");
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lakeside Paradise Guide',
        text: 'Check out our vacation rental!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const connectToWifi = () => {
    if (!emailCaptured) {
      document.getElementById('enhanced-email-modal')?.classList.remove('hidden');
    } else {
      navigator.clipboard.writeText('Welcome2Paradise');
      
      // Show success animation
      const btn = document.getElementById('wifi-btn');
      if (btn) {
        btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied!';
        setTimeout(() => {
          btn.innerHTML = 'Copy Password Again';
        }, 2000);
      }
    }
  };

  const captureEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    
    setEmailCaptured(true);
    setGuestName(name.split(' ')[0]);
    document.getElementById('enhanced-email-modal')?.classList.add('hidden');
    
    // Smooth success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-slide-down';
    successMsg.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Welcome aboard! WiFi password copied';
    document.body.appendChild(successMsg);
    
    navigator.clipboard.writeText('Welcome2Paradise');
    
    setTimeout(() => successMsg.remove(), 4000);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    setCheckInDate(new Date());
    setExpandedSections(['welcome']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 relative">
      <style jsx global>{`
        @keyframes slide-down {
          from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0); }
        }
        .pulse-glow { animation: pulse-glow 2s infinite; }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      {/* Weather Widget - Floating */}
      <div className="fixed top-20 right-4 glass-effect rounded-2xl p-3 shadow-lg z-30 flex items-center gap-2">
        {weather.icon}
        <div className="text-sm">
          <p className="font-semibold">{weather.temp}°F</p>
          <p className="text-xs text-gray-600">{weather.condition}</p>
        </div>
      </div>

      {/* Add to Home Screen Banner - Enhanced */}
      {showAddToHome && (
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 transform -skew-x-12"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 backdrop-blur p-2 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Install our app for the best experience</p>
              <p className="text-xs text-white/80">One tap access to everything</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddToHome(false)} 
            className="text-white/80 hover:text-white relative z-10 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Sticky Header - Premium Design */}
      <div className="glass-effect shadow-lg sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lakeside Paradise • Lake Tahoe
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 px-3 py-1.5 rounded-full border border-green-200">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">4.95</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Bar */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
              <Wifi className="w-4 h-4" />
              WiFi
            </button>
            <button className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
              <Key className="w-4 h-4" />
              Check-in
            </button>
            <button className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
              <Coffee className="w-4 h-4" />
              Amenities
            </button>
            <button className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
              <Utensils className="w-4 h-4" />
              Dining
            </button>
          </div>
        </div>
      </div>

      {/* Smart Onboarding Flow */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full transform scale-100 transition-transform">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Paradise! 🌴</h2>
              <p className="text-gray-600">Let's get you settled in quickly</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <p className="text-sm">Instant WiFi access</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="text-sm">24/7 AI concierge</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <p className="text-sm">Local insider tips</p>
              </div>
            </div>
            
            <button
              onClick={completeOnboarding}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
        {/* Hero Welcome Card - Premium */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <button
              onClick={() => toggleSection('welcome')}
              className="w-full px-6 py-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur p-2.5 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-lg">Your Stay Starts Here</span>
                  <p className="text-sm text-white/80">Everything you need to know</p>
                </div>
              </div>
              {expandedSections.includes('welcome') ? 
                <ChevronUp className="w-5 h-5" /> : 
                <ChevronDown className="w-5 h-5" />
              }
            </button>
            {expandedSections.includes('welcome') && (
              <div className="px-6 pb-5 space-y-4">
                <div className="bg-white/15 backdrop-blur rounded-xl p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quick Access
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-white/70">Door Code</p>
                      <p className="font-mono font-bold">4829</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-white/70">WiFi Network</p>
                      <p className="font-bold text-sm">LakeCottage_5G</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-white/70">Check-out</p>
                      <p className="font-bold">11:00 AM</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-white/70">Host Phone</p>
                      <p className="font-bold text-sm">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
                
                {/* Voice Message from Host */}
                <button className="w-full bg-white/15 backdrop-blur rounded-xl p-4 flex items-center gap-3 hover:bg-white/20 transition-colors">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">Personal welcome from Sarah</p>
                    <p className="text-sm text-white/80">Tap to play (0:45)</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Activity Card - What's Happening Now */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Happening Now
            </h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">LIVE</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Hot tub is at perfect temp (102°F)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Happy hour at Blue Water Grill (5-7 PM)</span>
            </div>
          </div>
        </div>

        {/* Smart WiFi Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection('wifi')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold">Lightning Fast WiFi</span>
                <p className="text-xs text-gray-600">500 Mbps • Stream anything</p>
              </div>
            </div>
            {expandedSections.includes('wifi') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('wifi') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">Network Name</p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <p className="font-mono font-bold text-lg">LakeCottage_5G</p>
                </div>
                <button
                  id="wifi-btn"
                  onClick={connectToWifi}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 pulse-glow"
                >
                  {emailCaptured ? 'Copy Password' : 'Get Instant Access'}
                </button>
                
                {emailCaptured && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Auto-connect enabled on all devices</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Visual Check-in Guide */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection('checkin')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold">Smart Check-in</span>
                <p className="text-xs text-gray-600">Step-by-step with photos</p>
              </div>
            </div>
            {expandedSections.includes('checkin') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('checkin') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-4">
                {/* Visual Timeline */}
                <div className="relative">
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="relative flex items-start gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-full z-10">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Check-in: After 4:00 PM</p>
                      <p className="text-sm text-gray-600">No need to meet - go straight in!</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full z-10">
                      <Navigation className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Find the Keypad</p>
                      <p className="text-sm text-gray-600 mb-2">Front door, left side</p>
                      <img src="/api/placeholder/300/150" alt="Keypad location" className="rounded-lg" />
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full z-10">
                      <Key className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Enter Code: 4829</p>
                      <p className="text-sm text-gray-600">Turn handle right after beep</p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        Watch video tutorial
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-amber-900 mb-1">💡 Pro Tip</p>
                  <p className="text-sm text-amber-800">The code works 24/7. If you're arriving late, the porch light will be on!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive House Guide */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection('guide')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold">House Features</span>
                <p className="text-xs text-gray-600">Interactive guide • Videos</p>
              </div>
            </div>
            {expandedSections.includes('guide') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('guide') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                {/* Feature Cards with Status */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        Hot Tub Paradise
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">READY</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Currently 102°F • Perfect for stargazing</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-2">
                    Watch tutorial video <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Coffee & Breakfast Bar</p>
                      <p className="text-sm text-gray-600 mt-1">Nespresso + Local roast beans</p>
                    </div>
                    <Coffee className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-green-700 mt-2">Complimentary breakfast items in pantry</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Smart Entertainment</p>
                      <p className="text-sm text-gray-600 mt-1">65" TV • Netflix/Disney+ logged in</p>
                    </div>
                    <Activity className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-xs text-purple-700 mt-2">Voice control: "Alexa, play Netflix"</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Local Guide with Live Data */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection('local')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 rounded-xl">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold">Curated Local Guide</span>
                <p className="text-xs text-gray-600">Real-time availability • Insider tips</p>
              </div>
            </div>
            {expandedSections.includes('local') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('local') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-4">
                {/* Tonight's Picks */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Tonight's Recommendations
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Blue Water Grill</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">OPEN</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Fresh catch special • Live music 7 PM</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-green-600">Tables available</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Reserve →</button>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Sunset Kayak Tour</p>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">6:30 PM</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">2 spots left • Includes gear</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-orange-600">$45/person</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Book Now →</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interactive Map Preview */}
                <div className="bg-gray-100 rounded-xl h-32 relative overflow-hidden">
                  <img src="/api/placeholder/400/200" alt="Local map" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                    <button className="bg-white/90 backdrop-blur text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Explore Full Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exclusive Offers Card */}
        {emailCaptured && showUpsell && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-orange-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Gift className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Exclusive Guest Perks</h3>
                <p className="text-sm text-gray-600 mt-1">Unlock special deals as our valued guest</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>20% off late checkout (1 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Free bottle of local wine</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>15% off your next direct booking</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-lg transition-shadow">
              Claim All Perks ($89 value) →
            </button>
          </div>
        )}
        
        {/* Smart Emergency Info */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection('emergency')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold">Safety & Support</span>
                <p className="text-xs text-gray-600">Emergency info • 24/7 help</p>
              </div>
            </div>
            {expandedSections.includes('emergency') ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </button>
          {expandedSections.includes('emergency') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                {/* Quick Call Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-red-50 border border-red-200 rounded-lg p-3 hover:bg-red-100 transition-colors">
                    <Phone className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Emergency</p>
                    <p className="text-xs text-gray-600">911</p>
                  </button>
                  <button className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors">
                    <MessageCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Host</p>
                    <p className="text-xs text-gray-600">Text/Call</p>
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-sm">Property Safety</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• First aid kit: Under kitchen sink</p>
                    <p>• Fire extinguisher: Next to stove</p>
                    <p>• Circuit breaker: Utility closet</p>
                    <p>• Water shutoff: Behind house</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Direct Booking CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5" />
              <p className="text-sm font-medium">Save 15% on Future Stays</p>
            </div>
            <h3 className="text-xl font-bold mb-2">Love it here?</h3>
            <p className="text-sm text-white/90 mb-4">Book direct next time and skip the fees. Plus get exclusive perks!</p>
            <button className="bg-white text-purple-700 px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2">
              Join VIP Guest List <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced AI Assistant Button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 pl-5 pr-6 py-3 pulse-glow"
      >
        <div className="bg-white/20 backdrop-blur p-2 rounded-full">
          <Bot className="w-5 h-5" />
        </div>
        <span className="font-medium">AI Concierge</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Enhanced AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[400px] h-[700px] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Premium Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur p-2.5 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Concierge</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Always here to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Smart Suggestions Bar */}
            <div className="bg-gray-50 px-4 py-3 border-b">
              <p className="text-xs text-gray-600 mb-2">Popular questions:</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {['WiFi password', 'Restaurant recs', 'Hot tub help'].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs whitespace-nowrap hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{getGreeting()}</h4>
                  <p className="text-gray-600 mb-6">I'm your AI concierge. Ask me anything!</p>
                  
                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                    <button
                      onClick={() => handleSendMessage("What's special about this place?")}
                      className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                    >
                      <Home className="w-5 h-5 text-purple-600 mb-2" />
                      <p className="text-sm font-medium">House features</p>
                    </button>
                    <button
                      onClick={() => handleSendMessage("What's there to do nearby?")}
                      className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                    >
                      <MapPin className="w-5 h-5 text-blue-600 mb-2" />
                      <p className="text-sm font-medium">Local activities</p>
                    </button>
                    <button
                      onClick={() => handleSendMessage("Any restaurant recommendations?")}
                      className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                    >
                      <Utensils className="w-5 h-5 text-green-600 mb-2" />
                      <p className="text-sm font-medium">Where to eat</p>
                    </button>
                    <button
                      onClick={() => handleSendMessage("How do I use the hot tub?")}
                      className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                    >
                      <Sparkles className="w-5 h-5 text-orange-600 mb-2" />
                      <p className="text-sm font-medium">Amenity help</p>
                    </button>
                  </div>
                </div>
              )}
              
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-sm'
                  } px-4 py-3`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Chat Input */}
            <div className="p-4 border-t bg-white">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className={`p-2.5 rounded-lg transition-colors ${
                    isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type or say your question..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() && !isListening}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-4 py-2.5 hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Email Capture Modal */}
      <div id="enhanced-email-modal" className="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full transform scale-100 transition-transform shadow-2xl">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Get Connected Instantly</h3>
            <p className="text-gray-600 text-sm">
              Quick sign-up for WiFi access plus exclusive perks during your stay
            </p>
          </div>
          
          <form onSubmit={captureEmail} className="space-y-3">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            
            <div className="space-y-2 py-2">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span className="text-gray-600">Get local recommendations & exclusive deals</span>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
            >
              Connect to WiFi →
            </button>
          </form>
          
          <button
            onClick={() => document.getElementById('enhanced-email-modal')?.classList.add('hidden')}
            className="mt-4 w-full text-gray-500 text-sm hover:text-gray-700"
          >
            I'll do this later
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDigitalGuide;