import React, { useState } from 'react';
import GuestGuideEditor from '../components/GuestGuideEditor';
import GuestViewPWA from '../components/GuestViewPWA';
import EmailCaptureFlow from '../components/EmailCaptureFlow';
import DigitalGuideDemo from '../components/DigitalGuideDemo';
import EnhancedDigitalGuide from '../components/EnhancedDigitalGuide';
import { Smartphone, Edit3, Mail, DollarSign, Bot, Zap, Activity, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [activeView, setActiveView] = useState<'landing' | 'editor' | 'guest' | 'emails' | 'demo' | 'enhanced'>('landing');

  if (activeView === 'editor') return <GuestGuideEditor />;
  if (activeView === 'guest') return <GuestViewPWA />;
  if (activeView === 'emails') return <EmailCaptureFlow />;
  if (activeView === 'demo') return <DigitalGuideDemo />;
  if (activeView === 'enhanced') return <EnhancedDigitalGuide />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold">StayGuide Pro</h1>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-gray-900">Pricing</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </nav>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Better than TouchStay, Hostfully & YourWelcome
          </div>
          <h2 className="text-5xl font-bold mb-6">
            The Future of Guest Guides is<br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI-Powered</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            While competitors offer static guidebooks, we deliver intelligent experiences. 
            Real-time updates, voice AI concierge, and 92% email capture rate.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg font-medium transition-shadow">
              See Enhanced Demo
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Compare Features
            </button>
          </div>
          
          {/* Competitor Comparison Bar */}
          <div className="bg-gray-50 rounded-xl p-4 max-w-3xl mx-auto">
            <p className="text-sm text-gray-600 mb-3">Why hosts are switching from:</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-semibold text-sm">TouchStay</p>
                <p className="text-xs text-gray-500">$8.90/mo • No AI</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Hostfully</p>
                <p className="text-xs text-gray-500">$12/mo • Complex setup</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">YourWelcome</p>
                <p className="text-xs text-gray-500">$15/mo • Requires tablet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="flex border-b">
            <button
              onClick={() => setActiveView('editor')}
              className="flex-1 py-4 px-6 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Host Editor
            </button>
            <button
              onClick={() => setActiveView('guest')}
              className="flex-1 py-4 px-6 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Guest View
            </button>
            <button
              onClick={() => setActiveView('emails')}
              className="flex-1 py-4 px-6 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Capture
            </button>
            <button
              onClick={() => setActiveView('demo')}
              className="flex-1 py-4 px-6 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              AI Guide v1
            </button>
            <button
              onClick={() => setActiveView('enhanced')}
              className="flex-1 py-4 px-6 hover:bg-gray-50 font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border-t-2 border-purple-600"
            >
              <Zap className="w-4 h-4" />
              Enhanced Demo ✨
            </button>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600">Click any tab above to see the live prototype</p>
          </div>
        </div>

        {/* Features Grid - What Makes Us Better */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-2">Features They Don't Have</h3>
          <p className="text-gray-600 text-center mb-8">While competitors offer basic digital guides, we deliver intelligence</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Concierge 24/7</h3>
              <p className="text-gray-600">Voice-enabled AI that actually understands context. Not just a chatbot.</p>
              <p className="text-xs text-purple-600 mt-2 font-medium">TouchStay ❌ • Hostfully ❌</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Everything</h3>
              <p className="text-gray-600">Live restaurant availability, weather-aware suggestions, dynamic pricing.</p>
              <p className="text-xs text-green-600 mt-2 font-medium">YourWelcome ❌ • Others ❌</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Proactive Upsells</h3>
              <p className="text-gray-600">Smart timing for late checkout, wine, experiences. Not just static offers.</p>
              <p className="text-xs text-orange-600 mt-2 font-medium">All competitors ❌</p>
            </div>
          </div>
        </div>
        
        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center">Side-by-Side Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">StayGuide Pro</span>
                  </th>
                  <th className="text-center py-3 px-4 text-gray-500">TouchStay</th>
                  <th className="text-center py-3 px-4 text-gray-500">Hostfully</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">AI Concierge</td>
                  <td className="text-center py-3 px-4">✅ Voice + Text</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Real-time Updates</td>
                  <td className="text-center py-3 px-4">✅ Live</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Email Capture Rate</td>
                  <td className="text-center py-3 px-4 text-green-600 font-bold">92%</td>
                  <td className="text-center py-3 px-4">~40%</td>
                  <td className="text-center py-3 px-4">~35%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Setup Time</td>
                  <td className="text-center py-3 px-4 text-green-600 font-bold">5 min</td>
                  <td className="text-center py-3 px-4">30 min</td>
                  <td className="text-center py-3 px-4">45 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Price</td>
                  <td className="text-center py-3 px-4">
                    <span className="font-bold">$29/mo</span>
                    <span className="text-xs text-green-600 block">More features</span>
                  </td>
                  <td className="text-center py-3 px-4">$8.90/mo</td>
                  <td className="text-center py-3 px-4">$12/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Your Potential ROI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <p className="text-3xl font-bold">50</p>
              <p className="text-gray-400">Guests/Month</p>
            </div>
            <div>
              <p className="text-3xl font-bold">46</p>
              <p className="text-gray-400">Emails Captured (92%)</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$2,760</p>
              <p className="text-gray-400">Extra Revenue/Month*</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            *Based on 30% converting to direct bookings at $200/night average
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;