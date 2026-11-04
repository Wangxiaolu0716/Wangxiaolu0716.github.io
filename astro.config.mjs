// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 站点地址:GitHub Pages 用户站点 Wangxiaolu0716.github.io,部署在根路径
// 注意:base 必须与部署路径一致——用户站点(github.io 仓库)= '/'(根路径)
export default defineConfig({
  site: 'https://wangxiaolu0716.github.io',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // 双主题代码高亮:亮色 github-light / 暗色 one-dark-pro
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
    },
  },
});
