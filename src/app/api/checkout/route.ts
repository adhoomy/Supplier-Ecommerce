import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { 
      items, 
      total, 
      shippingAddress, 
      paymentMethod = 'stripe' 
    } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Validate shipping address fields
    const requiredAddressFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredAddressFields) {
      if (!shippingAddress[field]) {
        return NextResponse.json(
          { error: `Shipping address ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Connect to database
    await connectDB();

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create order in database
    const orderData = {
      orderNumber,
      userId: session.user.id,
      items,
      total,
      status: 'pending',
      shippingAddress,
      paymentDetails: {
        status: 'pending',
        amount: total,
        currency: 'usd'
      }
    };

    const order = new Order(orderData);
    await order.save();

    // Create payment intent if using Stripe
    if (paymentMethod === 'stripe') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            orderId: order._id.toString(),
            orderNumber: orderNumber,
            userId: session.user.id
          },
          automatic_payment_methods: {
            enabled: true,
          },
        });

        // Update order with payment intent ID
        await Order.findByIdAndUpdate(order._id, {
          'paymentDetails.stripePaymentIntentId': paymentIntent.id
        });

        return NextResponse.json({
          success: true,
          orderId: order._id,
          orderNumber: orderNumber,
          paymentIntent: {
            id: paymentIntent.id,
            clientSecret: paymentIntent.client_secret
          }
        });
      } catch (stripeError) {
        // If Stripe fails, update order status
        await Order.findByIdAndUpdate(order._id, {
          status: 'cancelled',
          'paymentDetails.status': 'failed'
        });

        return NextResponse.json(
          { error: 'Payment processing failed' },
          { status: 500 }
        );
      }
    }

    // For non-Stripe payments (future implementation)
    return NextResponse.json({
      success: true,
      orderId: order._id,
      orderNumber: orderNumber
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout processing failed' },
      { status: 500 }
    );
  }
}

// Get checkout status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Ensure user can only access their own orders
    if (order.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        items: order.items,
        paymentDetails: order.paymentDetails,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error('Get checkout status error:', error);
    return NextResponse.json(
      { error: 'Failed to get checkout status' },
      { status: 500 }
    );
  }
} 