import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NVAI brand
        gold: {
          DEFAULT: '#D4AF37',
          dim: '#A08820',
          warm: '#E8C87A',
        },
        ivory: '#EDE8DC',
        cream: '#F4EFE3',
        oxblood: '#3B0F0F',
        midnight: '#0A0807',
        sienna: '#7C3A1D',
        burntumber: '#5B2B12',
        // Period palette
        bluepicasso: '#1B2A4A',
        chagallblue: '#1F3A8A',
        modigliani: '#7A5C42',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        didot: ['"GFS Didot"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        wider: '0.05em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};

export default config;
