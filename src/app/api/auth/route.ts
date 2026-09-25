import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name, username } = body;

    if (action === 'signup') {
      const newUser = {
        id: 'usr_' + Date.now(),
        name: name || 'Student User',
        email,
        username: username?.toLowerCase() || 'student',
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, user: newUser, token: 'mock_jwt_token_portfolify' });
    }

    if (action === 'login') {
      const user = {
        id: 'usr_101',
        name: email.split('@')[0],
        email,
        username: email.split('@')[0].toLowerCase(),
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, user, token: 'mock_jwt_token_portfolify' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
