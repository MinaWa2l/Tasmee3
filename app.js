const API = 'https://script.google.com/macros/s/AKfycbyf_FOOcosWYvfypZZbVEcYVgCzWI_MGqLDU6QKMujwJegxCBrXC2yuOPyFIw9UyU3H/exec';
const MAX_SECONDS = 180;
const VERSION = 'v3.7';

const $ = id => document.getElementById(id);
$('ver').textContent = VERSION;

const SVG_ICONS = {
  play: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
  load: '<svg class="ic ic-sm spin-icon" viewBox="0 0 24 24"><path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/></svg>',
  check: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  close: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  ticket: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>',
  lock: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
  dice: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/></svg>',
  puzzle: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5a2.5 2.5 0 0 1 0 5H2V19c0 1.1.9 2 2 2h3.8v-1.5a2.5 2.5 0 0 1 5 0V21H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z"/></svg>',
  heartOn: '<svg class="ic ic-md heart-on" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  heartOff: '<svg class="ic ic-md heart-off" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  flame: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>',
  edit: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
  link: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
  calendar: '<svg class="ic ic-sm" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>'
};

function renderLivesHtml(lives) {
  const n = Math.max(0, Math.min(3, lives));
  return SVG_ICONS.heartOn.repeat(n) + SVG_ICONS.heartOff.repeat(3 - n);
}

let recorder, chunks = [], blob, mime, timer, secs = 0;
let userPiecesMap = {};
let allNames = [];
let linksMap = {};
let progressMap = {};
let closedMap = {};
let isChallengeRec = false;
let chalPiece = null;
let lastDisplayedCoupons = 0;

function syncCategoryButtons() {
  const sel = $('category');
  const val = sel ? sel.value : 'مردات';
  const disabled = sel ? sel.disabled : false;
  document.querySelectorAll('#cat-switch .cat-btn').forEach(btn => {
    const isActive = btn.dataset.cat === val;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    btn.disabled = disabled;
  });
}

document.querySelectorAll('#cat-switch .cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = $('category');
    if (!sel || sel.disabled) return;
    if (sel.value !== btn.dataset.cat) {
      sel.value = btn.dataset.cat;
      sel.dispatchEvent(new Event('change'));
    }
    syncCategoryButtons();
  });
});

function syncCustomSelect(id) {
  if (id === 'category') { syncCategoryButtons(); return; }
  const sel = $(id), wrap = $('wrap-' + id), trig = $('trig-' + id), menu = $('menu-' + id);
  if (!sel || !wrap || !trig || !menu) return;
  const selectedOpt = sel.options[sel.selectedIndex];
  trig.querySelector('.c-select-label').textContent = selectedOpt ? selectedOpt.textContent : '';
  trig.disabled = sel.disabled;
  trig.classList.toggle('needs-attention', sel.classList.contains('needs-attention'));

  menu.replaceChildren();
  [...sel.options].forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = 'c-select-option' + (idx === sel.selectedIndex ? ' selected' : '') + (opt.disabled ? ' disabled' : '');
    div.textContent = opt.textContent;
    if (!opt.disabled) {
      div.onclick = (e) => {
        e.stopPropagation();
        sel.selectedIndex = idx;
        sel.dispatchEvent(new Event('change'));
        wrap.classList.remove('open');
        syncCustomSelect(id);
      };
    }
    menu.appendChild(div);
  });
}

['piece'].forEach(id => {
  const wrap = $('wrap-' + id), trig = $('trig-' + id), sel = $(id);
  trig.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrap.classList.contains('open');
    document.querySelectorAll('.c-select-wrap.open').forEach(w => w.classList.remove('open'));
    if (!isOpen && !sel.disabled) {
      syncCustomSelect(id);
      wrap.classList.add('open');
    }
  });
  new MutationObserver(() => syncCustomSelect(id)).observe(sel, { childList: true, attributes: true, subtree: true, characterData: true });
  sel.addEventListener('change', () => syncCustomSelect(id));
  syncCustomSelect(id);
});
syncCategoryButtons();
document.addEventListener('click', () => {
  document.querySelectorAll('.c-select-wrap.open').forEach(w => w.classList.remove('open'));
});

let waveAnimId = null, waveSource = null, waveAnalyser = null;
function startWaveform(stream) {
  try {
    initAudio();
    waveSource = audioCtx.createMediaStreamSource(stream);
    waveAnalyser = audioCtx.createAnalyser();
    waveAnalyser.fftSize = 32;
    waveSource.connect(waveAnalyser);
    const data = new Uint8Array(waveAnalyser.frequencyBinCount);
    const bars = document.querySelectorAll('#wave-bars .wave-bar');
    $('wave-bars').hidden = false;
    const draw = () => {
      if (!waveAnalyser) return;
      waveAnalyser.getByteFrequencyData(data);
      bars.forEach((b, i) => {
        const val = data[i % data.length] || 0;
        b.style.height = Math.max(6, Math.min(30, (val / 255) * 30)) + 'px';
      });
      waveAnimId = requestAnimationFrame(draw);
    };
    draw();
  } catch (e) {}
}
function stopWaveform() {
  if (waveAnimId) cancelAnimationFrame(waveAnimId);
  waveAnimId = null; waveAnalyser = null;
  if (waveSource) { try { waveSource.disconnect(); } catch (e) {} waveSource = null; }
  $('wave-bars').hidden = true;
}

let audioCtx;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playTick() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
  osc.type = 'sine'; osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}
function playWinSound() {
  if (!audioCtx) return;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05 + (i * 0.05));
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
    osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 1.5);
  });
}
function playLoseSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
  osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
  osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.5);
}

function showLink() {
  const cat = $('category').value, p = $('piece').value, u = linksMap[cat] && linksMap[cat][p];
  $('plink').hidden = !u;
  if (u) $('plink').href = u;
}

function setRec(on, text) {
  $('rec').classList.toggle('on', on);
  $('lbl').classList.toggle('on', on);
  $('rec').setAttribute('aria-label', on ? 'إيقاف التسجيل' : 'تسجيل');
  $('lbl').textContent = text;
}
const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
function progColor(p) { return 'hsl(' + Math.round(p * 1.2) + ', 70%, 42%)'; }

const norm = s => String(s).toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ڤ/g, 'ف').replace(/چ/g, 'ج').replace(/\s+/g, ' ').trim();

function updatePieces(name) {
  const cat = $('category').value;

  if (name && cat === 'مردات' && progressMap[name] !== undefined) {
    const pVal = Math.max(0, Math.min(100, Number(progressMap[name]) || 0));
    const color = progColor(pVal);
    $('prog-val').textContent = pVal + '%';
    $('prog-val').style.color = color;
    $('prog-bar-fill').style.width = pVal + '%';
    $('prog-bar-fill').style.backgroundColor = color;
    $('progwrap').classList.remove('prog-collapsed');
    $('chal-trig').hidden = (pVal !== 100);
    if (pVal === 100 && window._lastCelebratedName !== name) {
      window._lastCelebratedName = name;
      launchConfetti();
    }
    if (pVal !== 100) $('chal-card').hidden = true;
  } else {
    $('progwrap').classList.add('prog-collapsed'); $('chal-trig').hidden = true; $('chal-card').hidden = true;
  }

  const maradBtn = $('cat-btn-marad'), alhanBtn = $('cat-btn-alhan');
  const maradMeta = $('cat-meta-marad'), alhanMeta = $('cat-meta-alhan');
  if (name && userPiecesMap && userPiecesMap[name]) {
    const mList = userPiecesMap[name]['مردات'] || [], aList = userPiecesMap[name]['ألحان'] || [];
    maradMeta.hidden = false;
    alhanMeta.hidden = false;
    maradMeta.textContent = mList.length > 0 ? mList.length : 'مكتمل';
    alhanMeta.textContent = aList.length > 0 ? aList.length : 'مكتمل';
    maradMeta.classList.toggle('done', mList.length === 0);
    alhanMeta.classList.toggle('done', aList.length === 0);
    alhanBtn.classList.toggle('needs-attention', cat === 'مردات' && aList.length > 0);
    maradBtn.classList.toggle('needs-attention', cat === 'ألحان' && mList.length > 0);
  } else {
    maradMeta.hidden = true;
    alhanMeta.hidden = true;
    maradBtn.classList.remove('needs-attention');
    alhanBtn.classList.remove('needs-attention');
  }

  const pieceSelect = $('piece');
  if (!name) {
    pieceSelect.replaceChildren(new Option('اختر الاسم أولاً', ''));
    pieceSelect.classList.remove('needs-attention');
  } else if (userPiecesMap && userPiecesMap[name]) {
    const pieces = userPiecesMap[name][cat] || [], closed = (closedMap[name] && closedMap[name][cat]) || [];
    if (pieces.length > 0) {
      fill(pieceSelect, pieces, closed); pieceSelect.classList.add('needs-attention');
    } else if (closed.length > 0) {
      fill(pieceSelect, [], closed); pieceSelect.options[0].textContent = 'لا توجد محفوظات متاحة الآن'; pieceSelect.classList.remove('needs-attention');
    } else {
      pieceSelect.replaceChildren(new Option('سمَّعت كل الحاجات هنا', '')); pieceSelect.classList.remove('needs-attention');
    }
  }
  syncCategoryButtons();
  syncCustomSelect('piece');
  showLink();
}

let listsLoaded = false;
let pendingLoginName = '';
let pinMode = 'verify';

const cleanPin = v => String(v || '')
  .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/\D/g, '')
  .slice(0, 4);

['pin-input', 'pin-confirm'].forEach(id => {
  $(id).addEventListener('input', e => { e.target.value = cleanPin(e.target.value); });
  $(id).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('pin-submit-btn').click(); } });
});

function applyLists(d) {
  userPiecesMap = d.userPieces; allNames = d.names; progressMap = d.progress || {}; closedMap = d.closedPieces || {};
  if (!listsLoaded) {
    listsLoaded = true; $('piece').replaceChildren(new Option('اختر الاسم أولاً', ''));
    $('name').disabled = false; $('name').placeholder = 'اكتب للبحث عن اسمك...';
  }
  const typed = $('name').value;
  if (allNames.includes(typed) && $('login-screen').hidden) {
    const keep = $('piece').value; updatePieces(typed);
    if ([...$('piece').options].some(o => o.value === keep)) $('piece').value = keep;
    showLink();
  }
  syncCustomSelect('piece');

  let isAdminSaved = false;
  try { isAdminSaved = !!localStorage.getItem('saved_admin_pin'); } catch (e) {}

  if (!$('name').value && !$('login-screen').hidden && !pendingLoginName && !isAdminSaved) {
    let saved = '', savedPin = '';
    try {
      saved = localStorage.getItem('saved_deacon_name') || '';
      savedPin = localStorage.getItem('saved_deacon_pin') || '';
    } catch (e) {}
    if (saved && allNames.includes(saved)) {
      if (savedPin) {
        completeLogin(saved, savedPin);
        fetch(API, { method: 'POST', body: JSON.stringify({ action: 'verifyPin', name: saved, pin: savedPin }) })
          .then(r => r.json())
          .then(res => { if (!res.ok) logoutUser(); })
          .catch(() => {});
      } else {
        startPinFlow(saved);
      }
    }
  }
}

function refreshLists() {
  return fetch(API + '?action=lists&t=' + Date.now()).then(r => r.json()).then(d => {
    if (!d.userPieces) throw new Error('bad response');
    try { localStorage.setItem('lists_v1', JSON.stringify(d)); } catch (e) {}
    applyLists(d);
  });
}

let cachedLists = null;
try { cachedLists = JSON.parse(localStorage.getItem('lists_v1')); } catch (e) {}
if (cachedLists && cachedLists.userPieces) applyLists(cachedLists);
refreshLists().catch(() => {
  if (listsLoaded) return;
  $('name').placeholder = 'تعذّر التحميل'; say('تعذّر تحميل القوائم', 'err', 'تأكد من الإنترنت.');
});

try { linksMap = JSON.parse(localStorage.getItem('links_v1')) || {}; } catch (e) {}
fetch(API + '?action=links&t=' + Date.now()).then(r => r.json()).then(l => {
  linksMap = l || {}; try { localStorage.setItem('links_v1', JSON.stringify(linksMap)); } catch (e) {}
  showLink();
}).catch(() => {});

$('category').addEventListener('change', () => { updatePieces(allNames.includes($('name').value) ? $('name').value : ''); });
$('piece').addEventListener('change', showLink);

function matches() {
  const typed = $('name').value;
  if (allNames.includes(typed)) return allNames;
  const words = norm(typed).split(' ').filter(Boolean);
  return allNames.filter(n => { const x = norm(n); return words.every(w => x.includes(w)); });
}
function showNames() {
  if (!allNames.length) return;
  const found = matches(), items = found.length ? found.map(n => Object.assign(document.createElement('li'), { textContent: n })) : [Object.assign(document.createElement('li'), { className: 'none', textContent: 'لا يوجد اسم مطابق' })];
  $('names').replaceChildren(...items); $('names').hidden = false;
}

function startPinFlow(n) {
  pendingLoginName = n;
  $('name').value = n;
  $('names').hidden = true;
  $('name').blur();
  $('name').disabled = true;
  $('pin-loading').hidden = false;

  fetch(API + '?action=checkPin&name=' + encodeURIComponent(n) + '&t=' + Date.now())
    .then(r => r.json())
    .then(d => {
      $('pin-loading').hidden = true;
      $('name').disabled = false;
      if (!d.ok) {
        pendingLoginName = '';
        alert(d.error || 'حدث خطأ، حاول مرة أخرى');
        return;
      }
      pinMode = d.hasPin ? 'verify' : 'setup';
      $('login-step-name').hidden = true;
      $('login-step-pin').hidden = false;
      $('pin-input').value = '';
      $('pin-confirm').value = '';
      $('pin-error').textContent = '';

      if (pinMode === 'setup') {
        $('pin-title').textContent = `أهلاً بك يا ${n}`;
        $('pin-sub').textContent = 'أول مرة تدخل! اختار رقم سري من 4 أرقام لحماية حسابك';
        $('pin-confirm-wrap').hidden = false;
        $('pin-forgot-hint').hidden = true;
        $('pin-submit-btn').textContent = 'حفظ ودخول';
      } else {
        $('pin-title').textContent = `أهلاً بك يا ${n}`;
        $('pin-sub').textContent = 'اكتب الرقم السري بتاعك (4 أرقام)';
        $('pin-confirm-wrap').hidden = true;
        $('pin-forgot-hint').hidden = false;
        $('pin-submit-btn').textContent = 'دخول';
      }
      $('pin-input').focus();
    })
    .catch(() => {
      $('pin-loading').hidden = true;
      $('name').disabled = false;
      pendingLoginName = '';
      alert('خطأ في الاتصال بالانترنت');
    });
}

