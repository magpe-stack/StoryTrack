'use strict';

/* =====================================================================
   StoryTrack — rastreador de progresso (método Story Genius)
   ===================================================================== */

const STORAGE_KEY = 'storytrack.v1';

/* ---------- Estrutura metodológica ---------- */
const PHASES = [
  {
    id: 'p1',
    title: 'Fase 1: Fundação e Conexão Autoral',
    weight: 10,
    steps: [
      { id: 's1', name: 'Passo 1: A Primeira Fagulha (The First Pinprick)', desc: 'Identifique o que chamou sua atenção primeiro: foi a imagem de um personagem ou um conceito de enredo? Escreva o que exatamente o atrai nessa ideia inicial.' },
      { id: 's2', name: 'Passo 2: Por Que Você Se Importa? (Why Do You Care?)', desc: 'Registre por que essa história importa para você e por que você é a pessoa indicada para escrevê-la. Essa motivação autoral será seu combustível nos momentos de bloqueio criativo.' },
      { id: 's3', name: 'Passo 3: O Ponto Central (Point of the Story)', desc: 'Condense em 1 a 3 frases a mensagem moral ou filosófica que você quer que o leitor compreenda ao fechar o livro. Esse é o aprendizado do seu protagonista.' },
      { id: 's4', name: 'Passo 4: A Premissa "E Se?" (What If? Scenario)', desc: 'Escreva uma premissa detalhada conectando o conflito externo ao dilema emocional do protagonista. Inclua contexto, uma surpresa e consequências pessoais claras.' }
    ]
  },
  {
    id: 'p2',
    title: 'Fase 2: Arquitetura Psicológica e Backstory Dramatizada',
    weight: 15,
    steps: [
      { id: 's5', name: 'Passo 5: Estado Inicial (Starting Point)', desc: 'Mapeie quem é seu personagem imediatamente antes da história começar: suas crenças vigentes, comportamento e posição na vida. Ninguém entra em um livro como uma folha em branco.' },
      { id: 's6', name: 'Passo 6: Desejo Superficial (Surface Want)', desc: 'Defina o objetivo concreto e específico que o personagem busca no início do romance. Evite generalidades; quanto mais específico for o desejo, mais clara será a narrativa.' },
      { id: 's7', name: 'Passo 7: Motivação Interna do Desejo (Desire)', desc: 'Responda por que ele quer essa meta e o que ele acredita que ela provará sobre ele perante os outros.' },
      { id: 's8', name: 'Passo 8: A Falsa Crença Central (The Misbelief)', desc: 'Isole a convicção errônea sobre o mundo que o protagonista adota como escudo protetor. É essa tese falsa que o enredo destruirá até o final da obra.' },
      { id: 's9', name: 'Passo 9: Planejamento', desc: 'Identifique o evento específico da infância ou juventude no qual uma expectativa saudável do personagem foi destruída pela realidade.' },
      { id: 's10', name: 'Passo 10: A Cena de Origem (Origin Scene)', desc: 'Redija essa cena em primeira pessoa para vivenciar o choque emocional que o fez adotar a Falsa Crença como mecanismo de defesa.' },
      { id: 's11', name: 'Passo 11: As Três Cenas de Encruzilhada (Crossroads Moments)', desc: 'Escreva três momentos posteriores na vida pregressa do personagem onde escolhas guiadas pela Falsa Crença aprofundaram suas defesas e geraram isolamento ou dor.' }
    ]
  },
  {
    id: 'p3',
    title: 'Fase 3: Estruturação Causal do Enredo',
    weight: 15,
    steps: [
      { id: 's12', name: 'Passo 12: O Problema Externo Principal (Obvious Plot Problem)', desc: 'Escolha um conflito externo grande o bastante para sustentar todo o romance, contendo consequências reais, um prazo limite (ticking clock) e um alto custo emocional.' },
      { id: 's13', name: 'Passo 13: Lista de Conflitos Secundários', desc: 'Catalogue obstáculos e complicações adicionais dividindo-os em ideias desenvolvidas, ideias genéricas e problemas em maturação.' },
      { id: 's14', name: 'Passo 14: Avaliação do Terceiro Trilho', desc: 'Teste cada conflito perguntando se força o personagem a encarar sua Falsa Crença. Se não, descarte.' },
      { id: 's15', name: 'Passo 15: Desenvolvimento dos Pontos de Virada', desc: 'Mapeie segredos, mentiras e obstáculos passados aplicando os testes de causalidade em cada cena (1. Por que precisa acontecer? 2. Como é possível? 3. Por que o personagem agiria assim?).' },
      { id: 's16', name: 'Passo 16: Integração de Subtramas e Personagens de Apoio', desc: 'Desenvolva personagens secundários e subtramas que converjam para desafiar ou refletir a Falsa Crença do protagonista.' }
    ]
  },
  {
    id: 'p4',
    title: 'Fase 4: O Design de Cenas (O Cartão de Cena)',
    weight: 40,
    words: true,
    checklistTitle: 'Checklist de Estruturação de Cenas (50% da Fase 4)',
    steps: [
      { id: 'c1', name: '1. Ponto Alfa (Alpha Point)', desc: 'A função narrativa indispensável da cena no romance.' },
      { id: 'c2', name: '2. Enredo (Causa e Efeito)', desc: 'O fato físico que acontece na primeira metade (Causa) e a consequência prática imediata no mundo (Efeito).' },
      { id: 'c3', name: '3. Terceiro Trilho (Por que Importa e Realização)', desc: 'Como o personagem interpreta o fato através da sua Falsa Crença e o insight ou virada emocional.' },
      { id: 'c4', name: '4. "E Por Isso?" (And So?)', desc: 'A nova decisão ou ação concreta que o personagem toma provocando a cena seguinte (lógica "Portanto / Por causa disso").' }
    ]
  },
  {
    id: 'p5',
    title: 'Fase 5: Redação do Rascunho e Transição para o Livro Pronto',
    weight: 20,
    steps: [
      { id: 'f1', name: '1. Comece pelo Início e Defina o Fim', desc: 'Redija a cena inicial do romance e mapeie a cena do Clímax — o Momento de Revelação (Aha! Moment), onde o protagonista enxerga a falsidade da sua crença central e a supera.' },
      { id: 'f2', name: '2. Redação Contínua (Writing Forward)', desc: 'Escreva as cenas garantindo que a mente do leitor esteja sempre dentro da psique do protagonista, acompanhando como ele processa internamente cada evento antes de agir.' },
      { id: 'f3', name: '3. Revisão Sistemática', desc: 'Após concluir a primeira versão do rascunho, use o Cartão de Cena para diagnosticar e eliminar episódios que não possuem Terceiro Trilho ou que quebram a cadeia de causa e efeito.' }
    ]
  }
];

