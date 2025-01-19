pnpm run format
git diff > ../changes.patch
mv ../changes.patch .
rm -rf examples
git add -A
git commit -m "Update patch and delete examples"
