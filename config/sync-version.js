/**
 * 코어(@egjs/flicking)의 version을 기준으로
 * dependencies에 코어를 가진 래퍼 패키지들의 version을 동기화한다.
 *
 * 버전 정책:
 *   - major: 래퍼의 major = 코어의 major (minor/patch 리셋)
 *   - minor: 래퍼의 minor +1, patch 리셋
 *   - patch: 래퍼의 patch +1
 *
 * 정식 배포 전용. 베타 배포 시에는 각 패키지 버전을 수동으로 관리한다.
 *
 * Usage:
 *   node config/sync-version.js patch
 *   node config/sync-version.js minor
 *   node config/sync-version.js major
 */
const fs = require("fs");
const path = require("path");

function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!match) throw new Error(`Invalid version: ${version}`);
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] || "",
  };
}

function formatVersion({ major, minor, patch, prerelease }) {
  const base = `${major}.${minor}.${patch}`;
  return prerelease ? `${base}-${prerelease}` : base;
}

/**
 * 코어 버전과 래퍼의 현재 버전, bump 타입을 받아 래퍼의 새 버전을 계산한다.
 * @param {string} coreVersion - 코어 버전 (e.g. "4.17.0")
 * @param {string} wrapperVersion - 래퍼의 현재 버전 (e.g. "4.18.0")
 * @param {"major"|"minor"|"patch"} bumpType - bump 타입
 * @returns {string} 래퍼의 새 버전
 */
function calcNextVersion(coreVersion, wrapperVersion, bumpType) {
  const core = parseVersion(coreVersion);
  const prev = parseVersion(wrapperVersion);

  let next;

  if (bumpType === "major") {
    next = { major: core.major, minor: 0, patch: 0, prerelease: "" };
  } else if (bumpType === "minor") {
    const newMinor = Math.max(core.minor, prev.minor + 1);
    next = { major: core.major, minor: newMinor, patch: 0, prerelease: "" };
  } else {
    next = { major: core.major, minor: prev.minor, patch: prev.patch + 1, prerelease: "" };
  }

  return formatVersion(next);
}

// CLI 실행
if (require.main === module) {
  const ROOT = path.resolve(__dirname, "..");
  const CORE_PKG = "packages/flicking/package.json";
  const WRAPPER_PKGS = [
    "packages/react-flicking/package.json",
    "packages/vue3-flicking/package.json",
  ];

  const bumpType = process.argv[2];

  if (!bumpType || !["major", "minor", "patch"].includes(bumpType)) {
    console.error(
      "Usage: node config/sync-version.js <major|minor|patch>\n" +
      "  major  코어 메이저 업데이트 시 (래퍼 메이저 동기화)\n" +
      "  minor  코어 마이너 업데이트 시 (래퍼 마이너 +1)\n" +
      "  patch  코어 패치 업데이트 시 (래퍼 패치 +1)"
    );
    process.exit(1);
  }

  const coreJson = JSON.parse(fs.readFileSync(path.join(ROOT, CORE_PKG), "utf8"));
  console.log(`Core version: ${coreJson.version} (bump type: ${bumpType})\n`);

  let changed = 0;

  for (const rel of WRAPPER_PKGS) {
    const abs = path.join(ROOT, rel);
    const json = JSON.parse(fs.readFileSync(abs, "utf8"));
    const nextStr = calcNextVersion(coreJson.version, json.version, bumpType);

    if (json.version === nextStr) {
      console.log(`  ${json.name}@${json.version} — already up to date`);
      continue;
    }

    const prev = json.version;
    json.version = nextStr;
    fs.writeFileSync(abs, JSON.stringify(json, null, 2) + "\n");
    console.log(`  ${json.name}: ${prev} → ${nextStr}`);
    changed++;
  }

  console.log(changed > 0 ? `\n${changed} package(s) updated.` : "\nNothing to update.");
}

module.exports = { parseVersion, formatVersion, calcNextVersion };
