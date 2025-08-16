import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5b7cfa',
          50: '#eef1ff',
          100: '#dfe6ff',
          200: '#bcc6ff',
          300: '#99a6ff',
          400: '#7686ff',
          500: '#5b7cfa',
          600: '#405be6',
          700: '#2f43b4',
          800: '#232f80',
          900: '#18204d'
        }
      }
    }
  },
  plugins: []
};

export default config;