/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design system
        ink: '#0D0D0D', // app background (black)
        lime: '#C4F82A', // acid-lime accent
        card: '#1A1A1A', // card surface
        muted: '#7A7A7A', // secondary text
        // Status labels
        danger: '#FF3B3B', // опасно
        warn: '#F8D82A', // сомнительно
        safe: '#C4F82A', // безопасно
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(196, 248, 42, 0.35)',
      },
      maxWidth: {
        app: '480px',
      },
    },
  },
  plugins: [],
}
