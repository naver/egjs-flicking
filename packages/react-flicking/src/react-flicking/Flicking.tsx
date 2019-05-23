import NativeFlicking, { FlickingOptions, Plugin, FlickingEvent, NeedPanelEvent, withFlickingMethods, DEFAULT_OPTIONS } from "@egjs/flicking";
import * as React from "react";
import { findDOMNode } from "react-dom";
import ChildrenDiffer from "@egjs/react-children-differ";
import { CloneComponent } from "./Clone";
import { FLICKING_PROPS } from "./consts";
import { FlickingProps, FlickingType } from "./types";
import ListDiffer from "@egjs/list-differ";
import { ChildrenDiffResult } from "@egjs/children-differ";

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = FLICKING_PROPS;
  public state: {
    cloneCount: number,
  } = {
      cloneCount: 0,
    };
  // Flicking
  @withFlickingMethods
  private flicking?: NativeFlicking | null;
  private options: FlickingOptions = {
    ...DEFAULT_OPTIONS,
  };
  // differ
  private pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  // life cycle
  constructor(props: Partial<FlickingProps & FlickingOptions>) {
    super(props);
    const options = this.options;
    for (const name in props) {
      if (name in DEFAULT_OPTIONS) {
        options[name] = props[name];
      }
    }
  }
  public render() {
    const props = this.props;
    // tslint:disable-next-line:naming-convention
    const Tag = props.tag as any;
    const classPrefix = props.classPrefix;
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (!(name in FLICKING_PROPS) && !(name in DEFAULT_OPTIONS)) {
        attributes[name] = props[name];
      }
    }
    return (
      <Tag {...attributes}>
        <div className={`${classPrefix}-viewport`}>
          <div className={`${classPrefix}-camera`}>
            <ChildrenDiffer onUpdate={this.onUpdate}>
              {this.renderPanels()}
            </ChildrenDiffer>
          </div>
        </div>
      </Tag>
    );
  }
  public onUpdate = (result: ChildrenDiffResult<HTMLElement>) => {
    if (typeof this.props.lastIndex === "number") {
      this.setLastIndex(this.props.lastIndex!);
    }
    this.flicking!.sync(result as ChildrenDiffResult<HTMLElement>);
    this.checkPlugins();
    this.checkCloneCount();
  }
  public componentDidMount() {
    this.flicking = new NativeFlicking(
      findDOMNode(this) as HTMLElement,
      this.options,
    ).on({
      moveStart: (e: FlickingEvent) => this.props.onMoveStart!(e),
      move: (e: FlickingEvent) => this.props.onMove!(e),
      moveEnd: (e: FlickingEvent) => this.props.onMoveEnd!(e),
      holdStart: (e: FlickingEvent) => this.props.onHoldStart!(e),
      holdEnd: (e: FlickingEvent) => this.props.onHoldEnd!(e),
      select: (e: FlickingEvent) => this.props.onSelect!(e),
      needPanel: (e: NeedPanelEvent) => this.props.onNeedPanel!(e),
      change: (e: FlickingEvent) => this.props.onChange!(e),
      restore: (e: FlickingEvent) => this.props.onRestore!(e),
    });

    if (this.props.status) {
      this.setStatus(this.props.status);
    }
    this.checkPlugins();
    this.checkCloneCount();
  }
  public componentWillUnmount() {
    this.destroy();
  }
  // private
  private checkPlugins() {
    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.props.plugins!);

    this.addPlugins(added.map(index => list[index]));
    this.removePlugins(removed.map(index => prevList[index]));
  }
  private checkCloneCount() {
    const cloneCount = this.flicking!.getCloneCount();

    if (this.state.cloneCount !== cloneCount) {
      this.setState({
        cloneCount,
      });
    }
  }
  private renderPanels() {
    const cloneCount = this.state.cloneCount;
    const children = React.Children.toArray(this.props.children) as Array<React.ReactElement<any>>;
    let arr: Array<React.ReactElement<any>> = [...children];

    for (let i = 0; i < cloneCount; ++i) {
      arr = arr.concat(children.map(el => {
        return <CloneComponent key={`clone${i}${el.key}`}>{el}</CloneComponent>;
      }));
    }
    return arr;
  }
}
interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, FlickingType<Flicking> {}
export default Flicking;
