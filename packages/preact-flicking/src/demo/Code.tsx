import { h, Component } from "preact";

export default class Code extends Component<{
  script: string,
}, {}> {
  public shouldComponentUpdate() {
    return false;
  }
  public render() {
    return (<pre><code className="hljs html" data-script={this.props.script}></code></pre>);
  }
}
