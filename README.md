# SupplierHub - Business Supplies E-commerce Platform

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS for business supplies and equipment.

## Features

- 🛒 **Shopping Cart** - Add items and manage quantities
- 🔐 **Authentication** - Secure user registration and login
- 💳 **Payment Processing** - Stripe integration for secure payments
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional interface
- ⚡ **Fast Performance** - Optimized for speed

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Payments**: Stripe
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

## Environment Variables

Required environment variables for full functionality:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Deployment

This project is configured for easy deployment on Vercel with automatic builds from GitHub.

---

**Latest Update**: Fixed ESLint configuration and deployment issues.
