/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // added from new code
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "", // added from new code
  theme: {
    container: { // added from new code
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // ✅ existing + new merged
        primary: {
          50: '#F3E8FF',
          100: '#E9D5FF',
          200: '#D8B4FE',
          300: '#C084FC',
          400: '#A855F7',
          500: '#8B5CF6',
          600: '#6B46C1',
          700: '#553C9A',
          800: '#4C1D95',
          900: '#3B0764',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        accent: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          DEFAULT: '#7E69AB',
          light: '#9b87f5',
          foreground: '#FFFFFF',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        navy: {
          DEFAULT: '#221F26',
          light: '#403E43',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        mibbs: {
          primary: '#6B46C1',
          secondary: '#8B5CF6',
          accent: '#EC4899',
          pink: '#F472B6',
          light: '#F3E8FF',
          dark: '#4C1D95'
        }
      },
      backgroundImage: {
        'mibbs-gradient': 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #EC4899 100%)',
        'mibbs-gradient-light': 'linear-gradient(135deg, #F3E8FF 0%, #FDF2F8 100%)'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      animation: {
        // ✅ merged animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out forwards', // fixed duplicate
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'accordion-down': 'accordionDown 0.2s ease-out',
        'accordion-up': 'accordionUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), // added from new code
  ],
};











// /** @type {import('tailwindcss').Config} */
// export default {
    
//     darkMode: ["class"],
//     content: [
//         "./pages/**/*.{ts,tsx}",
//         "./components/**/*.{ts,tsx}",
//         "./app/**/*.{ts,tsx}",
//         "./src/**/*.{ts,tsx}",
//     ],
//     prefix: "",
//     theme: {
//         container: {
//             center: true,
//             padding: '2rem',
//             screens: {
//                 'sm': '640px',
//                 'md': '768px',
//                 'lg': '1024px',
//                 'xl': '1280px',
//                 '2xl': '1400px'
//             }
//         },
//         extend: {
//             colors: {
//                 border: 'hsl(var(--border))',
//                 input: 'hsl(var(--input))',
//                 ring: 'hsl(var(--ring))',
//                 background: 'hsl(var(--background))',
//                 foreground: 'hsl(var(--foreground))',
//                 navy: {
//                     DEFAULT: '#221F26',
//                     light: '#403E43',
//                 },
//                 accent: {
//                     DEFAULT: '#7E69AB',
//                     light: '#9b87f5',
//                     foreground: '#FFFFFF',
//                 },
//                 primary: {
//                     DEFAULT: 'hsl(var(--primary))',
//                     foreground: 'hsl(var(--primary-foreground))'
//                 },
//                 secondary: {
//                     DEFAULT: 'hsl(var(--secondary))',
//                     foreground: 'hsl(var(--secondary-foreground))'
//                 },
//                 destructive: {
//                     DEFAULT: 'hsl(var(--destructive))',
//                     foreground: 'hsl(var(--destructive-foreground))'
//                 },
//                 muted: {
//                     DEFAULT: 'hsl(var(--muted))',
//                     foreground: 'hsl(var(--muted-foreground))'
//                 },
//                 popover: {
//                     DEFAULT: 'hsl(var(--popover))',
//                     foreground: 'hsl(var(--popover-foreground))'
//                 },
//                 card: {
//                     DEFAULT: 'hsl(var(--card))',
//                     foreground: 'hsl(var(--card-foreground))'
//                 },
//                 mibbs: {
//                     primary: '#6B46C1',
//                     secondary: '#8B5CF6',
//                     accent: '#EC4899',
//                     pink: '#F472B6',
//                     light: '#F3E8FF',
//                     dark: '#4C1D95'
//                 }
//             },
//             backgroundImage: {
//                 'mibbs-gradient': 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #EC4899 100%)',
//                 'mibbs-gradient-light': 'linear-gradient(135deg, #F3E8FF 0%, #FDF2F8 100%)'
//             },
//             fontFamily: {
//                 montserrat: ['Montserrat', 'sans-serif'],
//                 inter: ['Inter', 'sans-serif'],
//             },
//             borderRadius: {
//                 lg: 'var(--radius)',
//                 md: 'calc(var(--radius) - 2px)',
//                 sm: 'calc(var(--radius) - 4px)'
//             },
//             keyframes: {
//                 "accordion-down": {
//                     from: { height: "0" },
//                     to: { height: "var(--radix-accordion-content-height)" },
//                 },
//                 "accordion-up": {
//                     from: { height: "var(--radix-accordion-content-height)" },
//                     to: { height: "0" },
//                 },
//                 fadeIn: {
//                     '0%': { opacity: '0', transform: 'translateY(10px)' },
//                     '100%': { opacity: '1', transform: 'translateY(0)' }
//                 },
//                 scaleIn: {
//                     '0%': { transform: 'scale(0.95)', opacity: '0' },
//                     '100%': { transform: 'scale(1)', opacity: '1' }
//                 }
//             },
//             animation: {
//                 "accordion-down": "accordion-down 0.2s ease-out",
//                 "accordion-up": "accordion-up 0.2s ease-out",
//                 "fade-in": "fadeIn 0.5s ease-out forwards",
//                 "scale-in": "scaleIn 0.3s ease-out forwards",
//             }
//         }
//     },
//     plugins: [require("tailwindcss-animate")],
// };


