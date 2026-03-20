import Header from '@/presentation/components/Header';

import AboutSection from '@/presentation/components/AboutSection';
import SkillsSection from '@/presentation/components/SkillsSection';
import ProjectsSection from '@/presentation/components/ProjectsSection';
import ContactSection from '@/presentation/components/ContactSection';
import Footer from '@/presentation/components/Footer';
import TerminalChat from '@/presentation/components/TerminalChat';

import { css } from 'styled-system/css';

export default function Home() {
  return (
    <div style={{ color: '#e5e2e1', minHeight: '100vh', overflowX: 'hidden', position: 'relative', background: 'transparent' }}>


      


      <Header />
      <main>
        <div id="about">
          <AboutSection />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
      <TerminalChat />
    </div>
  );
}
