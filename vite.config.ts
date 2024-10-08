import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-meta-layouts'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import regexpPlugin from 'rollup-plugin-regexp'
import * as mdicons from '@mdi/js'

const mdi: Record<string, string> = {}
Object.keys(mdicons).forEach((key) => {
  const value = (mdicons as Record<string, string>)[key]
  mdi[
    key
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/([0-9]+)/g, '-$1')
  ] = value
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    regexpPlugin({
      exclude: ['node_modules/**'],
      find: /\b(?<![/\w])(mdi-[\w-]+)\b(?!\.)/,
      replace: (match: string) => {
        if (mdi[match]) {
          return mdi[match]
        } else {
          console.warn('[plugin-regexp] No matched svg icon for ' + match)
          return match
        }
      },
      sourcemap: false
    }),
    VueRouter({ importMode: 'sync', dts: './src/typed-router.d.ts' }),
    vue({
      template: { transformAssetUrls },
      features: { propsDestructure: true }
    }),
    Vuetify({ autoImport: true }),
    Layouts(),
    Components({ dts: './src/components.d.ts', types: [] }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        VueRouterAutoImports,
        {
          vuetify: ['useTheme', 'useRtl', 'useLocale', 'useDisplay', 'useLayout']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/stores']
    }),
    vueJsx()
  ],
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: 'localhost'
  },
  test: {
    globals: true,
    include: ['test/**/*.{test,spec}.ts', 'src/**/__tests__/*'],
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    server: { deps: { inline: ['vuetify'] } }
  }
})
