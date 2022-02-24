
import { Component } from "react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/common.css";
import "./css/features.css";
import "./css/highlight.css";
import hljs from "highlight.js";
import InfiniteFlicking from "./features/InfiniteFlicking";
import FreeScroll from "./features/FreeScroll";
import VariableSize from "./features/VariableSize";
import Align from "./features/Align";
import Snap from "./features/Snap";
import Gap from "./features/Gap";
import Progress from "./features/Progress";
import Bound from "./features/Bound";
import ImageLoadDemo from "./features/Image";
import ParallaxDemo from "./plugins/Parallax";
import FadeDemo from "./plugins/Fade";
import AutoPlayDemo from "./plugins/AutoPlay";
import Header from "./Header";

export default class App extends Component<{}> {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Routes>
            <Route path="/infinite" element={<InfiniteFlicking/>}></Route>
            <Route path="/free-scroll" element={<FreeScroll/>}></Route>
            <Route path="/variable-size" element={<VariableSize/>}></Route>
            <Route path="/align" element={<Align/>}></Route>
            <Route path="/snap" element={<Snap/>}></Route>
            <Route path="/gap" element={<Gap/>}></Route>
            <Route path="/progress" element={<Progress/>}></Route>
            <Route path="/bound" element={<Bound/>}></Route>
            <Route path="/image" element={<ImageLoadDemo />}></Route>
            <Route path="/parallax" element={<ParallaxDemo/>}></Route>
            <Route path="/fade" element={<FadeDemo/>}></Route>
            <Route path="/autoplay" element={<AutoPlayDemo/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  public componentDidMount() {
    hljs.initHighlighting();
  }
}
