# StayGuide Pro - Feature Prototype

A SaaS platform for Airbnb hosts to create digital guest guides with smart email capture and direct booking features.

## Features Demonstrated

### 1. Guest Guide Editor (Host View)
- Visual block editor for easy content management
- Drag-and-drop interface
- Pre-built blocks: WiFi, House Rules, Videos, Email Capture, Book Direct
- Live preview mode
- Multiple property support

### 2. Guest PWA Experience
- Mobile-first design
- "Add to Home Screen" prompt
- Expandable sections for better UX
- Email capture integrated into WiFi flow
- Direct booking CTAs
- Works offline after first load

### 3. Email Capture & Marketing Flow
- Multiple capture points with conversion rates
- Automated email sequence
- Guest database management
- Performance analytics
- ROI tracking

## Key Innovations

1. **Smart Email Capture**: WiFi access requires email (92% conversion)
2. **PWA Technology**: Feels like a native app, works offline
3. **Direct Booking Integration**: Convert OTA guests to direct bookers
4. **Professional Invoicing**: Hotel-quality folios (like Four Seasons)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Email**: SendGrid/Resend
- **Payments**: Stripe

## Business Model

- **Free**: 1 property, basic features
- **Pro ($29/mo)**: Unlimited properties, email capture, analytics
- **Business ($79/mo)**: + Direct booking site, marketing automation

## Next Steps

1. Set up Supabase database
2. Implement authentication
3. Add Stripe payments
4. Create email templates
5. Build admin dashboard
6. Add multi-tenancy support