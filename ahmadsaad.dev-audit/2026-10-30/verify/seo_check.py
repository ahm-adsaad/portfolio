"""Stdlib-only checks for the 2026-10-30 ahmadsaad.dev plan.

Usage (run from apps/website):
  python -I ../../ahmadsaad.dev-audit/2026-10-30/verify/seo_check.py CMD TARGET [ARG]

TARGET is a URL (http/https) or a prerendered file such as
.next/server/app/index.html or .next/server/app/llms.txt.body.

Commands:
  page TARGET          title, description (with lengths), canonical, h1, og:image
  text TARGET NEEDLE   count NEEDLE in visible body text (tags removed without
                       adding spaces, the way textContent extractors read it)
  jsonld TARGET        node types, dangling @id refs, ImageObject dims, Person
                       and page-date summary; exit 1 on dangling refs or
                       string dimensions
  headers TARGET       response headers (files: the sibling .meta)
  same FILE_A FILE_B   MATCH, or the first differing line (exit 1)
  copy TARGET...       scan for U+2014, U+2013, LightGBM, scraping words
"""
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request

UA = "Mozilla/5.0 (compatible; seo-check/1.0)"
PAGE_TYPES = ("ProfilePage", "AboutPage", "CollectionPage", "WebPage")


def load(target):
    """Return (status, headers, text)."""
    if target.startswith(("http://", "https://")):
        req = urllib.request.Request(target, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = resp.read().decode("utf-8", "replace")
                return resp.status, {k.lower(): v for k, v in resp.headers.items()}, body
        except urllib.error.HTTPError as err:
            body = err.read().decode("utf-8", "replace")
            return err.code, {k.lower(): v for k, v in err.headers.items()}, body
    with open(target, encoding="utf-8", errors="replace") as fh:
        body = fh.read()
    status, headers = None, {}
    meta = re.sub(r"\.(html|body)$", ".meta", target)
    if meta != target and os.path.exists(meta):
        with open(meta, encoding="utf-8") as fh:
            data = json.load(fh)
        status = data.get("status", 200)
        headers = {k.lower(): v for k, v in (data.get("headers") or {}).items()}
    return status, headers, body


def visible_text(doc):
    m = re.search(r"<body[^>]*>(.*)</body>", doc, re.S | re.I)
    part = m.group(1) if m else doc
    part = re.sub(r"<(script|style)\b.*?</\1>", "", part, flags=re.S | re.I)
    part = re.sub(r"<!--.*?-->", "", part, flags=re.S)
    part = re.sub(r"<[^>]+>", "", part)
    part = html.unescape(part)
    return re.sub(r"\s+", " ", part).strip()


def attrs(tag):
    return {k.lower(): html.unescape(v) for k, v in re.findall(r'([\w:-]+)="([^"]*)"', tag)}


def cmd_page(target):
    status, _, doc = load(target)
    title = re.search(r"<title[^>]*>(.*?)</title>", doc, re.S | re.I)
    title = html.unescape(title.group(1)).strip() if title else None
    desc = canonical = og = None
    for tag in re.findall(r"<meta\b[^>]*>", doc, re.I):
        a = attrs(tag)
        if a.get("name") == "description":
            desc = a.get("content")
        if a.get("property") == "og:image" and og is None:
            og = a.get("content")
    for tag in re.findall(r"<link\b[^>]*>", doc, re.I):
        a = attrs(tag)
        if a.get("rel") == "canonical":
            canonical = a.get("href")
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", doc, re.S | re.I)
    h1 = visible_text(h1.group(1)) if h1 else None
    print(f"status: {status}")
    print(f"title ({len(title) if title else 0}): {title}")
    print(f"description ({len(desc) if desc else 0}): {desc}")
    print(f"canonical: {canonical}")
    print(f"h1: {h1}")
    print(f"og:image: {og}")


def walk(node, defined, refs, images):
    if isinstance(node, dict):
        keys = set(node) - {"@context"}
        if "@id" in node:
            if keys == {"@id"}:
                refs.add(node["@id"])
            else:
                defined.add(node["@id"])
        if node.get("@type") == "ImageObject":
            images.append(node)
        for value in node.values():
            walk(value, defined, refs, images)
    elif isinstance(node, list):
        for value in node:
            walk(value, defined, refs, images)


def cmd_jsonld(target):
    _, _, doc = load(target)
    blocks = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', doc, re.S | re.I
    )
    if not blocks:
        print("no JSON-LD found")
        return 1
    graphs = [json.loads(b) for b in blocks]
    nodes = []
    for g in graphs:
        nodes.extend(g.get("@graph", [g]) if isinstance(g, dict) else g)
    defined, refs, images = set(), set(), []
    walk(graphs, defined, refs, images)
    dangling = sorted(refs - defined)
    bad_dims = [i for i in images if isinstance(i.get("width"), str) or isinstance(i.get("height"), str)]
    print("types: " + ", ".join(str(n.get("@type")) for n in nodes))
    print("dangling: " + (", ".join(dangling) if dangling else "none"))
    print("image_dims: " + ("strings" if bad_dims else "ok"))
    for n in nodes:
        if n.get("@type") == "Person" and len(n) > 5:
            same_as = n.get("sameAs") or []
            langs = n.get("knowsLanguage") or []
            member = n.get("memberOf") or {}
            subject = n.get("subjectOf") or []
            subject = subject if isinstance(subject, list) else [subject]
            print(f"person.alternateName: {n.get('alternateName')}")
            print(f"person.sameAs: {len(same_as)} {same_as}")
            print("person.knowsLanguage: " + ", ".join(l.get("name", "") if isinstance(l, dict) else str(l) for l in langs))
            print(f"person.memberOf: {member.get('name') if isinstance(member, dict) else member}")
            print("person.subjectOf: " + ", ".join(s.get("url", "") for s in subject if isinstance(s, dict)))
            print(f"person.description: {n.get('description')}")
        if n.get("@type") in PAGE_TYPES:
            parts = [n["@type"]]
            if n.get("dateCreated"):
                parts.append(f"created={n['dateCreated']}")
            if n.get("dateModified"):
                parts.append(f"modified={n['dateModified']}")
            print(" ".join(parts))
    return 1 if dangling or bad_dims else 0


