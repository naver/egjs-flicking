---
name: release
description: 정식 배포 파이프라인 전체 실행 — 버전 결정 → 검증 → 릴리즈 PR → master 머지 → npm publish → 태그·GitHub Release → 문서 배포. 중단된 릴리즈는 재개 지점을 판별해 이어서 진행한다.
disable-model-invocation: true
argument-hint: "[patch|minor|major] [react|vue|plugins]"
---

$ARGUMENTS 기준으로 정식 배포를 끝까지 진행한다.

버전 정책·배포 원칙·명령어 레퍼런스는 @dev-guide/PUBLISH_GUIDE.md 를 따른다. 이 스킬은 그 절차의 실행기다.
절차 전체 그림과 재개 판단 트리는 그 문서의 "배포 절차"·"중단과 재개" 다이어그램에 있다.

**순서 원칙**: 되돌릴 수 없는 npm publish를 master 머지 뒤에 둔다. 태그·GitHub Release는 publish 성공 뒤에 만든다. `release:finalize`가 이 순서를 강제하므로 우회하지 않는다.

**베타 배포에는 이 스킬을 쓰지 않는다.** → PUBLISH_GUIDE.md "베타 배포"

## 0. 상태 판별 (항상 먼저)

```bash
pnpm -s release:status --json --fetch    # 패키지 단독 릴리즈면 --package {react|vue|plugins} 추가
```

`--fetch`로 정본 master를 먼저 받아오므로 `baseBehind`가 최신 기준으로 계산된다.

**게이트 (하나라도 걸리면 멈추고 사용자에게 알린다)**

- `nextStep`이 `npm-login` → 별도 터미널에서 `npm login`을 요청하고 `npm whoami`가 통과한 뒤에만 재개한다.
- `ghAuth`가 false → `gh auth login`을 요청한다. PR·CI 확인·릴리즈 생성에 모두 필요하다.
- `canonicalRemote`가 null → 정본을 가리키는 remote가 없다. `git remote add upstream https://github.com/naver/egjs-flicking.git`를 안내한다.
- `clean`이 false → `dirtyFiles`를 보여주고 커밋·스태시를 요청한다. 릴리즈와 무관한 변경이 섞인 채로 진행하지 않는다.
- `pushed`가 false → 현재 브랜치에 미푸시 커밋이 있다. 그 작업이 이번 릴리즈 대상이면 **먼저 PR로 올려 머지**한 뒤 릴리즈를 시작한다. 릴리즈와 무관하면 브랜치를 옮긴다.

**환경에 따라 달라지는 것**

- `baseBehind`가 0이 아니면 현재 HEAD가 정본 master보다 뒤처져 있다. `null`이면 fetch 전이라 판단 불가다. 어느 쪽이든 릴리즈 브랜치는 항상 정본 master 최신에서 새로 만든다(2단계).
- `isFork`가 true면 fork 클론이다. 브랜치는 `pushRemote`(fork)로 push하고 PR head는 `prHead`(`{owner}:{branch}`)를 쓴다.
- `canPushCanonical`이 false면 정본에 write 권한이 없다. **PR 생성까지만 진행하고 머지·publish는 권한자에게 요청**한다. 이후 단계를 임의로 진행하지 않는다.

`stage`가 재개 지점이다. 해당 단계부터 이어서 실행한다.

| stage | 시작할 단계 |
|-------|------------|
| `released` | 이 버전은 이미 끝났다 → 새 릴리즈로 보고 1부터. 문서 배포만 남았다면 6만 실행 |
| `bump` | 1 |
| `prepare` | 2 |
| `merge` | 3 |
| `publish` | 4 |
| `finalize` | 5 |

## 1. 버전 결정

- 직전 태그 이후 커밋을 읽는다: `git log {prevTag}..HEAD --no-merges --pretty=format:"%s"`
- 인자에 bump 타입이 있으면 그대로 쓰고, 없으면 커밋으로 제안한다 (BREAKING → major / feat 포함 → minor / fix·chore만 → patch). 제안한 버전을 사용자에게 알린 뒤 진행한다.
- **코어 릴리즈**: `packages/flicking/package.json`의 version을 직접 수정 → `pnpm publish:version {bump}`로 래퍼 동기화.
- **패키지 단독 릴리즈**: 해당 package.json version만 수정한다 (`publish:version`을 쓰지 않는다).
- 플러그인은 자동 동기화 대상이 아니다. 함께 배포할지 사용자에게 확인한다.

## 2. 릴리즈 브랜치 + prepare

```bash
REMOTE=$(node config/release.js remote)
git fetch $REMOTE master
git checkout -b release/{scope}-{version} $REMOTE/master    # scope: core|react|vue|plugins
pnpm release:prepare                                          # pnpm install → CHANGELOG → 릴리즈 커밋
```

브랜치는 **정본 master 최신에서** 만든다. 현재 브랜치에서 그냥 분기하면 머지되지 않은 작업이 릴리즈에 섞인다.

