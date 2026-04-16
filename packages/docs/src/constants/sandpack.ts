/**
 * Sandpack 관련 상수 및 타입 정의
 */

// 프레임워크 템플릿 타입
export type FrameworkTemplate = "react" | "vue3" | "vanilla";

// Flicking 패키지 버전
export const FLICKING_VERSION = "^4.11.4";

// 프레임워크별 기본 의존성
export const DEFAULT_DEPENDENCIES: Record<FrameworkTemplate, Record<string, string>> = {
  react: {
    "@egjs/react-flicking": FLICKING_VERSION,
    "@egjs/flicking": FLICKING_VERSION
  },
  vue3: {
    "@egjs/vue3-flicking": FLICKING_VERSION,
    "@egjs/flicking": FLICKING_VERSION
  },
  vanilla: {
    "@egjs/flicking": FLICKING_VERSION
  }
};

// 기본 패널 CSS (React/Vue/Vanilla 공통)
export const DEFAULT_PANEL_CSS = `
.flicking-panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.button {
  padding: 8px 16px;
  margin: 4px;
  border: 2px solid #3498db;
  background: transparent;
  color: #3498db;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #3498db;
  color: white;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
}
`;

// Vanilla JS용 기본 HTML 템플릿
export const DEFAULT_VANILLA_HTML = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/src/styles.css" />
</head>
<body>
  <div id="app">
    <div id="flick" class="flicking-viewport">
      <div class="flicking-camera"></div>
    </div>
  </div>
</body>
</html>`;

// React 용 기본 index.js 템플릿
export const DEFAULT_REACT_APPJS = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>);`;