$('pin-back-btn').onclick = () => {
  pendingLoginName = '';
  $('login-step-pin').hidden = true;
  $('login-step-name').hidden = false;
  $('pin-error').textContent = '';
  $('name').value = '';
  $('name').focus();
  showNames();
};

$('pin-submit-btn').onclick = () => {
  const pin = cleanPin($('pin-input').value);
  const conf = cleanPin($('pin-confirm').value);
  $('pin-error').textContent = '';

  if (pin.length !== 4) { $('pin-error').textContent = 'اكتب 4 أرقام'; $('pin-input').focus(); return; }
  if (pinMode === 'setup' && pin !== conf) { $('pin-error').textContent = 'الرقمين مش متطابقين، جرب تاني'; $('pin-confirm').focus(); return; }

  $('pin-submit-btn').disabled = true;
  $('pin-submit-btn').textContent = 'جارٍ التحقق...';
  const action = pinMode === 'setup' ? 'setPin' : 'verifyPin';

  fetch(API, { method: 'POST', body: JSON.stringify({ action, name: pendingLoginName, pin }) })
    .then(r => r.json())
    .then(d => {
      $('pin-submit-btn').disabled = false;
      $('pin-submit-btn').textContent = pinMode === 'setup' ? 'حفظ ودخول' : 'دخول';
      if (d.ok) {
        completeLogin(pendingLoginName, pin);
      } else {
        $('pin-error').textContent = d.error || 'الرقم السري غير صحيح';
        $('pin-input').classList.add('wrong-anim');
        setTimeout(() => $('pin-input').classList.remove('wrong-anim'), 500);
        $('pin-input').value = '';
        $('pin-input').focus();
      }
    })
    .catch(() => {
      $('pin-submit-btn').disabled = false;
      $('pin-submit-btn').textContent = pinMode === 'setup' ? 'حفظ ودخول' : 'دخول';
      $('pin-error').textContent = 'خطأ في الاتصال بالانترنت';
    });
};

function completeLogin(n, pin) {
  try {
    localStorage.setItem('saved_deacon_name', n);
    if (pin) localStorage.setItem('saved_deacon_pin', pin);
  } catch (e) {}

  pendingLoginName = '';
  lastDisplayedCoupons = 0;
  $('name').value = n; $('names').hidden = true; $('name').blur();
  $('profile-name-display').textContent = n;
  $('my-qr-img').src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=6&data=' + encodeURIComponent(n);
  $('my-qr-card').hidden = false;

  const wasLoggedOut = !$('login-screen').hidden;
  $('login-screen').hidden = true;
  $('login-step-pin').hidden = true;
  $('login-step-name').hidden = false;
  $('bottom-bar').hidden = false;
  if (wasLoggedOut) switchTab('recite');

  updatePieces(n);
  fetchStudentBundle(n);

  if ($('btn-load-game')) {
    $('btn-load-game').disabled = false;
    $('btn-quiz-game').disabled = false;
    $('btn-catch-game').disabled = false;
    $('g-setup-msg').textContent = `أهلاً بك يا ${n}! اختار اللعبة اللي تعجبك:`;
  }
}

function logoutUser() {
  try {
    localStorage.removeItem('saved_deacon_name');
    localStorage.removeItem('saved_deacon_pin');
  } catch (e) {}
  pendingLoginName = '';
  lastDisplayedCoupons = 0;
  backToGameSelector();
  isChallengeRec = false;
  $('regular-inputs').hidden = false;
  $('chal-card').style.border = '1px solid rgba(165, 180, 252, 0.35)';
  $('name').value = '';
  $('profile-name-display').textContent = '---';
  $('my-qr-card').hidden = true;
  $('recite-tab').hidden = true;
  $('profile-tab').hidden = true;
  $('games-tab').hidden = true;
  $('bottom-bar').hidden = true;
  $('login-step-pin').hidden = true;
  $('login-step-name').hidden = false;
  $('login-screen').hidden = false;
  updatePieces(''); fetchHistory(''); fetchAttendance('');
  $('graph-section').hidden = true;
  $('name').focus();
  showNames();
}

$('btn-switch-user').onclick = logoutUser;

$('name').addEventListener('focus', () => {
  $('name').select();
  showNames();
  setTimeout(() => $('name').closest('.combo').scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
});
$('name').addEventListener('input', () => { showNames(); });
$('name').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const first = matches()[0];
    if (first) startPinFlow(first);
  }
});
$('names').addEventListener('click', e => {
  const li = e.target.closest('li');
  if (li && !li.classList.contains('none')) startPinFlow(li.textContent);
});
document.addEventListener('click', e => { if (!e.target.closest('.combo')) $('names').hidden = true; });

function fill(sel, items, closed = []) {
  const closedOpts = closed.map(x => { const o = new Option(x + ' — انتهت فترة التسميع', ''); o.disabled = true; o.className = 'closed-opt'; return o; });
  sel.replaceChildren(new Option('اختر...', ''), ...items.map(x => new Option(x, x)), ...closedOpts);
}
function say(t, kind, sub) {
  const m = $('msg'); m.replaceChildren(); m.className = kind ? 'box ' + kind : '';
  if (!kind) { m.textContent = t; return; }
  const b = document.createElement('b'); b.textContent = t; m.append(b);
  if (sub) m.append(sub);
  m.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

let starting = false;
$('rec').onclick = async () => {
  if (recorder && recorder.state === 'recording') return recorder.stop();
  if (starting) return;
  if (!isChallengeRec && (!$('name').value || !$('piece').value)) return say('اختر الاسم والمحفوظ أولاً', 'err');
  starting = true; $('lbl').textContent = 'جارٍ تشغيل الميكروفون...';
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { starting = false; $('lbl').textContent = 'اضغط للتسجيل'; return say('لم يتم السماح بالميكروفون', 'err', 'اسمح بالميكروفون من إعدادات المتصفح.'); }
  mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg'].find(t => MediaRecorder.isTypeSupported(t)) || '';
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : {});
  recorder = rec; chunks = [];
  rec.ondataavailable = e => chunks.push(e.data);
  rec.onstop = () => {
    stopWaveform();
    clearInterval(timer); stream.getTracks().forEach(t => t.stop());
    blob = new Blob(chunks, { type: rec.mimeType }); mime = rec.mimeType;
    $('preview').src = URL.createObjectURL(blob); $('preview').hidden = false; $('after').hidden = false; $('recwrap').hidden = true;
    $('name').disabled = $('piece').disabled = $('category').disabled = true;
    syncCustomSelect('category'); syncCustomSelect('piece');
    setRec(false, 'اضغط للتسجيل'); say('استمع للتسجيل ثم اضغط إرسال.');
  };
  rec.start(); startWaveform(stream); starting = false; clearInterval(timer); secs = 0; setRec(true, 'جارٍ التسجيل 0:00 — اضغط للإيقاف'); say('');
  timer = setInterval(() => { if (rec.state !== 'recording') return clearInterval(timer); secs++; $('lbl').textContent = 'جارٍ التسجيل ' + fmt(secs) + ' — اضغط للإيقاف'; if (secs >= MAX_SECONDS) rec.stop(); }, 1000);
};

$('redo').onclick = () => { $('preview').hidden = $('after').hidden = true; $('recwrap').hidden = false; setRec(false, 'اضغط للتسجيل'); $('name').disabled = $('piece').disabled = $('category').disabled = false; syncCustomSelect('category'); syncCustomSelect('piece'); say(''); };
$('send').onclick = () => {
  $('send').disabled = $('redo').disabled = true; say('جارٍ الإرسال...');
  const fr = new FileReader();
  fr.onload = async () => {
    try {
      const payload = { name: $('name').value, category: isChallengeRec ? 'تحدي المردات' : $('category').value, piece: isChallengeRec ? chalPiece : $('piece').value, mime: mime, audio: fr.result.split(',')[1], isChallenge: isChallengeRec };
      const res = await fetch(API, { method: 'POST', body: JSON.stringify(payload) }); const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      say('تم إرسال تسجيلك بنجاح', 'ok', isChallengeRec ? 'بانتظار تقييم الخادم.' : payload.category + ' (' + payload.piece + ')\nسيستمع إليه الخادم ويوافق عليه قريباً.');
      $('after').hidden = $('preview').hidden = true; $('recwrap').hidden = false; setRec(false, 'اضغط لتسجيل آخر'); $('name').disabled = $('piece').disabled = $('category').disabled = false;
      syncCustomSelect('category'); syncCustomSelect('piece');
      if (isChallengeRec) { isChallengeRec = false; $('regular-inputs').hidden = false; $('chal-card').style.border = '1px solid rgba(165, 180, 252, 0.35)'; loadChallenge($('name').value); } else { refreshLists().catch(() => {}); fetchHistory($('name').value); }
    } catch (e) {
      if (String(e.message).includes('already completed')) { say('هذا المحفوظ تم تسميعه مسبقاً', 'err', 'تم تحديث القائمة.'); refreshLists().catch(() => {}); } else { say('لم يتم الإرسال', 'err', 'تأكد من الإنترنت ثم اضغط إرسال مرة أخرى.'); }
    }
    $('send').disabled = $('redo').disabled = false;
  };
  fr.readAsDataURL(blob);
};

function switchTab(tabId) {
  $('recite-tab').hidden = (tabId !== 'recite');
  $('profile-tab').hidden = (tabId !== 'profile');
  $('games-tab').hidden = (tabId !== 'games');
  document.querySelectorAll('#bottom-bar .tab-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabId);
  });

  if (tabId === 'profile' && attChart) setTimeout(() => attChart.resize(), 40);
  if (tabId === 'games') {
    const n = $('name').value;
    if (allNames.includes(n)) {
      $('btn-load-game').disabled = false;
      $('btn-quiz-game').disabled = false;
      $('btn-catch-game').disabled = false;
      $('g-setup-msg').textContent = `أهلاً بك يا ${n}! اختار اللعبة اللي تعجبك:`;
    }
  }
}

function backToGameSelector() {
  $('game-board-wrap').hidden = true;
  $('quiz-board-wrap').hidden = true;
  $('catch-board-wrap').hidden = true;
  $('game-selector').hidden = false;
  $('game-loader').hidden = true;

  catchIsActive = false;
  if (catchAnimationFrame) cancelAnimationFrame(catchAnimationFrame);
  if (catchSpawner) clearInterval(catchSpawner);
  if (catchCountdownTimer) clearInterval(catchCountdownTimer);
  if ($('login-screen').hidden) $('bottom-bar').hidden = false;
}

function normGameText(txt) {
  return String(txt ?? '')
    .normalize('NFC')
    .replace(/[\u200E\u200F\u061C\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ==================================================
   Game 1: Word Sort
================================================== */
let currentGameTarget = "";
let currentWords = [];
let remainingGameTries = 2;
let gameSubmitting = false;
let gameFinished = false;

$('btn-load-game').onclick = () => {
  $('game-selector').hidden = true;
  $('game-board-wrap').hidden = true;
  $('game-loader').hidden = false;
  const n = $('name').value;

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'getGame', name: n }) })
    .then(r => r.json())
    .then(d => {
      $('game-loader').hidden = true;
      if (d.error) {
        $('game-selector').hidden = false;
        $('g-setup-msg').textContent = d.error;
        $('g-setup-msg').style.color = '#dc2626';
        return;
      }
      setupGameBoard(d.game);
    })
    .catch(() => {
      $('game-loader').hidden = true;
      $('game-selector').hidden = false;
      alert('خطأ في الاتصال بالانترنت');
    });
};

function setupGameBoard(game) {
  $('bottom-bar').hidden = true;
  $('games-tab').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('game-selector').hidden = true;
  $('game-board-wrap').hidden = false;
  $('g-piece-title').textContent = game.title;
  $('g-piece-title').dir = 'auto';

  currentGameTarget = normGameText(game.text);
  remainingGameTries = 2;
  gameSubmitting = false;
  gameFinished = false;

  const words = currentGameTarget.split(' ').filter(Boolean);
  const partsCount = words.length <= 5
    ? words.length
    : 5 + Math.floor(Math.random() * (Math.min(10, words.length) - 4));

  const sizes = Array(partsCount).fill(Math.floor(words.length / partsCount));
  for (let i = 0; i < words.length % partsCount; i++) sizes[i]++;
  for (let i = sizes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sizes[i], sizes[j]] = [sizes[j], sizes[i]];
  }

  let position = 0;
  currentWords = sizes.map(size => {
    const part = words.slice(position, position + size).join(' ');
    position += size;
    return part;
  });

  const shuffled = currentWords.map((text, index) => ({ text, index }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.length > 1 && shuffled.every((part, i) => part.index === i)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }

  $('g-answer-area').replaceChildren();
  $('g-answer-area').dir = 'ltr';
  $('g-msg').textContent = '';
  $('g-msg').style.color = 'var(--fg)';
  $('g-answer-area').className = 'area-box';

  $('g-check-btn').disabled = false;
  $('g-check-btn').textContent = 'تحقق من الإجابة';
  $('g-retry-btn').hidden = true;
  $('g-next-game-btn').hidden = true;

  if (!shuffled.length) {
    $('g-check-btn').hidden = true;
    $('g-msg').textContent = 'لا يوجد نص للحن في الجدول.';
    return;
  }

  shuffled.forEach(part => {
    $('g-answer-area').appendChild(createGamePart(part.text, part.index));
  });
  updateGameCheckButton();
}