/* ---------- Utilidades ---------- */
const $ = (sel, root = document) => root.querySelector(sel);

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const uid = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const pad = (n) => String(n).padStart(2, '0');

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseD(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Diferença em dias inteiros entre duas datas 'YYYY-MM-DD' (b - a)
function dayDiff(a, b) {
  return Math.round((parseD(b) - parseD(a)) / 86400000);
}

const fmtDate = (s) => (s ? s.split('-').reverse().join('/') : '—');
const fmtNum = (n) => Number(n || 0).toLocaleString('pt-BR');

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ---------- Estado e persistência ---------- */
function newProject(name) {
  const phases = {};
  PHASES.forEach((ph) => { phases[ph.id] = { start: '', end: '', notes: '' }; });
  return {
    id: uid(),
    name: name || 'Meu Livro',
    startDate: '',
    wordGoal: 60000,
    wordsCurrent: 0,
    phases,
    checks: {}
  };
}

// Garante que um projeto (possivelmente importado/antigo) tenha todos os campos
function normalizeProject(p) {
  const base = newProject(p && p.name);
  const out = Object.assign(base, p || {});
  out.id = (p && p.id) || base.id;
  out.name = String(out.name || 'Meu Livro');
  out.wordGoal = Math.max(0, parseInt(out.wordGoal, 10) || 0);
  out.wordsCurrent = Math.max(0, parseInt(out.wordsCurrent, 10) || 0);
  out.checks = (p && typeof p.checks === 'object' && p.checks) || {};
  const phases = {};
  PHASES.forEach((ph) => {
    const src = (p && p.phases && p.phases[ph.id]) || {};
    phases[ph.id] = {
      start: src.start || '',
      end: src.end || '',
      notes: src.notes || ''
    };
  });
  out.phases = phases;
  return out;
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      const projects = (s.projects || []).map(normalizeProject);
      if (projects.length) {
        const currentId = projects.some((p) => p.id === s.currentId) ? s.currentId : projects[0].id;
        return { projects, currentId, theme: s.theme || defaultTheme() };
      }
    }
  } catch (e) { /* estado corrompido: recomeça */ }
  const p = newProject('Meu Livro');
  return { projects: [p], currentId: p.id, theme: defaultTheme() };
}

function defaultTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    toast('Não foi possível salvar: armazenamento do navegador indisponível.');
  }
}

const cur = () => state.projects.find((p) => p.id === state.currentId);

/* ---------- Cálculos ---------- */
function wordPct(pr) {
  return pr.wordGoal > 0 ? Math.min(100, (pr.wordsCurrent / pr.wordGoal) * 100) : 0;
}

function doneCount(ph, pr) {
  return ph.steps.filter((s) => pr.checks[s.id]).length;
}

function phasePct(ph, pr) {
  const stepsPct = (doneCount(ph, pr) / ph.steps.length) * 100;
  if (ph.words) return (stepsPct + wordPct(pr)) / 2; // 50% checklist + 50% palavras
  return stepsPct;
}

function globalPct(pr) {
  return PHASES.reduce((sum, ph) => sum + (ph.weight * phasePct(ph, pr)) / 100, 0);
}

function phaseStatus(ph, pr) {
  const pct = phasePct(ph, pr);
  const end = pr.phases[ph.id].end;
  if (pct >= 99.999) return { key: 'done', label: 'Concluída', tip: 'Fase concluída' };
  if (!end) return { key: 'none', label: 'Sem prazo', tip: 'Defina a data de término prevista' };
  const left = dayDiff(todayStr(), end);
  if (left < 0) return { key: 'late', label: 'Atrasado', tip: `O prazo passou há ${-left} dia(s)` };
  if (left < 3) {
    return {
      key: 'warn',
      label: 'Atenção',
      tip: left === 0 ? 'O prazo termina hoje' : `Faltam ${left} dia(s) para o prazo`
    };
  }
  return { key: 'ok', label: 'Normal', tip: `Faltam ${left} dias para o prazo` };
}

function globalEndDate(pr) {
  const ends = PHASES.map((ph) => pr.phases[ph.id].end).filter(Boolean).sort();
  return ends.length ? ends[ends.length - 1] : '';
}

function paceInfo(pr) {
  const remaining = Math.max(0, pr.wordGoal - pr.wordsCurrent);
  const end = globalEndDate(pr);
  if (!pr.wordGoal) return { value: '—', note: 'Defina a meta de palavras', text: 'Defina a meta de palavras' };
  if (remaining === 0) return { value: '🎉', note: 'Meta de palavras atingida', text: 'Meta de palavras atingida' };
  if (!end) return { value: '—', note: 'Defina os prazos das fases', text: 'Defina os prazos das fases' };
  const today = todayStr();
  let from = today;
  if (pr.startDate && pr.startDate > today) from = pr.startDate;
  const days = dayDiff(from, end) + 1;
  if (days <= 0) {
    return { value: '—', note: 'O prazo final já passou', text: 'O prazo final já passou' };
  }
  const pace = Math.ceil(remaining / days);
  return {
    value: fmtNum(pace),
    note: `palavras/dia por ${days} dia(s) (faltam ${fmtNum(remaining)})`,
    text: `${fmtNum(pace)} palavras/dia por ${days} dia(s) (faltam ${fmtNum(remaining)})`
  };
}

