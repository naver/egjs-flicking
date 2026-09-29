#!/usr/bin/env node

/**
 * 릴리즈 스크립트 (정식 배포 전용)
 *
 * 되돌릴 수 없는 단계(npm publish)를 파이프라인 맨 뒤에 두기 위해 두 단계로 나뉜다.
 *
 *   1. prepare    릴리즈 브랜치 — pnpm install + changelog + 버전 커밋 (태그·push 없음)
 *   2. (PR → CI → master 머지 → pnpm publish:stable)
 *   3. finalize   master — 레지스트리 검증 → 태그 → push → GitHub Release
 *
 * 보조 커맨드:
 *   status   프리플라이트 + 재개 지점 판별 (--json)
 *   remote   정본(naver/egjs-flicking)을 가리키는 remote 이름 출력
 *
 * Usage:
 *   node config/release.js status [--json] [--fetch] [--package react]
 *   node config/release.js prepare [--package react] [--dry-run] [--skip-install] [--allow-master]
 *   node config/release.js finalize [--package react] [--dry-run] [--notes-file FILE] [--remote NAME] [--branch NAME]
 *   node config/release.js notes [--package react] [--out FILE]
 *   node config/release.js remote
 */
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CANONICAL_REPO = "naver/egjs-flicking";
const REPO_URL = `https://github.com/${CANONICAL_REPO}`;

const PUBLIC_PKGS = [
  "packages/flicking/package.json",
  "packages/flicking-plugins/package.json",
  "packages/react-flicking/package.json",
  "packages/vue3-flicking/package.json",
];

const PKG_ALIAS = {
  core: "packages/flicking/package.json",
  flicking: "packages/flicking/package.json",
  plugins: "packages/flicking-plugins/package.json",
  react: "packages/react-flicking/package.json",
  vue: "packages/vue3-flicking/package.json",
};

// 릴리즈 커밋에 포함하는 경로. `git add .`로 작업 중 파일이 섞여 들어가는 것을 막는다.
const COMMIT_PATHS = ["CHANGELOG.md", "pnpm-lock.yaml", ...PUBLIC_PKGS];

const TYPES = {
  feat: ":rocket: New Features",
  fix: ":bug: Bug Fixes",
  docs: ":memo: Documentation",
  refactor: ":house: Code Refactoring",
  perf: ":zap: Performance",
  test: ":white_check_mark: Tests",
  chore: ":mega: Other",
};

// ---------------------------------------------------------------- 순수 함수

function normalizeRepo(url) {
  const match = String(url).match(/github\.com[/:]([^/\s]+\/[^/\s]+?)(?:\.git)?$/);
  return match ? match[1] : null;
}

/** `git remote -v`의 push 항목을 [{ name, url, repo }]로 파싱한다. */
function parseRemotes(remoteOutput) {
  const remotes = [];

  for (const line of String(remoteOutput).split("\n")) {
    const match = line.trim().match(/^(\S+)\s+(\S+)\s+\((fetch|push)\)$/);
    if (!match) continue;

    const [, name, url, kind] = match;
    if (kind !== "push") continue;
    if (remotes.some(r => r.name === name)) continue;
    remotes.push({ name, url, repo: normalizeRepo(url) });
  }

  return remotes;
}

/**
 * 정본 저장소를 가리키는 remote 이름을 고른다.
 * remote 이름(origin/upstream)이 아니라 URL로 판단하므로 fork 클론에서도 정확하다.
 */
function pickCanonicalRemote(remoteOutput, canonicalRepo = CANONICAL_REPO) {
  const matched = parseRemotes(remoteOutput)
    .filter(r => r.repo === canonicalRepo)
    .map(r => r.name);

  if (!matched.length) return null;
  return matched.find(n => n === "upstream") || matched.find(n => n === "origin") || matched[0];
}

/**
 * 브랜치를 push할 remote를 고른다.
 * 정본에 write 권한이 있으면 정본, 없으면 fork(정본이 아닌 github remote)로 보낸다.
 */
