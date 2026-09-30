# Change Log

All notable changes to this project will be documented in this file.

## [4.17.1](https://github.com/naver/egjs-flicking/compare/4.17.0...4.17.1) (2026-09-30)
### :sparkles: Packages
* `@egjs/flicking` 4.17.1
* `@egjs/react-flicking` 4.17.1
* `@egjs/vue3-flicking` 4.17.1

### :rocket: New Features
* **release:** 릴리즈 노트 Highlights 작성을 절차에 포함 ([bb3e062](https://github.com/naver/egjs-flicking/commit/bb3e0628c51d6b72c625cff40afc65f5ad6fa379))
* **release:** /release 파이프라인 스킬 추가 ([e9b295c](https://github.com/naver/egjs-flicking/commit/e9b295ce291cca33af887a232119e2c52c60b60a))
* **release:** release 스크립트를 prepare/finalize로 분할 ([1123946](https://github.com/naver/egjs-flicking/commit/1123946930a780f3e2e5db8df23242c8eda54312))

### :bug: Bug Fixes
* use cloneNode instead of innerHTML (#960) ([54cbf99](https://github.com/naver/egjs-flicking/commit/54cbf992453d0c36e9c8506ddbc98b9b9c69e894))
* **release:** bump 인자 제거, 3단계 버전 확인 상시화 ([4b4498b](https://github.com/naver/egjs-flicking/commit/4b4498b201fb6ffce195e2940d8828523340af6c))
* **release:** 스킬의 취합 PR 번호 인자 제거 ([70b6f0b](https://github.com/naver/egjs-flicking/commit/70b6f0b885da450fc37d5e555acfe45a7146a73d))
* **release:** PR 취합을 버전 결정·prepare 앞으로 이동 ([ebcf571](https://github.com/naver/egjs-flicking/commit/ebcf571202282874cc50a2ceb07e5d70b2d6fcea))

### :memo: Documentation
* **agents:** 명령어 목록에 release:notes 추가 ([1a28293](https://github.com/naver/egjs-flicking/commit/1a2829364d89e5345f82f17d39ff274840b1421e))
* **agents:** 배포 순서에 PR 취합 단계 명시 ([c68ca12](https://github.com/naver/egjs-flicking/commit/c68ca12c61ff5261bc5e030911474870334981f9))
* **publish:** 릴리즈 실행 예시 다이어그램 추가 ([a339ff4](https://github.com/naver/egjs-flicking/commit/a339ff4921a0ff467e3184986bc6438dc6c4f440))
* **publish:** 향후 계획 섹션 제거 ([8294539](https://github.com/naver/egjs-flicking/commit/82945393315a00e78a3ddb932a5cef97ac3b515c))
* **publish:** release-helper 대체 이력 제거 ([4cf00ee](https://github.com/naver/egjs-flicking/commit/4cf00ee8dcb565ddc8b7705eaf3b75ad0e972648))
* **publish:** 배포 파이프라인 mermaid 다이어그램 추가 ([0a67006](https://github.com/naver/egjs-flicking/commit/0a67006a742c443ebd0decbaa126988ebab0c5bf))
* **contributing:** pnpm·Biome 기준으로 갱신 ([bc4500b](https://github.com/naver/egjs-flicking/commit/bc4500b5ae2e34de4c086ec5ea42b1a313eba6d4))
* **publish:** 머지 후 publish 순서 문서화 ([72488d6](https://github.com/naver/egjs-flicking/commit/72488d6a2054e2f522f9963174f7751284611ac3))

### :mega: Other
* node 삭제, react strict mode 대응한 모듈 업데이트 (#963) ([e4613d1](https://github.com/naver/egjs-flicking/commit/e4613d1291a0b080220b565f7e4c3ddf39a411a5))
* **publish:** stable 퍼블리시에 pnpm git 검사 활성화 ([44b7f88](https://github.com/naver/egjs-flicking/commit/44b7f8877827d2d1e357c94b4699abbb09392186))

## [4.17.0](https://github.com/naver/egjs-flicking/compare/@egjs/vue3-flicking@4.16.4...4.17.0) (2026-09-01)
### :sparkles: Packages
* `@egjs/flicking` 4.17.0
* `@egjs/react-flicking` 4.17.0
* `@egjs/vue3-flicking` 4.17.0

### :rocket: New Features
* usePercentagePos 옵션 추가 & resize 비동기 사이에 사이즈가 갱신되는 문제 수정 (#957) ([83fce74](https://github.com/naver/egjs-flicking/commit/83fce74db4d465d8d771c272d0f703ce7f7b8ded))

### :memo: Documentation
* **publish:** generalize docs deploy remote note ([a427f8c](https://github.com/naver/egjs-flicking/commit/a427f8cebff6dcd23c77bef42607d945c643a103))
* **publish:** add mandatory docs:deploy step after release ([9541cdd](https://github.com/naver/egjs-flicking/commit/9541cdd08cf3a297ff5aebc17b240f13ce8f0005))

## [4.16.4](https://github.com/naver/egjs-flicking/compare/4.16.3...4.16.4) (2026-07-20)
### :sparkles: Packages
* `@egjs/flicking` 4.16.4
* `@egjs/react-flicking` 4.16.6
* `@egjs/vue3-flicking` 4.16.4

### :bug: Bug Fixes
* restore @egjs/imready dependency range to ^1.3.1 ([51800dc](https://github.com/naver/egjs-flicking/commit/51800dce0e73e125fd0608e45a0db60151211a44))
* build core CJS from index.cjs.ts entry ([ed5d4a9](https://github.com/naver/egjs-flicking/commit/ed5d4a926b34c89ac5d636557e1f64b65bca85ed))

### :memo: Documentation
* **publish:** add deploy workflow role-split principles ([7ab73e3](https://github.com/naver/egjs-flicking/commit/7ab73e35c889ef17a76a2eefb9a1945f59a705e6))
* improve README links and version display ([a1f96b0](https://github.com/naver/egjs-flicking/commit/a1f96b09e573ec67b02c2717b35ae7b915277076))

### :white_check_mark: Tests
* guard core CJS require returns class ([e8218d6](https://github.com/naver/egjs-flicking/commit/e8218d6c716bcbe981eb42b46bc867ef9f134e88))

## [4.16.3](https://github.com/naver/egjs-flicking/compare/4.16.2...4.16.3) (2026-07-09)
### :sparkles: Packages
* `@egjs/flicking` 4.16.3
* `@egjs/react-flicking` 4.16.5
* `@egjs/vue3-flicking` 4.16.3

### :bug: Bug Fixes
* error on insert for unseen panel ([ecc9fb4](https://github.com/naver/egjs-flicking/commit/ecc9fb4afbdd362812bf4496283255f824ba19b3))

### :memo: Documentation
* **guide:** add release-branch & demo-e2e rules ([e4c4a56](https://github.com/naver/egjs-flicking/commit/e4c4a56d0349bf49b40091c8e48a0f513db5e676))

## [4.16.2](https://github.com/naver/egjs-flicking/compare/4.16.1...4.16.2) (2026-07-09)
### :sparkles: Packages
* `@egjs/flicking` 4.16.2
* `@egjs/react-flicking` 4.16.4
* `@egjs/vue3-flicking` 4.16.2

### :rocket: New Features
* **dev:** add demos:local gallery on local core ([cc76aad](https://github.com/naver/egjs-flicking/commit/cc76aadfe718b52bb167e6a2f8a11d3664da06d1))

### :bug: Bug Fixes
* error on removePanel for unseen panel ([5c23cf6](https://github.com/naver/egjs-flicking/commit/5c23cf639ddfb5fc5b810fe26ee0783273d0f9fe))
* **docs:** reactive pagination 모바일 hover 고착 수정 ([8b4b521](https://github.com/naver/egjs-flicking/commit/8b4b521f1aabe17f3d4c2c8eca797ffa8a5b106d))
* **docs:** replace CrossFlicking demo & docs ([5d79815](https://github.com/naver/egjs-flicking/commit/5d798153aa7a0c93d83725f80cb0d095167341b0))

### :memo: Documentation
* **llms:** fix cross-flicking demo description ([e1e3b09](https://github.com/naver/egjs-flicking/commit/e1e3b09a0fe24f1813b8e3a6680429c30fffaae2))
* llms.txt 한글 번역 추가 ([dcebfe5](https://github.com/naver/egjs-flicking/commit/dcebfe58e71ff82f6a2a95b6dfce1cd297f024ca))
* llms 가이드 추가 ([fe3e7b0](https://github.com/naver/egjs-flicking/commit/fe3e7b0af09035a69f8f2e935e166f7ee701a508))
* **publish:** explain gh release note authoring ([50371e8](https://github.com/naver/egjs-flicking/commit/50371e828cf942b7a48326a1de3fecca3bbb0e2f))
* **publish:** note plugin bump + pnpm install ([f74ab2c](https://github.com/naver/egjs-flicking/commit/f74ab2cc505b56b52b708558fe3d8f4f3af105af))

### :white_check_mark: Tests
* **e2e:** drop orphaned advanced specs ([a253e9b](https://github.com/naver/egjs-flicking/commit/a253e9b7ad9e15812bd346dd7c045b4c9f5496e1))
* **e2e:** rewrite cross-flicking spec ([82e526d](https://github.com/naver/egjs-flicking/commit/82e526d4c40314f4b8354deb11e9bf2d5561ca29))

### :mega: Other
* **release:** make tag creation idempotent ([6a866e3](https://github.com/naver/egjs-flicking/commit/6a866e356e60b96507bf444dd23ab8b966f69721))
* **ci:** fix broken test workflow for pnpm monorepo ([78f21db](https://github.com/naver/egjs-flicking/commit/78f21db2525426b7b9b0fe66730eccafdc4b7ece))
* **ci:** fix broken test workflow for pnpm monorepo ([3aed054](https://github.com/naver/egjs-flicking/commit/3aed05436d670a73bc0a10aeed40a14a4a2a8697))
* **dev:** 마이그레이션 검증용 plugin-check 정리 ([dc1ecaf](https://github.com/naver/egjs-flicking/commit/dc1ecafc8af385747f27993dff9801914e78b69a))
* **docs:** reactive로 대체된 미사용 advanced 데모 제거 ([1a3cf7b](https://github.com/naver/egjs-flicking/commit/1a3cf7ba14e4c7c48249fd9cca2a6cb63f9a56ce))

## [4.16.1](https://github.com/naver/egjs-flicking/compare/4.16.0...4.16.1) (2026-06-26)
### :sparkles: Packages
* `@egjs/flicking` 4.16.1
* `@egjs/flicking-plugins` 4.8.1
* `@egjs/react-flicking` 4.16.3
* `@egjs/vue3-flicking` 4.16.1

### :bug: Bug Fixes
* **build:** down-level bundles to es2015 ([c1341c5](https://github.com/naver/egjs-flicking/commit/c1341c51afbb06aa6a3616bb00bcddd161662a74))
* **docs:** publish .nojekyll on gh-pages deploy ([349712d](https://github.com/naver/egjs-flicking/commit/349712d498ccadaf1447d48a8e3feb96ae2e3134))

## [4.16.0](https://github.com/naver/egjs-flicking/compare/4.15.0...4.16.0) (2026-06-26)
### :sparkles: Packages
* `@egjs/flicking` 4.16.0
* `@egjs/flicking-plugins` 4.8.0
* `@egjs/react-flicking` 4.16.2
* `@egjs/vue3-flicking` 4.16.0

### :memo: Documentation
* add current api docs ([07a9353](https://github.com/naver/egjs-flicking/commit/07a9353bc6d7d253670d574b9bad3385468aba95))

### :house: Code Refactoring
* migrate to pnpm monorepo with DX and docs improvements ([ad5e457](https://github.com/naver/egjs-flicking/commit/ad5e4576dd825d4f5dd9b0b005df90605e2e933e))

### :mega: Other
* change vue 3 demo to composition api (#942) ([60236d1](https://github.com/naver/egjs-flicking/commit/60236d17ccada1b65863cbd8b32a03caa438c34b))
* replace release-helper with custom release script ([d819bb7](https://github.com/naver/egjs-flicking/commit/d819bb72b04cf73febe600f5ec683c0ded71d449))
* restructure publish pipeline ([a4da55c](https://github.com/naver/egjs-flicking/commit/a4da55c50020e84e0e351309e53662d48b53c2cf))

