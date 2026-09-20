let pdfDoc = null, currentPage = 1, currentScale = 1.2, searchCache = null;

const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");
const viewerEl = document.getElementById("viewer");
const loadingEl = document.getElementById("loading");

const PART = window.PART_CONFIG;
const CHAPTER_PAGES = PART.chapterPages || {};

function cfg() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = window.PDFJS_WORKER || "assets/js/pdf.worker.min.js";
}

function renderPage(pageNum) {
  if (!pdfDoc) return;
  currentPage = Math.min(Math.max(1, pageNum), pdfDoc.numPages);
  document.getElementById("pageInput").value = currentPage;
  document.getElementById("pageOf").textContent = "/ " + pdfDoc.numPages;
  document.getElementById("pageInfo").textContent = t("reader.page") + " " + currentPage + " " + t("reader.of") + " " + pdfDoc.numPages;
  document.querySelectorAll("[id]").forEach((el) => {
    if (/^(first|prev|next|last)PageBtn2?$/.test(el.id)) el.style.color = "";
  });
  pdfDoc.getPage(currentPage).then((page) => {
    const vp1 = page.getViewport({ scale: 1 });
    const availW = Math.max(320, viewerEl.clientWidth - 24);
    const fit = (availW / vp1.width) * 0.96;
    currentScale = Math.min(Math.max(currentScale, fit), 3);
    const viewport = page.getViewport({ scale: currentScale });
    const dpr = window.devicePixelRatio || 1;
    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    canvas.style.width = viewport.width + "px";
    canvas.style.height = viewport.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const renderTask = page.render({
      canvasContext: ctx,
      viewport,
      background: "#0b1520",
    });
    renderTask.promise.then(() => {
      loadingEl.style.display = "none";
    });
  });
}

async function goTo(delta) {
  if (!pdfDoc) return;
  renderPage(currentPage + delta);
}

function zoom(d) {
  currentScale = Math.min(Math.max(0.4, currentScale + d), 3);
  if (pdfDoc) renderPage(currentPage);
}

async function loadPdf() {
  loadingEl.style.display = "block";
  pdfDoc = await pdfjsLib.getDocument({ url: PART.file }).promise;
  document.getElementById("pageOf").textContent = "/ " + pdfDoc.numPages;
  const hash = parseInt(location.hash.replace("#page-", ""), 10);
  renderPage(Number.isFinite(hash) && hash > 0 ? hash : PART.startPage || 1);
  wireNav();
}

function wireNav() {
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  };
  bind("firstPageBtn", () => renderPage(1));
  bind("firstPageBtn2", () => renderPage(1));
  bind("lastPageBtn", () => renderPage(pdfDoc.numPages));
  bind("lastPageBtn2", () => renderPage(pdfDoc.numPages));
  bind("prevPageBtn", () => goTo(-1));
  bind("prevPageBtn2", () => goTo(-1));
  bind("nextPageBtn", () => goTo(1));
  bind("nextPageBtn2", () => goTo(1));
  bind("zoomInBtn", () => zoom(0.25));
  bind("zoomOutBtn", () => zoom(-0.25));
  document.getElementById("pageInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = parseInt(e.target.value, 10);
      if (Number.isFinite(val)) renderPage(val);
    }
  });
  document.getElementById("pageInput").addEventListener("change", (e) => {
    const val = parseInt(e.target.value, 10);
    if (Number.isFinite(val)) renderPage(val);
  });
  document.getElementById("searchInput").addEventListener("input", (e) => doSearch(e.target.value));
  // keyboard arrows
  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.key === "ArrowRight") goTo(1);
    else if (e.key === "ArrowLeft") goTo(-1);
    else if (e.key === "+" || e.key === "=") zoom(0.25);
    else if (e.key === "-") zoom(-0.25);
  });
  window.addEventListener("resize", () => renderPage(currentPage));
}

const chapterPagePromises = {};

async function pageOfChapter(n) {
  if (CHAPTER_PAGES[n]) return CHAPTER_PAGES[n];
  if (chapterPagePromises[n]) return chapterPagePromises[n];
  const names = (QURAN.chapters.find((c) => c.n === n) || {}).en || "";
  const short = names ? names.split("/")[0].replace(/[^A-Za-z0-9 '-]/g, "").trim() : null;
  const searchTerm = short || "Chapter- " + n;
  chapterPagePromises[n] = (async () => {
    const start = 1;
    for (let p = start; p <= pdfDoc.numPages; p++) {
      const t1 = await pdfDoc.getPage(p).then((pg) => pg.getTextContent()).catch(() => null);
      if (!t1) continue;
      const text = t1.items.map((i) => i.str).join(" ");
      if (text.includes(searchTerm) || text.includes("Chapter-" + n) || text.includes("Chapter " + n + " ") || text.includes("Chapter " + n + "\n")) {
        return p;
      }
    }
    return 1;
  })();
  return chapterPagePromises[n];
}

async function jumpToChapter(n) {
  const p = await pageOfChapter(n);
  renderPage(p);
  const btn = document.querySelector(`.side a[data-page-hint="#${QURAN.chapters.find((c) => c.n === n)?.ar}"]`);
  if (btn) {
    document.querySelectorAll(".side a.active").forEach((a) => a.classList.remove("active"));
    btn.classList.add("active");
  }
}

let searchIdx = 0, searchMatches = [];

async function doSearch(q) {
  const res = document.getElementById("searchRes");
  if (!q.trim()) { res.style.display = "none"; return; }
  res.style.display = "block";
  if (searchCache !== q) {
    searchCache = q;
    searchMatches = [];
    searchIdx = 0;
    for (let p = 1; p <= pdfDoc.numPages; p++) {
      if (searchMatches.length > 500) break;
      const t1 = await pdfDoc.getPage(p).then((pg) => pg.getTextContent()).catch(() => null);
      if (!t1) continue;
      const text = t1.items.map((i) => i.str).join(" ");
      const idx = text.indexOf(q);
      if (idx !== -1) {
        const s = text.slice(Math.max(0, idx - 30), idx + 60).replace(/\s+/g, " ");
        searchMatches.push({ p, s });
      }
    }
  }
  res.innerHTML = "";
  if (!searchMatches.length) {
    res.innerHTML = `<div style="padding:8px;color:var(--muted)">${t("reader.noResults")}</div>`;
    return;
  }
  searchMatches.slice(0, 30).forEach((m, i) => {
    const b = document.createElement("button");
    b.textContent = `${m.p} · ${m.s}`;
    b.addEventListener("click", () => {
      renderPage(m.p);
      res.style.display = "none";
    });
    res.appendChild(b);
  });
  if (searchMatches.length > 30) {
    res.insertAdjacentHTML("beforeend", `<div style="padding:6px;color:var(--muted);font-size:.8rem">··· ${searchMatches.length} …</div>`);
  }
}

function onLangChange() {
  document.getElementById("pageInfo").textContent =
    t("reader.page") + " " + currentPage + " " + t("reader.of") + " " + (pdfDoc ? pdfDoc.numPages : "");
  document.getElementById("searchInput").placeholder = t("reader.search");
}

document.addEventListener("DOMContentLoaded", () => {
  cfg();
  loadPdf();
});