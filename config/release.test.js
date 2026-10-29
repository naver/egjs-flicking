import { describe, expect, it } from "vitest";
import {
  categorizeCommits,
  compareVersion,
  decideNextStep,
  decideStage,
  diffPackFiles,
  extractChangelogSection,
  findForbiddenFiles,
  insertChangelogEntry,
  isVersionOnlyChange,
  normalizeRepo,
  parseRemotes,
  pickCanonicalRemote,
  pickPushRemote,
  pickPrevTag,
  releaseDiffBlockers,
  renderChangelog,
  renderNotesSkeleton,
  summarizeCheckRuns,
  summarizePaths,
  workspaceDepMismatches,
} from "./release.js";

const REMOTES_ORIGIN_CANONICAL = `origin\thttps://github.com/naver/egjs-flicking.git (fetch)
origin\thttps://github.com/naver/egjs-flicking.git (push)`;

const REMOTES_FORK = `origin\tgit@github.com:someone/egjs-flicking.git (fetch)
origin\tgit@github.com:someone/egjs-flicking.git (push)
upstream\thttps://github.com/naver/egjs-flicking.git (fetch)
upstream\thttps://github.com/naver/egjs-flicking.git (push)`;

describe("normalizeRepo", () => {
  it("https URL에서 owner/repo를 뽑는다", () => {
    expect(normalizeRepo("https://github.com/naver/egjs-flicking.git")).toBe("naver/egjs-flicking");
  });

  it("ssh URL에서 owner/repo를 뽑는다", () => {
    expect(normalizeRepo("git@github.com:naver/egjs-flicking.git")).toBe("naver/egjs-flicking");
  });

  it(".git 접미사가 없어도 파싱한다", () => {
    expect(normalizeRepo("https://github.com/naver/egjs-flicking")).toBe("naver/egjs-flicking");
  });

  it("github이 아니면 null", () => {
    expect(normalizeRepo("https://gitlab.com/naver/egjs-flicking.git")).toBeNull();
  });
});

describe("pickCanonicalRemote", () => {
  it("origin이 정본이면 origin", () => {
    expect(pickCanonicalRemote(REMOTES_ORIGIN_CANONICAL)).toBe("origin");
  });

  it("origin이 fork면 정본을 가리키는 upstream을 고른다", () => {
    expect(pickCanonicalRemote(REMOTES_FORK)).toBe("upstream");
  });

  it("정본을 가리키는 remote가 없으면 null", () => {
    const remotes = `origin\thttps://github.com/someone/egjs-flicking.git (fetch)
origin\thttps://github.com/someone/egjs-flicking.git (push)`;
    expect(pickCanonicalRemote(remotes)).toBeNull();
  });
});

describe("parseRemotes", () => {
  it("push 항목만 중복 없이 파싱한다", () => {
    expect(parseRemotes(REMOTES_FORK)).toEqual([
      { name: "origin", url: "git@github.com:someone/egjs-flicking.git", repo: "someone/egjs-flicking" },
      { name: "upstream", url: "https://github.com/naver/egjs-flicking.git", repo: "naver/egjs-flicking" },
    ]);
  });

  it("remote가 없으면 빈 배열", () => {
    expect(parseRemotes("")).toEqual([]);
  });
});

describe("pickPushRemote", () => {
  it("정본에 write 권한이 있으면 정본으로 push한다", () => {
    expect(pickPushRemote(REMOTES_ORIGIN_CANONICAL, { canPushCanonical: true }))
      .toMatchObject({ name: "origin", isFork: false });
  });

  it("정본 권한이 없으면 fork remote로 push한다", () => {
    expect(pickPushRemote(REMOTES_FORK, { canPushCanonical: false }))
      .toMatchObject({ name: "origin", repo: "someone/egjs-flicking", isFork: true });
  });

  it("정본 권한이 있으면 fork 클론에서도 upstream으로 push한다", () => {
    expect(pickPushRemote(REMOTES_FORK, { canPushCanonical: true }))
      .toMatchObject({ name: "upstream", isFork: false });
  });

  it("권한이 없고 fork도 없으면 정본으로 되돌린다 (push 시 실패는 git이 알린다)", () => {
    expect(pickPushRemote(REMOTES_ORIGIN_CANONICAL, { canPushCanonical: false }))
      .toMatchObject({ name: "origin", isFork: false });
  });

  it("github remote가 없으면 null", () => {
    expect(pickPushRemote("origin\t/local/path (push)")).toBeNull();
  });
});

