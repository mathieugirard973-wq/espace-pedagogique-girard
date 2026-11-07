/* Visionneuse pédagogique PDF — chargement à la demande, moteur PDF.js local.
   Apache-2.0 pour la bibliothèque PDF.js fournie dans assets/vendor/pdfjs/. */
let enginePromise;
let active = null;

const $ = (root, selector) => root.querySelector(selector);

function announce(state, message) {
  const node = $(state.root, '[data-pdf-status]');
  if (node) node.textContent = message;
}

function updateControls(state) {
  if (active !== state) return;
  const count = state.document ? state.document.numPages : 0;
  const pageInput = $(state.root, '[data-pdf-page]');
  const countLabel = $(state.root, '[data-pdf-pages]');
  const previous = $(state.root, '[data-pdf-prev-page]');
  const next = $(state.root, '[data-pdf-next-page]');
  const zoomLabel = $(state.root, '[data-pdf-zoom-label]');
  if (pageInput) {
    pageInput.max = String(Math.max(1, count));
    pageInput.value = String(state.page);
    pageInput.disabled = !count;
  }
  if (countLabel) countLabel.textContent = String(count || '—');
  if (previous) previous.disabled = !count || state.page <= 1;
  if (next) next.disabled = !count || state.page >= count;
  if (zoomLabel) zoomLabel.textContent = Math.round(state.zoom * 100) + ' %';
  for (const name of ['fit','fit-page']) {
    const btn = $(state.root, '[data-pdf-action="' + name + '"]');
    if (btn) btn.setAttribute('aria-pressed', String(state.fitMode === (name === 'fit-page' ? 'page' : 'width')));
  }
  for (const name of ['zoom-in','zoom-out','fit','fit-page','print']) {
    const btn = $(state.root, '[data-pdf-action="' + name + '"]');
    if (btn) btn.disabled = !count;
  }
}

function useNativeFallback(state, message) {
  if (active !== state) return;
  state.root.classList.add('pdf-native-mode');
  const fallback = $(state.root, '[data-pdf-native]');
  const frame = $(state.root, '[data-pdf-native-frame]');
  if (fallback) fallback.hidden = false;
  if (frame) frame.src = state.url + '#view=FitH';
  announce(state, message + ' Le lecteur PDF du navigateur reste disponible.');
  const buttons = state.root.querySelectorAll('[data-pdf-action="zoom-in"],[data-pdf-action="zoom-out"],[data-pdf-action="fit"],[data-pdf-action="fit-page"],[data-pdf-action="prev-page"],[data-pdf-action="next-page"]');
  buttons.forEach(button => { button.disabled = true; });
  const printButton = $(state.root, '[data-pdf-action="print"]');
  if (printButton) printButton.disabled = false;
}

async function engine() {
  if (!enginePromise) {
    enginePromise = import('../vendor/pdfjs/pdf.min.mjs').then(lib => {
      lib.GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
      return lib;
    }).catch(error => {
      enginePromise = null;
      throw error;
    });
  }
  return enginePromise;
}

async function renderPage(state) {
  if (active !== state || !state.document) return;
  const serial = ++state.serial;
  if (state.renderTask) {
    try { state.renderTask.cancel(); } catch (_) {}
    state.renderTask = null;
  }
  updateControls(state);
  announce(state, 'Chargement de la page ' + state.page + '…');
  try {
    const page = await state.document.getPage(state.page);
    if (active !== state || serial !== state.serial) return;
    const stage = $(state.root, '[data-pdf-stage]');
    const container = $(state.root, '[data-pdf-canvas-host]');
    if (!stage || !container) return;
    const atOne = page.getViewport({scale:1});
    // Les 16 px de marge intérieure du support PDF doivent rester visibles.
    const availableWidth = Math.max(1, stage.clientWidth - 34);
    const availableHeight = Math.max(1, stage.clientHeight - 34);
    const widthScale = availableWidth / atOne.width;
    let scale;
    if (state.fitMode === 'page') {
      // Conserver toute la feuille dans la zone de lecture, même après redimensionnement.
      scale = Math.min(3.5, Math.max(.05, Math.min(widthScale, availableHeight / atOne.height)));
      state.zoom = scale / widthScale;
      updateControls(state);
    } else {
      scale = Math.min(3.5, Math.max(.05, widthScale * state.zoom));
    }
    const viewport = page.getViewport({scale});
    const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(16000000 / Math.max(1, viewport.width * viewport.height)));
    const canvas = document.createElement('canvas');
    canvas.className = 'pdf-page-canvas';
    canvas.width = Math.max(1, Math.round(viewport.width * ratio));
    canvas.height = Math.max(1, Math.round(viewport.height * ratio));
    canvas.style.width = Math.round(viewport.width) + 'px';
    canvas.style.height = Math.round(viewport.height) + 'px';
    canvas.setAttribute('aria-label', 'Page ' + state.page + ' du document');
    const ctx = canvas.getContext('2d', {alpha:false});
    const task = page.render({
      canvasContext:ctx,
      viewport:viewport,
      background:'#ffffff',
      transform:ratio === 1 ? undefined : [ratio,0,0,ratio,0,0]
    });
    state.renderTask = task;
    await task.promise;
    if (active !== state || serial !== state.serial) return;
    container.replaceChildren(canvas);
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    announce(state, 'Page ' + state.page + ' sur ' + state.document.numPages + ' affichée.');
  } catch (error) {
    if (error && (error.name === 'RenderingCancelledException' || error.name === 'AbortException')) return;
    console.error('Erreur de rendu PDF', error);
    if (active === state && serial === state.serial) useNativeFallback(state, 'Impossible de dessiner cette page.');
  } finally {
    if (active === state && serial === state.serial) state.renderTask = null;
  }
}

