# Cloudinary Setup for Product Image Uploads

## Setup Instructions

1. **Create a Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
   - Verify your email address

2. **Get Your Credentials**
   - After logging in, go to your Dashboard
   - Copy your Cloud Name, API Key, and API Secret

3. **Add Environment Variables**
   Add the following to your `.env.local` file:

   ```
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Replace the placeholder values**
   - `your_cloudinary_cloud_name`: Your Cloudinary cloud name
   - `your_cloudinary_api_key`: Your Cloudinary API key
   - `your_cloudinary_api_secret`: Your Cloudinary API secret

## Features

- **Image Upload**: Admins can upload multiple images per product
- **Drag & Drop**: Easy image upload interface
- **Image Preview**: See uploaded images before saving
- **Image Removal**: Remove individual images from products
- **Automatic Optimization**: Cloudinary automatically optimizes uploaded images

## Usage

1. Go to the Admin Dashboard
2. Click on "Product Management" tab
3. Click "Add Product" or edit an existing product
4. Use the image upload area to add product images
5. Images will be automatically uploaded to Cloudinary and optimized

## Security

- Only authenticated admins can upload images
- File type validation (images only)
- Secure upload to Cloudinary's CDN
- Images are stored in a dedicated folder for your application 