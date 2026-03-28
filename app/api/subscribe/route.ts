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

    if (!writeClient) {
      return NextResponse.json(
        { error: 'CMS write client not available' },
        { status: 500 }
      );
    }

    // Check if already subscribed
    const existing = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email: email.toLowerCase() }
    );

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'already_subscribed', message: "You're already part of the flock!" },
          { status: 409 }
        );
      }
      // Re-subscribe
      const newToken = crypto.randomBytes(32).toString('hex');
      await writeClient
        .patch(existing._id)
        .set({
          status: 'active',
          unsubscribeToken: newToken,
          unsubscribedAt: undefined,
          subscribedAt: new Date().toISOString(),
        })
        .commit();

      await sendWelcomeEmail(email, name || '', newToken);

      return NextResponse.json({ success: true, message: 'Welcome back to the flock!' });
    }

    // Create new subscriber
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    await writeClient.create({
      _type: 'subscriber',
      email: email.toLowerCase(),
      name: name || '',
      status: 'active',
      source: source || 'header',
      subscribedAt: new Date().toISOString(),
      unsubscribeToken,
    });

    await sendWelcomeEmail(email, name || '', unsubscribeToken);

    return NextResponse.json({ success: true, message: "You've joined the flock!" });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

async function sendWelcomeEmail(email: string, name: string, unsubscribeToken: string) {
  const unsubscribeUrl = `https://www.chickenpie.co/api/unsubscribe?token=${unsubscribeToken}`;
  const greeting = name ? `Hey ${name}` : 'Hey there';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to the Flock! 🐔",
      html: `
        <div style="font-family: 'Space Mono', monospace, sans-serif; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 40px 24px;">
          <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: bold; text-transform: uppercase; color: #000; margin-bottom: 16px;">
            ${greeting},
          </h1>
          <p style="font-size: 16px; color: #000; line-height: 1.6; margin-bottom: 24px;">
            Welcome to the Chickenpie flock! Every week, you'll get a peek behind the curtain of our AI journey — what we're building, breaking, and learning along the way.
          </p>
          <p style="font-size: 16px; color: #000; line-height: 1.6; margin-bottom: 24px;">
            Expect stories about design, tech experiments, creative chaos, and the occasional recipe. No spam, just good vibes and real talk.
          </p>
          <div style="background: #000; padding: 24px; margin: 32px 0;">
            <p style="color: #F5F1E8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              See you in the next edition ✨
            </p>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 32px;">
            <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a> ·
            <a href="https://www.chickenpie.co" style="color: #666; text-decoration: underline;">chickenpie.co</a>
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}
