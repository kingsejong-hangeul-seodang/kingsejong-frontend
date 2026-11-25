import json
import sys
from hashlib import sha256
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "repos.local/Python-correction-engine"


def practice_chars(jamo):
    demo = json.loads((ROOT / "src/data/content.json").read_text(encoding="utf-8"))
    levels = json.loads((ROOT / "src/features/onboarding/leveltest-tasks.json").read_text(encoding="utf-8"))
    server = []
    server_seed = ROOT / "repos.local/kingsejong-server/src/main/resources/seed/contents.json"
    if server_seed.exists():
        server = json.loads(server_seed.read_text(encoding="utf-8"))

    targets = [target for item in demo for target in item["targets"].values()]
    targets += [item["target"] for item in levels]
    targets += [task["target"] for item in server for task in item.get("tasks", [])]
    chars = set("".join(targets)) | set(jamo)
    return sorted(ch for ch in chars if "가" <= ch <= "힣" or ch in jamo)


def write_preview(output, guide, characters, total):
    dest = output / "reference.json"
    temp = dest.with_suffix(".tmp")
    temp.write_text(json.dumps(dict(schemaVersion=1, font=guide["font"], fontSha256=guide["sha256"],
                                    totalGenerated=total, characters=characters),
                              ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    temp.replace(dest)
    print(f"Saved {len(characters)} glyphs to {dest}")


def import_composed(source, output, guide):
    if guide["font"] != "DONGGUK UNIVERSITY":
        raise ValueError("The curated Dongguk dictionary requires the Dongguk guide font")
    data = json.loads(source.read_text(encoding="utf-8-sig"))
    jamo = {chr(code) for code in range(0x3131, 0x3164)}
    hangul = {chr(code) for code in range(0xAC00, 0xD7A4)}
    if not isinstance(data, dict) or data.keys() != jamo | hangul:
        raise ValueError("Expected all 11172 Hangul syllables and 51 standalone jamo")
    characters = {char: data[char] for char in practice_chars(jamo)}
    for char, strokes in characters.items():
        if not isinstance(strokes, list) or not 1 <= len(strokes) <= 100 or any(
            stroke["order"] != index or not isinstance(stroke["jamo"], str)
            or stroke["role"] not in {"cho", "jung", "jong"}
            or not 1 <= len(stroke["points"]) <= 1000
            or any(len(point) != 2 or not all(0 <= value <= 1 for value in point)
                   for point in stroke["points"])
            for index, stroke in enumerate(strokes, 1)
        ):
            raise ValueError(f"Invalid reference strokes for {char}")
    write_preview(output, guide, characters, len(data))


def prepare_preview(font, output, guide):
    sys.path.insert(0, str(ENGINE))
    from app.core.stroke_vectorizer import compose as C, extract as E

    info = C.font_info(str(font))
    digest = sha256(font.read_bytes()).hexdigest()
    if guide["sha256"] != digest:
        raise ValueError("Reference font and guide font do not match")

    chars = practice_chars(E.JAMO_TEMPLATES)

    out = {}
    dest = output / "reference.json"
    if dest.exists():
        previous = json.loads(dest.read_text(encoding="utf-8"))
        if previous["fontSha256"] == digest:
            out.update(previous["characters"])

    dictionary_font = font
    if C.DEFAULT_FONT_FILE.is_file() and sha256(C.DEFAULT_FONT_FILE.read_bytes()).hexdigest() == digest:
        dictionary_font = C.DEFAULT_FONT_FILE
    dictionary = C.composed_path(str(dictionary_font))
    if dictionary.is_file():
        canonical = json.loads(dictionary.read_text(encoding="utf-8"))
        for char in chars:
            strokes = canonical.get(char, [])
            if strokes and all(
                stroke["points"] and all(0 <= x <= 1 and 0 <= y <= 1 for x, y in stroke["points"])
                for stroke in strokes
            ):
                out[char] = strokes

    for char in chars:
        if char in out:
            continue
        if char not in guide["bounds"]:
            continue
        solo = char in E.JAMO_TEMPLATES
        entries = E.jamo_entries(char, C.jamo_role(char)) if solo else E.syllable_template(char)
        for hook_len in (10, 18, 26, 34, 44):
            E.set_font(font, info["em_top"], hook_len)
            _, segments = E.extract_segments(char)
            try:
                chains = E.assign(entries, segments)
            except E.SearchLimit:
                continue
            if not chains or len(chains) != len(entries):
                continue
            strokes = []
            for index, (entry, chain) in enumerate(zip(entries, chains), 1):
                points = E.resample(E.chain_points(chain), E.N_POINTS)
                pts = [[round(float(x) / E.SIZE, 4), round(float(y) / E.SIZE, 4)] for x, y in points]
                if not pts or not all(0 <= x <= 1 and 0 <= y <= 1 for x, y in pts):
                    break
                strokes.append(dict(order=index, jamo=char if solo else entry["jamo"],
                                    role=C.jamo_role(char) if solo else entry["role"], points=pts))
            if len(strokes) == len(entries):
                out[char] = strokes
                break
        if char not in out:
            print(f"No verified strokes for {char}", flush=True)

    if not out:
        raise ValueError('No glyph strokes could be extracted')
    write_preview(output, guide, out, len(out))
