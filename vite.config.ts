import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigpaths from 'vite-tsconfig-paths'
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig({
  plugins: [react(), tsconfigpaths(), removeConsole()]
})
