
import { Component } from "react";
import * as React from "react";
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
import ParallaxDemo from "./plugins/Parallax";
import FadeDemo from "./plugins/Fade";
import AutoPlayDemo from "./plugins/AutoPlay";
import Header from "./Header";

export default class App extends Component<{}> {
  public render() {
    return (
      <div>
        <Header/>
        <InfiniteFlicking/>
        <FreeScroll/>
        <VariableSize/>
        <Align/>
        <Snap/>
        <Gap/>
        <Progress/>
        <Bound/>
        <ParallaxDemo/>
        <FadeDemo/>
        <AutoPlayDemo/>
      </div>);
  }
  public componentDidMount() {
    hljs.initHighlighting();
  }
}
