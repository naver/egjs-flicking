# Vue 2.x 버전 충돌 및 @vue/composition-api 관련 문제 정리

## 문제 개요

Vue 2 기반 프로젝트에서 아래와 같은 에러가 발생할 수 있습니다:

```
Vue packages version mismatch:
- vue@2.6.x
- vue-template-compiler@2.7.x
```
또는
```
This dependency was not found:
* @vue/composition-api in ...
```

이 문서는 위와 같은 문제의 원인, 관련 개념, 그리고 해결 방법을 정리합니다.

---

## 1. 관련 개념

### 1.1. vue
- Vue.js의 핵심 라이브러리입니다.
- 2.x 버전과 3.x 버전은 호환되지 않습니다.

### 1.2. vue-template-compiler
- Vue Single File Component(.vue 파일)의 template 부분을 컴파일하는 데 사용되는 별도의 패키지입니다.
- **항상 vue와 정확히 같은 버전이어야 합니다.**
- 버전이 다르면 컴파일 단계에서 에러가 발생합니다.

### 1.3. @vue/composition-api
- Vue 2.x에서 Composition API(원래 Vue 3의 기능)를 사용할 수 있게 해주는 플러그인입니다.
- 주로 Vue 2.6.x와 호환됩니다.
- Vue 2.7.x에서는 Composition API가 내장되어 있으므로, 별도 설치가 필요 없습니다.

### 1.4. @cfcs/vue2
- 여러 프레임워크에서 공통 컴포넌트 패턴을 사용할 수 있게 해주는 라이브러리입니다.
- 내부적으로 @vue/composition-api를 사용합니다.

---

## 2. 문제의 원인

- **vue와 vue-template-compiler의 버전 불일치**
  - 예: vue@2.6.14, vue-template-compiler@2.7.16 → 에러 발생
- **@vue/composition-api와 vue 2.7.x의 혼용**
  - Vue 2.7.x에서는 Composition API가 내장되어 있으므로, @vue/composition-api를 별도로 설치하면 충돌이 발생할 수 있습니다.
- **의존성 트리에서 여러 버전이 혼재**
  - 일부 패키지가 vue 2.6.x, 일부는 2.7.x를 요구할 때 충돌이 발생

---

## 3. 해결 방법

### 3.1. vue와 vue-template-compiler 버전 맞추기
- 반드시 **동일한 버전**으로 맞춰야 합니다.
- 예시 (package.json):
  ```json
  "vue": "^2.6.14",
  "vue-template-compiler": "^2.6.14"
  ```

### 3.2. @vue/composition-api 사용 시
- Vue 2.6.x에서만 @vue/composition-api를 설치해서 사용합니다.
- Vue 2.7.x 이상에서는 @vue/composition-api를 설치하지 않아야 합니다.

### 3.3. 의존성 재설치
1. `node_modules`와 `package-lock.json` 삭제
   ```sh
   rm -rf node_modules package-lock.json
   ```
2. 의존성 재설치
   ```sh
   npm install
   ```

### 3.4. vue-template-compiler 강제 설치
- 만약 여러 버전이 설치된다면, 다음 명령어로 강제로 맞춰줍니다.
  ```sh
  npm install vue-template-compiler@2.6.14 --save-dev
  ```

---