function createGamePart(text, index) {
  const item = document.createElement('div');
  item.className = 'game-part';
  item.dataset.text = text;
  item.dataset.index = String(index);

  const word = document.createElement('button');
  word.type = 'button';
  word.className = 'word-btn';
  word.style.touchAction = 'none';
  word.dir = 'auto';

  const label = document.createElement('span');
  label.textContent = text;
  label.style.flex = '1';

  const handle = document.createElement('span');
  handle.className = 'drag-handle';
  handle.textContent = '⋮⋮';
  handle.setAttribute('aria-hidden', 'true');

  word.append(label, handle);
  item.append(word);

  word.addEventListener('pointerdown', (e) => {
    if (gameSubmitting || gameFinished || remainingGameTries <= 0) return;
    e.preventDefault();
    initAudio();
    item.classList.add('dragging');
    if (navigator.vibrate) navigator.vibrate(12);

    const activePointerId = e.pointerId;

    const onMove = (ev) => {
      if (ev.pointerId !== activePointerId) return;
      const ans = $('g-answer-area');
      const siblings = [...ans.children].filter(el => el !== item);
      const nextSibling = siblings.find(sib => {
        const box = sib.getBoundingClientRect();
        return ev.clientY < box.top + box.height / 2;
      }) || null;

      if (item.nextElementSibling !== nextSibling) ans.insertBefore(item, nextSibling);
    };

    const onUp = (ev) => {
      if (ev.pointerId !== activePointerId) return;
      item.classList.remove('dragging');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  });

  return item;
}

function updateGameCheckButton() {
  $('g-check-btn').hidden =
    $('g-answer-area').children.length !== currentWords.length ||
    !$('g-retry-btn').hidden ||
    !$('g-next-game-btn').hidden ||
    remainingGameTries <= 0 ||
    gameSubmitting || gameFinished;
}

$('g-check-btn').onclick = () => {
  if (gameSubmitting || gameFinished || remainingGameTries <= 0) return;
  const answerParts = [...$('g-answer-area').children];
  if (answerParts.length !== currentWords.length) return;

  const userSentence = answerParts.map(part => part.dataset.text).join(' ');
  const correctOrder = answerParts.every((part, i) => Number(part.dataset.index) === i);
  const correctText = normGameText(userSentence) === currentGameTarget;
  const isWin = correctOrder || correctText;

  const ansBox = $('g-answer-area');
  const msg = $('g-msg');
  gameSubmitting = true;
  $('g-check-btn').disabled = true;
  $('g-check-btn').textContent = 'جارٍ التحقق...';

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'submitGame',
      name: $('name').value,
      piece: $('g-piece-title').textContent,
      isWin: isWin
    })
  })
    .then(r => r.json())
    .then(d => {
      gameSubmitting = false;
      $('g-check-btn').disabled = false;
      $('g-check-btn').textContent = 'تحقق من الإجابة';

      if (d.error) {
        msg.textContent = d.error;
        msg.style.color = '#ef4444';
        $('g-check-btn').hidden = true;
        return;
      }

      if (isWin) {
        gameFinished = true;
        ansBox.classList.add('correct-anim');
        msg.textContent = 'برافو عليك! كسبت 5 كوبون';
        msg.style.color = '#10b981';
        $('g-check-btn').hidden = true;
        $('g-retry-btn').hidden = true;
        playWinSound();
        launchConfetti();
        fetchAttendance($('name').value);
        setTimeout(() => { backToGameSelector(); }, 3000);
      } else {
        remainingGameTries--;
        ansBox.classList.add('wrong-anim');
        msg.style.color = '#ef4444';
        $('g-check-btn').hidden = true;

        if (remainingGameTries > 0) {
          msg.textContent = 'إجابة خاطئة. متبقي محاولة واحدة، عدّل الترتيب وجرب تاني.';
          $('g-retry-btn').hidden = false;
        } else {
          gameFinished = true;
          msg.textContent = 'إجابة خاطئة. انتهت محاولاتك في اللحن ده.';
          $('g-retry-btn').hidden = true;
          $('g-next-game-btn').hidden = false;
        }
        setTimeout(() => ansBox.classList.remove('wrong-anim'), 1000);
      }
    })
    .catch(() => {
      gameSubmitting = false;
      $('g-check-btn').disabled = false;
      $('g-check-btn').textContent = 'تحقق من الإجابة';
      updateGameCheckButton();
      alert('خطأ في الاتصال بالانترنت');
    });
};

$('g-retry-btn').onclick = () => {
  if (gameFinished || gameSubmitting || remainingGameTries <= 0) return;
  $('g-retry-btn').hidden = true;
  $('g-answer-area').classList.remove('wrong-anim');
  $('g-msg').textContent = 'اسحب القطع لتعديل الترتيب ثم تحقق من الإجابة.';
  $('g-msg').style.color = 'var(--fg)';
  updateGameCheckButton();
};

$('g-next-game-btn').onclick = () => {
  $('g-next-game-btn').hidden = true;
  $('btn-load-game').click();
};

/* ==================================================
   Game 2: Word Catch
================================================== */
let catchAnimationFrame, catchSpawner, catchCountdownTimer;
let catchBasketX = 50;
let catchItems = [];
let catchTargetWords = [];
let catchCurrentIdx = 0;
let catchLives = 3;
let catchSpeed = 145;
let catchIsActive = false;
let catchGamePiece = "";
let catchCombo = 0;
let catchScore = 0;
let catchMissSinceTarget = 0;
let catchLastX = 50;
let catchLastTime = 0;
let catchAreaW = 360, catchAreaH = 430;
const catchKeys = { left: false, right: false };

function getCatchBest() {
  try { return Number(localStorage.getItem('catch_best_score') || 0); } catch (e) { return 0; }
}
function saveCatchBest(score) {
  if (score > getCatchBest()) {
    try { localStorage.setItem('catch_best_score', String(score)); } catch (e) {}
  }
  $('c-best').textContent = 'أفضل نتيجة: ' + Math.max(score, getCatchBest());
}

$('btn-catch-game').onclick = () => {
  $('game-selector').hidden = true;
  $('catch-board-wrap').hidden = true;
  $('game-loader').hidden = false;
  const n = $('name').value;

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'getGame', name: n }) })
    .then(r => r.json())
    .then(d => {
      $('game-loader').hidden = true;
      if (d.error) {
        $('game-selector').hidden = false;
        $('g-setup-msg').textContent = d.error;
        $('g-setup-msg').style.color = '#dc2626';
        return;
      }
      initCatchGame(d.game);
    })
    .catch(() => {
      $('game-loader').hidden = true;
      $('game-selector').hidden = false;
      alert('خطأ في الاتصال بالانترنت');
    });
};

function initCatchGame(game) {
  $('bottom-bar').hidden = true;
  $('games-tab').scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (catchAnimationFrame) cancelAnimationFrame(catchAnimationFrame);
  if (catchSpawner) clearInterval(catchSpawner);
  if (catchCountdownTimer) clearInterval(catchCountdownTimer);

  catchGamePiece = game.title;
  $('c-piece-title').textContent = catchGamePiece;

  let fullWords = normGameText(game.text).split(' ').filter(Boolean);
  catchTargetWords = fullWords.length > 20 ? fullWords.slice(0, 20) : fullWords;

  if (catchTargetWords.length === 0) {
    alert('لا توجد كلمات لهذا اللحن.');
    backToGameSelector();
    return;
  }

  catchCurrentIdx = 0;
  catchLives = 3;
  catchCombo = 0;
  catchScore = 0;
  catchMissSinceTarget = 0;
  catchSpeed = 145;
  catchItems.forEach(i => i.el.remove());
  catchItems = [];
  catchIsActive = false;

  $('c-target-msg').innerHTML = 'القادمة: <span id="c-next-word" style="font-size:17px; color:var(--accent-bright);"></span>';
  $('c-next-word').textContent = catchTargetWords[0];
  $('c-lives').innerHTML = renderLivesHtml(3);
  $('c-progress-txt').textContent = `0 / ${catchTargetWords.length}`;
  $('c-prog-fill').style.width = '0%';
  $('c-combo').innerHTML = '';
  $('c-best').textContent = 'أفضل نتيجة: ' + getCatchBest();
  $('c-built').textContent = '';
  $('c-built').hidden = true;
  $('c-msg').textContent = '';
  $('c-next-game-btn').hidden = true;
  $('catch-board-wrap').hidden = false;

  catchAreaW = $('catch-area').clientWidth || 360;
  catchAreaH = $('catch-area').clientHeight || 430;

  catchBasketX = 50;
  $('catch-basket').style.left = '50%';
  initAudio();

  let count = 3;
  const ov = $('catch-overlay');
  ov.textContent = count;
  ov.hidden = false;
  playTick();

  catchCountdownTimer = setInterval(() => {
    count--;
    if (count > 0) {
      ov.textContent = count;
      playTick();
    } else {
      clearInterval(catchCountdownTimer);
      ov.hidden = true;
      catchIsActive = true;
      catchLastTime = performance.now();
      catchAnimationFrame = requestAnimationFrame(catchLoop);
      spawnCatchItem();
      catchSpawner = setInterval(spawnCatchItem, 950);
    }
  }, 650);
}

function spawnCatchItem() {
  if (!catchIsActive) return;

  let forceTarget = catchMissSinceTarget >= 2;
  let isCorrect = forceTarget || Math.random() < 0.48;
  let targetWord = catchTargetWords[catchCurrentIdx];
  let wordToSpawn = targetWord;

  if (isCorrect) {
    catchMissSinceTarget = 0;
  } else {
    catchMissSinceTarget++;
    let distractors = catchTargetWords.filter(w => w !== targetWord);
    wordToSpawn = distractors.length
      ? distractors[Math.floor(Math.random() * distractors.length)]
      : targetWord;
  }

  let el = document.createElement('div');
  el.className = 'catch-item';
  el.textContent = wordToSpawn;
  el.dir = 'auto';

  let xPos = 16 + Math.random() * 68;
  if (Math.abs(xPos - catchLastX) < 22) xPos = (xPos + 35) % 68 + 16;
  catchLastX = xPos;

  el.style.left = xPos + '%';
  el.style.transform = `translate3d(-50%, -50px, 0)`;
  $('catch-area').appendChild(el);

  catchItems.push({
    el,
    xPx: (xPos / 100) * catchAreaW,
    y: -50,
    halfW: (el.offsetWidth || 70) / 2,
    h: el.offsetHeight || 40,
    text: wordToSpawn
  });
}

function catchLoop(now) {
  if (!catchIsActive) return;
  const dt = Math.min((now - catchLastTime) / 1000, 0.05);
  catchLastTime = now;

  if (catchKeys.left || catchKeys.right) {
    const move = 115 * dt;
    if (catchKeys.left) catchBasketX = Math.max(10, catchBasketX - move);
    if (catchKeys.right) catchBasketX = Math.min(90, catchBasketX + move);
    $('catch-basket').style.left = catchBasketX + '%';
  }

  const basketCenterX = (catchBasketX / 100) * catchAreaW;
  const basketHalfW = 24;
  const basketTop = catchAreaH - 52;
  const basketBottom = catchAreaH - 14;

  for (let i = catchItems.length - 1; i >= 0; i--) {
    let item = catchItems[i];
    item.y += catchSpeed * dt;
    item.el.style.transform = `translate3d(-50%, ${item.y}px, 0)`;

    const hit =
      (item.xPx + item.halfW) > (basketCenterX - basketHalfW) &&
      (item.xPx - item.halfW) < (basketCenterX + basketHalfW) &&
      (item.y + item.h) > basketTop &&
      item.y < basketBottom;

    if (hit) {
      item.el.remove();
      catchItems.splice(i, 1);
      handleCatchCollision(item, item.xPx, item.y);
    } else if (item.y > catchAreaH + 20) {
      item.el.remove();
      catchItems.splice(i, 1);
    }
  }
  catchAnimationFrame = requestAnimationFrame(catchLoop);
}

function showCatchPop(html, color, x, y) {
  let pop = document.createElement('div');
  pop.className = 'c-pop';
  pop.style.left = x + 'px';
  pop.style.top = y + 'px';
  pop.style.color = color;
  pop.innerHTML = html;
  $('catch-area').appendChild(pop);
  setTimeout(() => pop.remove(), 600);
}

function handleCatchCollision(item, x, y) {
  const basket = $('catch-basket');
  if (item.text === catchTargetWords[catchCurrentIdx]) {
    catchCurrentIdx++;
    catchCombo++;
    catchScore += 10 + (catchCombo * 2);
    catchSpeed = Math.min(290, catchSpeed + 7);
    saveCatchBest(catchScore);

    if (navigator.vibrate) navigator.vibrate(18);
    basket.style.background = 'linear-gradient(180deg, rgba(16, 185, 129, 0.75), rgba(5, 150, 105, 0.4))';
    basket.style.borderColor = '#34d399';
    showCatchPop(catchCombo >= 3 ? `${SVG_ICONS.flame} x${catchCombo}` : '+1', '#10b981', x, y);

    setTimeout(() => {
      if (basket) {
        basket.style.background = 'linear-gradient(180deg, rgba(59, 130, 246, 0.55), rgba(37, 99, 235, 0.25))';
        basket.style.borderColor = 'rgba(147, 197, 253, 0.75)';
      }
    }, 200);

    const pct = Math.round((catchCurrentIdx / catchTargetWords.length) * 100);
    $('c-progress-txt').textContent = `${catchCurrentIdx} / ${catchTargetWords.length}`;
    $('c-prog-fill').style.width = pct + '%';
    $('c-combo').innerHTML = catchCombo >= 2 ? `${SVG_ICONS.flame} x${catchCombo}` : '';

    $('c-built').hidden = false;
    $('c-built').textContent = catchTargetWords.slice(0, catchCurrentIdx).join(' ');

    if (catchCurrentIdx >= catchTargetWords.length) {
      winCatchGame();
    } else {
      $('c-next-word').textContent = catchTargetWords[catchCurrentIdx];
      playTick();
    }
  } else {
    catchLives--;
    catchCombo = 0;
    $('c-combo').innerHTML = '';
    $('c-lives').innerHTML = renderLivesHtml(catchLives);

    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
    basket.style.background = 'linear-gradient(180deg, rgba(239, 68, 68, 0.75), rgba(185, 28, 28, 0.4))';
    basket.style.borderColor = '#f87171';
    $('catch-area').classList.add('hit-shake');
    showCatchPop(SVG_ICONS.close, '#ef4444', x, y);

    setTimeout(() => {
      $('catch-area').classList.remove('hit-shake');
      if (basket) {
        basket.style.background = 'linear-gradient(180deg, rgba(59, 130, 246, 0.55), rgba(37, 99, 235, 0.25))';
        basket.style.borderColor = 'rgba(147, 197, 253, 0.75)';
      }
    }, 320);
    playLoseSound();

    if (catchLives <= 0) loseCatchGame();
  }
}

function winCatchGame() {
  catchIsActive = false;
  clearInterval(catchSpawner);
  $('c-target-msg').innerHTML = '<span style="color:#10b981;">اكتمل اللحن!</span>';
  $('c-msg').textContent = `أداء ممتاز برافو عليك (النقاط: ${catchScore})`;
  $('c-msg').style.color = '#10b981';
  playWinSound();
  launchConfetti();
  $('c-next-game-btn').hidden = false;
  $('c-next-game-btn').textContent = 'جرب لحن جديد';
}

function loseCatchGame() {
  catchIsActive = false;
  clearInterval(catchSpawner);
  $('c-target-msg').innerHTML = '<span style="color:#ef4444;">انتهت المحاولات</span>';
  $('c-msg').textContent = `حاول تركز أكتر المرة الجاية! (النقاط: ${catchScore})`;
  $('c-msg').style.color = '#ef4444';
  $('c-next-game-btn').hidden = false;
  $('c-next-game-btn').textContent = 'حاول مرة تانية';
}

let moveBasket = (e) => {
  if (!catchIsActive) return;
  if (e.cancelable) e.preventDefault();
  let rect = $('catch-area').getBoundingClientRect();
  let clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let x = clientX - rect.left;
  catchBasketX = Math.max(10, Math.min(90, (x / rect.width) * 100));
  $('catch-basket').style.left = catchBasketX + '%';
};
$('catch-area').addEventListener('touchmove', moveBasket, { passive: false });
$('catch-area').addEventListener('mousemove', moveBasket);

window.addEventListener('keydown', (e) => {
  if (!catchIsActive) return;
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { catchKeys.left = true; e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { catchKeys.right = true; e.preventDefault(); }
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') catchKeys.left = false;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') catchKeys.right = false;
});
window.addEventListener('resize', () => {
  if (catchIsActive) {
    catchAreaW = $('catch-area').clientWidth || 360;
    catchAreaH = $('catch-area').clientHeight || 430;
  }
});

$('c-next-game-btn').onclick = () => {
  $('c-next-game-btn').hidden = true;
  $('btn-catch-game').click();
};

/* ==================================================
   Game 3: Quiz
================================================== */
let currentQuizAnswer = "";

$('btn-quiz-game').onclick = loadQuiz;
$('btn-next-quiz').onclick = loadQuiz;

function loadQuiz() {
  $('bottom-bar').hidden = true;
  $('games-tab').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('game-selector').hidden = true;
  $('game-board-wrap').hidden = true;
  $('catch-board-wrap').hidden = true;
  $('quiz-board-wrap').hidden = false;

  $('q-situation').textContent = 'جارٍ التحميل...';
  $('q-priest').textContent = '';
  $('q-choices').innerHTML = '';
  $('q-msg').textContent = '';
  $('btn-next-quiz').hidden = true;

  const currentPriestTxt = $('q-priest') ? $('q-priest').textContent : '';
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'getQuiz', last: currentPriestTxt }) })
    .then(r => r.json())
    .then(d => {
      if (d.error) {
        $('q-situation').textContent = 'تنبيه';
        $('q-priest').textContent = d.error;
        return;
      }

      $('q-situation').textContent = d.situation || 'مردات القداس';
      $('q-priest').textContent = d.priest;
      currentQuizAnswer = d.correctAnswer;

      d.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'quiz-choice';
        btn.textContent = c;
        btn.onclick = () => checkQuizAnswer(btn, c);
        $('q-choices').appendChild(btn);
      });
    })
    .catch(() => {
      $('q-situation').textContent = 'خطأ في الاتصال بالانترنت';
    });
}

function checkQuizAnswer(btn, chosen) {
  Array.from($('q-choices').children).forEach(b => b.disabled = true);

  if (chosen === currentQuizAnswer) {
    btn.classList.add('correct');
    $('q-msg').textContent = 'إجابة صحيحة! برافو عليك';
    $('q-msg').style.color = '#10b981';
    playWinSound();
  } else {
    btn.classList.add('wrong');
    $('q-msg').textContent = 'للأسف إجابة خاطئة';
    $('q-msg').style.color = '#ef4444';

    Array.from($('q-choices').children).forEach(b => {
      if (b.textContent === currentQuizAnswer) b.classList.add('quiz-correct-ans');
    });
  }
  $('btn-next-quiz').hidden = false;
}

/* --- Challenge --- */
$('chal-trig').onclick = () => { $('chal-card').hidden = false; $('chal-trig').hidden = true; };
function renderChallengeData(d) {
  $('chal-content').hidden = true; $('chal-play').hidden = true; $('chal-msg').hidden = true;
  if (!d || d.error || !d.active) return;
  if (d.status === 'None' || d.status === 'Submitted' || d.status === 'Approved') {
    $('chal-content').hidden = false; $('chal-open').textContent = 'افتح الصندوق الآن!';
  } else if (d.status === 'Pending') {
    applyChalState(d);
  }
}
function loadChallenge(name) {
  $('chal-content').hidden = true; $('chal-play').hidden = true; $('chal-msg').hidden = true;
  fetch(API + '?action=getChallenge&name=' + encodeURIComponent(name)).then(r => r.json()).then(renderChallengeData);
}
function doRoll() {
  initAudio(); const btn = $('chal-reroll'); btn.disabled = true; $('chal-open').textContent = 'جارٍ تشغيل العجلة...';
  $('chal-content').hidden = true; $('chal-play').hidden = false; $('chal-actions').hidden = true; $('chal-pname').hidden = true; $('spinner-window').classList.remove('win'); document.querySelector('.chal-rew').style.opacity = '0';
  let pool = ['اسجدوا لله بخوف', 'أجيوس', 'طاي شوري', 'مرد الإنجيل']; if (linksMap && linksMap['مردات']) { const keys = Object.keys(linksMap['مردات']); if (keys.length > 0) pool = keys; }
  const track = $('spinner-track'); track.style.transition = 'none'; track.style.transform = 'translateY(0px)'; track.innerHTML = ''; track.classList.add('spinning');
  const spinCount = 50; for (let i = 0; i < spinCount; i++) { const div = document.createElement('div'); div.className = 'spinner-item'; div.textContent = pool[Math.floor(Math.random() * pool.length)]; track.appendChild(div); }
  $('spinner-window').hidden = false;
  let tickCount = 0; let tickInterval = setInterval(() => { if (tickCount < 15) { playTick(); tickCount++; } }, 120);
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'rollChallenge', name: $('name').value }) }).then(r => r.json()).then(d => {
    if (d.error) { clearInterval(tickInterval); alert(d.error); $('chal-open').textContent = 'افتح الصندوق الآن!'; $('chal-content').hidden = false; $('chal-play').hidden = true; btn.disabled = false; $('spinner-window').hidden = true; return; }
    const targetIndex = spinCount - 3; track.children[targetIndex].textContent = d.state.piece; void track.offsetWidth;
    track.style.transition = 'transform 3.5s cubic-bezier(0.1, 0.9, 0.2, 1.15)'; track.style.transform = `translateY(-${targetIndex * 70}px)`;
    setTimeout(() => { clearInterval(tickInterval); track.classList.remove('spinning'); $('spinner-window').classList.add('win'); track.children[targetIndex].style.color = '#fbbf24'; playWinSound(); setTimeout(() => { $('spinner-window').hidden = true; $('chal-pname').hidden = false; applyChalState(d.state, true); }, 1500); }, 3500);
  });
}
function applyChalState(d, fromSpin = false) {
  chalPiece = d.piece;
  const chalUrl = linksMap && linksMap['مردات'] && linksMap['مردات'][d.piece];
  $('chal-plink').hidden = !chalUrl;
  if (chalUrl) $('chal-plink').href = chalUrl;
  const pName = $('chal-pname'); pName.textContent = d.piece; $('chal-cval').textContent = d.coupons; const rem = 2 - d.rolls; $('chal-rem').textContent = rem; $('chal-reroll').disabled = (rem <= 0);
  $('chal-content').hidden = true; $('chal-play').hidden = false; if (!fromSpin) { $('spinner-window').hidden = true; pName.hidden = false; } $('chal-actions').hidden = false; document.querySelector('.chal-rew').style.transition = 'opacity 0.8s'; document.querySelector('.chal-rew').style.opacity = '1';
  if (fromSpin) { pName.style.color = '#fbbf24'; pName.style.transform = 'scale(1.15)'; pName.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; setTimeout(() => { pName.style.transform = 'scale(1)'; }, 400); } else { pName.style.color = '#ffffff'; }
}
$('chal-open').onclick = () => doRoll(); $('chal-reroll').onclick = () => doRoll();
$('chal-rec-btn').onclick = () => { isChallengeRec = true; $('regular-inputs').hidden = true; $('chal-card').style.border = '2px solid #10b981'; say('تحدي المردات: ' + chalPiece, 'ok', 'اضغط على الميكروفون للتسجيل.'); };

/* --- History & Attendance --- */
const iconPlay = SVG_ICONS.play;
const iconPause = SVG_ICONS.pause;
const iconLoad = SVG_ICONS.load;

function renderHistoryData(data) {
  $('history').hidden = false;
  $('history-list').replaceChildren();
  if (!data || !data.length) {
    const empty = document.createElement('div');
    empty.className = 'h-card'; empty.style.textAlign = 'center'; empty.style.opacity = '0.7';
    empty.textContent = 'لا يوجد سجل سابق';
    $('history-list').append(empty);
    return;
  }
  data.forEach(item => {
    const card = document.createElement('div'); card.className = 'h-card';
    let statusText = 'قيد المراجعة', statusClass = 's-pending';
    if (item.status === 'Approved') { statusText = 'مقبول'; statusClass = 's-approved'; }
    if (item.status === 'Rejected') { statusText = (item.category === 'تحدي المردات') ? 'محاولة خاسرة' : 'يحتاج إعادة'; statusClass = 's-rejected'; }
    const playBtn = item.url ? `<button class="mini-play" data-url="${item.url}">${iconPlay}</button>` : '';
    let html = `<div class="h-title"><div style="display: flex; align-items: center; gap: 6px;">${playBtn}<span>${item.category} - ${item.piece}</span></div><span class="${statusClass}">${statusText}</span></div>`;
    if (item.comment) html += `<div class="h-comment">تعليق: ${item.comment}</div>`;
    card.innerHTML = html; $('history-list').append(card);
  });
}

function fetchHistory(name) {
  if (!name) { $('history').hidden = true; return; }
  $('history').hidden = false;
  $('history-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
  fetch(API + '?action=history&name=' + encodeURIComponent(name)).then(r => r.json()).then(renderHistoryData);
}

function animateValue(obj, start, end, duration) {
  if (start === end) { obj.textContent = end; return; }
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    obj.textContent = Math.floor(easeOut * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step); else obj.textContent = end;
  }; window.requestAnimationFrame(step);
}
let attChart = null;
function updateChart(records) {
  const chronological = [...records].reverse(), labels = chronological.map(r => r.date);
  let vScore = 0, hScore = 0, lScore = 0; const vData = [], hData = [], lData = [];
  const step = (present, held) => held === false ? 0 : (present ? 1 : -1);
  chronological.forEach(r => { vScore += step(r.vespers, r.vespersHeld); hScore += step(r.hymns, r.hymnsHeld); lScore += step(r.liturgy, r.liturgyHeld); lData.push(lScore); hData.push(hScore + 0.15); vData.push(vScore - 0.15); });
  const ctx = document.getElementById('attendanceChart').getContext('2d');
  if (attChart) attChart.destroy();
  attChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: 'قداس', data: lData, borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.3, borderWidth: 2, pointRadius: 3, order: 3 }, { label: 'ألحان', data: hData, borderColor: '#16a34a', backgroundColor: '#16a34a', tension: 0.3, borderWidth: 2, pointRadius: 3, borderDash: [8, 6], order: 2 }, { label: 'عشية', data: vData, borderColor: '#d97706', backgroundColor: '#d97706', tension: 0.3, borderWidth: 2, pointRadius: 3, borderDash: [2, 4], order: 1 } ] }, options: { responsive: true, plugins: { legend: { labels: { font: { family: 'Cairo' } } } }, scales: { y: { ticks: { stepSize: 1, precision: 0 } }, x: { ticks: { font: { size: 10, family: 'Cairo' } } } } } });
}

function renderAttendanceData(data) {
  $('attendance').hidden = false;
  $('attendance-list').replaceChildren();
  const records = (data && data.records) || [];
  const coupons = (data && data.coupons !== undefined) ? Number(data.coupons) : 0;
  $('coupons-box').classList.add('show');
  animateValue($('c-val'), lastDisplayedCoupons, coupons, lastDisplayedCoupons === 0 ? 1000 : 400);
  lastDisplayedCoupons = coupons;
  if (!records.length) { $('graph-section').hidden = true; return; }
  $('graph-section').hidden = false;
  updateChart(records);
  records.forEach(item => {
    const card = document.createElement('div');
    card.className = 'att-card';
    const getTag = (eventName, isPresent, held) => {
      const cls = held === false ? 'att-na' : (isPresent ? 'att-yes' : 'att-no');
      return `<span class="att-tag ${cls}">${eventName}</span>`;
    };
    card.innerHTML = `<span class="att-date">${item.date}</span><div class="att-tags">${getTag('عشية', item.vespers, item.vespersHeld)}${getTag('ألحان', item.hymns, item.hymnsHeld)}${getTag('قداس', item.liturgy, item.liturgyHeld)}</div>`;
    $('attendance-list').append(card);
  });
}

function fetchAttendance(name) {
  if (!name) { $('attendance').hidden = true; $('coupons-box').classList.remove('show'); return; }
  $('attendance').hidden = false;
  $('attendance-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
  $('coupons-box').classList.remove('show');
  fetch(API + '?action=attendance&name=' + encodeURIComponent(name)).then(r => r.json()).then(renderAttendanceData);
}

function fetchStudentBundle(name) {
  if (!name) return;
  const cacheKey = 'student_bundle_' + name;
  let hadCache = false;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached && cached.attendance) {
      hadCache = true;
      renderHistoryData(cached.history || []);
      renderAttendanceData(cached.attendance);
      if (cached.challenge) renderChallengeData(cached.challenge);
    }
  } catch (e) {}

  if (!hadCache) {
    $('history').hidden = false;
    $('history-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
    $('attendance').hidden = false;
    $('attendance-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
    $('coupons-box').classList.remove('show');
  }

  fetch(API + '?action=studentBundle&name=' + encodeURIComponent(name) + '&t=' + Date.now())
    .then(r => r.json())
    .then(b => {
      if (!b || b.error) return;
      try { localStorage.setItem(cacheKey, JSON.stringify(b)); } catch (e) {}
      if ($('name').value !== name) return;
      renderHistoryData(b.history || []);
      renderAttendanceData(b.attendance || { records: [], coupons: 0 });
      if (b.challenge) renderChallengeData(b.challenge);
    })
    .catch(() => {});
}

let currentPlayBtn = null; const sharedAudio = $('preview');
$('history-list').addEventListener('click', e => {
  const btn = e.target.closest('.mini-play'); if (!btn) return;
  const rawUrl = btn.dataset.url; const idMatch = rawUrl.match(/[-\w]{25,}/); if (!idMatch) return;
  if (currentPlayBtn === btn && !sharedAudio.paused) { sharedAudio.pause(); btn.innerHTML = iconPlay; return; }
  if (currentPlayBtn && currentPlayBtn !== btn) { currentPlayBtn.innerHTML = iconPlay; }
  currentPlayBtn = btn; btn.innerHTML = iconLoad;
  fetch(API + '?action=play&id=' + idMatch[0])
    .then(r => r.json())
    .then(d => {
      if (!d || !d.ok) throw new Error('play failed');
      sharedAudio.src = 'data:' + d.mime + ';base64,' + d.data;
      sharedAudio.load();
      return sharedAudio.play();
    })
    .then(() => { btn.innerHTML = iconPause; })
    .catch(() => { btn.innerHTML = iconPlay; });
  sharedAudio.onended = () => { btn.innerHTML = iconPlay; };
});

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const isXmas = document.documentElement.getAttribute('data-season') === 'christmas';
  const colors = isXmas
    ? ['#dc2626', '#16a34a', '#fbbf24', '#ffffff', '#b91c1c', '#22c55e']
    : ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#fde047'];
  const pieces = Array.from({ length: 85 }, () => ({
    x: canvas.width * (0.2 + Math.random() * 0.6), y: canvas.height * 0.35 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 14, vy: -6 - Math.random() * 10,
    size: 6 + Math.random() * 6, color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI * 2, vrot: (Math.random() - 0.5) * 0.25, life: 1
  }));
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.vx *= 0.99; p.rot += p.vrot; p.life -= 0.012;
      ctx.save(); ctx.globalAlpha = Math.max(0, p.life); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6); ctx.restore();
    });
    if (alive) requestAnimationFrame(frame); else canvas.remove();
  }
  requestAnimationFrame(frame);
}

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  try { if (!localStorage.getItem('install_dismissed')) $('install-banner').hidden = false; } catch (err) { $('install-banner').hidden = false; }
});
$('btn-install-app').onclick = async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  $('install-banner').hidden = true;
};
$('btn-dismiss-install').onclick = () => {
  $('install-banner').hidden = true;
  try { localStorage.setItem('install_dismissed', '1'); } catch (e) {}
};
window.addEventListener('appinstalled', () => { $('install-banner').hidden = true; deferredInstallPrompt = null; });

function updateMetaThemeColor() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const xmas = document.documentElement.getAttribute('data-season') === 'christmas';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  if (xmas) meta.setAttribute('content', dark ? '#05130e' : '#14532d');
  else meta.setAttribute('content', dark ? '#020b1c' : '#0f2d59');
}

function applyTheme(t) {
  const dark = t === 'dark';
  document.documentElement.setAttribute('data-theme', t);
  updateMetaThemeColor();
  const btn = $('theme-toggle');
  if (btn) btn.setAttribute('aria-label', dark ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن');
  if (typeof Chart !== 'undefined') {
    const text = dark ? '#cbd5e1' : '#475569';
    const grid = dark ? 'rgba(148,163,184,0.18)' : 'rgba(15,23,42,0.1)';
    Chart.defaults.color = text; Chart.defaults.borderColor = grid;
    if (attChart) {
      const o = attChart.options;
      o.plugins.legend.labels.color = text; o.scales.x.ticks.color = text; o.scales.y.ticks.color = text;
      o.scales.x.grid = { color: grid }; o.scales.y.grid = { color: grid }; attChart.update();
    }
  }
}
$('theme-toggle').onclick = () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', next); } catch (e) {}
  applyTheme(next);
};
applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

try {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (_) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  });
} catch (e) {}

if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
/* ==================================================
   Seasonal Theme (Christmas) + Snowfall + Global Sync
================================================== */
let snowRaf = null;
let snowFlakes = [];

function startSnow() {
  const canvas = $('snow-canvas');
  if (!canvas || snowRaf) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  canvas._onResize = resize;

  const count = Math.min(48, Math.max(24, Math.floor(window.innerWidth / 24)));
  snowFlakes = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 1.5 + Math.random() * 2.6,
    vy: 0.45 + Math.random() * 0.9,
    vx: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.35 + Math.random() * 0.5
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#ffffff' : '#cbd5e1';

    for (let i = 0; i < snowFlakes.length; i++) {
      const f = snowFlakes[i];
      f.phase += 0.015;
      f.y += f.vy;
      f.x += f.vx + Math.sin(f.phase) * 0.35;

      if (f.y > canvas.height + 6) {
        f.y = -6;
        f.x = Math.random() * canvas.width;
      }
      if (f.x > canvas.width + 6) f.x = -6;
      if (f.x < -6) f.x = canvas.width + 6;

      ctx.globalAlpha = f.alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    snowRaf = requestAnimationFrame(draw);
  };
  snowRaf = requestAnimationFrame(draw);
}

function stopSnow() {
  if (snowRaf) {
    cancelAnimationFrame(snowRaf);
    snowRaf = null;
  }
  const canvas = $('snow-canvas');
  if (canvas) {
    if (canvas._onResize) window.removeEventListener('resize', canvas._onResize);
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function applySeason(season) {
  const isXmas = season === 'christmas';
  if (isXmas) {
    document.documentElement.setAttribute('data-season', 'christmas');
    startSnow();
  } else {
    document.documentElement.removeAttribute('data-season');
    stopSnow();
  }
  try { localStorage.setItem('season_theme', isXmas ? 'christmas' : 'default'); } catch (e) {}
  updateMetaThemeColor();
  const lbl = $('season-status-lbl');
  if (lbl) lbl.textContent = isXmas ? 'ثيم الكريسماس' : 'التصميم العادي';
}

applySeason(document.documentElement.getAttribute('data-season') === 'christmas' ? 'christmas' : 'default');

fetch(API + '?action=getSeason&t=' + Date.now())
  .then(r => r.json())
  .then(d => { if (d && d.ok && d.season) applySeason(d.season); })
  .catch(() => {});

/* ==================================================
   Admin Dashboard (Review + Students + Attendance + Pieces + Curriculum)
================================================== */
let adminPinCache = '';
let adminStudents = [];
let adminPendingItems = [];
let adminCompletedNames = [];
let adminSortBy = 'name';
let adminAuditSortBy = 'time';
let adminCurrentStudent = '';

function saveAdminCache(adminName) {
  try {
    localStorage.setItem('admin_bundle_v1', JSON.stringify({
      adminName: adminName || $('admin-name-lbl').textContent || '',
      students: adminStudents,
      pending: adminPendingItems,
      completed: adminCompletedNames
    }));
  } catch (e) {}
}

function applyAdminBundle(d, switchTabDefault = false) {
  $('admin-name-lbl').textContent = d.adminName || '';
  adminStudents = d.students || [];
  adminPendingItems = d.pending || [];
  adminCompletedNames = d.completed || [];

  $('login-screen').hidden = true;
  $('login-step-admin').hidden = true;
  $('login-step-name').hidden = false;
  $('admin-dashboard').hidden = false;
  $('admin-bottom-bar').hidden = false;

  renderAdminList();
  renderAdminAudit();
  renderAdminDone(adminCompletedNames);

  if (switchTabDefault) {
    showAdminStudentsSubView('list');
    $('admin-search').value = '';
    switchAdminTab('audit');
  }
}

$('btn-admin-entry').onclick = () => {
  $('login-step-name').hidden = true;
  $('login-step-admin').hidden = false;
  $('admin-pin-input').value = '';
  $('admin-pin-error').textContent = '';
  $('admin-pin-input').focus();
};

$('admin-pin-back').onclick = () => {
  $('login-step-admin').hidden = true;
  $('login-step-name').hidden = false;
};

$('admin-pin-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('admin-pin-submit').click(); }
});

function loginAsAdmin(pin, isAuto = false) {
  let shownFromCache = false;
  if (isAuto) {
    try {
      const cached = JSON.parse(localStorage.getItem('admin_bundle_v1'));
      if (cached && Array.isArray(cached.students)) {
        adminPinCache = pin;
        applyAdminBundle(cached, true);
        shownFromCache = true;
      }
    } catch (e) {}
  } else {
    $('admin-pin-submit').disabled = true;
    $('admin-pin-submit').textContent = 'جارٍ التحميل...';
    $('admin-pin-error').textContent = '';
  }

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminOverview', pin }) })
    .then(r => r.json())
    .then(d => {
      if (!isAuto) {
        $('admin-pin-submit').disabled = false;
        $('admin-pin-submit').textContent = 'دخول للوحة المتابعة';
      }
      if (!d.ok) {
        if (isAuto) {
          try {
            localStorage.removeItem('saved_admin_pin');
            localStorage.removeItem('admin_bundle_v1');
          } catch (e) {}
          $('admin-dashboard').hidden = true;
          $('admin-bottom-bar').hidden = true;
          $('login-screen').hidden = false;
        } else {
          $('admin-pin-error').textContent = d.error || 'كلمة السر غير صحيحة';
        }
        return;
      }
      try { localStorage.setItem('saved_admin_pin', pin); } catch (e) {}
      adminPinCache = pin;
      applyAdminBundle(d, !shownFromCache);
      saveAdminCache(d.adminName);
    })
    .catch(() => {
      if (!isAuto) {
        $('admin-pin-submit').disabled = false;
        $('admin-pin-submit').textContent = 'دخول للوحة المتابعة';
        $('admin-pin-error').textContent = 'خطأ في الاتصال بالانترنت';
      } else if (!shownFromCache) {
        $('login-screen').hidden = false;
      }
    });
}

$('admin-pin-submit').onclick = () => {
  const pin = String($('admin-pin-input').value || '')
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  if (!pin) { $('admin-pin-error').textContent = 'اكتب كلمة السر'; return; }
  loginAsAdmin(pin, false);
};

document.querySelectorAll('.btn-admin-exit-all').forEach(btn => {
  btn.onclick = () => {
    try {
      localStorage.removeItem('saved_admin_pin');
      localStorage.removeItem('admin_bundle_v1');
    } catch (e) {}
    adminPinCache = '';
    adminCurrLoaded = false;
    $('admin-change-pin-box').hidden = true;
    $('admin-season-box').hidden = true;
    $('admin-dashboard').hidden = true;
    $('admin-bottom-bar').hidden = true;
    $('login-screen').hidden = false;
  };
});

try {
  const savedAdminPin = localStorage.getItem('saved_admin_pin');
  if (savedAdminPin) {
    $('login-screen').hidden = true;
    loginAsAdmin(savedAdminPin, true);
  }
} catch (e) {}

/* --- Secret-Code Seasonal Theme Controls (Global) --- */
$('btn-open-admin-season').onclick = () => {
  $('admin-change-pin-box').hidden = true;
  $('admin-season-code').value = '';
  $('admin-season-msg').textContent = '';
  $('season-status-lbl').textContent =
    document.documentElement.getAttribute('data-season') === 'christmas' ? 'ثيم الكريسماس' : 'التصميم العادي';
  $('admin-season-box').hidden = !$('admin-season-box').hidden;
  if (!$('admin-season-box').hidden) $('admin-season-code').focus();
};

$('btn-cancel-season').onclick = () => { $('admin-season-box').hidden = true; };

$('admin-season-code').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('btn-toggle-season').click(); }
});

$('btn-toggle-season').onclick = () => {
  const code = String($('admin-season-code').value || '').trim();
  $('admin-season-msg').textContent = '';
  if (!code) { $('admin-season-msg').textContent = 'اكتب الكود السري'; return; }

  const next = document.documentElement.getAttribute('data-season') === 'christmas' ? 'default' : 'christmas';
  $('btn-toggle-season').disabled = true;
  $('btn-toggle-season').textContent = 'جارٍ التبديل...';

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'setSeason', code, season: next }) })
    .then(r => r.json())
    .then(d => {
      $('btn-toggle-season').disabled = false;
      $('btn-toggle-season').textContent = 'تبديل الثيم';
      if (!d.ok) {
        $('admin-season-msg').textContent = d.error || 'الكود السري غير صحيح';
        $('admin-season-code').classList.add('wrong-anim');
        setTimeout(() => $('admin-season-code').classList.remove('wrong-anim'), 500);
        return;
      }
      applySeason(d.season);
      $('admin-season-box').hidden = true;
      if (d.season === 'christmas') launchConfetti();
    })
    .catch(() => {
      $('btn-toggle-season').disabled = false;
      $('btn-toggle-season').textContent = 'تبديل الثيم';
      $('admin-season-msg').textContent = 'خطأ في الاتصال بالانترنت';
    });
};

function showAdminStudentsSubView(view) {
  $('admin-list-view').hidden = (view !== 'list');
  $('admin-detail-view').hidden = (view !== 'detail');
  $('admin-att-dates-view').hidden = (view !== 'attDates');
  $('admin-att-day-view').hidden = (view !== 'attDay');
}

function getChallengeStatusBadge(s) {
  if (s.progress < 100) return '';
  if (s.chalStatus === 'Pending' && s.chalActivePiece) {
    return `<span class="a-badge a-purple">${SVG_ICONS.dice} جاري: ${s.chalActivePiece}</span>`;
  }
  if ((s.chalPending || 0) > 0) {
    return `<span class="a-badge a-gold">${SVG_ICONS.dice} قيد المراجعة (${s.chalPending})</span>`;
  }
  if ((s.chalDone || 0) > 0 && (s.chalRem || 0) === 0) {
    return `<span class="a-badge a-prog">${SVG_ICONS.dice} أتم التحدي</span>`;
  }
  if ((s.chalDone || 0) > 0) {
    return `<span class="a-badge a-ok">${SVG_ICONS.dice} ${s.chalDone} / متبقي ${s.chalRem}</span>`;
  }
  return `<span class="a-badge a-ok">${SVG_ICONS.dice} لم يبدأ التحدي</span>`;
}

$('admin-search').addEventListener('input', renderAdminList);
document.querySelectorAll('.admin-sort-btn[data-sort]').forEach(btn => {
  btn.onclick = () => {
    adminSortBy = btn.dataset.sort;
    document.querySelectorAll('.admin-sort-btn[data-sort]').forEach(b => b.classList.toggle('active', b === btn));
    renderAdminList();
  };
});

