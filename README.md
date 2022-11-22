This repository is the home for the TypeScript types for three.js. Periodically the updates from this repository are pushed to DefinitelyTyped and released in the `@types/three` npm package.

We are using this repository as a home for the types instead of DefinitelyTyped because:

-   It is less daunting for users to raise issues or create PRs on a repository that is specific to three.js
-   It is easier to organize the process of making sure we're staying up-to-date with the changes in the three.js repository
-   It gives us more freedom to use our own process

## Priorities and goals

The highest priority is making sure that there are no inaccurate types (or types for things that have been removed).

It is a goal to have complete public facing API types for all of the code in the `src` directory.

It is not a goal for the `examples/jsm` directory to have complete declaration files for every examples module due to the number of example modules and how quickly they are modified. If you would like to use an examples module that is missing types then create a PR to add the types or create an issue to request that we add the missing types for that module.

## Contributing

Please see our [Contributing Guidelines](https://github.com/three-types/three-ts-types/blob/master/CONTRIBUTING.md) to help you get started. One of the most important things is choosing a branch to start your work on. If the code you want to contribute is for the current release of `three` it should be based off `master`. If it is for the next release of `three` it should be based off `dev`. You should then aim your merge into the branch you based off.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/joshuaellis"><img src="https://avatars.githubusercontent.com/u/37798644?v=4?s=100" width="100px;" alt="Josh"/><br /><sub><b>Josh</b></sub></a><br /><a href="#question-joshuaellis" title="Answering Questions">💬</a> <a href="https://github.com/three-types/three-ts-types/issues?q=author%3Ajoshuaellis" title="Bug reports">🐛</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Documentation">📖</a> <a href="#ideas-joshuaellis" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-joshuaellis" title="Maintenance">🚧</a> <a href="https://github.com/three-types/three-ts-types/pulls?q=is%3Apr+reviewed-by%3Ajoshuaellis" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/three-types/three-ts-types/commits?author=joshuaellis" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/Methuselah96"><img src="https://avatars.githubusercontent.com/u/693755?v=4?s=100" width="100px;" alt="Nathan Bierema"/><br /><sub><b>Nathan Bierema</b></sub></a><br /><a href="#question-Methuselah96" title="Answering Questions">💬</a> <a href="https://github.com/three-types/three-ts-types/issues?q=author%3AMethuselah96" title="Bug reports">🐛</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Documentation">📖</a> <a href="#ideas-Methuselah96" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Methuselah96" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Methuselah96" title="Maintenance">🚧</a> <a href="https://github.com/three-types/three-ts-types/pulls?q=is%3Apr+reviewed-by%3AMethuselah96" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/three-types/three-ts-types/commits?author=Methuselah96" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://human-interactive.org"><img src="https://avatars.githubusercontent.com/u/12612165?v=4?s=100" width="100px;" alt="Michael Herzog"/><br /><sub><b>Michael Herzog</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Mugen87" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/CodyJasonBennett"><img src="https://avatars.githubusercontent.com/u/23324155?v=4?s=100" width="100px;" alt="Cody Bennett"/><br /><sub><b>Cody Bennett</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=CodyJasonBennett" title="Code">💻</a></td>
      <td align="center"><a href="http://0b5vr.github.io/"><img src="https://avatars.githubusercontent.com/u/7824814?v=4?s=100" width="100px;" alt="0b5vr"/><br /><sub><b>0b5vr</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=0b5vr" title="Code">💻</a> <a href="https://github.com/three-types/three-ts-types/commits?author=0b5vr" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://stackoverflow.com/users/2608515/marquizzo"><img src="https://avatars.githubusercontent.com/u/7864858?v=4?s=100" width="100px;" alt="Marquizzo"/><br /><sub><b>Marquizzo</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=marquizzo" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/khum08"><img src="https://avatars.githubusercontent.com/u/32336026?v=4?s=100" width="100px;" alt="Yuanzk"/><br /><sub><b>Yuanzk</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=khum08" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="http://sparklinlabs.com/"><img src="https://avatars.githubusercontent.com/u/446986?v=4?s=100" width="100px;" alt="Elisée Maurer"/><br /><sub><b>Elisée Maurer</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=elisee" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/soadzoor"><img src="https://avatars.githubusercontent.com/u/10392261?v=4?s=100" width="100px;" alt="soadzoor"/><br /><sub><b>soadzoor</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=soadzoor" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/rinsuki"><img src="https://avatars.githubusercontent.com/u/6533808?v=4?s=100" width="100px;" alt="rinsuki"/><br /><sub><b>rinsuki</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=rinsuki" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/efokschaner"><img src="https://avatars.githubusercontent.com/u/1409112?v=4?s=100" width="100px;" alt="efokschaner"/><br /><sub><b>efokschaner</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=efokschaner" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Jhuni0123"><img src="https://avatars.githubusercontent.com/u/16764073?v=4?s=100" width="100px;" alt="Jonghun Park"/><br /><sub><b>Jonghun Park</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Jhuni0123" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/sjpt"><img src="https://avatars.githubusercontent.com/u/4954988?v=4?s=100" width="100px;" alt="sjpt"/><br /><sub><b>sjpt</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=sjpt" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Michsior14"><img src="https://avatars.githubusercontent.com/u/1410035?v=4?s=100" width="100px;" alt="Michał Mrozek"/><br /><sub><b>Michał Mrozek</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Michsior14" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://puxiao.com"><img src="https://avatars.githubusercontent.com/u/3401635?v=4?s=100" width="100px;" alt="puxiao"/><br /><sub><b>puxiao</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=puxiao" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ycw"><img src="https://avatars.githubusercontent.com/u/1063018?v=4?s=100" width="100px;" alt="ycw"/><br /><sub><b>ycw</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=ycw" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Jazcash"><img src="https://avatars.githubusercontent.com/u/1434248?v=4?s=100" width="100px;" alt="Jazcash"/><br /><sub><b>Jazcash</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Jazcash" title="Code">💻</a></td>
      <td align="center"><a href="https://bjornstar.com/"><img src="https://avatars.githubusercontent.com/u/20630?v=4?s=100" width="100px;" alt="Bjorn Stromberg"/><br /><sub><b>Bjorn Stromberg</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=bjornstar" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/happy-turtle"><img src="https://avatars.githubusercontent.com/u/18415215?v=4?s=100" width="100px;" alt="HappyTurtle"/><br /><sub><b>HappyTurtle</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=happy-turtle" title="Code">💻</a></td>
      <td align="center"><a href="https://studio.did0es.me/"><img src="https://avatars.githubusercontent.com/u/38882716?v=4?s=100" width="100px;" alt="Shuta Hirai"/><br /><sub><b>Shuta Hirai</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=shuta13" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/servinlp"><img src="https://avatars.githubusercontent.com/u/7222029?v=4?s=100" width="100px;" alt="Servin Nissen"/><br /><sub><b>Servin Nissen</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=servinlp" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://benpigchu.com/"><img src="https://avatars.githubusercontent.com/u/9023067?v=4?s=100" width="100px;" alt="Ben "Pig" Chu"/><br /><sub><b>Ben "Pig" Chu</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=benpigchu" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/woo-cie"><img src="https://avatars.githubusercontent.com/u/24642989?v=4?s=100" width="100px;" alt="Makoto Yamada"/><br /><sub><b>Makoto Yamada</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=woo-cie" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/schwyzl"><img src="https://avatars.githubusercontent.com/u/1556979?v=4?s=100" width="100px;" alt="schwyzl"/><br /><sub><b>schwyzl</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=schwyzl" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Degubi"><img src="https://avatars.githubusercontent.com/u/13366932?v=4?s=100" width="100px;" alt="Degubi"/><br /><sub><b>Degubi</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Degubi" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/WCWedin"><img src="https://avatars.githubusercontent.com/u/110730?v=4?s=100" width="100px;" alt="Ibby Wedin"/><br /><sub><b>Ibby Wedin</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=WCWedin" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/dbuck"><img src="https://avatars.githubusercontent.com/u/983807?v=4?s=100" width="100px;" alt="dbuck"/><br /><sub><b>dbuck</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=dbuck" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/robertlong"><img src="https://avatars.githubusercontent.com/u/1753624?v=4?s=100" width="100px;" alt="Robert Long"/><br /><sub><b>Robert Long</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=robertlong" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://xk.io/"><img src="https://avatars.githubusercontent.com/u/1046448?v=4?s=100" width="100px;" alt="Max Kaye"/><br /><sub><b>Max Kaye</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=XertroV" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/LauferAlex"><img src="https://avatars.githubusercontent.com/u/86115165?v=4?s=100" width="100px;" alt="Alejandro Laufer"/><br /><sub><b>Alejandro Laufer</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/issues?q=author%3ALauferAlex" title="Bug reports">🐛</a> <a href="https://github.com/three-types/three-ts-types/commits?author=LauferAlex" title="Code">💻</a></td>
      <td align="center"><a href="https://twitter.com/ggsimm"><img src="https://avatars.githubusercontent.com/u/1862172?v=4?s=100" width="100px;" alt="Gianmarco"/><br /><sub><b>Gianmarco</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=gsimone" title="Code">💻</a></td>
      <td align="center"><a href="https://davidpeicho.github.io/"><img src="https://avatars.githubusercontent.com/u/8783766?v=4?s=100" width="100px;" alt="David Peicho"/><br /><sub><b>David Peicho</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=DavidPeicho" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/trusktr"><img src="https://avatars.githubusercontent.com/u/297678?v=4?s=100" width="100px;" alt="Joe Pea"/><br /><sub><b>Joe Pea</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=trusktr" title="Code">💻</a></td>
      <td align="center"><a href="https://subho57.github.io"><img src="https://avatars.githubusercontent.com/u/98544661?v=4?s=100" width="100px;" alt="Subhankar Pal"/><br /><sub><b>Subhankar Pal</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=subhankar-trisetra" title="Code">💻</a></td>
      <td align="center"><a href="http://www.seanmcbeth.com/"><img src="https://avatars.githubusercontent.com/u/298046?v=4?s=100" width="100px;" alt="Sean T. McBeth"/><br /><sub><b>Sean T. McBeth</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=capnmidnight" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/atulrnt"><img src="https://avatars.githubusercontent.com/u/894203?v=4?s=100" width="100px;" alt="Arthur LAURENT"/><br /><sub><b>Arthur LAURENT</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=atulrnt" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/serenayl"><img src="https://avatars.githubusercontent.com/u/12814119?v=4?s=100" width="100px;" alt="Serena Li"/><br /><sub><b>Serena Li</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=serenayl" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/cosformula"><img src="https://avatars.githubusercontent.com/u/18232501?v=4?s=100" width="100px;" alt="cosformula"/><br /><sub><b>cosformula</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=cosformula" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/miko3k"><img src="https://avatars.githubusercontent.com/u/8658482?v=4?s=100" width="100px;" alt="Peter Hanula"/><br /><sub><b>Peter Hanula</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=miko3k" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/MysteryBlokHed"><img src="https://avatars.githubusercontent.com/u/13910387?v=4?s=100" width="100px;" alt="Adam Thompson-Sharpe"/><br /><sub><b>Adam Thompson-Sharpe</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=MysteryBlokHed" title="Code">💻</a></td>
      <td align="center"><a href="https://www.youtube.com/c/noname0310"><img src="https://avatars.githubusercontent.com/u/48761044?v=4?s=100" width="100px;" alt="noname"/><br /><sub><b>noname</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=noname0310" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/grschafer"><img src="https://avatars.githubusercontent.com/u/694225?v=4?s=100" width="100px;" alt="Greg Schafer"/><br /><sub><b>Greg Schafer</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=grschafer" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/SuperSodaSea"><img src="https://avatars.githubusercontent.com/u/8724868?v=4?s=100" width="100px;" alt="SuperSodaSea"/><br /><sub><b>SuperSodaSea</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=SuperSodaSea" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/mattrossman"><img src="https://avatars.githubusercontent.com/u/22670878?v=4?s=100" width="100px;" alt="Matt Rossman"/><br /><sub><b>Matt Rossman</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=mattrossman" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/imbateam-gg/titan-reactor"><img src="https://avatars.githubusercontent.com/u/586716?v=4?s=100" width="100px;" alt="Alex Pineda"/><br /><sub><b>Alex Pineda</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=alexpineda" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Draichi"><img src="https://avatars.githubusercontent.com/u/19378148?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucas</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=Draichi" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/mz8i"><img src="https://avatars.githubusercontent.com/u/36160844?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maciej Ziarkowski</b></sub></a><br /><a href="https://github.com/three-types/three-ts-types/commits?author=mz8i" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## FAQ

### Why are the declaration files in a `types/three/` directory and why is there a `notNeededPackages.json`?

This makes it easier to re-use the testing process used by DefinitelyTyped since they have a check to make sure the types are within a `types` directory as well a check for `notNeededPackages.json`. It also makes it possible to use `typeRoots` in the `tsconfig.json` so that the `three` types can be resolved correctly in the tests.
