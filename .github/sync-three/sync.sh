#!/usr/bin/env bash
# Ports three.js dev commits one at a time. Each commit that touches typed paths gets a fresh
# Claude Code session; if that produces changes, they go up as their own PR, which is squash-merged
# once CI passes before the next commit is started.
#
# Required env: GH_TOKEN (PAT of a repo admin), CLAUDE_CODE_OAUTH_TOKEN.
# Optional env: MODEL, MAX_COMMITS, TIME_BUDGET_MINUTES.
set -euo pipefail

REPO=three-types/three-ts-types
MODEL=${MODEL:-claude-opus-5-5}
MAX_COMMITS=${MAX_COMMITS:-50}
DEADLINE=$(($(date +%s) + ${TIME_BUDGET_MINUTES:-300} * 60))
FAILED_LABEL=three-sync-failed
LAST_TRIAGED_VAR=THREE_SYNC_LAST_TRIAGED
HERE=$(cd "$(dirname "$0")" && pwd)
LOGS=${RUNNER_TEMP:-$(mktemp -d)}

cd "$(git rev-parse --show-toplevel)"

log() { echo "::notice::$*"; }

push() {
    local auth
    auth=$(printf 'x-access-token:%s' "$GH_TOKEN" | base64 | tr -d '\n')
    git -c http.https://github.com/.extraheader="AUTHORIZATION: basic $auth" push "$@"
}

mark_triaged() {
    gh variable set "$LAST_TRIAGED_VAR" -R "$REPO" --body "$1"
}

# Only these three.js paths can affect the declarations or the testing harnesses.
is_relevant() {
    git -C three.js diff-tree --no-commit-id --name-only -r "$1" \
        | grep -E '^(src/|examples/jsm/|examples/[^/]+\.html$|examples/files\.json$)' >/dev/null
}

# Reuses the branch's open PR if an earlier run already opened one. Extra args go to gh pr create.
open_pr() {
    local branch=$1 subject=$2 sha=$3 url
    shift 3
    url=$(gh pr list -R "$REPO" --head "$branch" --state open --json url --jq '.[0].url')
    if [ -z "$url" ]; then
        url=$(gh pr create -R "$REPO" --base master --head "$branch" --title "$subject" \
            --body "https://github.com/mrdoob/three.js/commit/$sha" "$@")
    fi
    echo "$url"
}

fail_pr() {
    local branch=$1 subject=$2 sha=$3 reason=$4 result_file=$5 url
    push -f origin "$branch"
    url=$(open_pr "$branch" "$subject" "$sha" --draft)
    gh label create "$FAILED_LABEL" -R "$REPO" --color d93f0b --force >/dev/null
    gh pr edit "$url" -R "$REPO" --add-label "$FAILED_LABEL"
    {
        echo "Automated sync stopped: $reason"
        echo
        echo "Fix this PR and merge it (or close it and advance the submodule by hand), then the next scheduled run continues from master."
        if [ -s "$result_file" ]; then
            echo
            echo '<details><summary>Claude session summary</summary>'
            echo
            jq -r '.result // empty' "$result_file"
            echo
            echo '</details>'
        fi
    } | gh pr comment "$url" -R "$REPO" --body-file -
    echo "::error::$reason ($url)"
    exit 1
}

# Don't pile new work on top of a PR that needs a human.
if [ -n "$(gh pr list -R "$REPO" --label "$FAILED_LABEL" --state open --json number --jq '.[].number')" ]; then
    log "An open $FAILED_LABEL PR needs attention, skipping this run."
    exit 0
fi

git -C three.js fetch -q origin dev
processed=0

while :; do
    git fetch -q origin master
    git checkout -q -B master origin/master
    git submodule update -q --init

    base=$(git rev-parse HEAD:three.js)
    start=$base
    last=$(gh variable get "$LAST_TRIAGED_VAR" -R "$REPO" 2>/dev/null || true)
    if [ -n "$last" ] && git -C three.js merge-base --is-ancestor "$base" "$last" 2>/dev/null; then
        start=$last
    fi

    # sed reads all input, unlike head, so rev-list isn't killed by SIGPIPE under pipefail.
    sha=$(git -C three.js rev-list --reverse --first-parent "$start..origin/dev" | sed -n 1p)
    if [ -z "$sha" ]; then
        log "Up to date with three.js dev."
        break
    fi
    if (($(date +%s) >= DEADLINE)); then
        log "Time budget reached, stopping before ${sha:0:10}."
        break
    fi

    short=${sha:0:10}
    subject=$(git -C three.js log -1 --format=%s "$sha")

    if ! is_relevant "$sha"; then
        log "Skipping $short (no typed paths): $subject"
        mark_triaged "$sha"
        continue
    fi

    # Path skips are free, so only Claude sessions count toward MAX_COMMITS.
    if ((processed >= MAX_COMMITS)); then
        log "Session budget reached, stopping before $short."
        break
    fi
    processed=$((processed + 1))

    log "Porting $short: $subject"
    branch="three-sync/$short"
    git checkout -q -B "$branch" origin/master
    sh update-three.sh "$sha" >/dev/null

    prompt=$(sed -e "s/{{BASE}}/$base/g" -e "s/{{TARGET}}/$sha/g" "$HERE/prompt.md")
    result_file="$LOGS/claude-$short.json"
    status=0
    # GH_TOKEN is withheld so the session can't push or touch PRs; the driver does that.
    env -u GH_TOKEN timeout 120m claude -p "$prompt" \
        --model "$MODEL" \
        --dangerously-skip-permissions \
        --output-format json >"$result_file" || status=$?

    jq -r '"turns=\(.num_turns) cost=$\(.total_cost_usd) error=\(.is_error)"' "$result_file" 2>/dev/null || true
    jq -r '.result // empty' "$result_file" 2>/dev/null || true
    result_line=$(jq -r '.result // empty' "$result_file" 2>/dev/null | grep -E '^RESULT: ' | tail -n 1 || true)

    if [ "$status" -ne 0 ] || [ -z "$result_line" ]; then
        # e.g. "You've hit your session limit" or "You've hit your Opus limit".
        if grep -qiE "usage limit|rate limit|hit your [a-z ]*limit" "$result_file" 2>/dev/null; then
            log "Claude usage limit reached at $short, the next run will retry."
            exit 0
        fi
        git add -A && git commit -qm "WIP: unfinished automated sync" || true
        fail_pr "$branch" "$subject" "$sha" "the Claude session exited with status $status and no result" "$result_file"
    fi

    if [ -n "$(git status --porcelain)" ]; then
        git add -A && git commit -qm "WIP: uncommitted changes left by automated sync"
        fail_pr "$branch" "$subject" "$sha" "the session left uncommitted changes" "$result_file"
    fi
    if [[ $result_line == "RESULT: BLOCKED"* ]]; then
        fail_pr "$branch" "$subject" "$sha" "${result_line#RESULT: }" "$result_file"
    fi
    if [ "$(git rev-parse HEAD:three.js)" != "$sha" ]; then
        fail_pr "$branch" "$subject" "$sha" "the submodule no longer points at $short" "$result_file"
    fi
    if git diff --name-only origin/master HEAD | grep '^\.github/' >/dev/null; then
        fail_pr "$branch" "$subject" "$sha" "the session modified .github/" "$result_file"
    fi

    if git diff --quiet origin/master HEAD -- . ':(exclude)three.js'; then
        log "No type changes needed for $short."
        mark_triaged "$sha"
        continue
    fi

    push -f origin "$branch"
    url=$(open_pr "$branch" "$subject" "$sha")
    log "Opened $url"

    # Checks take a moment to register after the PR is opened.
    for _ in $(seq 40); do
        [ "$(gh pr checks "$url" -R "$REPO" --json name --jq length 2>/dev/null || echo 0)" -gt 0 ] && break
        sleep 15
    done
    if ! gh pr checks "$url" -R "$REPO" --watch --fail-fast --interval 30; then
        fail_pr "$branch" "$subject" "$sha" "CI failed" "$result_file"
    fi

    # master requires a code owner review, which the admin token bypasses. The GitHub API
    # occasionally fails transiently here, so retry before handing the PR to a human.
    merged=false
    for attempt in 1 2 3; do
        if gh pr merge "$url" -R "$REPO" --squash --admin --delete-branch; then
            merged=true
            break
        fi
        [ "$(gh pr view "$url" -R "$REPO" --json state --jq .state 2>/dev/null)" = MERGED ] && merged=true && break
        sleep $((attempt * 30))
    done
    if ! $merged; then
        fail_pr "$branch" "$subject" "$sha" "merging failed" "$result_file"
    fi
    mark_triaged "$sha"
    log "Merged $url"
done
