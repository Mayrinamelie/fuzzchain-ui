/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Defined from your Button and Card components [cite: 3, 5]
        brand: {
          primary: '#111827',   // gray-900
          secondary: '#E5E7EB', // gray-200
          hover: '#374151',     // gray-700
          muted: '#9CA3AF',     // gray-400
          surface: '#F9FAFB',   // gray-50
        }
      },
      borderRadius: {
        // Standardizing the "Rounded" look you used in your Dashboard CSS
        'p-card': '10px',
        'p-btn': '4px',
      },
      boxShadow: {
        // Ensuring all cards have the same subtle depth [cite: 5]
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        // Ensuring headers are consistent across all 8 developers
        'dashboard-title': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '800' }], // text-3xl bold
      }
    },
  },
  plugins: [],
}
