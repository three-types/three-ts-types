# three-ts-types

This repository is the home for the TypeScript types for [three.js](https://github.com/mrdoob/three.js/). Periodically the updates from this repository are pushed to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) and released in the `@types/three` npm package.

We are using this repository as a home for the types instead of DefinitelyTyped because:

- It is less daunting for users to raise issues or create PRs on a repository that is specific to three.js
- It is easier to organize the process of making sure we're staying up-to-date with the changes in the three.js repository
- It gives us more freedom to use our own process

## Priorities and goals

The highest priority is making sure that there are no inaccurate types (or types for things that have been removed).

It is a goal to have complete public facing API types for all of the code in the `src` directory.

It is not a goal for the `examples/jsm` directory to have complete declaration files for every examples module due to the number of example modules and how quickly they are modified. If you would like to use an examples module that is missing types then create a PR to add the types or create an issue to request that we add the missing types for that module.

## Testing

The tests are split into two directories: `types/three/test/integration` and `types/three/test/unit`.

### Integration tests

The integration tests are usually runnable three.js code that has just been translated to TypeScript to make sure the types work. The `three-examples` is a special directory that holds the examples from the three.js repository with matching file names. If you want to add an integration test, you can just create a new file in the `integration` directory.

### Unit tests

The unit tests are more fine-grained tests that focus on testing the types for a single file from the source code (either from the three.js core or the JSM addons). The directory structure of the unit tests matches the directory structure of the source code. These tests often contain type assertions as well to test the result of calling a method or to verify that the types produce an error in certain situations.

## Contributing

Please see our [Contributing Guidelines](https://github.com/three-types/three-ts-types/blob/master/CONTRIBUTING.md) to help you get started.

## FAQ

### Why are the declaration files in a `types/three/` directory and why is there a `notNeededPackages.json`?

This makes it easier to re-use the testing process used by DefinitelyTyped since they have a check to make sure the types are within a `types` directory as well as a check for `notNeededPackages.json`. It also makes it possible to use `typeRoots` in the `tsconfig.json` so that the `three` types can be resolved correctly in the tests.
