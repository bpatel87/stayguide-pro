// Gemini Pro API Integration for StayGuide Pro
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Available models
export const GEMINI_MODELS = {
  PRO: 'gemini-pro',
  PRO_VISION: 'gemini-pro-vision',
  PRO_1_5: 'gemini-1.5-pro',
  PRO_1_5_FLASH: 'gemini-1.5-flash'
} as const;

// Generate property descriptions
export async function generatePropertyDescription(propertyData: {
  name: string;
  location: string;
  amenities: string[];
  type: string;
}) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO });
  
  const prompt = `Write a compelling, SEO-friendly property description for an Airbnb listing:
    Property Name: ${propertyData.name}
    Location: ${propertyData.location}
    Type: ${propertyData.type}
    Amenities: ${propertyData.amenities.join(', ')}
    
    Make it warm, inviting, and highlight unique features. Keep it under 200 words.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Generate house rules based on property type
export async function generateHouseRules(propertyType: string, specialConsiderations: string[] = []) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO });
  
  const prompt = `Generate clear, friendly house rules for a ${propertyType} rental property.
    Special considerations: ${specialConsiderations.join(', ') || 'None'}
    
    Include standard rules plus any specific to the property type.
    Format as a bulleted list, keep tone friendly but clear.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Generate local recommendations
export async function generateLocalRecommendations(location: string, guestType: string) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO });
  
  const prompt = `Create a local guide for ${location} tailored for ${guestType}.
    Include:
    - Top 5 restaurants (with cuisine type and price range)
    - 3 must-see attractions
    - 2 hidden gems locals love
    - Transportation tips
    
    Format as JSON with categories.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Analyze guest reviews to improve listing
export async function analyzeGuestFeedback(reviews: string[]) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO_1_5 });
  
  const prompt = `Analyze these guest reviews and provide actionable insights:
    
    Reviews:
    ${reviews.join('\n---\n')}
    
    Provide:
    1. Common positive themes
    2. Areas for improvement
    3. Suggested property updates
    4. Response templates for common issues`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Generate email marketing content
export async function generateEmailContent(
  campaignType: 'welcome' | 'checkout' | 'return_offer' | 'seasonal',
  propertyName: string,
  customData?: any
) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO });
  
  const templates = {
    welcome: `Create a warm welcome email for guests arriving at ${propertyName}`,
    checkout: `Create a friendly checkout reminder email for ${propertyName}`,
    return_offer: `Create an enticing return visit offer email with 15% discount for ${propertyName}`,
    seasonal: `Create a seasonal promotion email for ${propertyName}`
  };
  
  const prompt = `${templates[campaignType]}
    ${customData ? `Additional context: ${JSON.stringify(customData)}` : ''}
    
    Include:
    - Engaging subject line
    - Personalized greeting
    - Main message
    - Clear CTA
    - Warm closing
    
    Format as JSON with {subject, body} fields.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Smart Q&A for guest inquiries
export async function answerGuestQuestion(
  question: string,
  propertyContext: any,
  previousMessages?: string[]
) {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PRO_1_5_FLASH });
  
  const prompt = `You are a helpful virtual assistant for a vacation rental property.
    
    Property Info: ${JSON.stringify(propertyContext)}
    ${previousMessages ? `Previous conversation:\n${previousMessages.join('\n')}` : ''}
    
    Guest Question: ${question}
    
    Provide a helpful, friendly response. If you don't know something specific, suggest they contact the host.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}