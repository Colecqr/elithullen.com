/**
 * Reaction buttons. Counts load after render because pages are edge-cached,
 * so the HTML itself can't carry a fresh number.
 */
(function () {
  const bar = document.querySelector("[data-reactions]");
  if (!bar) return;

  const slug = bar.dataset.slug;
  const storageKey = "reacted:" + slug;

  const alreadyReacted = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  };

  const remember = (emoji) => {
    try {
      const list = alreadyReacted();
      if (!list.includes(emoji)) list.push(emoji);
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {
      /* private browsing — reacting still works, it just won't be remembered */
    }
  };

  const buttons = [...bar.querySelectorAll("[data-emoji]")];

  const paint = (counts) => {
    const mine = alreadyReacted();
    for (const btn of buttons) {
      const emoji = btn.dataset.emoji;
      const n = counts?.[emoji] ?? 0;
      btn.querySelector("[data-count]").textContent = n;
      if (mine.includes(emoji)) {
        btn.classList.add("is-mine");
        btn.disabled = true;
      }
    }
    bar.classList.add("is-ready");
  };

  fetch("/api/reactions?slug=" + encodeURIComponent(slug))
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => paint(data?.counts))
    .catch(() => paint(null));

  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      const emoji = btn.dataset.emoji;
      if (alreadyReacted().includes(emoji)) return;

      // Optimistic: bump immediately, reconcile with the server's number.
      const countEl = btn.querySelector("[data-count]");
      countEl.textContent = (parseInt(countEl.textContent, 10) || 0) + 1;
      btn.classList.add("is-mine");
      btn.disabled = true;
      remember(emoji);

      fetch("/api/reactions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, emoji }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.counts) paint(data.counts);
        })
        .catch(() => {
          /* keep the optimistic count; it'll correct on next load */
        });
    });
  }
})();
