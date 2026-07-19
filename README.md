# elithullen.com

My home base on the internet — a dot-grid "fancy linktree" hosting my
signature, social links, résumé, writing, and (eventually) portfolio.

Built with [Eleventy](https://www.11ty.dev/). Writing is authored in Markdown;
Eleventy turns it into styled pages.

## Publishing a new piece of writing

1. Create a new `.md` file in `src/writing/`. The filename becomes the URL,
   so `on-attention.md` → `elithullen.com/writing/on-attention/`.
2. Start the file with front matter:

   ```markdown
   ---
   title: On attention
   date: 2026-08-02
   description: One line, used for search results and link previews.
   ---

   Write here.
   ```

3. Commit and push. Cloudflare rebuilds and deploys automatically.

The Writing index sorts itself by date, newest first — never edit it by hand.

## Adding a portfolio project

Same idea, but the file goes in `src/portfolio/` and has a few more fields:

```markdown
---
title: Some project
date: 2026-08-02
year: 2026
role: Design & build
description: One sentence — this is the blurb on the Portfolio index.
link: https://example.com
source: https://github.com/you/repo
cover: /assets/projects/thing.png
---

What the project was, and what you did.
```

`link`, `source`, and `cover` are all optional — leave them blank and those
elements simply don't render.

## Local preview

```powershell
npm install   # first time only
npm start
```

Then open http://localhost:4173. It live-reloads as you edit.

## Structure

```
src/
  index.html          home page (signature + socials + index)
  writing.njk         the Writing index page
  writing/*.md        individual pieces  ← you mostly live here
  writing/writing.json  shared settings for all pieces
  portfolio.njk       the Portfolio index page
  portfolio/*.md      individual projects
  portfolio/portfolio.json  shared settings for all projects
  _includes/layouts/  page templates
  styles.css          all styling
  assets/             signature.png, resume.pdf
```

## Deploy

Cloudflare Pages, connected to this GitHub repo:

- **Build command:** `npm run build`
- **Build output directory:** `_site`
