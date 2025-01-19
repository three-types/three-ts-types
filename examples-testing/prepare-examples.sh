pnpm run create-examples
git add -A
git commit -m "Add examples"
git apply changes.patch --3way
