# Update patch

-   `git apply changes.patch`
-   Make changes
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset changes
-   Move patch file

# Update sources

-   Delete all examples
-   `node index.js`
-   Commit changes
-   `git apply --reject changes.patch`
-   Fix conflicts
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset example changes
-   Move patch file
-   Commit changes
