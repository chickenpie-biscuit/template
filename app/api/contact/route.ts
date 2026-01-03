import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

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
    const submission = await client.create({
      _type: 'contactSubmission',
      name,
      email,
      inquiryType: inquiryType || 'general',
      message,
      budgetRange: budgetRange || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
    });

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

