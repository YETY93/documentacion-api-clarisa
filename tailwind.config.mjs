/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores principales de Clarisa
        clarisa: {
          // Tonos claros
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          // Verde
          400: '#7DBF7C', // C:71 M:1 Y:11 K:1 (ajustado para verde)
          // Azul claro/cyan
          500: '#11B8DD', // C:71 M:1 Y:11 K:1
          600: '#0ea5e9',
          // Azul principal
          700: '#2583C6', // C:80 M:39 Y:0 K:0
          // Azul secundario oscuro
          800: '#115375', // C:93 M:59 Y:33 K:19
          // Azul principal más oscuro
          900: '#136AA9', // C:88 M:53 Y:9 K:1
          // Negro/gris muy oscuro para modo oscuro
          950: '#1D1D1B', // C:0 M:0 Y:0 K:100
        },
        // Alias para facilitar el uso
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#11B8DD', // Clarisa cyan
          500: '#2583C6', // Clarisa azul principal
          600: '#136AA9', // Clarisa azul oscuro
          700: '#115375', // Clarisa azul secundario
          800: '#0c4a6e',
          900: '#0c2d48',
          950: '#1D1D1B', // Clarisa negro
        },
        // Verde de Clarisa
        success: {
          400: '#7DBF7C',
          500: '#6BAE6A',
          600: '#5A9D59',
        },
        // Colores específicos para modo oscuro
        'dark-bg': {
          primary: '#0F172A',    // Fondo principal muy oscuro
          secondary: '#1E293B',  // Fondo secundario
          card: '#334155',       // Fondo de tarjetas
          elevated: '#475569',   // Elementos elevados
        },
        'dark-border': {
          primary: '#475569',    // Bordes principales
          secondary: '#64748B',  // Bordes secundarios
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}