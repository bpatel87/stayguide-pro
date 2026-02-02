import React, { useState } from 'react';
import { Wifi, MapPin, Coffee, Home, Clock, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const GuestViewPWA = () => {
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['wifi']);
  const [showAddToHome, setShowAddToHome] = useState(true);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const connectToWifi = () => {
    if (!emailCaptured) {
      // Show email capture modal
      document.getElementById('email-modal')?.classList.remove('hidden');
    } else {
      // Actual WiFi connection logic
      alert('Connecting to WiFi...');
    }
  };

  const captureEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailCaptured(true);
    document.getElementById('email-modal')?.classList.add('hidden');
    // Now connect to WiFi
    alert('Email saved! Connecting to WiFi...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Add to Home Screen Banner */}
      {showAddToHome && (
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Add to home screen for quick access</span>
          </div>
          <button onClick={() => setShowAddToHome(false)} className="text-white/80">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Lakeside Cottage</h1>
          <p className="text-gray-600 mt-1">Your home away from home</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
        {/* WiFi Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('wifi')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">WiFi Access</h3>
                <p className="text-sm text-gray-600">Tap to connect instantly</p>
              </div>
            </div>
            {expandedSections.includes('wifi') ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.includes('wifi') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Network</p>
                  <p className="font-mono font-semibold">LakeCottage_5G</p>
                </div>
                <button
                  onClick={connectToWifi}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Connect to WiFi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Check-in Instructions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('checkin')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Check-in Instructions</h3>
                <p className="text-sm text-gray-600">Everything you need to know</p>
              </div>
            </div>
            {expandedSections.includes('checkin') ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.includes('checkin') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Door Code</p>
                    <p className="text-gray-600">Keypad code: 4829</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Parking</p>
                    <p className="text-gray-600">Park in the driveway only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Check-in Time</p>
                    <p className="text-gray-600">After 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coffee Machine Guide */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('coffee')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Coffee Machine</h3>
                <p className="text-sm text-gray-600">Video guide</p>
              </div>
            </div>
            {expandedSections.includes('coffee') ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.includes('coffee') && (
            <div className="px-6 pb-4 border-t">
              <div className="mt-4">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Embedded YouTube Video]</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Recommendations - Email Capture */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Local Favorites</h3>
                <p className="text-sm text-gray-600">Our top restaurant picks</p>
              </div>
            </div>
            <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
              Email Me the Restaurant Guide
            </button>
          </div>
        </div>

        {/* Book Direct */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm overflow-hidden text-white">
          <div className="px-6 py-6">
            <h3 className="font-bold text-xl mb-2">Love this place?</h3>
            <p className="mb-4">Book direct for your next stay and save 15%</p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
              Book Your Next Stay
            </button>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <div id="email-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full">
          <h3 className="font-bold text-lg mb-2">Quick Setup</h3>
          <p className="text-gray-600 mb-4">Enter your email to get WiFi access and receive our local guide</p>
          <form onSubmit={captureEmail}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Connect to WiFi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestViewPWA;