# Contributing

Thanks for wanting to make a contribution and wanting to improve this library for everyone!

## Project setup

1.  Fork and clone the repo
2.  Run `yarn install` to install dependencies
3.  Create a branch for your PR with `git checkout -b pr-type/issue-number-your-branch-name`
4.  Let's get cooking! 👨🏻‍🍳🥓

## Commit Guidelines

Be sure your commit messages follow this specification: https://www.conventionalcommits.org/en/v1.0.0-beta.4/

## Add yourself as a contributor

This project follows the [all contributors](https://github.com/kentcdodds/all-contributors) specification. To add yourself to the table of contributors on the `README.md`, please use the automated script as part of your PR:

```console
yarn contributors:add
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If you've already added yourself to the list and are making a new type of contribution, you can run it again and select the added contribution type.

## Testing

Consider [adding a test](README.md#testing) along with your changes to make sure they are correct and to avoid regressions. Regardless of whether you've added a test, make sure to run the tests before you create a PR. You can do so by running `npm test`.

## Creating a PR

We have two core branches that mirror the `three` repo. If your PR is for the current release of `three` it should be based off `master` and aimed at merging back into `master`. If your PR is for the next release of `three` then it should be based off `dev` and therefore aimed at merging back into `dev`.

## Help needed

Please check out the [the open issues](https://github.com/three-types/three-ts-types/issues).

Also, please watch the repo and respond to questions/bug reports/feature requests! Thanks!
