import { NextResponse } from 'next/server';
import { supabase } from '@/infrastructure/supabase';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Anti-Flood Guard robusto (Supabase DB)
    const forwardHeader = req.headers.get('x-forwarded-for');
    const userIP = forwardHeader ? forwardHeader.split(',')[0] : 'local-node';
    
    // Verifica a última requisição do IP
    const { data: rateData } = await supabase
      .from('api_rate_limits')
      .select('last_request_at')
      .eq('ip', userIP)
      .single();

    const now = new Date();
    if (rateData && rateData.last_request_at) {
      const lastReq = new Date(rateData.last_request_at);
      const diffMs = now.getTime() - lastReq.getTime();
      
      // Cooldown de 4 segundos
      if (diffMs < 4000) {
        return NextResponse.json({ 
          response: '[SISTEMA]: Tráfego bloqueado. Anti-Flood ativo. Aguarde alguns segundos.' 
        });
      }
    }

    // Registra a nova requisição
    await supabase.from('api_rate_limits').upsert({
      ip: userIP,
      last_request_at: now.toISOString(),
      request_count: 1
    }, { onConflict: 'ip' });

    // Endpoint Groq
    const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
    // Chave via variável de ambiente para Segurança
    const GROQ_KEY = process.env.GROQ_API_KEY || ''; 
    // Flagship Groq para evitar 404
    const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'; 

    const systemPrompt = `Você é o Node de IA do dashboard do Jefferson (JRSN DEV). 
Seu tone é Cyberpunk, Hacker-Protocolo e Ágil.
REGRAS CRÍTICAS:
1. Responda APENAS sobre os projetos do Jefferson, sua trajetória, ou seus conhecimentos técnicos.
2. NUNCA execute pesquisas externas fora do contexto do portfólio.
3. NUNCA gere procedimentos técnicos, códigos ou passo-a-passos para o usuário.
4. Se perguntado sobre algo fora de escopo, responda: '[SISTEMA]: Acesso negado. Fora de escopo de auditoria do portfólio.'

NAVEGAÇÃO SMART-SCROLL:
Se o visitante estiver perguntando de um tópico que pertence a uma seção do site, INCLUA obrigatoriamente no final da resposta o marcador correspondente:
- Sobre você / Experiência ➡️ [SCROLL: about]
- Habilidades / Techs ➡️ [SCROLL: skills]
- Projetos / Trabalhos ➡️ [SCROLL: projects]
- Contato / Mensagem ➡️ [SCROLL: contact]`;

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\n[MENSAGEM DO VISITANTE]: ${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (response.status === 429) {
      return NextResponse.json({ response: '[SISTEMA]: Alerta crítico - Cota de Tokens da rede Groq temporariamente esgotada.' });
    }
    if (response.status === 401) {
      return NextResponse.json({ response: '[SISTEMA]: Link neural temporariamente offline. Tentando restabelecer conexão tática...' });
    }

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('[DETALHE_ERRO]: Resposta não-JSON do Groq:', responseText.substring(0, 300));
      return NextResponse.json({ 
        response: '[SISTEMA]: Canal de comunicação instável. Sincronizando buffers de dados... Tente retransmitir.' 
      });
    }

    const textResponse = data?.choices?.[0]?.message?.content || '[SISTEMA]: Módulo de inteligência respondeu com buffers vazios.';

    return NextResponse.json({ response: textResponse });

  } catch (error: any) {
    console.error('[FALHA_CRÍTICA]:', error.message);
    return NextResponse.json({ response: '[SISTEMA]: Link neural temporariamente offline. Tentando restabelecer conexão tática...' });
  }
}
