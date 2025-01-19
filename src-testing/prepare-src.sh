pnpm run create-src
git add -A
git commit -m "Add src"
git apply changes.patch --3way
