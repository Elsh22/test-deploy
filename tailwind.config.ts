import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Enhanced DMC Brand Colors - Per Branding Guidelines
      colors: {
        dmc: {
          // Primary Colors - Core DMC Identity
          gold: '#FFD700',
          black: '#000000',
          white: '#FFFFFF',
          
          // Enhanced Gold Variants
          'dark-gold': '#B8860B',
          'light-gold': '#FFF8DC',
          'warm-gold': '#DAA520',
          
          // Sophisticated Grays & Silvers
          charcoal: '#333333',
          silver: '#C0C0C0',
          'metallic-silver': '#BCC6CC',
          'light-gray': '#F5F5F5',
          'medium-gray': '#808080',
          'dark-gray': '#505050',
          'slate-gray': '#708090',
          platinum: '#E5E4E2',
          
          // Earthy Tones - Browns & Warm Neutrals
          'warm-brown': '#8B6914',
          bronze: '#CD7F32',
          taupe: '#8B8680',
          cream: '#F7F3E9',
          champagne: '#F7E7CE',
          
          // Off-Whites & Sophisticated Neutrals
          'off-white': '#FAFAFA',
          pearl: '#F8F6F0',
          ivory: '#FFFFF0',
          linen: '#FAF0E6',
          
          // Professional Accent Colors
          'deep-navy': '#1C2951',
          midnight: '#191970',
          royal: '#4169E1',
        }
      },
      
      // Enhanced DMC Typography - Per Branding Guidelines
      fontFamily: {
        'dmc-primary': ['Playfair Display', 'serif'],
        'dmc-secondary': ['Merriweather', 'serif'], 
        'dmc-body': ['Spectral', 'serif'],
        'dmc-fallback': ['Georgia', 'serif'],
        'dmc-web-safe': ['Verdana', 'sans-serif'],
      },
      
      // Professional Background Gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dmc-gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
        'dmc-professional': 'linear-gradient(135deg, #000000 0%, #333333 50%, #FFD700 100%)',
        'dmc-sophisticated': 'linear-gradient(135deg, #333333 0%, #808080 50%, #C0C0C0 100%)',
        'dmc-warm': 'linear-gradient(135deg, #8B6914 0%, #DAA520 50%, #FFD700 100%)',
        'dmc-elegant': 'linear-gradient(135deg, #F5F5F5 0%, #E5E4E2 50%, #C0C0C0 100%)',
        'dmc-hero': 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(51,51,51,0.6) 50%, rgba(255,215,0,0.2) 100%)',
      },
      
      // Enhanced DMC Box Shadows
      boxShadow: {
        'dmc-gold': '0 4px 20px rgba(255, 215, 0, 0.3)',
        'dmc-black': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'dmc-silver': '0 4px 15px rgba(192, 192, 192, 0.3)',
        'dmc-elegant': '0 12px 40px rgba(255, 215, 0, 0.15)',
        'dmc-sophisticated': '0 8px 30px rgba(51, 51, 51, 0.2)',
        'dmc-warm': '0 6px 25px rgba(139, 105, 20, 0.3)',
        'dmc-bronze': '0 5px 20px rgba(205, 127, 50, 0.3)',
        'dmc-professional': '0 10px 35px rgba(0, 0, 0, 0.15)',
        'dmc-glassmorphism': '0 8px 32px rgba(255, 215, 0, 0.1)',
      },
      
      // Professional Border Radius
      borderRadius: {
        'dmc': '12px',
        'dmc-lg': '16px',
        'dmc-xl': '20px',
        'dmc-2xl': '24px',
        'dmc-elegant': '28px',
      },
      
      // Enhanced DMC Spacing
      spacing: {
        'dmc-xs': '8px',
        'dmc-sm': '16px',
        'dmc-md': '24px',
        'dmc-lg': '32px',
        'dmc-xl': '48px',
        'dmc-2xl': '64px',
        'dmc-3xl': '80px',
      },
      
      // Professional Animation
      animation: {
        'dmc-fade-in': 'dmcFadeIn 0.8s ease-out',
        'dmc-slide-up': 'dmcSlideUp 1s ease-out', 
        'dmc-gold-shimmer': 'dmcGoldShimmer 2.5s ease-in-out infinite',
        'dmc-float': 'dmcFloat 3s ease-in-out infinite',
        'dmc-glow': 'dmcGlow 2s ease-in-out infinite alternate',
      },
      
      // Professional Keyframes
      keyframes: {
        dmcFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dmcSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dmcGoldShimmer: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        dmcFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dmcGlow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
      },
      
      // Professional Typography Scale
      fontSize: {
        'dmc-hero': ['4.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'dmc-h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'dmc-h2': ['2.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'dmc-h3': ['2.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'dmc-h4': ['1.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'dmc-h5': ['1.5rem', { lineHeight: '1.5', fontWeight: '500' }],
        'dmc-body': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'dmc-body-sm': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'dmc-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'dmc-caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },

      // Enhanced Letter Spacing for Typography
      letterSpacing: {
        'dmc-tight': '-0.02em',
        'dmc-normal': '0em',
        'dmc-wide': '0.05em',
        'dmc-wider': '0.1em',
      },

      // Professional Backdrop Blur
      backdropBlur: {
        'dmc': '12px',
        'dmc-lg': '16px',
        'dmc-xl': '20px',
      },

      // Professional Z-Index Scale
      zIndex: {
        'dmc-background': '-1',
        'dmc-base': '0',
        'dmc-content': '10',
        'dmc-overlay': '40',
        'dmc-modal': '50',
        'dmc-popover': '60',
        'dmc-navbar': '70',
        'dmc-tooltip': '80',
        'dmc-notification': '90',
        'dmc-maximum': '100',
      },
    },
  },
  plugins: [
    // Enhanced DMC Plugin for Professional Utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        // Professional Text Gradients
        '.text-dmc-gradient': {
          background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'font-weight': '700',
        },
        '.text-dmc-sophisticated': {
          background: 'linear-gradient(135deg, #333333 0%, #808080 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'font-weight': '600',
        },
        '.text-dmc-warm': {
          background: 'linear-gradient(135deg, #8B6914 0%, #DAA520 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'font-weight': '600',
        },

        // Professional Border Gradients
        '.border-dmc-gradient': {
          border: '2px solid transparent',
          'background-clip': 'padding-box',
          'background-image': 'linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
          'background-origin': 'border-box',
        },
        '.border-dmc-sophisticated': {
          border: '2px solid transparent',
          'background-clip': 'padding-box',
          'background-image': 'linear-gradient(white, white), linear-gradient(135deg, #333333 0%, #C0C0C0 100%)',
          'background-origin': 'border-box',
        },

        // Enhanced Button Styles
        '.btn-dmc-primary': {
          'background-color': theme('colors.dmc.gold'),
          'color': theme('colors.dmc.black'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.gold'),
          'font-family': theme('fontFamily.dmc-primary'),
          'font-weight': '600',
          'padding': '12px 24px',
          'border-radius': theme('borderRadius.dmc'),
          'transition': 'all 0.3s ease',
          'box-shadow': theme('boxShadow.dmc-gold'),
          '&:hover': {
            'background-color': theme('colors.dmc.black'),
            'color': theme('colors.dmc.gold'),
            'box-shadow': theme('boxShadow.dmc-elegant'),
            'transform': 'translateY(-2px)',
          },
        },
        '.btn-dmc-secondary': {
          'background-color': 'transparent',
          'color': theme('colors.dmc.gold'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.gold'),
          'font-family': theme('fontFamily.dmc-primary'),
          'font-weight': '600',
          'padding': '12px 24px',
          'border-radius': theme('borderRadius.dmc'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background-color': theme('colors.dmc.gold'),
            'color': theme('colors.dmc.black'),
            'box-shadow': theme('boxShadow.dmc-gold'),
            'transform': 'translateY(-2px)',
          },
        },
        '.btn-dmc-professional': {
          'background-color': theme('colors.dmc.charcoal'),
          'color': theme('colors.dmc.white'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.charcoal'),
          'font-family': theme('fontFamily.dmc-secondary'),
          'font-weight': '500',
          'padding': '12px 24px',
          'border-radius': theme('borderRadius.dmc'),
          'transition': 'all 0.3s ease',
          'box-shadow': theme('boxShadow.dmc-black'),
          '&:hover': {
            'background-color': theme('colors.dmc.metallic-silver'),
            'color': theme('colors.dmc.black'),
            'border-color': theme('colors.dmc.gold'),
            'box-shadow': theme('boxShadow.dmc-sophisticated'),
            'transform': 'translateY(-2px)',
          },
        },
        '.btn-dmc-elegant': {
          'background': 'linear-gradient(135deg, #000000 0%, #333333 50%, #FFD700 100%)',
          'color': theme('colors.dmc.white'),
          'border': '2px solid transparent',
          'font-family': theme('fontFamily.dmc-primary'),
          'font-weight': '600',
          'padding': '14px 28px',
          'border-radius': theme('borderRadius.dmc-lg'),
          'transition': 'all 0.3s ease',
          'box-shadow': theme('boxShadow.dmc-sophisticated'),
          '&:hover': {
            'background': 'linear-gradient(135deg, #8B6914 0%, #DAA520 50%, #FFD700 100%)',
            'box-shadow': theme('boxShadow.dmc-elegant'),
            'transform': 'translateY(-3px)',
          },
        },

        // Professional Card Styles
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
            'transform': 'translateY(-4px)',
          },
        },
        '.card-dmc-professional': {
          'background-color': theme('colors.dmc.pearl'),
          'border': '2px solid',
          'border-color': theme('colors.dmc.platinum'),
          'border-radius': theme('borderRadius.dmc-lg'),
          'padding': theme('spacing.dmc-lg'),
          'box-shadow': theme('boxShadow.dmc-sophisticated'),
          'transition': 'all 0.3s ease',
          '&:hover': {
            'border-color': theme('colors.dmc.warm-brown'),
            'box-shadow': theme('boxShadow.dmc-elegant'),
            'transform': 'translateY(-4px)',
            'background-color': theme('colors.dmc.white'),
          },
        },
        '.card-dmc-elegant': {
          'background': 'linear-gradient(135deg, #FFFFFF 0%, #F7F3E9 100%)',
          'border': '2px solid',
          'border-color': theme('colors.dmc.metallic-silver'),
          'border-radius': theme('borderRadius.dmc-xl'),
          'padding': theme('spacing.dmc-lg'),
          'box-shadow': theme('boxShadow.dmc-sophisticated'),
          'transition': 'all 0.4s ease',
          '&:hover': {
            'border-color': theme('colors.dmc.gold'),
            'box-shadow': theme('boxShadow.dmc-elegant'),
            'transform': 'translateY(-6px) scale(1.02)',
          },
        },

        // Professional Typography Classes
        '.heading-dmc-primary': {
          'font-family': theme('fontFamily.dmc-primary'),
          'font-weight': '700',
          'color': theme('colors.dmc.gold'),
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.heading-dmc-secondary': {
          'font-family': theme('fontFamily.dmc-secondary'),
          'font-weight': '600',
          'color': theme('colors.dmc.charcoal'),
        },
        '.body-dmc-primary': {
          'font-family': theme('fontFamily.dmc-body'),
          'font-weight': '400',
          'color': theme('colors.dmc.dark-gray'),
          'line-height': '1.6',
        },
        '.body-dmc-professional': {
          'font-family': theme('fontFamily.dmc-fallback'),
          'font-weight': '400',
          'color': theme('colors.dmc.slate-gray'),
          'line-height': '1.7',
        },

        // Professional Glass Effects
        '.glass-dmc': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 215, 0, 0.2)',
          'border-radius': theme('borderRadius.dmc'),
        },
        '.glass-dmc-sophisticated': {
          'background': 'rgba(51, 51, 51, 0.1)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(192, 192, 192, 0.3)',
          'border-radius': theme('borderRadius.dmc-lg'),
        },

        // Professional Section Separators
        '.section-separator-dmc': {
          'height': '3px',
          'background': 'linear-gradient(135deg, #8B6914 0%, #DAA520 50%, #FFD700 100%)',
          'border-radius': '2px',
          'margin': '48px 0',
        },
        '.section-separator-sophisticated': {
          'height': '2px',
          'background': 'linear-gradient(135deg, #333333 0%, #C0C0C0 100%)',
          'border-radius': '1px',
          'margin': '32px 0',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config