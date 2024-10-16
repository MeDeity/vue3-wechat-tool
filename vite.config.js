import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

import { cdn } from "vite-plugin-cdn2";

import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';

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
        external: ["vue", "vue-demi"],
        plugins: [
          externalGlobals({
            vue: "Vue",
            // 配置 vue-demi 全局变量
            "vue-demi": "VueDemi",
          }),
        ],
      }
    },
  };
});