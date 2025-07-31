# MongoDB Atlas Setup Guide

This guide will help you connect your Next.js e-commerce application to MongoDB Atlas.

## Prerequisites

1. A MongoDB Atlas account (free tier available)
2. Node.js and npm installed
3. This project set up

## Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up or log in to your account
3. Create a new project (or use existing)
4. Create a new cluster (M0 Free tier is sufficient for development)
5. Choose your preferred cloud provider and region

## Step 2: Configure Database Access

1. In the Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these securely)
5. Select "Read and write to any database" for permissions
6. Click "Add User"

## Step 3: Configure Network Access

1. In the Atlas dashboard, go to "Network Access"
2. Click "Add IP Address"
3. For development, you can add `0.0.0.0/0` to allow all IPs
4. For production, add your specific IP addresses
5. Click "Confirm"

## Step 4: Get Connection String

1. In the Atlas dashboard, click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "5.0 or later"
4. Copy the connection string

## Step 5: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace `your_mongodb_atlas_connection_string_here` with your actual connection string
3. The connection string should look like:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   ```

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/api/test-db` to test the connection

3. You should see a success message if everything is configured correctly

## API Endpoints

### Test Database Connection
- **GET** `/api/test-db` - Test MongoDB Atlas connection

### Products
- **GET** `/api/products` - Get all active products
- **POST** `/api/products` - Create a new product

## Sample Product Data

To test creating a product, send a POST request to `/api/products` with this sample data:

```json
{
  "name": "Sample Product",
  "description": "This is a sample product description",
  "price": 29.99,
  "category": "electronics",
  "images": ["https://example.com/image1.jpg"],
  "stock": 100
}
```

## Troubleshooting

### Common Issues:

1. **Connection Timeout**: Check your network access settings in Atlas
2. **Authentication Failed**: Verify your database username and password
3. **Environment Variables**: Make sure `.env.local` is in your project root
4. **CORS Issues**: Ensure your API routes are properly configured

### Environment Variables Checklist:

- [ ] `MONGODB_URI` is set in `.env.local`
- [ ] Connection string includes username and password
- [ ] Database name is specified in the URI
- [ ] Network access allows your IP address

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use environment-specific connection strings**
3. **Implement proper authentication and authorization**
4. **Use MongoDB Atlas VPC peering for production**
5. **Regularly rotate database passwords**

## Next Steps

1. Create more models (User, Order, Category, etc.)
2. Implement authentication
3. Add data validation middleware
4. Set up indexes for better performance
5. Implement caching strategies 