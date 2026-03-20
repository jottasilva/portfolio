import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        fonts: {
          headline: { value: 'var(--font-headline), sans-serif' },
          body: { value: 'var(--font-body), sans-serif' },
          label: { value: 'var(--font-label), sans-serif' }
        }
      },
      semanticTokens: {
        colors: {
          primary:    { value: "#00E676" },
          secondary:  { value: "#8A00C4" },
          background: { value: "#0e0e0e" },
          surface:    { value: "#161616" },
          onSurface:  { value: "#e5e2e1" },
          outline:    { value: "#333333" },
          accentGlow: { value: "rgba(0, 230, 118, 0.15)" }
        }
      }
    }
  },
  outdir: "styled-system",
});
