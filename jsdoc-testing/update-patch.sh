git diff > ../changes.patch
mv ../changes.patch .
rm -rf jsdoc
git add -A
git commit -m "Update patch and delete jsdoc"
