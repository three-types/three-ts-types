pnpm run create-src
git apply changes.patch
pnpm run build-declarations
pnpm run format-dprint
pnpm run copy-declarations
rm -rf src
git add -A
git commit -m "Update declarations"
