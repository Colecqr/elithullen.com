# elithullen.com

My home base on the internet — a dot-grid "fancy linktree" hosting my
signature, social links, résumé, and (eventually) portfolio.

Static site: plain `index.html` + `styles.css`, no build step.

## Local preview

This machine has no Node or Python, so there's a tiny PowerShell static server:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1
```

Then open http://localhost:4173.

## Assets

- `assets/signature.png` — handwritten signature (rendered with `mix-blend-mode: multiply`)
- `assets/resume.pdf` — résumé (linked as index entry 01)

## Deploy

Hosted on Cloudflare Pages, connected to this GitHub repo. No build command;
output/root directory is `/`.
