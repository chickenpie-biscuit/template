import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return new NextResponse(unsubscribePage('Invalid unsubscribe link.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  try {
    if (!client) {
      return new NextResponse(unsubscribePage('Service unavailable.', false), {
        headers: { 'Content-Type': 'text/html' },
        status: 500,
      });
    }

    const subscriber = await client.fetch<any>(
      `*[_type == "subscriber" && unsubscribeToken == $token][0]`,
      { token } as any
    );

    if (!subscriber) {
      return new NextResponse(unsubscribePage('This link is invalid or has already been used.', false), {
        headers: { 'Content-Type': 'text/html' },
        status: 404,
      });
    }

    if (subscriber.status === 'unsubscribed') {
      return new NextResponse(unsubscribePage("You've already been unsubscribed.", true), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    await client
      .patch(subscriber._id)
      .set({
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString(),
      })
      .commit();

    return new NextResponse(unsubscribePage("You've been unsubscribed. We'll miss you! 🐔", true), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new NextResponse(unsubscribePage('Something went wrong. Please try again.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    });
  }
}

function unsubscribePage(message: string, success: boolean): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribe - Chickenpie</title>
  <style>
    body {
      font-family: 'Space Mono', monospace, sans-serif;
      background: #F5F1E8;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
    }
    .card {
      background: ${success ? '#000' : '#E74C3C'};
      color: #F5F1E8;
      padding: 48px;
      max-width: 480px;
      text-align: center;
      border: 2px solid #000;
    }
    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    p { font-size: 14px; line-height: 1.6; }
    a {
      display: inline-block;
      margin-top: 24px;
      color: #F5F1E8;
      text-decoration: underline;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>${message}</h1>
    <a href="https://www.chickenpie.co">Back to Chickenpie</a>
  </div>
</body>
</html>`;
}
