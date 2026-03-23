import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import dynamic from 'next/dynamic';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JRSN.DEV | SÊNIOR FULL STACK",
  description: "Portfólio de Jefferson Silva - Arquitetura de Software, Automação com IA e Sistemas SaaS",
};

const FramerBackground = dynamic(() => import('@/presentation/components/FramerBackground'), { ssr: false });
import TrackVisit from '@/presentation/components/TrackVisit';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body style={{ position: 'relative' }}>
        <a
          href="#main-content"
          className="skip-link"
        >
          Pular para o conteúdo principal
        </a>
        <FramerBackground />
        <TrackVisit />

        <div id="main-content" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
