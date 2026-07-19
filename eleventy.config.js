export default function (eleventyConfig) {
  // Copy these through untouched
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Newest writing first
  eleventyConfig.addCollection("writing", (api) =>
    api.getFilteredByGlob("src/writing/*.md").reverse()
  );

  // Newest projects first
  eleventyConfig.addCollection("portfolio", (api) =>
    api.getFilteredByGlob("src/portfolio/*.md").reverse()
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
