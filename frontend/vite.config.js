//vite.config.js is basically: “your personal instructions to Vite on how to run and build your project.

import { defineConfig } from 'vite' //Hey Vite, I want to tell you my project settings in a safe way, so you can understand them better.
import react from '@vitejs/plugin-react' //This plugin is like a translator: it converts JSX → JavaScript, Browsers don’t understand JSX.
import tailwindcss from '@tailwindcss/vite' //This plugin tells Vite: “Hey, include Tailwind when building the site, and make it ready for use.

// https://vite.dev/config/
export default defineConfig({ 
         /*Hey Vite, use these plugins (React, Tailwind) when running or building my app. if this is not used then:
                                                                                     React may not compile properly.
                                                                                     Tailwind won’t work.*/
  plugins: [
    tailwindcss(),
    react(),
  ]
})
