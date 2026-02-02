import React, { useState } from 'react';
import GuestGuideEditor from '../components/GuestGuideEditor';
import GuestViewPWA from '../components/GuestViewPWA';
import EmailCaptureFlow from '../components/EmailCaptureFlow';
import { Smartphone, Edit3, Mail, DollarSign } from 'lucide-react';

const HomePage = () => {
  const [activeView, setActiveView] = useState<'landing' | 'editor' | 'guest' | 'emails'>('landing');

  if (activeView === 'editor') return <GuestGuideEditor />;
  if (activeView === 'guest') return <GuestViewPWA />;
  if (activeView === 'emails') return <EmailCaptureFlow />;

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
          <h2 className="text-5xl font-bold mb-6">
            Turn Every Guest Into a<br />
            <span className="text-blue-600">Direct Booking</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Replace paper guides with smart digital experiences. Capture emails, 
            provide instant WiFi access, and build your direct booking business.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Watch Demo
            </button>
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
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600">Click any tab above to see the live prototype</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant PWA</h3>
            <p className="text-gray-600">Guests add to home screen with one tap. Works offline, feels native.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Email Capture</h3>
            <p className="text-gray-600">WiFi, guides, and offers capture emails naturally. 92% conversion rate.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Direct Bookings</h3>
            <p className="text-gray-600">Convert guests to direct bookers with 15% savings offers.</p>
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