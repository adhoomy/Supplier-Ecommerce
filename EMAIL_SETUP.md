# 📧 Email Setup Guide

This guide explains how to set up email functionality for the password recovery feature.

## 🚀 Quick Setup (Recommended for Development)

### Option 1: Gmail SMTP (Easiest)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Add to your `.env.local`**:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-digit-app-password
   ```

### Option 2: Other SMTP Services

Add these to your `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

## 🔧 Testing Email Functionality

1. **Start your development server**: `npm run dev`
2. **Go to**: `/auth/forgot-password`
3. **Enter your email** and submit
4. **Check your email** for the password reset link

## 📝 Console Logging (Fallback)

If no email credentials are configured, the system will:
- Log email details to the console
- Display the reset link in the UI (development only)
- Show helpful setup instructions

## 🚨 Troubleshooting

### "Gmail credentials not found" warning
- Check that `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in `.env.local`
- Restart your development server after adding environment variables

### "Authentication failed" error
- Verify your Gmail app password is correct
- Ensure 2FA is enabled on your Gmail account
- Check that you're using the app password, not your regular password

### Emails not sending
- Check the console for error messages
- Verify your internet connection
- Ensure your Gmail account allows "less secure app access" (if not using app passwords)

## 🌐 Production Deployment

For production, configure one of these services:

- **SendGrid**: `SENDGRID_API_KEY=your_key`
- **AWS SES**: Use SMTP settings from AWS console
- **Nodemailer**: Configure with your SMTP provider

## 📚 Additional Resources

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Documentation](https://nodemailer.com/)
- [SendGrid Setup](https://sendgrid.com/docs/for-developers/sending-email/v3-nodejs-code-example/)
