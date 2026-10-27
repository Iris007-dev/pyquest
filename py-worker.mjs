import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';

const ready = loadPyodide();
ready.then(() => self.postMessage({type: 'ready'}), error => self.postMessage({type: 'fatal', error: String(error)}));

const runner = `
import contextlib, io, json, traceback
_pq_stdout, _pq_stderr = io.StringIO(), io.StringIO()
_pq_ok = True
try:
    with contextlib.redirect_stdout(_pq_stdout), contextlib.redirect_stderr(_pq_stderr):
        exec(compile(__pq_source, "<your code>", "exec"), {"__name__": "__main__"})
except BaseException:
    _pq_ok = False
    _pq_stderr.write(traceback.format_exc())
json.dumps({"ok": _pq_ok, "stdout": _pq_stdout.getvalue(), "stderr": _pq_stderr.getvalue(), "code": 0 if _pq_ok else 1}, ensure_ascii=False)
`;

self.onmessage = async event => {
  const {id, code} = event.data;
  try {
    const pyodide = await ready;
    const dict = pyodide.globals.get('dict');
    const globals = dict([['__pq_source', code]]);
    try {
      const serialized = await pyodide.runPythonAsync(runner, {globals});
      self.postMessage({id, result: JSON.parse(serialized)});
    } finally {
      globals.destroy();
      dict.destroy();
    }
  } catch (error) {
    self.postMessage({id, result: {ok: false, stdout: '', stderr: String(error), code: 1}});
  }
};
