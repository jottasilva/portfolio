import { css } from 'styled-system/css';

export default function Header() {
  return (
    <nav className={css({ position: 'fixed', top: 0, width: 'full', zIndex: 50, bg: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
      <div className={css({ maxW: '8xl', mx: 'auto', px: 8, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
        
        {/* Logo Node */}
        <div className={css({ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 })}>
          <img src="/logo.svg" alt="JRSN Logo" className={css({ h: 6, w: 'auto' })} />
        </div>

        {/* Navigation Core */}
        <div className={css({ display: 'flex', gap: { base: 6, md: 10 }, alignItems: 'center', overflowX: { base: 'auto', md: 'visible' }, px: { base: 2, md: 0 }, whiteSpace: 'nowrap', '&::-webkit-scrollbar': { display: 'none' } })}>
          {['Início', 'Sobre', 'Skills', 'Projetos'].map((item) => {
            const anchorMap: Record<string, string> = {
              'Início': '',
              'Sobre': 'trajetoria',
              'Skills': 'skills',
              'Projetos': 'projects',
              'Contato': 'contact'
            };
            return (
              <a
                key={item}
                href={`#${anchorMap[item]}`}
                className={css({
                  fontFamily: 'headline',
                  fontSize: { base: '12px', md: 'sm' },
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'white',
                  opacity: 0.6,
                  transition: 'all 0.3s',
                  position: 'relative',
                  cursor: 'pointer',
                  _hover: { opacity: 1, color: 'primary', _after: { width: 'full' } },
                  _after: {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '0%',
                    height: '1px',
                    bg: 'primary',
                    transition: 'width 0.3s ease-out',
                  }
                })}
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <a 
          href="#contact" 
          className={css({
            bg: 'rgba(200, 255, 0, 0.05)',
            border: '1px solid rgba(200, 255, 0, 0.2)',
            color: 'primary',
            fontFamily: 'label',
            fontSize: 'xs',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            px: 4,
            py: 2,
            rounded: 'md',
            fontWeight: 'bold',
            flexShrink: 0,
            transition: 'all 0.3s',
            cursor: 'pointer',
            _hover: { bg: 'primary', color: 'black' }
          })}
        >
          Conectar
        </a>
      </div>
    </nav>
  );
}
