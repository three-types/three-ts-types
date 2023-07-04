# Update patch

-   `npm run create-examples`
-   Commit changes
-   `git apply changes.patch`
-   Make changes
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset changes
-   Move patch file

# Update sources

-   `npm run create-examples`
-   Commit changes
-   `git apply --reject changes.patch`
-   Fix conflicts
-   `yarn run type-check`
-   `git diff > ../changes.patch`
-   Reset example changes
-   Move patch file
-   Commit changes
