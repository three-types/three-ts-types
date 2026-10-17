#!/usr/bin/env bash
# Runs the same checks as CI.yml (except the DefinitelyTyped test run) against the committed state,
# then removes the generated files again. Run from the repository root with a clean working tree.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --porcelain)" ]; then
    echo "verify.sh: commit your changes first, the working tree must be clean." >&2
    exit 1
fi

cleanup() {
    git checkout -q -- .
    git clean -fdq -- jsdoc-testing examples-testing tsl-testing
    git submodule update -q
}
trap cleanup EXIT

echo "== format-check"
pnpm run format-check

echo "== type-check"
pnpm run type-check

echo "== jsdoc"
(
    cd jsdoc-testing
    pnpm run build-declarations || true
    git apply changes.patch
    pnpm run format-dprint
    pnpm run check-declarations
)

echo "== examples"
(
    cd examples-testing
    pnpm run create-examples
    git apply changes.patch
    pnpm run type-check
    pnpm run format-check
)

echo "== tsl"
(
    cd tsl-testing
    pnpm run type-check
    pnpm generate-tsl-test
    git apply changes.patch --allow-empty
    pnpm run format-check
    pnpm run test --run
)

echo "verify.sh: all checks passed"
