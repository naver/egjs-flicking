const fs = require("node:fs");
const path = require("node:path");

const API_BASE = "https://api.github.com";
const REPO = "naver/egjs-flicking";
const BLOG_DIR = path.resolve(__dirname, "../blog");
const PER_PAGE = 100;

async function fetchAllReleases(token) {
  const releases = [];
  let page = 1;

  while (true) {
    const headers = { Accept: "application/vnd.github+json" };
    if (token) headers.Authorization = `token ${token}`;

    const url = `${API_BASE}/repos/${REPO}/releases?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    releases.push(...data);
    if (data.length < PER_PAGE) break;
    page++;
  }

  return releases;
}

async function main() {
  // GITHUB_TOKEN은 선택사항 (공개 저장소이므로 없어도 동작, 있으면 rate limit 완화)
  const token = process.env.GITHUB_TOKEN;

  let releases;

  try {
    releases = await fetchAllReleases(token);
  } catch (err) {
    console.warn(`[fetch-releases] Failed to fetch releases: ${err.message}`);
    return;
  }

  // 기존 자동 생성 파일 정리
  if (fs.existsSync(BLOG_DIR)) {
    fs.readdirSync(BLOG_DIR)
      .filter(f => f.startsWith("release-"))
      .forEach(f => fs.unlinkSync(path.join(BLOG_DIR, f)));
  } else {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  let count = 0;

  for (const release of releases) {
    if (release.draft) continue;

    // 파일명은 가독성을 위해 날짜만 사용하고(':' 는 파일명에 부적합),
    // frontmatter의 date는 전체 타임스탬프를 사용해 같은 날 여러 릴리즈의
    // 선후 순서를 초 단위까지 구분한다. (날짜만 쓰면 정렬이 동점 처리됨)
    const date = release.published_at.slice(0, 10);
    const publishedAt = release.published_at;
    const tag = release.tag_name;
    const filename = `release-${date}-${tag}.md`;

    const body = release.body || "No release notes.";
    const fullChangelogIdx = body.indexOf("**Full Changelog**");
    const preview = fullChangelogIdx > 0 ? body.slice(0, fullChangelogIdx).trimEnd() : body;
    const rest = fullChangelogIdx > 0 ? body.slice(fullChangelogIdx) : "";

    const parts = ["---", `title: "${tag}"`, `date: ${publishedAt}`, `tags: [release]`, "---", "", preview];

    if (rest) {
      parts.push("", "<!-- truncate -->", "", rest);
    }

    parts.push("");
    const content = parts.join("\n");

    fs.writeFileSync(path.join(BLOG_DIR, filename), content);
    count++;
  }

  console.log(`[fetch-releases] Generated ${count} release posts.`);
}

main();
