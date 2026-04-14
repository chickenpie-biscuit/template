import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import { resend, FROM_EMAIL } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, message, budgetRange } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create contact submission in Sanity (optional — writeClient may be null without CMS)
    if (writeClient) {
      await writeClient.create({
        _type: 'contactSubmission',
        name,
        email,
        inquiryType: inquiryType || 'general',
        message,
        budgetRange: budgetRange || '',
        status: 'new',
        submittedAt: new Date().toISOString(),
      });
    }

    // Send notification email (if Resend is configured)
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: 'hello@template.dev',
          subject: `New ${inquiryType || 'general'} inquiry from ${name}`,
          html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 40px 24px;">
            <h1 style="font-size: 20px; text-transform: uppercase; margin-bottom: 24px;">
              New Contact Submission
            </h1>
            <table style="width: 100%; font-size: 14px;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Type</td><td style="padding: 8px 0;">${inquiryType || 'General'}</td></tr>
              ${budgetRange ? `<tr><td style="padding: 8px 0; font-weight: bold;">Budget</td><td style="padding: 8px 0;">${budgetRange}</td></tr>` : ''}
            </table>
            <p style="margin-top: 24px; white-space: pre-wrap;">${message}</p>
          </div>
        `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails — submission is saved
      }
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}