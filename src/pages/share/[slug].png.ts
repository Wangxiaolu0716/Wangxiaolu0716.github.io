import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import qrcode from 'qrcode-generator';
import { BASE, categoryLabel, formatDate, isPublished, readingMinutes } from '../../utils/posts';
import { SITE } from '../../config';

// 每篇文章的竖版分享卡(1080×1440):标题 + 日期 + 标签 + 二维码。
// 依赖中文字体 .fonts/NotoSansSC.otf(CI 由 workflow 下载);缺失时回退默认分享图。

export async function getStaticPaths() {
  const posts = await getCollection('blog', (post) => isPublished(post));
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const FONT_PATH = path.resolve('.fonts/NotoSansSC.otf');

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ props }: { props: { post: any } }) {
  const { post } = props;
  const articleUrl = `${SITE.url}${BASE}blog/${post.id}/`;

  if (!fs.existsSync(FONT_PATH)) {
    const fallback = await sharp(path.resolve('public/og.png')).png().toBuffer();
    return new Response(new Uint8Array(fallback), {
      headers: { 'Content-Type': 'image/png' },
    });
  }

  // 二维码:先用 SVG 生成,再转 PNG,交给 satori 当图片用
  const qr = qrcode(0, 'M');
  qr.addData(articleUrl);
  qr.make();
  const qrSvg = qr.createSvgTag({ cellSize: 10, margin: 2, scalable: true });
  const qrPng = await sharp(Buffer.from(qrSvg)).png().toBuffer();
  const qrDataUrl = `data:image/png;base64,${qrPng.toString('base64')}`;

  const title: string = post.data.title;
  const titleSize = title.length > 30 ? 56 : title.length > 18 ? 64 : 76;
  const date = formatDate(post.data.pubDate);
  const tags: string[] = (post.data.tags ?? []).slice(0, 3);
  const minutes = readingMinutes(post.body);
  const summary = String(post.data.description ?? '').slice(0, 90);

  const fontData = fs.readFileSync(FONT_PATH);
  const satori = (await import('satori')).default;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px 76px',
          background: 'linear-gradient(165deg, #ffffff 0%, #faf7fa 55%, #f6eef2 100%)',
          color: '#241a3a',
          fontFamily: 'Noto Sans SC',
          position: 'relative',
        },
        children: [
          { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: '#c25d76', display: 'flex' } } },
          {
            type: 'div',
            props: {
              style: { display: 'flex', fontSize: '24px', letterSpacing: '0.24em', color: '#c25d76', marginBottom: '44px' },
              children: '// BLOG — WANG XIAOLU',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                width: '928px',
                fontSize: `${titleSize}px`,
                fontWeight: 700,
                lineHeight: 1.3,
                wordBreak: 'break-word',
              },
              children: esc(title),
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', width: '120px', height: '4px', background: '#c25d76', marginTop: '44px', marginBottom: '28px' },
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', fontSize: '28px', color: '#6e6580' },
              children: `${date} · ${categoryLabel(post.data.category)} · 约 ${minutes} 分钟`,
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '16px', marginTop: '26px' },
              children: tags.map((t: string) => ({
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: '22px',
                    color: '#6e6580',
                    border: '1px solid #ddd6e2',
                    borderRadius: '999px',
                    padding: '8px 22px',
                  },
                  children: `# ${esc(t)}`,
                },
              })),
            },
          },
          // 摘要
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                width: '928px',
                fontSize: '26px',
                color: '#6e6580',
                lineHeight: 1.75,
                marginTop: '40px',
                wordBreak: 'break-word',
              },
              children: esc(summary),
            },
          },
          // 二维码区
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: '36px', marginTop: '76px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      padding: '20px',
                      background: '#ffffff',
                      border: '1px solid #e3dbe6',
                      borderRadius: '24px',
                    },
                    children: [
                      { type: 'img', props: { src: qrDataUrl, width: 216, height: 216, style: { display: 'flex' } } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', fontSize: '34px', fontWeight: 700, color: '#241a3a' },
                          children: '微信扫码读全文',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', fontSize: '24px', color: '#6e6580', marginTop: '14px' },
                          children: 'xuhuohua.xyz',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: '76px',
                bottom: '64px',
                display: 'flex',
                fontSize: '22px',
                color: '#9a93a8',
              },
              children: `超级宅王小路的博客 · ${SITE.author}`,
            },
          },
        ],
      },
    },
    {
      width: 1080,
      height: 1440,
      fonts: [{ name: 'Noto Sans SC', data: fontData, weight: 700, style: 'normal' }],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}
