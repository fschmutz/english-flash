#!/usr/bin/env bash
# Relative links in the repository's markdown outside wiki/ must point at a file.
#
# wiki/ is left out: wiki pages link by page name, which only the wiki resolves.
# Left alone as well:
#   - a link that climbs out of the repository (../../issues/new from the root):
#     a GitHub route, not a file;
#   - a missing target under a gitignored path: in a multi-repository workspace
#     the sub-repositories are ignored by the meta repository, present on the
#     owner's disk and absent in CI, and a link into one is not a broken link;
#   - anything inside a fenced code block or an inline code span: code such as
#     `factories[name](getLayer)` reads like a link and is not one.
# Prints one ::error line per broken link, then exits 1. Exit 0 prints one line.
#
# Usage: scripts/check-md-links.sh   (from anywhere in the repository; reads git ls-files)
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# links FILE: "LINE:TARGET" for each relative link target outside code.
# A fence opens on up to three spaces then ``` or ~~~ (three or more), and closes
# on the same character, at least as long, with nothing after it.
links() {
  awk '
    function fence_of(s) {
      if (match(s, /^ ? ? ?(```+|~~~+)/)) { s = substr(s, RSTART, RLENGTH); sub(/^ +/, "", s); return s }
      return ""
    }
    {
      f = fence_of($0)
      if (open != "") {
        if (f != "" && substr(f, 1, 1) == substr(open, 1, 1) && length(f) >= length(open) &&
            $0 ~ /^ ? ? ?(`+|~+)[[:space:]]*$/) open = ""
        next
      }
      if (f != "") { open = f; next }
      line = $0
      gsub(/`+[^`]*`+/, "", line)
      while (match(line, /\]\([^)#:][^):]*\)/)) {
        print NR ":" substr(line, RSTART + 2, RLENGTH - 3)
        line = substr(line, RSTART + RLENGTH)
      }
    }' "$1"
}

bad=0
checked=0
while IFS= read -r file; do
  while IFS=: read -r line target; do
    target="${target%%#*}"
    [ -n "${target}" ] || continue
    resolved="$(realpath -m --relative-to=. "$(dirname "${file}")/${target}")"
    case "${resolved}" in .. | ../*) continue ;; esac
    checked=$((checked + 1))
    [ -e "${resolved}" ] && continue
    # A directory pattern (sub/) matches a bare sub only with the slash.
    if git check-ignore -q --no-index -- "${resolved}" ||
      git check-ignore -q --no-index -- "${resolved}/"; then
      continue
    fi
    echo "::error file=${file},line=${line}::broken link: ${target}"
    bad=1
  done < <(links "${file}")
done < <(git ls-files -- '*.md' ':!:wiki/**')

if [ "${bad}" -ne 0 ]; then
  exit 1
fi
echo "md-links: ok (${checked} relative link(s) outside wiki/ resolve or sit under a gitignored path)"
