pnpm run build-declarations
git apply changes.patch
pnpm run format-dprint
pnpm run copy-declarations
rm -rf jsdoc
git add -A
git commit -m "Update declarations"
