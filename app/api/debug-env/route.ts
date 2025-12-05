import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.GOOGLE_REFRESH_TOKEN || '';

  return NextResponse.json({
    hasToken: !!token,
    tokenLength: token.length,
    tokenPrefix: token.substring(0, 10),
    tokenSuffix: token.substring(token.length - 10),
    hasClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'not set',
  });
}
