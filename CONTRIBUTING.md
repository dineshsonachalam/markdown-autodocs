# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

## Setup

> Install node & npm on your system: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Install dependencies

> Only required when setting up the project

```sh
$ git clone git@github.com:dineshsonachalam/markdown-autodocs.git
$ cd markdown-autodocs
$ npm i
```

### Run locally

To run markdown-autodocs locally follow these steps:
1. Make sure you have run `npm i` to install all packages
2. Finally, you can use the markdown-autodocs cli `node index.js -c code-block -o ./README.md -r $TEST_REPO -b $TEST_BRANCH -a $TEST_ACCESSTOKEN`

If you have any questions please ping [@DSonachalam](https://twitter.com/DSonachalam) on Twitter.

## Available scripts

### `test`

Runs all the `markdown-autodocs` packages tests.

#### Usage

```sh
npm test
```

## Pull Requests

We actively welcome your pull requests!

If you need help with Git or our workflow, please ask on [Dinesh on twitter](https://twitter.com/DSonachalam). We want your contributions even if you're just learning Git. Our maintainers are happy to help!

Analytics uses the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) + [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Additionally, PR's should be [rebased](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) on master when opened, and again before merging.
