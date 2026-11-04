/**
 * 开源仓库数据 —— 加仓库就往数组里加一条
 * lastPush 用于标注活跃度,fork 标注上游来源
 */
export interface Repo {
  name: string;
  desc: string;
  /** 诚实评语(自己写的,不装) */
  note: string;
  /** fork 的上游仓库(非 fork 则不填) */
  upstream?: string;
  url: string;
  lastPush: string;
}

export const REPOS: Repo[] = [
  {
    name: 'Wangxiaolu0716.github.io',
    desc: '超级宅王小路的个人博客:Astro 5 + TypeScript',
    note: '你正在看的这个,主题模板来自 Ulysses Yang 的 blog 仓库。',
    url: 'https://github.com/Wangxiaolu0716/Wangxiaolu0716.github.io',
    lastPush: '2026-11-04',
  },
  {
    name: 'dsh-pocket-app',
    desc: '把 dsh-pocket 装进口袋:扫码连上电脑上的 DeepSeek Harness(Android + iOS,Flutter)',
    note: '自己写的手机端,配合 dsh-pocket 使用。',
    url: 'https://github.com/Wangxiaolu0716/dsh-pocket-app',
    lastPush: '2026-10-30',
  },
  {
    name: 'ctf-solve-teach',
    desc: 'DSH 插件:教学式 CTF 解题,边解边讲,收尾生成可复现 Writeup',
    note: '把解题过程沉淀成能复现的笔记。',
    url: 'https://github.com/Wangxiaolu0716/ctf-solve-teach',
    lastPush: '2026-11-02',
  },
  {
    name: 'AutoAnswer_REDLAND',
    desc: 'AI 桌面答题工具:框选截图 + OCR + 本地知识库 + DeepSeek 兜底',
    note: 'fork 自 notxcm/AutoAnswer_ai,按 REDLAND 场景改造。',
    upstream: 'notxcm/AutoAnswer_ai',
    url: 'https://github.com/Wangxiaolu0716/AutoAnswer_REDLAND',
    lastPush: '2026-10-22',
  },
  {
    name: 'class-schedule',
    desc: 'Android 课表 App:登录教务系统自动导入,支持多校解析器,数据只存本机',
    note: '自己写的,无广告无账号,不连服务器。',
    url: 'https://github.com/Wangxiaolu0716/class-schedule',
    lastPush: '2026-10-09',
  },
];
