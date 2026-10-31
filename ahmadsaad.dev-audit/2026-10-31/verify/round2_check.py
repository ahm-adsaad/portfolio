"""Round 2 checks for ahmadsaad.dev (stdlib only). Run with `python -I`.

Usage:
  round2_check.py names    <file|url>   title, description, canonical, h1, full-name counts
  round2_check.py persons  <file|url>   every Person node: names, no alumniOf, role, AUS org
  round2_check.py faq      <file|url>   FAQPage questions and whether each is visible verbatim
  round2_check.py crumbs   <file|url>   BreadcrumbList as "Home > X"
  round2_check.py refs     <file|url>   dangling @id references in the JSON-LD
  round2_check.py projects <file|url>   project nodes with dateCreated and dateModified
  round2_check.py links    <file|url>   internal hrefs, external links with rel, element ids
  round2_check.py scan     <path>...    copy rules over files or folders; prints "clean"

A <file|url> is a built HTML file (.next/server/app/about.html) or a URL. URLs
are fetched with X-Forwarded-Proto: https so a local Worker preview behaves
like production. Exit code 1 when a check fails.
"""

import html
import json
import os
import re
import sys
import urllib.request

FULL_NAME = "Ahmad Atef Saad"
MIDDLE_NAME = "Atef"
SITE = "https://ahmadsaad.dev"
AUS_ID = SITE + "/#org-aus"
AUS_SAME_AS = {
    "https://en.wikipedia.org/wiki/American_University_of_Sharjah",
    "https://www.wikidata.org/wiki/Q4115992",
}

SCAN_RULES = [
    ("em dash U+2014", re.compile(chr(0x2014))),
    ("en dash U+2013", re.compile(chr(0x2013))),
    ("banned model library", re.compile(r"lightgbm", re.I)),
    ("scraping word", re.compile(r"\bscrap(e|er|ers|es|ing|ed)\b", re.I)),
    ("CITL name (Center of)", re.compile(r"Center of Innovation", re.I)),
    ("guessed name spelling", re.compile(r"Ahmad A\. Saad")),
    (
        "data-vendor name",
        re.compile(
            r"\b(Apify|Exolyt|Tokinsight|Pentos|EnsembleData|Tikapi|RapidAPI|Bright ?Data|Kalodata|FastMoss)\b",
            re.I,
        ),
    ),
]
SCAN_EXT = {
    ".ts", ".tsx", ".mts", ".mjs", ".js", ".json", ".md", ".txt", ".html",
    ".body", ".meta", ".xml", ".sh", ".rsc", ".css",
}
SCAN_SKIP_DIRS = {"node_modules", ".git", "static", "cache", ".turbo"}


def load(source):
    if re.match(r"^https?://", source):
        req = urllib.request.Request(
            source,
            headers={"X-Forwarded-Proto": "https", "User-Agent": "round2-check"},
        )
        with urllib.request.urlopen(req, timeout=30) as res:
            return res.read().decode("utf-8", "replace")
    with open(source, encoding="utf-8", errors="replace") as fh:
        return fh.read()


def visible_text(page):
    """Body text a reader sees: no scripts, styles, comments, tags or attributes."""
    body = page
    m = re.search(r"<body[^>]*>(.*)</body>", page, re.S | re.I)
    if m:
        body = m.group(1)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    body = re.sub(r"<(script|style|noscript|template)\b.*?</\1>", " ", body, flags=re.S | re.I)
    body = re.sub(r"<[^>]+>", " ", body)
    body = html.unescape(body)
    return re.sub(r"\s+", " ", body).strip()


def norm(text):
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def jsonld_nodes(page):
    """Every object in every JSON-LD block, nested ones included."""
    blocks = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', page, re.S | re.I
    )
    nodes = []

    def walk(value):
        if isinstance(value, dict):
            nodes.append(value)
            for v in value.values():
                walk(v)
        elif isinstance(value, list):
            for v in value:
                walk(v)

    raws = []
    for block in blocks:
        raw = html.unescape(block) if "&quot;" in block else block
        raws.append(raw)
        walk(json.loads(raw))
    return nodes, "\n".join(raws)


def types(node):
    t = node.get("@type")
    return t if isinstance(t, list) else [t]


def as_list(value):
    if value is None:
        return []
    return value if isinstance(value, list) else [value]


def head_value(page, pattern):
    m = re.search(pattern, page, re.S | re.I)
    return norm(m.group(1)) if m else None


