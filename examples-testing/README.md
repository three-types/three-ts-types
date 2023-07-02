# Update patch

-   `git apply --directory=examples-testing changes.patch`
-   Make changes
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset changes
-   Copy patch file

# Update sources

-   Delete all examples
-   `node index.js`
-   Commit changes
-   `git apply --directory=examples-testing --reject changes.patch`
-   Fix conflicts
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset changes
-   Copy patch file
-   Commit changes
