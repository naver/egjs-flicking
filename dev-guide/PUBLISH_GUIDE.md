# 퍼블리시 & 버전 관리 가이드

## 빠른 시작

### 사전 준비 (최초 1회)

1. **npm 로그인** — `@egjs` scope에 publish 권한이 있는 계정으로 로그인
   ```bash
   npm login
   ```
2. **GH_TOKEN 설정** (릴리즈를 사용할 경우) — GitHub Personal Access Token 발급 (repo 권한)
   ```bash
   export GH_TOKEN=your_token
   # 영구 등록: ~/.zshrc에 추가
   ```

### 배포 절차

#### 정식 배포 (코어 변경)

```
1. 코어 package.json의 version을 변경한다.
2. pnpm publish:version {patch|minor|major} 로 래퍼 버전을 동기화한다.
3. pnpm publish:stable 로 전체 빌드 + npm 퍼블리시한다.
4. (선택) pnpm release 로 changelog, tag, GitHub Release를 생성한다.
```

```bash
# 예: 코어 4.16.0 → 4.17.0 (minor 업데이트)
# packages/flicking/package.json의 version을 4.17.0으로 변경 후:
pnpm publish:version minor && pnpm publish:stable
```

#### 베타 배포

```
1. 배포할 패키지의 package.json version을 직접 변경한다. (예: 4.17.0-beta.0)
2. pnpm publish:beta:{pkg} 로 해당 패키지만 빌드 + 베타 퍼블리시한다.
```

```bash
# 예: 코어만 베타 배포
# packages/flicking/package.json의 version을 4.17.0-beta.0으로 변경 후:
pnpm publish:beta:flicking
```

#### 래퍼/플러그인 단독 배포

```
1. 해당 패키지의 package.json version을 직접 변경한다.
2. pnpm publish:stable:{pkg} 로 빌드 + 퍼블리시한다.
```

```bash
# 예: react-flicking 4.16.0 → 4.16.1
pnpm publish:stable:react
```

---

## 용어 정리

| 용어 | 의미 | 해당 명령어 |
|------|------|------------|
| **Publish** | npm에 패키지를 올리는 것 | `pnpm publish:*` |
| **Release** | changelog + commit + tag + GitHub Release 생성 | `pnpm release` |
| **Deploy** | 문서 사이트를 배포하는 것 | `pnpm docs:deploy` |

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

코어와 무관한 변경(프레임워크 호환성 수정, 플러그인 버그 수정 등)은 해당 패키지만 수동으로 버전을 올리고 개별 배포한다.

```bash
# react-flicking만 패치 배포
# packages/react-flicking/package.json version 수동 변경 후
pnpm publish:stable:react
```

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

