# Dyar (ديار) - Property Rental Platform

A modern, dual-language (Arabic/English) property rental platform built with Next.js 15, Supabase, and Stripe.

## 🚀 Quick Start

1.  **Clone the repository**
2.  **Install dependencies**: `npm install`
3.  **Run development server**: `npm run dev`

## 🛠️ Deployment Guide (Step-by-Step)

### 1. Supabase Setup (Production)
1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  In the Project Settings -> API, copy your **Project URL** and **Anon Key**.
3.  Go to the **SQL Editor** and run the schema found in `supabase/schema.sql` to set up your tables and RLS policies.
4.  In **Storage**, create a new bucket named `listing-images` and make it public.

### 2. Stripe Setup
1.  Go to the [Stripe Dashboard](https://dashboard.stripe.com/) (Test Mode recommended first).
2.  Go to **Developers -> API keys** and copy your **Secret key** and **Publishable key**.

### 3. Vercel Deployment
1.  Push your code to a GitHub repository.
2.  Import the repository into [Vercel](https://vercel.com/).
3.  In the **Environment Variables** section, add the following keys:
    *   `NEXT_PUBLIC_SUPABASE_URL`: (From Supabase)
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (From Supabase)
    *   `STRIPE_SECRET_KEY`: (From Stripe)
    *   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (From Stripe)
    *   `NEXT_PUBLIC_SITE_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
4.  Click **Deploy**.

## 🌍 Localization
-   Arabic (RTL) & English (LTR) supported via `next-intl`.
-   Translation files located in `/messages`.

## 🎨 Technologies
-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS + shadcn/ui
-   **Database/Auth**: Supabase
-   **Payments**: Stripe
-   **Maps**: Leaflet (OpenStreetMap)
