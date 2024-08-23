/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#007bff',
        'primary-dark': '#1e3a8a',
        'bg-light': '#ffffff',
        'bg-dark': 'bg-gray-800',
        'text-light': 'bg-gray-800',
        'text-dark': '#f9fafb',
        'border-light': '#e5e7eb',
        'border-dark': '#4b5563',
      },
    },
  },
  plugins: [],
}