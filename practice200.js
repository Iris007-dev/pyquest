const practice200Questions = window.PYQUEST_PRACTICE200 || [];
const practice200DoneKey = 'pq-practice200-attempted-v1';
const practice200Attempted = new Set((() => {
  try { const values = JSON.parse(localStorage.getItem(practice200DoneKey) || '[]'); return Array.isArray(values) ? values : []; }
  catch { return []; }
})());
let practice200Selected = null;

function practice200DraftKey(id) { return `pq-practice200-draft-${id}`; }
function practice200HintKey(id) { return `pq-practice200-hints-${id}`; }

function formatPracticeExplanation(value) {
  return value.split(/\n+/).filter(Boolean).map(line => {
    const match = line.match(/^(为什么|步骤|例子|易错点|思路|语法)：(.*)$/);
    const label = match ? `<strong>${match[1]}</strong>` : '';
    const body = esc(match ? match[2] : line).replace(/`([^`]+)`/g, '<code>$1</code>');
    return `<p>${label}${body}</p>`;
  }).join('');
}

function renderPractice200(chapterIndex, topicIndex) {
  const items = practice200Questions.filter(item => item.chapter === chapterIndex && item.topic === topicIndex);
  if (!items.length) return null;
  const section = document.createElement('section');
  section.className = 'practice200';
  const done = items.filter(item => practice200Attempted.has(item.id)).length;
  section.innerHTML = `<p class="eyebrow">课后练习 · 用户提供的 200 题</p><h2>用代码回答这些题</h2>
    <p class="practice200-help">本知识点有 ${items.length} 题，已提交 ${done} 题。先自己写代码；提交后网站会真实运行并显示相应参考答案。开放题请根据题意、输出和解析自行核对。</p>
    <div class="practice200-list">${items.map(item => `<button data-practice200-id="${item.id}" class="${practice200Attempted.has(item.id) ? 'attempted' : ''}">#${item.id} ${esc(item.title)}${practice200Attempted.has(item.id) ? ' ✓' : ''}</button>`).join('')}</div>
    <div class="practice200-detail" aria-live="polite"><p>选择一道题开始练习。</p></div>`;
  document.querySelector('.pdf-check').insertAdjacentElement('afterend', section);
  section.querySelectorAll('[data-practice200-id]').forEach(button => button.onclick = () => selectPractice200(section, Number(button.dataset.practice200Id)));
  const preferred = items.find(item => item.id === practice200Selected) || items[0];
  selectPractice200(section, preferred.id);
  return section;
}

function selectPractice200(section, id) {
  const item = practice200Questions[id - 1];
  if (!item) return;
  practice200Selected = id;
  section.querySelectorAll('[data-practice200-id]').forEach(button => button.classList.toggle('selected', Number(button.dataset.practice200Id) === id));
  const detail = section.querySelector('.practice200-detail');
  detail.innerHTML = `<div class="practice200-heading"><b>第 ${item.id} 题 · ${esc(item.title)}</b><span>对应当前知识点</span></div>
    <p class="practice200-prompt">${esc(item.prompt)}</p>
    <div class="practice200-hints"><b>不知道从哪里写？</b><p>先看思路，再看语法；提示不会直接给出完整答案。</p>
      <button type="button" id="practice200-hint-button"></button><div id="practice200-hint-content" aria-live="polite"></div></div>
    <label for="practice200-code">你的 Python 代码</label>
    <textarea id="practice200-code" spellcheck="false" placeholder="# 在这里编写代码。题目要求 input 时，可先用变量模拟一次输入。"></textarea>
    <div class="practice200-actions"><button class="primary" id="practice200-submit">运行并查看参考答案</button><span>输入代码后才会显示答案</span></div>
    <div id="practice200-result" aria-live="polite"></div>`;
  const input = detail.querySelector('#practice200-code');
  const hintButton = detail.querySelector('#practice200-hint-button');
  const hintContent = detail.querySelector('#practice200-hint-content');
  let hintLevel = Math.min(2, Math.max(0, Number(localStorage.getItem(practice200HintKey(id))) || 0));
  const updateHints = () => {
    hintContent.innerHTML = formatPracticeExplanation((item.hints || []).slice(0, hintLevel).join('\n'));
    hintButton.textContent = hintLevel === 0 ? '提示 1：先想思路' : hintLevel === 1 ? '提示 2：看看语法' : '两条提示已显示';
    hintButton.disabled = hintLevel >= 2;
  };
  hintButton.onclick = () => {
    hintLevel = Math.min(2, hintLevel + 1);
    localStorage.setItem(practice200HintKey(id), String(hintLevel));
    updateHints();
  };
  updateHints();
  input.value = localStorage.getItem(practice200DraftKey(id)) || '';
  input.oninput = () => localStorage.setItem(practice200DraftKey(id), input.value);
  detail.querySelector('#practice200-submit').onclick = () => submitPractice200(section, item, input.value);
}

async function submitPractice200(section, item, code) {
  const box = section.querySelector('#practice200-result');
  if (!code.trim()) { box.innerHTML = '<p class="feedback bad">先写下自己的代码，再查看参考答案。</p>'; return; }
  box.innerHTML = '<p>正在启动浏览器内 Python；第一次可能需要一些时间…</p>';
  let runHtml;
  try {
    const result = await post('/api/run', {code});
    const combined = (result.stdout || '') + (result.stderr ? `\n${result.stderr}` : '');
    runHtml = `<div class="practice200-run"><b>你的运行结果</b><pre>${esc(combined || '程序执行结束，没有输出。若写的是函数，请再调用它并打印返回值。')}</pre><p>${result.ok ? '代码已运行。请对照题意和参考解法检查。' : '运行时出现错误，请根据报错修改后再试。'}</p></div>`;
  } catch (error) {
    runHtml = `<p class="feedback bad">浏览器内 Python 暂时无法加载：${esc(error.message)}。参考答案仍可阅读。</p>`;
  }
  practice200Attempted.add(item.id);
  localStorage.setItem(practice200DoneKey, JSON.stringify([...practice200Attempted].sort((a, b) => a - b)));
  renderProgress();
  const note = item.note ? `<p class="practice200-note">${esc(item.note)}</p>` : '';
  const explanation = item.explanation ? `<div class="practice200-explanation"><b>答案解析 · 为什么这样写</b>${formatPracticeExplanation(item.explanation)}</div>` : '';
  box.innerHTML = `${runHtml}<div class="practice200-answer"><b>第 ${item.id} 题参考答案</b>${note}<pre><code>${esc(item.answer)}</code></pre>${explanation}<p>这是一种参考写法。输出题请对照运行结果；函数题还要自己试边界输入。</p></div>`;
  section.querySelector(`[data-practice200-id="${item.id}"]`)?.classList.add('attempted');
  const total = practice200Questions.filter(q => q.chapter === item.chapter && q.topic === item.topic).length;
  const done = practice200Questions.filter(q => q.chapter === item.chapter && q.topic === item.topic && practice200Attempted.has(q.id)).length;
  section.querySelector('.practice200-help').textContent = `本知识点有 ${total} 题，已提交 ${done} 题。提交记录保存在当前浏览器。`;
}
