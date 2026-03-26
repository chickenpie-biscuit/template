import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    if (!client) {
      return NextResponse.json({ count: 0 });
    }

    const count = await client.fetch<number>(
      `count(*[_type == "subscriber" && status == "active"])`
    );

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Subscriber count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
