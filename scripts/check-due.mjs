import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = 'src/content/blog';
const SITE = process.env.SITE_URL || 'https://xuhuohua.xyz';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!entry.name.endsWith('.md') || entry.name.startsWith('_')) return [];
    return [full];
  });
}

function frontmatter(text) {
  const match = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf(':');
    if (i < 0) continue;
    const key = t.slice(0, i).trim();
    let value = t.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return meta;
}

/** 纯日期按东八区零点解析，和站点构建规则一致 */
function parseDate(value) {
  const t = String(value || '').trim();
  if (!t) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
    return new Date(`${t}T00:00:00+08:00`);
  }
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
}

const now = Date.now();
const due = [];

for (const file of walk(BLOG_DIR)) {
  const meta = frontmatter(fs.readFileSync(file, 'utf8'));
  if (meta.draft === 'true') continue;
  const pub = parseDate(meta.pubDate);
  if (!pub || pub.getTime() > now) continue;

  const slug = path
    .relative(BLOG_DIR, file)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '');
  const url = `${SITE}/blog/${slug
    .split('/')
    .map(encodeURIComponent)
    .join('/')}/`;

  let needBuild = false;
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) needBuild = true;
    console.log(
      `[check] ${slug}: HTTP ${res.status}${needBuild ? ' -> 需要构建' : ' -> 已上线'}`,
    );
  } catch (error) {
    needBuild = true;
    console.log(`[check] ${slug}: 请求失败(${error.message}) -> 需要构建`);
  }
  if (needBuild) due.push(slug);
}

const shouldBuild = due.length > 0;
console.log(
  `[check] 到点未上线文章: ${due.length} 篇，should_build=${shouldBuild}`,
);
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `should_build=${shouldBuild}\n`);
}
