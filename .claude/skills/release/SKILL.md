---
name: release
description: 정식 배포 파이프라인 전체 실행 — 취합 PR 선택 → 릴리즈 브랜치 취합 → 버전 결정 → 검증 → 릴리즈 PR → master 머지 → npm publish → 태그·GitHub Release → 문서 배포. 중단된 릴리즈는 재개 지점을 판별해 이어서 진행한다.
disable-model-invocation: true
argument-hint: "[patch|minor|major] [react|vue|plugins] [#PR ...]"
---

$ARGUMENTS 기준으로 정식 배포를 끝까지 진행한다.

버전 정책·배포 원칙·명령어 레퍼런스는 @dev-guide/PUBLISH_GUIDE.md 를 따른다. 이 스킬은 그 절차의 실행기다.
절차 전체 그림과 재개 판단 트리는 그 문서의 "배포 절차"·"중단과 재개" 다이어그램에 있다.

**순서 원칙**: 되돌릴 수 없는 npm publish를 master 머지 뒤에 둔다. 태그·GitHub Release는 publish 성공 뒤에 만든다. `release:finalize`가 이 순서를 강제하므로 우회하지 않는다.

**취합 원칙**: 머지 대기 PR은 master에 따로 먼저 머지하지 않고 릴리즈 브랜치에 모은다. 취합은 버전 결정·`release:prepare`보다 먼저다.

**패키지 단독 릴리즈**는 `release:*` 명령마다 `--package {react|vue|plugins}`를 붙인다.

**베타 배포에는 이 스킬을 쓰지 않는다.** → PUBLISH_GUIDE.md "베타 배포"

## 0. 상태 판별 (항상 먼저)

```bash
pnpm -s release:status --json --fetch
```

`--fetch`로 정본 master를 먼저 받아오므로 `baseBehind`가 최신 기준으로 계산된다.

**게이트 (하나라도 걸리면 멈추고 사용자에게 알린다)**

- `nextStep`이 `npm-login` → 별도 터미널에서 `npm login`을 요청하고 `npm whoami`가 통과한 뒤에만 재개한다.
- `ghAuth`가 false → `gh auth login`을 요청한다. PR·CI 확인·릴리즈 생성에 모두 필요하다.
- `canonicalRemote`가 null → 정본을 가리키는 remote가 없다. `git remote add upstream https://github.com/naver/egjs-flicking.git`를 안내한다.
- `clean`이 false → `dirtyFiles`를 보여주고 커밋·스태시를 요청한다. 릴리즈와 무관한 변경이 섞인 채로 진행하지 않는다.
- 새 릴리즈를 시작하는데(`stage`가 `bump`·`released`이고 현재 브랜치가 `release/*`가 아님) `pushed`가 false → 현재 브랜치에 미푸시 커밋이 있다. 이번 릴리즈 대상인지 묻는다.
  - 대상이면 push해 PR을 연 뒤 1단계에서 취합 대상으로 고른다. master에 따로 먼저 머지하지 않는다.
  - 무관하면 그대로 진행한다. 2단계에서 정본 master로부터 새로 분기하므로 섞이지 않는다.
  - 재개 중인 릴리즈 브랜치는 이 게이트에서 제외한다. push는 5단계에서 하므로 그 전에는 미푸시가 정상이다.

**환경에 따라 달라지는 것**

- `baseBehind`가 0이 아니면 현재 HEAD가 정본 master보다 뒤처져 있다. `null`이면 fetch 전이라 판단 불가다. 어느 쪽이든 릴리즈 브랜치는 항상 정본 master 최신에서 새로 만든다(2단계).
- `isFork`가 true면 fork 클론이다. 브랜치는 `pushRemote`(fork)로 push하고 PR head는 `prHead`(`{owner}:{branch}`)를 쓴다.
- `canPushCanonical`이 false면 정본에 write 권한이 없다. **PR 생성까지만 진행하고 머지·publish는 권한자에게 요청**한다. 이후 단계를 임의로 진행하지 않는다.

`stage`가 재개 지점이다. 해당 단계부터 이어서 실행한다.

| stage | 시작할 단계 |
|-------|------------|
| `released` | 현재 버전은 이미 끝났다 → 새 릴리즈로 보고 1부터. 현재 브랜치가 이미 `release/*`면 취합까지 끝난 상태다 → 3. 문서 배포만 남았다면 8만 실행 |
| `bump` | `released`와 같은 규칙 |
| `prepare` | 4의 `release:prepare`부터 (버전 범프는 끝났다) |
| `merge` | 5 |
| `publish` | 6 |
| `finalize` | 7 |

