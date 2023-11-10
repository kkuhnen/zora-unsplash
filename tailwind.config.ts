import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground-hex)',
        ['foreground-muted']: 'var(--foreground-muted-hex)',
        ['background-start']: 'var(--background-start-hex)',
        ['background-end']: 'var(--background-end-hex)',
        ['accent-background']: 'var(--accent-background-hex)',
        ['accent-foreground']: 'var(--accent-foreground-hex)',
        ['input-background']: 'var(--input-background-hex)',
        ['input-foreground']: 'var(--input-foreground-hex)',
        ['input-border']: 'var(--input-border-hex)',
        ['theme-color']: 'var(--theme-color)',
        ['site-title']: 'var(--site-title)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        mono: ['var(--font-dm-mono)'],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.gradient-colorbar': {
          '@apply bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400': {},
        },
        '.border-muted': {
          '@apply border-black/10 dark:border-white/10': {},
        },
      });
    }),
  ],
};
export default config;
