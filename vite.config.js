import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

import { Plugin as importToCND } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(),
    // 使用CDN模块信息配置插件
    importToCND({
      modules: [
          {
              name: 'vue',
              var: 'Vue',
              path: 'https://cdn.jsdelivr.net/npm/vue@3.3.11/dist/vue.global.min.js',
          },
          {
              name: 'vue-router',
              var: 'VueRouter',
              path: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.min.js',
          },
          {
              name: 'vue-demi',
              var: 'VueDemi',
              path: 'https://cdn.jsdelivr.net/npm/vue-demi@0.14.6/lib/index.iife.min.js',
          }
      ]
  })],
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