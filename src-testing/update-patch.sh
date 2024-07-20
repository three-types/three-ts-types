pnpm run format
git diff > ../changes.patch
mv ../changes.patch .
rm -rf src
git add -A
git commit -m "Update patch and delete src"
