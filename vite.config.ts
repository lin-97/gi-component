import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  // 根据构建模式配置不同的输出
  const isLibBuild = mode === 'lib'

  return {
    // 路径别名
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dirs: ['packages/components'],
        extensions: ['vue', 'tsx'],
        dts: 'packages/components.d.ts',
        prefix: 'Gi'
      }),
      // 配置dts插件生成类型声明文件
      dts({
        include: ['packages/**/*.vue'],
        outDir: 'dist',
        entryRoot: 'packages',
        rollupTypes: true,
        cleanVueFileName: true,
        // 排除不需要生成类型的文件
        exclude: ['**/node_modules/**', '**/__tests__/**', '**/dist/**']
      })
    ],
    // 构建
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的dist目录
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify："terser"，terserOptions才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        },
        format: {
          comments: false // 删除注释
        }
      },
      // 根据是否为库构建配置不同的rollup选项
      ...(isLibBuild ? {
        lib: {
          entry: fileURLToPath(new URL('./packages/index.ts', import.meta.url)),
          name: 'GiComponent',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'umd'],
          cssFileName: 'gi'
        },
        // 生成TypeScript声明文件
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue', 'element-plus'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue',
              'element-plus': 'ElementPlus'
            }
          }
        }
      } : {
        // 静态资源打包到dist下的不同目录
        rollupOptions: {
          output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
          }
        }
      })
    }
  }
})