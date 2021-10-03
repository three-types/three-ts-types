This repository is the home for the TypeScript types for three.js. Periodically the updates from this repository are pushed to DefinitelyTyped and released in the `@types/three` npm package.

We are using this repository as a home for the types instead of DefinitelyTyped because:

-   It is less daunting for users to raise issues or create PRs on a repository that is specific to three.js
-   It is easier to organize the process of making sure we're staying up-to-date with the changes in the three.js repository
-   It gives us more freedom to use our own process

## Priorities and goals

The highest priority is making sure that there are no inaccurate types (or types for things that have been removed).

It is a goal to have complete types for all of the code in the `src` directory.

It is not a goal for the `examples/jsm` directory to have complete declaration files for every examples module due to the number of example modules and how quickly they are modified. If you would like to use an examples module that is missing types then create a PR to add the types or create an issue to request that we add the missing types for that module.

## Contributing

Please see our [Contributing Guidelines](https://github.com/three-types/three-ts-types/blob/master/CONTRIBUTING.md) to help you get started. One of the most important things is choosing a branch to start your work on. If the code you want to contribute is for the current release of `three` it should be based off `master`. If it is for the next release of `three` it should be based off `dev`. You should then aim your merge into the branch you based off.

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
    <td align="center"><a href="https://github.com/CodyJasonBennett"><img src="https://avatars.githubusercontent.com/u/23324155?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cody Bennett</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=CodyJasonBennett" title="Code">💻</a></td>
    <td align="center"><a href="http://0b5vr.github.io/"><img src="https://avatars.githubusercontent.com/u/7824814?v=4?s=100" width="100px;" alt=""/><br /><sub><b>0b5vr</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=0b5vr" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=0b5vr" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://stackoverflow.com/users/2608515/marquizzo"><img src="https://avatars.githubusercontent.com/u/7864858?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marquizzo</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=marquizzo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/khum08"><img src="https://avatars.githubusercontent.com/u/32336026?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yuanzk</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=khum08" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://sparklinlabs.com/"><img src="https://avatars.githubusercontent.com/u/446986?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elisée Maurer</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=elisee" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/soadzoor"><img src="https://avatars.githubusercontent.com/u/10392261?v=4?s=100" width="100px;" alt=""/><br /><sub><b>soadzoor</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=soadzoor" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rinsuki"><img src="https://avatars.githubusercontent.com/u/6533808?v=4?s=100" width="100px;" alt=""/><br /><sub><b>rinsuki</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=rinsuki" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/efokschaner"><img src="https://avatars.githubusercontent.com/u/1409112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>efokschaner</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=efokschaner" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Jhuni0123"><img src="https://avatars.githubusercontent.com/u/16764073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonghun Park</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Jhuni0123" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sjpt"><img src="https://avatars.githubusercontent.com/u/4954988?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sjpt</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=sjpt" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Michsior14"><img src="https://avatars.githubusercontent.com/u/1410035?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michał Mrozek</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Michsior14" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://puxiao.com"><img src="https://avatars.githubusercontent.com/u/3401635?v=4?s=100" width="100px;" alt=""/><br /><sub><b>puxiao</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=puxiao" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ycw"><img src="https://avatars.githubusercontent.com/u/1063018?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ycw</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=ycw" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Jazcash"><img src="https://avatars.githubusercontent.com/u/1434248?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jazcash</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Jazcash" title="Code">💻</a></td>
    <td align="center"><a href="https://bjornstar.com/"><img src="https://avatars.githubusercontent.com/u/20630?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bjorn Stromberg</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=bjornstar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/happy-turtle"><img src="https://avatars.githubusercontent.com/u/18415215?v=4?s=100" width="100px;" alt=""/><br /><sub><b>HappyTurtle</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=happy-turtle" title="Code">💻</a></td>
    <td align="center"><a href="https://studio.did0es.me/"><img src="https://avatars.githubusercontent.com/u/38882716?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shuta Hirai</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=shuta13" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/servinlp"><img src="https://avatars.githubusercontent.com/u/7222029?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Servin Nissen</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=servinlp" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://benpigchu.com/"><img src="https://avatars.githubusercontent.com/u/9023067?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben "Pig" Chu</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=benpigchu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/woo-cie"><img src="https://avatars.githubusercontent.com/u/24642989?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Makoto Yamada</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=woo-cie" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/schwyzl"><img src="https://avatars.githubusercontent.com/u/1556979?v=4?s=100" width="100px;" alt=""/><br /><sub><b>schwyzl</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=schwyzl" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## FAQ

### Why are the declaration files in a `types/three/` directory and why is there a `notNeededPackages.json`?

This makes it easier to re-use the testing process used by DefinitelyTyped since they have a check to make sure the types are within a `types` directory as well a check for `notNeededPackages.json`. It also makes it possible to use `typeRoots` in the `tsconfig.json` so that the `three` types can be resolved correctly in the tests.
