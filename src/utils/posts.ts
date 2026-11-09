import type { CollectionEntry } from 'astro:content';
import siteState from '../data/site-state.json';

export type Post = CollectionEntry<'blog'>;

/** 一键隐藏开关:置为 true 时,文章与小记全部从站点消失(约 1 分钟生效) */
export const contentHidden = Boolean(
  (siteState as { contentHidden?: boolean }).contentHidden,
);

/**
 * base 路径处理:GitHub Pages 项目站点部署在 /blog/ 子路径下,
 * 所有内部链接都要走 withBase(),换部署方式时只改 astro.config 的 base。
 */
const RAW_BASE = import.meta.env.BASE_URL;
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

export const withBase = (path: string): string =>
  `${BASE}${path.replace(/^\/+/, '')}`;

/** 按发布日期从新到旧排序 */
export const sortPostsDesc = (posts: Post[]): Post[] =>
  [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

/** 已发布:不是草稿,且已到发布时间(定时文章到点后才会生成);隐藏状态下全部视为不可见 */
export const isPublished = (post: Post): boolean =>
  !contentHidden &&
  !post.data.draft &&
  post.data.pubDate.getTime() <= Date.now();

/** 板块定义:key 对应 frontmatter 的 category 字段 */
export const CATEGORIES = [
  { key: 'tech', label: '技术分享' },
  { key: 'essay', label: '杂谈随笔' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

export const categoryLabel = (key: string): string =>
  CATEGORIES.find((c) => c.key === key)?.label ?? key;

/** 汇总所有标签及出现次数(按次数从多到少) */
export const getAllTags = (
  posts: Post[],
): { tag: string; count: number }[] => {
  const counter = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
};

/** 按年份分组(组内从新到旧) */
export const groupByYear = (posts: Post[]): [number, Post[]][] => {
  const map = new Map<number, Post[]>();
  for (const post of sortPostsDesc(posts)) {
    const year = post.data.pubDate.getFullYear();
    const list = map.get(year) ?? [];
    list.push(post);
    map.set(year, list);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
};

/** 粗略阅读时长:中文按每分钟 400 字算 */
export const readingMinutes = (body?: string): number => {
  const chars = (body ?? '').replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 400));
};

/** 中文日期格式:2026 年 10 月 30 日(统一按东八区,构建机通常是 UTC) */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** 文章时间:日期 + 东八区时分;没有具体时间的(零点)只显示日期 */
export const formatDateTime = (date: Date): string => {
  const hm = date.toLocaleTimeString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return hm === '00:00' ? formatDate(date) : `${formatDate(date)} ${hm}`;
};

/** 小记时间:按东八区显示,有时间带时分;整点零分的纯日期只显示日期 */
export const formatNoteTime = (date: Date): string => {
  const day = date.toLocaleDateString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const hm = date.toLocaleTimeString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return hm === '00:00' ? day : `${day} ${hm}`;
};
