import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

import { cdn } from "vite-plugin-cdn2";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      cdn({ modules: ["vue"] })
    ],
    resolve: {
      // ↓路径别名，主要是这部分
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    base: VITE_BASE_PATH,
    server: {
      host: "localhost",
      open: true,
      port: 9527,
    },
    build: {
      chunkSizeWarningLimit: 5000, // 设置你希望的块大小警告限制，单位是字节
      rollupOptions: {
        external: ['vue'],
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          paths: {
            vue: 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
          }
        }
      }
    },
  };
});