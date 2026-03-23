'use client';

import dynamic from 'next/dynamic';

const FramerBackground = dynamic(() => import('@/presentation/components/FramerBackground'), { ssr: false });

export default function ClientBackground() {
  return <FramerBackground />;
}
