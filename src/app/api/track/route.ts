import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/infrastructure/supabase';

/**
 * Registra uma visita no Supabase com dados de geolocalização.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Capturar dados de IP e Geolocalização dos headers (Vercel ou padrão)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const country = req.headers.get('x-vercel-ip-country') || 'Localhost';
    const city = req.headers.get('x-vercel-ip-city') || 'Desconhecida';
    const region = req.headers.get('x-vercel-ip-region') || '';
    const loc = `${req.headers.get('x-vercel-ip-latitude') || ''},${req.headers.get('x-vercel-ip-longitude') || ''}`;
    const userAgent = req.headers.get('user-agent') || '';

    // Inserir no Supabase usando o client
    // Mapeando corretamente do payload enviado pelo TrackVisit.tsx
    const { error } = await supabase.from('visits').insert([{
      visitor_id: data.visitorId || 'anon',
      ip: ip,
      city: city,
      region: region,
      country: country,
      loc: loc !== ',' ? loc : '',
      org: '',
      pathname: data.page || '/', // TrackVisit.tsx envia 'page'
      referer: data.referrer || '', // TrackVisit.tsx envia 'referrer'
      user_agent: userAgent,
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
