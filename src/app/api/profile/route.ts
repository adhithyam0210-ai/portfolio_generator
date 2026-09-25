import { NextResponse } from 'next/server';
import { INITIAL_PROFILE } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'alexrivera';

  return NextResponse.json({
    success: true,
    profile: {
      ...INITIAL_PROFILE,
      username,
    },
  });
}

export async function POST(request: Request) {
  try {
    const profileData = await request.json();
    return NextResponse.json({ success: true, profile: profileData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