## 1. 취합할 PR 선택

```bash
gh pr list --repo naver/egjs-flicking --base master --state open \
  --json number,title,headRefName,headRepositoryOwner,isDraft,reviewDecision
```

- 인자에 PR 번호(`#960`)가 있으면 그대로 쓰고 묻지 않는다.
- 없으면 목록을 보여주고 한 번 묻는다. 복수 선택이며, "없음"(master에 이미 있는 것만 릴리즈)도 고를 수 있다.
  - draft 여부와 리뷰 승인 상태(`reviewDecision`)를 함께 보여준다.
- 열린 PR이 없으면 묻지 않고 2단계로 간다.
- 고르지 않은 PR은 건드리지 않는다. 다음 릴리즈에서 다시 후보가 된다.

## 2. 릴리즈 브랜치 + 취합

```bash
REMOTE=$(node config/release.js remote)
git fetch $REMOTE master
git checkout -b release/{scope}-next $REMOTE/master    # scope: core|react|vue|plugins

# 1단계에서 고른 PR마다 (fork PR도 pull/{N}/head로 받는다)
git fetch $REMOTE pull/{N}/head
git merge --no-ff FETCH_HEAD -m "Merge pull request #{N} from {headRepositoryOwner}/{headRefName}"
```

- 브랜치는 **정본 master 최신에서** 만든다.
  - 현재 브랜치에서 분기하면 고르지 않은 작업이 릴리즈에 섞인다.
- 이름은 임시(`-next`)로 두고 4단계에서 버전으로 확정한다.
  - 버전은 취합 결과로 정하므로(3단계) 이 시점에는 이름에 쓸 버전이 없다. push 전이라 이름 변경 비용도 없다.
- `--no-ff`로 머지한다.
  - PR 커밋 SHA가 보존되어야 5단계 master 머지 때 원본 PR이 "Merged"로 자동 종료된다.
- 머지 메시지를 `-m`으로 명시한다.
  - 기본 메시지는 임시 브랜치 이름을 이력에 영구히 남긴다.
- 충돌이 나면 `git merge --abort` 후 멈추고 사용자에게 알린다. 해소 방식은 코드 판단이므로 임의로 풀지 않는다.
- 취합을 모두 마친 뒤에 3단계로 간다.
  - `release:prepare`는 실행 시점의 `git log {prevTag}..HEAD`로 CHANGELOG를 만든다. prepare 뒤에 머지한 PR은 게시본에는 들어가지만 CHANGELOG에서는 에러 없이 빠진다.

## 3. 버전 결정

```bash
pnpm -s release:status --json              # 취합 후 HEAD 기준으로 다시 읽는다
git log {tag}..HEAD --no-merges --pretty=format:"%s"
```

- 기준은 `tag`(현재 버전의 태그 = 직전 릴리즈)다. `prevTag`를 쓰지 않는다.
  - `prevTag`는 현재 버전보다 낮은 태그 중 최신이다. 범프 전에는 직전 릴리즈보다 한 단계 앞을 가리키므로, 이미 게시된 커밋까지 섞여 bump가 높게 잡힌다.
- 범프 후 `release:prepare`는 이 `tag`를 prevTag로 삼는다. 따라서 이 범위가 CHANGELOG에 쓰이는 범위와 같고, 취합한 PR의 커밋도 여기 들어간다.
- 인자에 bump 타입이 있으면 그대로 쓰고, 없으면 커밋으로 제안한다 (BREAKING → major / feat 포함 → minor / fix·chore만 → patch). 제안한 버전을 사용자에게 알린 뒤 진행한다.
- 플러그인은 자동 동기화 대상이 아니다. 함께 배포할지 사용자에게 확인한다.

## 4. 버전 범프 + prepare

```bash
git branch -m release/{scope}-{version}    # 3단계에서 정한 버전으로 이름 확정
```

- **코어 릴리즈**: `packages/flicking/package.json`의 version을 직접 수정 → `pnpm publish:version {bump}`로 래퍼 동기화.
- **패키지 단독 릴리즈**: 해당 package.json version만 수정한다 (`publish:version`을 쓰지 않는다).

```bash
pnpm release:prepare                       # pnpm install → CHANGELOG → 릴리즈 커밋
```

