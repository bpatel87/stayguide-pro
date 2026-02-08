import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeft, Save, Eye, Home, MapPin, Users, Bed, Bath,
  Image, Sparkles, Bot, Wifi, Coffee, Car, Key, Globe
} from 'lucide-react';

const NewPropertyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    propertyType: 'house',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1.5,
    amenities: {
      wifi: true,
      parking: true,
      kitchen: true,
      washer: false,
      airConditioning: true,
      heating: true,
      pool: false,
      hotTub: false,
      gym: false,
      workspace: true
    },
    wifiNetwork: '',
    wifiPassword: '',
    checkInTime: '16:00',
    checkOutTime: '11:00',
    doorCode: '',
    description: ''
  });

  const [useAI, setUseAI] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In production, this would create property in Supabase
      const newPropertyId = Date.now().toString();
      localStorage.setItem(`property_${newPropertyId}`, JSON.stringify(propertyData));
      router.push(`/dashboard/properties/${newPropertyId}/guide`);
    }, 1500);
  };

  const generateWithAI = () => {
    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setPropertyData(prev => ({
        ...prev,
        description: `Welcome to ${prev.name || 'your perfect getaway'}! This stunning ${prev.propertyType} in ${prev.city} offers the perfect blend of comfort and luxury. With ${prev.bedrooms} beautifully appointed bedrooms and ${prev.bathrooms} bathrooms, it comfortably accommodates up to ${prev.maxGuests} guests. Enjoy modern amenities including high-speed WiFi, a fully equipped kitchen, and a dedicated workspace perfect for remote work. Located in the heart of ${prev.city}, you'll be minutes away from local attractions, restaurants, and shopping. Whether you're here for business or pleasure, this property provides everything you need for an unforgettable stay.`,
        wifiNetwork: prev.name ? `${prev.name.replace(/\s+/g, '_')}_5G` : 'Guest_Network_5G',
        wifiPassword: 'Welcome' + Math.floor(Math.random() * 10000),
        doorCode: Math.floor(1000 + Math.random() * 9000).toString()
      }));
      setLoading(false);
    }, 1000);
  };

  const amenityIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    kitchen: <Coffee className="w-5 h-5" />,
    washer: '🧺',
    airConditioning: '❄️',
    heating: '🔥',
    pool: '🏊',
    hotTub: '♨️',
    gym: '💪',
    workspace: '💻'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold">Add New Property</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !propertyData.name || !propertyData.city}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2 disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-700" />
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={propertyData.name}
                  onChange={(e) => setPropertyData({...propertyData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Lakeside Paradise"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={propertyData.propertyType}
                  onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="cottage">Cottage</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="cabin">Cabin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              Location
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={propertyData.address}
                  onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={propertyData.city}
                  onChange={(e) => setPropertyData({...propertyData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Lake Tahoe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  value={propertyData.state}
                  onChange={(e) => setPropertyData({...propertyData, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="California"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-700" />
              Property Details
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Guests
                </label>
                <input
                  type="number"
                  value={propertyData.maxGuests}
                  onChange={(e) => setPropertyData({...propertyData, maxGuests: parseInt(e.target.value)})}
                  min="1"
                  max="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={propertyData.bedrooms}
                  onChange={(e) => setPropertyData({...propertyData, bedrooms: parseInt(e.target.value)})}
                  min="0"
                  max="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={propertyData.bathrooms}
                  onChange={(e) => setPropertyData({...propertyData, bathrooms: parseFloat(e.target.value)})}
                  min="0.5"
                  max="20"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Amenities</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(propertyData.amenities).map(([amenity, isAvailable]) => (
                <label key={amenity} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setPropertyData({
                      ...propertyData,
                      amenities: { ...propertyData.amenities, [amenity]: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="flex items-center gap-2">
                    {amenityIcons[amenity as keyof typeof amenityIcons]}
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Access Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Key className="w-5 h-5 text-gray-700" />
                Access Information
              </h2>
              <button
                type="button"
                onClick={generateWithAI}
                disabled={loading || !propertyData.name}
                className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WiFi Network Name
                </label>
                <input
                  type="text"
                  value={propertyData.wifiNetwork}
                  onChange={(e) => setPropertyData({...propertyData, wifiNetwork: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="YourProperty_5G"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WiFi Password
                </label>
                <input
                  type="text"
                  value={propertyData.wifiPassword}
                  onChange={(e) => setPropertyData({...propertyData, wifiPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="SecurePassword123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Time
                </label>
                <input
                  type="time"
                  value={propertyData.checkInTime}
                  onChange={(e) => setPropertyData({...propertyData, checkInTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Time
                </label>
                <input
                  type="time"
                  value={propertyData.checkOutTime}
                  onChange={(e) => setPropertyData({...propertyData, checkOutTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Door/Keypad Code
                </label>
                <input
                  type="text"
                  value={propertyData.doorCode}
                  onChange={(e) => setPropertyData({...propertyData, doorCode: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="1234"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Property Description</h2>
            
            <textarea
              value={propertyData.description}
              onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Describe your property, what makes it special, nearby attractions..."
            />
            
            <p className="text-sm text-gray-500 mt-2">
              This description will be shown to guests in their digital guide.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPropertyPage;