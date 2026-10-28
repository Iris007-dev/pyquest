// Verify every mapped lesson exists and every browser example has the stated output.
import {readFileSync, mkdtempSync, rmSync} from 'node:fs';
import {join, resolve, sep} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
globalThis.window = {};
for (const name of [
  'pdf-course.js', 'beginner-0-2.js', 'beginner-3-4.js',
  'beginner-5-7.js', 'beginner-8-9.js'
]) {
  vm.runInThisContext(readFileSync(join(dist, name), 'utf8'), {filename: name});
}

const expected = window.PYQUEST_PDF_COURSE.chapters.flatMap((chapter, i) =>
  chapter.topics.map((_, j) => `${i}:${j}`));
const lessons = window.PYQUEST_BEGINNER;
const actual = Object.keys(lessons);
const failures = [];
for (const key of expected) if (!lessons[key]) failures.push(`缺少知识点 ${key}`);
for (const key of actual) if (!expected.includes(key)) failures.push(`多余知识点 ${key}`);

let executed = 0;
for (const key of expected) {
  const item = lessons[key];
  if (!item) continue;
  for (const field of ['plain', 'analogy', 'code', 'output', 'trap', 'tryThis']) {
    if (typeof item[field] !== 'string' || !item[field].trim()) failures.push(`${key} 缺少 ${field}`);
  }
  if (!Array.isArray(item.steps) || item.steps.length < 4 ||
      item.steps.some(step => !step.title || !step.text)) failures.push(`${key} 分步讲解不足`);
  if (!Array.isArray(item.trace) || item.trace.length < 3) failures.push(`${key} 逐步解析不足`);
  if (!item.check?.q || !item.check?.answer) failures.push(`${key} 缺少理解检查`);
  const words = [item.plain, item.analogy, ...(item.steps || []).map(s => s.text),
    ...(item.trace || []), item.trap, item.tryThis, item.check?.answer].join('');
  if (words.length < 500) failures.push(`${key} 正文过短（${words.length} 字符）`);
  if (item.browser === false) continue;
  const runDir = mkdtempSync(join(tmpdir(), 'pyquest-lesson-'));
  try {
    const result = spawnSync('python', ['-c', item.code], {
      cwd: runDir, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024
    });
    const output = (result.stdout || '').replace(/\r\n/g, '\n').replace(/\n$/, '');
    if (result.status !== 0 || output !== item.output) {
      failures.push(`${key} 示例不符：exit=${result.status}, stdout=${JSON.stringify(output)}, expected=${JSON.stringify(item.output)}, stderr=${JSON.stringify(result.stderr)}`);
    } else executed++;
  } finally {
    const tempRoot = resolve(tmpdir()) + sep;
    if (!resolve(runDir).startsWith(tempRoot)) throw Error('Unexpected test directory');
    rmSync(runDir, {recursive: true, force: true});
  }
}

console.log(`知识点 ${actual.length}/${expected.length}；可运行示例通过 ${executed}；问题 ${failures.length}`);
for (const failure of failures) console.error(failure);
if (failures.length) process.exitCode = 1;