/* ---------- Renderização ---------- */
function renderProjectSelect() {
  const sel = $('#projectSelect');
  sel.innerHTML = state.projects
    .map((p) => `<option value="${esc(p.id)}"${p.id === state.currentId ? ' selected' : ''}>${esc(p.name)}</option>`)
    .join('');
}

function stepHtml(s, pr) {
  return `
    <li class="step">
      <label>
        <input type="checkbox" data-step="${s.id}"${pr.checks[s.id] ? ' checked' : ''}>
        <span class="step-text">
          <strong>${esc(s.name)}</strong>
          <small>${esc(s.desc)}</small>
        </span>
      </label>
    </li>`;
}

function renderPhases() {
  const pr = cur();
  $('#phases').innerHTML = PHASES.map((ph, i) => {
    const data = pr.phases[ph.id];
    const checklist = ph.words
      ? `<h3 class="sub-title">${esc(ph.checklistTitle)}</h3>`
      : '';
    const wordsModule = ph.words ? `
      <h3 class="sub-title">Módulo de Contagem de Palavras (50% da Fase 4)</h3>
      <div class="words-module">
        <div class="words-grid">
          <label>Meta total de palavras do livro
            <input type="number" id="wordGoal" min="0" step="500" inputmode="numeric" value="${pr.wordGoal}">
          </label>
          <label>Palavras escritas atualmente
            <input type="number" id="wordsCur" min="0" step="100" inputmode="numeric" value="${pr.wordsCurrent}">
          </label>
        </div>
        <div class="words-line">
          <div class="bar"><div class="fill" id="wordsFill"></div></div>
          <span class="pct" id="wordsPct">0%</span>
        </div>
        <p class="hint" id="wordsLabel"></p>
      </div>` : '';

    return `
    <section class="card phase" data-phase="${ph.id}">
      <header class="phase-head">
        <div class="phase-title">
          <span class="phase-num">${i + 1}</span>
          <div>
            <h2>${esc(ph.title)}</h2>
            <span class="weight">Peso global: ${ph.weight}%</span>
          </div>
        </div>
        <span class="badge none" data-badge="${ph.id}">Sem prazo</span>
      </header>

      <div class="phase-progress">
        <div class="bar"><div class="fill" data-fill="${ph.id}"></div></div>
        <span class="pct" data-pct="${ph.id}">0%</span>
      </div>
      <div class="count" data-count="${ph.id}"></div>

      <div class="dates">
        <label>Data de início prevista
          <input type="date" data-phase="${ph.id}" data-date="start" value="${esc(data.start)}">
        </label>
        <label>Data de término prevista
          <input type="date" data-phase="${ph.id}" data-date="end" value="${esc(data.end)}">
        </label>
      </div>

      ${checklist}
      <ul class="steps">${ph.steps.map((s) => stepHtml(s, pr)).join('')}</ul>
      ${wordsModule}

      <div class="notes">
        <label for="notes-${ph.id}">Anotações da fase</label>
        <textarea id="notes-${ph.id}" data-notes="${ph.id}" placeholder="Lembretes, observações de pesquisa, ideias desta etapa…">${esc(data.notes)}</textarea>
      </div>
    </section>`;
  }).join('');

  document.querySelectorAll('textarea[data-notes]').forEach(autosize);
}

function autosize(t) {
  t.style.height = 'auto';
  t.style.height = Math.max(84, t.scrollHeight + 2) + 'px';
}

