import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['var(--font-clash)', 'sans-serif'],
        fira: ['var(--font-fira)', 'monospace'],
        dm: ['var(--font-dm)', 'sans-serif'],
      },
      colors: {
        void: '#05050A',
        surface: '#0C0C14',
        elevated: '#12121E',
        border: '#1E1E30',
        amber: {
          glow: '#F59E0B',
          hot: '#FBBF24',
          dim: '#92400E',
        },
        coral: {
          bright: '#FF6B6B',
          hot: '#FF4757',
          dim: '#7F1D1D',
        },
        plasma: {
          violet: '#7C3AED',
          blue: '#3B82F6',
        },
        text: {
          primary: '#F1F0ED',
          secondary: '#A09E9A',
          muted: '#4A4850',
        }
      },
      backgroundImage: {
        'mesh-amber': 'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.12) 0%, transparent 50%)',
        'mesh-coral': 'radial-gradient(ellipse at 60% 80%, rgba(255,107,107,0.12) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(124,58,237,0.05) 100%)',
        'amber-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FF6B6B 100%)',
        'plasma-gradient': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
        'pulse-amber': 'pulseAmber 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-trace': 'borderTrace 3s linear infinite',
        'glitch': 'glitch 5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseAmber: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,158,11,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(245,158,11,0.7), 0 0 100px rgba(245,158,11,0.3)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(5deg)' },
          '66%': { transform: 'translate(-20px, 10px) rotate(-3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderTrace: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '92%': { transform: 'translate(-3px, 1px)' },
          '94%': { transform: 'translate(3px, -1px)' },
          '96%': { transform: 'translate(-2px, 2px)' },
        }
      },
      boxShadow: {
        'amber': '0 0 30px rgba(245,158,11,0.3)',
        'amber-lg': '0 0 60px rgba(245,158,11,0.4), 0 0 120px rgba(245,158,11,0.15)',
        'coral': '0 0 30px rgba(255,107,107,0.3)',
        'plasma': '0 0 30px rgba(124,58,237,0.3)',
        'card': '0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}

export default config
