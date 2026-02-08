import React, { useState } from 'react';
import {
  Plus, Trash2, Move, Wifi, Home, MapPin, Coffee,
  Clock, Phone, Car, Image, Type, Video, Mail,
  DollarSign, ChevronUp, ChevronDown, Eye, Sparkles
} from 'lucide-react';

interface GuideBlock {
  id: string;
  type: string;
  title: string;
  content: any;
  isExpanded: boolean;
}

interface GuideEditorProps {
  guideId?: string;
  propertyName: string;
  onSave: (blocks: GuideBlock[]) => void;
}

const GuideEditor: React.FC<GuideEditorProps> = ({ guideId, propertyName, onSave }) => {
  const [blocks, setBlocks] = useState<GuideBlock[]>([
    {
      id: '1',
      type: 'welcome',
      title: 'Welcome Message',
      content: {
        message: `Welcome to ${propertyName}! We're so glad you're here.`,
        image: null
      },
      isExpanded: true
    },
    {
      id: '2',
      type: 'wifi',
      title: 'WiFi Access',
      content: {
        network: 'PropertyName_5G',
        password: 'Welcome2024',
        requireEmail: true
      },
      isExpanded: true
    }
  ]);

  const [isDragging, setIsDragging] = useState<string | null>(null);

  const blockTemplates = [
    { type: 'wifi', icon: Wifi, label: 'WiFi Access', color: 'blue' },
    { type: 'checkin', icon: Clock, label: 'Check-in Info', color: 'green' },
    { type: 'amenities', icon: Home, label: 'House Guide', color: 'purple' },
    { type: 'local', icon: MapPin, label: 'Local Tips', color: 'orange' },
    { type: 'rules', icon: Home, label: 'House Rules', color: 'red' },
    { type: 'contact', icon: Phone, label: 'Contact Info', color: 'gray' },
    { type: 'parking', icon: Car, label: 'Parking', color: 'indigo' },
    { type: 'text', icon: Type, label: 'Text Block', color: 'gray' },
    { type: 'image', icon: Image, label: 'Image', color: 'green' },
    { type: 'video', icon: Video, label: 'Video', color: 'purple' },
    { type: 'email', icon: Mail, label: 'Email Capture', color: 'blue' },
    { type: 'booking', icon: DollarSign, label: 'Direct Booking', color: 'emerald' }
  ];

  const addBlock = (type: string) => {
    const template = blockTemplates.find(t => t.type === type);
    const newBlock: GuideBlock = {
      id: Date.now().toString(),
      type,
      title: template?.label || 'New Block',
      content: getDefaultContent(type),
      isExpanded: true
    };
    setBlocks([...blocks, newBlock]);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'wifi':
        return { network: '', password: '', requireEmail: true };
      case 'checkin':
        return { 
          checkInTime: '4:00 PM', 
          checkOutTime: '11:00 AM', 
          doorCode: '', 
          instructions: '' 
        };
      case 'amenities':
        return { 
          items: [
            { name: 'Hot Tub', description: 'Located on back deck', icon: '♨️' },
            { name: 'Coffee Bar', description: 'Nespresso machine in kitchen', icon: '☕' }
          ]
        };
      case 'local':
        return { 
          restaurants: [], 
          activities: [], 
          shopping: [] 
        };
      case 'text':
        return { text: '' };
      default:
        return {};
    }
  };

  const updateBlock = (blockId: string, updates: Partial<GuideBlock>) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const generateWithAI = async (blockId: string) => {
    // Simulate AI generation
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    // In production, this would call Gemini API
    setTimeout(() => {
      if (block.type === 'welcome') {
        updateBlock(blockId, {
          content: {
            ...block.content,
            message: `Welcome to ${propertyName}! Get ready for an unforgettable stay in our beautiful property. We've prepared everything to make your visit comfortable and memorable. This guide contains all the information you'll need, from WiFi access to local recommendations. If you have any questions, our AI assistant is available 24/7 to help!`
          }
        });
      }
    }, 1000);
  };

  const renderBlockContent = (block: GuideBlock) => {
    switch (block.type) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <textarea
              value={block.content.message}
              onChange={(e) => updateBlock(block.id, {
                content: { ...block.content, message: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg resize-none"
              rows={4}
              placeholder="Welcome message..."
            />
            <button
              onClick={() => generateWithAI(block.id)}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </button>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Network Name</label>
              <input
                type="text"
                value={block.content.network}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, network: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="text"
                value={block.content.password}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, password: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={block.content.requireEmail}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, requireEmail: e.target.checked }
                })}
                className="rounded"
              />
              <span className="text-sm">Require email for password (92% capture rate)</span>
            </label>
          </div>
        );

      case 'checkin':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Time</label>
              <input
                type="text"
                value={block.content.checkInTime}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, checkInTime: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check-out Time</label>
              <input
                type="text"
                value={block.content.checkOutTime}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, checkOutTime: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Door/Lock Code</label>
              <input
                type="text"
                value={block.content.doorCode}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, doorCode: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="1234"
              />
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">Configure {block.type} content</p>;
    }
  };

  return (
    <div className="flex gap-6">
      {/* Block Templates Sidebar */}
      <div className="w-64 bg-white rounded-xl shadow-sm p-4 h-fit sticky top-4">
        <h3 className="font-semibold mb-4">Add Blocks</h3>
        <div className="grid grid-cols-2 gap-2">
          {blockTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.type}
                onClick={() => addBlock(template.type)}
                className={`p-3 rounded-lg border hover:shadow-md transition-all flex flex-col items-center gap-2 text-sm`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{template.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 space-y-4">
        {blocks.map((block, index) => {
          const template = blockTemplates.find(t => t.type === block.type);
          const Icon = template?.icon || Type;
          
          return (
            <div
              key={block.id}
              className="bg-white rounded-lg shadow-sm border"
              draggable
              onDragStart={() => setIsDragging(block.id)}
              onDragEnd={() => setIsDragging(null)}
            >
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                    className="font-medium bg-transparent focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateBlock(block.id, { isExpanded: !block.isExpanded })}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBlock(block.id)}
                    className="p-1 hover:bg-red-100 rounded text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {block.isExpanded && (
                <div className="p-4">
                  {renderBlockContent(block)}
                </div>
              )}
            </div>
          );
        })}
        
        {blocks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
            <p className="text-gray-500 mb-4">No blocks yet. Add one from the sidebar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideEditor;