import type { Config } from 'tailwindcss';

/** Kolory i fonty wskazują na zmienne CSS z src/styles/tokens.css — jeden system dla obu motywów. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: 'var(--red)', 2: 'var(--red-2)', dk: 'var(--red-dk)' },
        bg: { DEFAULT: 'var(--bg)', 2: 'var(--bg-2)' },
        steel: { DEFAULT: 'var(--steel)', 2: 'var(--steel-2)' },
        line: { DEFAULT: 'var(--line)', 2: 'var(--line-2)' },
        txt: 'var(--txt)',
        mute: 'var(--mute)',
        soft: 'var(--soft)',
        hi: 'var(--hi)',
      },
      fontFamily: {
        display: 'var(--display)',
        body: 'var(--body)',
        mono: 'var(--mono)',
      },
      borderRadius: { DEFAULT: 'var(--r)' },
      maxWidth: { wrap: 'var(--wrap)' },
    },
  },
  plugins: [],
} satisfies Config;
