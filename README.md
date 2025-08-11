# SupplierHub 🚀

A modern, full-stack e-commerce platform built for business supplies and equipment. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse products with filtering and search
- **Shopping Cart** - Add items, manage quantities, and checkout
- **Secure Checkout** - Stripe-powered payment processing
- **Order Management** - Track order status and history

### 🔐 Authentication & Security
- **User Registration** - Secure account creation with validation
- **NextAuth.js Integration** - JWT-based authentication
- **Role-Based Access** - User and Admin roles with proper permissions
- **Password Security** - Strong password requirements and validation
- **Password Recovery** - Secure password reset via email with token expiration

### 👨‍💼 Admin Panel
- **Product Management** - Add, edit, and delete products
- **Order Management** - View and update order status
- **User Management** - Monitor user accounts and roles
- **Database Management** - Secure seeding and clearing (development only)

### 🎨 User Interface
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, professional interface
- **Performance Optimized** - Fast loading with Next.js 15
- **Accessibility** - WCAG compliant components

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Authentication** | NextAuth.js with JWT |
| **Database** | MongoDB with Mongoose |
| **Payments** | Stripe |
| **State Management** | Zustand |
| **Image Storage** | Cloudinary |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **MongoDB** database
- **Stripe** account
- **Cloudinary** account

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

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3001
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Your app will be available at `http://localhost:3001`

5. **Initial Setup**
   - Visit `/setup-admin` to create your first admin account
   - This page is only accessible when no admin accounts exist

## 📁 Project Structure

```
supplier-ecommerce/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   │   ├── forgot-password/  # Password reset request
│   │   │   │   └── reset-password/   # Password reset confirmation
│   │   │   ├── products/      # Product management
│   │   │   ├── orders/        # Order processing
│   │   │   └── payment/       # Stripe integration
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── forgot-password/      # Password reset request page
│   │   │   └── reset-password/       # Password reset confirmation page
│   │   ├── admin/             # Admin panel
│   │   ├── products/          # Product pages
│   │   └── ...                # Other pages
│   ├── components/            # React components
│   │   ├── admin/            # Admin components
│   │   ├── cart/             # Shopping cart
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product components
│   │   └── ui/               # UI components
│   ├── hooks/                # Custom React hooks
│   │   └── usePasswordReset.ts # Password reset functionality
│   ├── lib/                  # Utility libraries
│   │   └── email.ts          # Email service utilities
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript definitions
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
└── next.config.ts            # Next.js configuration
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | `mongodb+srv://...` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | ✅ | `your-secret-key` |
| `NEXTAUTH_URL` | Base URL for NextAuth.js | ✅ | `http://localhost:3001` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ | `sk_test_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ | `your-api-secret` |

### Database Setup

1. **MongoDB Atlas** (Recommended)
   - Create a free cluster
   - Get your connection string
   - Add to environment variables

2. **Local MongoDB**
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/supplier-ecommerce`

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the dashboard
3. Add keys to environment variables
4. Configure webhook endpoints

### Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com)
2. Get your cloud name, API key, and secret
3. Add credentials to environment variables

### Email Service Setup (Optional)

For production password reset emails, configure one of these services:

1. **SendGrid**
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

2. **AWS SES**
   ```env
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   ```

3. **Nodemailer (SMTP)**
   ```env
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

**Note**: In development mode, password reset links are displayed in the UI for testing purposes.

## 🛡️ Security Features

### Database Protection
- **Admin-Only Seeding** - Database seeding requires admin authentication
- **Production Safety** - Seeding automatically disabled in production
- **Confirmation Required** - Destructive operations need explicit confirmation

### Authentication Security
- **Strong Passwords** - Enforced password requirements
- **Email Validation** - Comprehensive email verification
- **Role-Based Access** - Strict permission controls
- **Session Management** - Secure JWT handling
- **Password Recovery** - Secure token-based password reset with 1-hour expiration

### API Security
- **Middleware Protection** - Critical routes protected by auth
- **Input Validation** - All user inputs validated and sanitized
- **Rate Limiting** - Protection against abuse
- **CORS Configuration** - Proper cross-origin handling

## 🔐 Password Recovery System

The platform includes a comprehensive password recovery system that allows users to securely reset their passwords when logged out.

### How It Works

1. **Password Reset Request**
   - User visits `/auth/forgot-password`
   - Enters their email address
   - System generates a secure, time-limited reset token
   - Reset link is sent via email (or displayed in development mode)

2. **Password Reset Process**
   - User clicks the reset link from their email
   - Link contains a secure token with 1-hour expiration
   - User enters and confirms new password
   - System validates token and updates password
   - User is redirected to login page

### Security Features

- **Token Expiration**: Reset tokens expire after 1 hour
- **Single Use**: Tokens are invalidated after password reset
- **Secure Generation**: Uses cryptographically secure random tokens
- **Email Verification**: Tokens are only sent to registered email addresses
- **No User Enumeration**: System doesn't reveal if an email exists

### Development vs Production

- **Development Mode**: Reset links are displayed in the UI for testing
- **Production Mode**: Reset links are sent via email service
- **Email Service**: Ready for integration with SendGrid, AWS SES, or Nodemailer

### API Endpoints

- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Confirm password reset

### Custom Hook

The `usePasswordReset` hook provides a clean interface for managing password reset state and API calls:

```typescript
const { isLoading, message, error, resetUrl, requestPasswordReset, resetPassword } = usePasswordReset();
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git push origin main
   
   # Connect to Vercel
   # Import your GitHub repository
   ```

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Use production URLs (e.g., `https://your-domain.vercel.app`)

3. **Deploy**
   - Vercel automatically builds and deploys
   - Each push to main triggers deployment

### Post-Deployment

1. **Create Admin Account**
   - Visit `/setup-admin` to create initial admin
   - Only works when no admin accounts exist

2. **Verify Setup**
   - Check all environment variables are set
   - Test authentication and payment flows
   - Verify database connections

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🆘 Support

### Common Issues

1. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify values are correct

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Check network connectivity
   - Ensure database user has proper permissions

3. **Authentication Issues**
   - Verify NextAuth configuration
   - Check session handling
   - Ensure proper redirect URLs

### Getting Help

- **GitHub Issues** - Report bugs and request features
- **Documentation** - Check this README and code comments
- **Community** - Join our Discord/community channels

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **Tailwind CSS** - For the utility-first CSS framework
- **Stripe** - For secure payment processing
- **Cloudinary** - For image management

---

**Last Updated**: December 2024  
**Version**: 0.1.0  
**Maintainer**: SupplierHub Team

---

<div align="center">
  <p>Made with ❤️ by the SupplierHub Team</p>
  <p>If this project helps you, please give it a ⭐</p>
</div>
