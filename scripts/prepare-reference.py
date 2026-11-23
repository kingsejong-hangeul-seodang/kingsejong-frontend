"""Build the engine dictionary and a small browser reference pack from a font."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "repos.local/Python-correction-engine"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--font", type=Path, default=ENGINE / "data/fonts/DONGGUK UNIVERSITY.ttf")
    parser.add_argument("--workers", type=int, default=2)
    parser.add_argument("--export-only", action="store_true")
    parser.add_argument("--guide-only", action="store_true")
    args = parser.parse_args()
    source = args.font.resolve()
    if not source.is_file() or source.suffix.lower() not in (".ttf", ".otf"):
        parser.error("Provide an existing .ttf or .otf font with Korean glyphs")
    if not (ENGINE / "app/core/stroke_vectorizer/extract.py").is_file():
        parser.error("Clone Python-correction-engine into repos.local first")
    destination = ENGINE / "data/fonts" / source.name
    destination.parent.mkdir(parents=True, exist_ok=True)
    if source != destination.resolve():
        shutil.copy2(source, destination)
    from fontTools.ttLib import TTFont
    with TTFont(destination) as font:
        cmap = font.getBestCmap() or {}
        needed = list(range(0x3131, 0x3164)) + list(range(0xAC00, 0xD7A4))
        missing_glyphs = [code for code in needed if code not in cmap]
        if missing_glyphs:
            raise ValueError(f"Font must cover 51 Korean jamo and 11172 Hangul syllables; missing {len(missing_glyphs)} glyphs")
    from importlib.util import spec_from_file_location, module_from_spec
    spec = spec_from_file_location("guide_font", ROOT / "scripts/prepare-guide-font.py")
    guide_font = module_from_spec(spec)
    spec.loader.exec_module(guide_font)
    guide_font.build(destination)
    if args.guide_only:
        return
    env = {**os.environ, "PYTHONUTF8": "1", "MPLBACKEND": "Agg"}
    if not args.export_only:
        for module, options in [
            ("extract", ["--workers", str(max(1, args.workers))]),
            ("compose", ["--all"]),
        ]:
            subprocess.run([sys.executable, "-m", f"app.core.stroke_vectorizer.{module}",
                            "--font", str(destination), *options], cwd=ENGINE, env=env, check=True)
    data = json.loads((ENGINE / "data/extracted" / source.stem / "composed_all.json").read_text(encoding="utf-8"))
    # Keep the complete dictionary local; ship only the practice corpus and all standalone jamo.
    catalog = json.loads((ROOT / "src/data/content.json").read_text(encoding="utf-8"))
    chars = set("".join(text for item in catalog for text in item["targets"].values()))
    tests = json.loads((ROOT / "src/features/onboarding/leveltest-tasks.json").read_text(encoding="utf-8"))
    chars.update("".join(item["target"] for item in tests))
    chars.update(chr(code) for code in range(0x3131, 0x3164))
    entries = {char: data[char] for char in sorted(chars) if char in data}
    missing = sorted(char for char in chars if ("가" <= char <= "힣" or "ㄱ" <= char <= "ㅣ") and char not in entries)
    if missing:
        raise ValueError(f"Missing glyphs: {missing}")
    for char, strokes in entries.items():
        if not strokes or any(not stroke["points"] for stroke in strokes):
            raise ValueError(f"Empty reference: {char}")
    with TTFont(destination) as font:
        font_name = font["name"].getDebugName(4) or source.stem
    pack = {"schemaVersion": 1, "font": font_name,
            "fontSha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
            "totalGenerated": len(data), "characters": entries}
    output = ROOT / "repos.local/guide-font/reference.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_suffix(".tmp")
    temporary.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    temporary.replace(output)
    print(f"Generated {len(data)} characters; exported {len(entries)} to {output}")


if __name__ == "__main__":
    main()
