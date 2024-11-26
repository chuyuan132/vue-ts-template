import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  console.log('当前应用环境：', env.VITE_NODE_ENV);
  return {
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
          // todo:监听代理请求
          // configure: (proxy: any, options: any) => {
          //   proxy.on('proxyReq', (proxyReq: any, req: any) => {
          //     console.log('Proxying request to:', proxyReq.url);
          //   });

          //   proxy.on('proxyRes', (proxyRes: any, req: any) => {
          //   });
          // },
        }
      }
    }
  };
});
