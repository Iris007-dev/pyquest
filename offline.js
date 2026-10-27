const PYQUEST_RUNTIME_CACHE = 'pyquest-runtime-v1';
const PYQUEST_RUNTIME_FILES = [
  'pyodide/pyodide.mjs',
  'pyodide/pyodide.asm.mjs',
  'pyodide/pyodide.asm.wasm',
  'pyodide/python_stdlib.zip',
  'pyodide/pyodide-lock.json'
];
const offlineStatus = document.getElementById('offlineStatus');
const offlinePrepare = document.getElementById('offlinePrepare');

function offlineFileUrl(path) {
  return new URL(path, document.baseURI).href;
}

async function offlineCachedCount() {
  const cache = await caches.open(PYQUEST_RUNTIME_CACHE);
  const hits = await Promise.all(PYQUEST_RUNTIME_FILES.map(path =>
    cache.match(offlineFileUrl(path))));
  return hits.filter(Boolean).length;
}

async function updateOfflineStatus() {
  if (!('serviceWorker' in navigator) || !('caches' in window)) {
    offlineStatus.textContent = '此浏览器不支持离线缓存，请使用新版 Chrome、Edge 或 Safari。';
    offlinePrepare.hidden = true;
    return;
  }
  try {
    const count = await offlineCachedCount();
    if (count === PYQUEST_RUNTIME_FILES.length && navigator.serviceWorker.controller) {
      offlineStatus.textContent = '✓ 离线已就绪：课程、练习和 Python 运行均可断网使用。学习记录仅保存在本设备。';
      offlinePrepare.hidden = true;
    } else if (!navigator.onLine) {
      offlineStatus.textContent = `离线资源尚未备齐（${count}/${PYQUEST_RUNTIME_FILES.length}）；请联网后点“准备离线使用”。`;
      offlinePrepare.hidden = false;
    } else {
      offlineStatus.textContent = `首次断网使用前，请点“准备离线使用”（Python 资源 ${count}/${PYQUEST_RUNTIME_FILES.length}）。`;
      offlinePrepare.hidden = false;
    }
  } catch (error) {
    offlineStatus.textContent = `离线状态检查失败：${String(error)}`;
  }
}

async function prepareOffline() {
  offlinePrepare.disabled = true;
  try {
    await navigator.serviceWorker.ready;
    const cache = await caches.open(PYQUEST_RUNTIME_CACHE);
    for (let i = 0; i < PYQUEST_RUNTIME_FILES.length; i++) {
      const path = PYQUEST_RUNTIME_FILES[i];
      offlineStatus.textContent = `正在准备离线 Python 资源 ${i + 1}/${PYQUEST_RUNTIME_FILES.length}：${path.split('/').pop()}…`;
      const url = offlineFileUrl(path);
      if (!(await cache.match(url))) {
        await cache.add(new Request(url, {cache: 'reload'}));
      }
    }
    await updateOfflineStatus();
  } catch (error) {
    offlineStatus.textContent = `离线准备未完成：${String(error)}。联网后可重试。`;
  } finally {
    offlinePrepare.disabled = false;
  }
}

if ('serviceWorker' in navigator && 'caches' in window) {
  navigator.serviceWorker.register('./sw.js').then(() =>
    navigator.serviceWorker.ready.then(updateOfflineStatus)
  ).catch(error => {
    offlineStatus.textContent = `无法启用离线缓存：${String(error)}`;
  });
  navigator.serviceWorker.addEventListener('controllerchange', updateOfflineStatus);
  window.addEventListener('online', updateOfflineStatus);
  window.addEventListener('offline', updateOfflineStatus);
} else {
  updateOfflineStatus();
}
offlinePrepare.addEventListener('click', prepareOffline);
