import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Home, Plus, Settings, LogOut, Users, Mail, TrendingUp,
  Eye, Edit3, Copy, ExternalLink, MoreVertical, Search,
  DollarSign, Calendar, Wifi, MessageCircle, BarChart3,
  Smartphone, Zap, CheckCircle
} from 'lucide-react';

interface Property {
  id: string;
  name: string;
  location: string;
  guests: number;
  emailsCaptured: number;
  viewsThisMonth: number;
  conversionRate: number;
  revenue: number;
  imageUrl: string;
  guideUrl: string;
  isPublished: boolean;
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Lakeside Paradise',
      location: 'Lake Tahoe, CA',
      guests: 156,
      emailsCaptured: 143,
      viewsThisMonth: 478,
      conversionRate: 92,
      revenue: 2840,
      imageUrl: '/api/placeholder/400/300',
      guideUrl: '/g/lakeside-paradise',
      isPublished: true
    },
    {
      id: '2',
      name: 'Mountain Retreat',
      location: 'Aspen, CO',
      guests: 89,
      emailsCaptured: 76,
      viewsThisMonth: 234,
      conversionRate: 85,
      revenue: 1520,
      imageUrl: '/api/placeholder/400/300',
      guideUrl: '/g/mountain-retreat',
      isPublished: true
    }
  ]);

  useEffect(() => {
    // Check if user is logged in (demo mode)
    const demoUser = localStorage.getItem('stayguide_demo_user');
    if (!demoUser) {
      router.push('/auth/login');
    } else {
      setUser(JSON.parse(demoUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('stayguide_demo_user');
    router.push('/');
  };

  const totalStats = {
    properties: properties.length,
    emailsCaptured: properties.reduce((sum, p) => sum + p.emailsCaptured, 0),
    monthlyRevenue: properties.reduce((sum, p) => sum + p.revenue, 0),
    avgConversion: Math.round(properties.reduce((sum, p) => sum + p.conversionRate, 0) / properties.length)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">StayGuide Pro</span>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-purple-600 bg-purple-50 rounded-lg font-medium">
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/properties" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Home className="w-5 h-5" />
                Properties
              </Link>
            </li>
            <li>
              <Link href="/dashboard/guests" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                Guest Emails
              </Link>
            </li>
            <li>
              <Link href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5" />
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
              </div>
              <Link
                href="/dashboard/properties/new"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Property
              </Link>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">This month</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalStats.properties}</p>
              <p className="text-gray-600 mt-1">Active Properties</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600">+23%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalStats.emailsCaptured}</p>
              <p className="text-gray-600 mt-1">Emails Captured</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">{totalStats.avgConversion}%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalStats.avgConversion}%</p>
              <p className="text-gray-600 mt-1">Avg Conversion</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm text-green-600">+15%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">${totalStats.monthlyRevenue}</p>
              <p className="text-gray-600 mt-1">Direct Bookings</p>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Your Properties</h2>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6">
                {properties.map(property => (
                  <div key={property.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex gap-6">
                      <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              {property.name}
                              {property.isPublished && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
                              )}
                            </h3>
                            <p className="text-gray-600 text-sm">{property.location}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/dashboard/properties/${property.id}/edit`}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4 text-gray-600" />
                            </Link>
                            <Link
                              href={property.guideUrl}
                              target="_blank"
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                            </Link>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-6 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Views</p>
                            <p className="font-semibold">{property.viewsThisMonth}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Emails</p>
                            <p className="font-semibold">{property.emailsCaptured}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Conversion</p>
                            <p className="font-semibold text-green-600">{property.conversionRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <p className="font-semibold">${property.revenue}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Quick Tips to Boost Conversions
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Use WiFi for emails</p>
                  <p className="text-sm text-gray-600">92% of guests will share their email for WiFi access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Add local tips</p>
                  <p className="text-sm text-gray-600">Guests love insider recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Mobile-first design</p>
                  <p className="text-sm text-gray-600">85% of guests access on phones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;