import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

/**
 * POST /api/track
 * 
 * Registra uma visita no Appwrite com dados de geolocalização.
 * Chamado pelo client-side ao carregar qualquer página.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, page, referrer } = body;

    if (!visitorId || !page) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Pegar IP real do visitante
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '0.0.0.0';

    // Geolocalização via ip-api.com (free, sem auth, 45req/min)
    let geoData = { city: 'Desconhecida', country: '??', region: '', timezone: '' };
    if (ip !== '127.0.0.1' && ip !== '::1' && ip !== '0.0.0.0') {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=city,country,regionName,timezone&lang=pt-BR`,
          { cache: 'no-store' }
        );
        if (geoRes.ok) {
          const geo = await geoRes.json();
          geoData = {
            city: geo.city || 'Desconhecida',
            country: geo.country || '??',
            region: geo.regionName || '',
            timezone: geo.timezone || '',
          };
        }
      } catch {
        // Falha silenciosa: continua sem geo
      }
    }

    // User-Agent (truncado por segurança)
    const userAgent = (req.headers.get('user-agent') || '').slice(0, 250);

    // Salvar no Appwrite usando node-appwrite (server-side com API key)
    const appwriteClient = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    const databases = new Databases(appwriteClient);

    await databases.createDocument(
      'main',
      'visits',
      ID.unique(),
      {
        visitorId,
        ip,
        city: geoData.city,
        country: geoData.country,
        region: geoData.region,
        timezone: geoData.timezone,
        page,
        referrer: referrer || '',
        userAgent,
        visitedAt: new Date().toISOString(),
      },
      [
        Permission.read(Role.users()), // Permitir que usuários logados (painel) leiam
        Permission.delete(Role.users()),
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[/api/track] Error:', error.message);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
