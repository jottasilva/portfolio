'use client';

import { AuthProvider, useAuth } from '@/presentation/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { css } from 'styled-system/css';

function ProtectedWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/painel/login') {
      router.push('/painel/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className={css({ minH: '100vh', bg: '#0e0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary', fontFamily: 'label', fontSize: 'sm' })}>
         Injetando Protocolos_Autenticação...
      </div>
    );
  }

  return <>{children}</>;
}

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedWrapper>
        <div className={css({ minH: '100vh', bg: '#0b0b0b', color: 'white' })}>
          {children}
        </div>
      </ProtectedWrapper>
    </AuthProvider>
  );
}
