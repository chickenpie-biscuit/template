import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, PAYPAL_BASE_URL } from '@/lib/paypal';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { writeClient } from '@/sanity/lib/client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { orderID, items } = await req.json();

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

    console.log('PayPal payment captured:', {
      orderID: data.id,
      status: data.status,
      payer: data.payer?.email_address,
    });

    // Post-purchase: send emails and update stock (non-blocking)
    if (data.status === 'COMPLETED') {
      const cartItems: CartItem[] = items || [];
      const payerEmail = data.payer?.email_address;
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Send confirmation email to buyer
      if (payerEmail) {
        sendOrderConfirmationEmail(payerEmail, data.id, cartItems, total).catch((err) =>
          console.error('Failed to send buyer confirmation email:', err)
        );
      }

      // Notify hello@chickenpie.co of the sale
      sendSaleNotificationEmail(data.id, payerEmail, cartItems, total).catch((err) =>
        console.error('Failed to send sale notification email:', err)
      );

      // Decrement stock in Sanity
      decrementStock(cartItems).catch((err) =>
        console.error('Failed to decrement stock:', err)
      );
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

async function sendOrderConfirmationEmail(
  email: string,
  orderID: string,
  items: CartItem[],
  total: number
) {
  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8E0D0; font-size: 14px;">
          ${item.name}${item.size ? ` (${item.size})` : ''} &times; ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8E0D0; font-size: 14px; text-align: right;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join('');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Order Confirmed - Chickenpie #${orderID.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: 'Space Mono', monospace, sans-serif; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 40px 24px;">
        <div style="background: #000; padding: 20px 24px; margin-bottom: 24px;">
          <h1 style="font-family: 'Space Grotesk', sans-serif; color: #F5F1E8; font-size: 24px; text-transform: uppercase; margin: 0;">
            Order Confirmed!
          </h1>
        </div>
        <p style="font-size: 16px; color: #000; line-height: 1.6; margin-bottom: 24px;">
          Thanks for your order! Here's a summary of what you got:
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemRows}
          <tr>
            <td style="padding: 16px 0; font-weight: bold; font-size: 16px; text-transform: uppercase;">Total</td>
            <td style="padding: 16px 0; font-weight: bold; font-size: 16px; text-align: right;">$${total.toFixed(2)}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #666; margin-top: 24px;">
          Order ID: ${orderID}
        </p>
        <p style="font-size: 14px; color: #000; margin-top: 24px; line-height: 1.6;">
          Questions? Reply to this email or hit us at
          <a href="mailto:hello@chickenpie.co" style="color: #E74C3C;">hello@chickenpie.co</a>
        </p>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 2px solid #E8E0D0;">
          <a href="https://www.chickenpie.co" style="color: #666; font-size: 12px; text-decoration: underline;">chickenpie.co</a>
        </div>
      </div>
    `,
  });
}

async function sendSaleNotificationEmail(
  orderID: string,
  payerEmail: string | undefined,
  items: CartItem[],
  total: number
) {
  const itemList = items.map((i) => `${i.name}${i.size ? ` (${i.size})` : ''} x${i.quantity}`).join(', ');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: 'hello@chickenpie.co',
    subject: `New Sale! $${total.toFixed(2)} - #${orderID.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 40px 24px;">
        <div style="background: #4ECDC4; padding: 16px 24px; margin-bottom: 24px;">
          <h1 style="color: #000; font-size: 20px; text-transform: uppercase; margin: 0;">New Sale!</h1>
        </div>
        <p><strong>Order:</strong> ${orderID}</p>
        <p><strong>Buyer:</strong> ${payerEmail || 'Unknown'}</p>
        <p><strong>Items:</strong> ${itemList}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      </div>
    `,
  });
}

async function decrementStock(items: CartItem[]) {
  if (!writeClient || items.length === 0) return;

  for (const item of items) {
    try {
      // Look up product by slug (cart stores id as slug)
      const product = await writeClient.fetch<{ _id: string; stock: number } | null>(
        `*[_type == "product" && slug.current == $slug][0]{ _id, stock }`,
        { slug: item.id } as any
      );

      if (product && product.stock > 0) {
        const newStock = Math.max(0, product.stock - item.quantity);
        await writeClient.patch(product._id).set({ stock: newStock }).commit();
      }
    } catch (err) {
      console.error(`Failed to decrement stock for ${item.id}:`, err);
    }
  }
}