취합할 PR이 따로 있으면 브랜치 생성 직후 `--no-ff`로 머지한다 (PUBLISH_GUIDE "릴리즈 브랜치 취합").

머지 전 로컬 검증 — 테스트는 PR CI가 돌리므로, 여기서는 CI가 못 잡는 **배포 산출물**을 확인한다:

```bash
pnpm lint
pnpm publish:build
pnpm --filter {래퍼} pack --pack-destination /tmp    # 래퍼 tarball의 @egjs/flicking 의존이 ~{코어버전}인지 확인
```

전체 스위트를 로컬에서 돌려야 하면 `/release-check`를 쓴다.

## 3. PR → CI → master 머지

```bash
# 브랜치를 먼저 push한다 (push 없이 gh pr create를 실행하면 비대화형에서 실패한다)
git push -u {status.pushRemote} release/{scope}-{version}

# --repo·--head를 명시한다 (fork 클론에서 base 저장소가 엉뚱하게 잡히는 것을 막는다)
PR=$(gh pr create --repo naver/egjs-flicking --base master --head {status.prHead} \
  --title "chore(release): Release {version}" --body "{변경 요약 + Closes #A #B}")

gh pr checks "$PR" --watch
gh pr merge "$PR" --merge     # squash 금지 — 릴리즈 커밋 SHA를 보존해야 태그가 정확해진다
git checkout master && git pull $(node config/release.js remote) master
```

- `--body`는 필수다. 없으면 비대화형에서 실패한다.
- 취합한 PR이 있으면 본문에 `Closes #A #B`를 넣는다. 취합 PR을 수동으로 close하지 않는다.
- CI 실패 시 릴리즈 브랜치에서 고치고 다시 PR CI를 통과시킨다. master 머지 전에는 아무것도 게시되지 않았으므로 안전하다.
- `canPushCanonical`이 false면 여기서 멈춘다. PR 링크를 사용자에게 전달하고 머지·publish는 권한자에게 요청한다.

## 4. npm publish (확인 게이트)

publish 전에 `pnpm -s release:status --json --fetch`를 다시 실행해 **`stage`가 `publish`이고 `pushed`가 true**인지 확인한다. `pushed`가 false면 릴리즈 커밋이 GitHub에 없는 상태이므로(로컬 머지 등) 게시하지 않고 3단계로 돌아간다.

그 뒤 사용자에게 한 번 확인받는다. 확인 항목만 제시하고 질문은 1회로 끝낸다:

- 게시 대상 패키지와 버전
- npm 계정 (`npm whoami`)
- dist-tag가 `latest`라는 점 (베타 아님)

확인 후 어시스턴트가 직접 실행한다:

```bash
pnpm publish:stable                  # 코어 릴리즈 (전체)
pnpm publish:stable:{pkg}            # 패키지 단독 릴리즈
```

`publish:stable*`은 git 검사를 켠 채 실행되므로 더티 트리(`ERR_PNPM_GIT_UNCLEAN`)·master 아닌 브랜치·원격보다 뒤처진 상태에서는 스크립트가 스스로 중단한다. **`--no-git-checks`를 붙여 우회하지 않는다.**

**부분 실패 처리**: 이미 게시된 버전은 재게시할 수 없다. 실패한 패키지만 같은 버전으로 `pnpm publish:stable:{pkg}`를 재실행한다. 버전을 새로 올리지 않는다.

## 5. 태그 + GitHub Release

릴리즈 노트에 하이라이트·breaking change·deprecate 안내가 필요하면 **저장소 밖**(스크래치패드)에 초안을 쓰고 사용자 확인을 받는다. 없으면 자동 생성만 쓴다.

```bash
pnpm release:finalize                              # 자동 생성 노트만
pnpm release:finalize --notes-file {초안 경로}      # 직접 작성 + 자동 PR 목록
```

`finalize`는 npm 게시 여부를 먼저 확인하고, 게시되지 않았으면 중단한다. 그 에러가 나면 4단계로 돌아간다.

push는 `.husky/pre-push`의 `biome check packages/`를 통과해야 한다. 여기서 막히면 lint를 고친 뒤 `finalize`를 다시 실행한다 (이미 만든 태그는 건너뛰므로 재실행이 안전하다).

## 6. 문서 사이트 배포

```bash
pnpm docs:deploy:auto        # 정본을 가리키는 remote를 자동 판별해 배포
```

GitHub Release 본문이 문서 사이트 `/releases`로 반영되므로 **릴리즈 후 필수**다. → DOCS_GUIDE.md

## 7. 보고

버전, 게시된 패키지 목록, GitHub Release URL, 문서 사이트 배포 결과를 정리해 보고한다.

## 하지 않는 것

- `npm login` / `gh auth login` 대행 (대화형 — 사용자가 직접)
- 게시 실패 시 버전 올려 재시도 (같은 버전으로 재개한다)
- `finalize` 실패를 우회하는 수동 `git tag` / `gh release create`
- 릴리즈 노트 초안을 저장소 안에 파일로 남기기
