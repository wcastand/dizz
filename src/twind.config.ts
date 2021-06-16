import { DarkMode } from 'twind'
export default {
  darkMode: 'class' as DarkMode,
  theme: {
    extend: {
      fontFamily: {
        sans: '"Inconsolata", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
      },
    },
  },
  preflight: {
    // Import external stylesheet
    '@import': `url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;700&display=swap')`,
    // body: apply`font-sans bg-gray-900 text-white`,
  },
}