function pickPushRemote(remoteOutput, { canonicalRepo = CANONICAL_REPO, canPushCanonical = true } = {}) {
  const remotes = parseRemotes(remoteOutput).filter(r => r.repo);
  const canonical = remotes.find(r => r.repo === canonicalRepo);

  if (canPushCanonical && canonical) return { ...canonical, isFork: false };

  const fork = remotes.find(r => r.repo !== canonicalRepo);
  if (fork) return { ...fork, isFork: true };

  return canonical ? { ...canonical, isFork: false } : null;
}

function compareVersion(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    const left = pa[i] || 0;
    const right = pb[i] || 0;
    if (left !== right) return left > right ? 1 : -1;
  }
  return 0;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 태그 목록에서 직전 릴리즈 태그를 고른다.
 * prefix가 없으면 bare semver(`4.17.0`), 있으면 패키지 태그(`@egjs/react-flicking@4.16.1`).
 *
 * belowVersion을 주면 그 버전 미만만 후보로 삼는다. 릴리즈가 끝나 현재 버전 태그가
 * 이미 존재할 때 자기 자신을 직전 태그로 잡아 "변경된 패키지 없음"이 되는 것을 막는다.
 */
function pickPrevTag(tags, prefix = "", belowVersion = null) {
  const list = Array.isArray(tags) ? tags : String(tags).split("\n");
  const pattern = new RegExp(`^${escapeRegExp(prefix)}(\\d+\\.\\d+\\.\\d+)$`);
  let best = null;

  for (const raw of list) {
    const tag = raw.trim();
    const match = tag.match(pattern);
    if (!match) continue;
    if (belowVersion && compareVersion(match[1], belowVersion) >= 0) continue;
    if (!best || compareVersion(match[1], best.version) > 0) best = { tag, version: match[1] };
  }

  return best ? best.tag : null;
}

function categorizeCommits(rawLog, repoUrl = REPO_URL) {
  const categories = {};

  const push = (key, text) => {
    if (!categories[key]) categories[key] = [];
    categories[key].push(text);
  };

  for (const line of String(rawLog).split("\n")) {
    if (!line.trim()) continue;

    const match = line.match(/^([0-9a-f]+)\s+(\w+)(?:\(([^)]*)\))?:\s*(.+)$/);
    if (!match) {
      // conventional format이 아닌 커밋은 Other로 분류
      const simple = line.match(/^([0-9a-f]+)\s+(.+)$/);
      if (simple) {
        const [, hash, msg] = simple;
        push("chore", `* ${msg} ([${hash.slice(0, 7)}](${repoUrl}/commit/${hash}))`);
      }
      continue;
    }

    const [, hash, type, scope, subject] = match;
    const key = TYPES[type] ? type : "chore";
    const scopePrefix = scope ? `**${scope}:** ` : "";
    push(key, `* ${scopePrefix}${subject} ([${hash.slice(0, 7)}](${repoUrl}/commit/${hash}))`);
  }

  return categories;
}

function renderChangelog({ tag, prevTag, date, packages = [], categories = {}, repoUrl = REPO_URL }) {
  const heading = prevTag ? `[${tag}](${repoUrl}/compare/${prevTag}...${tag})` : tag;
  let md = `## ${heading} (${date})\n`;

  if (packages.length) {
    md += `### :sparkles: Packages\n${packages.map(p => `* \`${p.name}\` ${p.version}`).join("\n")}\n`;
  }

  let hasEntry = false;
  for (const [type, label] of Object.entries(TYPES)) {
    if (categories[type]?.length) {
      md += `\n### ${label}\n${categories[type].join("\n")}\n`;
      hasEntry = true;
    }
  }

  if (!hasEntry && !packages.length) md += "\nNo changes.\n";

  return md;
}

/**
 * CHANGELOG.md에서 해당 태그의 섹션 본문만 잘라낸다.
 * heading은 `## [4.18.0](compare...)` 또는 `## 4.18.0` 두 형태를 모두 받는다.
 */
