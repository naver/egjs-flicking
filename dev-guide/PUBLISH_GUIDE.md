# 퍼블리시 & 버전 관리 가이드

## 릴리즈 브랜치 취합

여러 PR이 master를 타겟으로 열려 있을 때, 개별 PR을 master에 직접 머지하지 않고 **하나의 릴리즈 브랜치에 모아 검증한 뒤 master에 단일 반영**한다. 버전 범프와 changelog도 이 브랜치에 포함한다.

### 브랜치명 컨벤션

```
release/{scope}-{version}
```

- `scope`: 릴리즈를 주도하는 패키지 — `core` | `react` | `vue` | `plugins`
- `version`: 목표 버전
- 예: `release/core-4.16.2`
- 취합하는 동안은 `release/{scope}-next`로 두고, 버전을 정한 뒤 `git branch -m`으로 이름을 확정한다. 버전은 취합 결과로 정하기 때문이다.

### 절차

1. 이번 릴리즈에 넣을 PR을 고른다. 고르지 않은 PR은 열어둔 채 다음 릴리즈를 기다린다
2. 정본 master 최신에서 릴리즈 브랜치 생성 (`git checkout -b release/core-next {remote}/master`)
3. 고른 각 PR을 `--no-ff`로 머지 (SHA 보존 — 원본 PR 자동 종료에 필요)
4. 취합된 HEAD의 커밋으로 버전을 정하고, 브랜치 이름을 확정한 뒤 버전을 변경한다
5. `pnpm release:prepare`로 changelog·릴리즈 커밋을 만든다
6. 릴리즈 브랜치에서 검증 (lint·빌드·pack, 필요 시 `/release-check`로 전체 스위트)
7. 릴리즈 브랜치 → master PR을 열고, 본문에 `Closes #A #B …`로 취합한 PR을 명시
8. PR CI 통과 후 **merge commit으로** master에 머지 → 취합된 PR들이 "Merged"로 자동 종료
9. 이후 아래 [배포 절차](#배포-절차)로 퍼블리시

브랜치가 실제로 어떻게 만들어지고 합쳐지는지 → [실행 예시](#실행-예시)

> **취합은 버전 결정·`release:prepare`보다 먼저 한다.** prepare는 실행 시점의 `git log {prevTag}..HEAD`로 CHANGELOG를 만든다. 그 뒤에 머지한 PR은 게시본에는 들어가지만 CHANGELOG에서는 에러 없이 빠진다. 버전도 취합 전 커밋만 보고 정하면 대기 PR의 feat가 빠져 bump가 낮게 잡힌다.

> 취합한 PR을 **수동으로 close하지 않는다.** `Closes` + SHA 보존 머지(`--no-ff`)로 두면 master 머지 시 "Merged"로 자동 종료되어 이력이 깔끔하다. 수동 close는 "Closed"로 남아 병합 이력이 흐려진다.

> **릴리즈 PR에 squash 머지를 쓰지 않는다.** 릴리즈 커밋 SHA가 바뀌면 태그가 게시본과 다른 커밋을 가리키게 되고, 취합한 PR의 자동 종료도 깨진다.

## 배포 진행 원칙

### 순서: 머지 후 publish

되돌릴 수 없는 단계를 파이프라인 맨 뒤에 둔다.

```
PR 취합 → 버전 범프 → release:prepare → PR·CI → master 머지 → npm publish → release:finalize → docs 배포
```

- npm 버전 번호는 회수할 수 없고 git 커밋은 되돌릴 수 있다. 실패 비용이 싼 쪽을 먼저 실행한다.
- 게시된 tarball이 master에 실재하는 커밋과 1:1로 대응하므로 태그·릴리즈 노트의 대상이 명확해진다.
- 태그와 GitHub Release는 publish 성공 뒤에만 만든다. `release:finalize`가 npm 레지스트리를 조회해 이 순서를 강제한다.
- publish 단계에서 실패해도 아직 게시된 것이 없으므로 **같은 버전으로 재시도**한다. 일부만 게시됐다면 실패한 패키지만 같은 버전으로 다시 올린다 (게시된 버전은 재게시 불가).

정식 배포 스크립트(`publish:stable*`)는 pnpm의 git 검사를 켠 상태로 실행한다. 이 순서를 사람이 기억하지 않아도 되도록 스크립트가 막는다:

| 검사 | 위반 시 |
|------|---------|
| 작업 트리 clean | `ERR_PNPM_GIT_UNCLEAN` — 즉시 중단 |
| 현재 브랜치 == `publish-branch`(`.npmrc`에 `master` 명시) | 계속할지 확인 프롬프트, 비대화형이면 중단 |
| 원격 이력 동기 | `ERR_PNPM_GIT_NOT_LATEST` — 원격이 앞서 있으면 중단 |

- 로컬이 원격보다 **앞선**(미푸시) 경우는 pnpm이 잡지 않는다. `/release` 스킬이 publish 직전 `release:status`의 `pushed`로 막는다.
- 베타(`publish:beta*`)는 `--no-git-checks`를 유지한다. 릴리즈 브랜치에서 미커밋 버전 범프로 게시하므로 검사에 걸린다.

### 역할 분담

1. **npm 로그인 확인이 최우선 게이트.**
   - 어떤 배포 작업이든 시작 전에 `npm whoami`로 로그인 여부를 먼저 확인한다.
   - 로그인이 안 되어 있으면(**401**) **다른 배포 작업을 일절 진행하지 않고**, 사용자에게 `npm login`(별도 터미널)을 요청한다. 인증은 `~/.npmrc`에 저장되어 현재 세션에도 반영된다.
   - `npm whoami`로 로그인이 확인된 뒤에만 다음 단계로 넘어간다.
2. **사전 단계는 어시스턴트가 전부 완료한다.**
   - 고른 PR 취합 → 버전 범프 → `release:prepare` → 빌드·`release:pack-check`(게시 파일·크기·workspace 의존 치환) → PR 생성·CI 확인·master 머지까지 진행한다.
3. **publish는 사용자 확인 1회 후 어시스턴트가 실행한다.**
   - 게시 대상 패키지·버전·npm 계정·dist-tag, `release:pack-check` 결과를 제시하고 승인을 받는다. 승인 없이 실행하지 않는다.
   - **OTP(`--otp`)는 다루지 않는다.** 2FA는 로그인 단계에서 처리되며 `publish` 시 OTP 입력을 요구하지 않는다.
4. **태그·릴리즈·문서 배포는 승인 없이 이어서 진행한다.** 되돌릴 수 있는 단계다.

> 전체 파이프라인은 `/release` 스킬이 수행한다. 상태 판별·재개 규칙 포함 → `.claude/skills/release/SKILL.md`, [HARNESS_GUIDE.md](HARNESS_GUIDE.md)

### 게시 파일 점검

publish 전에 `pnpm release:pack-check`로 **실제로 게시될 tarball**을 npm `latest` 게시본과 비교한다.

- 파일 수·크기 변화와 추가·제거 파일 목록을 출력한다. 크기가 10% 이상 바뀌면 경고한다.
  - 패키지별 최근 정식 게시본 6개의 연속 버전 간 최대 변화는 +7.0%(plugins 4.6.0 → 4.7.0)다.
- 아래가 나오면 실패한다. publish하지 않고 원인을 없앤다.
  - 게시 금지 파일: `node_modules/` · `.env*` · lockfile · `.DS_Store` · `*.tgz` · 최상위 `dev/`·`coverage/`
  - `workspace:` 의존이 로컬 버전으로 치환되지 않은 경우 (예: 래퍼의 `@egjs/flicking`이 `~{코어 버전}`이 아님)
- 게시본은 publish하는 **작업 디렉토리 상태**로 만들어진다. git 상태와는 별개다.
  - `.gitignore`에 걸린 옛 빌드 산출물은 pnpm의 git clean 검사도, `release:status`의 `clean`도 잡지 못한다.
  - 실제 사례: react-flicking 4.17.0·4.17.1에 현재 빌드가 만들지 않는 `declaration/` 13개가 게시됐다 (게시자 로컬의 옛 산출물). `.env`는 git 추적 파일이라 매 버전 게시되고 있었다.
- `pnpm pack --dry-run`이 아니라 실제로 pack한다.
  - dry-run 목록에는 pnpm이 루트에서 복사하는 LICENSE가 빠진다 (flicking·vue3-flicking).
  - `workspace:` 치환 결과는 tarball 안의 `package.json`에서만 확인할 수 있다.
- 빌드 산출물을 보므로 `pnpm publish:build` 뒤에 실행한다.

### CI 대기 생략 (취합 0건)

릴리즈 PR의 CI는 기다리는 것이 원칙이다. 다만 아래 조건을 모두 만족하면 `/release`는 `gh pr checks --watch` 없이 머지한다. 판정은 `node config/release.js can-skip-ci`가 한다.

- 릴리즈 브랜치가 정본 master 최신 위의 릴리즈 커밋 1개뿐이다 (취합한 PR 없음, 베이스 최신).
- 릴리즈 커밋은 공개 패키지 `package.json`의 `version`과 `CHANGELOG.md`만 바꿨다. `pnpm-lock.yaml`이 바뀌면 생략하지 않는다.
- 그 master 커밋의 CI(check runs)가 모두 통과했다.

이 조건이면 PR CI가 돌리는 코드는 master에서 이미 통과한 코드와 같다.

- 4.17.1 사례: #960이 master에 먼저 머지된 뒤 릴리즈 브랜치에는 릴리즈 커밋만 있었다. PR CI 약 6분(e2e 363초)이 같은 코드를 한 번 더 검증했다.
- PR을 취합했으면 합친 코드를 처음 검증하는 곳이 릴리즈 PR CI다. 그래서 이 경우는 생략하지 않는다.
- 브랜치·PR·merge commit은 생략하지 않는다. 태그가 가리킬 릴리즈 커밋 SHA와 재개 판정(`stage`)이 이 구조에 의존한다.

## 빠른 시작

### 사전 준비 (최초 1회)

`/release`는 0단계에서 아래 세 가지를 검사하고, 빠진 것이 있으면 이 섹션을 안내하며 멈춘다 (`release:status`의 `nextStep`이 `npm-login` · `gh-install` · `gh-login`).

1. **npm 로그인** — `@egjs` scope에 publish 권한이 있는 계정으로 로그인
   ```bash
   npm login
   ```
2. **gh CLI 설치** — [GitHub CLI](https://cli.github.com/) 설치 후 인증. PR·CI 확인·GitHub Release에 모두 필요하다.
   ```bash
   brew install gh
   gh auth login
   gh auth status     # "Logged in to github.com"이 나오면 완료
   ```
3. **정본 remote 확인** — 아래가 remote 이름을 출력하지 못하면 정본을 가리키는 remote를 추가한다.
   ```bash
   node config/release.js remote        # 예: origin | upstream
   git remote add upstream https://github.com/naver/egjs-flicking.git
   ```

### 배포 절차

**`/release` 스킬을 실행하면 아래 전 과정이 순서대로 진행된다.**

```mermaid
flowchart TD
    A([/release 실행]) --> B["0 · release:status --fetch"]
    B --> G1{"프리플라이트 통과?"}
    G1 -->|아니오| STOP([중단 · 사용자 조치 요청])
    G1 -->|예| S1

    S1[/"1 · 취합할 PR 선택<br/>열린 PR이 있으면 1회 질문"/] --> S2

    subgraph BR["① 릴리즈 브랜치 · 되돌릴 수 있음"]
        direction TB
        S2["2 · 정본 master 최신에서 분기<br/>고른 PR을 --no-ff로 취합"] --> S3["3 · 버전 결정 · 1회 확인<br/>취합된 HEAD의 커밋 기준"] --> S4["4 · 이름 확정 · 버전 범프<br/>release:prepare"] --> S4V["검증<br/>lint · build · pack-check"]
    end

    S2 -.->|충돌| STOP
    S4V -.->|게시 금지 파일| STOP
    S4V --> S5

    subgraph GH["② GitHub · 되돌릴 수 있음"]
        direction TB
        S5["5 · push → PR → CI<br/>본문에 Closes #A #B<br/>취합 0건이면 대기 생략 가능"] --> S5M["merge commit으로 master 반영<br/>squash 금지"]
    end

    S5M --> S6P["pack-check 재실행<br/>master 체크아웃 기준"] --> G2{"승인 게이트 · 1회"}
    G2 -->|거부| STOP
    G2 -->|승인| S6

    subgraph NPMZ["③ npm · 되돌릴 수 없음"]
        S6["6 · publish:stable"]
    end

    S6 --> S7

    subgraph POST["④ 게시 이후 · 되돌릴 수 있음"]
        direction TB
        S7["7 · 릴리즈 노트 작성 + release:finalize<br/>게시 검증 → 태그 → GitHub Release"] --> S8["8 · docs:deploy:auto"]
    end

    S8 --> DONE([완료 보고])
```

| 단계 | 명령 | 하는 일 |
|------|------|---------|
| 0 | `release:status --fetch` | 저장소·레지스트리 상태 관측, 재개 지점 산출 |
| 1 | `gh pr list --base master` | 이번 릴리즈에 넣을 PR 선택 (열린 PR이 없으면 생략) |
| 2 | `git checkout -b` → `git merge --no-ff` | 정본 master 최신에서 `release/{scope}-next` 분기, 고른 PR 취합 |
| 3 | `git log {tag}..HEAD` | 취합된 커밋으로 bump 제안 후 사용자 확인 (기준은 범프 전 현재 버전의 태그) |
| 4 | `publish:version {bump}` → `release:prepare` → `release:pack-check` | 브랜치 이름 확정, 버전 범프 (단독 배포는 해당 `package.json`만), CHANGELOG + 릴리즈 커밋, 게시 파일 점검 |
| 5 | `gh pr create` → `can-skip-ci` → `gh pr merge --merge` | CI 통과 후 master 반영 (취합 0건이면 대기 생략 가능) |
| 6 | `release:pack-check` → `publish:stable` | 게시 파일 재점검, 승인 1회 후 npm 게시 |
| 7 | `release:notes` → `release:finalize` | Highlights 작성 후 게시 검증 → 태그 → GitHub Release |
| 8 | `docs:deploy:auto` | 문서 사이트 배포 |

- **③만 되돌릴 수 없다.** 그래서 사용자 승인 게이트도 ③ 바로 앞에 하나만 둔다.
- 게이트는 둘이다 — 0단계 관측값으로 판단하는 프리플라이트, publish 직전 승인.
- 그 밖에 멈추는 곳은 다섯이다 — 1단계 취합 PR 선택, 2단계 취합 충돌, 3단계 버전·플러그인 동반 배포 확인, 4·6단계 `pack-check` 실패, 7단계 릴리즈 노트 초안 확인.
  - 충돌 해소는 코드 판단이라 스킬이 임의로 풀지 않는다.
  - bump는 인자로 받지 않는다. 3단계에서 커밋 분류와 패키지별 변경 수를 보고 정한다.
  - 코어 릴리즈인데 코어 변경이 0건이면 3단계에서 멈추고 단독 릴리즈(`/release {pkg}`)를 권한다.
- 프리플라이트에서 막는 것: npm 미로그인 · gh 미설치·미인증 · 더티 트리 · 미푸시 커밋(새 릴리즈 시작 시) · 정본 remote 없음 · 정본 write 권한 없음.
- ④는 게시 이후지만 태그·릴리즈·문서는 다시 만들 수 있어, 실패하면 같은 명령을 재실행하면 된다.

시나리오별 명령어 → [배포 워크플로우](#배포-워크플로우)

### 실행 예시

master를 대상으로 PR 3개가 열려 있고, 그중 2개만 이번 릴리즈에 넣는 경우다.

**시작 상태**

- master는 4.17.0의 게시·태그·GitHub Release까지 끝난 상태다 (`release:status`의 `stage`가 `released`).
- 열린 PR: #A(`fix/a`), #B(`chore/b`), #C(`feat/c`). #C는 아직 준비되지 않아 이번에는 넣지 않는다.
- 세 PR 모두 4.17.0 시점에서 분기했고, 그 뒤 master에는 다른 PR(#D)이 먼저 들어갔다.
- 스킬을 실행하는 현재 브랜치는 어디든 상관없다. clean이고 push돼 있기만 하면 된다.

**실행**: `/release`. 1단계에서 열린 PR #A·#B·#C가 목록으로 나오고, 그중 #A·#B를 고른다. 3단계에서 커밋 분류(fix·chore)와 제안 버전 4.17.1을 보고 확인한다.

- #D는 이미 master에 있으므로 목록에 나오지 않는다. 릴리즈 브랜치가 master에서 분기하므로 자동으로 포함된다.

```mermaid
%%{init: {'gitGraph': {'mainBranchName': 'master'}}}%%
gitGraph
    commit id: "Release 4.17.0" tag: "4.17.0"
    branch fix/a
    commit id: "fix: A"
    checkout master
    branch chore/b
    commit id: "chore: B"
    checkout master
    branch feat/c
    commit id: "feat: C"
    checkout master
    commit id: "Merge #D"
    branch release/core-4.17.1
    merge fix/a id: "Merge #A"
    merge chore/b id: "Merge #B"
    commit id: "Release 4.17.1" type: HIGHLIGHT tag: "4.17.1"
    checkout master
    merge release/core-4.17.1 id: "Merge #R"
```

- 릴리즈 브랜치는 PR 브랜치가 아니라 **정본 master 최신**(`Merge #D` 이후)에서 분기한다.
- 2~3단계 동안 이름은 `release/core-next`이고, 4단계에서 버전이 정해지면 `release/core-4.17.1`로 바뀐다. 그림은 최종 이름으로 표기했다.
- `Merge #A`·`Merge #B`는 `--no-ff` 머지 커밋이다. PR 커밋 SHA가 그대로 남아 5단계 master 머지 때 원본 PR이 "Merged"로 닫힌다.
- 태그 `4.17.1`은 릴리즈 커밋(`Release 4.17.1`)에 붙는다. 만들어지는 시점은 master 머지와 npm 게시가 끝난 7단계다.
- #C는 건드리지 않는다. 열린 채로 남아 다음 릴리즈의 후보가 된다.

단계별로 무엇이 어디에 생기는지:

| 단계 | 작업 위치 | 로컬 | GitHub · npm |
|------|-----------|------|--------------|
| 0 상태 판별 | 현재 브랜치 | — | — |
| 1 PR 선택 | — | 취합 대상 #A·#B 확정 | — |
| 2 분기 · 취합 | `release/core-next` | 브랜치 생성, 머지 커밋 2개 | — |
| 3 버전 결정 | `release/core-next` | `4.17.0..HEAD` 커밋으로 patch 제안 → 확인 후 4.17.1 | — |
| 4 범프 · prepare | `release/core-4.17.1` | 이름 변경, 릴리즈 커밋 1개 (package.json 3개 + CHANGELOG) | — |
| 5 PR · 머지 | `release/core-4.17.1` → master | master 최신 pull | 릴리즈 PR #R, master의 `Merge #R`, #A·#B "Merged" |
| 6 publish | master | — | npm `@egjs/flicking`·`react-flicking`·`vue3-flicking` 4.17.1 (`latest`) |
| 7 finalize | master | 태그 4개 (`4.17.1` + 패키지 태그 3개) | 태그 push, GitHub Release `4.17.1 Release ({날짜})` |
| 8 문서 | — | — | 문서 사이트 `/releases` 갱신 |

끝난 뒤:

- master에는 #A·#B의 변경과 릴리즈 커밋이 들어 있고, npm 게시본과 태그가 그 릴리즈 커밋을 가리킨다.
- `release/core-4.17.1` 브랜치는 원격에 남는다. 스킬이 `--delete-branch`를 쓰지 않고 저장소의 머지 후 자동 삭제도 꺼져 있다.
- #C는 열린 PR 그대로다. 다음 `/release`의 1단계 목록에 다시 나온다.

### 중단과 재개

어느 단계에서 멈췄든 `/release`를 다시 실행하면 `release:status`가 저장소·레지스트리 상태를 관측해 재개 지점(`stage`)을 계산한다. "어디까지 했는지"를 사람이 기억할 필요가 없다.

```mermaid
flowchart TD
    ST["release:status"] --> A{"게시 · 태그 · GitHub Release<br/>모두 존재?"}
    A -->|예| R1["released<br/>이 버전은 끝 → 새 릴리즈는 1단계부터<br/>release/* 브랜치면 3단계 버전 결정"]
    A -->|아니오| B{"직전 태그 이후<br/>버전이 바뀐 패키지 있음?"}
    B -->|아니오| R2["bump<br/>→ released와 같은 규칙"]
    B -->|예| C{"대상 전부<br/>npm에 게시됨?"}
    C -->|예| R3["finalize<br/>→ 7단계 태그 · 릴리즈"]
    C -->|아니오| D{"릴리즈 커밋 존재?"}
    D -->|아니오| R4["prepare<br/>→ 4단계 changelog · 커밋"]
    D -->|예| E{"master에 머지됨?"}
    E -->|아니오| R5["merge<br/>→ 5단계 PR · CI · 머지"]
    E -->|예| R6["publish<br/>→ 6단계 npm 게시"]
```

- 범프 전에는 현재 버전이 이미 게시돼 있으므로 새 릴리즈의 출발점은 `released`다.
  - 현재 브랜치가 이미 `release/*`면 취합까지 끝난 상태다. 버전만 아직 안 바뀌었으므로 3단계부터 잇는다.
- 코어만 게시되고 래퍼가 실패한 것처럼 **일부만 게시된 상태**는 `publish`로 남는다. 실패한 패키지만 같은 버전으로 다시 올린다.
- `finalize`는 게시되지 않은 버전에 태그를 만들지 않는다. 미게시면 중단하고 6단계로 돌려보낸다.
- `pushed`가 false인 채 `stage`가 `publish`면 릴리즈 커밋이 GitHub에 없는 상태다. 게시하지 않고 5단계로 돌아간다.

---

## 용어 정리

| 용어 | 의미 | 해당 명령어 |
|------|------|------------|
| **Publish** | npm에 패키지를 올리는 것 | `pnpm publish:*` |
| **Release** | changelog·커밋(prepare) + 태그·GitHub Release(finalize) | `pnpm release:prepare` / `pnpm release:finalize` |
| **Deploy** | 문서 사이트를 배포하는 것 | `pnpm docs:deploy:auto` |

## 패키지 의존 관계

```
@egjs/react-flicking  ──dependencies──→  @egjs/flicking (코어)
@egjs/vue3-flicking   ──dependencies──→  @egjs/flicking (코어)
@egjs/flicking-plugins ──peerDeps────→  @egjs/flicking (코어)
```

- **래퍼(react/vue)**: 코어의 thin bridge. `export * from "@egjs/flicking"`으로 코어 API를 전부 re-export하고, 프레임워크 라이프사이클 연결 코드만 자체 보유 (~300줄).
- **플러그인**: 코어와 독립적. peerDependencies로 코어를 요구하므로 별도 버전 관리.
- 래퍼끼리, 래퍼와 플러그인은 서로 의존하지 않음.

### workspace: 프로토콜

모노레포 내부의 패키지 간 의존성은 `workspace:~`로 선언한다.

```json
// packages/react-flicking/package.json
"dependencies": {
  "@egjs/flicking": "workspace:~"
}
```

- **개발 시**: 항상 로컬 패키지를 심링크로 연결 (버전 불일치 걱정 없음)
- **publish 시**: pnpm이 자동으로 `workspace:~` → `~4.16.0` 처럼 실제 버전으로 치환
- 수동으로 의존성 버전 문자열을 관리할 필요 없음

## 버전 정책

### 원칙

1. 각 패키지는 독자적으로 버전을 가진다.
2. 래퍼의 **major**는 코어의 major를 따른다.
3. 코어 버전이 올라가면 래퍼도 재배포한다 (소비자가 `npm install @egjs/react-flicking@latest`만으로 코어 변경분을 받을 수 있도록).
4. 래퍼는 독자적으로 버전이 앞설 수 있다 (프레임워크 호환성 수정 등).
5. 플러그인은 코어와 독립적으로 관리한다.
6. 루트 `package.json`의 version(`3.0.0`)은 **모노레포 자체 버전**이며 프로덕트 버전과 무관하다. 릴리즈·배포 대상이 아니고 코어 버전과 동기화하지 않는다.

### 코어 변경 시

| 코어 변경 | 래퍼 | 플러그인 | `publish:version` 인자 |
|-----------|------|---------|----------------------|
| **patch** (4.16.0 → 4.16.1) | patch +1 | 변경 없음 | `patch` |
| **minor** (4.16.0 → 4.17.0) | minor +1, patch 리셋 | 변경 없음 | `minor` |
| **major** (4.x → 5.0.0) | major 동기화, minor/patch 리셋 | major 업데이트 + peerDeps 수정 | `major` |
| **베타** | 수동 관리 | 수동 관리 | 사용 안 함 |

### 래퍼가 독자적으로 앞서있는 경우

래퍼가 코어보다 높은 minor를 가지고 있을 때, 코어 minor 업데이트가 발생하면 래퍼는 **자신의 minor +1**로 올라간다 (코어 minor로 내려가지 않음).

```
코어    4.16.0  →  4.16.0  →  4.17.0
react   4.16.0  →  4.17.0  →  4.18.0
                   (독자 수정)  (코어 minor → 래퍼 minor +1)
```

### 래퍼/플러그인 단독 변경

코어와 무관한 변경(프레임워크 호환성 수정, 플러그인 버그 수정 등)은 해당 패키지만 수동으로 버전을 올려 개별 배포한다. 단독 배포도 **머지 후 publish** 순서를 따른다 — 버전 정책만 다르고 절차는 같다.

```bash
# react-flicking만 패치 배포: version 수동 변경 → prepare → 머지 → publish → finalize
pnpm release:prepare --package react
```

전체 명령 흐름 → [래퍼/플러그인 단독 정식 배포](#래퍼플러그인-단독-정식-배포)

## 배포 명령어

### `publish:version`을 사용하는 경우

`publish:version`은 **코어 버전을 변경한 후 래퍼 버전을 정책에 따라 자동 동기화**하는 명령어다.

| 상황 | `publish:version` | 이유 |
|------|-------------------|------|
| 코어 정식 배포 (patch/minor/major) | **사용** | 래퍼도 코어 변경에 맞춰 재배포해야 함 |
| 베타 배포 | **사용 안 함** | 각 패키지 버전을 수동으로 관리 |
| 래퍼 단독 배포 | **사용 안 함** | 코어가 안 바뀌었으므로 동기화 불필요 |
| 플러그인 단독 배포 | **사용 안 함** | 플러그인은 독립적 버전 관리 |

### 구조

- `publish:version`은 정식 배포 시 코어 변경 후 래퍼 동기화 용도로만 사용한다. bump type을 반드시 지정해야 한다.
- `publish:stable`과 `publish:beta`는 빌드+배포만 담당한다 (버전 변경 없음).
- 베타 배포 시에는 각 패키지 버전을 수동으로 관리하고 개별 명령어로 배포한다.

> **`publish:version && publish:stable`을 이어 붙여 실행하지 않는다.** 정식 배포에서 `publish:stable`은 릴리즈 커밋이 master에 머지된 뒤에만 실행한다. → [순서: 머지 후 publish](#순서-머지-후-publish), [배포 워크플로우](#배포-워크플로우)

```bash
# 베타 배포 (각 패키지 버전 수동 변경 후 — 머지 없이 브랜치에서 게시)
pnpm publish:beta:flicking
pnpm publish:beta:react
```

### 명령어 레퍼런스

| 명령어 | 설명 |
|--------|------|
| `pnpm publish:version patch` | 코어 패치 업데이트 시 래퍼 동기화 |
| `pnpm publish:version minor` | 코어 마이너 업데이트 시 래퍼 동기화 |
| `pnpm publish:version major` | 코어 메이저 업데이트 시 래퍼 동기화 |
| `pnpm publish:build` | 전체 빌드 (단독 사용: 빌드 검증용) |
| `pnpm publish:stable` | 전체 빌드 + npm 퍼블리시 |
| `pnpm publish:stable:{pkg}` | 개별 빌드 + 퍼블리시 (flicking\|react\|vue\|plugins) |
| `pnpm publish:beta` | 전체 빌드 + npm 베타 퍼블리시 |
| `pnpm publish:beta:{pkg}` | 개별 빌드 + 베타 퍼블리시 |

- `publish:stable*`은 git 검사를 켠 채 실행된다(더티 트리·비 master·원격 미동기에서 중단). → [순서: 머지 후 publish](#순서-머지-후-publish)
- `publish:beta*`만 `--no-git-checks`를 쓴다.
### 릴리즈

`config/release.js`는 [머지 후 publish](#순서-머지-후-publish) 순서를 강제하기 위해 두 단계로 나뉜다.

| 명령어 | 실행 위치 | 설명 |
|--------|-----------|------|
| `pnpm release:status` | 어디서나 | 버전·태그·게시·릴리즈 상태와 재개 지점(`stage`)을 출력. `--json`으로 기계 판독 |
| `pnpm release:prepare` | 릴리즈 브랜치 | `pnpm install` + changelog + 릴리즈 커밋 (태그·push 없음) |
| `pnpm release:notes` | 어디서나 | 릴리즈 노트 초안 뼈대 생성 (`--out FILE`), CHANGELOG 섹션을 근거로 출력 |
| `pnpm release:pack-check` | 빌드 후 | 게시될 tarball을 npm latest와 비교, 게시 금지 파일·`workspace:` 치환 오류면 실패 → [게시 파일 점검](#게시-파일-점검) |
| `node config/release.js can-skip-ci` | 릴리즈 브랜치 | 릴리즈 PR의 CI 대기를 생략해도 되는지 판정 (`--json`) → [CI 대기 생략](#ci-대기-생략-취합-0건) |
| `pnpm release:finalize` | master (publish 후) | npm 게시 검증 → 태그 → push → GitHub Release |
| `node config/release.js remote` | 어디서나 | 정본(naver/egjs-flicking)을 가리키는 remote 이름 출력 |
| `pnpm test:config` | 어디서나 | `sync-version.js` / `release.js` 단위 테스트 |

공통 옵션: `--dry-run` · `--package {core|react|vue|plugins}` · `--skip-install` · `--allow-master` · `--notes-file FILE` · `--remote NAME` · `--branch NAME`

- `pnpm release`(인자 없음)는 사용법만 출력한다.
- `release:prepare`는 릴리즈 대상 경로(`CHANGELOG.md`, `pnpm-lock.yaml`, 공개 패키지 `package.json`)만 커밋한다. 작업 중인 다른 파일은 스테이징하지 않는다.
- `release:finalize`는 대상 패키지가 npm에 게시되어 있는지 먼저 확인하고, 미게시면 중단한다. 태그는 릴리즈 커밋 SHA에 붙인다.
- `--package`를 주면 래퍼·플러그인 단독 릴리즈로 동작한다. 태그·changelog 기준이 해당 패키지 태그(`@egjs/react-flicking@4.17.1`)가 된다.

태그 규칙:

- 코어 릴리즈는 bare 태그(`4.17.0`)와 버전이 바뀐 패키지 태그(`@egjs/flicking@4.17.0` 등)를 함께 만든다.
- 단독 릴리즈는 해당 패키지 태그만 만든다 (bare 태그는 코어 릴리즈 전용).
- 직전 태그 계산도 같은 기준으로 나뉜다 — 코어는 bare 태그 중 최신, 단독은 해당 패키지 태그 중 최신.
- 이미 존재하는 태그는 건너뛴다. `finalize` 재실행이 안전한 이유다.

`release:status`가 판별하는 환경 상태 (`--fetch`를 주면 정본 master를 먼저 받아온다):

| 필드 | 의미 |
|------|------|
| `clean` / `dirtyFiles` | 릴리즈와 무관한 미커밋 변경 |
| `pushed` / `unpushedCommits` / `upstream` | 현재 브랜치가 원격에 올라가 있는지 |
| `baseBehind` / `baseRef` | HEAD가 모르는 정본 master 커밋 수 (>0이면 브랜치 베이스가 낡음, `null`이면 fetch 전이라 판단 불가) |
| `npmUser` | `npm whoami` 결과 (`null`이면 미로그인) |
| `ghInstalled` / `ghAuth` | gh CLI 설치 여부, github.com 인증 여부 |
| `canonicalRemote` / `canonicalPermission` | 정본을 가리키는 remote와 그 저장소에 대한 내 권한 |
| `canPushCanonical` | 정본에 write 권한이 있는지 (false면 머지·배포 권한 없음) |
| `isFork` / `pushRemote` / `prHead` | fork 클론인지, 브랜치를 push할 remote, PR head 표기(`{owner}:{branch}`) |
| `stage` / `nextStep` | 재개 지점, 실제로 다음에 실행할 것 (`nextStep`은 `npm-login` → `gh-install` → `gh-login` 게이트를 먼저 본다) |

> **fork 클론에서는** 브랜치를 `pushRemote`(fork)로 push하고 `gh pr create --repo naver/egjs-flicking --head {owner}:{branch}`로 PR을 만든다. `canPushCanonical`이 false면 머지·publish 권한이 없으므로 PR 생성까지만 진행하고 이후는 권한자가 이어받는다.

### 릴리즈 노트(GitHub Release) 작성

`release:finalize`가 `gh release create`를 실행해 [Releases](https://github.com/naver/egjs-flicking/releases) 항목을 만든다. 제목은 `{태그} Release ({릴리즈 커밋 날짜})` 형식으로 고정된다.

**기본 방침: Highlights를 직접 쓰고 자동 PR 목록을 결합한다.** 기존 릴리즈(4.16.0~4.16.4)가 모두 이 형태이고, 자동 생성만으로 만든 릴리즈는 없다.

```bash
# 1) 뼈대 생성 — Packages 표는 채워지고, 작성 근거로 CHANGELOG 섹션이 출력된다
pnpm release:notes --out /tmp/release-notes.md

# 2) Highlights를 채운 뒤 전달 (본문 위 = 직접 작성, 아래 = 자동 PR 목록)
pnpm release:finalize --notes-file /tmp/release-notes.md
```

- Highlights는 커밋 제목 나열이 아니라 **사용자 영향 서술**로 쓴다 — "무엇이 바뀌었나 — 왜 중요한가 (#PR)".
- breaking change·deprecate가 있으면 마이그레이션 방법을 함께 적고, 없으면 해당 섹션을 지운다.
- 초안 파일은 저장소 밖에 둔다. 커밋 대상이 아니다.
- `--notes-file` 없이 `finalize`를 실행하면 **CHANGELOG의 해당 버전 섹션이 본문으로 들어간다** (수동 실행용 안전망).

본문은 플래그에 따라 결정된다:

| 방식 | 본문 내용 | 직접 작성 |
|------|-----------|-----------|
| `--generate-notes` | GitHub이 자동 생성 — 직전 릴리즈 이후 머지된 **PR 제목 목록** + 기여자 + Full Changelog 링크 | 불필요 (단, PR 제목 나열뿐이라 빈약) |
| `--notes-file FILE` / `--notes "..."` | 파일/문자열에 **직접 작성한 내용** | 필요 |
| 둘 다 지정 | 직접 작성 내용(위) + 자동 PR 목록(아래) 결합 | 필요 |

**권장**: 하이라이트·breaking change·deprecate 안내 등은 자동 생성으로 표현되지 않으므로, 짧게라도 직접 작성한다.

```bash
# 이미 만든 릴리즈 노트 수정
gh release edit "4.17.0" --repo naver/egjs-flicking --notes-file /tmp/release-notes.md
```

> GitHub Release 본문은 다음 `pnpm docs:deploy:auto` 때 `fetch-releases.js`가 가져와 문서 사이트 `/releases`에 자동 게시한다. 즉 GitHub Release = 문서 사이트 릴리즈 노트이므로 블로그에 따로 쓸 필요가 없다. (상세 → `DOCS_GUIDE.md`)

## 배포 워크플로우

### 정식 배포

#### 코어 정식 배포 (minor 예시)

```bash
# 0. 상태 확인 — nextStep이 npm-login이면 npm login부터
#    clean·pushed·baseBehind·isFork·canPushCanonical도 함께 확인한다
pnpm -s release:status --json --fetch

# 1. 취합할 PR 선택
gh pr list --repo naver/egjs-flicking --base master --state open

# 2. 릴리즈 브랜치 — 정본 master 최신에서 임시 이름으로 만들고, 고른 PR마다 --no-ff 취합
REMOTE=$(node config/release.js remote)
git fetch $REMOTE master
git checkout -b release/core-next $REMOTE/master
git fetch $REMOTE pull/{N}/head                  # fork PR도 이 ref로 받는다
git merge --no-ff FETCH_HEAD -m "Merge pull request #{N} from {owner}/{branch}"

# 3. 버전 결정 — 직전 릴리즈(범프 전 현재 버전) 태그부터 취합된 HEAD까지
#    prepare가 CHANGELOG에 쓰는 범위와 같다. release:status의 prevTag는 범프 전엔 한 단계 앞이라 쓰지 않는다
git log 4.17.0..HEAD --no-merges --pretty=format:"%s"

# 4. 이름 확정 + 버전 범프 + changelog·릴리즈 커밋
git branch -m release/core-4.18.0
#    코어 package.json version 수동 변경: 4.17.0 → 4.18.0
#    (플러그인도 함께 배포하려면 flicking-plugins version도 수동 변경)
#    래퍼 동기화 — publish:version minor 결과:
#      react-flicking  4.17.0 → 4.18.0 (minor +1)
#      vue3-flicking   4.17.0 → 4.18.0 (minor +1)
pnpm publish:version minor
pnpm release:prepare                             # 내부에서 pnpm install 실행

#    배포 산출물 검증 (테스트는 PR CI가 담당)
pnpm lint && pnpm publish:build
pnpm release:pack-check      # npm latest 대비 파일·크기, 래퍼의 코어 의존이 ~4.18.0인지

# 5. PR → CI → master 머지 (squash 금지)
git push -u $REMOTE release/core-4.18.0        # push 없이 gh pr create를 실행하면 비대화형에서 실패한다
PR=$(gh pr create --repo naver/egjs-flicking --base master --head release/core-4.18.0 \
  --title "chore(release): Release 4.18.0" --body "취합한 PR: Closes #A #B")
node config/release.js can-skip-ci   # 취합 0건 + 버전·CHANGELOG만 + master CI 통과면 대기 생략
gh pr checks "$PR" --watch            # 생략 불가일 때만
gh pr merge "$PR" --merge
git checkout master && git pull $REMOTE master

# 6. 게시 파일 재점검 → npm 게시 (사용자 확인 1회 후)
pnpm publish:build && pnpm release:pack-check
pnpm publish:stable

# 7. 태그 + push + GitHub Release
pnpm release:finalize

# 8. 문서 사이트 배포 (릴리즈 후 필수 — /releases·버전 표시 갱신)
pnpm docs:deploy:auto
```

patch·major는 4단계의 `publish:version` 인자만 달라진다. major는 플러그인 `peerDependencies`를 수동 수정한 뒤 `pnpm publish:stable:plugins`로 함께 올린다. → [코어 변경 시](#코어-변경-시)

#### 래퍼/플러그인 단독 정식 배포

코어가 바뀌지 않았으므로 `publish:version`을 쓰지 않고, 릴리즈 기준도 해당 패키지 태그가 된다. 1~3단계(PR 선택·취합·버전 결정)는 코어와 같고, 브랜치만 `release/react-next`로 만든다.

```bash
# 4. 이름 확정 후 해당 package.json version만 수동 변경
git branch -m release/react-4.17.1
pnpm release:prepare --package react

# 5~6. PR → CI → master 머지 후 게시
pnpm publish:stable:react

# 7~8. 태그·릴리즈 (@egjs/react-flicking@4.17.1 태그만 생성)
pnpm release:finalize --package react
pnpm docs:deploy:auto
```

### 베타 배포

베타에서는 `publish:version`을 사용하지 않는다. 각 패키지 버전을 수동으로 변경한 후 개별 배포한다.

**베타는 master 머지 대상이 아니다.** 릴리즈 브랜치에서 바로 게시하고, `release:prepare`·`release:finalize`를 쓰지 않는다 (changelog·태그·GitHub Release를 만들지 않는다).

#### 코어만 수정 → 코어만 베타 배포

```bash
# 1. 코어 버전 수동 변경: 4.16.0 → 4.17.0-beta.0
pnpm publish:beta:flicking
```

#### 래퍼만 수정 → 래퍼만 베타 배포

```bash
# 1. react-flicking 버전 수동 변경: 4.16.0 → 4.16.1-beta.0
pnpm publish:beta:react
```

#### 코어 수정 → 코어 + 래퍼 모두 베타 배포

```bash
# 1. 코어 버전 수동 변경: 4.16.0 → 4.17.0-beta.0
# 2. 래퍼 버전 수동 변경: 4.15.0 → 4.16.0-beta.0 (react, vue 각각)
# 3. 전체 배포
pnpm publish:beta
# 또는 개별 배포
pnpm publish:beta:flicking
pnpm publish:beta:react
pnpm publish:beta:vue
```

#### 코어 + 래퍼 모두 수정 → 둘 다 베타 배포

```bash
# 1. 코어 버전 수동 변경: 4.16.0 → 4.17.0-beta.0
# 2. 래퍼 버전 수동 변경: 4.15.0 → 4.16.0-beta.0
pnpm publish:beta
```