function renderAdminList() {
  const q = norm($('admin-search').value);
  const words = q.split(' ').filter(Boolean);
  let list = adminStudents.filter(s => words.every(w => norm(s.name).includes(w)));

  if (adminSortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
  else if (adminSortBy === 'coupons') list.sort((a, b) => b.coupons - a.coupons);
  else if (adminSortBy === 'progress') {
    list.sort((a, b) => (a.remMarad + a.remAlhan) - (b.remMarad + b.remAlhan) || b.progress - a.progress);
  }

  $('admin-count').textContent = list.length;
  const wrap = $('admin-students-list');
  wrap.replaceChildren();

  list.forEach(s => {
    const card = document.createElement('div');
    card.className = 'admin-student-card';
    const totalRem = s.remMarad + s.remAlhan;
    const chalBadge = getChallengeStatusBadge(s);
    card.innerHTML = `
      <div class="admin-st-top">
        <span class="admin-st-name">${s.name}</span>
        <span class="a-badge a-gold">${SVG_ICONS.ticket} ${s.coupons}</span>
      </div>
      <div class="admin-st-badges">
        <span class="a-badge a-prog">مردات: ${s.progress}%</span>
        <span class="a-badge ${totalRem ? 'a-rem' : 'a-ok'}">${totalRem ? `متبقي: ${s.remMarad} مرد، ${s.remAlhan} لحن` : 'مخلّص كله'}</span>
        ${chalBadge}
        <span class="a-badge a-ok">${SVG_ICONS.puzzle} ${s.gameDone ?? 0} / متبقي ${s.gameRem ?? 0}</span>
        ${s.hasPin ? `<span class="a-badge a-ok" title="محمي برقم سري">${SVG_ICONS.lock}</span>` : ''}
      </div>
    `;
    card.onclick = () => openAdminStudent(s);
    wrap.appendChild(card);
  });
}

function renderAdminStudentDetails(data) {
  const records = (data.attendance && data.attendance.records) || [];
  $('ad-att-list').replaceChildren();
  if (!records.length) {
    $('ad-att-list').textContent = 'لا يوجد سجل حضور';
  } else {
    records.forEach(item => {
      const card = document.createElement('div');
      card.className = 'att-card';
      const tag = (lbl, ok, held) => `<span class="att-tag ${held === false ? 'att-na' : (ok ? 'att-yes' : 'att-no')}">${lbl}</span>`;
      card.innerHTML = `<span class="att-date">${item.date}</span><div class="att-tags">${tag('عشية', item.vespers, item.vespersHeld)}${tag('ألحان', item.hymns, item.hymnsHeld)}${tag('قداس', item.liturgy, item.liturgyHeld)}</div>`;
      $('ad-att-list').appendChild(card);
    });
  }

  const hist = data.history || [];
  $('ad-hist-list').replaceChildren();
  if (!hist.length) {
    $('ad-hist-list').textContent = 'لا يوجد سجل تسميع';
  } else {
    hist.forEach(item => {
      const card = document.createElement('div');
      card.className = 'h-card';
      let st = 'قيد المراجعة', cls = 's-pending';
      if (item.status === 'Approved') { st = 'مقبول'; cls = 's-approved'; }
      if (item.status === 'Rejected') { st = 'يحتاج إعادة'; cls = 's-rejected'; }
      const playBtn = item.url ? `<button class="mini-play" data-url="${item.url}">${iconPlay}</button>` : '';
      card.innerHTML = `<div class="h-title"><div style="display:flex;align-items:center;gap:6px;">${playBtn}<span>${item.category} - ${item.piece}</span></div><span class="${cls}">${st}</span></div>` +
        (item.comment ? `<div class="h-comment">تعليق: ${item.comment}</div>` : '');
      $('ad-hist-list').appendChild(card);
    });
  }
}

function openAdminStudent(s) {
  adminCurrentStudent = s.name;
  showAdminStudentsSubView('detail');
  $('ad-name').textContent = s.name;
  $('ad-coupons').innerHTML = `${SVG_ICONS.ticket} ${s.coupons}`;
  $('ad-prog-text').textContent = `نسبة حفظ مردات الهيكل: ${s.progress}%`;
  $('btn-admin-reset-pin').hidden = !s.hasPin;
  $('ad-chal-done').textContent = s.chalDone ?? 0;
  $('ad-chal-rem').textContent = s.chalRem ?? 0;
  $('ad-game-done').textContent = s.gameDone ?? 0;
  $('ad-game-rem').textContent = s.gameRem ?? 0;

  const liveBox = $('ad-chal-live');
  if (s.progress < 100) {
    liveBox.textContent = 'حالة التحدي: غير متاح حتى إتمام مردات الهيكل 100%.';
  } else if (s.chalStatus === 'Pending' && s.chalActivePiece) {
    liveBox.textContent = `حالة التحدي: جاري التسجيل لمرد "${s.chalActivePiece}" (المكافأة: ${s.chalCoupons || 0} كوبون، التبديلات المستخدمة: ${s.chalRolls || 0}/2).`;
  } else if ((s.chalPending || 0) > 0) {
    liveBox.textContent = `حالة التحدي: يوجد ${s.chalPending} تسجيل تحدي بانتظار المراجعة هذا الأسبوع (مقبول: ${s.chalApproved || 0}).`;
  } else if ((s.chalDone || 0) > 0 && (s.chalRem || 0) === 0) {
    liveBox.textContent = `حالة التحدي: أتم جميع مردات التحدي لهذا الأسبوع (مقبول: ${s.chalApproved || 0}).`;
  } else if ((s.chalDone || 0) > 0) {
    liveBox.textContent = `حالة التحدي: جاهز لسحب مرد جديد (مقبول هذا الأسبوع: ${s.chalApproved || 0}، التبديلات: ${s.chalRolls || 0}/2).`;
  } else {
    liveBox.textContent = 'حالة التحدي: لم يفتح صندوق التحدي هذا الأسبوع بعد.';
  }

  const maradRem = (userPiecesMap[s.name] && userPiecesMap[s.name]['مردات']) || [];
  const alhanRem = (userPiecesMap[s.name] && userPiecesMap[s.name]['ألحان']) || [];

  $('ad-rem-marad').innerHTML = `<div style="font-size:12.5px;font-weight:800;opacity:0.8;">مردات (${maradRem.length}):</div>` +
    (maradRem.length ? `<div class="admin-chips">${maradRem.map(p => `<span class="admin-chip">${p}</span>`).join('')}</div>` : '<div style="font-size:12.5px;color:#10b981;font-weight:700;">مخلّص كل المردات</div>');

  $('ad-rem-alhan').innerHTML = `<div style="font-size:12.5px;font-weight:800;opacity:0.8;">ألحان (${alhanRem.length}):</div>` +
    (alhanRem.length ? `<div class="admin-chips">${alhanRem.map(p => `<span class="admin-chip">${p}</span>`).join('')}</div>` : '<div style="font-size:12.5px;color:#10b981;font-weight:700;">مخلّص كل الألحان</div>');

  const cacheKey = 'student_bundle_' + s.name;
  let hadCache = false;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached && cached.attendance) {
      hadCache = true;
      renderAdminStudentDetails(cached);
    }
  } catch (e) {}

  if (!hadCache) {
    $('ad-att-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
    $('ad-hist-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
  }

  fetch(API + '?action=studentBundle&noChal=1&name=' + encodeURIComponent(s.name) + '&t=' + Date.now())
    .then(r => r.json())
    .then(b => {
      if (!b || b.error) return;
      try { localStorage.setItem(cacheKey, JSON.stringify(b)); } catch (e) {}
      if (adminCurrentStudent !== s.name) return;
      renderAdminStudentDetails(b);
    })
    .catch(() => {});
}

$('btn-admin-back').onclick = () => { showAdminStudentsSubView('list'); };

$('btn-admin-reset-pin').onclick = () => {
  if (!confirm(`مسح الرقم السري بتاع ${adminCurrentStudent}؟`)) return;
  $('btn-admin-reset-pin').disabled = true;
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminResetPin', pin: adminPinCache, name: adminCurrentStudent }) })
    .then(r => r.json())
    .then(d => {
      $('btn-admin-reset-pin').disabled = false;
      if (d.ok) {
        const st = adminStudents.find(x => x.name === adminCurrentStudent);
        if (st) st.hasPin = false;
        $('btn-admin-reset-pin').hidden = true;
        renderAdminList();
        saveAdminCache();
        alert('تم مسح الرقم السري بنجاح');
      } else {
        alert(d.error || 'حدث خطأ');
      }
    });
};

$('ad-hist-list').addEventListener('click', e => {
  const btn = e.target.closest('.mini-play'); if (!btn) return;
  const idMatch = btn.dataset.url.match(/[-\w]{25,}/); if (!idMatch) return;
  if (currentPlayBtn === btn && !sharedAudio.paused) { sharedAudio.pause(); btn.innerHTML = iconPlay; return; }
  if (currentPlayBtn && currentPlayBtn !== btn) currentPlayBtn.innerHTML = iconPlay;
  currentPlayBtn = btn; btn.innerHTML = iconLoad;
  fetch(API + '?action=play&id=' + idMatch[0])
    .then(r => r.json())
    .then(d => {
      if (!d || !d.ok) throw new Error('play failed');
      sharedAudio.src = 'data:' + d.mime + ';base64,' + d.data;
      sharedAudio.load();
      return sharedAudio.play();
    })
    .then(() => { btn.innerHTML = iconPause; })
    .catch(() => { btn.innerHTML = iconPlay; });
  sharedAudio.onended = () => { btn.innerHTML = iconPlay; };
});

/* --- Admin Manual Attendance Editor --- */
let adminAttDatesCache = [];
let adminAttCurrentDay = null;
let adminAttDayStudents = [];

$('btn-open-att-mgr').onclick = () => {
  showAdminStudentsSubView('attDates');
  loadAdminAttDates();
};
$('btn-att-back-students').onclick = () => { showAdminStudentsSubView('list'); };
$('btn-att-dates-refresh').onclick = () => loadAdminAttDates();
$('btn-att-back-dates').onclick = () => {
  showAdminStudentsSubView('attDates');
  loadAdminAttDates();
};

function loadAdminAttDates() {
  const wrap = $('admin-att-dates-list');
  wrap.innerHTML = '<div class="skel-row"></div><div class="skel-row"></div><div class="skel-row"></div>';
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminGetAttDates', pin: adminPinCache }) })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) { wrap.textContent = d.error || 'تعذر التحميل'; return; }
      adminAttDatesCache = d.dates || [];
      renderAdminAttDates();
    })
    .catch(() => { wrap.textContent = 'خطأ في الاتصال بالانترنت'; });
}

function renderAdminAttDates() {
  const wrap = $('admin-att-dates-list');
  wrap.replaceChildren();
  if (!adminAttDatesCache.length) {
    wrap.textContent = 'لا توجد تواريخ حضور مسجلة';
    return;
  }
  adminAttDatesCache.forEach(item => {
    const card = document.createElement('div');
    card.className = 'att-date-card';
    const badges = [];
    if (item.vespersCol) badges.push(`<span class="a-badge a-gold">عشية: ${item.counts.vespers}/${item.total}</span>`);
    if (item.hymnsCol) badges.push(`<span class="a-badge a-prog">ألحان: ${item.counts.hymns}/${item.total}</span>`);
    if (item.liturgyCol) badges.push(`<span class="a-badge a-ok">قداس: ${item.counts.liturgy}/${item.total}</span>`);
    card.innerHTML = `
      <div class="admin-st-top">
        <span class="admin-st-name">${SVG_ICONS.calendar} ${item.date}</span>
      </div>
      <div class="admin-st-badges">${badges.join('')}</div>
    `;
    card.onclick = () => openAdminAttDay(item);
    wrap.appendChild(card);
  });
}

function openAdminAttDay(dayObj) {
  adminAttCurrentDay = dayObj;
  showAdminStudentsSubView('attDay');
  $('att-day-title').textContent = dayObj.date;
  $('att-day-search').value = '';
  const wrap = $('admin-att-day-list');
  wrap.innerHTML = '<div class="skel-row"></div><div class="skel-row"></div><div class="skel-row"></div>';

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'adminGetAttDay',
      pin: adminPinCache,
      liturgyCol: dayObj.liturgyCol,
      hymnsCol: dayObj.hymnsCol,
      vespersCol: dayObj.vespersCol
    })
  })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) { wrap.textContent = d.error || 'تعذر التحميل'; return; }
      adminAttDayStudents = d.students || [];
      renderAdminAttDay();
    })
    .catch(() => { wrap.textContent = 'خطأ في الاتصال بالانترنت'; });
}

$('att-day-search').addEventListener('input', renderAdminAttDay);

function updateAttDaySummary() {
  if (!adminAttCurrentDay) return;
  const total = adminAttDayStudents.length;
  const sum = [];
  if (adminAttCurrentDay.vespersCol) {
    const c = adminAttDayStudents.filter(s => s.vespers).length;
    sum.push(`<span class="a-badge a-gold">عشية: ${c}/${total}</span>`);
  }
  if (adminAttCurrentDay.hymnsCol) {
    const c = adminAttDayStudents.filter(s => s.hymns).length;
    sum.push(`<span class="a-badge a-prog">ألحان: ${c}/${total}</span>`);
  }
  if (adminAttCurrentDay.liturgyCol) {
    const c = adminAttDayStudents.filter(s => s.liturgy).length;
    sum.push(`<span class="a-badge a-ok">قداس: ${c}/${total}</span>`);
  }
  $('att-day-summary').innerHTML = sum.join('');
}

function renderAdminAttDay() {
  updateAttDaySummary();
  const q = norm($('att-day-search').value);
  const words = q.split(' ').filter(Boolean);
  const list = adminAttDayStudents.filter(s => words.every(w => norm(s.name).includes(w)));
  const wrap = $('admin-att-day-list');
  wrap.replaceChildren();

  list.forEach(st => {
    const row = document.createElement('div');
    row.className = 'att-edit-row';
    const nameEl = document.createElement('div');
    nameEl.className = 'att-edit-name';
    nameEl.textContent = st.name;

    const btns = document.createElement('div');
    btns.className = 'att-edit-btns';

    const makeToggle = (label, key, col) => {
      if (!col) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'att-pill-btn' + (st[key] ? ' on' : '');
      b.textContent = label;
      b.onclick = () => {
        const nextVal = !st[key];
        st[key] = nextVal;
        b.classList.toggle('on', nextVal);
        b.disabled = true;
        updateAttDaySummary();
        fetch(API, {
          method: 'POST',
          body: JSON.stringify({ action: 'adminSetAttCell', pin: adminPinCache, row: st.row, col, val: nextVal })
        })
          .then(r => r.json())
          .then(res => {
            b.disabled = false;
            if (!res.ok) {
              st[key] = !nextVal;
              b.classList.toggle('on', !nextVal);
              updateAttDaySummary();
              alert(res.error || 'تعذر الحفظ');
            }
          })
          .catch(() => {
            b.disabled = false;
            st[key] = !nextVal;
            b.classList.toggle('on', !nextVal);
            updateAttDaySummary();
            alert('خطأ في الاتصال بالانترنت');
          });
      };
      btns.appendChild(b);
    };

    makeToggle('عشية', 'vespers', adminAttCurrentDay.vespersCol);
    makeToggle('ألحان', 'hymns', adminAttCurrentDay.hymnsCol);
    makeToggle('قداس', 'liturgy', adminAttCurrentDay.liturgyCol);

    row.append(nameEl, btns);
    wrap.appendChild(row);
  });
}

