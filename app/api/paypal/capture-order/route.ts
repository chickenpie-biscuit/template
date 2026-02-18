import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();

    const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('PayPal capture error:', text);
      return NextResponse.json({ error: 'Failed to capture PayPal order' }, { status: 500 });
    }

    const data = await res.json();

    // Log payer info (same pattern as existing Stripe webhook TODOs)
    console.log('PayPal payment captured:', {
      orderID: data.id,
      status: data.status,
      payer: data.payer?.email_address,
    });

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
