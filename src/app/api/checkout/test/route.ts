import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Checkout API is available',
    endpoints: {
      POST: '/api/checkout - Create new checkout',
      GET: '/api/checkout?orderId=xxx - Get checkout status'
    },
    status: 'ready'
  });
} 