def cmd_names(source):
    page = load(source)
    text = visible_text(page)
    title = head_value(page, r"<title[^>]*>(.*?)</title>")
    desc = head_value(page, r'<meta[^>]+name="description"[^>]+content="([^"]*)"')
    canon = head_value(page, r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"')
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", page, re.S | re.I)
    h1_text = norm(re.sub(r"<[^>]+>", " ", h1.group(1))) if h1 else None
    alts = [html.unescape(a) for a in re.findall(r'\balt="([^"]*)"', page)]
    alt_full = [a for a in alts if FULL_NAME in a]
    print(f"title ({len(title or '')}): {title}")
    print(f"description ({len(desc or '')}): {desc}")
    print(f"canonical: {canon}")
    print(f"h1: {h1_text}")
    print(f"visible '{FULL_NAME}': {text.count(FULL_NAME)}")
    print(f"alt with '{FULL_NAME}': {len(alt_full)} {alt_full}")
    print(f"visible '](': {text.count('](')}")
    print(f"'Ahmad A. Saad' anywhere: {page.count('Ahmad A. Saad')}")
    ok = text.count("](") == 0 and "Ahmad A. Saad" not in page and text.count(FULL_NAME) <= 4
    return 0 if ok else 1


def cmd_persons(source):
    page = load(source)
    nodes, raw = jsonld_nodes(page)
    fails = []
    persons = [n for n in nodes if "Person" in types(n) and len(n) > 1]
    if not persons:
        fails.append("no Person node")
    for p in persons:
        alt = as_list(p.get("alternateName"))
        print(f"Person {p.get('@id')} name={p.get('name')!r} alternateName={alt} additionalName={p.get('additionalName')!r}")
        if FULL_NAME not in alt:
            fails.append("alternateName lacks the full name")
        if p.get("additionalName") != MIDDLE_NAME:
            fails.append("additionalName is not the middle name")
        if "alumniOf" in p:
            fails.append("alumniOf present (student until December 2026)")
        if "sameAs" not in p:
            fails.append("sameAs missing")
        if "memberOf" not in p:
            print("  stub (no memberOf)")
            continue
        role = p["memberOf"]
        inner = role.get("memberOf", {}) if isinstance(role, dict) else {}
        print(f"  memberOf: @type={role.get('@type')} roleName={role.get('roleName')!r} org={inner.get('name')!r} url={inner.get('url')!r}")
        if role.get("@type") != "OrganizationRole" or role.get("roleName") != "President":
            fails.append("memberOf is not an OrganizationRole with roleName President")
        if inner.get("name") != "Tau Beta Pi UAE Alpha" or inner.get("url") != "https://www.tbp.org":
            fails.append("chapter name or url wrong")
        aff = p.get("affiliation", {})
        print(f"  affiliation: {aff.get('@id') if isinstance(aff, dict) else aff}")
        if not (isinstance(aff, dict) and aff.get("@id") == AUS_ID):
            fails.append("affiliation is not #org-aus")
        works = [w.get("@id") for w in as_list(p.get("worksFor")) if isinstance(w, dict)]
        print(f"  worksFor: {works}")
        if AUS_ID not in works:
            fails.append("worksFor lacks #org-aus")
        homes = as_list(p.get("homeLocation"))
        print(f"  homeLocation: {len(homes)} {[h.get('name') for h in homes]}")
        if len(homes) != 2:
            fails.append("homeLocation is not two Places")
        occ = p.get("hasOccupation", {})
        occ_loc = occ.get("occupationLocation", {}) if isinstance(occ, dict) else {}
        print(f"  occupationLocation: {occ_loc.get('@type')} {occ_loc.get('name')!r}")
        if occ_loc.get("@type") != "Country":
            fails.append("occupationLocation is not a Country")
        creds = as_list(p.get("hasCredential"))
        cats = [c.get("credentialCategory") for c in creds if isinstance(c, dict)]
        print(f"  hasCredential categories: {cats}")
        if "degree" not in cats:
            fails.append("no degree credential")
        subj = as_list(p.get("subjectOf"))
        if subj:
            s = subj[0]
            about = s.get("about", {})
            pub = s.get("publisher", {})
            print(f"  subjectOf[0]: about={about.get('@id') if isinstance(about, dict) else about} image={s.get('image')} publisher={pub.get('@id') if isinstance(pub, dict) else pub}")
            if not (isinstance(about, dict) and about.get("@id") == p.get("@id")):
                fails.append("subjectOf.about is not the Person")
            if s.get("image") != "https://www.aus.edu/sites/default/files/news/tbp_1_1.jpg":
                fails.append("subjectOf.image wrong")
            if not (isinstance(pub, dict) and pub.get("@id") == AUS_ID):
                fails.append("subjectOf.publisher is not #org-aus")
        else:
            fails.append("no subjectOf")
        aus = [n for n in nodes if n.get("@id") == AUS_ID and len(n) > 1]
        if aus:
            a = aus[0]
            same = set(as_list(a.get("sameAs")))
            print(f"  #org-aus: alternateName={a.get('alternateName')!r} sameAs={sorted(same)}")
            if a.get("alternateName") != "AUS" or not AUS_SAME_AS <= same:
                fails.append("#org-aus lacks alternateName AUS or the two sameAs")
        else:
            fails.append("#org-aus node not defined on this page")
    if "Ahmad A. Saad" in raw:
        fails.append("'Ahmad A. Saad' in JSON-LD")
    for f in dict.fromkeys(fails):
        print("FAIL:", f)
    print("persons: ok" if not fails else "persons: FAIL")
    return 1 if fails else 0


def cmd_faq(source):
    page = load(source)
    nodes, _ = jsonld_nodes(page)
    text = visible_text(page)
    faqs = [n for n in nodes if "FAQPage" in types(n)]
    print(f"FAQPage nodes: {len(faqs)}")
    fails = 0
    for faq in faqs:
        questions = as_list(faq.get("mainEntity"))
        print(f"  {faq.get('@id')}: {len(questions)} questions")
        for q in questions:
            name = norm(q.get("name", ""))
            answer = norm((q.get("acceptedAnswer") or {}).get("text", ""))
            q_ok = name in text
            a_ok = answer in text
            fails += (not q_ok) + (not a_ok)
            print(f"  [{'ok' if q_ok else 'MISSING'}] Q: {name}")
            print(f"  [{'ok' if a_ok else 'MISSING'}] A: {answer[:80]}...")
    return 1 if fails else 0


def cmd_crumbs(source):
    nodes, _ = jsonld_nodes(load(source))
    lists = [n for n in nodes if "BreadcrumbList" in types(n)]
    if not lists:
        print("BreadcrumbList: none")
    for bl in lists:
        items = sorted(as_list(bl.get("itemListElement")), key=lambda i: i.get("position", 0))
        print("BreadcrumbList: " + " > ".join(str(i.get("name")) for i in items))
        for i in items:
            print(f"  {i.get('position')}. {i.get('name')} {i.get('item')}")
    return 0


def cmd_refs(source):
    nodes, _ = jsonld_nodes(load(source))
    defined = {n["@id"] for n in nodes if "@id" in n and len(n) > 1}
    referenced = {n["@id"] for n in nodes if set(n.keys()) == {"@id"}}
    dangling = sorted(referenced - defined)
    print(f"defined: {len(defined)} referenced: {len(referenced)}")
    print("dangling: " + (", ".join(dangling) if dangling else "none"))
    return 1 if dangling else 0


def cmd_projects(source):
    nodes, _ = jsonld_nodes(load(source))
    found = [
        n for n in nodes
        if ({"SoftwareSourceCode", "CreativeWork", "SoftwareApplication"} & set(types(n)))
        and len(n) > 1
    ]
    for n in found:
        print(f"{n.get('@id')}: dateCreated={n.get('dateCreated')} dateModified={n.get('dateModified')}")
    if not found:
        print("no project nodes")
    return 0


def cmd_links(source):
    page = load(source)
    internal, external = [], []
    for m in re.finditer(r"<a\b([^>]*)>", page, re.I):
        attrs = m.group(1)
        href = re.search(r'href="([^"]*)"', attrs)
        if not href:
            continue
        url = html.unescape(href.group(1))
        rel = re.search(r'rel="([^"]*)"', attrs)
        if url.startswith("/") or url.startswith("#") or url.startswith(SITE):
            internal.append(url)
        elif url.startswith("http"):
            external.append(f"{url}  rel={rel.group(1) if rel else '-'}")
    ids = re.findall(r'<(?:section|div|h2|h3)\b[^>]*\bid="([^"]+)"', page)
    print("internal:")
    for u in dict.fromkeys(internal):
        print(f"  {u}  x{internal.count(u)}")
    print("external:")
    for u in dict.fromkeys(external):
        print(f"  {u}")
    print("ids: " + ", ".join(dict.fromkeys(ids)))
    return 0


def iter_files(paths):
    for path in paths:
        if os.path.isfile(path):
            yield path
            continue
        for root, dirs, files in os.walk(path):
            dirs[:] = [d for d in dirs if d not in SCAN_SKIP_DIRS]
            # Compiled bundles under .next carry library tables (the markdown
            # entity map has the dash characters); the .html, .rsc and .body
            # outputs next to them hold every string the site emits.
            in_build = ".next" in re.split(r"[\\/]", root)
            for name in files:
                ext = os.path.splitext(name)[1].lower()
                if in_build and ext == ".js":
                    continue
                if ext in SCAN_EXT or name == "_headers":
                    yield os.path.join(root, name)


def cmd_scan(*paths):
    if not paths:
        print("scan needs at least one file or folder")
        return 2
    hits = 0
    for path in iter_files(paths):
        try:
            with open(path, encoding="utf-8", errors="replace") as fh:
                for lineno, line in enumerate(fh, 1):
                    for label, rule in SCAN_RULES:
                        if rule.search(line):
                            hits += 1
                            snippet = line.strip()[:120]
                            print(f"{path}:{lineno}: {label}: {snippet}")
        except OSError as err:
            print(f"{path}: {err}")
    print("clean" if hits == 0 else f"{hits} hits")
    return 1 if hits else 0


COMMANDS = {
    "names": cmd_names,
    "persons": cmd_persons,
    "faq": cmd_faq,
    "crumbs": cmd_crumbs,
    "refs": cmd_refs,
    "projects": cmd_projects,
    "links": cmd_links,
    "scan": cmd_scan,
}


def main(argv):
    if len(argv) < 2 or argv[1] not in COMMANDS:
        print(__doc__)
        return 2
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    return COMMANDS[argv[1]](*argv[2:])


if __name__ == "__main__":
    sys.exit(main(sys.argv))