// Atualiza todos os elementos dinâmicos sem recriar o DOM (preserva foco)
function update() {
  const pr = cur();

  PHASES.forEach((ph) => {
    const pct = phasePct(ph, pr);
    const st = phaseStatus(ph, pr);
    $(`[data-fill="${ph.id}"]`).style.width = pct + '%';
    $(`[data-pct="${ph.id}"]`).textContent = Math.floor(pct + 1e-9) + '%';
    const badge = $(`[data-badge="${ph.id}"]`);
    badge.className = 'badge ' + st.key;
    badge.textContent = st.label;
    badge.title = st.tip;
    $(`[data-count="${ph.id}"]`).textContent = `${doneCount(ph, pr)} de ${ph.steps.length} etapas concluídas`;
  });

  const g = globalPct(pr);
  $('#globalPct').textContent = Math.floor(g + 1e-9) + '%';
  $('#globalFill').style.width = g + '%';

  const end = globalEndDate(pr);
  $('#globalEnd').textContent = end ? fmtDate(end) : '—';
  let note = 'Defina as datas de término das fases';
  if (end) {
    note = 'Maior data de término entre as 5 fases';
    if (pr.startDate) {
      const total = dayDiff(pr.startDate, end) + 1;
      note = total > 0 ? `${total} dia(s) desde o início do projeto` : 'Atenção: término anterior à data de início';
    }
  }
  $('#globalEndNote').textContent = note;

  const pace = paceInfo(pr);
  $('#statPace').textContent = pace.value;
  $('#statPaceNote').textContent = pace.note;

  const wp = pr.wordGoal > 0 ? (pr.wordsCurrent / pr.wordGoal) * 100 : 0;
  $('#statWords').textContent = `${fmtNum(pr.wordsCurrent)} / ${fmtNum(pr.wordGoal)}`;
  $('#statWordsNote').textContent = `${Math.floor(wp + 1e-9)}% da meta`;

  const wf = $('#wordsFill');
  if (wf) {
    wf.style.width = wordPct(pr) + '%';
    $('#wordsPct').textContent = Math.floor(wp + 1e-9) + '%';
    $('#wordsLabel').textContent = `${fmtNum(pr.wordsCurrent)} de ${fmtNum(pr.wordGoal)} palavras · (Palavras atuais ÷ Meta) × 100`;
  }
}

function renderAll() {
  document.documentElement.setAttribute('data-theme', state.theme);
  $('#btnTheme').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#1b1e27' : '#6d4cc2');
  renderProjectSelect();
  $('#projStart').value = cur().startDate || '';
  renderPhases();
  update();
}

/* ---------- Eventos ---------- */
const phasesEl = $('#phases');

phasesEl.addEventListener('input', (e) => {
  const t = e.target;
  const pr = cur();
  if (t.dataset.notes) {
    pr.phases[t.dataset.notes].notes = t.value;
    autosize(t);
  } else if (t.dataset.date) {
    pr.phases[t.dataset.phase][t.dataset.date] = t.value;
  } else if (t.id === 'wordGoal') {
    pr.wordGoal = Math.max(0, parseInt(t.value, 10) || 0);
  } else if (t.id === 'wordsCur') {
    pr.wordsCurrent = Math.max(0, parseInt(t.value, 10) || 0);
  } else {
    return;
  }
  save();
  update();
});

phasesEl.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.step) {
    cur().checks[t.dataset.step] = t.checked;
    save();
    update();
  }
});

$('#projStart').addEventListener('input', (e) => {
  cur().startDate = e.target.value;
  save();
  update();
});

$('#projectSelect').addEventListener('change', (e) => {
  state.currentId = e.target.value;
  save();
  renderAll();
});

$('#btnNew').addEventListener('click', () => {
  const name = prompt('Nome do novo projeto (livro):', 'Novo Livro');
  if (name === null) return;
  const p = newProject(name.trim() || 'Novo Livro');
  state.projects.push(p);
  state.currentId = p.id;
  save();
  renderAll();
  toast('Projeto criado.');
});

