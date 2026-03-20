'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * TrackVisit — Componente invisível que registra cada acesso ao portfolio.
 *
 * - Gera um visitorId único persistido em localStorage (identifica o usuário)
 * - Envia para /api/track que captura IP + geolocalização server-side
 * - Dispara apenas 1x por sessão por página (sessionStorage como guard)
 */
export default function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    // Gerar ou ler visitorId persistente
    let visitorId = localStorage.getItem('_vid');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('_vid', visitorId);
    }

    // Evitar duplo-registro na mesma sessão para a mesma página
    const sessionKey = `_tracked_${pathname}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, '1');

    // Enviar para API de tracking (fire-and-forget, não bloqueia a UI)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        page: pathname,
        referrer: document.referrer || '',
      }),
    }).catch(() => {}); // Falha silenciosa — não impacta a experiência

  }, [pathname]);

  return null; // Invisível — sem renderização de HTML
}
