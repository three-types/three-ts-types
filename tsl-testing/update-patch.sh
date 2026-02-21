pnpm run format
git diff > ../changes.patch
mv ../changes.patch .
rm -rf tsl-comments
git add -A
git commit -m "Update patch and delete TSL test file"
