import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy de Segurança — Server-Side Session Guard (Next.js 16+)
 *
 * Protege todas as rotas /painel/* (exceto /painel/login)
 * verificando o cookie de sessão do Appwrite ANTES do Next.js
 * renderizar qualquer HTML do painel.
 */

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Só proteger rotas do painel (exceto a página de login)
  if (!pathname.startsWith('/painel') || pathname === '/painel/login') {
    return NextResponse.next();
  }

  // Pegar o cookie de sessão do Appwrite no request
  const sessionCookie =
    req.cookies.get(`a_session_${APPWRITE_PROJECT_ID}`)?.value ||
    req.cookies.get(`a_session_${APPWRITE_PROJECT_ID}_legacy`)?.value;

  if (!sessionCookie) {
    const isLocalhost = req.headers.get('host')?.includes('localhost') || req.headers.get('host')?.includes('127.0.0.1');
    
    // Se estiver em ambiente local e sem cookie (fallback localStorage),
    // o ProtectedWrapper client-side (layout.tsx) fará a validação com segurança.
    if (isLocalhost) {
      const res = NextResponse.next();
      res.headers.set('X-Frame-Options', 'DENY');
      res.headers.set('X-Content-Type-Options', 'nosniff');
      return res;
    }

    // Em produção, sem cookie → redirecionar server-side imediatamente
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/painel/login';
    return NextResponse.redirect(loginUrl);
  }

  // Verificar a sessão com a API do Appwrite
  try {
    const response = await fetch(`${APPWRITE_ENDPOINT}/account`, {
      headers: {
        'X-Appwrite-Project': APPWRITE_PROJECT_ID,
        'Cookie': `a_session_${APPWRITE_PROJECT_ID}=${sessionCookie}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/painel/login';
      return NextResponse.redirect(loginUrl);
    }

    // Sessão válida → permitir acesso com security headers extras
    const res = NextResponse.next();
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return res;
  } catch {
    const isLocalhost = req.headers.get('host')?.includes('localhost') || req.headers.get('host')?.includes('127.0.0.1');
    if (isLocalhost) {
      return NextResponse.next();
    }
    
    // Em caso de falha na verificação em produção, bloquear por precaução
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/painel/login';
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/painel/:path*'],
};
