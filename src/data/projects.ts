/**
 * 项目展示数据 —— 加项目就往数组里加一条
 */
export interface Project {
  name: string;
  description: string;
  stack: string[];
  /** 卡片配图(放 public/projects/ 下,填 /projects/xxx.png) */
  image?: string;
  /** 在线访问地址(可选) */
  link?: string;
  /** 源码仓库(可选) */
  repo?: string;
  year?: string;
  status?: string;
}

export const PROJECTS: Project[] = [
  {
    name: '这个博客',
    description:
      '用 Astro 5 + TypeScript 搭建的个人博客:大标题排版、跑马灯、幕布转场、双主题、离线搜索,以及 GitHub Pages 自动部署。你正在看的就是它。',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    link: 'https://wangxiaolu0716.github.io/',
    repo: 'https://github.com/Wangxiaolu0716/Wangxiaolu0716.github.io',
    year: '2026',
    status: '持续更新',
  },
];