describe("compareVersion", () => {
  it("patch를 수치로 비교한다 (문자열 정렬이면 4.16.9 > 4.16.10)", () => {
    expect(compareVersion("4.16.10", "4.16.9")).toBe(1);
  });

  it("같으면 0", () => {
    expect(compareVersion("4.17.0", "4.17.0")).toBe(0);
  });
});

describe("pickPrevTag", () => {
  const TAGS = [
    "4.16.4",
    "4.16.10",
    "4.17.0",
    "@egjs/flicking@4.17.0",
    "@egjs/react-flicking@4.16.6",
    "@egjs/react-flicking@4.17.0",
  ];

  it("prefix가 없으면 bare semver 중 최신을 고른다", () => {
    expect(pickPrevTag(TAGS)).toBe("4.17.0");
  });

  it("패키지 태그는 bare 태그로 잡히지 않는다", () => {
    expect(pickPrevTag(["@egjs/flicking@4.17.0"])).toBeNull();
  });

  it("prefix를 주면 해당 패키지 태그 중 최신을 고른다", () => {
    expect(pickPrevTag(TAGS, "@egjs/react-flicking@")).toBe("@egjs/react-flicking@4.17.0");
  });

  it("개행 문자열도 받는다", () => {
    expect(pickPrevTag("4.16.4\n4.17.0\n")).toBe("4.17.0");
  });

  it("해당하는 태그가 없으면 null", () => {
    expect(pickPrevTag([], "@egjs/vue3-flicking@")).toBeNull();
  });

  it("belowVersion을 주면 그 버전 이상 태그는 제외한다 (자기 자신 배제)", () => {
    expect(pickPrevTag(TAGS, "", "4.17.0")).toBe("4.16.10");
  });

  it("belowVersion 미만 태그가 없으면 null", () => {
    expect(pickPrevTag(["4.17.0"], "", "4.17.0")).toBeNull();
  });
});

describe("categorizeCommits", () => {
  it("type별로 분류하고 scope를 굵게 표시한다", () => {
    const log = [
      "aaaaaaaaaaaa1 feat(core): add usePercentagePos",
      "bbbbbbbbbbbb2 fix: resize jitter",
    ].join("\n");
    const result = categorizeCommits(log);

    expect(result.feat[0]).toContain("**core:** add usePercentagePos");
    expect(result.fix[0]).toContain("resize jitter");
  });

  it("알 수 없는 type은 chore로 분류한다", () => {
    const result = categorizeCommits("aaaaaaaaaaaa1 build: bump rollup");
    expect(result.chore).toHaveLength(1);
  });

  it("conventional format이 아니면 chore로 분류한다", () => {
    const result = categorizeCommits("aaaaaaaaaaaa1 just a message");
    expect(result.chore[0]).toContain("just a message");
  });

  it("커밋 링크를 short hash로 만든다", () => {
    const result = categorizeCommits("abcdef1234567 fix: something");
    expect(result.fix[0]).toContain("([abcdef1](https://github.com/naver/egjs-flicking/commit/abcdef1234567))");
  });
});

describe("renderChangelog", () => {
  it("이전 태그가 있으면 compare 링크를 만든다", () => {
    const md = renderChangelog({
      tag: "4.18.0",
      prevTag: "4.17.0",
      date: "2026-09-10",
      packages: [{ name: "@egjs/flicking", version: "4.18.0" }],
      categories: { fix: ["* something"] },
    });

    expect(md).toContain("## [4.18.0](https://github.com/naver/egjs-flicking/compare/4.17.0...4.18.0) (2026-09-10)");
    expect(md).toContain("`@egjs/flicking` 4.18.0");
    expect(md).toContain(":bug: Bug Fixes");
  });

  it("이전 태그가 없으면 링크 없이 버전만 쓴다", () => {
    const md = renderChangelog({ tag: "4.18.0", prevTag: null, date: "2026-09-10" });
    expect(md).toContain("## 4.18.0 (2026-09-10)");
    expect(md).toContain("No changes.");
  });

  it("패키지 태그도 heading으로 쓸 수 있다", () => {
    const md = renderChangelog({
      tag: "@egjs/react-flicking@4.17.1",
      prevTag: "@egjs/react-flicking@4.17.0",
      date: "2026-09-10",
      packages: [{ name: "@egjs/react-flicking", version: "4.17.1" }],
    });
    expect(md).toContain("## [@egjs/react-flicking@4.17.1]");
  });
});

