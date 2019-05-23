import * as React from "react";

export default class Header extends React.Component {
  public render() {
    return (
      <ul className="header">
        <li><a href="#infinite">Infinite Flicking</a></li>
        <li><a href="#free-scroll">Free Scroll</a></li>
        <li><a href="#variable-size">Variable Size</a></li>
        <li><a href="#align">Align</a></li>
        <li><a href="#snap">Snap</a></li>
        <li><a href="#gap">Gap</a></li>
        <li><a href="#progress">Progress</a></li>
        <li><a href="#bound">Bound</a></li>
        <li><a href="#parallax">Parallax Plugin</a></li>
        <li><a href="#fade">Fade Plugin</a></li>
        <li><a href="#autoplay">AutoPlay Plugin</a></li>
      </ul>
    );
  }
}