머지 전 로컬 검증 — 테스트는 PR CI가 돌리므로, 여기서는 CI가 못 잡는 **배포 산출물**을 확인한다:

```bash
pnpm lint
pnpm publish:build
pnpm --filter {래퍼} pack --pack-destination /tmp    # 래퍼 tarball의 @egjs/flicking 의존이 ~{코어버전}인지 확인
```

전체 스위트를 로컬에서 돌려야 하면 `/release-check`를 쓴다.

## 5. PR → CI → master 머지

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
- 1단계에서 고른 PR을 본문에 `Closes #A #B`로 넣는다. 취합 PR을 수동으로 close하지 않는다.
- CI 실패 시 릴리즈 브랜치에서 고치고 다시 PR CI를 통과시킨다. master 머지 전에는 아무것도 게시되지 않았으므로 안전하다.
- `canPushCanonical`이 false면 여기서 멈춘다. PR 링크를 사용자에게 전달하고 머지·publish는 권한자에게 요청한다.

## 6. npm publish (확인 게이트)

publish 전에 `pnpm -s release:status --json --fetch`를 다시 실행해 **`stage`가 `publish`이고 `pushed`가 true**인지 확인한다. `pushed`가 false면 릴리즈 커밋이 GitHub에 없는 상태이므로(로컬 머지 등) 게시하지 않고 5단계로 돌아간다.

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

## 7. 태그 + GitHub Release

릴리즈 노트는 **매번 직접 작성한다.** 자동 생성 PR 목록만으로 끝내지 않는다 (이 레포의 기존 릴리즈는 모두 Highlights를 갖고 있다).

```bash
# 1) 뼈대 생성 — Packages 표는 채워져 나오고, 작성 근거로 CHANGELOG 섹션이 출력된다
pnpm release:notes --out {스크래치패드}/release-notes.md

# 2) Highlights를 채운 뒤 사용자 확인을 받고 전달
pnpm release:finalize --notes-file {스크래치패드}/release-notes.md
```

초안 작성 규칙:

- 근거는 `release:notes`가 출력한 CHANGELOG 섹션 + `git log {prevTag}..HEAD` + 해당 PR 본문이다. 근거 없는 내용을 쓰지 않는다.
- **Highlights는 커밋 제목 나열이 아니라 사용자 영향 서술이다.** 항목마다 "무엇이 바뀌었나 — 왜 중요한가 (#PR)" 형태로 쓴다.
- breaking change·deprecate가 없으면 해당 섹션을 지운다. 있으면 마이그레이션 방법을 한 줄이라도 적는다.
- 초안은 **저장소 밖**(스크래치패드)에 둔다. 커밋하지 않는다.
- `finalize`가 `--generate-notes`를 함께 넘기므로 자동 PR 목록은 본문 아래에 결합된다.
- `--notes-file` 없이 `finalize`를 실행하면 CHANGELOG 섹션이 본문으로 들어간다. 이는 수동 실행용 안전망이며, 스킬 경로에서는 항상 초안을 만든다.

`finalize`는 npm 게시 여부를 먼저 확인하고, 게시되지 않았으면 중단한다. 그 에러가 나면 6단계로 돌아간다.

push는 `.husky/pre-push`의 `biome check packages/`를 통과해야 한다. 여기서 막히면 lint를 고친 뒤 `finalize`를 다시 실행한다 (이미 만든 태그는 건너뛰므로 재실행이 안전하다).

## 8. 문서 사이트 배포

```bash
pnpm docs:deploy:auto        # 정본을 가리키는 remote를 자동 판별해 배포
```

GitHub Release 본문이 문서 사이트 `/releases`로 반영되므로 **릴리즈 후 필수**다. → DOCS_GUIDE.md

## 9. 보고

버전, 취합한 PR 목록, 게시된 패키지 목록, GitHub Release URL, 문서 사이트 배포 결과를 정리해 보고한다.

## 하지 않는 것

- `npm login` / `gh auth login` 대행 (대화형 — 사용자가 직접)
- 릴리즈 대상 PR을 master에 개별로 먼저 머지하기 (릴리즈 브랜치에 취합한다)
- 취합 충돌을 임의로 해소하기
- 게시 실패 시 버전 올려 재시도 (같은 버전으로 재개한다)
- `finalize` 실패를 우회하는 수동 `git tag` / `gh release create`
- 릴리즈 노트 초안을 저장소 안에 파일로 남기기
