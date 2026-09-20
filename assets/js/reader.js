let pdfDoc = null, currentPage = 1, currentScale = 1.4, searchCache = null;

const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d", { alpha: false });
const viewerEl = document.getElementById("viewer");
const loadingEl = document.getElementById("loading");
const loadingBar = document.getElementById("loadingBar");

const PART = window.PART_CONFIG;
const CHAPTER_PAGES = PART.chapterPages || {};
const MAX_DPR = 1.5;

function cfg() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = window.PDFJS_WORKER || "assets/js/pdf.worker.min.js";
}

function setLoading(msg, pct) {
  if (loadingEl) {
    loadingEl.style.display = "flex";
    if (pct != null) loadingEl.textContent = msg + " " + Math.round(pct) + "%";
    else loadingEl.textContent = msg;
  }
  if (loadingBar) loadingBar.style.width = (pct || 0) + "%";
}

function renderPage(pageNum) {
  if (!pdfDoc) return;
  currentPage = Math.min(Math.max(1, pageNum), pdfDoc.numPages);
  document.getElementById("pageInput").value = currentPage;
  document.getElementById("pageOf").textContent = "/ " + pdfDoc.numPages;
  document.getElementById("pageInfo").textContent =
    t("reader.page") + " " + currentPage + " " + t("reader.of") + " " + pdfDoc.numPages;
  pdfDoc.getPage(currentPage).then((page) => {
    const vp1 = page.getViewport({ scale: 1 });
    const availW = Math.max(260, viewerEl.clientWidth - 16);
    const fit = availW / vp1.width;
    currentScale = Math.min(Math.max(currentScale, fit * 1.02), 2.8);
    const viewport = page.getViewport({ scale: currentScale });
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    canvas.style.width = viewport.width + "px";
    canvas.style.height = viewport.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setLoading(t("reader.loading"), null);
    const renderTask = page.render({
      canvasContext: ctx,
      viewport,
      intent: "display",
      background: "#0b1520",
    });
    renderTask.promise.then(() => {
      loadingEl.style.display = "none";
      loadingBar.style.width = "0%";
    });
  });
}

function goTo(delta) {
  if (!pdfDoc) return;
  renderPage(currentPage + delta);
}

function zoom(d) {
  currentScale = Math.min(Math.max(0.45, currentScale + d), 2.8);
  if (pdfDoc) renderPage(currentPage);
}

async function loadPdf() {
  setLoading(t("reader.loading"), 0);
  const task = pdfjsLib.getDocument({ url: PART.file });
  task.onProgress = (p) => {
    if (p.total) setLoading(t("reader.loading"), (p.loaded / p.total) * 100);
  };
  pdfDoc = await task.promise;
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
  const pageIn = document.getElementById("pageInput");
  pageIn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const v = parseInt(e.target.value, 10);
      if (Number.isFinite(v)) renderPage(v);
    }
  });
  document.getElementById("searchInput").addEventListener("input", (e) => doSearch(e.target.value));
  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.key === "ArrowRight" || e.key === " ") goTo(1);
    else if (e.key === "ArrowLeft") goTo(-1);
    else if (e.key === "+" || e.key === "=") zoom(0.25);
    else if (e.key === "-") zoom(-0.25);
  });
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => renderPage(currentPage), 200);
  });
}

const chapterPagePromises = {};

async function pageOfChapter(n) {
  if (CHAPTER_PAGES[n]) return CHAPTER_PAGES[n];
  if (chapterPagePromises[n]) return chapterPagePromises[n];
  chapterPagePromises[n] = (async () => {
    const meta = QURAN.chapters.find((c) => c.n === n) || {};
    const candidates = [];
    if (meta.en) candidates.push(meta.en.split("/")[0].replace(/[^A-Za-z0-9 '-]/g, "").trim());
    if (meta.bn) candidates.push(meta.bn);
    for (let p = 1; p <= pdfDoc.numPages; p++) {
      const t1 = await pdfDoc.getPage(p).then((pg) => pg.getTextContent()).catch(() => null);
      if (!t1) continue;
      const text = t1.items.map((i) => i.str).join(" ");
      if (
        text.includes("Chapter-" + n) || text.includes("Chapter " + n + " ") ||
        text.includes("Chapter " + n + "[") || text.includes("Chapter " + n + "\n")
      ) return p;
      if (candidates.some((c) => c && text.includes(c))) return p;
    }
    return 1;
  })();
  return chapterPagePromises[n];
}

async function jumpToChapter(n) {
  const p = await pageOfChapter(n);
  renderPage(p);
  document.getElementById("pageInput").value = p;
  const arName = (QURAN.chapters.find((c) => c.n === n) || {}).ar;
  document.querySelectorAll(".side a.active").forEach((a) => a.classList.remove("active"));
  const btn = document.querySelector(`.side a[data-page-hint="#${arName}"]`);
  if (btn) btn.classList.add("active");
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
      if (searchMatches.length > 400) break;
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
  searchMatches.slice(0, 30).forEach((m) => {
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

(async function boot() {
  document.addEventListener("DOMContentLoaded", async () => {
    cfg();
    try {
      await loadPdf();
    } catch (err) {
      setLoading("Failed to load PDF: " + err, null);
      console.error(err);
    }
  });
})();