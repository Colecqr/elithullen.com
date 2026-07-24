/**
 * elithullen.com — static assets plus a small reactions API.
 *
 * Anything that isn't /api/* is handed straight to the static assets
 * binding, so the site keeps behaving exactly as it did before.
 */

const EMOJI = new Set(["heart", "cry", "poop"]);

// Only real writing/work pages may accumulate rows. This keeps a bored
// stranger from filling the table with junk slugs.
const SLUG_RE = /^\/(writing|work)\/[a-z0-9][a-z0-9-]*\/$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const emptyCounts = () => ({ heart: 0, cry: 0, poop: 0 });

async function readCounts(env, slug) {
  const { results } = await env.DB.prepare(
    "SELECT emoji, count FROM reactions WHERE slug = ?"
  )
    .bind(slug)
    .all();

  const counts = emptyCounts();
  for (const row of results ?? []) {
    if (EMOJI.has(row.emoji)) counts[row.emoji] = row.count;
  }
  return counts;
}

async function handleGet(url, env) {
  const slug = url.searchParams.get("slug") ?? "";
  if (!SLUG_RE.test(slug)) return json({ error: "Bad slug" }, 400);
  return json({ slug, counts: await readCounts(env, slug) });
}

async function handlePost(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad JSON" }, 400);
  }

  const slug = String(body?.slug ?? "");
  const emoji = String(body?.emoji ?? "");

  if (!SLUG_RE.test(slug)) return json({ error: "Bad slug" }, 400);
  if (!EMOJI.has(emoji)) return json({ error: "Bad emoji" }, 400);

  await env.DB.prepare(
    `INSERT INTO reactions (slug, emoji, count) VALUES (?, ?, 1)
     ON CONFLICT(slug, emoji) DO UPDATE SET count = count + 1`
  )
    .bind(slug, emoji)
    .run();

  return json({ slug, counts: await readCounts(env, slug) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/reactions") {
      try {
        if (request.method === "GET") return await handleGet(url, env);
        if (request.method === "POST") return await handlePost(request, env);
        return json({ error: "Method not allowed" }, 405);
      } catch (err) {
        return json({ error: "Server error", detail: String(err) }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
