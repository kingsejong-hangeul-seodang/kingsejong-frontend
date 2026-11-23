"""Export a webfont and actual outline bounds for arbitrary Korean practice text."""
import argparse
import hashlib
import json
from pathlib import Path
from fontTools import subset
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]


def build(font_path):
    source = Path(font_path)
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    with TTFont(source) as font:
        glyphs = font.getGlyphSet()
        cmap = font.getBestCmap() or {}
        codepoints = set(range(32, 127)) | set(range(0x3131, 0x3164)) | set(range(0xAC00, 0xD7A4))
        bounds = {}
        for code in sorted(codepoints & cmap.keys()):
            pen = BoundsPen(glyphs)
            glyphs[cmap[code]].draw(pen)
            if pen.bounds:
                bounds[chr(code)] = list(pen.bounds)
        if not any(0xAC00 <= ord(char) <= 0xD7A3 for char in bounds):
            raise ValueError("Guide font has no Korean outlines")
        manifest = {"schemaVersion": 1, "font": font["name"].getDebugName(4) or source.stem,
                    "sha256": digest, "unitsPerEm": font["head"].unitsPerEm, "bounds": bounds,
                    "copyright": font["name"].getDebugName(0), "license": font["name"].getDebugName(13),
                    "hangulCount": sum(0xAC00 <= ord(char) <= 0xD7A3 for char in bounds)}
        upm = font["head"].unitsPerEm
        if manifest["font"] == "DONGGUK UNIVERSITY":
            # Same em frame as the original Figma 101.031 × 103.7 guide exports.
            manifest["frame"] = [0, -0.8125 * upm, 0.974117647 * upm, upm]
        else:
            top = max(bounds.get("가", [0, 0, upm, 0.88 * upm])[3], 0.8 * upm) + 0.04 * upm
            manifest["frame"] = [0, -top, upm, upm]
        options = subset.Options()
        options.name_IDs = ["*"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        font.flavor = "woff"
        output = ROOT / "repos.local/guide-font"
        output.mkdir(parents=True, exist_ok=True)
        font_file = output / "guide-font.woff"
        temporary = output / "guide-font.tmp"
        font.save(temporary)
        temporary.replace(font_file)
        manifest_file = output / "guide-font.json"
        temporary_manifest = output / "guide-font-json.tmp"
        temporary_manifest.write_text(json.dumps(manifest, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        temporary_manifest.replace(manifest_file)
    print(f"Guide webfont: {len(bounds)} glyphs, {font_file.stat().st_size} bytes")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--font", type=Path, default=ROOT / "repos.local/Python-correction-engine/data/fonts/DONGGUK UNIVERSITY.ttf")
    build(parser.parse_args().font)