$('#btnRename').addEventListener('click', () => {
  const pr = cur();
  const name = prompt('Novo nome do projeto:', pr.name);
  if (name === null || !name.trim()) return;
  pr.name = name.trim();
  save();
  renderProjectSelect();
});

$('#btnDelete').addEventListener('click', () => {
  const pr = cur();
  if (!confirm(`Excluir o projeto "${pr.name}"? Esta ação não pode ser desfeita.`)) return;
  state.projects = state.projects.filter((p) => p.id !== pr.id);
  if (!state.projects.length) state.projects.push(newProject('Meu Livro'));
  state.currentId = state.projects[0].id;
  save();
  renderAll();
  toast('Projeto excluído.');
});

$('#btnTheme').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  save();
  document.documentElement.setAttribute('data-theme', state.theme);
  $('#btnTheme').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#1b1e27' : '#6d4cc2');
});

/* ---------- Relatórios ---------- */
function buildReport(pr) {
  const pace = paceInfo(pr);
  return {
    name: pr.name,
    generatedAt: new Date().toLocaleString('pt-BR'),
    start: pr.startDate,
    end: globalEndDate(pr),
    pct: Math.floor(globalPct(pr) + 1e-9),
    goal: pr.wordGoal,
    words: pr.wordsCurrent,
    wordsPct: pr.wordGoal > 0 ? Math.floor((pr.wordsCurrent / pr.wordGoal) * 100) : 0,
    pace: pace.text,
    phases: PHASES.map((ph, i) => {
      const d = pr.phases[ph.id];
      const st = phaseStatus(ph, pr);
      return {
        n: i + 1,
        title: ph.title,
        weight: ph.weight,
        pct: Math.floor(phasePct(ph, pr) + 1e-9),
        status: st.label,
        statusTip: st.tip,
        start: d.start,
        end: d.end,
        notes: d.notes.trim(),
        steps: ph.steps.map((s) => ({ name: s.name, done: !!pr.checks[s.id] })),
        stepsTitle: ph.checklistTitle || '',
        words: ph.words ? { cur: pr.wordsCurrent, goal: pr.wordGoal } : null
      };
    })
  };
}

function reportMarkdown(r) {
  const L = [];
  L.push(`# StoryTrack — ${r.name}`);
  L.push('');
  L.push(`_Relatório gerado em ${r.generatedAt}_`);
  L.push('');
  L.push('## Resumo');
  L.push('');
  L.push(`- **Progresso total:** ${r.pct}%`);
  L.push(`- **Início do projeto:** ${fmtDate(r.start)}`);
  L.push(`- **Término final estimado:** ${fmtDate(r.end)}`);
  L.push(`- **Palavras:** ${fmtNum(r.words)} / ${fmtNum(r.goal)} (${r.wordsPct}%)`);
  L.push(`- **Ritmo diário necessário:** ${r.pace}`);
  L.push('');
  L.push('| Fase | Peso | Progresso | Status | Início | Término |');
  L.push('|---|---|---|---|---|---|');
  r.phases.forEach((p) => {
    L.push(`| ${p.title.replace(/\|/g, '/')} | ${p.weight}% | ${p.pct}% | ${p.status} | ${fmtDate(p.start)} | ${fmtDate(p.end)} |`);
  });
  r.phases.forEach((p) => {
    L.push('');
    L.push(`## ${p.title}`);
    L.push('');
    L.push(`**Peso global:** ${p.weight}% · **Progresso:** ${p.pct}% · **Status:** ${p.status} · **Prazo:** ${fmtDate(p.start)} → ${fmtDate(p.end)}`);
    L.push('');
    if (p.stepsTitle) { L.push(`**${p.stepsTitle}**`); L.push(''); }
    p.steps.forEach((s) => L.push(`- [${s.done ? 'x' : ' '}] ${s.name}`));
    if (p.words) {
      L.push('');
      L.push(`**Contagem de palavras:** ${fmtNum(p.words.cur)} / ${fmtNum(p.words.goal)}`);
    }
    L.push('');
    L.push('**Anotações:**');
    L.push('');
    if (p.notes) p.notes.split('\n').forEach((line) => L.push('> ' + line));
    else L.push('> _(sem anotações)_');
  });
  L.push('');
  return L.join('\n');
}

