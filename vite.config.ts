import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { generateGlobalDts } from './scripts/generate-global-dts.mjs'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      dts({
        tsconfigPath: './tsconfig.build.json',
        include: ['packages/**/*.ts', 'packages/**/*.vue', 'packages/**/*.tsx'],
        exclude: ['**/node_modules/**', '**/__tests__/**', '**/dist/**', 'packages/components/table/src/table.vue', 'packages/components/form/src/form.vue', 'packages/components/edit-table/src/edit-table.vue'],
        outDir: 'dist',
        entryRoot: 'packages',
        rollupTypes: false,
        staticImport: true,
        cleanVueFileName: true,
        insertTypesEntry: true,
        copyDtsFiles: false,
        afterBuild: async () => {
          generateGlobalDts()
        }
      })
    ],
    build: {
      chunkSizeWarningLimit: 2000,
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      },
      lib: {
        entry: fileURLToPath(new URL('./packages/index.ts', import.meta.url)),
        name: 'GiComponent',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd'],
        cssFileName: 'gi'
      },
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        external: ['vue', 'element-plus'],
        treeshake: {
          moduleSideEffects: (id) => id.includes('dialog/src/create-dialog') || id.includes('dialog\\src\\create-dialog')
        },
        output: {
          globals: {
            'vue': 'Vue',
            'element-plus': 'ElementPlus'
          }
        }
      }
    }
  }
})
