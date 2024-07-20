# Update patch

-   `pnpm run create-examples`
-   Commit changes
-   `git apply changes.patch`
-   Make changes
-   `pnpm run type-check`
-   `git diff > ../changes.patch`
-   Reset changes
-   Move patch file

# Update sources

-   `pnpm run create-examples`
-   Commit changes
-   `git apply --reject changes.patch`
-   Fix conflicts
-   `pnpm run type-check`
-   `git diff > ../changes.patch`
-   Reset example changes
-   Move patch file
-   Commit changes
