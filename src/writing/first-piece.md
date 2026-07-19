---
title: A first piece
date: 2026-07-18
description: A placeholder piece, here to show the format. Delete me.
---

This file is a placeholder so you can see how a piece looks. Delete it whenever
you're ready and replace it with something real.

Everything above the `---` line is **front matter** — the settings for this
piece. You only ever need three fields: `title`, `date`, and `description`.

## Writing in Markdown

You write in plain text. A few things you'll actually use:

Use asterisks for *italics* and double asterisks for **bold**. Start a line with
`##` to make a subheading, like the one above this paragraph.

Blank lines separate paragraphs. That's the whole trick — you don't need to
think about HTML tags at all.

> Indent a line with `>` to pull a quote out of the body text, like this.

Links look like [this one to the home page](/). Lists work how you'd expect:

- Start a line with a hyphen
- And keep going
- For as long as you need

---

To publish a new piece: make a new `.md` file in `src/writing/`, give it front
matter like the block at the top of this file, write, and push to GitHub.
Cloudflare rebuilds the site automatically. The Writing index orders itself by
date, newest first — you never edit it by hand.
