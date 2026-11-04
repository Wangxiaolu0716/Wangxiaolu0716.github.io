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
];
