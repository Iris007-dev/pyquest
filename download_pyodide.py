"""Reproduce the pinned, checksum-verified local Pyodide runtime bundle."""

from hashlib import sha256
from pathlib import Path
from shutil import which
from subprocess import run
from tempfile import NamedTemporaryFile
from urllib.request import urlopen

VERSION = "v314.0.7"
BASE = f"https://cdn.jsdelivr.net/pyodide/{VERSION}/full/"
EXPECTED = {
    "pyodide.mjs": "6f1d60f7bf529beb300f0f47983c921d3982363640ba20af0e38efdddbc66109",
    "pyodide.asm.mjs": "f7cdc8ece80678ceb712f8e65ebe6d3a83203a180c399865f49612a051693635",
    "pyodide.asm.wasm": "cc36e3cab04fdfc9a63ff13eb52eae2b911bf46c025cc7b281f394bd3de1d5e6",
    "python_stdlib.zip": "fa1957e5777068fc4f7437f96d860ae2fbe9c19732ba06c84e004ec16dd7dd7a",
    "pyodide-lock.json": "5dc2fc119108bc148c7457dc86e7675b5c87e1cafd420b9c34c1eaef7b36c010",
}
DESTINATION = Path(__file__).resolve().parent / "dist" / "pyodide"


def digest(path: Path) -> str:
    h = sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def download(name: str, target: Path) -> None:
    url = BASE + name
    curl = which("curl.exe") or which("curl")
    if curl:
        run([curl, "--fail", "--location", "--retry", "5", "--retry-all-errors",
             "--silent", "--show-error", "--output", str(target), url], check=True)
    else:
        with urlopen(url, timeout=120) as response, target.open("wb") as output:
            while chunk := response.read(1024 * 1024):
                output.write(chunk)


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for name, expected in EXPECTED.items():
        destination = DESTINATION / name
        if destination.exists() and digest(destination) == expected:
            print(f"verified {name}")
            continue
        with NamedTemporaryFile(dir=DESTINATION, delete=False, suffix=".download") as tmp:
            temp_path = Path(tmp.name)
        try:
            download(name, temp_path)
            actual = digest(temp_path)
            if actual != expected:
                raise RuntimeError(f"SHA-256 mismatch for {name}: {actual}")
            temp_path.replace(destination)
            print(f"downloaded {name} ({destination.stat().st_size:,} bytes)")
        finally:
            temp_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
