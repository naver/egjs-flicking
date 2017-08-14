# How to contribute to egjs-flicking
egjs-flicking is opened to everyone and we're welcoming for any kind of contribution.
We believe that our project can grow with your interests helping others' necessities.

## Style Guide

egjs-flicking has several style guidelines to follow.
Before your start, please read attentively below instructions.

### Linting and Code Conventions
We adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
All rules are described at [.eslintrc](.eslintrc) file.

### Commit Log Guidelines
egjs-flicking use commit logs in many different purposes (like creating CHANGELOG, ease history searching, etc.).
To not break, you'll be forced to follow our commit log guidelines.
Before your commit/push, make sure following our commit log guidelines.

The outline is as below:
```
<type>(<module>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- **Types**
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation only changes
  - **style**: Changes that do not affect the meaning of the code. Such as white-space, formatting, missing semi-colons, etc... It also possible to change JSHint, JSCS rules of the code.
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **test**: Adding missing tests. Changing tests.
  - **demo**: Adding missing demos. Changing demos.
  - **chore**: Changes to the build process or tools and libraries such as documentation generation

[See More Commit Log Guidelines](https://github.com/naver/egjs/wiki/Commit-Log-Guidelines)

## How to submit Pull Requests
Steps to submit your pull request:

1. Fork `egjs-flicking` on your repository
2. Create new branch from your egjs master branch (and be sure always to be up-to-date)
3. Do your work
4. Create test code for your work (when is possible)
5. Run `npm run lint` for linting and Code Conventions (update until without any error or warnings)
6. Run test code by `npm run test OR npm run test:chrome`.
   Make sure tests are all passed at least in Chrome(latest desktop version)
8. Write commit log following convention and push to your repository branch.
9. Create a new PR from your branch to egjs-flicking.
10. Wait for reviews.
    When your contribution is well enough to be accepted, then will be merged to our branch.
11. All done!


## License
By contributing to egjs-flicking, you're agreeing that your contributions will be licensed under its [MIT](https://opensource.org/licenses/MIT) license.