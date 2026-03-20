import { css } from 'styled-system/css';

export default function Footer() {
  return (
    <footer className={css({ bg: '#080808', w: 'full', py: 12, borderTop: '1px solid rgba(255,255,255,0.02)', mt: 24 })}>
      <div className={css({ display: 'flex', flexDirection: { base: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', px: 8, maxW: { base: '90vw', md: '70vw' }, mx: 'auto', gap: 6 })}>
        
        <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
          <img src="/logo.svg" alt="JRSN Logo" className={css({ h: 5, w: 'auto', filter: 'brightness(0.8)' })} />
          <span className={css({ h: '12px', w: '1px', bg: 'rgba(255,255,255,0.1)' })} />
          <span className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.2em', color: 'gray.500', textTransform: 'uppercase' })}>
            Software Engineer // JRSN DEV
          </span>
        </div>

        <div className={css({ fontFamily: 'label', fontSize: '10px', color: 'gray.600', letterSpacing: '0.1em' })}>
          © 2026 JRSN DEV. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}
