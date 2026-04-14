import { NextRequest, NextResponse } from 'next/server';
import { client, writeClient } from '@/sanity/lib/client';
import { resend, FROM_EMAIL } from '@/lib/resend';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Optionally create subscriber in Sanity (skips if writeClient is null)
    if (writeClient) {
      const unsubscribeToken = crypto.randomBytes(32).toString('hex');
      const existing = await writeClient.fetch(
        `*[_type == "subscriber" && email == $email][0]`,
        { email: email.toLowerCase() }
      ).catch(() => null);

      if (existing) {
        if (existing.status !== 'active') {
          await writeClient
            .patch(existing._id)
            .set({ status: 'active', unsubscribeToken })
            .commit()
            .catch(() => null);
        }
      } else {
        await writeClient.create({
          _type: 'subscriber',
          email: email.toLowerCase(),
          name: name || '',
          status: 'active',
          source: source || 'header',
          subscribedAt: new Date().toISOString(),
          unsubscribeToken,
        }).catch(() => null);
      }

      // Send welcome email (if Resend is configured)
      if (resend) {
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Welcome!',
            html: '<p>Thanks for subscribing!</p>',
          });
        } catch (e) {
          console.error('Failed to send welcome email:', e);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed!' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}