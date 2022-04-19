
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./css/common.css";
import "./css/features.css";
import "./css/highlight.css";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import hljs from "highlight.js";
import InfiniteFlicking from "./features/InfiniteFlicking";
import FreeScroll from "./features/FreeScroll";
import VariableSize from "./features/VariableSize";
import Align from "./features/Align";
import Snap from "./features/Snap";
import Gap from "./features/Gap";
import Progress from "./features/Progress";
import Bound from "./features/Bound";
import Virtual from "./features/Virtual";
import Parallax from "./plugins/Parallax";
import Fade from "./plugins/Fade";
import AutoPlay from "./plugins/AutoPlay";
import Arrow from "./plugins/Arrow";
import Header from "./Header";

export default class App extends Component<{}> {
  public render() {
    return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/infinite" element={<InfiniteFlicking />} />
          <Route path="/free-scroll" element={<FreeScroll />} />
          <Route path="/variable-size" element={<VariableSize />} />
          <Route path="/align" element={<Align />} />
          <Route path="/snap" element={<Snap />} />
          <Route path="/gap" element={<Gap />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/bound" element={<Bound />} />
          <Route path="/virtual" element={<Virtual />} />
          <Route path="/parallax" element={<Parallax />} />
          <Route path="/fade" element={<Fade />} />
          <Route path="/autoplay" element={<AutoPlay />} />
          <Route path="/arrow" element={<Arrow />} />
        </Routes>
      </Router>);
  }
  public componentDidMount() {
    hljs.initHighlighting();
  }
}