def cmd_text(target, needle):
    _, _, doc = load(target)
    text = visible_text(doc) if "<html" in doc[:2000].lower() or "<body" in doc.lower() else doc
    print(text.count(needle))


def cmd_headers(target):
    status, headers, _ = load(target)
    print(f"status: {status}")
    for key, value in sorted(headers.items()):
        print(f"{key}: {value}")


def norm(text):
    lines = [l.rstrip() for l in text.replace("\r\n", "\n").split("\n")]
    while lines and not lines[-1]:
        lines.pop()
    return lines


def cmd_same(a, b):
    got, exp = norm(load(a)[2]), norm(load(b)[2])
    for i in range(max(len(got), len(exp))):
        g = got[i] if i < len(got) else "<missing>"
        e = exp[i] if i < len(exp) else "<missing>"
        if g != e:
            print(f"DIFF at line {i + 1}:\n  got: {g}\n  exp: {e}")
            return 1
    print("MATCH")
    return 0


BANNED = [
    ("U+2014 em dash", re.compile("—")),
    ("U+2013 en dash", re.compile("–")),
    ("LightGBM", re.compile(r"lightgbm", re.I)),
    ("scraping word", re.compile(r"\bscrap(e|ed|er|ers|es|ing)\b", re.I)),
]


def cmd_copy(targets):
    hits = 0
    for target in targets:
        _, _, doc = load(target)
        for n, line in enumerate(doc.splitlines(), 1):
            for label, rx in BANNED:
                m = rx.search(line)
                if m:
                    hits += 1
                    s = max(0, m.start() - 50)
                    print(f"{target}:{n}: {label}: ...{line[s:m.end() + 50]}...")
    if not hits:
        print("clean")
    return 1 if hits else 0


def main(argv):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    if len(argv) < 3:
        print(__doc__)
        return 2
    cmd, args = argv[1], argv[2:]
    if cmd == "page":
        cmd_page(args[0])
        return 0
    if cmd == "jsonld":
        return cmd_jsonld(args[0])
    if cmd == "text":
        cmd_text(args[0], args[1])
        return 0
    if cmd == "headers":
        cmd_headers(args[0])
        return 0
    if cmd == "same":
        return cmd_same(args[0], args[1])
    if cmd == "copy":
        return cmd_copy(args)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv))
