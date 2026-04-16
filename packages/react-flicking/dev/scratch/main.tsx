/**
 * Scratch - 이슈 재현용 독립 페이지
 *
 * http://localhost:3001/scratch/
 *
 * 이 파일은 수정하지 마세요.
 * 재현 코드는 App.tsx에 작성합니다.
 */
import { createRoot } from "react-dom/client";
import "@dev/flicking-css";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
