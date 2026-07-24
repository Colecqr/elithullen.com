---
title: A sample project
date: 2026-07-18
year: 2026
role: Design & build
description: A placeholder project, here to show the format. Delete me.
video:
link:
source:
---

This file is a placeholder so you can see how a project page looks. Delete it
and replace it with real work.

## Leading with a video

For a video project, put the YouTube link in the `video` field up top and it
becomes the lead media on the page:

```yaml
video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

Paste whatever the address bar gives you — a normal watch link, a `youtu.be`
short link, a Shorts URL, or just the bare video id all work.

## Dropping a video mid-page

To put a video partway through the writeup instead, use this anywhere in the
body:

{% raw %}
```
{% youtube "https://youtu.be/dQw4w9WgXcQ", "What this clip shows" %}
```
{% endraw %}

The second part is the title, used by screen readers. You can leave it off.

Videos are 16:9, scale down to phone width, and only load when scrolled into
view so they don't slow the page down.

## The fields you can use

Everything above the `---` is front matter:

- `title` and `description` — the description is the blurb shown on the Work
  index, so make it one clear sentence.
- `year` — shown on the index and the project page.
- `role` — what you actually did, like `Design & build` or `Photography`.
- `video` — a YouTube link. Becomes the lead media.
- `cover` — an image path like `/assets/projects/thing.png`. Used only when
  there's no `video`.
- `link` — a URL to the live thing. Leave it blank and the button disappears.
- `source` — a repo URL, same deal.
- `date` — controls ordering on the index. Newest first.

## Writing the body

Below the front matter, write however much you want about the project — the
problem, what you made, what you'd do differently. Same Markdown as the
Writing section: `##` for subheadings, `*italics*`, `**bold**`, and lists.

Images go in `src/assets/` and are referenced like this:

```markdown
![Description of the image](/assets/projects/my-image.png)
```
