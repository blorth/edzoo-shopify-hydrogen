import {nextui} from '@nextui-org/theme';
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    // formsPlugin,
    typographyPlugin,
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#53A500',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#D4784C',
              foreground: '#FFFFFF',
            },
            // focus: '#D4784C',
          },
        },
      },
    }),
  ],
  theme: {
    fontSize: {
      sm: '0.8125rem',
    },
    extend: {
      colors: {
        'neutrals-gray-dark': '#363636',
        'neutrals-gray-medium': '#6A6A6A',
        'neutrals-gray-light': '#DDDDDD',
        'neutrals-white': '#FFFFFF',
        'greens-green-primary': '#53A500',
        'greens-green-light': '#DFF1D3',
        'reds-red-light': '#D4784C',
        'browns-brown': '#3B2A00',
        'browns-tan-light': '#F8F7F3',
        'light-yellow': '#FCEEBD',
        'light-red': '#F94C43',
      },
      fontFamily: {
        volkhov: ['Volkhov', 'serif'],
        optima: ['Optima', 'sans-serif'],
      },
      gridTemplateColumns: {
        footer: '1fr 1fr minmax(100, 150px) 1fr',
      },
    },
    letterSpacing: {
      wide: '0.06em',
    },
  },
};
