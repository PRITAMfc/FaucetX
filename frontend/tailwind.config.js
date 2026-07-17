/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        kraken: {
          purple: '#7132f5',
          'purple-dark': '#5741d8',
          'purple-deep': '#5b1ecf',
          'purple-subtle': 'rgba(133, 91, 251, 0.16)',
          black: '#101114',
          gray: '#686b82',
          'gray-light': '#9497a9',
          'border-gray': '#dedee5',
          green: '#149e61',
          'green-dark': '#026b3f',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        brand: ['IBM Plex Sans', 'Helvetica', 'Arial', 'sans-serif'],
        product: ['IBM Plex Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'kraken': 'rgba(0, 0, 0, 0.03) 0px 4px 24px',
        'kraken-micro': 'rgba(16, 24, 40, 0.04) 0px 1px 4px',
      },
    },
  },
  plugins: [],
}
