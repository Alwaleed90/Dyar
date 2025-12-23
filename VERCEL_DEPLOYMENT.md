# Vercel Deployment Guide

This guide explains how to "upload" (deploy) your Dyar project to Vercel and ensure all production features (like image uploads and payments) work correctly.

## 1. Deployment Methods

### Method A: GitHub Integration (Recommended)
This is the standard way to "upload" your project. Vercel will automatically deploy every time you push to your repository.

1.  **Push your code** to a private or public GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub repository.
5.  **Configure Environment Variables** (Critical Step - See Section 2).
6.  Click **"Deploy"**.

### Method B: Vercel CLI
If you want to upload directly from your terminal without using GitHub:

1.  Install the CLI: `npm i -g vercel`
2.  Login: `vercel login`
3.  Run deployment: `vercel` (follow the prompts)
4.  For production: `vercel --prod`

---

## 2. Required Environment Variables
For the **Image Upload** and **Payment** methods to work on Vercel, you *must* add these in the Vercel Project Settings:

| Variable | Source | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Settings | Core DB & Storage connectivity |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Settings | Client-side DB access |
| `STRIPE_SECRET_KEY` | Stripe Dashboard | Secure payment processing |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | Checkout UI integration |
| `NEXT_PUBLIC_SITE_URL` | Vercel Deployment URL | Redirects after payment/auth |

---

## 3. How "Image Uploads" work on Vercel
Even though your app is hosted on Vercel, images are uploaded to **Supabase Storage**. Standard Vercel Serverless Functions have a 4.5MB payload limit. To ensure smooth uploads:

1.  **Direct Upload**: Our implementation uses the Supabase Browser Client to upload directly from the user's browser to Supabase. This bypasses Vercel's server limits, making it much faster and reliable.
2.  **Bucket Access**: Ensure your `listing-images` bucket in Supabase is set to **Public**.

---

## 4. Next.js 15 Specifics
- **Middleware**: Vercel handles the `next-intl` middleware automatically.
- **Caching**: Vercel's Data Cache works with our Supabase queries to ensure high performance.
