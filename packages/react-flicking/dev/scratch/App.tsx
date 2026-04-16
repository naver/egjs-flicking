/**
 * 이슈 재현 템플릿
 *
 * 이 파일을 덮어써서 이슈를 재현하세요.
 */
import Flicking from "@dev/react-flicking";

const css: Record<string, React.CSSProperties> = {
  panel: {
    minWidth: 200,
    height: 200,
    margin: "0 5px",
    background: "#f0f0f0",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold"
  }
};

export default function App() {
  return (
    <div>
      <h2>Scratch</h2>
      <Flicking align="prev" circular={true}>
        <div style={css.panel}>1</div>
        <div style={css.panel}>2</div>
        <div style={css.panel}>3</div>
      </Flicking>
    </div>
  );
}
