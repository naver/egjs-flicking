import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const useBuild = mode === "production";

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        }
      })
    ],
    root: path.resolve(__dirname, "dev"),
    server: {
      port: 3001,
      open: true,
      fs: {
        allow: [".."]
      }
    },
    resolve: {
      alias: useBuild
        ? {
            // 빌드 검증 모드 - 빌드 결과물 사용
            "@dev/flicking": path.resolve(__dirname, "../flicking/dist/flicking.esm.js"),
            "@dev/react-flicking": path.resolve(__dirname, "dist/flicking.esm.js"),
            "@dev/plugins": path.resolve(__dirname, "../flicking-plugins/dist/plugins.esm.js"),
            "@dev/flicking-css": path.resolve(__dirname, "../flicking/dist/flicking.css"),
            "@dev/plugins-css": path.resolve(__dirname, "../flicking-plugins/dist/flicking-plugins.css"),
            // 소스코드 내부의 @egjs/flicking 참조용
            "@egjs/flicking": path.resolve(__dirname, "../flicking/dist/flicking.esm.js")
          }
        : {
            // 개발 모드 - 모든 소스 직접 참조 (HMR!)
            "@dev/flicking": path.resolve(__dirname, "../flicking/src/index.ts"),
            "@dev/react-flicking": path.resolve(__dirname, "src/react-flicking/index.ts"),
            "@dev/plugins": path.resolve(__dirname, "../flicking-plugins/src/index.ts"),
            "@dev/flicking-css": path.resolve(__dirname, "../flicking/sass/flicking.sass"),
            "@dev/plugins-css": path.resolve(__dirname, "../flicking-plugins/css/all.css"),
            // 소스코드 내부의 @egjs/flicking 참조용
            "@egjs/flicking": path.resolve(__dirname, "../flicking/src/index.ts")
          },
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    optimizeDeps: {
      include: ["react", "react-dom", "@egjs/axes", "@egjs/component", "@egjs/imready", "@egjs/list-differ"]
    },
    define: {
      __DEV__: JSON.stringify(!useBuild)
    }
  };
});
