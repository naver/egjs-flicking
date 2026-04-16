import Flicking from "@dev/react-flicking";

const css: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20
  },
  panel: {
    minWidth: 200,
    height: 200,
    margin: "0 5px",
    background: "#e0e7ff",
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
    <div style={css.container}>
      <h1>Basic Sample</h1>
      <Flicking align="prev" circular={true}>
        <div style={css.panel}>1</div>
        <div style={css.panel}>2</div>
        <div style={css.panel}>3</div>
        <div style={css.panel}>4</div>
        <div style={css.panel}>5</div>
      </Flicking>
    </div>
  );
}