/* --- Admin Pieces Manager (ألحان / مردات) --- */
let adminPiecesData = { 'ألحان': [], 'مردات': [] };
let adminPiecesActiveSheet = 'ألحان';
let adminPiecesLoaded = false;
let editingPieceCol = 0;

function loadAdminPieces() {
  const wrap = $('admin-pieces-list');
  wrap.innerHTML = '<div class="skel-row"></div><div class="skel-row"></div><div class="skel-row"></div>';
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminGetPieces', pin: adminPinCache }) })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) { wrap.textContent = d.error || 'تعذر التحميل'; return; }
      adminPiecesLoaded = true;
      adminPiecesData = d.pieces || { 'ألحان': [], 'مردات': [] };
      renderAdminPieces();
    })
    .catch(() => { wrap.textContent = 'خطأ في الاتصال بالانترنت'; });
}

document.querySelectorAll('#admin-pieces-switch .cat-btn').forEach(btn => {
  btn.onclick = () => {
    adminPiecesActiveSheet = btn.dataset.sheet;
    document.querySelectorAll('#admin-pieces-switch .cat-btn').forEach(b => b.classList.toggle('active', b === btn));
    $('piece-form-box').hidden = true;
    renderAdminPieces();
  };
});

$('btn-pieces-refresh').onclick = () => loadAdminPieces();

$('pf-closed').addEventListener('change', () => {
  $('pf-closed-lbl').textContent = $('pf-closed').checked ? 'مفتوح للتسميع' : 'مغلق (مخفي)';
});

function openPieceForm(pieceObj) {
  editingPieceCol = pieceObj ? pieceObj.col : 0;
  const isAlhan = adminPiecesActiveSheet === 'ألحان';
  $('pf-heading').textContent = pieceObj
    ? `تعديل (${adminPiecesActiveSheet})`
    : `إضافة جديد في (${adminPiecesActiveSheet})`;
  $('pf-title').value = pieceObj ? pieceObj.title : '';
  $('pf-url').value = pieceObj ? (pieceObj.url || '') : '';
  $('pf-gametext').value = pieceObj ? (pieceObj.gameText || '') : '';
  $('pf-coupons').value = pieceObj ? (pieceObj.coupons || 0) : 0;
  $('pf-closed').checked = pieceObj ? !pieceObj.closed : true;
  $('pf-closed-lbl').textContent = $('pf-closed').checked ? 'مفتوح للتسميع' : 'مغلق (مخفي)';

  $('pf-closed-wrap').hidden = !isAlhan;
  $('pf-coupons-wrap').hidden = isAlhan;
  $('pf-error').textContent = '';
  $('piece-form-box').hidden = false;
  $('pf-title').focus();
}

$('btn-piece-add-new').onclick = () => openPieceForm(null);
$('btn-pf-cancel').onclick = () => { $('piece-form-box').hidden = true; };

$('btn-pf-save').onclick = () => {
  const title = $('pf-title').value.trim();
  const url = $('pf-url').value.trim();
  const gameText = $('pf-gametext').value.trim();
  const coupons = Number($('pf-coupons').value) || 0;
  const closed = !$('pf-closed').checked;

  if (!title) { $('pf-error').textContent = 'اكتب اسم المحفوظ'; $('pf-title').focus(); return; }
  $('pf-error').textContent = '';
  $('btn-pf-save').disabled = true;
  $('btn-pf-save').textContent = 'جارٍ الحفظ...';

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'adminSavePiece',
      pin: adminPinCache,
      sheet: adminPiecesActiveSheet,
      col: editingPieceCol,
      title,
      url,
      gameText,
      coupons,
      closed
    })
  })
    .then(r => r.json())
    .then(d => {
      $('btn-pf-save').disabled = false;
      $('btn-pf-save').textContent = 'حفظ';
      if (!d.ok) { $('pf-error').textContent = d.error || 'تعذر الحفظ'; return; }
      $('piece-form-box').hidden = true;
      loadAdminPieces();
      refreshLists().catch(() => {});
    })
    .catch(() => {
      $('btn-pf-save').disabled = false;
      $('btn-pf-save').textContent = 'حفظ';
      $('pf-error').textContent = 'خطأ في الاتصال بالانترنت';
    });
};

function renderAdminPieces() {
  $('ap-count-alhan').textContent = (adminPiecesData['ألحان'] || []).length;
  $('ap-count-marad').textContent = (adminPiecesData['مردات'] || []).length;

  const isAlhan = adminPiecesActiveSheet === 'ألحان';
  const list = adminPiecesData[adminPiecesActiveSheet] || [];
  const wrap = $('admin-pieces-list');
  wrap.replaceChildren();

  if (!list.length) {
    wrap.textContent = 'لا توجد محفوظات في هذا القسم حالياً';
    return;
  }

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'piece-mgr-card' + (isAlhan && p.closed ? ' is-closed' : '');

    const top = document.createElement('div');
    top.className = 'piece-mgr-top';
    const titleEl = document.createElement('div');
    titleEl.className = 'piece-mgr-title';
    titleEl.textContent = p.title;
    top.appendChild(titleEl);

    const meta = document.createElement('div');
    meta.className = 'piece-mgr-meta';
    if (!isAlhan) {
      meta.innerHTML += `<span class="a-badge a-gold">${SVG_ICONS.ticket} ${p.coupons || 0}</span>`;
    }
    if (p.url) {
      meta.innerHTML += `<a class="a-badge a-ok" href="${p.url}" target="_blank" rel="noopener" style="text-decoration:none;">${SVG_ICONS.link} رابط</a>`;
    }
    if (p.gameText) {
      meta.innerHTML += `<span class="a-badge a-purple">${SVG_ICONS.puzzle} نص لعبة</span>`;
    }

    const actions = document.createElement('div');
    actions.className = 'piece-mgr-actions';

    if (isAlhan) {
      const lbl = document.createElement('label');
      lbl.className = 'toggle-switch';
      const inp = document.createElement('input');
      inp.type = 'checkbox';
      inp.checked = !p.closed;
      const track = document.createElement('span');
      track.className = 'toggle-track';
      const txt = document.createElement('span');
      txt.textContent = p.closed ? 'مغلق' : 'مفتوح';
      inp.onchange = () => {
        const nextClosed = !inp.checked;
        p.closed = nextClosed;
        txt.textContent = nextClosed ? 'مغلق' : 'مفتوح';
        card.classList.toggle('is-closed', nextClosed);
        inp.disabled = true;
        fetch(API, {
          method: 'POST',
          body: JSON.stringify({ action: 'adminTogglePieceClosed', pin: adminPinCache, col: p.col, closed: nextClosed })
        })
          .then(r => r.json())
          .then(res => {
            inp.disabled = false;
            if (!res.ok) {
              p.closed = !nextClosed;
              inp.checked = !p.closed;
              txt.textContent = p.closed ? 'مغلق' : 'مفتوح';
              card.classList.toggle('is-closed', p.closed);
              alert(res.error || 'تعذر التحديث');
            } else {
              refreshLists().catch(() => {});
            }
          })
          .catch(() => {
            inp.disabled = false;
            p.closed = !nextClosed;
            inp.checked = !p.closed;
            txt.textContent = p.closed ? 'مغلق' : 'مفتوح';
            card.classList.toggle('is-closed', p.closed);
            alert('خطأ في الاتصال بالانترنت');
          });
      };
      lbl.append(inp, track, txt);
      actions.appendChild(lbl);
    } else {
      actions.appendChild(document.createElement('span'));
    }

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'switch-user-btn';
    editBtn.innerHTML = `${SVG_ICONS.edit} تعديل`;
    editBtn.onclick = () => openPieceForm(p);
    actions.appendChild(editBtn);

    card.append(top, meta, actions);
    wrap.appendChild(card);
  });
}

/* --- Admin Tabs, Audit, Change Password & Curriculum (Synced) --- */
function switchAdminTab(tab) {
  $('admin-tab-audit').hidden = (tab !== 'audit');
  $('admin-tab-students').hidden = (tab !== 'students');
  $('admin-tab-pieces').hidden = (tab !== 'pieces');
  $('admin-tab-curr').hidden = (tab !== 'curr');
  document.querySelectorAll('#admin-bottom-bar .tab-item').forEach(el => {
    el.classList.toggle('active', el.dataset.atab === tab);
  });
  if (tab === 'pieces' && !adminPiecesLoaded) loadAdminPieces();
  if (tab === 'curr' && !adminCurrLoaded) loadAdminCurriculum();
}

$('btn-open-admin-cpin').onclick = () => {
  $('admin-season-box').hidden = true;
  $('admin-new-pin').value = '';
  $('admin-new-pin-conf').value = '';
  $('admin-cpin-msg').textContent = '';
  $('admin-change-pin-box').hidden = !$('admin-change-pin-box').hidden;
  if (!$('admin-change-pin-box').hidden) $('admin-new-pin').focus();
};

$('btn-cancel-admin-pin').onclick = () => { $('admin-change-pin-box').hidden = true; };

$('btn-save-admin-pin').onclick = () => {
  const clean = v => String(v || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  const p1 = clean($('admin-new-pin').value);
  const p2 = clean($('admin-new-pin-conf').value);
  $('admin-cpin-msg').textContent = '';

  if (p1.length < 4 || p1.length > 24) { $('admin-cpin-msg').textContent = 'كلمة السر لازم تكون من 4 إلى 24 حرف أو رقم'; return; }
  if (p1 !== p2) { $('admin-cpin-msg').textContent = 'كلمتين السر مش متطابقين'; return; }

  $('btn-save-admin-pin').disabled = true;
  $('btn-save-admin-pin').textContent = 'جارٍ الحفظ...';

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminChangePin', pin: adminPinCache, newPin: p1 }) })
    .then(r => r.json())
    .then(d => {
      $('btn-save-admin-pin').disabled = false;
      $('btn-save-admin-pin').textContent = 'حفظ كلمة السر';
      if (!d.ok) { $('admin-cpin-msg').textContent = d.error || 'حدث خطأ'; return; }
      adminPinCache = p1;
      try { localStorage.setItem('saved_admin_pin', p1); } catch (e) {}
      $('admin-change-pin-box').hidden = true;
      alert('تم تغيير كلمة السر بنجاح');
    })
    .catch(() => {
      $('btn-save-admin-pin').disabled = false;
      $('btn-save-admin-pin').textContent = 'حفظ كلمة السر';
      $('admin-cpin-msg').textContent = 'خطأ في الاتصال بالانترنت';
    });
};

const QUICK_COMMENTS = [
  'تحفة برافو',
  'جيد، لكن راجع النطق',
  'جيد، لكن راجع لحن المرد',
  'حاول مرة أخرى بتركيز أكثر',
  'محتاج نحفظه من الأول تاني'
];

function updatePendingBadge(count) {
  const b = $('admin-pending-badge');
  b.textContent = count;
  b.hidden = count <= 0;
}

document.querySelectorAll('.admin-audit-sort-btn').forEach(btn => {
  btn.onclick = () => {
    adminAuditSortBy = btn.dataset.asort;
    document.querySelectorAll('.admin-audit-sort-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderAdminAudit();
  };
});

function loadAdminAudit() {
  if (!adminPinCache) return;
  $('admin-audit-list').innerHTML = '<div class="skel-row"></div><div class="skel-row"></div>';
  $('admin-audit-empty').hidden = true;

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminOverview', pin: adminPinCache, force: true }) })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) return;
      applyAdminBundle(d, false);
      saveAdminCache(d.adminName);
    })
    .catch(() => { $('admin-audit-list').textContent = 'تعذر تحميل التسجيلات'; });
}
$('btn-audit-refresh').onclick = loadAdminAudit;

function renderAdminDone(names) {
  const box = $('admin-done-list');
  box.replaceChildren(...names.map(n => Object.assign(document.createElement('div'), { className: 'done-item', textContent: n })));
  $('admin-done-card').hidden = names.length === 0;
}

function renderAdminAudit() {
  const list = $('admin-audit-list');
  list.replaceChildren();

  const items = [...adminPendingItems];
  const isChal = it => it.category === 'تحدي المردات' ? 1 : 0;

  if (adminAuditSortBy === 'time') {
    items.sort((a, b) => a.row - b.row);
  } else if (adminAuditSortBy === 'priority') {
    items.sort((a, b) => isChal(a) - isChal(b) || a.row - b.row);
  } else if (adminAuditSortBy === 'piece') {
    items.sort((a, b) => a.piece.localeCompare(b.piece, 'ar') || a.row - b.row);
  } else if (adminAuditSortBy === 'student') {
    items.sort((a, b) => a.name.localeCompare(b.name, 'ar') || a.row - b.row);
  }

  updatePendingBadge(items.length);
  $('admin-audit-empty').hidden = items.length > 0;

  items.forEach(it => {
    const c = document.createElement('div');
    c.className = 'audit-card';
    c.innerHTML = `
      <div class="audit-who"></div>
      <div class="audit-meta"></div>
      <div class="audit-slot"></div>
      <div class="quick-chips"></div>
      <input class="audit-comment" type="text" placeholder="اكتب تعليقاً (اختياري)...">
      <div class="audit-actions">
        <button type="button" class="btn-play-aud">${SVG_ICONS.play} تشغيل</button>
        <button type="button" class="btn-ok-aud">${SVG_ICONS.check} قبول</button>
        <button type="button" class="btn-no-aud">${SVG_ICONS.close} رفض</button>
      </div>
    `;
    c.querySelector('.audit-who').textContent = it.name;
    c.querySelector('.audit-meta').textContent = `${it.category} — ${it.piece} — ${it.time}`;

    const commentInput = c.querySelector('.audit-comment');
    const chipsWrap = c.querySelector('.quick-chips');
    QUICK_COMMENTS.forEach(txt => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'q-chip';
      chip.textContent = txt;
      chip.onclick = () => { commentInput.value = txt; };
      chipsWrap.appendChild(chip);
    });

    c.querySelector('.btn-play-aud').onclick = e => playAdminAudio(it.row, c, e.currentTarget);
    c.querySelector('.btn-ok-aud').onclick = () => actAdminAudit('adminApprove', it.row, c, commentInput.value);
    c.querySelector('.btn-no-aud').onclick = () => actAdminAudit('adminReject', it.row, c, commentInput.value);
    list.appendChild(c);
  });
}

