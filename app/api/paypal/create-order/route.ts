import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();

    // Build PayPal line items and calculate total
    const lineItems = items.map((item: { name: string; price: number; quantity: number }) => ({
      name: item.name,
      unit_amount: {
        currency_code: 'USD',
        value: item.price.toFixed(2),
      },
      quantity: String(item.quantity || 1),
    }));

    const total = items
      .reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * (item.quantity || 1), 0)
      .toFixed(2);

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: lineItems,
          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total,
              },
            },
          },
        },
      ],
    };

    const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('PayPal create order error:', text);
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
    }

    const order = await res.json();
    return NextResponse.json({ orderID: order.id });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json({ error: 'Error creating PayPal order' }, { status: 500 });
  }
}
