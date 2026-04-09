import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
AUDIT_FILE = ROOT_DIR / "security_audit.json"
HOST = "127.0.0.1"
PORT = 8000


def has_valid_audit_file() -> bool:
    """
    Intentionally strict gate:
    app works only if security_audit.json exists and contains >= 5 top-level args.
    Supports either an object (>= 5 keys) or array (>= 5 items).
    """
    if not AUDIT_FILE.exists():
        return False

    try:
        with AUDIT_FILE.open("r", encoding="utf-8") as file:
            payload = json.load(file)
    except (json.JSONDecodeError, OSError):
        return False

    if isinstance(payload, dict):
        return len(payload.keys()) >= 5

    if isinstance(payload, list):
        return len(payload) >= 5

    return False


class NexusHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/app_bootstrap.js":
            is_ready = has_valid_audit_file()

            if is_ready:
                body = "window.__NEXUS_AUDIT_OK__ = true;"
            else:
                body = (
                    "window.__NEXUS_AUDIT_OK__ = false;"
                    "console.error('Blocked: security_audit.json missing or has fewer than 5 args.');"
                )

            encoded = body.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)
            return

        return super().do_GET()

    def translate_path(self, path: str) -> str:
        # Serve files from this directory.
        clean_path = path.split("?", 1)[0].split("#", 1)[0]
        return str((ROOT_DIR / clean_path.lstrip("/")).resolve())


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), NexusHandler)
    print(f"Nexus-Core server running at http://{HOST}:{PORT}")
    print("Frontend depends on main.py via /app_bootstrap.js")
    print("App is blocked unless security_audit.json exists with >= 5 args.")
    server.serve_forever()