describe("insertChangelogEntry", () => {
  it("기존 엔트리 위에 새 엔트리를 삽입한다", () => {
    const existing = "# Change Log\n\nAll notable changes to this project will be documented in this file.\n\n## 4.17.0 (2026-09-01)\n";
    const result = insertChangelogEntry(existing, "## 4.18.0 (2026-09-10)\n");

    expect(result.indexOf("4.18.0")).toBeLessThan(result.indexOf("4.17.0"));
    expect(result.match(/# Change Log/g)).toHaveLength(1);
  });

  it("파일이 비어 있어도 헤더를 만든다", () => {
    expect(insertChangelogEntry("", "## 4.18.0\n")).toContain("# Change Log");
  });
});

describe("extractChangelogSection", () => {
  const CHANGELOG = `# Change Log

All notable changes to this project will be documented in this file.

## [4.18.0](https://github.com/naver/egjs-flicking/compare/4.17.0...4.18.0) (2026-09-10)
### :rocket: New Features
* 새 옵션 추가

## [4.17.0](https://github.com/naver/egjs-flicking/compare/4.16.4...4.17.0) (2026-09-01)
### :bug: Bug Fixes
* 이전 릴리즈 수정
`;

  it("compare 링크 heading에서 해당 섹션만 잘라낸다", () => {
    const section = extractChangelogSection(CHANGELOG, "4.18.0");
    expect(section).toContain("새 옵션 추가");
    expect(section).not.toContain("이전 릴리즈 수정");
  });

  it("링크 없는 heading도 인식한다", () => {
    expect(extractChangelogSection("## 4.18.0 (2026-09-10)\n* 변경\n", "4.18.0")).toContain("변경");
  });

  it("패키지 태그 heading도 인식한다", () => {
    const cl = "## [@egjs/react-flicking@4.17.1](https://x/compare/a...b) (2026-09-10)\n* 래퍼 수정\n";
    expect(extractChangelogSection(cl, "@egjs/react-flicking@4.17.1")).toContain("래퍼 수정");
  });

  it("해당 버전이 없으면 null", () => {
    expect(extractChangelogSection(CHANGELOG, "4.19.0")).toBeNull();
  });

  it("섹션이 비어 있으면 null", () => {
    expect(extractChangelogSection("## 4.18.0\n\n## 4.17.0\n* 이전\n", "4.18.0")).toBeNull();
  });
});

describe("renderNotesSkeleton", () => {
  it("Packages 표를 채우고 Highlights 자리를 남긴다", () => {
    const md = renderNotesSkeleton([
      { name: "@egjs/flicking", version: "4.18.0" },
      { name: "@egjs/react-flicking", version: "4.18.0" },
    ]);

    expect(md).toContain("| `@egjs/flicking` | 4.18.0 |");
    expect(md).toContain("| `@egjs/react-flicking` | 4.18.0 |");
    expect(md).toContain("## Highlights");
    expect(md).toContain("## Breaking changes");
  });

  it("패키지가 없어도 표 머리는 유지한다", () => {
    expect(renderNotesSkeleton()).toContain("| Package | Version |");
  });
});

describe("decideStage", () => {
  const base = {
    changedPackages: [{ name: "@egjs/flicking", version: "4.18.0", published: false }],
    releaseCommit: null,
    tagExists: false,
    ghReleaseExists: false,
  };

  it("버전이 안 바뀌었으면 bump부터", () => {
    expect(decideStage({ ...base, changedPackages: [] })).toBe("bump");
  });

  it("릴리즈 커밋이 없으면 prepare", () => {
    expect(decideStage(base)).toBe("prepare");
  });

  it("릴리즈 커밋이 릴리즈 브랜치에 있으면 머지가 다음", () => {
    expect(decideStage({ ...base, releaseCommit: { sha: "abc", onReleaseBranch: true } })).toBe("merge");
  });

  it("릴리즈 커밋이 master에 있고 미게시면 publish", () => {
    expect(decideStage({ ...base, releaseCommit: { sha: "abc", onReleaseBranch: false } })).toBe("publish");
  });

  it("게시됐는데 태그가 없으면 finalize", () => {
    const published = [{ name: "@egjs/flicking", version: "4.18.0", published: true }];
    expect(decideStage({ ...base, changedPackages: published, releaseCommit: { sha: "abc", onReleaseBranch: false } })).toBe("finalize");
  });

  it("일부만 게시됐으면 publish 단계로 되돌아간다", () => {
    const partial = [
      { name: "@egjs/flicking", version: "4.18.0", published: true },
      { name: "@egjs/react-flicking", version: "4.18.0", published: false },
    ];
    expect(decideStage({ ...base, changedPackages: partial, releaseCommit: { sha: "abc", onReleaseBranch: false } })).toBe("publish");
  });

  it("게시·태그·릴리즈까지 끝났으면 released", () => {
    const published = [{ name: "@egjs/flicking", version: "4.18.0", published: true }];
    expect(decideStage({ ...base, changedPackages: published, tagExists: true, ghReleaseExists: true })).toBe("released");
  });

  it("태그는 있는데 GitHub Release가 없으면 finalize를 다시 돈다", () => {
    const published = [{ name: "@egjs/flicking", version: "4.18.0", published: true }];
    expect(decideStage({ ...base, changedPackages: published, tagExists: true, ghReleaseExists: false })).toBe("finalize");
  });
});

describe("decideNextStep", () => {
  const state = {
    npmUser: "someone",
    ghInstalled: true,
    ghAuth: true,
    changedPackages: [{ name: "@egjs/flicking", version: "4.18.0", published: false }],
    releaseCommit: null,
    tagExists: false,
    ghReleaseExists: false,
  };

  it("npm 미로그인이면 단계와 무관하게 로그인이 먼저다", () => {
    expect(decideNextStep({ ...state, npmUser: null })).toBe("npm-login");
  });

  it("gh가 없으면 인증보다 설치가 먼저다", () => {
    expect(decideNextStep({ ...state, ghInstalled: false, ghAuth: false })).toBe("gh-install");
  });

  it("gh가 설치됐지만 미인증이면 gh-login", () => {
    expect(decideNextStep({ ...state, ghAuth: false })).toBe("gh-login");
  });

  it("npm 미로그인은 gh 상태보다 앞선다", () => {
    expect(decideNextStep({ ...state, npmUser: null, ghInstalled: false })).toBe("npm-login");
  });

  it("로그인되어 있으면 stage를 그대로 반환한다", () => {
    expect(decideNextStep(state)).toBe("prepare");
  });
});

describe("isVersionOnlyChange", () => {
  const pkg = obj => JSON.stringify(obj, null, 2);

  it("version만 다르면 true", () => {
    expect(isVersionOnlyChange(pkg({ name: "a", version: "1.0.0" }), pkg({ name: "a", version: "1.0.1" }))).toBe(true);
  });

  it("version 외 필드가 다르면 false", () => {
    const before = pkg({ name: "a", version: "1.0.0", dependencies: { x: "^1.0.0" } });
    const after = pkg({ name: "a", version: "1.0.1", dependencies: { x: "^2.0.0" } });
    expect(isVersionOnlyChange(before, after)).toBe(false);
  });

  it("파싱할 수 없으면 false", () => {
    expect(isVersionOnlyChange(null, pkg({ version: "1.0.0" }))).toBe(false);
  });
});

describe("releaseDiffBlockers", () => {
  const pkg = version => JSON.stringify({ name: "@egjs/flicking", version });

  it("CHANGELOG와 공개 패키지 version 변경뿐이면 통과", () => {
    const changes = [
      { file: "CHANGELOG.md" },
      { file: "packages/flicking/package.json", before: pkg("4.17.1"), after: pkg("4.17.2") },
    ];
    expect(releaseDiffBlockers(changes)).toEqual([]);
  });

  it("package.json의 version 외 변경은 막는다", () => {
    const changes = [{
      file: "packages/flicking/package.json",
      before: JSON.stringify({ version: "4.17.1" }),
      after: JSON.stringify({ version: "4.17.2", files: ["dist"] }),
    }];
    expect(releaseDiffBlockers(changes)).toHaveLength(1);
  });

  it("lockfile 변경은 막는다 (의존 해석이 바뀌었을 수 있다)", () => {
    expect(releaseDiffBlockers([{ file: "pnpm-lock.yaml" }])).toHaveLength(1);
  });

  it("비공개 패키지의 package.json은 버전만 바뀌어도 막는다", () => {
    const changes = [{ file: "packages/docs/package.json", before: pkg("1.0.0"), after: pkg("1.0.1") }];
    expect(releaseDiffBlockers(changes)).toHaveLength(1);
  });
});

describe("summarizeCheckRuns", () => {
  it("미완료와 실패를 나눈다", () => {
    const runs = [
      { name: "unit", status: "completed", conclusion: "success" },
      { name: "e2e", status: "in_progress", conclusion: null },
      { name: "cfc", status: "completed", conclusion: "failure" },
      { name: "lint", status: "completed", conclusion: "skipped" },
    ];
    expect(summarizeCheckRuns(runs)).toEqual({ total: 4, pending: ["e2e"], failed: ["cfc"] });
  });

  it("결과가 없으면 total 0", () => {
    expect(summarizeCheckRuns([])).toEqual({ total: 0, pending: [], failed: [] });
  });
});

describe("findForbiddenFiles", () => {
  it("node_modules·.env·lockfile을 잡는다", () => {
    const paths = ["dist/index.js", "node_modules/a/index.js", ".env", ".env.local", "yarn.lock", "src/.DS_Store"];
    expect(findForbiddenFiles(paths).map(f => f.label)).toEqual(["node_modules", ".env", ".env", "lockfile", ".DS_Store"]);
  });

  it("최상위가 아닌 dev 디렉토리나 env 이름을 포함한 파일은 잡지 않는다", () => {
    expect(findForbiddenFiles(["src/dev/index.ts", "dist/environment.js", "README.md"])).toEqual([]);
  });

  it("최상위 dev·coverage는 잡는다", () => {
    expect(findForbiddenFiles(["dev/scratch/App.js", "coverage/index.html"])).toHaveLength(2);
  });
});

describe("diffPackFiles", () => {
  it("추가·제거된 경로를 정렬해 돌려준다", () => {
    expect(diffPackFiles(["a", "c", "b"], ["b", "d", "a"])).toEqual({ added: ["d"], removed: ["c"] });
  });
});

describe("summarizePaths", () => {
  it("limit 이하면 그대로", () => {
    expect(summarizePaths(["a.js", "b.js"], 10)).toEqual(["a.js", "b.js"]);
  });

  it("limit을 넘으면 최상위 디렉토리별로 묶는다", () => {
    const paths = [...Array.from({ length: 13 }, (_, i) => `declaration/${i}.d.ts`), ".env"];
    expect(summarizePaths(paths, 10)).toEqual(["declaration/ (13)", ".env"]);
  });
});

describe("workspaceDepMismatches", () => {
  const versions = { "@egjs/flicking": "4.17.2" };
  const source = { dependencies: { "@egjs/flicking": "workspace:~", "@egjs/component": "^3.0.2" } };

  it("workspace:~가 ~{로컬 버전}으로 치환되면 통과", () => {
    const packed = { dependencies: { "@egjs/flicking": "~4.17.2", "@egjs/component": "^3.0.2" } };
    expect(workspaceDepMismatches(source, packed, versions)).toEqual([]);
  });

  it("치환되지 않았거나 다른 버전이면 잡는다", () => {
    expect(workspaceDepMismatches(source, { dependencies: { "@egjs/flicking": "workspace:~" } }, versions)).toHaveLength(1);
    expect(workspaceDepMismatches(source, { dependencies: { "@egjs/flicking": "~4.17.1" } }, versions)).toEqual([
      { field: "dependencies", name: "@egjs/flicking", expected: "~4.17.2", actual: "~4.17.1" },
    ]);
  });

  it("workspace:*는 정확한 버전, 명시 범위는 그대로를 기대한다", () => {
    const src = { peerDependencies: { "@egjs/flicking": "workspace:*" }, dependencies: { "@egjs/flicking": "workspace:^4.0.0" } };
    const packed = { peerDependencies: { "@egjs/flicking": "4.17.2" }, dependencies: { "@egjs/flicking": "^4.0.0" } };
    expect(workspaceDepMismatches(src, packed, versions)).toEqual([]);
  });
});
