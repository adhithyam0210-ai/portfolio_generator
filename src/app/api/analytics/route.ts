import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, event } = await request.json();
    return NextResponse.json({ success: true, logged: { username, event, timestamp: new Date() } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 });
  }
}