function playAdminAudio(row, card, btn) {
  btn.disabled = true; btn.innerHTML = `${SVG_ICONS.load} جارٍ...`;
  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminAudio', pin: adminPinCache, row }) })
    .then(r => r.json())
    .then(a => {
      if (!a.ok) throw new Error(a.error || 'خطأ');
      const slot = card.querySelector('.audit-slot');
      slot.replaceChildren();
      const au = document.createElement('audio');
      au.controls = true; au.autoplay = true;
      au.src = 'data:' + a.mime + ';base64,' + a.data;

      const spWrap = document.createElement('div');
      spWrap.className = 'speed-controls';
      [1, 1.5, 2].forEach(sp => {
        const spBtn = document.createElement('button');
        spBtn.type = 'button';
        spBtn.className = 'speed-btn' + (sp === 1 ? ' active' : '');
        spBtn.textContent = sp + 'x';
        spBtn.onclick = () => {
          au.playbackRate = sp;
          spWrap.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
          spBtn.classList.add('active');
        };
        spWrap.appendChild(spBtn);
      });
      slot.append(au, spWrap);
      btn.remove();
    })
    .catch(e => { alert(e.message); btn.disabled = false; btn.innerHTML = `${SVG_ICONS.play} تشغيل`; });
}

function actAdminAudit(action, row, card, comment) {
  const list = $('admin-audit-list');
  const next = card.nextSibling;
  const removedIdx = adminPendingItems.findIndex(x => x.row === row);
  const removedItem = removedIdx > -1 ? adminPendingItems.splice(removedIdx, 1)[0] : null;

  card.remove();
  updatePendingBadge(adminPendingItems.length);
  $('admin-audit-empty').hidden = adminPendingItems.length > 0;
  saveAdminCache();

  fetch(API, { method: 'POST', body: JSON.stringify({ action, pin: adminPinCache, row, comment }) })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) throw new Error(d.error || 'حدث خطأ');
      refreshLists().catch(() => {});
    })
    .catch(e => {
      alert(e.message);
      if (removedItem) adminPendingItems.splice(removedIdx, 0, removedItem);
      list.insertBefore(card, next && next.parentNode === list ? next : null);
      updatePendingBadge(adminPendingItems.length);
      $('admin-audit-empty').hidden = true;
      saveAdminCache();
    });
}

/* --- Curriculum (Synced across all admins) --- */
const curriculumData = {
  "الصف الأول الابتدائي": {
    "الترم الأول": ["بشفاعات (عربي)", "الشيروبيم (عربي)", "امين امين (عربي)", "مراجعة"],
    "الترم الثاني": ["بركتهم المقدسة (عربي)", "كما كان (عربي)", "سوتيس امين (دمج)", "تين اواوشت (دمج)", "مراجعة"],
    "الترم الثالث": ["اجيوس (٣)", "مرد الانجيل (٣)", "كرحمتك يا رب ٢", "و ننتظر قيامة ١", "مراجعة ١"]
  },
  "الصف الثاني الابتدائي": {
    "الترم الأول": ["الليلويا جي اف افميفني", "اريبو اسمو", "و ننتظر", "تين جوشت (باسيلي عشية / غريغوري)", "مراجعة"],
    "الترم الثاني": ["الليلويا فاي بي بي", "بشفاعات (قبطي)", "ذوكصاباتر (دمج)", "المسيح قام (زفة)", "مراجعة"],
    "الترم الثالث": ["مزمور ١٥٠ دمج", "الهيتينيات سنوي"]
  },
  "الصف الثالث الابتدائي": {
    "الترم الأول": ["ني شيروبيم", "امين امين طون", "مردات صلاة الصلح ق+ع", "الانافورا ق+ع", "مراجعة"],
    "الترم الثاني": ["اوس بيرين", "مردات مقدمة القسمة ق+ع", "مردات مستحق و عادل ق+ع", "مرد القارئون ق+ع", "الاعتراف عربي"],
    "الترم الثالث": ["مقدمة الذكصولوجيات", "مرد دورة القرابين ١", "طلبتك من عمق قلبي", "رشومات الحمل ٣", "مردات صلاة الشكر ٣", "مرد اوشية الانجيل ١"]
  },
  "الصف الرابع الابتدائي": {
    "الترم الأول": ["تي شوري", "مرد الابركسيس العذراء", "لحن سوتيس", "مرد المزمور السنوي", "مراجعة"],
    "الترم الثاني": ["طاي شوري", "مردات حلول الروح القدس ق+ع", "مرد قبلو ع", "مردات بعد القسمة ق+ع", "مراجعة"],
    "الترم الثالث": ["مقدمة ارباع الناقوس", "ارباع الناقوس", "ذ عذراء", "مراحمك يا الهي", "ذ يوحنا الحبيب", "كيرياليصون التسبحة", "ذ الرسل + السمائيين", "مرد انجيل عشية"]
  },
  "الصف الخامس الابتدائي": {
    "الترم الأول": ["ذ كيهك", "مردات انجيل كيهك", "اي بارثينوس", "بي جين ميسي", "مراجعة"],
    "الترم الثاني": ["ال اي ايه اي", "تي نيستيا", "نيف سينتي", "ايها الوحيد الجنس", "غلغوثا ع"],
    "الترم الثالث": ["ذ باكر", "هوس الثاني", "اجيوس استين", "هوس ثالث", "راشي ني", "حل و اغفر ع", "ختامات القداس السنوي"]
  },
  "الصف السادس الابتدائي": {
    "الترم الأول": ["مردات ابركسيس + هيتينيات كيهك", "الطريقة الاولي", "ذ الميلاد", "المحير", "مرد انجيل / مزمور / ابركسيس الميلاد"],
    "الترم الثاني": ["سوماتوس", "تي هيريني", "ايفلوجيمينوس كامل", "خريستوس الصغير", "مراجعة"],
    "الترم الثالث": ["سينا اتشو", "هوس الرابع", "فاي بي ابليمين", "اريبصالين", "بي نيشتي", "تين اويه انسوك (د)", "ال توزيع السنوي", "مجمع التسبحة"]
  },
  "الصف الأول الإعدادي": {
    "الترم الأول": ["ال التوزيع الكيهكي", "الطريقة التانية", "ابورو", "هيتين الصغير"],
    "الترم الثاني": ["شاريه افنوتي", "فاي ايطاف انف", "ذ القيامة", "مرد مزمور / انجیل / ابركسيس قيامة", "مراجعة"],
    "الترم الثالث": ["ايها الرب", "هوس الأول", "افرحي", "لبش الهوس الاول", "بي اويك", "لبش الهوس الثاني", "ال توزيع السنوي", "ثيؤطوكية ١ - ٢ - ٣"]
  },
  "الصف الثاني الإعدادي": {
    "الترم الأول": ["طريقة تالتة", "الطريقة الرابعة", "الطريقة الخامسة", "اجيوس الفرايحي", "بي اهموت غار"],
    "الترم الثاني": ["انثو تي تي شوري", "اجيوس الحزايني", "مردات الطرح", "خريستوس الكبير", "مراجعة"],
    "الترم الثالث": ["شيريه ثي اوطوكيه", "تين ثينو", "لحن البركة", "ای ناهتی", "مرد اطلبوا ق", "اي كوتي", "الاعتراف قبطي", "ثيؤطوكية ٤ - ٥ - ٦", "قبلوا قبطي"]
  },
  "الصف الثالث الإعدادي": {
    "الترم الأول": ["طريقة السادسة", "الطريقة السابعة", "التوزيع الفرايحي", "ني سافيف"],
    "الترم الثاني": ["التوزيع الصيامي", "كي اي بيرتو", "اثفيتي + تي ابيستولي", "جلجثة قبطي"],
    "الترم الثالث": ["ذفتي بانتيس", "شيريه القطعة ٧", "برلكس البركة", "سيموتی", "تون سينا", "اي كوتي", "توليثوس", "تكملة الثيؤطوكيات"]
  },
  "الصف الأول الثانوي": {
    "الترم الأول": ["سنجاري الميلاد", "اوران انشوشو + امويني", "التوزيع الفرايحي"],
    "الترم الثاني": ["اسبسمس انا اعرف", "اومونوجينيس", "تي شوري الحزايني", "طاي شوري الحزايني", "تمثيلية القيامة"],
    "الترم الثالث": ["كاتا ني خوروس", "اسمو ابتشويس", "خريستوس اناليمبسيس", "لحن ارى", "خريستوس افطونف", "لحن ليبون", "ابتجيك ايفول"]
  },
  "الصف الثاني الثانوي": {
    "الترم الأول": ["ال القربان", "مرد الابركسيس الكبير", "ذ الغطاس"],
    "الترم الثاني": ["بيك اثرونوس + افتشنون", "اوكاتي", "اونيم ناي", "جي افزماروؤت الصيامي", "مراجعة"],
    "الترم الثالث": ["بي ابنفما", "لحن تين ثينو", "اسباذيستي", "افشولیم", "افريك اتفي", "نيك ناي او بانوتي"]
  },
  "الصف الثالث الثانوي": {
    "الترم الأول": ["كيرياليصون الصيامي", "ابيك ران"],
    "الترم الثاني": ["بي مايرومي", "اونيشتي اميستيريون", "مراجعة"],
    "الترم الثالث": ["اطاي بارثينوس", "ميغالو", "بولس فرايحي", "الكاثوليكون الفرايحي", "الابركسيس الفرايحي"]
  }
};

let adminCurrState = {};
let adminCurrLoaded = false;

function loadAdminCurriculum() {
  const container = $('admin-curr-container');
  let hadCache = false;
  try {
    const cached = JSON.parse(localStorage.getItem('admin_curr_v1'));
    if (cached && typeof cached === 'object') {
      adminCurrState = cached;
      hadCache = true;
      renderAdminCurriculum();
    }
  } catch (e) {}

  if (!hadCache) {
    container.innerHTML = '<div class="skel-row"></div><div class="skel-row"></div><div class="skel-row"></div>';
  }

  fetch(API, { method: 'POST', body: JSON.stringify({ action: 'adminGetCurr', pin: adminPinCache }) })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) {
        if (!hadCache) container.textContent = d.error || 'تعذر التحميل';
        return;
      }
      adminCurrLoaded = true;
      adminCurrState = d.state || {};
      try { localStorage.setItem('admin_curr_v1', JSON.stringify(adminCurrState)); } catch (e) {}
      renderAdminCurriculum();
    })
    .catch(() => {
      if (!hadCache) container.textContent = 'خطأ في الاتصال بالانترنت';
    });
}

$('btn-curr-refresh').onclick = () => loadAdminCurriculum();

function toggleCurrItem(key, el, card) {
  const nextVal = !el.classList.contains('done');
  el.classList.toggle('done', nextVal);
  if (nextVal) adminCurrState[key] = 1;
  else delete adminCurrState[key];
  try { localStorage.setItem('admin_curr_v1', JSON.stringify(adminCurrState)); } catch (e) {}
  updateAdminCurrProgress(card, nextVal ? 1 : -1);

  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ action: 'adminToggleCurr', pin: adminPinCache, key, val: nextVal })
  })
    .then(r => r.json())
    .then(d => {
      if (!d.ok) throw new Error(d.error || 'تعذر الحفظ');
    })
    .catch(() => {
      el.classList.toggle('done', !nextVal);
      if (!nextVal) adminCurrState[key] = 1;
      else delete adminCurrState[key];
      try { localStorage.setItem('admin_curr_v1', JSON.stringify(adminCurrState)); } catch (e) {}
      updateAdminCurrProgress(card, nextVal ? -1 : 1);
      alert('تعذر حفظ التعديل، تأكد من الإنترنت');
    });
}

function renderAdminCurriculum() {
  const container = $('admin-curr-container');
  const expandedGrades = new Set(
    [...container.querySelectorAll('.year-card.expanded')].map(c => c.dataset.grade)
  );
  container.replaceChildren();

  for (const grade in curriculumData) {
    let totalItems = 0, doneItems = 0;
    const card = document.createElement('div');
    card.className = 'year-card' + (expandedGrades.has(grade) ? ' expanded' : '');
    card.dataset.grade = grade;
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'year-details';

    const terms = curriculumData[grade];
    for (const term in terms) {
      if (!terms[term].length) continue;
      const tTitle = document.createElement('div');
      tTitle.className = 'term-title';
      tTitle.textContent = term;
      detailsDiv.appendChild(tTitle);

      const tItems = document.createElement('div');
      tItems.className = 'term-items';

      terms[term].forEach(item => {
        if (item.includes('ق+ع') || item.includes('ق + ع')) {
          totalItems += 2;
          const baseName = item.replace(/ق\s*\+\s*ع/g, '').trim();
          const el = document.createElement('div');
          el.className = 'curr-item-split';
          el.innerHTML = `<span>${baseName}</span>`;
          const mkBtn = (lbl, suf) => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'split-btn'; b.textContent = lbl;
            const key = `curr_${grade}_${term}_${baseName}_${suf}`;
            if (adminCurrState[key]) { b.classList.add('done'); doneItems++; }
            b.onclick = e => {
              e.stopPropagation();
              toggleCurrItem(key, b, card);
            };
            return b;
          };
          el.append(mkBtn('ق', 'coptic'), mkBtn('ع', 'arabic'));
          tItems.appendChild(el);
        } else {
          totalItems += 1;
          const el = document.createElement('div');
          el.className = 'curr-item'; el.textContent = item;
          const key = `curr_${grade}_${term}_${item}`;
          if (adminCurrState[key]) { el.classList.add('done'); doneItems++; }
          el.onclick = e => {
            e.stopPropagation();
            toggleCurrItem(key, el, card);
          };
          tItems.appendChild(el);
        }
      });
      detailsDiv.appendChild(tItems);
    }

    const header = document.createElement('div');
    header.className = 'year-header';
    header.innerHTML = `
      <div class="year-title-row">
        <h3 class="year-title">${grade}</h3>
        <span class="year-fraction">${doneItems} / ${totalItems}</span>
      </div>
      <div class="curr-prog-bg"><div class="curr-prog-fill" style="width:${(doneItems / totalItems) * 100}%"></div></div>
    `;
    header.onclick = () => card.classList.toggle('expanded');
    card.dataset.done = doneItems;
    card.dataset.total = totalItems;
    card.append(header, detailsDiv);
    container.appendChild(card);
  }
}

function updateAdminCurrProgress(card, change) {
  const done = Number(card.dataset.done) + change;
  const total = Number(card.dataset.total);
  card.dataset.done = done;
  card.querySelector('.year-fraction').textContent = `${done} / ${total}`;
  card.querySelector('.curr-prog-fill').style.width = `${(done / total) * 100}%`;
}