function reportText(r) {
  const L = [];
  const line = '='.repeat(60);
  L.push(line);
  L.push(`STORYTRACK — ${r.name.toUpperCase()}`);
  L.push(`Gerado em ${r.generatedAt}`);
  L.push(line);
  L.push('');
  L.push('RESUMO');
  L.push(`  Progresso total........: ${r.pct}%`);
  L.push(`  Início do projeto......: ${fmtDate(r.start)}`);
  L.push(`  Término final estimado.: ${fmtDate(r.end)}`);
  L.push(`  Palavras...............: ${fmtNum(r.words)} / ${fmtNum(r.goal)} (${r.wordsPct}%)`);
  L.push(`  Ritmo diário necessário: ${r.pace}`);
  r.phases.forEach((p) => {
    L.push('');
    L.push('-'.repeat(60));
    L.push(p.title.toUpperCase());
    L.push('-'.repeat(60));
    L.push(`Peso global: ${p.weight}% | Progresso: ${p.pct}% | Status: ${p.status}`);
    L.push(`Prazo: ${fmtDate(p.start)} até ${fmtDate(p.end)}`);
    L.push('');
    if (p.stepsTitle) { L.push(p.stepsTitle); }
    p.steps.forEach((s) => L.push(`  [${s.done ? 'X' : ' '}] ${s.name}`));
    if (p.words) L.push(`  Palavras: ${fmtNum(p.words.cur)} / ${fmtNum(p.words.goal)}`);
    L.push('');
    L.push('Anotações:');
    L.push(p.notes ? p.notes.split('\n').map((l) => '  ' + l).join('\n') : '  (sem anotações)');
  });
  L.push('');
  return L.join('\n');
}