```bash
# 정식 배포
pnpm publish:version {patch|minor|major} && pnpm publish:stable

# 베타 배포 (각 패키지 버전 수동 변경 후)
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
### 릴리즈

| 명령어 | 설명 |
|--------|------|
| `pnpm release` | changelog + commit + tag + push + GitHub Release |
| `pnpm release:changelog` | changelog만 생성 |

`pnpm release`는 `release-helper release`를 사용한다. npm publish는 포함되어 있지 않다.

## 배포 워크플로우

### 정식 배포

`publish:version`으로 래퍼 버전을 정책에 따라 자동 동기화한 후 배포한다.

#### 코어 minor 정식 배포

```bash
# 1. 코어 버전 수동 변경: 4.16.0 → 4.17.0
# 2. 래퍼 동기화 + 배포
#    publish:version minor 결과:
#      react-flicking  4.16.0 → 4.17.0 (minor +1)
#      vue3-flicking   4.16.0 → 4.17.0 (minor +1)
pnpm publish:version minor && pnpm publish:stable
# 3. 릴리즈 (선택)
export GH_TOKEN=your_token
pnpm release
```

#### 코어 patch 정식 배포

```bash
# 1. 코어 버전 수동 변경: 4.17.0 → 4.17.1
# 2. 래퍼 동기화 + 배포
#    publish:version patch 결과:
#      react-flicking  4.17.0 → 4.17.1 (patch +1)
#      vue3-flicking   4.17.0 → 4.17.1 (patch +1)
pnpm publish:version patch && pnpm publish:stable
```

#### 코어 major 정식 배포

```bash
# 1. 코어 버전 수동 변경: 4.17.1 → 5.0.0
# 2. 래퍼 동기화 + 배포
#    publish:version major 결과:
#      react-flicking  4.17.1 → 5.0.0 (major 동기화, minor/patch 리셋)
#      vue3-flicking   4.17.1 → 5.0.0 (major 동기화, minor/patch 리셋)
pnpm publish:version major && pnpm publish:stable
# 3. 플러그인은 peerDependencies 수동 수정 후 개별 배포
pnpm publish:stable:plugins
```

#### 래퍼 단독 정식 배포

```bash
# 1. react-flicking 버전 수동 변경: 4.16.0 → 4.16.1
# 2. 해당 패키지만 배포 (publish:version 불필요)
pnpm publish:stable:react
```

#### 플러그인 단독 정식 배포

```bash
# 1. flicking-plugins 버전 수동 변경: 4.7.1 → 4.8.0
# 2. 해당 패키지만 배포 (publish:version 불필요)
pnpm publish:stable:plugins
```

### 베타 배포

베타에서는 `publish:version`을 사용하지 않는다. 각 패키지 버전을 수동으로 변경한 후 개별 배포한다.

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

## release-helper version을 대체한 이유

### 기존 방식: `release-helper version`

`@egjs/release-helper`의 `version` 커맨드는 코어 버전 변경 시 의존 패키지들의 버전을 자동 동기화하는 도구였다.

### 발견된 문제

#### 1. 의존성 전파 로직이 동작하지 않음

`version.js`의 Step 2에서 `pnpm list -r --json --depth -1`을 호출하지만, 이 명령은 `dependencies` 필드를 반환하지 않는다. 따라서 의존성 변경 감지에 의한 자동 전파(Step 2)는 **실제로 동작하지 않았다**.

#### 2. devDependencies 변경이 불필요한 버전 bump을 유발

Step 3에서 각 패키지의 `package.json`을 디스크에서 읽고 `dependencies`와 `devDependencies` 모두의 버전을 덮어쓴다. 그리고 `contentChanged`가 true이면 패키지 자체 버전을 강제로 patch bump한다.

```js
// devDependencies도 순회하면서 버전을 덮어씀
for (const depName in pkgJson.devDependencies) {
  pkgJson.devDependencies[depName] = `~${newVersion}`;
  contentChanged = true;  // ← 이것 때문에 강제 patch bump 발생
}
```

결과적으로 다음 패키지들이 의도하지 않게 버전이 올라갔다:

| 패키지 | @egjs/flicking 의존 위치 | 영향 |
|--------|------------------------|------|
| `@egjs/flicking-plugins` | devDependencies | 불필요한 patch bump |
| `docs` | dependencies | 불필요한 patch bump (private이라 배포는 안 됨) |
| `@test/plugins` | devDependencies | 불필요한 patch bump |

#### 3. workspace: 프로토콜과 호환 불가

Step 3은 의존성 버전을 `~{newVersion}` 형태로 하드코딩한다. `workspace:~`를 사용하면 이를 덮어써서 **workspace 프로토콜이 영구적으로 삭제**된다.

```js
// "workspace:~" → "~4.17.0" 으로 덮어씀
pkgJson.dependencies[depName] = `~${newVersion}`;
```

이후 pnpm install 시 로컬 링크가 아닌 npm registry에서 패키지를 찾으려 시도한다.

#### 4. private 패키지 구분 없음

docs, test 같은 `private: true` 패키지도 동일하게 처리하여 불필요한 변경이 발생한다.

#### 5. peerDependencies는 처리하지 않음

`flicking-plugins`의 `peerDependencies: {"@egjs/flicking": "^4.1.0"}`는 업데이트하지 않는다. 이 자체는 문제가 아니지만, devDependencies만 건드리면서 버전을 올리는 것은 일관성이 없다.

### 현재 방식: `config/sync-version.js` + `workspace:` 프로토콜

| | release-helper version | sync-version.js + workspace: |
|---|---|---|
| 의존성 버전 관리 | 하드코딩 (`~4.17.0`) | pnpm이 publish 시 자동 치환 |
| devDependencies 부작용 | 불필요한 bump 발생 | 영향 없음 |
| private 패키지 | 구분 없이 처리 | 영향 없음 |
| workspace 호환성 | 비호환 (덮어씀) | 네이티브 지원 |
| 버전 동기화 대상 | 모든 패키지 | dependencies에 코어가 있는 래퍼만 |
| 테스트 | 없음 | `config/sync-version.test.js` |

### 향후 계획

`sync-version.js`는 과도기 도구이다. 이후 [changesets](https://github.com/changesets/changesets)로 전환하면 `sync-version.js`와 `release-helper`를 모두 대체할 수 있다.

| 현재 도구 | changesets 대체 |
|-----------|----------------|
| `sync-version.js` | `changeset version` |
| `release-helper changelog` | `changeset version` (CHANGELOG 자동 생성) |
| `release-helper release` | `changeset publish` + `changeset tag` |
