import * as React from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import styles from "../css/demo/lazyload.module.css";

import jsCode from "./code/LazyLoad/js";
import reactCode from "./code/LazyLoad/react";
import vueCode from "./code/LazyLoad/vue";
import angularCode from "./code/LazyLoad/angular";
import svelteCode from "./code/LazyLoad/svelte";

export default class LazyLoad extends React.Component<{}, { panels: boolean[] }> {
  private _flicking: React.RefObject<Flicking>;

  public constructor(props) {
    super(props);

    this._flicking = React.createRef();

    this.state = {
      panels: [...new Array(501).fill(false)]
    };
  }

  public updateVisibility(indexes: number[]) {
    this.setState(state => {
      indexes.forEach(idx => {
        state.panels[idx] = true;
      });

      return { panels: [...state.panels] };
    });
    this.forceUpdate();
  }

  public render() {
    return <>
      <Flicking ref={this._flicking} className="my-6" align="prev" renderOnlyVisible={true} defaultIndex={500} bound={true}
        onReady={e => {
          this.updateVisibility(e.currentTarget.visiblePanels.map(panel => panel.index));
        }}
        onVisibleChange={e => {
          this.updateVisibility(e.added.map(panel => panel.index));
        }}>
        {
          this.state.panels.map((loaded, idx) => loaded
            ? <div className={styles.panel} key={idx}>
              <img className={styles.image} src={`https://cataas.com/cat?width=400&height=200&idx=${idx}`} />
              <div className={styles.overlay}></div>
              <span className={styles.legend}>{idx}</span>
            </div>
            : <div className={styles.panel} key={idx}>
              <div className={styles.overlay}></div>
              <span className={styles.legend}>{idx}</span>
            </div>)
        }
      </Flicking>
      <div className="buttons is-centered">
        <span className="button" onClick={() => { this._flicking.current.moveTo(0, 0); }}>Move to 0</span>
        <span className="button" onClick={() => { this._flicking.current.moveTo(250, 0); }}>Move to 250</span>
        <span className="button" onClick={() => { this._flicking.current.moveTo(500, 0); }}>Move to 500</span>
      </div>
      <SourceCode
        options={{}}
        panels={[]}
        js={jsCode}
        react={reactCode}
        preact={reactCode}
        vue={vueCode}
        vue3={vueCode}
        angular={angularCode}
        svelte={svelteCode}
      />
    </>;
  }
}
