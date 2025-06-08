/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'phantom-purple': '#7B2CBF',
        'phantom-purple-light': '#9D4EDD',
        'phantom-purple-dark': '#5A189A',
        'phantom-blue': '#2C3E50',
        'phantom-blue-dark': '#1E2A3A',
        'phantom-blue-light': '#3A506B',
        'phantom-graphite': '#2A2D34',
        'phantom-graphite-light': '#3F4550',
        'phantom-graphite-lighter': '#5A6072',
        'phantom-metallic': '#D1D5DB',
        'phantom-metallic-dark': '#9CA3AF',
        'phantom-black': '#1A1C20',
        'phantom-black-light': '#2A2D34',
        'phantom-black-dark': '#121418',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        'scroll-indicator': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink-ultrafast': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'wave-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-15px) translateX(5px)' },
          '50%': { transform: 'translateY(0) translateX(10px)' },
          '75%': { transform: 'translateY(15px) translateX(5px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.1)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(157, 78, 221, 0.2)' },
          '50%': { borderColor: 'rgba(157, 78, 221, 0.5)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'blink-ultrafast': 'blink-ultrafast 0.9s infinite',
        'wave-slow': 'wave-slow 20s ease-in-out infinite',
        'wave-slower': 'wave-slow 25s ease-in-out infinite',
        'float-slow': 'float-slow 15s ease-in-out infinite',
        'float-medium': 'float-medium 12s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 12s ease-in-out infinite',
        'pulse-border': 'pulse-border 8s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 30s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        'purple-sm': '0 0 3px rgba(157, 78, 221, 0.3)',
        'purple-md': '0 0 6px rgba(157, 78, 221, 0.3)',
        'purple-lg': '0 0 12px rgba(157, 78, 221, 0.3)',
      },
      boxShadow: {
        'purple-glow-sm': '0 0 10px 2px rgba(157, 78, 221, 0.15)',
        'purple-glow-md': '0 0 20px 5px rgba(157, 78, 221, 0.2)',
        'purple-glow-lg': '0 0 30px 8px rgba(157, 78, 221, 0.25)',
      },
      zIndex: {
        '-1': '-1',
        '-5': '-5',
        '-10': '-10',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 