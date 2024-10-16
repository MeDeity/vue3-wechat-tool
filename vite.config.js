import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(),
    importToCDN({
        modules: [
            {
                name: 'vue-demi',
                var: 'VueDemi',
                path: "lib/index.iife.min.js",
            },
            {
                name: 'pinia',
                var: 'Pinia',
                path: 'dist/pinia.iife.min.js'
            }
        ],
    }),],
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
    },
  };
});