
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
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
        <Switch>
          <Route path="/infinite">
            <InfiniteFlicking />
          </Route>
          <Route path="/free-scroll">
            <FreeScroll />
          </Route>
          <Route path="/variable-size">
            <VariableSize />
          </Route>
          <Route path="/align">
            <Align />
          </Route>
          <Route path="/snap">
            <Snap />
          </Route>
          <Route path="/gap">
            <Gap />
          </Route>
          <Route path="/progress">
            <Progress />
          </Route>
          <Route path="/bound">
            <Bound />
          </Route>
          <Route path="/parallax">
            <Parallax />
          </Route>
          <Route path="/fade">
            <Fade />
          </Route>
          <Route path="/autoplay">
            <AutoPlay />
          </Route>
          <Route path="/arrow">
            <Arrow />
          </Route>
        </Switch>
      </Router>);
  }
  public componentDidMount() {
    hljs.initHighlighting();
  }
}
