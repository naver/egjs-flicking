# How to contribute to egjs-flicking
egjs-flicking is opened to everyone and we're welcoming for any kind of contribution.
We believe that our project can grow with your interests helping others' necessities.

## Getting Started

This repository is a [pnpm](https://pnpm.io/) workspace monorepo. CI verifies against **Node 22.x** and **pnpm 10**.

```bash
pnpm install

# Install the browser used by the browser-based suites (once per machine)
pnpm --filter @test/unit exec playwright install chromium
pnpm --filter @test/e2e exec playwright install chromium
```

Dev servers support HMR against the package sources:

| Command | Package | Port |
|---------|---------|------|
| `pnpm dev:flicking` | `@egjs/flicking` (core) | 3000 |
| `pnpm dev:react` | `@egjs/react-flicking` | 3001 |
| `pnpm dev:vue` | `@egjs/vue3-flicking` | 3002 |
| `pnpm dev:plugins` | `@egjs/flicking-plugins` | 3003 |

`pnpm dev:all` starts all of them. See [dev-guide/DEV_GUIDE.md](dev-guide/DEV_GUIDE.md) for aliases, build verification mode and type support.

## Style Guide

egjs-flicking has several style guidelines to follow.
Before your start, please read attentively below instructions.

### Linting and Code Conventions
We use [Biome](https://biomejs.dev/) for both linting and formatting. All rules are described in [biome.json](biome.json).

```bash
pnpm lint       # lint + format check
pnpm lint:fix   # autofix
pnpm format     # formatting only
```

Git hooks (husky) run on every commit and push:

- `pre-commit` — Biome over staged files
- `commit-msg` — commit message convention check
- `pre-push` — Biome over `packages/`

Details: [dev-guide/LINT_AND_FORMAT.md](dev-guide/LINT_AND_FORMAT.md).

### Tests

| Command | Suite |
|---------|-------|
| `pnpm test` | unit (Vitest Browser Mode + Playwright) |
| `pnpm test:plugins` | plugins (jsdom) |
| `pnpm test:cfc` | cross-framework (jsdom) |
| `pnpm test:e2e` | E2E (Playwright, demo-based) |
| `pnpm test:config` | version/release scripts |
| `pnpm test:all` | unit + plugins + cfc + config |

CI runs the unit, plugins, cfc and e2e suites on every push and pull request. How to write tests: [dev-guide/TEST_GUIDE.md](dev-guide/TEST_GUIDE.md).

### Commit Log Guidelines
egjs-flicking use commit logs in many different purposes (like creating CHANGELOG, ease history searching, etc.).
To not break, you'll be forced to follow our commit log guidelines — the `commit-msg` hook rejects messages that don't.

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
  - **style**: Changes that do not affect the meaning of the code. Such as white-space, formatting, missing semi-colons, etc.
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **test**: Adding missing tests. Changing tests.
  - **demo**: Adding missing demos. Changing demos.
  - **chore**: Changes to the build process or tools and libraries such as documentation generation
- The `<subject>` is limited to **50 characters**, and the whole first line to 100.

[See More Commit Log Guidelines](https://github.com/naver/egjs/wiki/Commit-Log-Guidelines)

## How to submit Pull Requests
Steps to submit your pull request:

1. Fork `egjs-flicking` on your repository
2. Create a new branch from the latest `master` (and be sure always to be up-to-date)
3. Run `pnpm install`. If you need the API tab of the docs site, run `pnpm api-docs:docusaurus` once — `packages/docs/docs/api/` is generated and gitignored.
4. Do your work
5. Create test code for your work (when is possible)
6. Run `pnpm lint` for linting and code conventions (update until without any error)
7. Run the suites related to your change (`pnpm test`, `pnpm test:plugins`, `pnpm test:cfc`, `pnpm test:e2e`)
8. Write commit log following convention and push to your repository branch
9. Create a new PR from your branch to `egjs-flicking` `master`
10. Wait for reviews. CI must be green.
    When your contribution is well enough to be accepted, then will be merged to our branch.
11. All done!

### Please leave these out of a contribution PR

- Package `version` fields and `CHANGELOG.md` — both are produced by the release pipeline, not by hand.
- Auto-generated files: `packages/docs/docs/api/`, `packages/docs/blog/release-*.md`, `packages/docs/static/llm-docs/`.
- `dev/*/index.html` and `dev/*/main.*` — only the `App.*` file in each `dev/` sample is meant to be edited.

Releasing (version bump, npm publish, tags, GitHub Release, docs deploy) is done by maintainers in a fixed order — merge first, publish after. See [dev-guide/PUBLISH_GUIDE.md](dev-guide/PUBLISH_GUIDE.md).

## License
By contributing to egjs-flicking, you're agreeing that your contributions will be licensed under its [MIT](https://opensource.org/licenses/MIT) license.
