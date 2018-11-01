# egjs-flicking

[![version][badge-version]][link-version] [![Build Status][badge-build-status]][link-build-status] [![Coverage Status][badge-coverage]][link-coverage] [![Greenkeeper][badge-gk]][link-gk] 

A module used to implement flicking interactions.
With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side. 

## Documents
- [Get Started and Demos](https://naver.github.io/egjs-flicking/)
- [API documentation](https://naver.github.io/egjs-flicking/release/latest/doc/)

## Download and Installation

Download dist files from repo directly or install it via npm. 

### For development (Uncompressed)

You can download the uncompressed files for development

- Latest : https://naver.github.io/egjs-flicking/release/latest/dist/flicking.js
- Specific version : https://naver.github.io/egjs-flicking/release/[VERSION]/dist/flicking.js

### For production (Compressed)

You can download the compressed files for production

- Latest : https://naver.github.io/egjs-flicking/release/latest/dist/flicking.min.js
- Specific version : https://naver.github.io/egjs-flicking/release/[VERSION]/dist/flicking.min.js

### Packaged version (with Dependencies)
> Packaged version is to provide for ease use of 'egjs-flicking' with dependency.

 - **Latest**
    - https://naver.github.io/egjs-flicking/release/latest/dist/flicking.pkgd.js
    - https://naver.github.io/egjs-flicking/release/latest/dist/flicking.pkgd.min.js

 - **Specific version**
    - https://naver.github.io/egjs-flicking/release/[VERSION]/dist/flicking.pkgd.js
    - https://naver.github.io/egjs-flicking/release/[VERSION]/dist/flicking.pkgd.min.js

### Nightly version

Nightly version is the latest build from the master branch.
With nightly, you can try upcoming changes prior the official release.

- https://github.com/naver/egjs-flicking/tree/nightly/dist

> The version info will be given as the build datetime: `x.x.x-nightly-yyyymmddhhmmss`

### Plugins

Go to [**@ejgs/flicking-plugins**](https://github.com/naver/egjs-flicking/tree/exportplugin/packages/flicking-plugins)

Using npm:
```
npm install @egjs/flicking-plugins
```
```js
import {OpacityEffect, ParallaxEffect} from "@egjs/flicking-plugins";
```

Download necessary plugins to be used

#### List of plugins:
>  - **all** : all plugins
>  - [OpacityEffect](https://naver.github.io/egjs-flicking/release/latest/doc/eg.Flicking.plugin.OpacityEffect.html): Add opacity effect attached with flicking interaction.
>  - [ParallaxEffect](https://naver.github.io/egjs-flicking/release/latest/doc/eg.Flicking.plugin.ParallaxEffect.html): Add horizontal parallax effect attached with flicking interaction.

 - **Latest**
    - https://naver.github.io/egjs-flicking/release/plugins/latest/dist/all.js (all)
    - https://naver.github.io/egjs-flicking/release/plugins/latest/dist/all.min.js (all)
    - https://naver.github.io/egjs-flicking/release/plugins/latest/dist/[PLUGIN-NAME].js
    - https://naver.github.io/egjs-flicking/release/plugins/latest/dist/[PLUGIN-NAME].min.js
 - **Specific version**
    - https://naver.github.io/egjs-flicking/release/plugins/[PLUGIN-VERSION]/dist/all.js (all)
    - https://naver.github.io/egjs-flicking/release/plugins/[PLUGIN-VERSION]/dist/all.min.js (all)
    - https://naver.github.io/egjs-flicking/release/plugins/[PLUGIN-VERSION]/dist/[PLUGIN-NAME].js
    - https://naver.github.io/egjs-flicking/release/plugins/[PLUGIN-VERSION]/dist/[PLUGIN-NAME].min.js

### Installation with npm

The following command shows how to install egjs-flicking using npm.

```bash
$ npm install @egjs/flicking
```

### Using CDN

If you want to load files using CDN, check the files URL provided by the CDN service.

- jsDelivr: https://cdn.jsdelivr.net/npm/@egjs/flicking/dist/
- cdnjs: https://cdnjs.com/libraries/egjs-flicking
- unpkg: https://unpkg.com/@egjs/flicking/dist/

## Supported Browsers
The following are the supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|


## Dependency
egjs-flicking has the dependencies for the following libraries:

|[eg.Component](https://github.com/naver/egjs-component)|[eg.Axes](https://github.com/naver/egjs-axes)|
|----|----|
|2.0.0+|2.0.0+|


## How to start developing egjs-flicking?

For anyone interested to develop egjs-flicking, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the egjs-flicking repository and install the dependency modules.

```bash
# Clone the repository.
$ git clone https://github.com/naver/egjs-flicking.git
```

#### 2. Install dependencies

```
# Install the dependency modules.
$ npm install
```

#### 3. Build

Use npm script to build eg.Flicking

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after complete build is completed.

- **dist** folder: Includes the **flicking.js** and **flicking.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To keep the same code style, we adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Setup your editor for check or run below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and done with development, you must perform a test running with `npm test` command before your push the code to a remote repository.

```bash
$ npm run test
```
Running `npm test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).


## Bug Report

If you find a bug, please report to us opening a new [Issues](https://github.com/naver/egjs-flicking/issues) on GitHub.


## License
egjs-flicking is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015 NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<!-- badges -->
[badge-version]: https://img.shields.io/npm/v/@egjs/flicking.svg?style=flat
[badge-build-status]: https://travis-ci.org/naver/egjs-flicking.svg?branch=master
[badge-coverage]: https://coveralls.io/repos/github/naver/egjs-flicking/badge.svg?branch=master
[badge-gk]: https://badges.greenkeeper.io/naver/egjs-flicking.svg

<!-- links -->
[link-version]: https://www.npmjs.com/package/@egjs/flicking
[link-build-status]: https://travis-ci.org/naver/egjs-flicking
[link-coverage]: https://coveralls.io/github/naver/egjs-flicking?branch=master
[link-gk]: https://greenkeeper.io/
