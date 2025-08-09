# SupplierHub - Business Supplies E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, TypeScript, and Tailwind CSS for business supplies and equipment. Features a complete shopping experience with authentication, cart management, payment processing, and admin panel.

## ✨ Features

- 🛒 **Shopping Cart** - Add items, manage quantities, and checkout
- 🔐 **Authentication** - Secure user registration and login with NextAuth.js
- 💳 **Payment Processing** - Stripe integration for secure payments
- 👨‍💼 **Admin Panel** - Product management, order tracking, user management
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional interface with Gumroad-style design
- ⚡ **Fast Performance** - Optimized for speed with Next.js 15
- 🗄️ **Database** - MongoDB with Mongoose for data persistence
- 🖼️ **Image Upload** - Cloudinary integration for product images

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with JWT
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **State Management**: Zustand
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/supplier-ecommerce.git
   cd supplier-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   
   # Stripe (for payments)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Seed the database** (optional)
   Visit `http://localhost:3000/api/seed` to populate the database with sample products.

6. **Set up admin user** (optional)
   Visit `http://localhost:3000/setup-admin` to create an admin account.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── admin/             # Admin panel
│   ├── products/          # Product pages
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── auth/             # Authentication components
│   ├── cart/             # Shopping cart components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── store/                # Zustand state management
└── types/                # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | ✅ |
| `NEXTAUTH_URL` | Base URL for NextAuth.js | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

### Database Setup

1. Create a MongoDB database (MongoDB Atlas recommended)
2. Get your connection string
3. Add it to your environment variables

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add them to your environment variables

### Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Add them to your environment variables

## 🚀 Deployment

### Vercel Deployment

1. **Connect to GitHub**
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Set environment variables**
   - Add all environment variables in Vercel dashboard
   - Use production URLs (e.g., `https://your-domain.vercel.app`)

3. **Deploy**
   - Vercel will automatically build and deploy your app
   - Each push to main branch triggers a new deployment

### Post-Deployment Setup

1. **Seed the database**
   Visit `https://your-domain.vercel.app/api/seed` to add sample products

2. **Create admin user**
   Visit `https://your-domain.vercel.app/setup-admin` to create admin account

## 🔐 Authentication

The app uses NextAuth.js with JWT strategy:

- **User Registration**: Email/password registration
- **User Login**: Email/password authentication
- **Role-based Access**: User, Admin roles
- **Session Management**: Automatic session handling

## 🛒 Shopping Features

- **Product Browsing**: View all products with filtering
- **Product Details**: Detailed product pages with images
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Secure payment processing with Stripe
- **Order Management**: Track order status and history

## 👨‍💼 Admin Features

- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: View user accounts and roles
- **Dashboard**: Overview of sales and activity

## 🐛 Recent Fixes

- ✅ Fixed API response format for Vercel deployment
- ✅ Resolved authentication issues on product detail pages
- ✅ Updated middleware configuration for proper route protection
- ✅ Converted product detail page to client-side rendering
- ✅ Fixed header component integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the environment variables are set correctly
2. Ensure MongoDB is accessible
3. Verify Stripe and Cloudinary credentials
4. Check the browser console for errors

For additional help, please open an issue on GitHub.

---

**Last Updated**: December 2024 - Fixed authentication and deployment issues
