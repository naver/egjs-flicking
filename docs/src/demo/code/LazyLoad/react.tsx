/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="language-jsx">
{`export default class LazyLoad extends React.Component {
  public constructor(props) {
    super(props);

    this.state = {
      panels: [...new Array(501).fill(false)]
    };
  }

  public updateVisibility(indexes) {
    this.setState(state => {
      indexes.forEach(idx => {
        state.panels[idx] = true;
      });

      return { panels: [...state.panels] };
    });
    this.forceUpdate();
  }

  public render() {
    return <Flicking align="prev" renderOnlyVisible={true} defaultIndex={500} bound={true}
      onReady={e => {
        this.updateVisibility(e.currentTarget.visiblePanels.map(panel => panel.index));
      }}
      onVisibleChange={e => {
        this.updateVisibility(e.added.map(panel => panel.index));
      }}>
      {
        this.state.panels.map((loaded, idx) => loaded
          ? <div className="panel" key={idx}>
            <img className="image" src={\`https://cataas.com/cat?idx=\${idx}\`} />
            <span className="legend">{idx}</span>
          </div>
          : <div className="panel" key={idx}>
            <span className="legend">{idx}</span>
          </div>)
      }
    </Flicking>;
  }
}`}
</CodeBlock>;