function extractChangelogSection(changelog, tag) {
  const lines = String(changelog).split("\n");
  const headingOf = line => {
    const match = line.match(/^## (?:\[([^\]]+)\]\([^)]*\)|(\S+))/);
    return match ? match[1] || match[2] : null;
  };

  const start = lines.findIndex(line => headingOf(line) === tag);
  if (start === -1) return null;

  const rest = lines.slice(start + 1);
  const nextIdx = rest.findIndex(line => headingOf(line) !== null);
  const body = (nextIdx === -1 ? rest : rest.slice(0, nextIdx)).join("\n").trim();

  return body || null;
}

/**
 * 릴리즈 노트 초안 뼈대. Packages 표는 채워서 주고, 산문은 사람이 채운다.
 * 형식은 기존 릴리즈(4.16.x)를 따른다 — Highlights + 자동 PR 목록 결합.
 */
function renderNotesSkeleton(packages = []) {
  const rows = packages.map(p => `| \`${p.name}\` | ${p.version} |`).join("\n");

  return `## Packages

| Package | Version |
|---------|---------|
${rows}

## Highlights

- **(무엇이 바뀌었는지)** — 사용자에게 어떤 영향인지, 왜 중요한지. (#PR)

## Breaking changes

- (없으면 이 섹션을 지운다)

## Deprecated

- (없으면 이 섹션을 지운다)
`;
}

function insertChangelogEntry(existing, entry) {
  const header = "# Change Log\n\nAll notable changes to this project will be documented in this file.\n\n";
  const body = String(existing).replace(/^# Change Log\n+.*\n\n/m, "");
  return header + entry + "\n" + body;
}

/**
 * 저장소 상태만으로 릴리즈 진행 단계를 판별한다.
 * 중간에 실패해도 같은 규칙으로 재개 지점을 찾을 수 있다.
 */
function decideStage(state) {
  const allPublished = state.changedPackages.length > 0 && state.changedPackages.every(p => p.published);

  // 이 버전은 게시·태그·릴리즈까지 끝났다. 새 릴리즈는 버전 범프부터 시작한다.
  if (allPublished && state.tagExists && state.ghReleaseExists) return "released";
  if (!state.changedPackages.length) return "bump";
  if (allPublished) return "finalize";
  if (state.releaseCommit && state.releaseCommit.onReleaseBranch === false) return "publish";
  if (state.releaseCommit) return "merge";
  return "prepare";
}

/**
 * 실제로 다음에 실행할 것. npm 로그인은 어떤 배포 작업보다 앞서는 게이트다.
 * → dev-guide/PUBLISH_GUIDE.md "배포 진행 원칙"
 */
function decideNextStep(state) {
  if (!state.npmUser) return "npm-login";
  return decideStage(state);
}

// ------------------------------------------------------------------ git/실행

function exec(cmd, { dryRun = false } = {}) {
  console.log(`  $ ${cmd}`);
  if (dryRun) return "";
  return execSync(cmd, { cwd: ROOT, stdio: "inherit" });
}

function execOut(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function tryOut(cmd) {
  try {
    return execOut(cmd);
  } catch {
    return null;
  }
}

/**
 * 선행 공백을 보존해야 하는 출력용(`git status --porcelain`의 상태 컬럼 등).
 * execOut의 trim()은 첫 줄 선행 공백까지 지워 경로가 한 글자 잘린다.
 */
function statusFiles() {
  try {
    const out = execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return out.split("\n").filter(Boolean).map(line => line.slice(3));
  } catch {
    return [];
  }
}

function readPkg(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function fail(...lines) {
  console.error(`\n  Error: ${lines[0]}`);
  for (const line of lines.slice(1)) console.error(`  ${line}`);
  console.error("");
  process.exit(1);
}

function resolveTarget(pkgArg) {
  if (!pkgArg) {
    const core = readPkg(PUBLIC_PKGS[0]);
    return { scope: "core", rel: PUBLIC_PKGS[0], name: core.name, version: core.version, tagPrefix: "", tag: core.version };
  }

  const rel = PKG_ALIAS[pkgArg] || PUBLIC_PKGS.find(p => readPkg(p).name === pkgArg);
  if (!rel) fail(`알 수 없는 패키지: ${pkgArg}`, `사용 가능: ${Object.keys(PKG_ALIAS).join(", ")}`);

  const pkg = readPkg(rel);
  return { scope: "package", rel, name: pkg.name, version: pkg.version, tagPrefix: `${pkg.name}@`, tag: `${pkg.name}@${pkg.version}` };
}

function releaseCommitMessage(target) {
  return `chore(release): Release ${target.scope === "core" ? target.version : target.tag}`;
}

function findReleaseCommit(target, limit = 200) {
  const subject = releaseCommitMessage(target);
  const out = tryOut(`git log -n ${limit} --format=%H%x09%s`) || "";

  for (const line of out.split("\n")) {
    const idx = line.indexOf("\t");
    if (idx === -1) continue;

    const sha = line.slice(0, idx);
    const msg = line.slice(idx + 1);
    // squash 머지 시 "(#960)"이 덧붙으므로 접두 일치도 허용한다
    if (msg === subject || msg.startsWith(`${subject} (`)) return { sha, subject: msg };
  }

  return null;
}

function changedPackages(prevTag) {
  return PUBLIC_PKGS.map(rel => {
    const pkg = readPkg(rel);

    if (prevTag) {
      const prev = tryOut(`git show ${prevTag}:${rel}`);
      if (prev) {
        try {
          if (JSON.parse(prev).version === pkg.version) return null;
        } catch {
          /* 이전 태그에 파일이 없으면 신규 패키지 */
        }
      }
    }

    return { rel, name: pkg.name, version: pkg.version };
  }).filter(Boolean);
}

function isPublished(name, version) {
  const out = tryOut(`npm view ${name}@${version} version`);
  return out !== null && out.includes(version);
}

function canonicalRemote() {
  return pickCanonicalRemote(tryOut("git remote -v") || "");
}

// ---------------------------------------------------------------- 커맨드

function cmdRemote() {
  const remote = canonicalRemote();

  if (!remote) {
    console.error(`정본(${CANONICAL_REPO})을 가리키는 remote가 없다. git remote add upstream ${REPO_URL}.git`);
    process.exit(1);
  }

  console.log(remote);
}

function cmdNotes({ pkgArg, outFile }) {
  const target = resolveTarget(pkgArg);
  const prevTag = pickPrevTag(tryOut("git tag --merged HEAD") || "", target.tagPrefix, target.version);
  const pkgs = target.scope === "core"
    ? changedPackages(prevTag)
    : [{ name: target.name, version: target.version }];

  const skeleton = renderNotesSkeleton(pkgs);
  const changelogPath = path.join(ROOT, "CHANGELOG.md");
  const changelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "";
  const section = extractChangelogSection(changelog, target.tag);

  if (outFile) {
    fs.writeFileSync(path.resolve(ROOT, outFile), skeleton);
    console.log(`  → 초안 뼈대: ${outFile}`);
  } else {
    console.log(skeleton);
  }

  console.log("\n  ── 작성 근거 (CHANGELOG 섹션) ──\n");
  console.log(section || "  (CHANGELOG에 해당 버전 섹션이 없다. release:prepare를 먼저 실행한다.)");
  console.log("");
}

function cmdStatus({ json, pkgArg, branchName, fetch: doFetch }) {
  const target = resolveTarget(pkgArg);
  const branch = tryOut("git rev-parse --abbrev-ref HEAD");
  const remoteOutput = tryOut("git remote -v") || "";
  const canonical = pickCanonicalRemote(remoteOutput);

  if (doFetch && canonical) tryOut(`git fetch --quiet ${canonical} ${branchName}`);
  const dirtyFiles = statusFiles();
  const allTags = (tryOut("git tag") || "").split("\n");
  const prevTag = pickPrevTag(tryOut("git tag --merged HEAD") || "", target.tagPrefix, target.version);

  const targets = target.scope === "core"
    ? changedPackages(prevTag)
    : [{ rel: target.rel, name: target.name, version: target.version }];

  const pkgs = targets.map(p => ({
    name: p.name,
    version: p.version,
    published: isPublished(p.name, p.version),
    tagged: allTags.includes(`${p.name}@${p.version}`),
  }));

  const commit = findReleaseCommit(target);
  const releaseCommit = commit
    ? { sha: commit.sha, onReleaseBranch: branch !== branchName }
    : null;

  // 현재 브랜치가 push되어 있는지 (upstream 없으면 pushed=false)
  const upstream = tryOut("git rev-parse --abbrev-ref --symbolic-full-name @{u}");
  const ahead = upstream ? Number(tryOut(`git rev-list --count ${upstream}..HEAD`) || 0) : null;

  // HEAD가 모르는 정본 master 커밋 수 (>0이면 브랜치 베이스가 낡았다 — 마지막 fetch 기준).
  // 해당 remote 브랜치를 한 번도 fetch하지 않았으면 판단 불가이므로 0이 아니라 null이다.
  const baseRef = canonical ? `${canonical}/${branchName}` : null;
  const baseKnown = baseRef !== null && tryOut(`git rev-parse --verify --quiet ${baseRef}`) !== null;
  const baseBehind = baseKnown
    ? Number(tryOut(`git rev-list --count HEAD..${baseRef}`) || 0)
    : null;

  const permission = tryOut(`gh repo view ${CANONICAL_REPO} --json viewerPermission -q .viewerPermission`);
  const canPushCanonical = ["ADMIN", "MAINTAIN", "WRITE"].includes(permission || "");
  const pushRemote = pickPushRemote(remoteOutput, { canPushCanonical });

  const state = {
    scope: target.scope,
    package: target.name,
    version: target.version,
    tag: target.tag,
    branch,
    clean: dirtyFiles.length === 0,
    dirtyFiles,
    upstream,
    pushed: upstream !== null && ahead === 0,
    unpushedCommits: ahead,
    baseBehind,
    baseRef,
    canonicalRemote: canonical,
    canonicalPermission: permission,
    canPushCanonical,
    pushRemote: pushRemote ? pushRemote.name : null,
    isFork: pushRemote ? pushRemote.isFork : false,
    prHead: pushRemote && pushRemote.isFork ? `${pushRemote.repo.split("/")[0]}:${branch}` : branch,
    prevTag,
    npmUser: tryOut("npm whoami"),
    ghAuth: tryOut("gh auth status --hostname github.com") !== null,
    changedPackages: pkgs,
    releaseCommit,
    tagExists: allTags.includes(target.tag),
    ghReleaseExists: tryOut(`gh release view "${target.tag}" --repo ${CANONICAL_REPO} --json tagName`) !== null,
  };

  state.stage = decideStage(state);
  state.nextStep = decideNextStep(state);

  if (json) {
    console.log(JSON.stringify(state, null, 2));
    return;
  }

  console.log(`\n  Release status — ${target.tag} (prev: ${state.prevTag || "none"})\n`);
  console.log(`  branch            ${state.branch}${state.clean ? "" : `  (dirty: ${state.dirtyFiles.length} files)`}`);
  console.log(`  pushed            ${state.upstream ? `${state.pushed ? "yes" : `no — ${state.unpushedCommits}커밋 미푸시`} (${state.upstream})` : "no — upstream 없음"}`);
  const baseLine = state.baseBehind === null
    ? `(판단 불가 — ${state.canonicalRemote ? `${state.canonicalRemote}/${branchName}를 fetch하지 않음` : "정본 remote 없음"})`
    : state.baseBehind === 0
      ? `${branchName} 최신`
      : `${branchName}보다 ${state.baseBehind}커밋 뒤 — 브랜치를 다시 만들어야 한다`;
  console.log(`  base              ${baseLine}`);
  console.log(`  canonical remote  ${state.canonicalRemote || "(없음)"}  perm:${state.canonicalPermission || "unknown"}`);
  console.log(`  push remote       ${state.pushRemote || "(없음)"}${state.isFork ? "  (fork — PR head: " + state.prHead + ")" : ""}`);
  console.log(`  npm user          ${state.npmUser || "(로그인 안 됨)"}`);
  console.log(`  gh auth           ${state.ghAuth ? "ok" : "(인증 안 됨)"}`);
  console.log(`  release commit    ${state.releaseCommit ? state.releaseCommit.sha.slice(0, 9) : "(없음)"}`);
  console.log(`  tag               ${state.tagExists ? "있음" : "없음"}`);
  console.log(`  GitHub Release    ${state.ghReleaseExists ? "있음" : "없음"}`);
  console.log("\n  packages");
  for (const p of state.changedPackages) {
    console.log(`    ${p.name}@${p.version}  npm:${p.published ? "게시됨" : "미게시"}  tag:${p.tagged ? "있음" : "없음"}`);
  }
  if (!state.changedPackages.length) console.log("    (직전 태그 이후 버전이 바뀐 패키지 없음)");
  console.log(`\n  stage             ${state.stage}`);
  console.log(`  next step         ${state.nextStep}\n`);
}

function cmdPrepare({ dryRun, skipInstall, allowMaster, pkgArg, branchName }) {
  const target = resolveTarget(pkgArg);

  if (target.version.includes("-")) {
    fail(`릴리즈는 정식 버전에서만 사용한다. (현재: ${target.version})`, "베타 배포는 pnpm publish:beta를 사용한다.");
  }

  const allTags = (tryOut("git tag") || "").split("\n");
  if (allTags.includes(target.tag)) fail(`태그 ${target.tag}이 이미 존재한다.`);

  const branch = tryOut("git rev-parse --abbrev-ref HEAD");
  if (branch === branchName && !allowMaster) {
    fail(
      `${branchName}에서 직접 실행할 수 없다.`,
      `릴리즈 브랜치에서 실행한다: git checkout -b release/core-${target.version}`,
      "브랜치 없이 진행하려면 --allow-master."
    );
  }

  if (findReleaseCommit(target)) fail(`이미 ${target.tag} 릴리즈 커밋이 존재한다.`, "진행 상태는 pnpm release:status로 확인한다.");

  const prevTag = pickPrevTag(tryOut("git tag --merged HEAD") || "", target.tagPrefix, target.version);
  const pkgs = target.scope === "core"
    ? changedPackages(prevTag)
    : [{ name: target.name, version: target.version }];

  if (!pkgs.length) fail("직전 태그 이후 버전이 바뀐 패키지가 없다.", "package.json version을 먼저 변경한다.");

  console.log(`\n  Prepare: ${target.tag}  (prev: ${prevTag || "none"})`);
  if (dryRun) console.log("  (dry-run mode)");
  console.log("");

  // --- 1. install (버전 변경분을 workspace에 반영) ---
  if (skipInstall) {
    console.log("▸ pnpm install (건너뜀)\n");
  } else {
    console.log("▸ pnpm install");
    exec("pnpm install", { dryRun });
    console.log("");
  }

  // --- 2. Changelog ---
  console.log("▸ Changelog 생성");
  const range = prevTag ? `${prevTag}..HEAD` : "HEAD";
  const rawLog = execOut(`git log ${range} --pretty=format:"%H %s" --no-merges`);
  const entry = renderChangelog({
    tag: target.tag,
    prevTag,
    date: today(),
    packages: pkgs,
    categories: categorizeCommits(rawLog),
  });

  const changelogPath = path.join(ROOT, "CHANGELOG.md");
  if (dryRun) {
    console.log("");
    console.log(entry);
  } else {
    const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "";
    fs.writeFileSync(changelogPath, insertChangelogEntry(existing, entry));
    console.log("  → CHANGELOG.md 업데이트 완료\n");
  }

  // --- 3. Commit (릴리즈 대상 경로만) ---
  const unrelated = statusFiles().filter(f => !COMMIT_PATHS.includes(f));

  if (unrelated.length) {
    console.log("▸ 릴리즈 커밋에 포함하지 않는 변경 (그대로 남는다)");
    for (const f of unrelated) console.log(`  · ${f}`);
    console.log("");
  }

  console.log("▸ Git commit");
  exec(`git add ${COMMIT_PATHS.join(" ")}`, { dryRun });
  exec(`git commit -m "${releaseCommitMessage(target)}"`, { dryRun });
  console.log("");

  console.log("✓ prepare 완료 — 다음 단계\n");
  console.log(`  1. PR 생성 후 CI 통과를 확인한다 (gh pr create --base ${branchName})`);
  console.log(`  2. merge commit으로 ${branchName}에 머지한다 (squash 금지 — 릴리즈 커밋 SHA 보존)`);
  console.log(`  3. ${branchName}에서 pnpm publish:stable 로 npm에 게시한다`);
  console.log("  4. pnpm release:finalize 로 태그·push·GitHub Release를 생성한다\n");
}

function cmdFinalize({ dryRun, notesFile, remoteName, branchName, pkgArg }) {
  const target = resolveTarget(pkgArg);
  const branch = tryOut("git rev-parse --abbrev-ref HEAD");

  if (branch !== branchName) {
    fail(`finalize는 ${branchName}에서 실행한다. (현재: ${branch})`, `git checkout ${branchName} && git pull`);
  }

  const commit = findReleaseCommit(target);
  if (!commit) {
    fail(
      `${branchName}에서 ${target.tag} 릴리즈 커밋을 찾을 수 없다.`,
      "prepare → PR → 머지가 끝났는지 확인한다. (pnpm release:status)"
    );
  }

  const remote = remoteName || canonicalRemote();
  if (!remote) fail(`정본(${CANONICAL_REPO})을 가리키는 remote가 없다.`, `git remote add upstream ${REPO_URL}.git`);

  // --- 1. 원격 최신 여부 ---
  console.log(`\n  Finalize: ${target.tag}  (remote: ${remote})`);
  if (dryRun) console.log("  (dry-run mode)");
  console.log("");

  console.log("▸ 원격 상태 확인");
  exec(`git fetch ${remote} ${branchName}`, { dryRun });
  const behind = tryOut(`git rev-list --count HEAD..${remote}/${branchName}`);
  if (!dryRun && behind && Number(behind) > 0) {
    fail(`${branchName}가 ${remote}보다 ${behind}커밋 뒤처져 있다.`, `git pull ${remote} ${branchName} 후 다시 실행한다.`);
  }
  console.log("");

  // --- 2. npm 게시 검증 (publish가 선행되었는지) ---
  const prevTag = pickPrevTag(tryOut("git tag --merged HEAD") || "", target.tagPrefix, target.version);
  const pkgs = target.scope === "core"
    ? changedPackages(prevTag)
    : [{ name: target.name, version: target.version }];

  console.log("▸ npm 레지스트리 검증");
  const missing = [];
  for (const p of pkgs) {
    const published = isPublished(p.name, p.version);
    console.log(`  ${published ? "✓" : "✗"} ${p.name}@${p.version}`);
    if (!published) missing.push(`${p.name}@${p.version}`);
  }
  if (missing.length) {
    fail(
      `npm에 아직 게시되지 않은 패키지가 있다: ${missing.join(", ")}`,
      "태그·릴리즈는 publish 성공 후에 만든다. pnpm publish:stable 을 먼저 실행한다."
    );
  }
  console.log("");

  // --- 3. 태그 (릴리즈 커밋에 부착) ---
  console.log("▸ Git tags");
  const tags = target.scope === "core"
    ? [target.version, ...pkgs.map(p => `${p.name}@${p.version}`)]
    : [target.tag];
  const allTags = (tryOut("git tag") || "").split("\n");

  for (const tag of tags) {
    if (allTags.includes(tag)) {
      console.log(`  ⏭  ${tag} (이미 존재 — 건너뜀)`);
      continue;
    }
    exec(`git tag "${tag}" -m "${tag}" ${commit.sha}`, { dryRun });
  }
  console.log("");

  // --- 4. Push ---
  console.log("▸ Git push");
  exec(`git push --follow-tags ${remote} ${branchName}`, { dryRun });
  console.log("");

  // --- 5. GitHub Release ---
  const date = tryOut(`git log -1 --format=%cs ${commit.sha}`) || today();
  const title = `${target.tag} Release (${date})`;

  // 본문 우선순위: 직접 작성한 노트 → CHANGELOG 섹션 → 자동 생성만
  let notesPath = notesFile;
  if (!notesPath) {
    const changelogPath = path.join(ROOT, "CHANGELOG.md");
    const changelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "";
    const section = extractChangelogSection(changelog, target.tag);

    if (section) {
      notesPath = path.join(os.tmpdir(), `flicking-release-notes-${target.version}.md`);
      if (!dryRun) fs.writeFileSync(notesPath, `${section}\n`);
      console.log("  --notes-file이 없어 CHANGELOG 섹션을 본문으로 사용한다.");
      console.log("  하이라이트를 직접 쓰려면: node config/release.js notes --out FILE\n");
    }
  }

  const notesArg = notesPath ? ` --notes-file ${notesPath}` : "";
  const createCmd =
    `gh release create "${target.tag}" --repo ${CANONICAL_REPO} --title "${title}"${notesArg} --generate-notes`;

  console.log("▸ GitHub Release");
  if (tryOut(`gh release view "${target.tag}" --repo ${CANONICAL_REPO} --json tagName`) !== null) {
    console.log(`  ⏭  ${target.tag} 릴리즈가 이미 존재한다.`);
    console.log(`  본문을 갱신하려면: gh release edit "${target.tag}" --repo ${CANONICAL_REPO} --notes-file FILE`);
  } else if (tryOut("gh --version") === null) {
    console.log("  gh CLI가 없다. 아래 명령어로 직접 생성한다:\n");
    console.log(`  ${createCmd}`);
  } else {
    exec(createCmd, { dryRun });
  }
  console.log("");

  const docsScript = remote === "origin" ? "pnpm docs:deploy-origin" : "pnpm docs:deploy";
  console.log(`✓ ${target.tag} 릴리즈 완료 — 마지막으로 문서 사이트를 배포한다: ${docsScript}\n`);
}

function usage() {
  console.log(`
  릴리즈는 두 단계로 실행한다 (머지 후 publish 순서 보장).

    pnpm release:status                진행 상태·재개 지점 확인
    pnpm release:prepare               릴리즈 브랜치: changelog + 버전 커밋
    (PR → CI → master 머지 → pnpm publish:stable)
    pnpm release:notes --out FILE      릴리즈 노트 초안 뼈대 생성
    pnpm release:finalize              master: 태그 + push + GitHub Release

  옵션: --package {core|react|vue|plugins} --dry-run --skip-install --allow-master
        --notes-file FILE --out FILE --remote NAME --branch NAME --json --fetch

  전체 절차는 /release 스킬 또는 dev-guide/PUBLISH_GUIDE.md 참조.
`);
}

// ---------------------------------------------------------------- CLI

if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = name => {
    const idx = args.indexOf(name);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
  };

  const command = args.find(a => !a.startsWith("--"));
  const options = {
    json: args.includes("--json"),
    fetch: args.includes("--fetch"),
    dryRun: args.includes("--dry-run"),
    skipInstall: args.includes("--skip-install"),
    allowMaster: args.includes("--allow-master"),
    notesFile: getArg("--notes-file"),
    remoteName: getArg("--remote"),
    branchName: getArg("--branch") || "master",
    pkgArg: getArg("--package"),
    outFile: getArg("--out"),
  };

  switch (command) {
    case "status":
      cmdStatus(options);
      break;
    case "prepare":
      cmdPrepare(options);
      break;
    case "finalize":
      cmdFinalize(options);
      break;
    case "notes":
      cmdNotes(options);
      break;
    case "remote":
      cmdRemote();
      break;
    default:
      usage();
      process.exit(command ? 1 : 1);
  }
}

module.exports = {
  normalizeRepo,
  parseRemotes,
  pickCanonicalRemote,
  pickPushRemote,
  compareVersion,
  pickPrevTag,
  categorizeCommits,
  renderChangelog,
  insertChangelogEntry,
  extractChangelogSection,
  renderNotesSkeleton,
  decideStage,
  decideNextStep,
};