function reportHtml(r) {
  const td = 'border:1px solid #999;padding:5px 8px;vertical-align:top;';
  const th = td + 'background:#e9e3f8;text-align:left;';
  const rows = r.phases.map((p) => `
    <tr>
      <td style="${td}">${esc(p.title)}</td>
      <td style="${td}">${p.weight}%</td>
      <td style="${td}">${p.pct}%</td>
      <td style="${td}">${esc(p.status)}</td>
      <td style="${td}">${fmtDate(p.start)}</td>
      <td style="${td}">${fmtDate(p.end)}</td>
    </tr>`).join('');

  const sections = r.phases.map((p) => `
    <h2 style="color:#4b2f99;">${esc(p.title)}</h2>
    <p><b>Peso global:</b> ${p.weight}% &nbsp;|&nbsp; <b>Progresso:</b> ${p.pct}% &nbsp;|&nbsp; <b>Status:</b> ${esc(p.status)}<br>
       <b>Prazo:</b> ${fmtDate(p.start)} → ${fmtDate(p.end)}</p>
    ${p.stepsTitle ? `<p><b>${esc(p.stepsTitle)}</b></p>` : ''}
    <table style="border-collapse:collapse;width:100%;">
      <tr><th style="${th}">Etapa</th><th style="${th}width:90px;">Concluída</th></tr>
      ${p.steps.map((s) => `<tr><td style="${td}">${esc(s.name)}</td><td style="${td}">${s.done ? 'Sim' : 'Não'}</td></tr>`).join('')}
    </table>
    ${p.words ? `<p><b>Contagem de palavras:</b> ${fmtNum(p.words.cur)} / ${fmtNum(p.words.goal)}</p>` : ''}
    <p><b>Anotações:</b></p>
    <p>${p.notes ? esc(p.notes).replace(/\n/g, '<br>') : '<i>(sem anotações)</i>'}</p>`).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>StoryTrack — ${esc(r.name)}</title></head>
<body style="font-family:Calibri,Arial,sans-serif;font-size:11pt;">
  <h1 style="color:#4b2f99;">StoryTrack — ${esc(r.name)}</h1>
  <p><i>Relatório gerado em ${esc(r.generatedAt)}</i></p>
  <h2 style="color:#4b2f99;">Resumo</h2>
  <p><b>Progresso total:</b> ${r.pct}%<br>
     <b>Início do projeto:</b> ${fmtDate(r.start)}<br>
     <b>Término final estimado:</b> ${fmtDate(r.end)}<br>
     <b>Palavras:</b> ${fmtNum(r.words)} / ${fmtNum(r.goal)} (${r.wordsPct}%)<br>
     <b>Ritmo diário necessário:</b> ${esc(r.pace)}</p>
  <table style="border-collapse:collapse;width:100%;">
    <tr>
      <th style="${th}">Fase</th><th style="${th}">Peso</th><th style="${th}">Progresso</th>
      <th style="${th}">Status</th><th style="${th}">Início</th><th style="${th}">Término</th>
    </tr>${rows}
  </table>
  ${sections}
</body></html>`;
}

function slug(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'projeto';
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const fileBase = () => `${slug(cur().name)}-storytrack-${todayStr()}`;

$('#btnExpMd').addEventListener('click', () => {
  download(new Blob([reportMarkdown(buildReport(cur()))], { type: 'text/markdown;charset=utf-8' }), fileBase() + '.md');
  toast('Relatório Markdown exportado.');
});

$('#btnExpTxt').addEventListener('click', () => {
  download(new Blob([reportText(buildReport(cur()))], { type: 'text/plain;charset=utf-8' }), fileBase() + '.txt');
  toast('Relatório de texto exportado.');
});

$('#btnExpDocx').addEventListener('click', () => {
  const html = reportHtml(buildReport(cur()));
  try {
    if (window.htmlDocx && typeof window.htmlDocx.asBlob === 'function') {
      download(window.htmlDocx.asBlob(html), fileBase() + '.docx');
      toast('Relatório Word (.docx) exportado.');
      return;
    }
  } catch (e) { /* cai no plano B */ }
  // Plano B (ex.: offline sem a biblioteca em cache): HTML compatível com Word
  download(new Blob(['\ufeff', html], { type: 'application/msword' }), fileBase() + '.doc');
  toast('Biblioteca DOCX indisponível (offline?). Gerado .doc compatível com Word.');
});

$('#btnExpJson').addEventListener('click', () => {
  const payload = {
    app: 'StoryTrack',
    version: 1,
    exportedAt: new Date().toISOString(),
    projects: state.projects
  };
  download(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `storytrack-backup-${todayStr()}.json`);
  toast('Backup JSON exportado.');
});

$('#btnImport').addEventListener('click', () => $('#importFile').click());

$('#importFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    let list = null;
    if (Array.isArray(data.projects)) list = data.projects;
    else if (data.projects && typeof data.projects === 'object') list = Object.values(data.projects);
    else if (data.project) list = [data.project];
    if (!list || !list.length) throw new Error('formato inválido');

    let lastId = null;
    list.forEach((raw) => {
      const p = normalizeProject(raw);
      if (state.projects.some((x) => x.id === p.id)) p.id = uid();
      state.projects.push(p);
      lastId = p.id;
    });
    state.currentId = lastId;
    save();
    renderAll();
    toast(`${list.length} projeto(s) importado(s).`);
  } catch (err) {
    toast('Arquivo inválido: não foi possível importar o backup.');
  }
});

/* ---------- Inicialização ---------- */
renderAll();

// Atualiza os badges de prazo quando o dia vira ou o app volta ao primeiro plano
document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
setInterval(update, 60 * 60 * 1000);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* PWA offline indisponível */ });
  });
}
