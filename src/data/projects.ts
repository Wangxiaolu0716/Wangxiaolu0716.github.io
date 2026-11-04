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
  {
    name: 'dsh-pocket 手机端',
    description:
      '把电脑上的 DeepSeek Harness 装进口袋:手机扫码连接,局域网与公网都能用,Android / iOS 双端。',
    stack: ['Flutter', 'Dart', 'Android', 'iOS'],
    repo: 'https://github.com/Wangxiaolu0716/dsh-pocket-app',
    year: '2026',
    status: '持续更新',
  },
  {
    name: 'CTF 解题教学插件',
    description:
      'DSH 插件:边解题边讲套路、工具和知识点,收尾在 solves/<题目名>/ 生成可复现的 Writeup。',
    stack: ['Python', 'DSH', 'CTF', 'LLM'],
    repo: 'https://github.com/Wangxiaolu0716/ctf-solve-teach',
    year: '2026',
    status: '持续更新',
  },
  {
    name: 'REDLAND 答题助手',
    description:
      '基于 AI 的桌面答题工具:框选屏幕自动截图、OCR 识别题目、本地知识库命中秒回,未命中调用 DeepSeek 联网作答。基于 notxcm/AutoAnswer_ai 改造。',
    stack: ['Python', 'RapidOCR', 'DeepSeek API'],
    repo: 'https://github.com/Wangxiaolu0716/AutoAnswer_REDLAND',
    year: '2026',
    status: '个人使用',
  },
  {
    name: '课表 App',
    description:
      'Android 课表 App:登录学校教务系统自动导入课表,支持多校解析器扩展;无广告、无账号,数据只存本机。',
    stack: ['Flutter', 'Dart', 'Android'],
    repo: 'https://github.com/Wangxiaolu0716/class-schedule',
    year: '2026',
    status: '持续更新',
  },
];
