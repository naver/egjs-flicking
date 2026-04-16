import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // mode가 'production'이면 빌드 결과물 사용, 아니면 소스 직접 사용
  const useBuild = mode === "production";

  return {
    root: path.resolve(__dirname, "dev"),
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: [".."]
      }
    },
    resolve: {
      alias: useBuild
        ? {
            // 빌드 결과물 사용 (프로덕션 검증)
            "@dev/flicking": path.resolve(__dirname, "dist/flicking.esm.js"),
            "@dev/plugins": path.resolve(__dirname, "../flicking-plugins/dist/plugins.esm.js"),
            "@dev/flicking-css": path.resolve(__dirname, "dist/flicking.css"),
            "@dev/plugins-css": path.resolve(__dirname, "../flicking-plugins/dist/flicking-plugins.css")
          }
        : {
            // 소스 직접 사용 (개발 모드)
            "@dev/flicking": path.resolve(__dirname, "src/index.ts"),
            "@dev/plugins": path.resolve(__dirname, "../flicking-plugins/src/index.ts"),
            "@dev/flicking-css": path.resolve(__dirname, "sass/flicking.sass"),
            "@dev/plugins-css": path.resolve(__dirname, "../flicking-plugins/css/all.css")
          },
      extensions: [".ts", ".js", ".tsx", ".jsx"]
    },
    optimizeDeps: {
      include: ["@egjs/axes", "@egjs/component", "@egjs/imready", "@egjs/list-differ"]
    },
    define: {
      __BUILD_MODE__: JSON.stringify(useBuild ? "build" : "source")
    }
  };
});
