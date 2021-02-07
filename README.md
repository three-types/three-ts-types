This repository is the home for the TypeScript types for three.js. Periodically the updates from this repository are pushed to DefinitelyTyped and released in the `@types/three` npm package.

We are using this repository as a home for the types instead of DefinitelyTyped because:

-   It is less daunting for users to raise issues or create PRs on a repository that is specific to three.js
-   It is easier to organize the process of making sure we're staying up-to-date with the changes in the three.js repository
-   It gives us more freedom to use our own process

## Priorities and goals

The highest priority is making sure that there are no inaccurate types (or types for things that have been removed).

It is a goal is to have complete types for all of the code in the `src` directory.

It is not a goal for the `examples/jsm` directory to have complete declaration files for every examples module due to the number of example modules and how quickly they are modified. If you would like to use an examples module that is missing types then create a PR to add the types or create an issue to request that we add the missing types for that module.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/joshuaellis"><img src="https://avatars.githubusercontent.com/u/37798644?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh</b></sub></a><br /><a href="#question-joshuaellis" title="Answering Questions">💬</a> <a href="https://github.com/three-types/three-ts-types/issues?q=author%3Ajoshuaellis" title="Bug reports">🐛</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Documentation">📖</a> <a href="#ideas-joshuaellis" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-joshuaellis" title="Maintenance">🚧</a> <a href="https://github.com/three-types/three-ts-types/pulls?q=is%3Apr+reviewed-by%3Ajoshuaellis" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Methuselah96"><img src="https://avatars.githubusercontent.com/u/693755?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nathan Bierema</b></sub></a><br /><a href="#question-Methuselah96" title="Answering Questions">💬</a> <a href="https://github.com/three-types/three-ts-types/issues?q=author%3AMethuselah96" title="Bug reports">🐛</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Documentation">📖</a> <a href="#ideas-Methuselah96" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Methuselah96" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Methuselah96" title="Maintenance">🚧</a> <a href="https://github.com/three-types/three-ts-types/pulls?q=is%3Apr+reviewed-by%3AMethuselah96" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://human-interactive.org"><img src="https://avatars.githubusercontent.com/u/12612165?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Herzog</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Mugen87" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## FAQ

### Why are the declaration files in a `types/three/` directory and why is there a `notNeededPackages.json`?

This makes it easier to re-use the testing process used by DefinitelyTyped since they have a check to make sure the types are within a `types` directory as well a check for `notNeededPackages.json`. It also makes it possible to use `typeRoots` in the `tsconfig.json` so that the `three` types can be resolved correctly in the tests.
