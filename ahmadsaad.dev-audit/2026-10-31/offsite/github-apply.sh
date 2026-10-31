#!/usr/bin/env bash
# GitHub off-site fixes for ahmadsaad.dev (round 2, 2026-10-31).
#
# Run from Git Bash. Safe to run once and safe to re-run: every repo edit sets
# a value (or adds a topic that may already be there), and the profile README
# is only pushed when it differs from the file next to this script.
#
#   bash github-apply.sh --dry-run   # reads from GitHub, echoes every write, changes nothing
#   bash github-apply.sh             # applies the changes
#
# Needs the gh CLI logged in with the repo scope. Profile fields (bio,
# company, blog, location, Available for hire, pins) need the user scope the
# token does not have; they are printed at the end as manual steps.
set -euo pipefail

OWNER=ahm-adsaad
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
README_FILE="$SCRIPT_DIR/github-profile-README.md"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    *)
      echo "Unknown argument: $arg (only --dry-run is supported)" >&2
      exit 2
      ;;
  esac
done

step() { echo "==> $*"; }

# Writes go through run(): echoed always, executed only without --dry-run.
run() {
  step "$*"
  if [ "$DRY_RUN" = 1 ]; then
    return 0
  fi
  "$@"
}

if [ "$DRY_RUN" = 1 ]; then
  echo "Dry run: nothing will be written to GitHub."
fi

# 1. Auth -------------------------------------------------------------------

step "gh auth status"
if ! gh auth status >/dev/null 2>&1; then
  echo "gh is not logged in. Run: gh auth login (scopes: repo), then re-run this script." >&2
  exit 1
fi

if [ ! -f "$README_FILE" ]; then
  echo "Missing $README_FILE; it must sit next to this script." >&2
  exit 1
fi

# 2. Repo descriptions, homepages and topics --------------------------------

# trend-radar: the homepage had a leading space.
run gh repo edit "$OWNER/trend-radar" \
  --homepage "https://ahmadsaad.dev/projects/trend-radar" \
  --add-topic "typescript,nodejs,postgresql,trend-detection,llm,forward-deployed-engineering"

run gh repo edit "$OWNER/LocalAI" \
  --homepage "https://localai.ahmadsaad.dev"

run gh repo edit "$OWNER/manos-basic-computer-simulator" \
  --add-topic "python,computer-architecture,simulator,education"

run gh repo edit "$OWNER/portfolio" \
  --add-topic "nextjs,react,tailwindcss,cloudflare-workers,portfolio,turborepo"

run gh repo edit "$OWNER/claude-code-toolbar" \
  --homepage "https://ahmadsaad.dev"

run gh repo edit "$OWNER/placement-proof" \
  --homepage "https://ahmadsaad.dev" \
  --add-topic "python,llm,public-relations,verification"

# sdp-sensor-nodes: the description says only what the repo README shows
# (firmware for the custom ATmega4809 energy harvesting LoRaWAN node, sensor
# drivers, bring-up app, host unit tests, PlatformIO). The homepage is the
# board's case study.
run gh repo edit "$OWNER/sdp-sensor-nodes" \
  --description "Firmware for a custom ATmega4809 energy harvesting LoRaWAN sensor node: sensor drivers, a bring-up app and host unit tests, built with PlatformIO." \
  --homepage "https://ahmadsaad.dev/projects/lorawan-sensor-node" \
  --add-topic "lorawan,iot,energy-harvesting,embedded,platformio,atmega4809"
# OWNER: confirm wording. The repo README calls this a senior design project,
# while the site never calls the board coursework. If you want the grant in the
# description, use the group wording below (never "his grant"), then uncomment:
# run gh repo edit "$OWNER/sdp-sensor-nodes" \
#   --description "Firmware for a custom ATmega4809 energy harvesting LoRaWAN sensor node, from an AUS research group whose work was supported by an AUS Undergraduate Research Grant."

# etto-labs: the README describes a marketing site for Etto Labs (AI workflow
# deployment for the GCC mid-market) with a "Before publish" checklist, and the
# site does not mention Etto Labs. Left for the owner.
# OWNER: confirm wording, then uncomment:
# run gh repo edit "$OWNER/etto-labs" \
#   --description "Marketing site for Etto Labs, AI workflow deployment for the GCC mid-market. Next.js and TypeScript."

# 3. Profile README -----------------------------------------------------------

step "gh api repos/$OWNER/$OWNER/contents/README.md (read sha and content)"
SHA="$(gh api "repos/$OWNER/$OWNER/contents/README.md" --jq .sha)"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# Compare and upload with LF line endings, whatever Git did to the local copy.
tr -d '\r' < "$README_FILE" > "$TMP_DIR/new.md"
gh api "repos/$OWNER/$OWNER/contents/README.md" --jq .content \
  | tr -d '\n' | base64 -d | tr -d '\r' > "$TMP_DIR/current.md"

if cmp -s "$TMP_DIR/new.md" "$TMP_DIR/current.md"; then
  echo "README already up to date"
else
  run gh api -X PUT "repos/$OWNER/$OWNER/contents/README.md" \
    -f message="Update profile README: role, full name and AUS" \
    -f content="$(base64 -w0 "$TMP_DIR/new.md")" \
    -f sha="$SHA" \
    --silent
fi

# 4. Manual steps -------------------------------------------------------------

cat <<'EOF'

Done with what the token can change. By hand at https://github.com/settings/profile
(Owner action 9 in ahmadsaad.dev-audit/2026-10-31/PLAN.md, section 12):

  Bio:       AI engineer and forward deployed engineer. Computer Engineering at the American University of Sharjah. Available January 2027.
  Company:   American University of Sharjah
  URL:       https://ahmadsaad.dev   (with https)
  Location:  Sharjah, United Arab Emirates
  Available for hire: on

Then on https://github.com/ahm-adsaad use "Customize your pins" and pin:
  trend-radar, LocalAI, manos-basic-computer-simulator, portfolio

Check afterwards: gh api users/ahm-adsaad --jq '.blog, .company, .location'
EOF
