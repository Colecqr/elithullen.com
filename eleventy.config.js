export default function (eleventyConfig) {
  // Copy these through untouched
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/reactions.js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Newest writing first
  eleventyConfig.addCollection("writing", (api) =>
    api.getFilteredByGlob("src/writing/*.md").reverse()
  );

  // Newest work first
  eleventyConfig.addCollection("work", (api) =>
    api.getFilteredByGlob("src/work/*.md").reverse()
  );

  // "March 4, 2026"
  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // "2026-03-04" for <time datetime="">
  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  // Current year, for the footer
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Accepts a bare video id or any common YouTube URL (watch, youtu.be,
  // embed, shorts, live) so you can paste whatever the address bar gives you.
  const youtubeId = (input) => {
    if (!input) return "";
    const s = String(input).trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    const m = s.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
    );
    return m ? m[1] : "";
  };

  const escapeAttr = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // {% youtube "https://youtu.be/xxxx", "Optional title" %}
  eleventyConfig.addShortcode("youtube", (input, title) => {
    const id = youtubeId(input);
    if (!id) return "";
    return [
      '<div class="video-embed">',
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}"`,
      ` title="${escapeAttr(title || "YouTube video player")}"`,
      ' loading="lazy" allowfullscreen',
      ' referrerpolicy="strict-origin-when-cross-origin"',
      ' allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">',
      "</iframe>",
      "</div>",
    ].join("");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
