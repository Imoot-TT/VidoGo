from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from downloader_core import (  # noqa: E402
    build_format_selector,
    human_eta,
    human_size,
    load_urls_from_text,
    normalize_resolution,
)


def assert_equal(actual: object, expected: object, message: str) -> None:
    if actual != expected:
        raise AssertionError(f"{message}: expected {expected!r}, got {actual!r}")


def assert_raises(error_type: type[BaseException], callback, message: str) -> None:
    try:
        callback()
    except error_type:
        return
    raise AssertionError(f"{message}: expected {error_type.__name__}")


def verify_core_helpers() -> None:
    assert_equal(
        load_urls_from_text("\n# comment\nhttps://a.example/video\nhttps://a.example/video\n https://b.example \n"),
        ["https://a.example/video", "https://b.example"],
        "URL parser should trim, ignore comments, and deduplicate",
    )
    assert_equal(normalize_resolution("best"), "best", "best resolution should pass")
    assert_equal(normalize_resolution("1080"), "1080", "numeric resolution should pass")
    assert_raises(ValueError, lambda: normalize_resolution("4k"), "invalid resolution should fail")
    assert_equal(
        build_format_selector(False, "best"),
        "bestvideo*+bestaudio/bestvideo+bestaudio/best",
        "best video format selector",
    )
    assert_equal(
        build_format_selector(False, "720"),
        "bestvideo[height<=720]+bestaudio/best[height<=720]/best",
        "bounded video format selector",
    )
    assert_equal(build_format_selector(True, "1080"), "bestaudio/best", "audio-only format selector")
    assert_equal(human_size(1024), "1.0 KB/s", "speed formatting")
    assert_equal(human_eta(65), "01:05", "ETA formatting")


def verify_worker_rejects_empty_payload() -> None:
    payload = run_worker("")
    assert_equal(payload["type"], "error", "worker empty payload event type")
    assert "Missing task payload" in payload["message"]


def run_worker(input_text: str) -> dict:
    worker = ROOT / "backend" / "download_worker.py"
    proc = subprocess.run(
        [sys.executable, str(worker)],
        input=input_text,
        text=True,
        capture_output=True,
        check=False,
    )
    if proc.returncode == 0:
        raise AssertionError("worker should reject invalid task payload")
    line = proc.stdout.strip().splitlines()[-1]
    return json.loads(line)


def verify_worker_rejects_invalid_payloads() -> None:
    cases = [
        ("{", "Invalid task payload"),
        ("[]", "Task payload must be an object"),
        (json.dumps({"outputDir": "C:/tmp"}), "No URLs provided"),
        (json.dumps({"urls": ["https://example.com/video.mp4"]}), "Missing output directory"),
    ]
    for input_text, expected_message in cases:
        payload = run_worker(input_text)
        assert_equal(payload["type"], "error", f"worker error event type for {expected_message}")
        if expected_message not in payload["message"]:
            raise AssertionError(f"worker message should include {expected_message!r}: {payload['message']!r}")


def main() -> int:
    verify_core_helpers()
    verify_worker_rejects_empty_payload()
    verify_worker_rejects_invalid_payloads()
    print("backend verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
