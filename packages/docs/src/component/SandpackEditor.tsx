import { Sandpack, SandpackFiles } from "@codesandbox/sandpack-react";
import React from "react";
import {
  DEFAULT_DEPENDENCIES,
  DEFAULT_REACT_APPJS,
  DEFAULT_VANILLA_HTML,
  type FrameworkTemplate
} from "../constants/sandpack";

import { defaultStyles } from "../demo/components/demo-defaults";

// Vue SFC에 <style> 블록을 자동 주입합니다.
// - 기존 <style> 블록이 있으면 제거 후 교체
// - panelCSS + defaultStyles를 병합하여 단일 <style> 생성
// → panelCSS를 한 번만 작성하면 React/JS/Vue 모두에 적용됩니다.
function injectVueStyle(vueCode: string, styles: string): string {
  const withoutStyle = vueCode.replace(/\n*<style>[\s\S]*?<\/style>/, "");
  return `${withoutStyle}\n\n<style>\n${styles}\n</style>`;
}

interface SandpackEditorProps {
  code: string;
  html?: string; // Vanilla JS용 HTML
  template?: FrameworkTemplate;
  dependencies?: Record<string, string>;
  files?: SandpackFiles;
  css?: string;
}

export default function SandpackEditor({
  code,
  html,
  template = "react",
  dependencies = {},
  files = {},
  css = ""
}: SandpackEditorProps) {
  const getFiles = (): SandpackFiles => {
    // 기본 CSS + 데모별 추가 CSS
    const styles = css ? `${defaultStyles}\n${css}` : defaultStyles;

    // 공통 파일 (스타일 등)
    const baseFiles: SandpackFiles = {
      "/styles.css": { code: styles },
      ...files
    };

    if (template === "react") {
      return {
        "/App.tsx": { code },
        // index.js를 override해서 App.tsx를 import하도록
        "/index.js": { code: DEFAULT_REACT_APPJS, hidden: true },
        ...baseFiles
      };
    }

    if (template === "vue3") {
      // Vue SFC에 <style> 블록을 자동 주입 (defaultStyles + panelCSS)
      // → /styles.css 없이 SFC 자체 완결, panelCSS 단일 소스로 관리
      return {
        "/src/App.vue": { code: injectVueStyle(code, styles) },
        ...files
      };
    }

    // vanilla:
    // - /src/index.js: shown in editor (user's original code)
    // - /index.js: hidden entry that imports /src/index.js
    //   (overrides Sandpack's default /index.js which destroys #app innerHTML)
    // - /index.html: custom HTML template
    // - /styles.css: combined defaultStyles + panelCSS (loaded via JS import "../styles.css")
    return {
      "/src/index.js": { code },
      "/index.js": { code: 'import "./src/index.js";', hidden: true },
      "/src/styles.css": { code: styles },
      "/index.html": { code: html || DEFAULT_VANILLA_HTML },
      ...files
    };
  };

  const getSandpackTemplate = () => {
    if (template === "vue3") return "vue"; // Sandpack v2: vue3 -> vue
    if (template === "vanilla") return "vanilla";
    return "react";
  };

  // 템플릿별 표시할 파일 및 활성 파일 설정
  const getVisibleFiles = (): string[] => {
    if (template === "react") return ["/App.tsx", "/styles.css"];
    if (template === "vue3") return ["/src/App.vue"];
    return ["/src/index.js", "/index.html", "/src/styles.css"];
  };

  const getActiveFile = (): string => {
    if (template === "react") return "/App.tsx";
    if (template === "vue3") return "/src/App.vue";
    return "/src/index.js";
  };

  return (
    <Sandpack
      template={getSandpackTemplate()}
      files={getFiles()}
      customSetup={{
        dependencies: {
          ...DEFAULT_DEPENDENCIES[template],
          ...dependencies
        }
      }}
      options={{
        showLineNumbers: true,
        editorHeight: 400,
        externalResources: [],
        visibleFiles: getVisibleFiles(),
        activeFile: getActiveFile()
      }}
    />
  );
}
