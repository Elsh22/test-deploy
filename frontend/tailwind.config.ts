import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // DMC Brand Colors
      colors: {
        dmc: {
          // Primary Colors
          gold: '#FFD700',
          black: '#000000',
          white: '#FFFFFF',
          
          // Secondary Colors
          'dark-gold': '#B8860B',
          'light-gold': '#FFF8DC',
          charcoal: '#333333',
          silver: '#C0C0C0',
          'light-gray': '#F5F5F5',
          'medium-gray': '#808080',
          'dark-gray': '#505050',
          
          // Accent Colors
          'off-white': '#FAFAFA',
          'warm-gray': '#8B8680',
          'cool-silver': '#B8BCC8',
        }
      },
      
      // DMC Typography
      fontFamily: {
        'dmc-primary': ['Playfair Display', 'serif'],
        'dmc-secondary': ['Merriweather', 'serif'],
        'dmc-body': ['Spectral', 'serif'],
        'dmc-fallback': ['Georgia', 'serif'],
      },
      
      // Background Gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dmc-gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
        'dmc-black-gold': 'linear-gradient(135deg, #000000 0%, #333333 50%, #FFD700 100%)',
        'dmc-sophisticated': 'linear-gradient(135deg, #F5F5F5 0%, #C0C0C0 100%)',
      },
      
      // DMC Box Shadows
      boxShadow: {
        'dmc-gold': '0 4px 15px rgba(255, 215, 0, 0.3)',
        'dmc-black': '0 4px 15px rgba(0, 0, 0, 0.3)',
        'dmc-silver': '0 4px 15px rgba(192, 192, 192, 0.3)',
        'dmc-elegant': '0 8px 25px rgba(255, 215, 0, 0.4)',
        'dmc-sophisticated': '0 10px 30px rgba(0, 0, 0, 0.2)',
        // Legacy shadow for compatibility
        custom: '20px 20px 60px #614b91, -20px -20px 60px #bd91ff',
      },
      
      // DMC Border Radius
      borderRadius: {
        'dmc': '12px',
        'dmc-lg': '16px',
        'dmc-xl': '24px',
      },
      
      // DMC Spacing
      spacing: {
        'dmc-xs': '8px',
        'dmc-sm': '16px',
        'dmc-md': '24px',
        'dmc-lg': '32px',
        'dmc-xl': '48px',
        'dmc-2xl': '64px',
      },
      
      // DMC Animation
      animation: {
        'dmc-fade-in': 'fadeIn 0.6s ease-in-out',
        'dmc-slide-up': 'slideUp 0.8s ease-out',
        'dmc-gold-shimmer': 'goldShimmer 2s ease-in-out infinite',
      },
      
      // DMC Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      
      // DMC Text Sizes (Professional Typography Scale)
      fontSize: {
        'dmc-hero': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'dmc-h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'dmc-h2': ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'dmc-h3': ['2rem', { lineHeight: '1.4', fontWeight: '600' }],
        'dmc-h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'dmc-body': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'dmc-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [
    // Custom DMC Plugin for additional utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.text-dmc-gradient': {
          background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.border-dmc-gradient': {
          border: '2px solid transparent',
          'background-clip': 'padding-box',
          'background-image': 'linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
          'background-origin': 'border-box',
        },
        '.btn-dmc-primary': {
          'background-color': theme('colors.dmc.gold'),
          'color': theme('colors.dmc.black'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.gold'),
          'font-weight': '600',
          'padding': '12px 24px',
          'border-radius': theme('borderRadius.dmc'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background-color': theme('colors.dmc.black'),
            'color': theme('colors.dmc.gold'),
            'box-shadow': theme('boxShadow.dmc-gold'),
          },
        },
        '.btn-dmc-secondary': {
          'background-color': 'transparent',
          'color': theme('colors.dmc.gold'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.gold'),
          'font-weight': '600',
          'padding': '12px 24px',
          'border-radius': theme('borderRadius.dmc'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background-color': theme('colors.dmc.gold'),
            'color': theme('colors.dmc.black'),
            'box-shadow': theme('boxShadow.dmc-gold'),
          },
        },
        '.card-dmc': {
          'background-color': theme('colors.dmc.white'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.silver'),
          'border-radius': theme('borderRadius.dmc-lg'),
          'padding': theme('spacing.dmc-md'),
          'box-shadow': theme('boxShadow.dmc-silver'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'border-color': theme('colors.dmc.gold'),
            'box-shadow': theme('boxShadow.dmc-elegant'),
            'transform': 'translateY(-2px)',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config