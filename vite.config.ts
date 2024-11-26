import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
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
        [env.VITE_API_PREFIX]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          // todo:监听代理请求,不需要可注释
          configure: (proxy: any, options: any) => {
            proxy.on('proxyReq', (proxyReq: any, req: any) => {
              console.log(proxyReq, req);
            });

            proxy.on('proxyRes', (proxyRes: any, req: any) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target as string)?.href || '';
            });
          },
          rewrite: path => path.replace(env.VITE_API_PREFIX, '')
        }
      }
    }
  };
});