## 4. 참고
- [Vue 공식 문서: 버전 호환성](https://v2.vuejs.org/v2/guide/installation.html#CLI)
- [@vue/composition-api 공식 문서](https://github.com/vuejs/composition-api)

---

## 5. 요약
- **vue와 vue-template-compiler는 항상 같은 버전이어야 한다.**
- **Vue 2.6.x에서만 @vue/composition-api를 사용한다.**
- 의존성 충돌이 발생하면, node_modules와 lock 파일을 삭제 후 재설치한다. 

---

## 6. npm, yarn과의 관계 및 주의사항

### 6.1. npm과 yarn의 동작 방식 차이
- **npm**과 **yarn** 모두 Node.js 패키지 매니저입니다.
- 두 도구 모두 `package.json`의 의존성 선언을 기준으로 패키지를 설치합니다.
- **npm**은 `package-lock.json`, **yarn**은 `yarn.lock` 파일을 사용해 의존성 트리를 고정합니다.
- lock 파일이 다르면, 같은 `package.json`이라도 실제 설치되는 패키지 버전이 달라질 수 있습니다.

### 6.2. lock 파일의 역할
- lock 파일은 의존성 트리(직접/간접 의존성의 정확한 버전)를 기록합니다.
- lock 파일이 꼬여 있거나, 여러 lock 파일이 혼재하면(예: npm과 yarn을 번갈아 사용) 의도치 않은 버전이 설치될 수 있습니다.
- **항상 한 가지 패키지 매니저만 사용하는 것이 좋습니다.**

### 6.3. yarn을 사용하면 문제가 없을까?
- yarn을 사용해도 **vue와 vue-template-compiler의 버전이 다르면 동일한 문제가 발생합니다.**
- yarn도 lock 파일(`yarn.lock`)을 기준으로 의존성을 설치하므로, lock 파일이 꼬여 있으면 npm과 마찬가지로 충돌이 발생할 수 있습니다.
- yarn을 사용할 때도 아래와 같이 lock 파일과 node_modules를 모두 삭제 후 재설치하는 것이 안전합니다.
  ```sh
  rm -rf node_modules package-lock.json yarn.lock
  yarn install
  ```
- **즉, npm이든 yarn이든 핵심은 vue와 vue-template-compiler의 버전을 반드시 맞추는 것**입니다.

### 6.4. 실무 팁
- 여러 명이 협업할 때는 lock 파일을 반드시 버전 관리(Git 등)에 포함시키세요.
- lock 파일이 꼬였거나, 의존성 충돌이 반복된다면 lock 파일과 node_modules를 모두 삭제 후 재설치하세요.
- npm과 yarn을 혼용하지 마세요. (프로젝트 내에 lock 파일이 둘 다 있다면 하나만 남기고, 나머지는 삭제하세요.) 

---

## 7. 원인 파악 및 디버깅 방법

### 7.1. npm 명령어를 활용한 디버깅

#### 7.1.1. 설치된 패키지 버전 확인
```sh
# 특정 패키지의 설치된 버전 확인
npm list vue vue-template-compiler @vue/composition-api

# 전체 의존성 트리 확인 (깊이 제한)
npm list --depth=0

# 특정 패키지의 상세 정보 확인
npm view vue versions --json
npm view vue-template-compiler versions --json
```

#### 7.1.2. 패키지 정보 조회
```sh
# 패키지의 기본 정보 확인
npm view @cfcs/vue2

# peerDependencies 확인
npm view @cfcs/vue2 peerDependencies

# dependencies 확인
npm view @cfcs/vue2 dependencies

# devDependencies 확인
npm view @cfcs/vue2 devDependencies
```

#### 7.1.3. 의존성 충돌 확인
```sh
# 의존성 충돌 확인
npm ls

# 특정 패키지의 의존성 트리 확인
npm ls vue
npm ls vue-template-compiler
```

### 7.2. 주요 개념 설명

#### 7.2.1. Peer Dependencies (peerDependencies)
- **정의**: 호스트 패키지(프로젝트)가 직접 설치해야 하는 의존성입니다.
- **목적**: 플러그인이나 라이브러리가 특정 버전의 프레임워크를 요구할 때 사용합니다.
- **예시**: `@vue/composition-api`는 Vue 2.6.x를 peerDependency로 요구합니다.
  ```json
  {
    "peerDependencies": {
      "vue": "^2.6.0"
    }
  }
  ```
- **특징**: 
  - npm install 시 자동으로 설치되지 않습니다.
  - 버전 충돌 시 경고가 표시됩니다.
  - 호스트 프로젝트에서 직접 설치해야 합니다.

#### 7.2.2. Dedupe (중복 제거)
- **정의**: npm이 동일한 패키지의 여러 버전이 설치될 때, 하나의 버전으로 통합하는 과정입니다.
- **표시**: `npm list` 출력에서 `deduped`라고 표시됩니다.
  ```
  ├── vue@2.6.14 deduped
  └── vue-template-compiler@2.6.14 deduped
  ```
- **의미**: 여러 패키지가 같은 vue 버전을 요구할 때, 하나의 인스턴스만 설치하고 나머지는 참조로 연결합니다.
- **장점**: 
  - 디스크 공간 절약
  - 번들 크기 감소
  - 메모리 사용량 감소

#### 7.2.3. 의존성 해결 과정
1. **package.json**에서 직접 의존성 확인
2. **lock 파일**에서 정확한 버전 확인
3. **peerDependencies** 확인 및 경고 표시
4. **중복 제거(dedupe)** 수행
5. **node_modules**에 실제 설치

### 7.3. 문제 진단 단계별 가이드

#### 7.3.1. 1단계: 현재 상황 파악
```sh
# 현재 설치된 vue 관련 패키지 확인
npm list vue vue-template-compiler @vue/composition-api

# package.json의 의존성 확인
cat package.json | grep -A 10 -B 5 "dependencies"
```

#### 7.3.2. 2단계: 충돌 원인 파악
```sh
# 의존성 충돌 확인
npm ls

# 특정 패키지의 peerDependencies 확인
npm view @cfcs/vue2 peerDependencies
npm view @vue/composition-api peerDependencies
```

#### 7.3.3. 3단계: 해결 방법 결정
- **버전 불일치**: package.json에서 버전 맞추기
- **peerDependency 충돌**: 요구되는 버전으로 다운그레이드
- **lock 파일 꼬임**: lock 파일과 node_modules 삭제 후 재설치

#### 7.3.4. 4단계: 해결 후 검증
```sh
# 해결 후 다시 버전 확인
npm list vue vue-template-compiler @vue/composition-api

# 프로젝트 실행 테스트
npm run start
```

### 7.4. 자주 발생하는 패턴

#### 7.4.1. 패턴 1: vue와 vue-template-compiler 버전 불일치
```sh
# 문제 상황
npm list vue vue-template-compiler
# vue@2.6.14
# vue-template-compiler@2.7.16

# 해결 방법
npm install vue-template-compiler@2.6.14 --save-dev
```

#### 7.4.2. 패턴 2: @vue/composition-api와 vue 2.7.x 충돌
```sh
# 문제 상황
npm list vue @vue/composition-api
# vue@2.7.16
# @vue/composition-api@1.7.2

# 해결 방법
npm install vue@2.6.14 --save
npm install vue-template-compiler@2.6.14 --save-dev
```

#### 7.4.3. 패턴 3: lock 파일 꼬임
```sh
# 문제 상황
# package-lock.json과 yarn.lock이 동시에 존재
# 또는 lock 파일이 최신 상태가 아님

# 해결 방법
rm -rf node_modules package-lock.json yarn.lock
npm install  # 또는 yarn install
```

---

## 8. 요약

- **vue와 vue-template-compiler는 항상 같은 버전이어야 한다.**
- **Vue 2.6.x에서만 @vue/composition-api를 사용한다.**
- **npm list, npm view 명령어로 문제를 진단한다.**
- **peerDependencies는 호스트 프로젝트에서 직접 설치해야 한다.**
- **dedupe는 중복 제거로 성능 최적화를 위한 것이다.**
- **의존성 충돌이 발생하면, node_modules와 lock 파일을 삭제 후 재설치한다.** 