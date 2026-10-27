let publicWorker = null;
let publicReady = null;
let publicReadyTimer = null;
let publicNextId = 1;
const publicPending = new Map();

function resetPublicWorker(message) {
  publicWorker?.terminate();
  publicWorker = null;
  publicReady = null;
  clearTimeout(publicReadyTimer);
  for (const [, item] of publicPending) {
    clearTimeout(item.timer);
    item.resolve({ok: false, stdout: '', stderr: message, code: -1});
  }
  publicPending.clear();
}

function ensurePublicWorker() {
  if (publicReady) return publicReady;
  publicReady = new Promise((resolve, reject) => {
    const worker = new Worker('py-worker.mjs', {type: 'module'});
    publicWorker = worker;
    publicReadyTimer = setTimeout(() => {
      resetPublicWorker('浏览器内 Python 加载超时，请检查网络后重试。');
      reject(Error('浏览器内 Python 加载超时，请检查网络后重试。'));
    }, 90000);
    worker.onerror = event => {
      const message = event.message || '浏览器无法加载 Python 运行组件。';
      resetPublicWorker(message);
      reject(Error(message));
    };
    worker.onmessage = event => {
      if (event.data.type === 'ready') {
        clearTimeout(publicReadyTimer);
        resolve();
      } else if (event.data.type === 'fatal') {
        resetPublicWorker(event.data.error);
        reject(Error(event.data.error));
      } else {
        const item = publicPending.get(event.data.id);
        if (item) {
          clearTimeout(item.timer);
          publicPending.delete(event.data.id);
          item.resolve(event.data.result);
        }
      }
    };
  });
  return publicReady;
}

async function runPublicPython(code) {
  if (typeof code !== 'string' || code.length > 12000) return {ok: false, stdout: '', stderr: '代码长度不能超过 12000 字符。', code: 1};
  await ensurePublicWorker();
  return new Promise(resolve => {
    const id = publicNextId++;
    const timer = setTimeout(() => resetPublicWorker('运行超时（限制为 3 秒），请检查是否有无限循环。'), 3000);
    publicPending.set(id, {resolve, timer});
    publicWorker.postMessage({id, code});
  });
}

const publicChallengeTests = {
  customer_totals: {
    functionName: 'customer_totals', tests: [
      ['重复客户需累计', [[['Ada', 12], ['Lin', 5], ['Ada', 8]]], {Ada: 20, Lin: 5}, true],
      ['空订单', [[]], {}, true],
      ['零元与负值调整', [[['Ada', 0], ['Ada', -3], ['Lin', 3]]], {Ada: -3, Lin: 3}, false],
      ['顺序不影响累计', [[['Lin', 6], ['Ada', 10], ['Lin', 4]]], {Lin: 10, Ada: 10}, false]
    ]
  },
  parse_quantity: {
    functionName: 'parse_quantity', tests: [
      ['正常输入', [' 12 '], 12, true], ['非法文本', ['12件'], null, true],
      ['负数不合法', ['-2'], null, false], ['零件合法', ['0'], 0, false],
      ['空白输入', ['  '], null, false]
    ]
  },
  lower_bound: {
    functionName: 'lower_bound', tests: [
      ['重复值取第一个', [[1, 2, 2, 4], 2], 1, true], ['空数组', [[], 3], 0, true],
      ['小于所有值', [[2, 5, 8], 1], 0, false], ['大于所有值', [[2, 5, 8], 9], 3, false],
      ['插入中间', [[1, 3, 5], 4], 2, false]
    ]
  }
};

async function judgePublicPython(challengeId, code) {
  const challenge = publicChallengeTests[challengeId];
  if (!challenge) return {ok: false, error: '未知关卡'};
  const failures = [];
  let passed = 0;
  for (const [label, args, expected, visible] of challenge.tests) {
    const data = JSON.stringify({args, expected});
    const harness = `\nimport copy as __pq_copy, json as __pq_json\n` +
      `__pq_data = __pq_json.loads(${JSON.stringify(data)})\n` +
      `__pq_args = __pq_data["args"]\n__pq_expected = __pq_data["expected"]\n` +
      `__pq_before = __pq_copy.deepcopy(__pq_args)\ntry:\n` +
      `    __pq_actual = ${challenge.functionName}(*__pq_args)\n` +
      `    __pq_result = {"pass": type(__pq_actual) is type(__pq_expected) and __pq_actual == __pq_expected and __pq_args == __pq_before, "actual": repr(__pq_actual)}\n` +
      `except Exception as __pq_error:\n` +
      `    __pq_result = {"pass": False, "actual": type(__pq_error).__name__ + ": " + str(__pq_error)}\n` +
      `print("__PYQUEST_RESULT__" + __pq_json.dumps(__pq_result, ensure_ascii=False))\n`;
    const run = await runPublicPython(code + harness);
    const marker = (run.stdout || '').split('\n').reverse().find(line => line.startsWith('__PYQUEST_RESULT__'));
    let result;
    try { result = marker ? JSON.parse(marker.slice('__PYQUEST_RESULT__'.length)) : {pass: false, actual: run.stderr || '未返回结果'}; }
    catch { result = {pass: false, actual: '运行结果无法解析'}; }
    if (run.ok && result.pass) passed++;
    else failures.push({label: visible ? label : '隐藏边界样例', expected: visible ? JSON.stringify(expected) : '请检查边界与输入是否被修改', actual: visible ? String(result.actual).slice(0, 400) : '未通过'});
  }
  return {ok: failures.length === 0, passed, total: challenge.tests.length, failures};
}

async function publicPythonPost(path, payload) {
  if (path === '/api/run') return runPublicPython(payload.code);
  if (path === '/api/submit') return judgePublicPython(payload.challenge_id, payload.code);
  throw Error('未知操作');
}
