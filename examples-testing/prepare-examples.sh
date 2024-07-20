cd ../three.js
git fetch
git checkout $1
cd ..
git add -A
git commit -m "Update three.js"
cd examples-testing
pnpm run create-examples
git add -A
git commit -m "Add examples"
git apply changes.patch --reject
