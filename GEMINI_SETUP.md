# Gemini Pro API Setup Guide

## Quick Start

### 1. Get Your API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 2. Set Up Environment
Create a `.env.local` file in your project root:
```bash
GEMINI_API_KEY=your-api-key-here
```

### 3. Install Dependencies
```bash
npm install @google/generative-ai
```

## Usage Examples

### In Your SaaS Components

```typescript
// Generate property description
const description = await generatePropertyDescription({
  name: "Lakeside Paradise",
  location: "Lake Tahoe, CA",
  amenities: ["Hot tub", "Fire pit", "Lake access"],
  type: "Cabin"
});

// Generate smart house rules
const rules = await generateHouseRules("beach house", ["pets allowed", "no smoking"]);

// Answer guest questions
const answer = await answerGuestQuestion(
  "What's the WiFi password?",
  { propertyName: "Beach House", wifi: { network: "BeachHouse5G", password: "SunsetVibes2024" }}
);
```

### Features You Can Build

1. **Auto-Generate Guest Guides**
   - Property descriptions
   - House rules
   - Local recommendations
   - Check-in instructions

2. **Smart Email Campaigns**
   - Welcome emails
   - Checkout reminders
   - Return offers
   - Seasonal promotions

3. **AI Guest Assistant**
   - Answer common questions
   - Provide local info
   - Handle basic inquiries

4. **Content Optimization**
   - SEO-friendly descriptions
   - Review analysis
   - Listing improvements

## API Limits & Pricing

- **Free Tier**: 60 requests per minute
- **Pro**: Higher limits available
- **Models**:
  - `gemini-pro`: Best for text generation
  - `gemini-pro-vision`: For image analysis
  - `gemini-1.5-pro`: Larger context window
  - `gemini-1.5-flash`: Faster, cheaper

## Integration with StayGuide Pro

The Gemini integration adds these capabilities:

1. **Property Setup Wizard**
   - Auto-generate all content based on basic info
   - Suggest optimal pricing
   - Create targeted guest profiles

2. **Dynamic Content**
   - Seasonal updates
   - Event-based recommendations
   - Weather-aware suggestions

3. **Guest Communication**
   - Auto-reply to common questions
   - Translate messages
   - Generate review responses

## Next Steps

1. Test the API endpoints in `/pages/api/generate-description.ts`
2. Add Gemini-powered features to the guide editor
3. Create templates for different property types
4. Build the AI assistant chat widget