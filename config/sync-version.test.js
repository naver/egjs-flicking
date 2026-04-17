import { describe, it, expect } from "vitest";
import { parseVersion, formatVersion, calcNextVersion } from "./sync-version.js";

describe("parseVersion", () => {
  it("stable 버전을 파싱한다", () => {
    expect(parseVersion("4.16.0")).toEqual({ major: 4, minor: 16, patch: 0, prerelease: "" });
  });

  it("prerelease 버전을 파싱한다", () => {
    expect(parseVersion("4.16.0-beta.2")).toEqual({ major: 4, minor: 16, patch: 0, prerelease: "beta.2" });
  });

  it("잘못된 버전이면 에러를 던진다", () => {
    expect(() => parseVersion("invalid")).toThrow("Invalid version");
  });
});

describe("formatVersion", () => {
  it("stable 버전을 포맷한다", () => {
    expect(formatVersion({ major: 4, minor: 16, patch: 0, prerelease: "" })).toBe("4.16.0");
  });

  it("prerelease 버전을 포맷한다", () => {
    expect(formatVersion({ major: 4, minor: 16, patch: 0, prerelease: "beta.2" })).toBe("4.16.0-beta.2");
  });
});

// calcNextVersion(코어 버전, 래퍼 현재 버전, bump type) → 래퍼 새 버전
describe("calcNextVersion", () => {
  describe("minor", () => {
    it("코어 4.17.0, 래퍼 4.15.0 → 래퍼가 뒤처져 있으므로 코어 minor에 맞춰 4.17.0", () => {
      expect(calcNextVersion("4.17.0", "4.15.0", "minor")).toBe("4.17.0");
    });

    it("코어 4.17.0, 래퍼 4.17.0 → 같은 minor이므로 래퍼 minor +1 → 4.18.0", () => {
      expect(calcNextVersion("4.17.0", "4.17.0", "minor")).toBe("4.18.0");
    });

    it("코어 4.17.0, 래퍼 4.18.0 → 래퍼가 앞서있으므로 래퍼 minor +1 → 4.19.0", () => {
      expect(calcNextVersion("4.17.0", "4.18.0", "minor")).toBe("4.19.0");
    });

    it("코어 4.17.0, 래퍼 4.16.3 → minor +1 되면서 patch는 0으로 리셋 → 4.17.0", () => {
      expect(calcNextVersion("4.17.0", "4.16.3", "minor")).toBe("4.17.0");
    });
  });

  describe("patch", () => {
    it("코어 4.16.1, 래퍼 4.16.0 → 래퍼 patch +1 → 4.16.1", () => {
      expect(calcNextVersion("4.16.1", "4.16.0", "patch")).toBe("4.16.1");
    });

    it("코어 4.16.2, 래퍼 4.16.3 → 래퍼가 앞서있어도 patch +1 → 4.16.4", () => {
      expect(calcNextVersion("4.16.2", "4.16.3", "patch")).toBe("4.16.4");
    });

    it("코어 4.16.1, 래퍼 4.18.0 → 래퍼 minor는 유지하고 patch만 +1 → 4.18.1", () => {
      expect(calcNextVersion("4.16.1", "4.18.0", "patch")).toBe("4.18.1");
    });
  });

  describe("major", () => {
    it("코어 5.0.0, 래퍼 4.18.3 → 코어 major로 동기화, minor/patch 리셋 → 5.0.0", () => {
      expect(calcNextVersion("5.0.0", "4.18.3", "major")).toBe("5.0.0");
    });
  });
});

describe("CLI", () => {
  it("bump type 없이 실행 시 exit code 1", () => {
    const { execSync } = require("child_process");
    expect(() => {
      execSync("node config/sync-version.js", { cwd: process.cwd(), stdio: "pipe" });
    }).toThrow();
  });
});
