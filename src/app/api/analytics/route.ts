import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { username, event } = await request.json();
    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const cleanUsername = username.toLowerCase().trim();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (data && data.portfolio_json) {
        const profile = data.portfolio_json;
        if (!profile.analytics) {
          profile.analytics = { viewsCount: 0, resumeDownloads: 0, lastViewedAt: 'Just now' };
        }

        if (event === 'view') {
          profile.analytics.viewsCount = (Number(profile.analytics.viewsCount) || 0) + 1;
          profile.analytics.lastViewedAt = 'Just now';
        } else if (event === 'download') {
          profile.analytics.resumeDownloads = (Number(profile.analytics.resumeDownloads) || 0) + 1;
        }

        await supabase
          .from('profiles')
          .update({
            portfolio_json: profile,
            updated_at: new Date().toISOString(),
          })
          .eq('username', cleanUsername);

        return NextResponse.json({ success: true, analytics: profile.analytics });
      }
    }

    return NextResponse.json({ success: true, logged: { username, event, timestamp: new Date() } });
  } catch (error) {
    console.error('Error recording analytics:', error);
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username || !isSupabaseConfigured()) {
      return NextResponse.json({ viewsCount: 0, resumeDownloads: 0, lastViewedAt: 'No views yet' });
    }

    const { data } = await supabase
      .from('profiles')
      .select('portfolio_json')
      .eq('username', username.toLowerCase().trim())
      .maybeSingle();

    if (data?.portfolio_json?.analytics) {
      return NextResponse.json(data.portfolio_json.analytics);
    }

    return NextResponse.json({ viewsCount: 0, resumeDownloads: 0, lastViewedAt: 'No views yet' });
  } catch (error) {
    return NextResponse.json({ viewsCount: 0, resumeDownloads: 0, lastViewedAt: 'No views yet' });
  }
}
