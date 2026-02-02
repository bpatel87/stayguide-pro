import React, { useState } from 'react';
import { Mail, Wifi, Download, Calendar, Gift, Check } from 'lucide-react';

const EmailCaptureFlow = () => {
  const [capturedEmails, setCapturedEmails] = useState([
    { email: 'john@example.com', source: 'WiFi Access', date: '2024-02-01' },
    { email: 'sarah@example.com', source: 'Restaurant Guide', date: '2024-02-02' },
    { email: 'mike@example.com', source: 'Direct Booking', date: '2024-02-02' }
  ]);

  const capturePoints = [
    {
      icon: Wifi,
      title: 'WiFi Connection',
      description: 'Guest enters email to receive WiFi password',
      conversion: '92%'
    },
    {
      icon: Download,
      title: 'Local Guide Download',
      description: 'Email required to download restaurant guide PDF',
      conversion: '67%'
    },
    {
      icon: Calendar,
      title: 'Save Property Info',
      description: 'Email the check-out instructions',
      conversion: '45%'
    },
    {
      icon: Gift,
      title: 'Direct Booking Offer',
      description: '15% discount for next direct booking',
      conversion: '38%'
    }
  ];

  const automatedEmails = [
    {
      trigger: 'Immediately after capture',
      email: 'Welcome & WiFi credentials',
      openRate: '95%'
    },
    {
      trigger: '1 day before checkout',
      email: 'Checkout reminder & instructions',
      openRate: '88%'
    },
    {
      trigger: '3 days after checkout',
      email: 'Thank you & review request',
      openRate: '72%'
    },
    {
      trigger: '30 days after checkout',
      email: 'Direct booking offer (15% off)',
      openRate: '54%'
    },
    {
      trigger: 'Seasonal (4x per year)',
      email: 'Special offers & availability',
      openRate: '41%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Capture & Marketing Flow</h1>

        {/* Email Capture Points */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Email Capture Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capturePoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{point.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: point.conversion }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600">{point.conversion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Email Captures */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Recent Email Captures</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium text-gray-600">Email</th>
                  <th className="pb-3 font-medium text-gray-600">Source</th>
                  <th className="pb-3 font-medium text-gray-600">Date</th>
                  <th className="pb-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {capturedEmails.map((capture, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {capture.email}
                      </div>
                    </td>
                    <td className="py-4">{capture.source}</td>
                    <td className="py-4">{capture.date}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        Subscribed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automated Email Sequence */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Automated Email Sequence</h2>
          <div className="space-y-4">
            {automatedEmails.map((email, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{email.email}</h4>
                  <p className="text-sm text-gray-600">{email.trigger}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Open rate</p>
                  <p className="font-semibold text-green-600">{email.openRate}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-blue-800">
              Guests who receive the local guide are 3x more likely to book directly for their next stay.
              The WiFi capture has the highest conversion rate at 92%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureFlow;