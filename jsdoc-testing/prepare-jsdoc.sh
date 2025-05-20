pnpm run build-declarations
git add -A
git commit -m "Add jsdoc"
git apply changes.patch --3way
