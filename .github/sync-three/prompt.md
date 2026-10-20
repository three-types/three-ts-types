You are updating the `@types/three` declarations in this repository (three-ts-types) for a single three.js commit. You are running unattended in CI: there is no human to answer questions, so make the best decision you can, and if you truly cannot finish, stop and report BLOCKED.

## Repository layout

- `three.js/` is a git submodule of mrdoob/three.js (`dev` branch). `types/three/` holds the declarations.
- `jsdoc-testing/` generates declarations from three.js JSDoc for the files listed in `jsdoc-testing/declarations.js`. `changes.patch` holds the manual fixes on top of the generated output. Files in that list must never be edited directly in `types/three/`; fix them through the patch instead, because CI checks that the generated output plus the patch matches `types/three/` exactly.
- `examples-testing/` converts three.js examples to TypeScript and type-checks them against `types/three/`. `changes.patch` holds the manual fixes to the converted examples.
- `tsl-testing/` tests TSL types against `src/nodes/tsl/TSLCore.js`.
- Every other `.d.ts` file is hand-written.

## Your task

The driver has already created the commit "Update three.js", which moves the submodule from `{{BASE}}` to `{{TARGET}}`. The commits between them, other than `{{TARGET}}`, were judged to need no type changes, but the harnesses see the whole range. Start by reading:

- `git -C three.js log -1 {{TARGET}}`
- `git -C three.js diff {{BASE}} {{TARGET}} -- src examples/jsm examples/files.json 'examples/*.html'`

Next, from the repository root, run `bash .github/sync-three/verify.sh`. If it passes and the range has no public API change and no module layout change (see step 2), nothing needs regenerating: finish with `RESULT: NO_CHANGES` without running the steps below.

Otherwise, follow the existing workflow. The scripts commit for you; run each from its own directory:

1. `cd jsdoc-testing && sh prepare-jsdoc.sh` commits the freshly generated `jsdoc/` folder ("Add jsdoc") and applies `changes.patch` with `--3way`. Resolve any conflicts in `jsdoc/`, and fix the generated declarations for anything JSDoc can't express correctly, in the same style as the existing patch. Remove members tagged `@private` (generated as `private _foo;`) together with their JSDoc comments, as the existing patch does; private members do not belong in the declarations. Then run `sh update-patch.sh` ("Update patch and delete jsdoc") and `sh update-declarations.sh` ("Update declarations").
2. Update the hand-written declarations in `types/three/` for any API change in the range: added, removed or renamed classes, members, parameters, constructor options, exports, TSL functions and so on. Match the style of neighboring declarations. Ignore purely internal changes (private fields, implementation details, renderer internals that aren't exposed), but not module layout changes, described below.
   - A new JSDoc'd file in `src/` or `examples/jsm/` goes into the sorted list in `jsdoc-testing/declarations.js` (then repeat step 1). If three.js exports it from `examples/jsm/Addons.js`, `src/Three.*.js` or similar, add the matching export to the `.d.ts` counterpart.
   - Keep the declaration layout mirroring the source layout, even when the public API is unchanged. When three.js adds, removes, renames or splits a module (for example extracting helpers into a new file), add, remove or rename the matching `.d.ts` so each declaration file still corresponds to its source file and declares what that file exports. When a module changes how it imports or re-exports (for example replacing a list of re-exports with `export * from`, or importing `TSL` from a different module), make its `.d.ts` counterpart do the same. Restructurings like these are not "internal changes" to ignore.
   - Reuse the shared types that already exist in the declarations instead of writing out unions inline. For example, use `TypedArray` (or `TypedArrayConstructor`) from `src/core/BufferAttribute.d.ts` for a parameter documented as `{TypedArray}`, rather than listing `Float32Array | Uint8Array | ...`. Before declaring a union or object type, search `types/three/` for an existing alias that matches.
   - Commit these edits separately with short descriptive messages, for example "Add Sculptor to Addons declaration".
3. `cd examples-testing && sh prepare-examples.sh` commits the converted examples ("Add examples") and applies `changes.patch` with `--3way`. Resolve conflicts and make `pnpm run type-check` pass. Fix type errors in the declarations when the declarations are wrong, and in the examples only when the example code itself needs an annotation or cast, the way the existing patch does. Then run `sh update-patch.sh` ("Update patch and delete examples").
4. Only if `src/nodes/tsl/TSLCore.js` changed in the range, or the TSL checks fail: `cd tsl-testing && sh prepare-tsl.sh`, fix the result, then `sh update-patch.sh`.
5. From the repository root, run `bash .github/sync-three/verify.sh`. It must pass. If it fails, fix the problem, commit, and run it again.

## Rules

- Do not push, open pull requests, or use `gh`. The driver handles that.
- Do not modify `.github/`, `package.json` files, lockfiles, or the submodule pointer. Do not amend, squash or rebase existing commits. Leave the working tree clean, with everything committed.
- Do not add dependencies or install packages.
- If the range needs no type or patch changes, it's fine for the net diff to be empty. Don't invent changes.

## Final answer

Finish with a short summary of what you changed and why. The very last line must be exactly one of:

- `RESULT: CHANGES`
- `RESULT: NO_CHANGES`
- `RESULT: BLOCKED: <one-line reason>`
