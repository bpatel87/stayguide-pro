# Deployment Instructions

## GitHub Repository
✅ Your code is now on GitHub at: https://github.com/bpatel87/stayguide-pro

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Connect your GitHub account if not already connected
4. Select the `stayguide-pro` repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./ (leave as is)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Click "Deploy"

Your app will be live in about 1-2 minutes!

### Option 2: Deploy via CLI

If you want to use the Vercel CLI:

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables (Future)

When you add Supabase/Stripe, add these in Vercel Dashboard > Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## Custom Domain

After deployment, you can add a custom domain:
1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., stayguide.pro)

## Automatic Deployments

Every push to the `main` branch will trigger a new deployment automatically!