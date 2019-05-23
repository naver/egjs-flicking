import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/progress.css";

export default class Progress extends React.Component<{}> {
  private thumb: HTMLElement;
  private flicking1: Flicking;
  private flicking2: Flicking;
  private flicking3: Flicking;
  public render() {
    return (
      <div id="progress" className="container">
        <h1>e.progress</h1>
        <ul className="extra">
          <li>Indicates the overall progress of the Flicking.</li>
        </ul>
        <Flicking className="flicking flicking0"
          gap={10}
          circular={true}
          moveType={{type: "snap", count: 5}}
          onMove={e => {
            this.thumb.style.width = (e.progress * 100) + "%";
          }}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="progress">
          <div className="thumb" ref={e => { this.thumb = e as HTMLElement; }}></div>
      </div>
      <pre><code className="hljs html" data-script="flicking0"></code></pre>
      <h1>panel.getProgress()</h1>
      <ul className="extra">
        <li>Indicates the progress of the relative index of each panel.</li>
      </ul>
      <Flicking className="flicking flicking1"
          gap={10}
          circular={true}
          moveType={{type: "snap", count: 5}}
          ref={e => { this.flicking1 = e as Flicking; }}
          onMove={e => {
            const flicking = e.currentTarget;

            flicking.getAllPanels(true).forEach(panel => {
              panel.getElement().innerHTML = panel.getProgress().toFixed(2);
            });
          }}>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </Flicking>
      <div className="pagination pagination1"></div>
      <pre><code className="hljs html" data-script="flicking1"></code></pre>

      <h1>panel.getOutsetProgress()</h1>
      <ul className="extra">
        <li>When panel is completely invisible, outsetProgress becomes -1 at left(up), 1 at right(down) direction, and 0 when panel's anchor and hanger is overlapped.</li>
      </ul>
      <Flicking className="flicking flicking2"
          gap={10}
          circular={true}
          moveType={{type: "snap", count: 5}}
          ref={e => { this.flicking2 = e as Flicking; }}
          onMove={e => {
            const flicking = e.currentTarget;

            flicking.getAllPanels(true).forEach(panel => {
              panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
            });
          }}>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </Flicking>
      <div className="pagination pagination2"></div>
      <pre><code className="hljs html" data-script="flicking2"></code></pre>

      <h1>panel.getVisibleRatio()</h1>
      <ul className="extra">
        <li>Indicates the percentage of areas within the viewport that the panel occupies.</li>
      </ul>
      <Flicking className="flicking flicking3"
          gap={10}
          circular={true}
          moveType={{type: "snap", count: 5}}
          ref={e => { this.flicking3 = e as Flicking; }}
          onMove={e => {
            const flicking = e.currentTarget;

            flicking.getAllPanels(true).forEach(panel => {
              panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
            });
          }}>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </Flicking>
      <div className="pagination pagination3"></div>
      <pre><code className="hljs html" data-script="flicking3"></code></pre>
</div >);
  }
  public componentDidMount() {
    this.flicking1.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
    });
    this.flicking2.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
    });
    this.flicking3.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
    });
    insertCode("progress", 0, `
  <Flicking className="flicking flicking0"
    gap={10}
    circular={true}
    moveType={{type: "snap", count: 5}}
    onMove={e => {
      this.thumb.style.width = (e.progress * 100) + "%";
    }}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("progress", 1, `
<Flicking className="flicking flicking1"
  gap={10}
  circular={true}
  moveType={{type: "snap", count: 5}}
  onMove={e => {
    const flicking = e.currentTarget;

    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getProgress().toFixed(2);
    });
  }}>
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
</Flicking>`);
    insertCode("progress", 2, `
  <Flicking className="flicking flicking2"
    gap={10}
    circular={true}
    moveType={{type: "snap", count: 5}}
    onMove={e => {
      const flicking = e.currentTarget;

      flicking.getAllPanels(true).forEach(panel => {
        panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
      });
    }}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("progress", 3, `
  <Flicking className="flicking flicking3"
    gap={10}
    circular={true}
    moveType={{type: "snap", count: 5}}
    onMove={e => {
      const flicking = e.currentTarget;

      flicking.getAllPanels(true).forEach(panel => {
        panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
      });
    }}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
  }
}
