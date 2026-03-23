'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css, cx } from 'styled-system/css';
import { supabaseService } from '@/domain/services/supabaseService';

interface Message {
  role: 'user' | 'system' | 'ai';
  content: string;
  timestamp: string;
}

export default function TerminalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: '[SISTEMA]: Módulo neural assistente inicializado.', timestamp: new Date().toLocaleTimeString() },
    { role: 'ai', content: '[ALIAS]: Olá. Sou o protocolo de IA do Jefferson. Pergunte-me sobre sua stack, projetos ou disponibilidade.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      let aiResponseText = data.response;

      // Smart Scroll Handling
      const scrollMatch = aiResponseText.match(/\[SCROLL:\s*(\w+)\]/);
      if (scrollMatch) {
        const targetId = scrollMatch[1];
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Remove a tag do texto para não poluir o chat
        aiResponseText = aiResponseText.replace(/\[SCROLL:\s*\w+\]/g, '').trim();
      }

      const aiMsg: Message = { role: 'ai', content: aiResponseText, timestamp: new Date().toLocaleTimeString() };
      setMessages(prev => [...prev, aiMsg]);

      // Salva Log no Supabase (Silencioso em caso de erro)
      try {
        const res = await supabaseService.sendChatMessage({ prompt: input, response: aiResponseText });
        if (res && ((res as any).error === 'collection_missing' || (res as any).error === 'insert_failed')) {
          // Silencioso em caso de erro de configuração das tabelas
          return;
        }
      } catch (err) {
        console.error('Log Chat Error:', err);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'system', content: '[ERRO]: Conexão interrompida.', timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={css({
          position: 'fixed', bottom: 6, right: 6, zIndex: 100,
          w: 12, h: 12, rounded: 'full', bg: 'primary', color: 'black',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 230, 118, 0.4)',
          _hover: { filter: 'brightness(1.1)' }
        })}
        animate={{ scale: isOpen ? 0.9 : [1, 1.05, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 3 }}
      >
        <span className="material-symbols-outlined text-xl">terminal</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={cx(css({
              position: 'fixed', bottom: { base: 20, md: 24 }, right: { base: 4, md: 6 },
              w: { base: 'calc(100% - 32px)', md: '400px' }, h: '500px',
              bg: 'rgba(10, 10, 10, 0.95)', border: '1px solid rgba(0, 230, 118, 0.2)',
              rounded: '2px', zIndex: 99, display: 'flex', flexDir: 'column',
              overflow: 'hidden', backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
            }), 'glass-panel')}
          >
            {/* Header */}
            <div className={css({ p: 4, borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bg: 'rgba(0,0,0,0.3)' })}>
              <div className={css({ display: 'flex', alignItems: 'center', gap: 2 })}>
                <div className={css({ w: 2, h: 2, rounded: 'full', bg: 'primary', animation: 'pulse 2s infinite' })}></div>
                <span className={css({ fontFamily: 'label', fontSize: 'xs', color: 'primary', letterSpacing: '0.1em' })}>NODE.AGENT_V1</span>
              </div>
              <button onClick={() => setIsOpen(false)} className={css({ color: 'gray.400', cursor: 'pointer', _hover: { color: 'white' }, bg: 'transparent', border: 'none' })}>
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Logs Window */}
            <div ref={scrollRef} className={css({ flex: 1, p: 4, overflowY: 'auto', display: 'flex', flexDir: 'column', gap: 3, fontFamily: 'monospace', fontSize: '12px' })}>
              {messages.map((msg, i) => (
                <div key={i} className={css({
                  color: msg.role === 'user' ? 'white' : msg.role === 'system' ? 'yellow.400' : 'primary',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxW: '85%',
                  whiteSpace: 'pre-wrap'
                })}>
                  <span className={css({ color: 'gray.600', fontSize: '10px', mr: 1 })}>[{msg.timestamp}]</span>
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className={css({ color: 'primary', fontSize: '11px', animation: 'pulse 1s infinite' })}>
                  {(() => {
                    const phrases = [
                      '[SISTEMA]: Subornando o Firewall...',
                      '[SISTEMA]: Hackeando o Mainframe...',
                      '[SISTEMA]: Sincronizando buffers neurais...',
                      '[SISTEMA]: Desviando de rastreadores da rede...',
                      '[SISTEMA]: Minerando pacotes de dados...'
                    ];
                    // Retorna uma frase com base no timestamp ou Math.random
                    return phrases[Math.floor(Math.random() * phrases.length)];
                  })()}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className={css({ p: 4, borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', gap: 2 })}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Digitar comando..."
                disabled={loading}
                className={css({
                  flex: 1, bg: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0, 230, 118, 0.1)',
                  rounded: '2px', px: 3, py: 2, color: 'white', fontFamily: 'monospace', fontSize: '13px',
                  _focus: { outline: 'none', borderColor: 'primary' }
                })}
              />
              <button type="submit" disabled={loading} className={css({ bg: 'rgba(0, 230, 118, 0.1)', color: 'primary', border: '1px solid rgba(0, 230, 118, 0.3)', px: 3, rounded: '2px', cursor: 'pointer', _hover: { bg: 'primary', color: 'black' } })}>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
