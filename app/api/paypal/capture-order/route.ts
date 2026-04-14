import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

// PayPal capture — requires PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET env vars
// Falls back gracefully if not configured
export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });
    }

    // If PayPal env vars are missing, return a graceful error
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'PayPal not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.' },
        { status: 503 }
      );
    }

    // Get PayPal access token
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'PayPal auth failed' }, { status: 500 });
    }

    const { access_token } = await tokenRes.json();

    const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to capture PayPal order' }, { status: 500 });
    }

    const data = await res.json();

    // Post-purchase: send emails + update stock (non-blocking, skip if not configured)
    if (data.status === 'COMPLETED') {
      // Email sending would go here (requires RESEND_API_KEY)
      // Stock decrement would go here (requires writeClient)
    }

    return NextResponse.json({
      status: data.status,
      orderID: data.id,
      payer: data.payer,
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json({ error: 'Error capturing PayPal order' }, { status: 500 });
  }
}