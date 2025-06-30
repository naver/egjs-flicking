/* eslint-disable */

/**
 * 프레임워크 컴포넌트를 디버깅할 때 코어 바닐라 로직을 수정하면서 확인할 필요가 있을 때,
 * 이 스크립트를 이용하면 바닐라 로직 수정사항이 프레임워크 컴포넌트 로컬 데모환경에도 반영된다.
 * 다만, 바닐라 로직 수정 이후 리액트 데모에 핫 모듈 리로딩까지는 되지 않는다. 
 * 따라서 수정 사항들을 추가적으로 반영해주려면 바닐라를 다시 빌드해야 한다. 링크는 다시 하지 않아도 된다.
 *
 * 인자로 프레임워크 컴포넌트 패키지의 루트 디렉토리를 제공하면 된다.
 * 인자를 제공하지 않으면 packages 하위의 전체 프레임워크 패키지에 대해 링크를 시도한다.
 *
 * 사용 예시: node core-package-link.js react-flicking
 * 
 * 
 * 개발 흐름: 
 * 1. 이 스크립트를 실행
 * 2. 바닐라 로직 수정 후 빌드 수행
 * 3. 프레임워크 컴포넌트의 데모를 실행 (바닐라 로직 변경사항이 반영됨)
 * 4. 바닐라 로직 추가 수정 후 빌드 수행
 * 5. 프레임워크 컴포넌트의 데모를 새로고침 (바닐라 로직 변경사항이 반영됨)
 *   - 원래는 새로고침만 하면 되야 하지만 타입 에러가 발생하는 경우가 있어 데모를 중지하고 다시 실행해야 할 수도 있다.
 * 
 * 
 */



function run(cmd, cwd = process.cwd()) {
  console.log(`\n▶️ Running: ${cmd} (in ${cwd})`);
  execSync(cmd, { stdio: "inherit", cwd });
}

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const frameworks = [
  "ngx-flicking",
  "preact-flicking",
  "react-flicking",
  "vue-flicking",
  "vue3-flicking",
  "svelte-flicking",
];

const args = process.argv.slice(2);
const targetDir = args[0];

if (!targetDir) {
  console.log(
    "❗️ 디렉토리명을 인자로 입력하지 않았습니다. 전체 프레임워크에 대해 링크를 시도합니다."
  );
  run("npm run build");
  run("npm link");
  frameworks.forEach((target) => {
    const fullPath = path.resolve(process.cwd(), "packages", target);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ 디렉토리 없음: ${fullPath}`);
      process.exit(1);
    }
    run(`npm link '@egjs/flicking'`, fullPath);
  });
} else {
  const fullPath = path.resolve(process.cwd(), "packages", targetDir);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 디렉토리 없음: ${fullPath}`);
    process.exit(1);
  }

  run("npm run build");
  run("npm link");
  run(`npm link '@egjs/flicking'`, fullPath);
}


