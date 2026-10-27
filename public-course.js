const pdfCourse = window.PYQUEST_PDF_COURSE;
let currentPdfChapter = Math.min(9, Math.max(0, Number(localStorage.getItem('pq-pdf-chapter')) || 0));
let currentPdfPage = Math.min(346, Math.max(1, Number(localStorage.getItem('pq-pdf-page')) || 1));

function pdfTopicForPage(chapter, page) {
  const found = chapter.topics.findIndex(topic => page >= topic.start && page <= topic.end);
  return found < 0 ? 0 : found;
}

const pdfDeepTopics = {
  '0:0': [[1, 0]], '0:1': [[1, 5]], '0:2': [[6, 3]],
  '1:0': [[1, 2]], '1:1': [[1, 0]], '1:2': [[1, 4]],
  '1:3': [[1, 1]], '1:4': [[3, 1]], '1:5': [[1, 3], [2, 4]],
  '1:6': [[2, 3]], '1:7': [[2, 2]],
  '2:1': [[2, 0], [2, 1]], '2:2': [[3, 1]],
  '2:3': [[3, 0], [3, 3]], '2:4': [[3, 2]], '2:5': [[3, 1]],
  '3:1': [[4, 0], [4, 4]],
  '3:3': [[4, 1], [4, 2]], '3:4': [[4, 3]], '3:5': [[4, 3]], '3:8': [[10, 2]],
  '4:0': [[5, 0]], '4:1': [[5, 1]], '4:2': [[5, 2], [5, 3]],
  '4:3': [[5, 2]], '4:4': [[5, 4]], '4:5': [[5, 4]],
  '5:0': [[7, 2]], '5:1': [[7, 0], [7, 1]],
  '6:0': [[6, 0], [6, 1]], '6:1': [[6, 2]],
  '6:3': [[7, 3]], '6:5': [[12, 3]],
  '7:1': [[10, 0]], '7:2': [[10, 1]], '7:3': [[10, 3]], '7:4': [[10, 3]],
  '8:0': [[8, 0]], '8:1': [[8, 0], [8, 1]],
  '8:4': [[8, 2]], '8:6': [[8, 3]],
  '9:0': [[9, 0], [9, 1]], '9:1': [[9, 2]]
};

function pdfDeepGuide(chapterIndex, topicIndex) {
  return (pdfDeepTopics[`${chapterIndex}:${topicIndex}`] || []).map(([stage, sectionIndex]) => {
    const guide = window.PYQUEST_DEEP?.[stage]?.sections[sectionIndex];
    if (!guide) return '';
    return `<article class="pdf-deep-card"><h3>${esc(guide.title)}</h3>
      ${guide.paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
      <div class="pdf-deep-code"><b>先读代码，猜输出</b><pre><code>${esc(guide.code)}</code></pre>
        <details><summary>核对输出与逐行过程</summary><pre>${esc(guide.output)}</pre><ol>${guide.trace.map(step => `<li>${esc(step)}</li>`).join('')}</ol></details>
      </div><p class="pdf-deep-try"><b>轮到你：</b>${esc(guide.tryThis)}</p>
      <button class="pdf-deep-run" data-deep-stage="${stage}" data-deep-section="${sectionIndex}">把这段代码送去实验室 →</button></article>`;
  }).join('');
}

function pdfFocusedExample(chapterIndex, topicIndex) {
  const key = `${chapterIndex}:${topicIndex}`;
  const example = window.PYQUEST_TOPIC_EXAMPLES?.[key];
  if (!example) return '';
  return `<section class="pdf-deep pdf-focused-example"><p class="eyebrow">本知识点的逐行例子</p><article class="pdf-deep-card"><h3>${esc(example.title)}</h3>
    <div class="pdf-deep-code"><b>先预测输出</b><pre><code>${esc(example.code)}</code></pre>
      <details><summary>核对输出与执行过程</summary><pre>${esc(example.output)}</pre><ol>${example.trace.map(step => `<li>${esc(step)}</li>`).join('')}</ol></details></div>
    <p class="pdf-deep-try"><b>轮到你：</b>${esc(example.tryThis)}</p>
    <button class="pdf-deep-run" data-topic-example="${key}">把这段代码送去实验室 →</button></article></section>`;
}

