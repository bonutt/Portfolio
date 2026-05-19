export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: { orange: '#f97316', light: '#fb923c', dim: '#ea580c' },
        dark: { 900: '#0a0a0a', 800: '#0f0f0f', 700: '#141414', 600: '#1a1a1a' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
