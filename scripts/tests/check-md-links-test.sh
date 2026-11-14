#!/usr/bin/env bash
#
# check-md-links-test.sh — the cases scripts/check-md-links.sh has to catch,
# and the ones it has to leave alone.
#
# Plain bash, like check-doc-surface-test.sh. Each case builds a throwaway git
# repository holding a copy of the script and a few files, runs the script
# there, and asserts the exit status. The cases that matter are the two a
# multi-repository workspace hits: a link into a gitignored sub-repository
# absent in CI, and link-shaped code inside a fence.
#
#   scripts/tests/check-md-links-test.sh
#
# Exit 0 when every case holds, 1 otherwise.
#
set -uo pipefail

cd "$(dirname "$0")/../.." || exit 1

readonly SCRIPT="scripts/check-md-links.sh"

passed=0
failed=0
scratch="$(mktemp -d)"
trap 'rm -rf -- "${scratch}"' EXIT

# run_case NAME WANT_STATUS PATH CONTENT [PATH CONTENT]...
run_case() {
  local name="$1" want="$2" repo out status
  shift 2
  repo="${scratch}/${passed}-${failed}"
  mkdir -p "${repo}/scripts"
  cp "${SCRIPT}" "${repo}/scripts/"
  while [ $# -ge 2 ]; do
    mkdir -p "${repo}/$(dirname "$1")"
    printf '%s\n' "$2" >"${repo}/$1"
    shift 2
  done
  git -C "${repo}" init -q
  git -C "${repo}" add -A
  out="$(cd "${repo}" && ./scripts/check-md-links.sh 2>&1)"
  status=$?
  if [ "${status}" -eq "${want}" ]; then
    printf 'ok   %s\n' "${name}"
    passed=$((passed + 1))
  else
    printf 'FAIL %s (want exit %s, got %s)\n' "${name}" "${want}" "${status}"
    printf '     | %s\n' "${out}"
    failed=$((failed + 1))
  fi
}

run_case "a link to a tracked file passes" 0 \
  README.md 'See [guide](GUIDE.md#setup).' GUIDE.md '# Guide'
run_case "a broken link fails" 1 \
  README.md 'See [guide](GUIDE.md).'
run_case "an anchor-only link passes" 0 \
  README.md 'See [below](#below).'
run_case "a link climbing out of the repository passes" 0 \
  README.md 'Open [an issue](../../issues/new).'
run_case "a wiki page is not checked" 0 \
  wiki/Home.md 'See [missing](Missing.md).'

# --- gitignored targets (sub-repositories of a workspace, absent in CI) --------

run_case "a link into a gitignored directory passes" 0 \
  .gitignore 'sub-repo/' README.md 'See [api](sub-repo/docs/API.md).'
run_case "a link to the gitignored directory itself passes" 0 \
  .gitignore 'sub-repo/' README.md 'See [the repo](./sub-repo).'
run_case "a link to a gitignored file passes" 0 \
  .gitignore 'local-notes.md' README.md 'See [notes](local-notes.md).'
run_case "a broken link beside an ignored one still fails" 1 \
  .gitignore 'sub-repo/' README.md 'See [api](sub-repo/API.md) and [gone](GONE.md).'
run_case "a link into a directory only named like the ignored one fails" 1 \
  .gitignore '/sub-repo/' docs-src/README.md 'See [api](sub-repo/API.md).'

# --- code is not a link ---------------------------------------------------------

run_case "link-shaped code in a backtick fence passes" 0 \
  README.md $'```js\nconst x = factories[name](getLayer, opts);\n```'
run_case "link-shaped code in a tilde fence passes" 0 \
  README.md $'~~~\nfactories[name](getLayer)\n~~~'
run_case "an indented fence inside a list item passes" 0 \
  README.md $'- step\n   ```\n   a[i](b)\n   ```'
run_case "a backtick line inside a tilde fence does not close it" 0 \
  README.md $'~~~\n```\na[i](b)\n~~~'
run_case "a broken link after the fence closes still fails" 1 \
  README.md $'```\na[i](b)\n```\nSee [gone](GONE.md).'
run_case "an unclosed fence runs to the end of the file" 0 \
  README.md $'```\na[i](b)'
run_case "link-shaped code in an inline span passes" 0 \
  README.md 'Call `factories[name](getLayer)` once.'
run_case "a broken link beside an inline span still fails" 1 \
  README.md 'Call `f[a](b)` then read [gone](GONE.md).'

printf 'check-md-links-test: %s passed, %s failed\n' "${passed}" "${failed}"
[ "${failed}" -eq 0 ]
