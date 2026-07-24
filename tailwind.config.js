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
          purple: 'hsl(var(--kraken-purple))',
          'purple-dark': 'hsl(var(--kraken-purple-dark))',
          'purple-deep': '#5b1ecf',
          'purple-subtle': 'var(--kraken-purple-subtle)',
          black: 'hsl(var(--kraken-black))',
          gray: 'hsl(var(--kraken-gray))',
          'gray-light': 'hsl(var(--kraken-gray-light))',
          'border-gray': 'hsl(var(--kraken-border-gray))',
          green: 'hsl(var(--kraken-green))',
          'green-dark': 'hsl(var(--kraken-green-dark))',
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
