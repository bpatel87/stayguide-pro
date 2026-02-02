import React, { useState } from 'react';
import { Wifi, Coffee, Home, MapPin, Clock, Plus, Trash2, Move } from 'lucide-react';

interface GuideBlock {
  id: string;
  type: 'wifi' | 'video' | 'text' | 'rules' | 'email_capture' | 'book_direct';
  title: string;
  content: any;
}

const GuestGuideEditor = () => {
  const [blocks, setBlocks] = useState<GuideBlock[]>([
    {
      id: '1',
      type: 'wifi',
      title: 'WiFi Access',
      content: {
        network: 'LakeCottage_5G',
        password: 'Welcome2Paradise',
        showPassword: false
      }
    },
    {
      id: '2',
      type: 'rules',
      title: 'Check-in Instructions',
      content: {
        items: [
          'Keypad code: 4829',
          'Parking in driveway only',
          'Check-in after 4 PM'
        ]
      }
    }
  ]);

  const [previewMode, setPreviewMode] = useState(false);

  const blockTypes = [
    { type: 'wifi', icon: Wifi, label: 'WiFi Card' },
    { type: 'video', icon: Coffee, label: 'Video Guide' },
    { type: 'rules', icon: Home, label: 'House Rules' },
    { type: 'email_capture', icon: MapPin, label: 'Email Capture' },
    { type: 'book_direct', icon: Clock, label: 'Book Direct' }
  ];

  const addBlock = (type: string) => {
    const newBlock: GuideBlock = {
      id: Date.now().toString(),
      type: type as any,
      title: `New ${type} block`,
      content: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const updateBlock = (id: string, updates: Partial<GuideBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Edit Guest Guide</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Property Info */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Property Name"
              defaultValue="Lakeside Cottage"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Property URL"
              defaultValue="mystayinfo.com/lakeside"
              className="px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Blocks Editor */}
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Move className="w-5 h-5 text-gray-400 cursor-move" />
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                    className="font-medium bg-transparent"
                  />
                </div>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {/* WiFi Block */}
                {block.type === 'wifi' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Network Name"
                      value={block.content.network || ''}
                      onChange={(e) => updateBlock(block.id, { 
                        content: { ...block.content, network: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      value={block.content.password || ''}
                      onChange={(e) => updateBlock(block.id, { 
                        content: { ...block.content, password: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={block.content.showPassword || false}
                        onChange={(e) => updateBlock(block.id, { 
                          content: { ...block.content, showPassword: e.target.checked }
                        })}
                      />
                      <span className="text-sm">Show password to guests</span>
                    </label>
                  </div>
                )}

                {/* House Rules Block */}
                {block.type === 'rules' && (
                  <div className="space-y-2">
                    {(block.content.items || []).map((item: string, i: number) => (
                      <input
                        key={i}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...(block.content.items || [])];
                          newItems[i] = e.target.value;
                          updateBlock(block.id, { 
                            content: { ...block.content, items: newItems }
                          });
                        }}
                        className="w-full px-3 py-2 border rounded"
                      />
                    ))}
                    <button
                      onClick={() => {
                        const newItems = [...(block.content.items || []), ''];
                        updateBlock(block.id, { 
                          content: { ...block.content, items: newItems }
                        });
                      }}
                      className="text-blue-600 text-sm"
                    >
                      + Add item
                    </button>
                  </div>
                )}

                {/* Email Capture Block */}
                {block.type === 'email_capture' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Capture Message"
                      defaultValue="Get our local restaurant guide"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Button Text"
                      defaultValue="Email Me the Guide"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                )}

                {/* Book Direct Block */}
                {block.type === 'book_direct' && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Headline"
                      defaultValue="Love this place? Book direct & save 15%"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Booking URL"
                      defaultValue="https://mylakecottage.com/book"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Block Button */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-medium mb-4">Add New Block</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {blockTypes.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestGuideEditor;