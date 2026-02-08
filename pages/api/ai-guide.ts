import type { NextApiRequest, NextApiResponse } from 'next';

// Mock AI responses for demo - replace with actual Gemini API when ready
const propertyContext = {
  name: "Lakeside Paradise Cottage",
  wifi: { network: "LakeCottage_5G", password: "Welcome2Paradise" },
  checkIn: "4:00 PM",
  checkOut: "11:00 AM",
  keypadCode: "4829",
  amenities: ["Hot tub", "Fire pit", "Lake access", "Kayaks", "BBQ grill"],
  rules: [
    "No smoking inside",
    "Quiet hours after 10 PM",
    "Maximum 6 guests",
    "Pets welcome with $50 fee"
  ],
  localTips: {
    restaurants: [
      { name: "The Blue Water Grill", distance: "5 min walk", specialty: "Fresh seafood" },
      { name: "Mountain Mike's Pizza", distance: "10 min drive", specialty: "Family friendly" }
    ],
    activities: [
      { name: "Sunset Point Trail", type: "Hiking", duration: "2 hours" },
      { name: "Lake Rental Co", type: "Boat rentals", distance: "2 miles" }
    ]
  }
};

const generateResponse = (question: string): string => {
  const q = question.toLowerCase();
  
  if (q.includes('wifi') || q.includes('internet')) {
    return `The WiFi network is "${propertyContext.wifi.network}" and the password is "${propertyContext.wifi.password}". You'll find the router in the living room if you need to reset it.`;
  }
  
  if (q.includes('check') && (q.includes('in') || q.includes('out'))) {
    return `Check-in is at ${propertyContext.checkIn} and check-out is at ${propertyContext.checkOut}. The door code is ${propertyContext.keypadCode}. The keypad is on the front door - just enter the code and turn the handle.`;
  }
  
  if (q.includes('restaurant') || q.includes('eat') || q.includes('food')) {
    const restaurants = propertyContext.localTips.restaurants
      .map(r => `${r.name} (${r.distance}) - known for ${r.specialty}`)
      .join('\n');
    return `Here are my favorite local restaurants:\n\n${restaurants}\n\nI'd recommend making reservations for dinner, especially on weekends!`;
  }
  
  if (q.includes('hot tub')) {
    return "The hot tub is ready to use! You'll find it on the back deck. Controls are on the side panel - ideal temperature is already set at 102°F. Please shower before use and remember to put the cover back on when you're done. Enjoy the stars!";
  }
  
  if (q.includes('activities') || q.includes('do') || q.includes('fun')) {
    return "There's so much to do here! You can use our kayaks at the private beach (life jackets in the shed), hike the Sunset Point Trail (trailhead 5 min walk), or just relax by the fire pit. The Blue Water Grill has live music on Friday nights too!";
  }
  
  if (q.includes('emergency') || q.includes('help')) {
    return "For emergencies, call 911. For property issues, text me at (555) 123-4567. The nearest hospital is Lake Regional Medical, 15 minutes away. First aid kit is under the kitchen sink.";
  }
  
  return "Great question! While I don't have specific information about that, feel free to text the host at (555) 123-4567. They're always happy to help make your stay perfect!";
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  
  // Simulate AI processing delay
  setTimeout(() => {
    const response = generateResponse(question);
    res.status(200).json({ 
      response,
      suggestedQuestions: [
        "What's the WiFi password?",
        "Where can we eat nearby?",
        "How do I use the hot tub?",
        "What activities are available?"
      ]
    });
  }, 500);
}