function renderPdfCourse(chapterIndex = currentPdfChapter, topicIndex = 0) {
  const chapters = pdfCourse.chapters;
  const chapter = chapters[chapterIndex] || chapters[0];
  const topic = chapter.topics[topicIndex] || chapter.topics[0];
  const textbook = window.PYQUEST_TEXTBOOK?.[chapterIndex]?.[topicIndex];
  const check = window.PYQUEST_PDF_CHECKS[chapterIndex];
  currentPdfChapter = chapterIndex;
  currentPdfPage = topic.start;
  localStorage.setItem('pq-pdf-chapter', String(chapterIndex));
  localStorage.setItem('pq-pdf-page', String(topic.start));

  const chapterList = chapters.map((item, index) => `<button class="pdf-chapter-button ${index === chapterIndex ? 'active' : ''}" data-pdf-chapter="${index}"><span>${index === 0 ? '准备' : String(index).padStart(2, '0')}</span><b>${esc(item.title)}</b>${pdfDone.includes(index) ? '<i>✓</i>' : ''}</button>`).join('');
  const topicList = chapter.topics.map((item, index) => `<button class="pdf-topic-button ${index === topicIndex ? 'active' : ''}" data-pdf-topic="${index}"><span>${esc(item.title)}</span></button>`).join('');
  const corrections = pdfCourse.corrections.filter(item => item.page >= topic.start && item.page <= topic.end);
  const deepGuide = pdfDeepGuide(chapterIndex, topicIndex);
  const focusedExample = pdfFocusedExample(chapterIndex, topicIndex);
  const prose = textbook ? `<div class="pdf-textbook"><div class="pdf-learning-goal"><b>读完你能做到</b><p>${esc(textbook.goal)}</p></div>
    <h3>从零讲起</h3>${textbook.paragraphs.map((paragraph, index) => `<p><span class="pdf-paragraph-index">${index + 1}</span>${esc(paragraph)}</p>`).join('')}
    <div class="pdf-misconception"><b>容易弄错的地方</b><p>${esc(textbook.pitfall)}</p></div></div>` : '';
  const challengeId = ({4:'customer_totals',5:'parse_quantity',9:'lower_bound'})[chapterIndex];

  $('#lesson').innerHTML = `<article class="pdf-course">
    <div class="pdf-titlebar"><p class="eyebrow">PyQuest 中文文字教程 · ${chapterIndex === 0 ? '入门准备' : `第 ${chapterIndex} 章`}</p><h1>${esc(chapter.title)}</h1><p>${esc(chapter.intro)}</p></div>
    <div class="pdf-layout"><aside class="pdf-sidebar"><b>教程章节</b><div class="pdf-chapters">${chapterList}</div><b class="pdf-sidebar-heading">本章知识点</b><div class="pdf-topics">${topicList}</div></aside>
      <div class="pdf-content"><section class="pdf-guidance"><p class="eyebrow">小白先看 · ${esc(topic.title)}</p><h2>${esc(topic.title)}</h2><p>${esc(topic.explain)}</p>${prose}
        <div class="pdf-practice"><b>读完后动手</b><p>${esc(topic.practice)}</p></div>${corrections.map(item => `<div class="pdf-correction"><b>需要澄清</b><p>${esc(item.text)}</p><a href="${item.docs}" target="_blank" rel="noreferrer">对照 Python 官方文档 ↗</a></div>`).join('')}</section>
        ${deepGuide ? `<section class="pdf-deep"><p class="eyebrow">补充精讲</p>${deepGuide}</section>` : ''}${focusedExample}
        <section class="pdf-example"><p class="eyebrow">本章小实验</p><h2>先预测，再运行</h2><pre><code>${esc(chapter.sample.code)}</code></pre><details><summary>展开预期输出</summary><pre>${esc(chapter.sample.output)}</pre></details><button class="example-run" id="pdf-example-run">▶ 用真实 Python 运行</button></section>
        <section class="pdf-check"><p class="eyebrow">理解检验 · 原创题</p><h2>${esc(check.q)}</h2><div class="quiz-options">${check.choices.map((choice, index) => `<button class="pdf-check-option" data-pdf-answer="${index}">${String.fromCharCode(65 + index)} · ${esc(choice)}</button>`).join('')}</div><p id="pdf-check-feedback" aria-live="polite">${pdfDone.includes(chapterIndex) ? '✓ 你已通过本章理解检验。' : '答对后记录本章学习进度。'}</p>${challengeId ? `<button class="primary pdf-challenge" data-challenge="${challengeId}">挑战相关工作面试代码题 →</button>` : ''}</section>
      </div></div></article>`;

  const practiceSection = renderPractice200(chapterIndex, topicIndex);
  const nextTopic = topicIndex + 1 < chapter.topics.length ? [chapterIndex, topicIndex + 1] : chapterIndex + 1 < chapters.length ? [chapterIndex + 1, 0] : null;
  if (nextTopic) (practiceSection || document.querySelector('.pdf-check')).insertAdjacentHTML('afterend', `<div class="pdf-next-topic"><button data-next-topic>继续学习：${esc(chapters[nextTopic[0]].topics[nextTopic[1]].title)} →</button></div>`);
  document.querySelector('[data-next-topic]')?.addEventListener('click', () => { renderPdfCourse(...nextTopic); window.scrollTo(0, 0); });
  document.querySelectorAll('[data-pdf-chapter]').forEach(button => button.onclick = () => { renderPdfCourse(Number(button.dataset.pdfChapter), 0); window.scrollTo(0, 0); });
  document.querySelectorAll('[data-pdf-topic]').forEach(button => button.onclick = () => { renderPdfCourse(chapterIndex, Number(button.dataset.pdfTopic)); window.scrollTo(0, 0); });
  document.querySelectorAll('[data-pdf-answer]').forEach(button => button.onclick = () => {
    const choice = Number(button.dataset.pdfAnswer);
    document.querySelectorAll('[data-pdf-answer]').forEach(item => item.classList.toggle('chosen', Number(item.dataset.pdfAnswer) === choice));
    const correct = choice === check.answer;
    $('#pdf-check-feedback').textContent = `${correct ? '✓ 回答正确。' : '✗ 还没有答对。'}${check.why}`;
    $('#pdf-check-feedback').className = correct ? 'feedback good' : 'feedback bad';
    if (correct) { if (!pdfDone.includes(chapterIndex)) pdfDone.push(chapterIndex); }
    else mistakes.unshift({kind:'pdf', time:new Date().toLocaleString('zh-CN'), stage:chapterIndex+1, title:`理解题：${check.q}`, detail:check.why});
    save();
  });
  document.querySelectorAll('[data-deep-stage]').forEach(button => button.onclick = () => {
    const guide = window.PYQUEST_DEEP[Number(button.dataset.deepStage)].sections[Number(button.dataset.deepSection)];
    $('#code').value = guide.code; $('#challenge').innerHTML = ''; loadedChallenge = null;
    $('#output').textContent = '示例已载入。先预测输出，再点击“运行代码”。'; show('lab'); window.scrollTo(0, 0);
  });
  document.querySelectorAll('[data-topic-example]').forEach(button => button.onclick = () => {
    const example = window.PYQUEST_TOPIC_EXAMPLES[button.dataset.topicExample];
    $('#code').value = example.code; $('#challenge').innerHTML = ''; loadedChallenge = null;
    $('#output').textContent = '示例已载入。先预测输出，再点击“运行代码”。'; show('lab'); window.scrollTo(0, 0);
  });
  $('#pdf-example-run').onclick = () => {
    $('#code').value = chapter.sample.code; $('#challenge').innerHTML = ''; loadedChallenge = null;
    $('#output').textContent = '本章示例已载入。先预测输出，再点击“运行代码”。'; show('lab'); window.scrollTo(0, 0);
  };
  $('.pdf-challenge')?.addEventListener('click', event => loadChallenge(event.currentTarget.dataset.challenge));
}
