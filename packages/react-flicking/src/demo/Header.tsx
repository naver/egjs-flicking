import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  public render() {
    return (
      <ul className="header">
        <li><Link to="/infinite">Infinite Flicking</Link></li>
        <li><Link to="/free-scroll">Free Scroll</Link></li>
        <li><Link to="/variable-size">Variable Size</Link></li>
        <li><Link to="/align">Align</Link></li>
        <li><Link to="/snap">Snap</Link></li>
        <li><Link to="/gap">Gap</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/bound">Bound</Link></li>
        <li><Link to="/image">Image</Link></li>
        <li><Link to="/parallax">Parallax Plugin</Link></li>
        <li><Link to="/fade">Fade Plugin</Link></li>
        <li><Link to="/autoplay">AutoPlay Plugin</Link></li>
      </ul>
    );
  }
}
