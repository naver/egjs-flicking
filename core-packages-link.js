/* eslint-disable */

/**
 * 프레임워크 컴포넌트를 디버깅할 때 코어 바닐라 로직을 수정하면서 확인할 필요가 있을 때,
 * 이 스크립트를 이용하면 바닐라 로직 수정사항이 프레임워크 컴포넌트 로컬 데모환경에도 반영된다.
 * 
 * 인자로 프레임워크 컴포넌트 패키지의 루트 디렉토리를 제공하면 된다.
 *
 * 사용 예시: node core-package-link.js react-flicking
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const targetDir = args[0];

if (!targetDir) {
  console.error("❌ 디렉토리명을 인자로 입력하세요.");
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), 'packages', targetDir);
if (!fs.existsSync(fullPath)) {
  console.error(`❌ 디렉토리 없음: ${fullPath}`);
  process.exit(1);
}

function run(cmd, cwd = process.cwd()) {
  console.log(`\n▶️ Running: ${cmd} (in ${cwd})`);
  execSync(cmd, { stdio: "inherit", cwd });
}

run("npm run build");
run("npm link");
run(`npm link '@egjs/flicking'`, fullPath);
run("npm run build", fullPath);