function pageTo(state, next) {
  if (!state.document) return;
  const clamped = Math.max(1, Math.min(state.document.numPages, Number(next) || 1));
  if (state.page !== clamped) {
    state.page = clamped;
    renderPage(state);
  } else {
    updateControls(state);
  }
}

function zoomTo(state, next) {
  if (!state.document) return;
  state.fitMode = 'manual';
  state.zoom = Math.max(.1, Math.min(3, Math.round(next * 100) / 100));
  updateControls(state);
  renderPage(state);
}

function safeText(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

async function printAll(state) {
  // Ouvrir immédiatement pendant le clic : les navigateurs bloquent sinon les pop-ups.
  const popup = window.open('', '_blank');
  if (!popup) {
    announce(state, 'Autorise les fenêtres contextuelles pour imprimer, ou utilise le bouton Ouvrir le PDF.');
    return;
  }
  const title = safeText(state.title || 'Document pédagogique');
  popup.document.open();
  popup.document.write('<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>' + title + '</title><style>' +
    'body{margin:0;background:#eee;color:#111;font:15px Arial,sans-serif}' +
    '.print-top{position:sticky;top:0;background:#142b48;color:white;padding:12px 18px;z-index:5}' +
    'button{padding:8px 15px;border:0;border-radius:6px;background:#d8ae56;color:#111;font-weight:bold;cursor:pointer}' +
    '.sheet{display:block;margin:18px auto;max-width:96%;box-shadow:0 3px 18px #0003;width:auto;height:auto}' +
    '#progress{padding:15px;text-align:center}' +
    '@media print{@page{margin:8mm}body{background:white}.print-top,#progress{display:none}.sheet{display:block;max-width:100%;max-height:calc(100vh - 18mm);width:auto;height:auto;margin:0 auto;box-shadow:none;break-after:page;page-break-after:always}}' +
    '</style></head><body><div class="print-top"><strong>' + title + '</strong> &nbsp; <button id="print-now" type="button" disabled>Imprimer toutes les pages</button></div>' +
    '<div id="progress" role="status">Préparation du document…</div><div id="pages"></div></body></html>');
  popup.document.close();
  const button = popup.document.getElementById('print-now');
  button.addEventListener('click', () => popup.print());
  const progress = popup.document.getElementById('progress');
  if (!state.document || state.document.numPages > 60) {
    progress.textContent = 'Ouverture du document dans le lecteur natif pour impression.';
    popup.location.href = new URL(state.url, document.baseURI).href;
    return;
  }
  const objectURLs = [];
  try {
    for (let i=1;i<=state.document.numPages;i++) {
      if (popup.closed) return;
      progress.textContent = 'Préparation de la page ' + i + ' / ' + state.document.numPages + '…';
      const page = await state.document.getPage(i);
      const base = page.getViewport({scale:1});
      const scale = Math.min(1.8, 1050 / base.width);
      const viewport = page.getViewport({scale});
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      await page.render({canvasContext:canvas.getContext('2d',{alpha:false}), viewport:viewport, background:'#ffffff'}).promise;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Conversion de la page impossible');
      const objectURL = URL.createObjectURL(blob);
      objectURLs.push(objectURL);
      const image = popup.document.createElement('img');
      image.className = 'sheet';
      image.alt = 'Page ' + i;
      image.src = objectURL;
      popup.document.getElementById('pages').append(image);
      try { await image.decode(); } catch (_) {}
      canvas.width = canvas.height = 0;
    }
    if (popup.closed) return;
    progress.textContent = 'Document prêt : ' + state.document.numPages + ' pages.';
    button.disabled = false;
    popup.focus();
    popup.print();
  } catch (error) {
    console.error('Impression PDF',error);
    if (!popup.closed) {
      progress.textContent = 'Impression directe indisponible. Le PDF original va s’ouvrir.';
      popup.location.href = new URL(state.url, document.baseURI).href;
    }
  } finally {
    // Les images restent utilisables tant que la fenêtre d'impression est ouverte.
    if (!popup.closed) {
      popup.addEventListener('unload', () => objectURLs.forEach(url => URL.revokeObjectURL(url)), {once:true});
    } else objectURLs.forEach(url => URL.revokeObjectURL(url));
  }
}

async function toggleFullscreen(state) {
  const root = state.root;
  try {
    if (document.fullscreenElement === root) {
      await document.exitFullscreen();
    } else if (root.requestFullscreen) {
      await root.requestFullscreen();
    } else {
      root.classList.toggle('pdf-simulated-fullscreen');
    }
  } catch (error) {
    root.classList.toggle('pdf-simulated-fullscreen');
  }
  const fullscreen = document.fullscreenElement === root || root.classList.contains('pdf-simulated-fullscreen');
  const button = $(root, '[data-pdf-action="fullscreen"]');
  if (button) button.textContent = fullscreen ? 'Quitter le plein écran' : 'Plein écran';
  if (state.document) renderPage(state);
}

function handleControls(state, e) {
  const button = e.target.closest('[data-pdf-action]');
  if (!button || !state.root.contains(button) || button.disabled) return;
  const action = button.dataset.pdfAction;
  if (action === 'prev-page') pageTo(state,state.page - 1);
  if (action === 'next-page') pageTo(state,state.page + 1);
  if (action === 'zoom-in') zoomTo(state,state.zoom * 1.25);
  if (action === 'zoom-out') zoomTo(state,state.zoom / 1.25);
  if (action === 'fit') {state.fitMode = 'width';state.zoom = 1;renderPage(state);}
  if (action === 'fit-page') {state.fitMode = 'page';renderPage(state);}
  if (action === 'fullscreen') toggleFullscreen(state);
  if (action === 'print') printAll(state);
}

export function dispose() {
  const state = active;
  if (!state) return;
  active = null;
  state.serial++;
  if (state.renderTask) {
    try { state.renderTask.cancel(); } catch (_) {}
  }
  state.resizeObserver?.disconnect();
  window.removeEventListener('resize',state.onResize);
  document.removeEventListener('fullscreenchange',state.onFullscreen);
  if (document.fullscreenElement === state.root) {
    document.exitFullscreen().catch(() => {});
  }
  try { state.loadingTask?.destroy(); } catch (_) {}
  try { state.document?.destroy(); } catch (_) {}
  state.root.classList.remove('pdf-simulated-fullscreen');
}

export async function mount() {
  dispose();
  const root = document.getElementById('pdf-reader');
  if (!root) return;
  const state = {
    root:root,
    url:root.dataset.pdfUrl,
    title:root.dataset.pdfTitle,
    page:1,
    zoom:1,
    fitMode:'width',
    document:null,
    loadingTask:null,
    renderTask:null,
    serial:0,
    resizeObserver:null,
    onResize:null,
    onFullscreen:null
  };
  active = state;
  root.addEventListener('click', event => handleControls(state,event));
  const input = $(root, '[data-pdf-page]');
  input?.addEventListener('change', () => pageTo(state,input.value));
  const stage = $(root, '[data-pdf-stage]');
  stage?.addEventListener('keydown', event => {
    if (event.target.closest('input,button,a')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {event.preventDefault();pageTo(state,state.page+1);}
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {event.preventDefault();pageTo(state,state.page-1);}
  });
  state.onResize = () => {
    if (state.document && !state.resizePending) {
      state.resizePending = true;
      requestAnimationFrame(() => {state.resizePending=false;if (active === state) renderPage(state);});
    }
  };
  window.addEventListener('resize',state.onResize);
  state.onFullscreen = () => {
    const button = $(root, '[data-pdf-action="fullscreen"]');
    if (button) button.textContent = document.fullscreenElement === root ? 'Quitter le plein écran' : 'Plein écran';
    if (active === state && state.document) state.onResize();
  };
  document.addEventListener('fullscreenchange',state.onFullscreen);
  if (window.ResizeObserver) {
    state.resizeObserver = new ResizeObserver(() => state.onResize());
    if (stage) state.resizeObserver.observe(stage);
  }
  announce(state,'Chargement du document…');
  updateControls(state);
  try {
    const lib = await engine();
    if (active !== state) return;
    state.loadingTask = lib.getDocument({url:state.url});
    const pdf = await state.loadingTask.promise;
    if (active !== state) {pdf.destroy();return;}
    state.document = pdf;
    updateControls(state);
    await renderPage(state);
  } catch (error) {
    console.error('Lecteur PDF',error);
    if (active === state) useNativeFallback(state,'Lecture avancée indisponible.');
  }
}

window.PedagogicalPdfViewer = {mount,dispose};
