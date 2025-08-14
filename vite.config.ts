import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

 export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ autoCodeSplitting: true, target:"react", routesDirectory: "src/global/routes",  generatedRouteTree: "./src/global/routeTree.gen.ts", }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  } 
})
