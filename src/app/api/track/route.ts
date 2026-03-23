import { NextResponse } from 'next/server';
import { supabase } from '@/infrastructure/supabase';

/**
 * Registra uma visita no Supabase com dados de geolocalização.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Inserir no Supabase usando o client
    const { error } = await supabase.from('visits').insert([{
      visitor_id: data.visitorId || 'anon',
      ip: data.ip || '0.0.0.0',
      city: data.city || 'Desconhecida',
      region: data.region || '',
      country: data.country || '',
      loc: data.loc || '',
      org: data.org || '',
      pathname: data.pathname || '/',
      referer: data.referer || '',
      user_agent: data.userAgent || '',
      visited_at: new Date().toISOString()
    }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Visit tracked on Supabase' });

  } catch (error: any) {
    console.error('[/api/track] Error:', error);
    return NextResponse.json(
      { error: 'Tracking failed', details: error.message },
      { status: 500 }
    );
  }
}
