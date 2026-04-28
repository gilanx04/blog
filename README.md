# Blog Astro di Cloudflare Pages

Blog statis berbasis Astro, siap deploy ke Cloudflare Pages.

## Perintah lokal

```sh
npm install --ignore-scripts
npm run dev
npm run build
npm run preview
```

Catatan Termux: `npm install` biasa dapat gagal saat build native `sharp`. Pakai `npm install --ignore-scripts`; build Astro tetap berhasil di proyek ini.

## Deploy Cloudflare Pages

Pengaturan dashboard Pages:

| Field | Value |
| :-- | :-- |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `blog` jika repo root berada satu level di atas folder ini |

Deploy dari terminal:

```sh
npm run deploy
```

Set environment variable `SITE` ke URL final blog, misalnya `https://blog.example.com`. Jika tidak diset, config memakai `CF_PAGES_URL` dari Cloudflare Pages, lalu fallback ke `https://example.com`.

## Dashboard Admin

Dashboard Decap CMS tersedia di:

```text
/admin/
```

Sebelum deploy, edit `public/admin/config.yml`:

```yml
backend:
  name: github
  repo: OWNER/REPO
  branch: main
```

Ganti `OWNER/REPO` dengan repo GitHub yang dipakai Cloudflare Pages. Untuk production, Decap CMS juga butuh OAuth GitHub. Cloudflare Pages tidak menyediakan Git Gateway bawaan, jadi siapkan OAuth app/backend auth Decap atau layanan OAuth kompatibel.

Mode lokal:

```sh
npm run dev
npx decap-server
```

Buka `http://localhost:4321/admin/`.

## Struktur

```text
src/content/blog/   Artikel Markdown dan MDX
src/assets/uploads/ Upload gambar dari Decap CMS
src/pages/          Halaman Astro
src/components/     Komponen UI
public/             Asset statis
dist/               Output build
```

Artikel baru bisa dibuat sebagai file `.md` atau `.mdx` di `src/content/blog/`.
