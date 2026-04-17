/**
 * 릴리즈 스크립트
 *
 * changelog 생성 → 빌드 → git commit + tag → push 를 수행한다.
 * release-helper release를 대체한다.
 *
 * 전제 조건:
 *   - 코어 버전이 이미 변경되어 있어야 한다 (package.json)
 *   - publish:version으로 래퍼 버전이 동기화되어 있어야 한다
 *   - working tree가 clean이거나 changelog/버전 변경만 있어야 한다
 *
 * Usage:
 *   node config/release.js [options]
 *
 * Options:
 *   --dry-run      실행하지 않고 명령어만 출력
 *   --skip-build   빌드 건너뛰기
 *   --no-push      push 건너뛰기 (로컬 테스트)
 *   --remote NAME  remote 이름 (기본: origin)
 *   --branch NAME  branch 이름 (기본: master)
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// --- CLI args ---
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const SKIP_BUILD = args.includes("--skip-build");
const NO_PUSH = args.includes("--no-push");
const REMOTE = getArg("--remote") || "origin";
const BRANCH = getArg("--branch") || "master";

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

// --- Helpers ---
function exec(cmd, opts = {}) {
  console.log(`  $ ${cmd}`);
  if (DRY_RUN) return "";
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: "inherit", ...opts });
}

function execOut(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim();
}

function readPkg(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

// --- Package info ---
const PUBLIC_PKGS = [
  "packages/flicking/package.json",
  "packages/flicking-plugins/package.json",
  "packages/react-flicking/package.json",
  "packages/vue3-flicking/package.json",
];

const corePkg = readPkg("packages/flicking/package.json");
const version = corePkg.version;

// --- Validation ---
if (version.includes("-")) {
  console.error(`\n  Error: 릴리즈는 정식 버전에서만 사용한다. (현재: ${version})`);
  console.error("  베타 배포는 pnpm publish:beta를 사용한다.\n");
  process.exit(1);
}

const existingTags = execOut("git tag").split("\n");
if (existingTags.includes(version)) {
  console.error(`\n  Error: 태그 ${version}이 이미 존재한다.\n`);
  process.exit(1);
}

// Find previous tag for changelog range
const prevTag = execOut("git describe --tags --abbrev=0 2>/dev/null || echo ''");

console.log(`\n  Release: ${version}  (prev: ${prevTag || "none"})`);
if (DRY_RUN) console.log("  (dry-run mode)\n");
else console.log("");

// --- 1. Changelog ---
console.log("▸ Changelog 생성");
const changelog = generateChangelog(version, prevTag);
const changelogPath = path.join(ROOT, "CHANGELOG.md");

if (!DRY_RUN) {
  const existing = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, "utf8")
    : "";

  // 기존 내용 앞에 새 엔트리를 삽입
  const header = "# Change Log\n\nAll notable changes to this project will be documented in this file.\n\n";
  const body = existing.replace(/^# Change Log\n+.*\n\n/m, "");
  fs.writeFileSync(changelogPath, header + changelog + "\n" + body);
  console.log(`  → CHANGELOG.md 업데이트 완료\n`);
} else {
  console.log(changelog);
  console.log("");
}

// --- 2. Build ---
if (!SKIP_BUILD) {
  console.log("▸ 빌드");
  exec("pnpm publish:build");
  console.log("");
} else {
  console.log("▸ 빌드 (건너뜀)\n");
}

// --- 3. Commit ---
console.log("▸ Git commit");
exec("git add .");
if (!DRY_RUN) {
  execSync(
    `git commit -am "chore(release): Release ${version}"`,
    { cwd: ROOT, stdio: "inherit" }
  );
} else {
  console.log(`  $ git commit -am "chore(release): Release ${version}"`);
}
console.log("");

// --- 4. Tags ---
console.log("▸ Git tags");
const tags = [version];
for (const rel of PUBLIC_PKGS) {
  const pkg = readPkg(rel);
  tags.push(`${pkg.name}@${pkg.version}`);
}
for (const tag of tags) {
  exec(`git tag "${tag}" -m "${tag}"`);
}
console.log("");

// --- 5. Push ---
if (!NO_PUSH) {
  console.log("▸ Git push");
  exec(`git push --follow-tags ${REMOTE} ${BRANCH}`);
  console.log("");
} else {
  console.log("▸ Git push (건너뜀)\n");
}

// --- 6. GitHub Release ---
const today = new Date().toISOString().slice(0, 10);
console.log("▸ GitHub Release");
console.log("  아래 명령어로 GitHub Release를 생성한다:\n");
console.log(`  gh release create "${version}" \\`);
console.log(`    --title "${version} Release (${today})" \\`);
console.log(`    --generate-notes\n`);

if (DRY_RUN) {
  console.log("✓ dry-run 완료\n");
} else {
  console.log(`✓ ${version} 릴리즈 완료\n`);
}

// --- Changelog generator ---
function generateChangelog(ver, fromTag) {
  const range = fromTag ? `${fromTag}..HEAD` : "HEAD";
  const raw = execOut(
    `git log ${range} --pretty=format:"%H %s" --no-merges`
  );

  if (!raw) return `## ${ver} (${new Date().toISOString().slice(0, 10)})\n\nNo changes.\n`;

  const TYPES = {
    feat: ":rocket: New Features",
    fix: ":bug: Bug Fixes",
    docs: ":memo: Documentation",
    refactor: ":house: Code Refactoring",
    perf: ":zap: Performance",
    test: ":white_check_mark: Tests",
    chore: ":mega: Other",
  };

  const categories = {};
  const repoUrl = "https://github.com/naver/egjs-flicking";

  for (const line of raw.split("\n")) {
    const match = line.match(/^([0-9a-f]+)\s+(\w+)(?:\(([^)]*)\))?:\s*(.+)$/);
    if (!match) {
      // conventional format이 아닌 커밋은 Other로 분류
      const simpleMatch = line.match(/^([0-9a-f]+)\s+(.+)$/);
      if (simpleMatch) {
        const [, hash, msg] = simpleMatch;
        const short = hash.slice(0, 7);
        if (!categories.chore) categories.chore = [];
        categories.chore.push(`* ${msg} ([${short}](${repoUrl}/commit/${hash}))`);
      }
      continue;
    }

    const [, hash, type, scope, subject] = match;
    const short = hash.slice(0, 7);
    const key = TYPES[type] ? type : "chore";
    if (!categories[key]) categories[key] = [];

    const scopePrefix = scope ? `**${scope}:** ` : "";
    categories[key].push(
      `* ${scopePrefix}${subject} ([${short}](${repoUrl}/commit/${hash}))`
    );
  }

  // 버전이 변경된 패키지만 표시 (이전 태그 시점의 버전과 비교)
  const changedPkgs = PUBLIC_PKGS.map(rel => {
    const pkg = readPkg(rel);
    if (fromTag) {
      try {
        const prev = execOut(`git show ${fromTag}:${rel} 2>/dev/null`);
        const prevVersion = JSON.parse(prev).version;
        if (prevVersion === pkg.version) return null;
      } catch { /* 이전 태그에 파일이 없으면 신규 패키지 */ }
    }
    return `* \`${pkg.name}\` ${pkg.version}`;
  }).filter(Boolean);
  const pkgList = changedPkgs.join("\n");

  const date = new Date().toISOString().slice(0, 10);
  const compareLink = fromTag
    ? `[${ver}](${repoUrl}/compare/${fromTag}...${ver})`
    : ver;

  let md = `## ${compareLink} (${date})\n`;
  if (pkgList) {
    md += `### :sparkles: Packages\n${pkgList}\n`;
  }

  for (const [type, label] of Object.entries(TYPES)) {
    if (categories[type]?.length) {
      md += `\n### ${label}\n${categories[type].join("\n")}\n`;
    }
  }

  return md;
}
