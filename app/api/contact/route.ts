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

    // Create contact submission in Sanity
    if (!writeClient) {
      return NextResponse.json(
        { error: 'CMS client not available' },
        { status: 500 }
      );
    }

    const submission = await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      inquiryType: inquiryType || 'general',
      message,
      budgetRange: budgetRange || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
    });

    // Send notification email to hello@chickenpie.co
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'hello@chickenpie.co',
        subject: `New ${inquiryType || 'general'} inquiry from ${name}`,
        html: `
          <div style="font-family: 'Space Mono', monospace, sans-serif; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 40px 24px;">
            <div style="background: #000; padding: 16px 24px; margin-bottom: 24px;">
              <h1 style="font-family: 'Space Grotesk', sans-serif; color: #F5F1E8; font-size: 20px; text-transform: uppercase; margin: 0;">
                New Contact Submission
              </h1>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #000;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666; width: 120px;">Name</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #E74C3C;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666;">Type</td>
                <td style="padding: 8px 0;">${inquiryType || 'General'}</td>
              </tr>
              ${budgetRange ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666;">Budget</td>
                <td style="padding: 8px 0;">${budgetRange}</td>
              </tr>
              ` : ''}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fff; border: 2px solid #000;">
              <p style="font-size: 12px; text-transform: uppercase; color: #666; margin: 0 0 8px 0;">Message</p>
              <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #999; margin-top: 24px;">
              Submission ID: ${submission._id}
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails — submission is saved
    }

    return NextResponse.json(
      { success: true, submissionId: submission._id },
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
