import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export interface DemoSpec {
  /** 데모 식별자 (kebab-case) */
  id: string;
  /** 카테고리 (basic, advanced, plugins, reactive) */
  category: string;
  /** 데모 소스 경로 (e.g., "basic/Default") */
  demo: string;
  /** 이 데모의 존재 이유 */
  intent: string;
  /** 테스트가 집중해야 할 포인트 */
  focus: string[];
  /** 이 데모가 사용하는 핵심 API */
  api: {
    options?: string[];
    events?: string[];
    methods?: string[];
    plugins?: string[];
  };
  /** 테스트 대상 프레임워크 */
  frameworks: Array<"vanilla" | "react" | "vue">;
}

const TESTS_DIR = path.resolve(import.meta.dirname, "..");

/**
 * YAML 스펙 파일을 로드한다.
 * 스펙은 테스트와 같은 디렉토리에 위치한다.
 * @param specPath - 카테고리/이름 (e.g., "basic/default")
 */
export function loadSpec(specPath: string): DemoSpec {
  const filePath = path.join(TESTS_DIR, specPath, `${path.basename(specPath)}.yaml`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Spec not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return yaml.load(content) as DemoSpec;
}
