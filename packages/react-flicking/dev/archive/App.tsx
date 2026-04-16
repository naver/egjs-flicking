import { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/common.css";
import "./css/features.css";
import "./css/highlight.css";
import "@dev/flicking-css";
import "@dev/plugins-css";
import hljs from "highlight.js";
import Align from "./features/Align";
import Bound from "./features/Bound";
import CrossFlicking from "./features/CrossFlicking";
import FreeScroll from "./features/FreeScroll";
import InfiniteFlicking from "./features/InfiniteFlicking";
import Progress from "./features/Progress";
import PropChange from "./features/PropChange";
import Snap from "./features/Snap";
import VariableSize from "./features/VariableSize";
import Virtual from "./features/Virtual";
import Header from "./Header";
import Arrow from "./plugins/Arrow";
import AutoPlay from "./plugins/AutoPlay";
import Fade from "./plugins/Fade";
import Parallax from "./plugins/Parallax";

export default class App extends Component<{}> {
  public render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/infinite" element={<InfiniteFlicking />} />
          <Route path="/free-scroll" element={<FreeScroll />} />
          <Route path="/variable-size" element={<VariableSize />} />
          <Route path="/align" element={<Align />} />
          <Route path="/snap" element={<Snap />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/bound" element={<Bound />} />
          <Route path="/virtual" element={<Virtual />} />
          <Route path="/parallax" element={<Parallax />} />
          <Route path="/fade" element={<Fade />} />
          <Route path="/autoplay" element={<AutoPlay />} />
          <Route path="/arrow" element={<Arrow />} />
          <Route path="/prop" element={<PropChange />} />
          <Route path="/cross" element={<CrossFlicking />} />
        </Routes>
      </Router>
    );
  }
  public componentDidMount() {
    hljs.initHighlighting();
  }
}
